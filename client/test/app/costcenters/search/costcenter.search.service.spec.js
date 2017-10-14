describe('CostCenterSearchService', function(){
'use strict';
    var scope,
        sampleSvcObj,
        $q,
        $log,
        $httpBackend,
        urlSpace,
        Fact,
        mockHttp,
        costCenterSearchData = {
            "metadata": {
                "version": "1.0.0",
                "status": "Success",
                "http_status_code": "OK",
                "resultCount": "41320"
            },
            "data": [{
                "sector": "G00000",
                "division": "GF0000",
                "region": "GF9000",
                "complex": "C-100",
                "cost_center": "100",
                "cost_center_description": "C&S Vending",
                "source_system_id": "1001"
            }, {
                "sector": "L00000",
                "division": "LK0000",
                "region": "LK9000",
                "complex": "C-1000",
                "cost_center": "1000",
                "cost_center_description": "$$$3M Company*",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FA0000",
                "region": "FAT000",
                "complex": "C-10000",
                "cost_center": "10000",
                "cost_center_description": "$$Camp Cherokee",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FT0000",
                "region": "FTP000",
                "complex": "C-10001",
                "cost_center": "10001",
                "cost_center_description": "$$$IMFT",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKB000",
                "complex": "C-10002",
                "cost_center": "10002",
                "cost_center_description": "Carlisle *",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKS000",
                "complex": "C-10003",
                "cost_center": "10003",
                "cost_center_description": "$$Camp Constantin *",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKS000",
                "complex": "C-10003",
                "cost_center": "10003",
                "cost_center_description": "$$Camp Constantin *",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKS000",
                "complex": "C-10004",
                "cost_center": "10004",
                "cost_center_description": "$$Camp James Ray *",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKS000",
                "complex": "C-10004",
                "cost_center": "10004",
                "cost_center_description": "$$Camp James Ray *",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FW0000",
                "region": "FWT000",
                "complex": "C-10005",
                "cost_center": "10005",
                "cost_center_description": "$$ACT *",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "F90000",
                "region": "F99000",
                "complex": "C-10006",
                "cost_center": "10006",
                "cost_center_description": "$$$Toyota Financial S",
                "source_system_id": "1001"
            }, {
                "sector": "E00000",
                "division": "ED0000",
                "region": "EDJ000",
                "complex": "C-10007",
                "cost_center": "10007",
                "cost_center_description": "Fay J Lindner *",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKN000",
                "complex": "C-10008",
                "cost_center": "10008",
                "cost_center_description": "$$Holyoke Public Schools",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FT0000",
                "region": "FTT000",
                "complex": "C-10009",
                "cost_center": "10009",
                "cost_center_description": "$$$Dell Comps Eastgate",
                "source_system_id": "1001"
            }, {
                "sector": "L00000",
                "division": "L90000",
                "region": "L99000",
                "complex": "C-1001",
                "cost_center": "1001",
                "cost_center_description": "$$$ AC Nielsen*",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FT0000",
                "region": "FTT000",
                "complex": "C-10010",
                "cost_center": "10010",
                "cost_center_description": "$$Dell Computers AM1",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FT0000",
                "region": "FTT000",
                "complex": "C-10011",
                "cost_center": "10011",
                "cost_center_description": "Dell Computers AO1",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "F90000",
                "region": "F99000",
                "complex": "C-10012",
                "cost_center": "10012",
                "cost_center_description": "$$$SBB&T",
                "source_system_id": "1001"
            }, {
                "sector": "L00000",
                "division": "L90000",
                "region": "L99000",
                "complex": "C-10013",
                "cost_center": "10013",
                "cost_center_description": "$$$MBNA NJ Daycar",
                "source_system_id": "1001"
            }, {
                "sector": "L00000",
                "division": "LK0000",
                "region": "LKK000",
                "complex": "C-2672",
                "cost_center": "10014",
                "cost_center_description": "Phila Eagles Catering *",
                "source_system_id": "1001"
            }, {
                "sector": "L00000",
                "division": "L90000",
                "region": "L99000",
                "complex": "C-10015",
                "cost_center": "10015",
                "cost_center_description": "$$$ Putnam Po Sq Coff",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "F90000",
                "region": "F99000",
                "complex": "C-10016",
                "cost_center": "10016",
                "cost_center_description": "$$$IBM Burlington B6",
                "source_system_id": "1001"
            }, {
                "sector": "H00000",
                "division": "HC0000",
                "region": "HCS000",
                "complex": "C-10017",
                "cost_center": "10017",
                "cost_center_description": "$$$Cape Girardeau Commissary",
                "source_system_id": "1001"
            }, {
                "sector": "H00000",
                "division": "HC0000",
                "region": "HCE000",
                "complex": "C-10018",
                "cost_center": "10018",
                "cost_center_description": "$$$CSC Colo Co Juveni",
                "source_system_id": "1001"
            }, {
                "sector": "H00000",
                "division": "HC0000",
                "region": "HCE000",
                "complex": "C-10019",
                "cost_center": "10019",
                "cost_center_description": "$$$Virginia DJJ RDC *",
                "source_system_id": "1001"
            }],
            "error": "{}"
        };

    beforeEach(module('common.url'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.costcenter.search.service'));

    beforeEach(inject(function($rootScope, _$httpBackend_, CostCenterSearchService, _$q_, ADAMS_URL_SPACE, $log){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = CostCenterSearchService;
        $q = _$q_;
        $log = $log;
        urlSpace  = ADAMS_URL_SPACE;

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get CostCenter Detail Info', function(){
        var limit = 25,
            page = 1,
            costCenterSearchInput = {},
            sort = '',
            fields = {},
            url = urlSpace.urls.local.costCenters + '?limit=' + limit + '&page=' + page  + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput) + '&sort=' + sort + '&fields=' + fields;

        // costCenterSearchData = JSON.parse(costCenterSearchData);
        $httpBackend.expectGET(url).respond(costCenterSearchData);
        sampleSvcObj.getAllCostCenterSearchDetails(limit, page, costCenterSearchInput, sort, fields).then(function(data) {
            expect(data[0]).toEqual(costCenterSearchData[0]);
        });
        $httpBackend.flush();
    });

    it('should abort get CostCenter Detail Info promise', function(){
        var limit = 25,
            page = 1,
            costCenterSearchInput = {},
            sort = '',
            fields = {},
            url = urlSpace.urls.local.costCenters + '?limit=' + limit + '&page=' + page  + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput) + '&sort=' + sort + '&fields=' + fields;

        // costCenterSearchData = JSON.parse(costCenterSearchData);
        $httpBackend.expectGET(url).respond(costCenterSearchData);
        sampleSvcObj.getAllCostCenterSearchDetails(limit, page, costCenterSearchInput, sort, fields).abort();
    });

    it('should return empty CostCenter Detail Info on error ', function(){
        var limit = 25,
            page = 1,
            costCenterSearchInput = {},
            sort = '',
            fields = {},
            url = urlSpace.urls.local.costCenters + '?limit=' + limit + '&page=' + page  + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput) + '&sort=' + sort + '&fields=' + fields;

        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getAllCostCenterSearchDetails(limit, page, costCenterSearchInput, sort, fields).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
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
        // Fact = $factory('CostCenterSearchService', { $rootScope: $rootScope, $http: mockHttp, ADAMS_URL_SPACE: ADAMS_URL_SPACE, $q: $q, $log: $log});


        var limit = 25,
            page = 1,
            costCenterSearchInput = '',
            sort = '',
            sourceSystemId = '1001',
            url = urlSpace.urls.local.costCenterSearchData + '?limit=' + limit + '&page=' + page  + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput) + '&sorts=' + sort + '&source_system_id=' + sourceSystemId ;

        var promise = $httpBackend.expectGET(url).respond({});
        promise.abort = function() {};
        spyOn(promise, 'abort').and.returnValue({});
        /!*console.log(promise);
        console.log(promise);*!/
        sampleSvcObj.getAllCostCenterSearchDetails(limit, page, costCenterSearchInput, sort, sourceSystemId).then(function(data) {
            // expect(data).toEqual([]);
            // expect()
        });
        $httpBackend.flush();
        scope.$digest();
    }));*/
});
