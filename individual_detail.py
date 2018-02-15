import scrapy


class Individual_detail(scrapy.Spider):
    name = 'quotes'
    allowed_domains = ['https://www.nwh.org/find-a-doctor/find-a-doctor-profile/elisa-abdulhayoglu-md']
    start_urls = ['https://www.nwh.org/find-a-doctor/find-a-doctor-profile/elisa-abdulhayoglu-md']

    def parse(self, response):

        for quote in response.css('div.pnl-doctor-contact-info'):
            item = {
                'name': quote.css('h1.header-doctor-name::text').extract_first(),
                'title': quote.css('div.pnl-doctor-specialty > h2::text').extract_first(),
                'year':  quote.css('div.pnl-doctor-year-joined.pnl-doctor-specialty > h2::text').extract_first(),
                'phone': quote.css('div.pnl-doctor-contact-phone>a::attr(href)').extract_first(),
                'fax': quote.css('#ctl00_cphContent_ctl01_lnkDocContactPhone > span::text').extract_first(),
                'certification': quote.css('#ctl00_cphContent_ctl01_pnlBoardOfCertifications > ul >li::text').extract(),
                'medical_school': quote.css('#ctl00_cphContent_ctl01_pnlMedicalSchool > ul >li::text').extract_first(),
                'internship': quote.css('#ctl00_cphContent_ctl01_pnlInternship > ul >li::text').extract_first(),
                'residency': quote.css('#ctl00_cphContent_ctl01_pnlResidency > ul >li::text').extract_first(),
                'fellowship': quote.css('#ctl00_cphContent_ctl01_pnlFellowship > ul >li::text').extract(),
                'address': quote.css('#ctl00_cphContent_ctl01_pnlFellowship > ul >li::text').extract(),
            }
            yield item

