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
    start_urls = ['http://www.liujo.com/fr/']

    listing_css = ['ul.main-level']
    already_parsed = []

    rules = (
        Rule(LinkExtractor(restrict_css=listing_css,), callback="parse_product"),

    )

    def parse_product(self, response):
        full_id = self.product_retailer_sku(response)
        retailer_sku = full_id[0]

        if retailer_sku in self.already_parsed:
            return

        self.already_parsed.append(retailer_sku)

        product = LiujoItem()
        product['retailer_sku'] = retailer_sku
        product['name'] = self.product_name(response)
        product['price'] = self.product_price(response)
        product['images'] = self.product_images(response)
        product['description'] = self.product_description(response)

    @staticmethod
    def product_retailer_sku(response):
        return response.css('p.product-ids::attr(data-sku)').extract_first()

    @staticmethod
    def product_name(response):
        name = response.css('div.product-name h1::text').extract_first()
        return clean(name.title())

    @staticmethod
    def product_price(response):
        price = response.css('div.price-box span.price::text').extract_first()
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


def clean(formatted):

    if not formatted:
        return formatted

    if isinstance(formatted, list):
        cleaned = [re.sub(r'\s+', ' ', each).strip() for each in formatted]
        return list(filter(None, cleaned))

    return re.sub(r'\s+', ' ', formatted).strip()
