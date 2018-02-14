# -*- coding: utf-8 -*-
import scrapy


class QuotesSpider(scrapy.Spider):
    name = 'quotes'
    allowed_domains = ['toscrape.com']
    start_urls = ['http://quotes.toscrape.com/']

    def parse(self, response):
        self.log('I just visited' + response.url)
        urls = response.css('div.quote > span > a::attr(href)').extract()
        # for getting detail of a url page
        for url in urls:
           url = response.urljoin(url)
           yield scrapy.Request(url=url, callback = self.parse_details)

        for quote in response.css('div.quote'):
            item = {
                'author':quote.css('small.author::text').extract_first(),
                'text':quote.css('span.text::text').extract_first(),
                'tags': quote.css('a.tag::text').extract(),
            }
            yield item

        next_page_url = response.css('li.next > a::attr(href)').extract_first()
        if next_page_url:
            next_page_url = response.urljoin(next_page_url)
            yield  scrapy.Request(url=next_page_url,callback=self.parse)

    def parse_details(self,response):
        yield  {
            'name': response.css('h3.author-title::text').extract_first(),
            'birth_date': response.css('span.author-born-date::text').extract_first(),
        }
