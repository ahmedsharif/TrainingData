import json

from scrapy import Request, FormRequest
from scrapy.spiders import CrawlSpider, Spider, Rule
from scrapy.linkextractors import LinkExtractor
from w3lib.url import add_or_replace_parameter

from shoecarnival.items import ShoecarnivalItem


class ShoecarnivalMixin:
    allowed_domain = ['https://www.shoecarnival.com/']


class ShoecarnivalSpider(Spider):
    name = 'spider'
    gender_map = {
        'womens': 'Women',
        'mens': 'Men',
        'kids': 'Unisex-kids',
    }

    def parse_product(self, response):
        product = ShoecarnivalItem()
        product['name'] = self.product_name(response)
        product['product_brand'] = self.product_brand(response)
        product['price'] = self.product_price(response)
        product['currency'] = self.product_currency(response)
        product['images_urls'] = self.product_images(response)
        product['retailer_sku'] = self.product_retailer_sku(response)
        product['description'] = self.product_description(response)
        product['url'] = self.product_url_origin(response)
        product['retailer'] = "shoecarnival"
        product['category'] = self.product_category(response)
        # product['trail'] = response.meta.get('trail', [])
        product['gender'] = self.product_gender(response)
        product['care'] = self.product_care(response)
        product['size'] = self.product_size(response)
        product['pre_price'] = self.product_previous_price(response)
        product['skus'] = self.product_sku(response)
        product['merch_info'] = []

        yield product

    def product_sku(self, response):
        previous_price = self.product_previous_price(response)
        sku = {}

        if previous_price:
            sku['previous_prices'] = previous_price

        sku["price"] = self.product_price(response)
        sku["currency"] = self.product_currency(response)
        sku["color"] = self.product_color(response)

        # sku['size'] = response.meta.get('size', "One size")

        # sku_id = '{color}|{size}'.format(color=(sku['color'] or ''), size=sku['size'])

        return {"1": sku}

    @staticmethod
    def product_name(response):
        return response.css('h1.product-name::text').extract_first()

    @staticmethod
    def product_brand(response):
        return response.css('script::text').re_first(r'product_brand_name:(.+),(\s)')

    @staticmethod
    def product_price(response):
        price = response.css('span.price-saleprice::text').re(r'(\d+)') + \
                [response.css('script::text').re_first(r'price":(.+?)}')]
        # if price:
        #     return int(''.join(price))
        return price[0]

    @staticmethod
    def product_currency(response):
        return response.css('script::text').re_first(r'currency":"(.+?)"}')

    @staticmethod
    def product_images(response):
        return response.css('img.productthumbnail::attr(src)').extract()

    @staticmethod
    def product_retailer_sku(response):
        return response.css('span#productNumbers::text').extract_first()

    @staticmethod
    def product_description(response):
        return response.css('div.info-container p::text').extract() + response.css('ul.features li::text').extract()

    @staticmethod
    def product_url_origin(response):
        return response.css('input#quickviewUrlSelection::attr(value)').extract_first()

    @staticmethod
    def product_category(response):
        return response.css('.breadcrumb-element::text').extract()

    def product_gender(self, response):
        categories = self.product_category(response)

        for category in categories:
            category = category.lower()
            if category in self.gender_map:
                return self.gender_map[category]

    @staticmethod
    def product_color(response):
        # for all colors
        # response.css('.swatch-value img::attr(alt)').extract()
        return response.css('li.selectable.selected img::attr(alt)').extract_first()

    @staticmethod
    def product_care(response):
        pass

    @staticmethod
    def product_size(response):
        size = response.css('#va-size  option::text').extract()
        return clean_product(size)

    @staticmethod
    def product_previous_price(response):
        pre_price = response.css('span.price-standard::text').re(r'(\d+)')
        if pre_price:
            return int(''.join(pre_price))


class Shoecarnival(CrawlSpider):
    name = 'shoecarnival'
    items_per_page = 24
    start_urls = ['https://www.shoecarnival.com']

    mixin = ShoecarnivalMixin()
    spider_parser = ShoecarnivalSpider()

    allowed_domain = mixin.allowed_domain

    rules = (
        Rule(LinkExtractor(restrict_css='#navigation .menu-vertical', deny=('Brands',)), callback='parse_pagination'),
        Rule(LinkExtractor(restrict_css='.search-result-content a.thumb-link'), callback=spider_parser.parse_product)
    )

    # def start_requests(self):
    #     urls = []
    #     test = [
    #         'https://www.shoecarnival.com/kids_k-swiss_infant_classic_leather_sneakers/19118.html?dwvar_19118_color=19448&cgid=kids-athletics']
    #     urls.append(Request(test[0], self.spider_parser.parse_product))
    #     return urls

        # individual page items
        # response.css('.search-result-content a.thumb-link::attr(href)').extract()

    def parse_start_url(self, response):
        yield Request(url=response.url, callback=self.parse_pagination)

    def parse_pagination(self, response):
        common_meta = {}
        common_meta['trail'] = [response.url]

        total_items = response.css('div.results-hits::text').re_first(r'(\d+)')
        if not total_items:
            return

        total_pages = (int(total_items) // self.items_per_page) + 1

        size = 24
        start = 24
        for page in range(1, total_pages):
            url = add_or_replace_parameter(response.url, 'sz', size)
            url = add_or_replace_parameter(url, 'start', start)
            start += 24
            yield Request(url=url, callback=self.parse)


def clean_product(raw_data):
    cleaned_list = []
    for item in raw_data:
        item = item.strip()
        if item:
            cleaned_list.append(item)
    return cleaned_list
