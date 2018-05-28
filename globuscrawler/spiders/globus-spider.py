import json

from scrapy import Request, FormRequest
from scrapy.spiders import CrawlSpider, Spider, Rule
from scrapy.linkextractors import LinkExtractor
from w3lib.url import add_or_replace_parameter
from copy import deepcopy

from globuscrawler.items import GlobuscrawlerItem


class GlobusMixin:
    allowed_domain = ['https://www.shoecarnival.com/']


class GlobusSpider(GlobusMixin, Spider):
    name = 'globus-parse'

    allowed_domain = GlobusMixin.allowed_domain
    stock_status = ['In Stock']
    color_url = 'https://www.globus.ch/service/catalogue/GetProductDetailsWithPredefinedGroupID'

    gender_map = {
        'damen': 'Women',
        'damenmode': 'Women',
        'damenbademode': 'Women',
        'herren': 'Men',
        'marken': 'Men',
        'mädchen': 'Girls',
        'ihn': 'Men',
        'jungen': 'Boys',
        'kinder': 'Unisex-kids',
        'festivalschuhe': 'Unisex-adults'
    }

    def product_package(self, response):
        product = GlobuscrawlerItem()
        product['name'] = self.product_name(response)
        product['product_brand'] = self.product_brand(response)
        product['price'] = self.product_price(response)
        product['currency'] = self.product_currency(response)
        product['images_urls'] = self.product_images(response)
        product['retailer_sku'] = self.product_retailer_sku(response)
        product['description'] = self.product_description(response)
        product['url'] = self.product_url_origin(response)
        product['retailer'] = "Globus"
        product['category'] = self.product_category(response)
        product['trail'] = response.meta.get('trail', [])
        product['gender'] = self.product_gender(response)
        product['care'] = self.product_care(response)
        product['skus'] = {}
        product['merch_info'] = []

        if not product['gender']:
            product['industry'] = "Homeware"

        return self.extract_requests(self.color_requests(response), product)

    def parse_size(self, response):
        product = response.meta['product']
        requests = response.meta['requests']

        product['skus'].update(self.product_sku(response))
        return self.extract_requests(requests, product)

    def color_requests(self, response):
        colors = response.css('a.colorspots__item::attr(title)').extract()
        requests = []

        for color in colors:
            url = add_or_replace_parameter(response.url, "color", color)
            requests += [Request(url=url, callback=self.parse_color, dont_filter=True)]

        # For handling those requests which doesn't has color_requests
        if not colors:
            requests += self.stock_request(response)
            requests += self.size_request(response)
        return requests

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
        return response.css('h1.mzg-component-title_type-page-title::text').extract_first()

    @staticmethod
    def product_brand(response):
        return response.css('script[type="application/ld+json"]::text').re_first(
            r'"brand":{"@type":"Thing","name":"(.+?)"')

    @staticmethod
    def product_price(response):
        price = response.css('script[type="application/ld+json"]::text').re_first(r'"price":"(.+?)"').split('.')
        # first color request is not working discussed with ahmad ashraf. Therefore this check put.
        if price:
            return int(''.join(price))

    @staticmethod
    def product_currency(response):
        return response.css('script[type="application/ld+json"]::text').re_first(r'"priceCurrency":"(.+?)"')

    @staticmethod
    def product_images(response):
        updated_images = []
        # images = response.css('picture source[media="(min-width: 1280px)"]::attr(srcset)').extract()
        images = response.css(
            'div.mzg-catalogue-detail__gallery-image__list source[media="(min-width: 1280px)"]::attr(srcset)').extract()
        for image in images:
            image = image.split(', /')[0]
            updated_images.append(response.urljoin(image))
        return updated_images

    @staticmethod
    def product_retailer_sku(response):
        return response.css('p.mzg-catalogue-detail__product-summary__id::text').re_first(r'(\d+)')

    @staticmethod
    def product_description(response):
        return response.css('ul.mzg-catalogue-detail-info__cluster-list span::text').extract()

    @staticmethod
    def product_care(response):
        return response.css(
            'ul.mzg-catalogue-detail-info__cluster-list--hidden > li.mzg-catalogue-detail-info__cluster-list__item span::text').extract()

    @staticmethod
    def product_url_origin(response):
        return response.css('link[rel="canonical"]::attr(href)').extract_first()

    @staticmethod
    def product_category(response):
        return response.css('ol.mzg-components-module-breadcrumb-list span::text').extract()

    @staticmethod
    def product_out_of_stock(response):
        return response.css('script[type="application/ld+json"]::text').re(r'"availability":"(.+?)"')

    def product_gender(self, response):
        categories = self.product_category(response)

        for category in categories:
            category = category.lower()
            if category in self.gender_map:
                return self.gender_map[category]

    @staticmethod
    def product_color(response):
        return response.css('h3.mzg-component-title.mzg-component-title_h5::text').extract_first()

    @staticmethod
    def product_size(response):
        size = response.css('ul.mzg-component-form-select-wrapper__list div.mzg-component-select-option::text').re(
            r'(\d+)')
        return size

    @staticmethod
    def product_previous_price(response):
        pre_price = response.css('script::text').re_first(r'"crossPrice":"(.+?)"')
        if pre_price:
            return int(''.join(pre_price))


class Globus(GlobusMixin, CrawlSpider):
    name = 'globus'
    items_per_page = 24
    start_urls = ['https://www.globus.ch/']
    pagination_url = 'https://www.globus.ch/service/tracking/PageView'
    # deny = ['Brands']

    spider_parser = GlobusSpider()
    allowed_domain = GlobusMixin.allowed_domain

    # def start_requests(self):
    #     request = []
    #     urls = [
    #         'https://www.globus.ch/navyboot-hemd-slim-fit-1254915600503']
    #     request.append(Request(urls[0], self.spider_parser.product_package))
    #     return request

    # for links
    # response.css('div.mzg-components-module-product-listing a.mzg-components-module-product-image::attr(href)').extract()

    rules = (
        Rule(LinkExtractor(restrict_css='div.typo3-neos-nodetypes-text a'), callback='pagination_request'),
        # Rule(LinkExtractor(
        #     restrict_css='div.mzg-components-module-product-listing a.mzg-components-module-product-image'),
        #     callback=spider_parser.product_package)
    )

    # def start_requests(self):
    #     yield Request(url=self.start_urls, callback=self.pagination_request)

    def pagination_request(self, response):
        params = {}
        path = response.css('link[rel="canonical"]::attr(href)').extract_first()
        page = response.css('link[rel="next"]::attr(href)').re_first(r'(\d+)')

        # category_pages = response.css('script::text').re_first(r'"pages":(.+?),')


        params["path"] = path
        params["page"] = page

        requests = []

        p = 0
        while p < 10:
            params["page"] = p
            requests.append(
                FormRequest(url=self.pagination_url, formdata=params, callback=self.parse_pagination, dont_filter=True))

    def parse_pagination(self, response):
        page_text = response.text

        pagination_data = json.loads(page_text)

        response.meta['items'] = pagination_data['items']

        pass

        # common_meta = {}
        # common_meta['trail'] = [response.url]
        #
        # total_items = response.css('div.results-hits::text').re_first(r'(\d+)')
        #
        # if not total_items:
        #     return
        #
        # for start in range(int(total_items)):
        #     url = add_or_replace_parameter(response.url, 'sz', self.items_per_page)
        #     url = add_or_replace_parameter(url, 'start', self.items_per_page)
        #     start += self.items_per_page
        #
        #     meta = deepcopy(common_meta)
        #     yield Request(url=url, callback=self.parse, meta=meta)

    # def parse(self, response):
    #     response.meta['trail'] = response.meta.get('trail', [])
    #     response.meta['trail'] += [response.url]
    #
    #     for request in super().parse(response):
    #         request.meta['trail'] = response.meta['trail']
    #         yield request


def clean_product(raw_data):
    cleaned_list = []
    for item in raw_data:
        item = item.strip()
        if item:
            cleaned_list.append(item)
    return cleaned_list
