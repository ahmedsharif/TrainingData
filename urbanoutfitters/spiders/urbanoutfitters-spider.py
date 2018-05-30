from scrapy import Request
from scrapy.spiders import CrawlSpider, Spider, Rule
from scrapy.linkextractors import LinkExtractor
from w3lib.url import add_or_replace_parameter
from copy import deepcopy


from urbanoutfitters.items import UrbanoutfittersItem


class OutfittersMixin:
    name = 'outfitters'
    allowed_domain = ['https://www.urbanoutfitters.com']
    start_urls = ['https://www.urbanoutfitters.com']


class OutFittersParserSpider(OutfittersMixin, Spider):
    name = 'outfitters-spider'
    gender_map = {
        "women's": 'Women',
        "men's": 'Men',
    }

    def product_package(self, response):
        product = UrbanoutfittersItem()
        product['name'] = self.product_name(response)
        product['brand'] = self.product_brand(response)
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
        # yield product

    def parse_color(self, response):
        product = response.meta['product']

        product['skus'].update(self.product_sku(response))
        product['images_urls'] += self.product_images(response)

        return self.extract_requests(response.meta['requests'], product)

    def color_requests(self, response):
        colors = response.css('.o-list-swatches a::attr(href)').extract()
        stocks = self.product_stocks(response)
        sizes = len(self.product_sizes(response))

        requests = []
        stock = 0

        for color in colors:
            response.meta['stocks'] = stocks[stock:stock + sizes]
            stock = stock + sizes
            requests += [response.follow(url=color, callback=self.parse_color, meta=response.meta, dont_filter=True)]

        return requests

    def product_sku(self, response):
        sizes = self.product_sizes(response)

        stocks = response.meta.get('stocks', [])
        all_skus = {}

        for size, stock in zip(sizes, stocks):
            previous_price = self.product_previous_price(response)
            sku = {}

            sku["price"] = self.product_price(response)
            sku["currency"] = self.product_currency(response)
            sku["color"] = self.product_color(response)
            sku['size'] = size
            sku_id = '{color}|{size}'.format(
                 color=(sku['color'] or ''), size=sku['size'])

            # sku_id = f'{sku["color"] or ""}|{sku["size"]}'

            if previous_price:
                sku['previous_prices'] = previous_price

            if "OutOfStock" in stock:
                sku['out_of_stock'] = True

            all_skus[sku_id] = sku
        return all_skus

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
        return response.css('.c-product-meta__h1 span::text').extract_first().strip()

    @staticmethod
    def product_brand(response):
        return response.css('script::text').re_first(r'product_brand: (.+?)"],').strip('["')

    @staticmethod
    def product_previous_price(response):
        pre_price = response.css('span.c-product-meta__original-price::text').re_first(r'(\d+)')
        if pre_price:
            return int(pre_price) * 100

    @staticmethod
    def product_price(response):
        price = response.css('span.c-product-meta__current-price::text').re_first(r'(\d+)')
        return int(price) * 100

    @staticmethod
    def product_currency(response):
        return response.css('script::text').re_first(r'"priceCurrency": "(.+?)",')

    @staticmethod
    def product_care(response):
        care = response.css('div.c-text-truncate__text p:nth-child(2)::text').extract()
        return clean_product(care)

    @staticmethod
    def product_images(response):
        images = response.css(
            'div.o-carousel__slide.js-carousel-zoom__slide'
            ' img:not(.c-zoom-overlay__img):not([src*="loading-spacer"])::attr(src)').extract()
        return ["https:" + i for i in images]

    @staticmethod
    def product_retailer_sku(response):
        return response.css('div.u-global-p span::text').extract_first()

    @staticmethod
    def product_description(response):
        desc = response.css('div.c-text-truncate__text p:nth-child(1)::text,'
                            'div.c-text-truncate__text p:nth-child(3)::text').extract()
        return clean_product(desc)

    @staticmethod
    def product_sizes(response):
        sizes = response.css(
            'li.c-radio-styled__small input::attr(value)').extract()
        return clean_product(sizes)

    @staticmethod
    def product_url_origin(response):
        return response.css('meta[property="og:url"]::attr(content)').extract_first()

    def product_gender(self, response):
        categories = self.product_category(response)
        category_soup = ' '.join(categories).lower()

        for gender in self.gender_map:
            if gender in category_soup:
                return gender

    @staticmethod
    def product_category(response):
        category = response.css('li.c-breadcrumb__li span::text').extract()
        return clean_product(category)

    @staticmethod
    def product_color(response):
        return response.css('span.c-product-colors__name::text').extract_first().strip()

    @staticmethod
    def product_merch_info(response):
        return response.css('.c-afterpay__message::text').extract_first().strip()

    @staticmethod
    def product_stocks(response):
        return response.css('script[type="application/ld+json"]::text').re(r'"availability": "(.+?)",')


class SchwabCralwer(OutfittersMixin, CrawlSpider):
    items_per_page = 100

    spider_parser = OutFittersParserSpider()

    #
    rules = (
        Rule(LinkExtractor(restrict_css='nav a'), callback='parse_pagination'),
        Rule(LinkExtractor(restrict_css='div.s-category-grid a'),
             callback=spider_parser.product_package)
    )

    # def start_requests(self):
    #     urls = []
    #     test = [
    #         'https://www.urbanoutfitters.com/shop/champion-uo-anorak-jacket?category=mens-jackets&color=032']
    #     urls.append(Request(test[0], self.spider_parser.product_package))
    #     return urls

    def parse_pagination(self, response):
        common_meta = {}
        common_meta['trail'] = [response.url]

        total_items = response.css(
            'div.c-results-count::text').re_first(r'(\d+)')

        if not total_items:
            return

        total_pages = (int(total_items) // self.items_per_page) + 1

        for page in range(1, total_pages):
            url = add_or_replace_parameter(response.url, 'page', page)
            meta = deepcopy(common_meta)

            yield Request(url=url, callback=self.parse, meta=meta)

    def parse(self, response):
        for request in super().parse(response):
            request.meta['trail'] = self.add_trail(response)
            yield request

    def add_trail(self, response):
        return  response.meta.get('trail', []) + [response.url]


def clean_product(raw_data):
    cleaned_list = []
    for item in raw_data:
        item = item.strip()
        if item:
            cleaned_list.append(item)
    return cleaned_list
