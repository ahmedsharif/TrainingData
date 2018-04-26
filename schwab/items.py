# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

from scrapy.item import Item, Field


class SchwabItem(Item):
    product = Field()
    product_name = Field()
    product_detail = Field()
    product_brand = Field()
    product_price = Field()
    product_quantity = Field()
    product_currency = Field()
    product_images = Field()
    product_retailer_sku = Field()
    product_description = Field()
    product_url_origin = Field()
    retailer = Field()
    trail = Field()
    category = Field()
    color = Field()
    pass
