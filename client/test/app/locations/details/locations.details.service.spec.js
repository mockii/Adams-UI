
'use strict';

describe('LocationsDetailsService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        logService = {},
        urlSpace,
        mockHttp,
        promise,
        locationsSearchData = '{"data":[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]}';

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.locations.details.service'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('STGLogService', logService);
        });
    });

    beforeEach(inject(function($rootScope, _$httpBackend_, LocationsDetailsService, _$q_, ADAMS_URL_SPACE, STGLogService, $log){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = LocationsDetailsService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;
        logService = STGLogService;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should getLocationDetailsByLocationCode Info', function(){
        var locationCode = 'LBFNWCU4',
            url = urlSpace.urls.local.getLocationDetailsByLocationCode.replace('{locationCode}', locationCode);
        locationsSearchData = JSON.parse(locationsSearchData);
        $httpBackend.expectGET(url).respond(locationsSearchData);
        sampleSvcObj.getLocationDetailsByLocationCode(locationCode).then(function(response) {
            expect(response).toEqual(locationsSearchData.data[0]);
        });
        $httpBackend.flush();
    });

    it('should throw error getLocationDetailsByLocationCode Info', function(){
        var locationCode = 'LBFNWCU4',
            url = urlSpace.urls.local.getLocationDetailsByLocationCode.replace('{locationCode}', locationCode);
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getLocationDetailsByLocationCode(locationCode).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should addLocation Info', inject(function($rootScope){
        var locationCode = 'LBFNWCU4',
            locationsRowData = {data: {data: [{
                "location_code": "LBFNWCU4",
                "location_name": "sdfsdf",
                "location_description": null,
                "address1": "asd",
                "address2": "xcvxv",
                "city": "sdfsdf",
                "state": "AZ",
                "zip": "00000",
                "active": true,
                "longitude_latitude": "",
                "created_by": null,
                "created_date": null,
                "modified_by": null,
                "modified_date": null
            }]}},
            url = urlSpace.urls.local.addLocation;
        // spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectPOST(url).respond(locationsRowData);
        sampleSvcObj.addLocation(locationsRowData).then(function(response) {
            expect(response).toEqual(undefined);
        });
        $httpBackend.flush();
    }));

    it('should return empty addLocation on error ', function(){
        var locationCode = 'LBFNWCU4',
            locationsRowData = {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},
            url = urlSpace.urls.local.addLocation;
        $httpBackend.expectPOST(url).respond(400, {});
        sampleSvcObj.addLocation(locationsRowData).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });


    it('should updateLocationDetailsByLocationCode Info', inject(function($rootScope){
        var locationCode = 'LBFNWCU4',
            locationsRowData = {data: {data: [{
                "location_code": "LBFNWCU4",
                "location_name": "sdfsdf",
                "location_description": null,
                "address1": "asd",
                "address2": "xcvxv",
                "city": "sdfsdf",
                "state": "AZ",
                "zip": "00000",
                "active": true,
                "longitude_latitude": "",
                "created_by": null,
                "created_date": null,
                "modified_by": null,
                "modified_date": null
            }]}},
            url = urlSpace.urls.local.updateLocationDetailsByLocationCode.replace('{locationCode}', locationCode)+'?locationCode='+locationCode;
        // spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectPUT(url).respond(locationsRowData);
        sampleSvcObj.updateLocationDetailsByLocationCode({location_code: "LBFNWCU4"}).then(function(response) {
            expect(response).toEqual(undefined);
        });
        $httpBackend.flush();
    }));

    it('should return empty updateLocationDetailsByLocationCode on error ', function(){
        var locationCode = 'LBFNWCU4',
            locationsRowData = {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},
            url = urlSpace.urls.local.updateLocationDetailsByLocationCode.replace('{locationCode}', locationCode)+'?locationCode='+locationCode;
        $httpBackend.expectPUT(url).respond(400, {});
        sampleSvcObj.updateLocationDetailsByLocationCode({location_code: "LBFNWCU4"}).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });
});