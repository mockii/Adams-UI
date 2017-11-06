
'use strict';

describe('PosItemClassesService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        logService = {},
        urlSpace,
        itemClassesData = '{"data":[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]}';

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.point.of.sale.item.classes.service'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('STGLogService', logService);
        });
    });

    beforeEach(inject(function($rootScope, _$httpBackend_, PosItemClassesService, _$q_, ADAMS_URL_SPACE, STGLogService, $log){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = PosItemClassesService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;
        logService = STGLogService;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should getAllPosItemClassesDetails Info', function(){
        var url = urlSpace.urls.local.getPosItemClasses +'?limit=undefined&page=undefined&sorts=undefined&search=undefined';
        itemClassesData = JSON.parse(itemClassesData);
        $httpBackend.expectGET(url).respond(itemClassesData);
        sampleSvcObj.getAllPosItemClassesDetails().then(function(response) {
            expect(response).toEqual(itemClassesData);
        });
        $httpBackend.flush();
    });

    it('should throw error getAllPosItemClassesDetails Info', function(){
        var url = urlSpace.urls.local.getPosItemClasses +'?limit=undefined&page=undefined&sorts=undefined&search=undefined';
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getAllPosItemClassesDetails().then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should abort promise', function(){
        var limit = 25,
            page = 1,
            sort = '',
            url = urlSpace.urls.local.getPosItemClasses + '?limit=25&page=1&sorts=&search={}';

        $httpBackend.expectGET(url).respond({});
        sampleSvcObj.getAllPosItemClassesDetails(limit, page, {}, sort).abort();
    });

    it('should addPosItemClass Info', function(){
        var url = urlSpace.urls.local.addPosItemClass,
            response = {data: itemClassesData};

        $httpBackend.expectPOST(url).respond(response);
        sampleSvcObj.addPosItemClass({}).then(function(response) {
            expect(response).toBeUndefined();
        });
        $httpBackend.flush();
    });

    it('should return empty addPosItemClass on error ', function(){
        var url = urlSpace.urls.local.addPosItemClass;
        $httpBackend.expectPOST(url).respond(400, {});
        sampleSvcObj.addPosItemClass({}).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });


    it('should updatePosItemClass Info', inject(function($rootScope){
        var url = urlSpace.urls.local.updatePosItemClass,
            response = {data: itemClassesData};
        $httpBackend.expectPUT(url).respond(response);
        sampleSvcObj.updatePosItemClass({}).then(function(response) {
            expect(response).toBeUndefined();
        });
        $httpBackend.flush();
    }));

    it('should return empty updatePosItemClass on error ', function(){
        var url = urlSpace.urls.local.updatePosItemClass;
        $httpBackend.expectPUT(url).respond(400, {});
        sampleSvcObj.updatePosItemClass({}).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });
});