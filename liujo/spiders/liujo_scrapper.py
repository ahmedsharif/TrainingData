import json
import re

from scrapy.spiders import Rule, CrawlSpider
from scrapy.linkextractor import LinkExtractor
from liujo.items import LiujoItem

from w3lib.url import url_query_cleaner
from scrapy import Request


class LiujoCrawler(CrawlSpider):

    name = "liujo"
    allowed_domain = ['www.liujo.com']
    start_urls = ['http://www.liujo.com/fr/abito-jersey-t-unita-135.html']

    # listing_css = ['ul.main-level']  # for pagniation
    # products_css = ['div.main col1-layout']
    # already_parsed = []
    # test = ['.product-view']

    # rules = (
    #     Rule(LinkExtractor(restrict_css=test,), callback="parse_product"),
    #     # Rule(LinkExtractor(restrict_css=listing_css,),
    #     #      callback="pagination", follow=True),
    # )

    def parse(self, response):
        full_id = self.product_retailer_sku(response)
        retailer_sku = full_id

        # if retailer_sku in self.already_parsed:
        #     return

        # self.already_parsed.append(retailer_sku)

        product = LiujoItem()
        product['retailer_sku'] = retailer_sku
        product['name'] = self.product_name(response)
        product['price'] = self.product_price(response)
        product['images'] = self.product_images(response)
        product['description'] = self.product_description(response)
        product['skus'] = self.product_skus(response)
        product['color'] = self.product_color(response)
        product['category'] = self.product_category(response)
        product['currency'] = self.product_currency(response)
        return product

    def pagination(self, response):

        total_products = response.css('p.amount::text').re_first(r'(\d+) ')

        if not total_products:
            return

        total_products = int(total_products)
        products_per_page = 12
        starting = 0

        if total_products <= products_per_page:
            return

        while total_products > starting:
            products_page = response.urljoin('?start={}'.format(starting))
            yield Request(products_page, callback=self.parse)
            starting += products_per_page

    @staticmethod
    def product_retailer_sku(response):
        return response.css('p.product-ids::attr(data-sku)').extract_first()

    @staticmethod
    def product_name(response):
        name = response.css('div.product-name h1::text').extract_first()
        return clean(name)

    @staticmethod
    def product_price(response):
        price = response.css(
            'div.price-box span.price::text').re_first(r'(\d+)')
        return price

    @staticmethod
    def product_description(response):
        description = response.css(
            'div.short-description-value::text').extract()
        return clean(description)

    @staticmethod
    def product_images(response):
        img = response.css(
            'div.product-media-gallery-inner img::attr(src)').extract()
        return img

    @staticmethod
    def product_detail(response):
        detail = response.css('div.detail-value p::text').extract()
        return detail

    @staticmethod
    def product_color(response):
        color = response.css('.swatch-label img::attr(src)').extract()
        return color

    @staticmethod
    def product_category(response):
        category = response.css('.breadcrumbs a>span::text').extract()
        category.append(response.css(
            '.breadcrumbs strong::text').extract_first())
        return category

    @staticmethod
    def product_currency(response):
        currency = response.css(
            'div.price-box span.price::text').extract_first()
        currency = re.sub(r"\d+", "", currency)
        return currency
    
    # @staticmethod
    # def product_color_title(response):
    #     title = response.css('#configurable_swatch_color li::attr(class)').extract()
    #     re_pattern = r'\b(?:selected)\b'
        
    #     for t in range(len(title)):
    #         flag = re.findall(re_pattern,title[t])
    #         if flag:
    #             t = title[t]
    #             return flag
    #     #         name = title[t]
        # return name 
    # @staticmethod
    # def product_brand(response):
    
    def product_skus(self,response):
        sizes = response.css('#configurable_swatch_liujo_size span.swatch-label::text').re(r'(\d+)')
        sizes = clean(sizes)
        skus = []

        for size in range(5):
            sku = {}
            sku['colour'] = self.product_color(response)
            sku['size'] = sizes[size]
            sku['sku_id'] = self.product_retailer_sku(response)
            #sku['sku_color'] = self.product_color_title(response) 
            skus.append(sku)

        return skus


def clean(formatted):

    if not formatted:
        return formatted

    if isinstance(formatted, list):
        cleaned = [re.sub(r'\s+', ' ', each).strip() for each in formatted]
        return list(filter(None, cleaned))

    return re.sub(r'\s+', ' ', formatted).strip()
