from scrapy import Request
from scrapy.spiders import CrawlSpider, Spider, Rule
from scrapy.linkextractors import LinkExtractor
from w3lib.url import add_or_replace_parameter
from copy import deepcopy

from shoecarnival.items import ShoecarnivalItem


class ShoecarnivalMixin:
    allowed_domain = ['https://www.shoecarnival.com/']


class ShoecarnivalSpider(Spider):
    name = 'spider'
    stock_url = 'https://www.shoecarnival.com/on/demandware.store/Sites-shoecarnival-Site/default/Product-Variation?' \
                'pid=87943&dwvar_87943_size=1%20-%20Little%20Kid&dwvar_87943_color=167956&dwvar_87943_' \
                'widthGroup=MEDIUM&source=detail&Quantity=1&format=ajax&productlistid=undefined'

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
        product['skus'] = {}
        product['merch_info'] = []

        return self.extract_requests(self.color_requests(response), product)

    def parse_color(self, response):
        product = response.meta['product']
        requests = response.meta['requests']

        requests += self.stock_request(response)

        product['skus'].update(self.product_sku(response))
        product['images_urls'] += self.product_images(response)

        return self.extract_requests(requests, product)

    def stock_request(self, response):
        requests = []
        sizes = self.product_size(response)
        urls = response.css('select.variation-select option::attr(value)').extract()
        urls = clean_product(urls)

        for size, url in zip(sizes, urls):
            response.meta['size'] = size
            requests += [Request(url=url, callback=self.parse_stock, meta=response.meta, dont_filter=True)]
        return requests

    def parse_stock(self, response):
        product = response.meta['product']
        requests = response.meta['requests']

        product['skus'].update(self.product_sku(response))
        return self.extract_requests(requests, product)

    @staticmethod
    def extract_requests(requests, product):
        if requests:
            request = requests.pop()
            request.meta['product'] = product
            request.meta['requests'] = requests
            yield request
        else:
            yield product

    def color_requests(self, response):
        colors = response.css('.swatch-value a.swatchanchor::attr(href)').extract()
        requests = []

        for color in colors:
            requests += [Request(url=color, callback=self.parse_color, dont_filter=True)]

        return requests

    def product_sku(self, response):
        previous_price = self.product_previous_price(response)

        sku = {}

        if previous_price:
            sku['previous_prices'] = previous_price

        sku["price"] = self.product_price(response)
        sku["currency"] = self.product_currency(response)
        sku["color"] = self.product_color(response)
        sku['size'] = response.meta['size']
        sku['out_of_stock'] = self.product_out_of_stock(response)
        sku_id = '{color}|{size}'.format(color=(sku['color'] or ''), size=sku['size'])

        return {sku_id: sku}

    @staticmethod
    def product_name(response):
        return response.css('h1.product-name::text').extract_first()

    @staticmethod
    def product_brand(response):
        return response.css('script::text').re_first(r'product_brand_name:(.+),(\s)')

    @staticmethod
    def product_price(response):
        price = response.css('span.price-saleprice::text').re(r'(\d+)') + \
                response.css('span.price-sales::text').re(r'(\d+)') + \
                response.css('.product-price div::text').re(r'(\d+)')[2:3]
        if price:
            return int(''.join(price))

    @staticmethod
    def product_currency(response):
        return response.css('script::text').re_first(r'currency":"(.+?)"}')

    @staticmethod
    def product_images(response):
        return response.css('picture source::attr(srcset)').extract()

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

    @staticmethod
    def product_out_of_stock(response):
        return response.css('script::text').re_first(r'"IN_STOCK":"(.+?)",')

    def product_gender(self, response):
        categories = self.product_category(response)

        for category in categories:
            category = category.lower()
            if category in self.gender_map:
                return self.gender_map[category]

    @staticmethod
    def product_color(response):
        return response.css('li.selectable.selected img::attr(alt)').extract_first()

    @staticmethod
    def product_care(response):
        pass

    @staticmethod
    def product_size(response):
        size = response.css('#va-size  option:not([class="emptytext"])::text').extract()
        return clean_product(size)

    @staticmethod
    def product_previous_price(response):
        pre_price = response.css('span.price-standard::text').re(r'(\d+)') + \
                    response.css('.product-price div::text').re(r'(\d+)')[:2]
        if pre_price:
            return int(''.join(pre_price))


class Shoecarnival(CrawlSpider):
    name = 'shoecarnival'
    items_per_page = 24
    start_urls = ['https://www.shoecarnival.com']

    mixin = ShoecarnivalMixin()
    spider_parser = ShoecarnivalSpider()
    deny = ['Brands']
    allowed_domain = mixin.allowed_domain

    rules = (
        Rule(LinkExtractor(restrict_css='#navigation .menu-vertical', deny=deny), callback='parse_pagination'),
        Rule(LinkExtractor(restrict_css='.search-result-content a.thumb-link'), callback=spider_parser.parse_product)
    )

    #
    # def start_requests(self):
    #     urls = []
    #     test = [
    #         'https://www.shoecarnival.com/on/demandware.store/Sites-shoecarnival-Site/default/Product-Variation?'
    #         'pid=87943&dwvar_87943_color=167956&dwvar_87943_widthGroup=MEDIUM']
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
        start = 0

        while start < int(total_items):
            url = add_or_replace_parameter(response.url, 'sz', size)
            url = add_or_replace_parameter(url, 'start', start)
            start += self.items_per_page

            meta = deepcopy(common_meta)
            yield Request(url=url, callback=self.parse, meta=deepcopy(meta))


def clean_product(raw_data):
    cleaned_list = []
    for item in raw_data:
        item = item.strip()
        if item:
            cleaned_list.append(item)
    return cleaned_list
