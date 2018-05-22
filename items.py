from scrapy.item import Item, Field


class ShoecarnivalItem(Item):
    product = Field()
    name = Field()
    product_brand = Field()
    price = Field()
    currency = Field()
    images_urls = Field()
    retailer_sku = Field()
    description = Field()
    url = Field()
    retailer = Field()
    trail = Field()
    category = Field()
    skus = Field()
    care = Field()
    size = Field()
    pre_price = Field()
    industry = Field()
    merch_info = Field()
    gender = Field()
