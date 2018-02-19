import scrapy

global counter
counter = 0
result = {}
data = {}


class DoctorsDataItem(scrapy.Spider):
    name = 'doctor-spider'
    login_url = 'https://www.nwh.org/find-a-doctor/ContentPage.aspx?nd=847'
    url2 = 'https://www.nwh.org/find-a-doctor/find-a-doctor-home?type=1'
    start_urls = [login_url]

    def parse(self, response):
        global counter
        for i in range(1):
            special = response.css(
                '#ctl00_cphContent_ctl01_ddlResultsSpecialties > option::attr(value)').extract_first()
            token = response.css('input[name="__VIEWSTATEGENERATOR"]::attr(value)').extract_first()
            input_value = response.css('.search-results-physician > input::attr(value)').extract()
            for i in range(50):
                if i <= 9:
                    key = 'ctl00$cphContent$ctl01$rptResults$ctl0' + str(i) + '$hdnPhysicianID'
                else:
                    key = 'ctl00$cphContent$ctl01$rptResults$ctl' + str(i) + '$hdnPhysicianID'
                data[key] = input_value or ""
            if counter == 0:
                event_target = 'ctl00$cphContent$ctl01$lnkSeachResults'
            else:
                event_target = 'ctl00$cphContent$ctl01$lbResultsNext'

            state = response.css('input[name="__VIEWSTATE"]::attr(value)').extract_first()
            counter = counter + 1
            # ctl00$cphContent$ctl01$lnkSeachResults
            data.update({
                'ctl00$cphContent$ctl01$ddlResultsSpecialties': special,
                'ctl00$cphContent$ctl01$ddlPublished': "False",
                '__VIEWSTATE': state,
                '__VIEWSTATEGENERATOR': token,
                '__EVENTTARGET': event_target,
                'ctl00$cphContent$ctl01$ddlResultsPerPage': "50",
                'ctl00$header$searchRdoBtn': "0",
                'ctl00$header$hdnHoverLocationId': "1",
                'ctl00$header$rptLocation$ctl00$hdnLocationId': "1",
                'ctl00$header$rptLocation$ctl01$hdnLocationId': "2",
                'ctl00$header$rptLocation$ctl02$hdnLocationId': "3",
                'ctl00$header$rptLocation$ctl03$hdnLocationId': "4",
                'ctl00$header$rptLocation$ctl04$hdnLocationId': "5",
                'ctl00$header$rptLocation$ctl05$hdnLocationId': "6",
                'ctl00$header$rptLocation$ctl06$hdnLocationId': "7",
                'ctl00$header$rptLocation$ctl07$hdnLocationId': "8",
                'ctl00$cphContent$ctl01$ddlPhysicianRefferalRequired': "-1",
                'ctl00$cphContent$ctl01$ddlAcceptNewPatients': "-1",
                'ctl00$cphContent$ctl01$ddlConcierge': "-1",
            })
            # print("previous data is ", data)

            yield scrapy.FormRequest(url=self.login_url, formdata=data, callback=self.parse_detail)

    def parse_detail(self, response):
        global counter
        url = 'https://www.nwh.org/find-a-doctor/find-a-doctor-profile/'
        doctor_data = {}
        for q in response.css('.search-results-col2.find-a-doctor-results'):
            temp = q.css('h1.h1name::text').extract()
            # gettting individual doctor profile
            post_request = response.css('a.link-name-profile::attr(href)').extract_first()
            post_request = post_request[25:-5]
            #print("post request is ", post_request)

            special = response.css(
                '#ctl00_cphContent_ctl01_ddlResultsSpecialties > option::attr(value)').extract_first()
            token = response.css('input[name="__VIEWSTATEGENERATOR"]::attr(value)').extract_first()
            state = response.css('input[name="__VIEWSTATE"]::attr(value)').extract_first()
            content = response.css('meta[name="og:url"]::attr(content)').extract_first()
            input_value = response.css('.search-results-physician > input::attr(value)').extract()

            for i in range(50):
                if i <= 9:
                    key = 'ctl00$cphContent$ctl01$rptResults$ctl0' + str(i) + '$hdnPhysicianID'
                else:
                    key = 'ctl00$cphContent$ctl01$rptResults$ctl' + str(i) + '$hdnPhysicianID'
                doctor_data[key] = input_value or ""

            for k in range(50):
                doctor_id = (doctor_data.values())[k]
                doctor_data.update({
                    'ctl00$cphContent$ctl01$ddlResultsSpecialties': special,
                    'ctl00$cphContent$ctl01$ddlPublished': "False",
                    '__VIEWSTATE': state,
                    '__VIEWSTATEGENERATOR': token,
                    '__EVENTTARGET': post_request,
                    'ctl00$header$searchRdoBtn': "0",
                    'ctl00$header$hdnHoverLocationId': "1",
                    'ctl00$header$rptLocation$ctl00$hdnLocationId': "1",
                    'ctl00$header$rptLocation$ctl01$hdnLocationId': "2",
                    'ctl00$header$rptLocation$ctl02$hdnLocationId': "3",
                    'ctl00$header$rptLocation$ctl03$hdnLocationId': "4",
                    'ctl00$header$rptLocation$ctl04$hdnLocationId': "5",
                    'ctl00$header$rptLocation$ctl05$hdnLocationId': "6",
                    'ctl00$header$rptLocation$ctl06$hdnLocationId': "7",
                    'ctl00$header$rptLocation$ctl07$hdnLocationId': "8",
                    'ctl00$cphContent$ctl01$hdnDoctorId': doctor_id,

                })
                yield scrapy.FormRequest(url=self.login_url, formdata=doctor_data, callback=self.individual_detail,
                                         dont_filter=True)

            result.update({
                'doctor_name': temp
            })
            # for name getter
        print("after first request", result)
        for i in range(1):
            special = response.css(
                '#ctl00_cphContent_ctl01_ddlResultsSpecialties > option::attr(value)').extract_first()
            token = response.css('input[name="__VIEWSTATEGENERATOR"]::attr(value)').extract_first()
            input_value = response.css('.search-results-physician > input::attr(value)').extract()
            for i in range(50):
                if i <= 9:
                    key = 'ctl00$cphContent$ctl01$rptResults$ctl0' + str(i) + '$hdnPhysicianID'
                else:
                    key = 'ctl00$cphContent$ctl01$rptResults$ctl' + str(i) + '$hdnPhysicianID'
                data[key] = input_value or ""
            if counter == 0:
                event_target = 'ctl00$cphContent$ctl01$lnkSeachResults'
            else:
                event_target = 'ctl00$cphContent$ctl01$lbResultsNext'

            #    print("input value", input_value)
            state = response.css('input[name="__VIEWSTATE"]::attr(value)').extract_first()
            # ctl00$cphContent$ctl01$lnkSeachResults
            data.update({
                'ctl00$cphContent$ctl01$ddlResultsSpecialties': special,
                'ctl00$cphContent$ctl01$ddlPublished': "False",
                '__VIEWSTATE': state,
                '__VIEWSTATEGENERATOR': token,
                '__EVENTTARGET': event_target,
                'ctl00$cphContent$ctl01$ddlResultsPerPage': "50",
                'ctl00$header$searchRdoBtn': "0",
                'ctl00$header$hdnHoverLocationId': "1",
                'ctl00$header$rptLocation$ctl00$hdnLocationId': "1",
                'ctl00$header$rptLocation$ctl01$hdnLocationId': "2",
                'ctl00$header$rptLocation$ctl02$hdnLocationId': "3",
                'ctl00$header$rptLocation$ctl03$hdnLocationId': "4",
                'ctl00$header$rptLocation$ctl04$hdnLocationId': "5",
                'ctl00$header$rptLocation$ctl05$hdnLocationId': "6",
                'ctl00$header$rptLocation$ctl06$hdnLocationId': "7",
                'ctl00$header$rptLocation$ctl07$hdnLocationId': "8",
                'ctl00$cphContent$ctl01$ddlPhysicianRefferalRequired': "-1",
                'ctl00$cphContent$ctl01$ddlAcceptNewPatients': "-1",
                'ctl00$cphContent$ctl01$ddlConcierge': "-1",
            })

            yield scrapy.FormRequest(url=self.login_url, formdata=data, callback=self.testing, dont_filter=True)

    def testing(self, response):
        for q in response.css('.search-results-col2.find-a-doctor-results'):
            result.update({
                'doctor_name': q.css('h1.h1name::text').extract()
            })
        print(result)

    def individual_detail(self, response):
        for quote in response.css('div.pnl-doctor-contact-info'):
            item = {
                'name': quote.css('h1.header-doctor-name::text').extract_first(),
                'title': quote.css('div.pnl-doctor-specialty > h2::text').extract_first(),
                'year': quote.css('div.pnl-doctor-year-joined.pnl-doctor-specialty > h2::text').extract_first(),
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
