import json
import re

from w3lib.url import url_query_cleaner

from scrapy import Request
from scrapy.spiders import Rule, CrawlSpider
from scrapy.linkextractors import LinkExtractor

# from alexanderwang_scrapy.items import Product


class AlexanderWangSpider(CrawlSpider):

    name = "alexanderwang"
    allowed_domains = ['alexanderwang.com']
    start_urls = ['https://www.alexanderwang.com/us']
    ids_seen = []

    deny_re = ['_section', 'studio']

    listings_css = "nav.mainMenu"
    products_css = "a.title"

    sku_url_template = ('/yTos/api/Plugins/ItemPluginApi/GetCombinationsAsync/'
                        '?siteCode=ALEXANDERWANG_US&code10={}')

    gender_map = [
        ('women', 'women'),
        ('men', 'men'),
        ('girls', 'girls'),
        ('boys', 'boys'),
        ('kids', 'unisex-kids')
    ]

    rules = (
        Rule(LinkExtractor(
            restrict_css=listings_css,
            deny=deny_re),
            callback='parse_pagination',
            follow=True
        ),
        Rule(LinkExtractor(
            restrict_css=products_css,
            deny=deny_re),
            callback='parse_product'
        ),
    )

    def parse_pagination(self, response):
        scripts = response.css('script ::text')
        parameters = json.loads(scripts.re_first(r'yTos.search = (.+?);'))
        total_pages = parameters['totalPages']

        for page_number in range(1, int(total_pages) + 1):
            products_list_url = response.urljoin(
                '?page={}'.format(page_number))
            yield Request(products_list_url, callback=self.parse)

    def parse_product(self, response):

        if response.css('div.soldOutMessage'):
            return

        full_id = self.product_retailer_sku(response)
        retailer_sku = full_id[0]

        if retailer_sku in self.ids_seen:
            return

        self.ids_seen.append(retailer_sku)
        product = LiujoItem()
        product['retailer_sku'] = retailer_sku
        product['name'] = self.product_name(response)
        product['brand'] = self.product_brand(response)
        product['url'] = url_query_cleaner(response.url)
        product['category'] = self.product_category(response, product['name'])
        product['gender'] = self.product_gender(product['category'])
        product['description'] = self.product_description(response)
        product['image_urls'] = self.product_images(response)

        price = self.product_price(response)
        currency = self.product_currency(response)
        skus_url = response.urljoin(
            self.sku_url_template.format(''.join(full_id)))

        skus_request = Request(skus_url, callback=self.parse_skus)
        skus_request.meta['product'] = product
        skus_request.meta['pricing'] = {'price': price, 'currency': currency}
        yield skus_request

    def parse_skus(self, response):
        product = response.meta['product']
        pricing = response.meta['pricing'].copy()
        product['skus'] = self.product_skus(response, pricing)
        requests = self.additional_color_requests(response, product['url'])

        return self.parse_additional_requests(product, requests)

    def parse_images(self, response):
        product = response.meta['product']
        requests = response.meta['request_queue']
        product['image_urls'] += self.product_images(response)

        return self.parse_additional_requests(product, requests)

    @staticmethod
    def parse_additional_requests(product, requests):
        if requests:
            request = requests.pop(0)
            request.meta['product'] = product
            request.meta['request_queue'] = requests
            yield request
        else:
            yield product

    def additional_color_requests(self, response, product_url):
        product_skus = json.loads(response.text)
        additional_color_urls = []
        request_queue = []

        for product_sku in product_skus['ModelColorSizes']:
            color_url = product_sku['Color']['Link']

            if color_url not in additional_color_urls + [product_url]:
                additional_color_urls.append(color_url)
                request = Request(color_url, callback=self.parse_images)
                request_queue.append(request)

        return request_queue

    @staticmethod
    def product_skus(response, pricing):
        raw_skus = json.loads(response.text)
        skus = []

        for raw_sku in raw_skus['ModelColorSizes']:
            sku = {}
            sku['price'] = pricing['price']
            sku['currency'] = pricing['currency']
            sku['colour'] = raw_sku['Color']['Description']
            sku['size'] = raw_sku['Size']['Description']
            sku['sku_id'] = '{}_{}'.format(sku['colour'], sku['size'])
            skus.append(sku)

        return skus

    @staticmethod
    def product_images(response):
        return response.css('div#itemImages img::attr(src)').extract()

    @staticmethod
    def product_retailer_sku(response):
        return response.css('script ::text').re(r'"Code10":"(\d+)(.+?)"')

    @staticmethod
    def product_brand(response):
        brand_css = '.addItemToShoppingBagButton::attr(data-ytos-mdl)'
        raw_brand = response.css(brand_css).extract_first()
        raw_brand = json.loads(raw_brand or '{}')
        return raw_brand['productBrand'].title() if raw_brand else 'Alexander Wang'

    @staticmethod
    def product_name(response):
        name = response.css(
            'h1.productName span.modelName::text').extract_first()
        return clean(name.title())

    @staticmethod
    def product_category(response, name):
        keywords = response.css(
            "meta[name='keywords']::attr(content)").extract_first()
        keywords = clean(keywords.split(','))
        category = []

        for keyword in keywords:
            if keyword.lower() not in ['alexander wang', name.lower()]:
                category.append(keyword)

        category.reverse()
        return [c.title() for c in category]

    def product_gender(self, categories):

        for gender_key, gender_value in self.gender_map:
            if gender_key in ''.join(categories).lower():
                return gender_value

        return 'unisex-adults'

    @staticmethod
    def product_description(response):
        desc = response.css('div.ItemDescription span.text::text').extract()
        return clean(desc)

    @staticmethod
    def product_price(response):
        price = response.css(
            'div.itemBoxPrice span.value::text').extract_first()
        return int(float(price.replace(',', '')) * 100)

    @staticmethod
    def product_currency(response):
        return response.css('script::text').re_first(r'"priceCurrency": "(.+?)"')


def clean(formatted):

    if not formatted:
        return formatted

    if isinstance(formatted, list):
        cleaned = [re.sub(r'\s+', ' ', each).strip() for each in formatted]
        return list(filter(None, cleaned))

    return re.sub(r'\s+', ' ', formatted).strip()
