import scrapy

global counter
counter = 0
data = {}


class DoctorsDataItem(scrapy.Spider):
    name = 'doctor-spider'
    login_url = 'https://www.nwh.org/find-a-doctor/ContentPage.aspx?nd=847'
    start_urls = [login_url]

    def get_parameters(self, response):
        # Get parameters of form request
        special = response.css('#ctl00_cphContent_ctl01_ddlResultsSpecialties > option::attr(value)').extract_first()
        token = response.css('input[name="__VIEWSTATEGENERATOR"]::attr(value)').extract_first()
        input_value = response.css('.search-results-physician > input::attr(value)').extract()

        # get Physician id from one page
        for i in range(50):
            if i <= 9:
                key = 'ctl00$cphContent$ctl01$rptResults$ctl0' + str(i) + '$hdnPhysicianID'
            else:
                key = 'ctl00$cphContent$ctl01$rptResults$ctl' + str(i) + '$hdnPhysicianID'
            data[key] = input_value or ""

        event_target = 'ctl00$cphContent$ctl01$lnkSeachResults'
        state = response.css('input[name="__VIEWSTATE"]::attr(value)').extract_first()
        # put parameters in dictionary
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
        return data

    def parse(self, response):
        global counter

        if counter == 0:
            event_target = 'ctl00$cphContent$ctl01$lnkSeachResults'
        else:
            event_target = 'ctl00$cphContent$ctl01$lbResultsNext'

        data = self.get_parameters(response)

        data.update({
            '__EVENTTARGET': event_target,
        })

        counter = counter + 1

        yield scrapy.FormRequest(url=self.login_url, formdata=data, callback=self.parse_detail)

    def get_individual_params(self, response):
        special = response.css(
            '#ctl00_cphContent_ctl01_ddlResultsSpecialties > option::attr(value)').extract_first()

        token = response.css('input[name="__VIEWSTATEGENERATOR"]::attr(value)').extract_first()
        state = response.css('input[name="__VIEWSTATE"]::attr(value)').extract_first()
        doctor_data = {}
        # set physician id's here
        for i in range(50):
            if i <= 9:
                key = 'ctl00$cphContent$ctl01$rptResults$ctl0' + str(i) + '$hdnPhysicianID'
            else:
                key = 'ctl00$cphContent$ctl01$rptResults$ctl' + str(i) + '$hdnPhysicianID'
            doctor_data[key] = input_value or ""
            input_value = response.css('.search-results-physician > input::attr(value)').extract()

        # get doctor id and put it in dictionary
        for k in range(5):
            doctor_id = (doctor_data.values())[k]

            post_request = response.css('a.link-name-profile::attr(href)')[k].extract()
            post_request = post_request[25:-5]

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

    def parse_detail(self, response):
        self.get_individual_params(response)

        # for pagination data parse
        for i in range(2):
            event_target = 'ctl00$cphContent$ctl01$lbResultsNext'
            data = self.get_parameters(response)
            data.update({
                '__EVENTTARGET': event_target,
            })
            yield scrapy.FormRequest(url=self.login_url, formdata=data, callback=self.parse_pages, dont_filter=True)

    def parse_pages(self, response):
        special = response.css('#ctl00_cphContent_ctl01_ddlResultsSpecialties > option::attr(value)').extract_first()
        token = response.css('input[name="__VIEWSTATEGENERATOR"]::attr(value)').extract_first()
        input_value = response.css('.search-results-physician > input::attr(value)').extract()
        state = response.css('input[name="__VIEWSTATE"]::attr(value)').extract_first()
        doctor_data = {}

        for i in range(50):
            if i <= 9:
                key = 'ctl00$cphContent$ctl01$rptResults$ctl0' + str(i) + '$hdnPhysicianID'
            else:
                key = 'ctl00$cphContent$ctl01$rptResults$ctl' + str(i) + '$hdnPhysicianID'
            doctor_data[key] = input_value or ''
        # print("doctors values are ", doctor_data.values())

        for k in range(5):
            doctor_id = (doctor_data.values())[k]
            # print("post request is ", post_request)
            post_request = response.css('a.link-name-profile::attr(href)')[k].extract()
            post_request = post_request[25:-5]

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

    def individual_detail(self, response):
        # for quote in response.css('div.pnl-doctor-contact-info'):
        quote = response.css('div.pnl-doctor-contact-info')
        item = {
            'name': quote.css('h1.header-doctor-name::text').extract_first(),
            'title': quote.css('div.pnl-doctor-specialty > h2::text').extract_first().strip(),
            'year': quote.css('div.pnl-doctor-year-joined.pnl-doctor-specialty > h2::text').extract_first().strip(),
            'phone': quote.css('div.pnl-doctor-contact-phone>a::attr(href)').extract_first(),
            'fax': quote.css('#ctl00_cphContent_ctl01_lnkDocContactPhone > span::text').extract_first(),
            'certification': quote.css(
                '#ctl00_cphContent_ctl01_pnlBoardOfCertifications > ul >li::text').extract_first(),
            'medical_school': quote.css('#ctl00_cphContent_ctl01_pnlMedicalSchool > ul >li::text').extract_first(),
            'internship': quote.css('#ctl00_cphContent_ctl01_pnlInternship > ul >li::text').extract_first(),
            'residency': quote.css('#ctl00_cphContent_ctl01_pnlResidency > ul >li::text').extract_first(),
            'fellowship': quote.css('#ctl00_cphContent_ctl01_pnlFellowship > ul >li::text').extract_first(),
            'address': quote.css('#ctl00_cphContent_ctl01_pnlFellowship > ul >li::text').extract(),
        }
        yield item
