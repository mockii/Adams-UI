/**
 * Created by RegonS01 on 10/18/2016.
 */
describe('CostCenterMappingService', function(){
    'use strict';
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        urlSpace,
        costCenterMappingDataResponse = '[{"vendor_number":"13031159","vendor_name_1":"C & S VENDING CO","cost_center_name":"100","cost_center_description":"C&S Vending","compliance":null,"edi_pay_status":0,"edi_live_date":null,"associated":false,"associated_by":null,"associated_date":null,"disassociated_by":null,"disassociated_date":null,"disassociation_reason":"0","vendor_source_system_id":1001,"cost_center_source_system_id":1001,"created_by":"BATCHADM","created_date":"10-28-2016 18:45","modified_by":"BATCHADM","modified_date":"12-28-2016 22:47"}]',
        costCenterHistoryMappingDataResponse = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"0"},"data":[],"error":"{}"},
        costCenterRowData = {"vendor_number":"13031159","vendor_name_1":"C & S VENDING CO","cost_center_name":"100","cost_center_description":"C&S Vending","compliance":null,"edi_pay_status":0,"edi_live_date":null,"associated":false,"associated_by":null,"associated_date":null,"disassociated_by":null,"disassociated_date":null,"disassociation_reason":"0","vendor_source_system_id":1001,"cost_center_source_system_id":1001,"created_by":"BATCHADM","created_date":"10-28-2016 18:45","modified_by":"BATCHADM","modified_date":"12-28-2016 22:47","$$hashKey":"uiGrid-00SC"},
        eligibleCostCenterDataResponse = {},
        searchInput = {},
        costCenters = {},
        vendorNumber = "13031159",
        vendorSourceSystemId = "1001",
        limit = 25,
        page = 1,
        promise,
        sorts="";


    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.cost.center.mapping.service'));

    beforeEach(inject(function($rootScope, _$httpBackend_, CostCenterMappingService, _$q_, ADAMS_URL_SPACE){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = CostCenterMappingService;
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

    it("should exists", function() {
        expect(sampleSvcObj).toBeDefined();
    });

    /*it("if not exists", function() {
        expect(sampleSvcObj).toBeUndefined();
    });*/

    it('should getCostCenterMappingData', function(){
        var limit = 25,
            page = 1,
            costCenterSearchInput = {},
            vendorNumber='123',
            sort = '',
            fields = {},
            url = urlSpace.urls.local.vendorCostCenters.replace('{vendorNumber}',
                    vendorNumber) + '?limit=' + limit + '&page=' + page +
                '&sorts=' + sort + '&vendorNumber=' + vendorNumber +
                '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput);
        spyOn(promise, 'abort').and.callThrough();
        costCenterMappingDataResponse = JSON.parse(costCenterMappingDataResponse);
        $httpBackend.expectGET(url).respond(costCenterMappingDataResponse);
        sampleSvcObj.getCostCenterMappingData(limit, page, sorts, vendorNumber, costCenterSearchInput).then(function(response) {
            expect(response[0]).toEqual(costCenterMappingDataResponse[0]);
        });
        $httpBackend.flush();
    });

    it('should abort getCostCenterMappingData promise', function(){
        var limit = 25,
            page = 1,
            costCenterSearchInput = {},
            vendorNumber='123',
            sort = '',
            fields = {},
            url = urlSpace.urls.local.vendorCostCenters.replace('{vendorNumber}',
                vendorNumber) + '?limit=' + limit + '&page=' + page +
                '&sorts=' + sort + '&vendorNumber=' + vendorNumber +
                '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput);
        $httpBackend.expectGET(url).respond(costCenterMappingDataResponse);
        sampleSvcObj.getCostCenterMappingData(limit, page, sorts, vendorNumber, costCenterSearchInput).abort();
    });


    it('should error getCostCenterMappingData', function(){
        var limit = 25,
            page = 1,
            costCenterSearchInput = {},
            vendorNumber='123',
            sort = '',
            fields = {},
            url = urlSpace.urls.local.vendorCostCenters.replace('{vendorNumber}',
                    vendorNumber) + '?limit=' + limit + '&page=' + page +
                '&sorts=' + sort + '&vendorNumber=' + vendorNumber +
                '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput);
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getCostCenterMappingData(limit, page, sorts, vendorNumber, costCenterSearchInput).then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should getCostCenterMappingHistoryData ', function(){
        var limit = 25,
            page = 1,
            costCenterMappingHistorySearchInput = {},
            vendorNumber='123',
            sort = '',
            fields = {},
            url = urlSpace.urls.local.vendorCostCenterHistory.replace('{vendorNumber}', costCenterRowData.vendor_number).replace('{costCenterName}', costCenterRowData.cost_center_name) + '?vendorSourceSystemId=' + costCenterRowData.vendor_source_system_id + '&costCenterSourceSystemId=' + costCenterRowData.cost_center_source_system_id + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterMappingHistorySearchInput=' + JSON.stringify(costCenterMappingHistorySearchInput);
        spyOn(promise, 'abort').and.callThrough();
        //costCenterHistoryMappingDataResponse = JSON.parse(costCenterHistoryMappingDataResponse);
        $httpBackend.expectGET(url).respond(costCenterHistoryMappingDataResponse);
        sampleSvcObj.getCostCenterMappingHistoryData(limit, page, sorts, costCenterMappingHistorySearchInput, costCenterRowData).then(function(response) {
            expect(response.data).toEqual([]);
        });
        $httpBackend.flush();
    });

    it('should abort getCostCenterMappingHistoryData promise', function(){
        var limit = 25,
            page = 1,
            costCenterMappingHistorySearchInput = {},
            vendorNumber='123',
            sort = '',
            fields = {},
            url = urlSpace.urls.local.vendorCostCenterHistory.replace('{vendorNumber}', costCenterRowData.vendor_number).replace('{costCenterName}', costCenterRowData.cost_center_name) + '?vendorSourceSystemId=' + costCenterRowData.vendor_source_system_id + '&costCenterSourceSystemId=' + costCenterRowData.cost_center_source_system_id + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterMappingHistorySearchInput=' + JSON.stringify(costCenterMappingHistorySearchInput);
        $httpBackend.expectGET(url).respond(costCenterHistoryMappingDataResponse);
        sampleSvcObj.getCostCenterMappingHistoryData(limit, page, sorts, costCenterMappingHistorySearchInput, costCenterRowData).abort();
    });

    it('should error getCostCenterMappingHistoryData ', function(){
        var limit = 25,
            page = 1,
            costCenterMappingHistorySearchInput = {},
            vendorNumber='123',
            sort = '',
            fields = {},
            url = urlSpace.urls.local.vendorCostCenterHistory.replace('{vendorNumber}', costCenterRowData.vendor_number).replace('{costCenterName}', costCenterRowData.cost_center_name) + '?vendorSourceSystemId=' + costCenterRowData.vendor_source_system_id + '&costCenterSourceSystemId=' + costCenterRowData.cost_center_source_system_id + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterMappingHistorySearchInput=' + JSON.stringify(costCenterMappingHistorySearchInput);
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getCostCenterMappingHistoryData(limit, page, sorts, costCenterMappingHistorySearchInput, costCenterRowData).then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });




    it('should getEligibleCostCenterData  ', function(){
        var limit = 25,
            page = 1,
            eligibleCostCenterSearchInput = {},
            vendorNumber='123',
            vendorSourceSystemId = '123',
            sort = '',
            fields = {},
            url = urlSpace.urls.local.eligibleVendorCostCenter.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&eligibleCostCenterSearchInput=' + JSON.stringify(eligibleCostCenterSearchInput);
        spyOn(promise, 'abort').and.callThrough();
        //costCenterHistoryMappingDataResponse = JSON.parse(costCenterHistoryMappingDataResponse);
        $httpBackend.expectGET(url).respond(eligibleCostCenterDataResponse);
        sampleSvcObj.getEligibleCostCenterData (limit, page, sorts, eligibleCostCenterSearchInput, vendorNumber, vendorSourceSystemId).then(function(response) {
            expect(response).toEqual({});
        });
        $httpBackend.flush();
    });

    it('should abort getEligibleCostCenterData promise', function(){
        var limit = 25,
            page = 1,
            eligibleCostCenterSearchInput = {},
            vendorNumber='123',
            vendorSourceSystemId = '123',
            sort = '',
            fields = {},
            url = urlSpace.urls.local.eligibleVendorCostCenter.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&eligibleCostCenterSearchInput=' + JSON.stringify(eligibleCostCenterSearchInput);
        $httpBackend.expectGET(url).respond(eligibleCostCenterDataResponse);
        sampleSvcObj.getEligibleCostCenterData (limit, page, sorts, eligibleCostCenterSearchInput, vendorNumber, vendorSourceSystemId).abort();
    });


    it('should error getEligibleCostCenterData  ', function(){
        var limit = 25,
            page = 1,
            eligibleCostCenterSearchInput = {},
            vendorSourceSystemId = '123',
            vendorNumber='123',
            sort = '',
            fields = {},
            url = urlSpace.urls.local.eligibleVendorCostCenter.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&eligibleCostCenterSearchInput=' + JSON.stringify(eligibleCostCenterSearchInput);
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getEligibleCostCenterData (limit, page, sorts, eligibleCostCenterSearchInput, vendorNumber, vendorSourceSystemId).then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should updateVendorCostCenter ', function(){
        var message = 'Success',
            url = urlSpace.urls.local.updateVendorCostCenter.replace('{vendorNumber}', costCenterRowData.vendor_number).replace('{costCenterName}', costCenterRowData.cost_center_name) + '?vendorSourceSystemId=' + costCenterRowData.vendor_source_system_id + '&costCenterSourceSystemId=' + costCenterRowData.cost_center_source_system_id;

        $httpBackend.expectPUT(url).respond(message);

        sampleSvcObj.updateVendorCostCenter (costCenterRowData).then(function(response) {
            expect(response.data).toEqual(message);
        });
        $httpBackend.flush();
    });

    it('should eupdateVendorCostCenter ', function(){
        var url = urlSpace.urls.local.updateVendorCostCenter.replace('{vendorNumber}', costCenterRowData.vendor_number).replace('{costCenterName}', costCenterRowData.cost_center_name) + '?vendorSourceSystemId=' + costCenterRowData.vendor_source_system_id + '&costCenterSourceSystemId=' + costCenterRowData.cost_center_source_system_id;

        $httpBackend.expectPUT(url).respond(400, {});

        sampleSvcObj.updateVendorCostCenter (costCenterRowData).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should addCostCenterMapping ', function(){
        var vendorNumber = "10016000",
            vendorSourceSystemId = "1001",
            message = "Success",
            url= urlSpace.urls.local.addEligibleCostCenters.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId;
        $httpBackend.expectPOST(url).respond(message);
        sampleSvcObj.addCostCenterMapping(vendorNumber, vendorSourceSystemId, costCenters)
            .then(function(response) {
                expect(response.data).toEqual(message);
            });
        $httpBackend.flush();
    });

    it('should addCostCenterMapping', function(){
        var vendorNumber = '123',
            vendorSourceSystemId = "1001",

            url= urlSpace.urls.local.addEligibleCostCenters.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId;
        //spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectPOST(url).respond(400, {});
        sampleSvcObj.addCostCenterMapping(vendorNumber, vendorSourceSystemId, costCenters).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });

});
