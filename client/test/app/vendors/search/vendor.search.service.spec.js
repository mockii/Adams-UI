/**
 * Created by RegonS01 on 10/18/2016.
 */

'use strict';

describe('VendorSearchService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $log,
        $httpBackend,
        urlSpace,
        Fact,
        mockHttp,
        promise,
        vendorSearchData = '[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]';

    beforeAll(function(){vendorSearchData = JSON.parse(vendorSearchData)});

    beforeEach(module('common.url'));
    beforeEach(module('common.modules.logging'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.vendor.search.service'));

    beforeEach(inject(function($rootScope, _$httpBackend_, VendorSearchService, _$q_, ADAMS_URL_SPACE, $log){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = VendorSearchService;
        $q = _$q_;
        $log = $log;
        urlSpace  = ADAMS_URL_SPACE;

        /*promise = {
         abort: jasmine.createSpy('mockModal.close')
         }*/
        // promise = jasmine.createSpyObj('promise', ['abort']);
        promise = {
            abort: jasmine.createSpyObj('promise', ['abort'])
        }

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    /*it('should get Vendor Detail Info', function(){
        var limit = 25,
            page = 1,
            vendorSearchInput = '',
            sort = '',
            sourceSystemId = '1001',
            inCorrectUrl = urlSpace.urls.local.vendorSearchData + '?limit=' + limit + '&page=' + page  + '&vendorSearchInput=' + JSON.stringify(vendorSearchInput) + '&sorts=' + sort + '&source_system_id=' + sourceSystemId ;

        spyOn(promise, 'abort').and.callThrough();
        // var data = JSON.parse(vendorSearchData);
        $httpBackend.expectGET(inCorrectUrl).respond(500);
        console.log("$httpbackend expectGet",$httpBackend.expectGET(inCorrectUrl));
        console.log("$httpbackend expectGet respond",$httpBackend.expectGET(inCorrectUrl).respond(404));
        sampleSvcObj.getAllVendorSearchDetails(limit, page, vendorSearchInput, sort, sourceSystemId).then(function(data) {
            var deferred = $q.defer();
            deferred.resolve({});
            deferred.promise.abort = function(){};
            console.log("am here now", deferred.promise);
            return deferred.promise;
        });
        $httpBackend.flush();
        $scope.watch();
    });*/

    it('should get Vendor Detail Info', function(){
        var limit = 25,
            page = 1,
            vendorSearchInput = '',
            sort = '',
            sourceSystemId = '1001',
            url = urlSpace.urls.local.vendorSearchData + '?limit=' + limit + '&page=' + page  + '&vendorSearchInput=' + JSON.stringify(vendorSearchInput) + '&sorts=' + sort + '&source_system_id=' + sourceSystemId ;

        spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(vendorSearchData);
        sampleSvcObj.getAllVendorSearchDetails(limit, page, vendorSearchInput, sort, sourceSystemId).then(function(data) {
            expect(data[0]).toEqual(vendorSearchData[0]);
        });
        $httpBackend.flush();
    });

    it('should return empty Vendor Detail Info on error ', function(){
        var limit = 25,
            page = 1,
            vendorSearchInput = '',
            sort = '',
            sourceSystemId = '1001',
            url = urlSpace.urls.local.vendorSearchData + '?limit=' + limit + '&page=' + page  + '&vendorSearchInput=' + JSON.stringify(vendorSearchInput) + '&sorts=' + sort + '&source_system_id=' + sourceSystemId ;

        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getAllVendorSearchDetails(limit, page, vendorSearchInput, sort, sourceSystemId).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should abort promise', function(){
        var limit = 25,
            page = 1,
            vendorSearchInput = '',
            sort = '',
            sourceSystemId = '1001',
            url = urlSpace.urls.local.vendorSearchData + '?limit=' + limit + '&page=' + page  + '&vendorSearchInput=' + JSON.stringify(vendorSearchInput) + '&sorts=' + sort + '&source_system_id=' + sourceSystemId ;

        $httpBackend.expectGET(url).respond(vendorSearchData);
        sampleSvcObj.getAllVendorSearchDetails(limit, page, vendorSearchInput, sort, sourceSystemId).abort();
    });

    /*it('should call abort ', inject(function($http){
        mockHttp = function(){
         var deferred = $q.defer();
         deferred.resolve({});
         deferred.promise.abort = function(){};
         return deferred.promise;
         };

        spyOn($http, 'get').and.returnValue(mockHttp);
        // $http = mockHttp;
        // Fact = $factory('VendorSearchService', { $rootScope: $rootScope, $http: mockHttp, ADAMS_URL_SPACE: ADAMS_URL_SPACE, $q: $q, $log: $log});


        var limit = 25,
            page = 1,
            vendorSearchInput = '',
            sort = '',
            sourceSystemId = '1001',
            url = urlSpace.urls.local.vendorSearchData + '?limit=' + limit + '&page=' + page  + '&vendorSearchInput=' + JSON.stringify(vendorSearchInput) + '&sorts=' + sort + '&source_system_id=' + sourceSystemId ;

        var promise = $httpBackend.expectGET(url).respond({});
        promise.abort = function() {};
        spyOn(promise, 'abort').and.returnValue({});
        /!*console.log(promise);
        console.log(promise);*!/
        sampleSvcObj.getAllVendorSearchDetails(limit, page, vendorSearchInput, sort, sourceSystemId).then(function(data) {
            // expect(data).toEqual([]);
            // expect()
        });
        $httpBackend.flush();
        scope.$digest();
    }));*/
});
