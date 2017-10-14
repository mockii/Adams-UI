'use strict';

describe('CostCenterMappingService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        promise,
        urlSpace,
        marketMappingData = '[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]';

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.costcenter.market.mapping.service'));

    beforeEach(inject(function($rootScope, _$httpBackend_, CostCenterMarketMappingService, _$q_, ADAMS_URL_SPACE){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = CostCenterMarketMappingService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;

        promise = {
            abort: jasmine.createSpyObj('promise', ['abort'])
        }
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get Market Mapping Data', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            costCenterNumber='',
            sourceSystemId='',
            search=null,
            teamName = '',

            url = urlSpace.urls.local.costCenterAndListMarkets + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterNumber=' + costCenterNumber + '&sourceSystemId=' + sourceSystemId + '&search=' + JSON.stringify(search);
        spyOn(promise, 'abort').and.callThrough();
        marketMappingData = JSON.parse(marketMappingData);
        $httpBackend.expectGET(url).respond(marketMappingData);
        sampleSvcObj.getMarketMappingData(limit, page, sort, costCenterNumber, sourceSystemId, search).then(function(data) {
            expect(data[0]).toEqual(marketMappingData[0]);
        });
        $httpBackend.flush();
    });

    it('should error app by get Market Mapping Data', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            costCenterNumber='',
            sourceSystemId='',
            search=null,
            teamName = '',

            url = urlSpace.urls.local.costCenterAndListMarkets + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterNumber=' + costCenterNumber + '&sourceSystemId=' + sourceSystemId + '&search=' + JSON.stringify(search);
        spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getMarketMappingData(limit, page, sort, costCenterNumber, sourceSystemId, search).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should abort Market Mapping Data promise', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            costCenterNumber='',
            sourceSystemId='',
            search=null,
            teamName = '',

            url = urlSpace.urls.local.costCenterAndListMarkets + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterNumber=' + costCenterNumber + '&sourceSystemId=' + sourceSystemId + '&search=' + JSON.stringify(search);
        $httpBackend.expectGET(url).respond(marketMappingData);
        sampleSvcObj.getMarketMappingData(limit, page, sort, costCenterNumber, sourceSystemId, search).abort();
    });

    it('should getDefaultMarket', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            costCenterNumber='',
            sourceSystemId='',
            search={default_market: true},
            teamName = '',

            url = urlSpace.urls.local.costCenterAndListMarkets + '?limit=' + 10 + '&page=' + 1 + '&sorts=' + null + '&costCenterNumber=' + costCenterNumber + '&sourceSystemId=' + sourceSystemId + '&search=' + JSON.stringify(search);
        spyOn(promise, 'abort').and.callThrough();
        var responseData = {
            data: {
                data: [{}]
            }
        };
        $httpBackend.expectGET(url).respond(responseData);
        sampleSvcObj.getDefaultMarket(costCenterNumber, sourceSystemId).then(function(data) {
            expect(data).toEqual(undefined);
        });
        $httpBackend.flush();
    });

    it('should error getDefaultMarket', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            costCenterNumber='',
            sourceSystemId='',
            search={default_market: true},
            teamName = '',

            url = urlSpace.urls.local.costCenterAndListMarkets + '?limit=' + 10 + '&page=' + 1 + '&sorts=' + null + '&costCenterNumber=' + costCenterNumber + '&sourceSystemId=' + sourceSystemId + '&search=' + JSON.stringify(search);
        spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getDefaultMarket(costCenterNumber, sourceSystemId).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });


    it('should delete marketing Info', function(){
        var costCenterNumber = "10016000",
            sourceSystemId = "1001",
            marketName='',
            message = "Success",
            url= urlSpace.urls.local.deleteCostCentersMarkets.replace('{costCenterNumber}', costCenterNumber).replace('{marketName}', marketName) + '?sourceSystemId=' + sourceSystemId;
        $httpBackend.expectDELETE(url).respond(message);
        sampleSvcObj.deleteCostCentersMarket(costCenterNumber, marketName, sourceSystemId)
            .then(function(response) {
                expect(response.data).toEqual(message);
            });
        $httpBackend.flush();
    });

    it('should error app by delete Market Mapping Data', function(){
        var costCenterNumber = "10016000",
            sourceSystemId = "1001",
            marketName='',
            message = "Success",
            url= urlSpace.urls.local.deleteCostCentersMarkets.replace('{costCenterNumber}', costCenterNumber).replace('{marketName}', marketName) + '?sourceSystemId=' + sourceSystemId;
            $httpBackend.expectDELETE(url).respond(400, {});
            sampleSvcObj.deleteCostCentersMarket(costCenterNumber, marketName, sourceSystemId)
            .then(function(data) {
                expect(data).toEqual('error');
            });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should add marketing Info', function(){
        var costCenterNumber = "10016000",
            sourceSystemId = "1001",
            marketName='',
            message = "Success",
            url= urlSpace.urls.local.addCostCenterMarketMapping.replace('{costCenterNumber}', costCenterNumber) + '?sourceSystemId=' + sourceSystemId;

        $httpBackend.expectPOST(url).respond(message);
        sampleSvcObj.addCostCenterMarketMapping(costCenterNumber, marketMappingData, sourceSystemId)
            .then(function(response) {
                expect(response.data).toEqual(message);
            });
        $httpBackend.flush();
    });

    it('should error app by add Market Mapping Data', function(){
        var costCenterNumber = "10016000",
            sourceSystemId = "1001",
            marketName='',
            message = "Success",
            url= urlSpace.urls.local.addCostCenterMarketMapping.replace('{costCenterNumber}', costCenterNumber) + '?sourceSystemId=' + sourceSystemId;
            $httpBackend.expectPOST(url).respond(400, {});
        sampleSvcObj.addCostCenterMarketMapping(costCenterNumber, marketMappingData, sourceSystemId).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });

});