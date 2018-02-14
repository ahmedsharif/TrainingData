import scrapy


class LoginSpider(scrapy.Spider):
    name = 'login-spider'
    login_url = 'http://quotes.toscrape.com/login'
    start_urls = [login_url]

    def parse(self, response):
        # extract the csrf token value
        token = response.css('input[name="csrf_token"]::attr(value)').extract_first()

        data = {
            'csrf_token': token,
            'username': 'abc',
            'password': 'abc',
        }
        yield scrapy.FormRequest(url=self.login_url, formdata=data, callback=self.parse_quotes)

    def parse_quotes(self, response):
        for q in response.css('div.quote'):
            yield {
                'author_name': q.css('small.author::text').extract_files(),
                'author_url': q.css(
                    'small.author ~ a[href*="goodreads.com"]::attr(href)'

                ).extract_first()
            }