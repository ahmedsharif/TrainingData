import scrapy


class DoctorSpider(scrapy.Spider):
    name = 'doctor-spider'
    login_url = 'https://www.nwh.org/find-a-doctor/find-a-doctor-home'
    start_urls = [login_url]

    def parse(self, response):
        token = response.css('.search-results-text > option::attr(value)').extract_first()

        data = {
            'speciality': token,
        }
        yield scrapy.FormRequest(url=self.login_url, formdata=data, callback=self.parse_detail)

    def parse_detail(self, response):
        for q in response.css('div'):
            yield {
                'doctor_name': q.css('.link-name-profile > h1::text').extract_files().extract_first()
                #'author_url': q.css(
                #    'small.author ~ a[href*="goodreads.com"]::attr(href)'

            }

    def parse_cities(self, response):
        for city in response.xpath('//select[@id="cmp-salary-loc-select"]/option/@value').extract():
            yield scrapy.Request(response.urljoin("/" + city), callback=some_method)