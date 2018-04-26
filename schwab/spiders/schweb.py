import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from schwab.items import SchwabItem


class SchwebCralwer(CrawlSpider):
    name = 'schweb'
    allowed_domain = ['https://www.schwab.de/']
    start_urls = ['https://www.schwab.de/']

    pages = ['section. section.mainnav--top a']
    products = ['div.product__top a']

    # rules = (
    #     Rule(LinkExtractor(restrict_css=products), callback='pagination'),
    #     # Rule(LinkExtractor(restrict_css=products), callback='product_crawler'),
    # )

    # def pagination(self,response):
    #     total_items = response.css('.pl__headline__count::text').re_first(r'(\d+)')
    #     items_per_page = 20
    # ?pageNr=2

    def product_crawler(self, response):
        product = SchwabItem()
        product['product_name'] = self.product_name(response)
        product['product_detail'] = self.product_detail(response)
        product['product_brand'] = self.product_brand(response)
        product['product_price'] = self.product_price(response)
        product['product_quantity'] = self.product_quantity(response)
        product['product_currency'] = self.product_currency(response)
        product['product_images'] = self.product_images(response)
        product['product_retailer_sku'] = self.product_retailer_sku(response)
        product['product_description'] = self.product_description(response)
        product['product_url'] = self.product_url_origin(response)
        product['retailer'] = "schwab" 

        return product

    def product_name(self, response):
        name = response.css('h1.details__title span::text').extract_first()
        return name

    def product_detail(self, response):
        detail = response.css('ul.l-outsp-bot-5 li::text').extract()
        return detail

    def product_brand(self, response):
        brand = response.css('meta.at-dv-brand::attr(content)').extract_first()
        return brand

    def product_price(self, response):
        price = response.css('.js-detail-price::text').extract_first()
        return price

    def product_quantity(self, response):
        quantity = response.css(
            '.js-current-variant-name::attr(value)').extract_first()
        return quantity

    def product_currency(self, response):
        currency = response.css(
            'meta[itemprop="priceCurrency"]::attr(content)').extract_first()
        return currency

    def product_images(self, response):
        images = response.css('#thumbslider a::attr(href)').extract()
        for image in range(len(images)):
            images[image] = str("https:") + images[image]
        return images

    def product_retailer_sku(self, response):
        id = response.css('.js-current-artnum::attr(value)').extract_first()
        return id

    def product_description(self, response):
        desc = response.css('div.l-outsp-bot-10 li::text').extract()
        return desc
    
    def product_url_origin(self, response):
        url_origin = response.css('link[rel="canonical"]::attr(href)').extract_first()
        return url_origin
        
    def product_trail(self,response):
        trails = response.css('ul.breadcrumb a::attr(href)').extract()
        trail_dict = {}
        count = 0

        for trail in trails:
            trail_dict[str(count)] = trail
            count = count + 1 
        
        return trail_dict

    def product_category(self,response):
        categories = response.css('ul.breadcrumb span[itemprop="name"]::text').extract()
        category_dict = {}
        count = 0

        for category in categories:
            category_dict[str(count)] = category
            count = count + 1 
        
        return category_dict
    
    
