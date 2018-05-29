import json

from scrapy import Request, FormRequest
from scrapy.spiders import CrawlSpider, Spider, Rule
from scrapy.linkextractors import LinkExtractor
from w3lib.url import add_or_replace_parameter
from copy import deepcopy

from urbanoutfitters.items import UrbanoutfittersItem


class OutfittersMixin:
    allowed_domain = ['https://www.urbanoutfitters.com']


class OutFittersParserSpider(OutfittersMixin, Spider):
    allowed_domain = OutfittersMixin.allowed_domain

    name = 'outfitters-parse'
    gender_map = {
        "women's sale": 'Women',
        "women's": 'Women',
        "men's sale": 'Men',
        "men's": 'Men',
    }

    def product_package(self, response):
        product = UrbanoutfittersItem()
        product['name'] = self.product_name(response)
        product['product_brand'] = self.product_brand(response)
        product['price'] = self.product_price(response)
        product['currency'] = self.product_currency(response)
        product['images_urls'] = self.product_images(response)
        product['retailer_sku'] = self.product_retailer_sku(response)
        product['description'] = self.product_description(response)
        product['url'] = self.product_url_origin(response)
        product['retailer'] = "outfitters"
        product['category'] = self.product_category(response)
        product['trail'] = response.meta.get('trail', [])
        product['gender'] = self.product_gender(response)
        product['care'] = self.product_care(response)
        product['skus'] = {}
        product['merch_info'] = self.product_merch_info(response)

        if not product['gender']:
            product['industry'] = "Homeware"

        return self.extract_requests(self.color_requests(response), product)
        # return product

    def color_requests(self, response):
        colors = response.css('.o-list-swatches a::attr(href)').extract()
        requests = []

        for color in colors:
            # url = response.url + color
            requests += [Request(url=response.urljoin(color), callback=self.parse_color, dont_filter=True)]
        return requests

    def parse_color(self, response):
        product = response.meta['product']
        requests = response.meta['requests']

        product['skus'].update(self.product_sku(response))
        product['images_urls'] += self.product_images(response)

        return self.extract_requests(requests, product)

    def product_sku(self, response):
        previous_price = self.product_previous_price(response)
        sizes = self.product_sizes(response)
        stocks = response.css('script[type="application/ld+json"]::text').re(r'"availability": "(.+?)",')
        total_skus = {}

        for size, stock in zip(sizes, stocks):
            sku = {}
            if previous_price:
                sku['previous_prices'] = previous_price

            sku["price"] = self.product_price(response)
            sku["currency"] = self.product_currency(response)
            sku["color"] = self.product_color(response)
            sku['size'] = size
            sku['stock'] = stock
            sku_id = '{color}|{size}'.format(color=(sku['color'] or ''), size=sku['size'])
            total_skus.update({sku_id: sku})
        return total_skus

    @staticmethod
    def extract_requests(requests, product):
        if requests:
            request = requests.pop()
            request.meta['product'] = product
            request.meta['requests'] = requests
            yield request
        else:
            yield product

    @staticmethod
    def product_name(response):
        name = response.css('.c-product-meta__h1 span::text').extract_first().strip()
        return name

    @staticmethod
    def product_brand(response):
        return response.css('meta.at-dv-brand::attr(content)').extract_first()

    @staticmethod
    def product_previous_price(response):
        pre_price = response.css('span.c-product-meta__original-price::text').re_first(r'(\d+)')
        if pre_price:
            return int(''.join(pre_price)) * 100

    @staticmethod
    def product_price(response):
        price = response.css('span.c-product-meta__current-price::text').re_first(r'(\d+)')
        return int(''.join(price)) * 100

    @staticmethod
    def product_currency(response):
        return response.css('script::text').re_first(r'"priceCurrency": "(.+?)",')

    @staticmethod
    def product_care(response):
        cares = response.css('div.c-text-truncate__text p:nth-child(2)::text').extract()
        return clean_product(cares)

    @staticmethod
    def product_images(response):
        images = response.css('.o-carousel__flex-wrapper > img::attr(src)').extract()
        return ["https:" + i for i in images]

    @staticmethod
    def product_retailer_sku(response):
        return response.css('div.u-global-p span::text').extract_first()

    @staticmethod
    def product_description(response):
        desc = [response.css('div.c-text-truncate__text p::text').extract_first()] + \
               response.css('div.c-text-truncate__text p:nth-child(3)::text').extract()
        return clean_product(desc)

    @staticmethod
    def product_sizes(response):
        sizes = response.css('li.c-radio-styled__small input::attr(value)').extract()
        return clean_product(sizes)

    @staticmethod
    def product_url_origin(response):
        return response.css('meta[property="og:url"]::attr(content)').extract_first()

    def product_gender(self, response):
        categories = self.product_category(response)

        for category in categories:
            category = category.lower()
            if category in self.gender_map:
                return self.gender_map[category]

    @staticmethod
    def product_category(response):
        category = response.css('li.c-breadcrumb__li span::text').extract()
        return clean_product(category)

    @staticmethod
    def product_color(response):
        return response.css('li.o-list-swatches__li img::attr(alt)').extract_first()

    @staticmethod
    def product_merch_info(response):
        return response.css('.c-afterpay__message::text').extract_first()


class SchwabCralwer(OutfittersMixin, CrawlSpider):
    name = 'outfitters'
    items_per_page = 100
    start_urls = ['https://www.urbanoutfitters.com/womens-new-arrivals']

    spider_parser = OutFittersParserSpider()

    allowed_domain = OutfittersMixin.allowed_domain

    # for one page items
    # response.css('div.s-category-grid a::attr(href)').extract()
    rules = (
        Rule(LinkExtractor(restrict_css='nav a'), callback='parse_pagination'),
        Rule(LinkExtractor(restrict_css='div.s-category-grid a'), callback=spider_parser.product_package)
    )

    # def start_requests(self):
    #     yield Request(url=self.start_url, callback=self.parse_listing)
    #
    # def parse_listing(self, response):
    #     raw_urls = json.loads(response.text)
    #     for url in raw_urls:
    #         for inner_cat in url['sCat']:
    #             yield Request(url=inner_cat['url'], callback=self.parse_pagination)

    # def start_requests(self):
    #     request = []
    #     urls = [
    #         'https://www.urbanoutfitters.com/shop/uo-lyla-a-line-thermal-long-sleeve-top?category=womens-clothes-sale&color=086']
    #     request.append(Request(urls[0], self.spider_parser.product_package))
    #     return request

    def parse_pagination(self, response):
        common_meta = {}
        common_meta['trail'] = [response.url]

        total_items = response.css('div.c-results-count::text').re_first(r'(\d+)')
        if not total_items:
            return

        total_pages = (int(total_items) // self.items_per_page) + 1

        for page in range(1, total_pages):
            url = add_or_replace_parameter(response.url, 'page', page)
            meta = deepcopy(common_meta)
            yield Request(url=url, callback=self.parse, meta=meta)

    def parse(self, response):
        response.meta['trail'] = response.meta.get('trail', [])
        response.meta['trail'] += [response.url]

        for request in super().parse(response):
            request.meta['trail'] = response.meta['trail']
            yield request


def clean_product(raw_data):
    cleaned_list = []
    for item in raw_data:
        item = item.strip()
        if item:
            cleaned_list.append(item)
    return cleaned_list
