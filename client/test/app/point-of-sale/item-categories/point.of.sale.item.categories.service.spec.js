
'use strict';

describe('PosItemCategoriesService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        logService = {},
        urlSpace,
        itemCategoriesData = '{"data":[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]}';

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.point.of.sale.item.categories.service'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('STGLogService', logService);
        });
    });

    beforeEach(inject(function($rootScope, _$httpBackend_, PosItemCategoriesService, _$q_, ADAMS_URL_SPACE, STGLogService, $log){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = PosItemCategoriesService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;
        logService = STGLogService;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should getAllPosItemCategoriesDetails Info', function(){
        var url = urlSpace.urls.local.getPosItemCategories +'?limit=undefined&page=undefined&sorts=undefined&search=undefined';
        itemCategoriesData = JSON.parse(itemCategoriesData);
        $httpBackend.expectGET(url).respond(itemCategoriesData);
        sampleSvcObj.getAllPosItemCategoriesDetails().then(function(response) {
            expect(response).toEqual(itemCategoriesData);
        });
        $httpBackend.flush();
    });

    it('should throw error getAllPosItemCategoriesDetails Info', function(){
        var url = urlSpace.urls.local.getPosItemCategories +'?limit=undefined&page=undefined&sorts=undefined&search=undefined';
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getAllPosItemCategoriesDetails().then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should abort promise', function(){
        var limit = 25,
            page = 1,
            sort = '',
            url = urlSpace.urls.local.getPosItemCategories + '?limit=25&page=1&sorts=&search={}';

        $httpBackend.expectGET(url).respond({});
        sampleSvcObj.getAllPosItemCategoriesDetails(limit, page, {}, sort).abort();
    });

    it('should addPosItemCategory Info', function(){
        var url = urlSpace.urls.local.addPosItemCategory,
            response = {data: itemCategoriesData};

        $httpBackend.expectPOST(url).respond(response);
        sampleSvcObj.addPosItemCategory({}).then(function(response) {
            expect(response).toBeUndefined();
        });
        $httpBackend.flush();
    });

    it('should return empty addPosItemCategory on error ', function(){
        var url = urlSpace.urls.local.addPosItemCategory;
        $httpBackend.expectPOST(url).respond(400, {});
        sampleSvcObj.addPosItemCategory({}).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });


    it('should updatePosItemCategory Info', inject(function($rootScope){
        var url = urlSpace.urls.local.updatePosItemCategory,
            response = {data: itemCategoriesData};
        $httpBackend.expectPUT(url).respond(response);
        sampleSvcObj.updatePosItemCategory({}).then(function(response) {
            expect(response).toBeUndefined();
        });
        $httpBackend.flush();
    }));

    it('should return empty updatePosItemCategory on error ', function(){
        var url = urlSpace.urls.local.updatePosItemCategory;
        $httpBackend.expectPUT(url).respond(400, {});
        sampleSvcObj.updatePosItemCategory({}).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });
});