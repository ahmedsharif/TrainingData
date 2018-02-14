import scrapy
import json


class QuotesScrollSpider(scrapy.Spider):
    name = 'quotes-scroll'
    url = 'http://quotes.toscrape.com/api/quotes?page={}'
    start_urls = [url.format(5)]

    def parse(self, response):
        print('ayy')
        data = json.loads(response.text)
        for quote in data['quotes']:
            yield {
                'author-name': quote['author']['name'],
                'text': quote['text'],
                'tags':quote['tags'],
            }

        if data['has_next']:
            next_page = data['page'] + 1
            yield scrapy.Request(url=self.url.format(next_page), callback=self.parse)
