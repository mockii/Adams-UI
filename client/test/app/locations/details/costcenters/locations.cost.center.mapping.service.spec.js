
'use strict';

describe('LocationsCostCenterMappingService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        $rootScope,
        urlSpace,
        promise,
        mockRBACService = {},
        mockApplicationConfigurationService = {},
        locationsSearchData = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"7"},"data":[{"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LHKDYFYH","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AL","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5CCACKM","location_name":"sdfsdf","location_description":null,"address1":"asdasd","address2":"xcvxv","city":"sdfsdf","state":"AS","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5QUWC8J","location_name":"something","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"DC","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LUSXEHTV","location_name":"test loc","location_description":null,"address1":"1","address2":"2","city":"charlotte","state":"NC","zip":"11122","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LLIPTDMR","location_name":"test1","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"CT","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"10001","location_name":"test2","location_description":"test2","address1":"ibm dr","address2":"apt #555","city":"charlotte","state":"NC","zip":"28268","active":true,"longitude_latitude":"38.898648N, 77.037692W","created_by":"sunkac01","created_date":"1499713789600","modified_by":null,"modified_date":null}],"error":[]};

    beforeEach(module('common.url'));
    beforeEach(module('common.modules.logging'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.locations.costcenters.service'));
    beforeEach(function () {
        module(function ($provide) {
            $provide.value('RBACService', mockRBACService);
            $provide.value('ApplicationConfigurationService', mockApplicationConfigurationService);
        });
    });

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, LocationsCostCenterMappingService, _$q_, ADAMS_URL_SPACE, $log, $injector){
        // $rootScope = $injector.get('$rootScope');
        $rootScope = _$rootScope_;
        scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        sampleSvcObj = LocationsCostCenterMappingService;
        $q = _$q_;
        $log = $log;
        $rootScope.applicationConfiguration = {application: {name: 'ADAMS'}};
        urlSpace  = ADAMS_URL_SPACE;
        promise = {
            abort: jasmine.createSpyObj('promise', ['abort'])
        };

        mockRBACService.getCurrentProfile = function() {
            var deferred = $q.defer();
            deferred.resolve({current_role: {role_name: "Admin"}, user_name: 'ChouhR01'});
            return deferred.promise.$$state.value;
        };
        mockRBACService.getCurrentRoleName = function() {
            var deferred = $q.defer();
            deferred.resolve({role_name: "Admin"});
            return deferred.promise.$$state.value.role_name;
        };

        mockApplicationConfigurationService.getApplicationName = function () {
            return 'ADAMS';
        };

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should getCostCentersByLocationCode Info', inject(function($rootScope){
        var limit = 25,
            page = 1,
            search = '',
            sort = '',
            locationCode = 'LADFFGS',
            url = urlSpace.urls.local.getCostCentersByLocationCode.replace('{locationCode}', locationCode) + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterSearchInput=' + JSON.stringify(search);
        $rootScope.applicationConfiguration = {application: {name: 'ADAMS'}};
        // spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(locationsSearchData);
        sampleSvcObj.getCostCentersByLocationCode(limit, page, sort, 'LADFFGS', search ).then(function(data) {
            expect(data).toEqual(locationsSearchData);
        });
        $httpBackend.flush();
    }));

    it('should abort getCostCentersByLocationCode promise', function(){
        var limit = 25,
            page = 1,
            search = '',
            sort = '',
            locationCode = 'LADFFGS',
            url = urlSpace.urls.local.getCostCentersByLocationCode.replace('{locationCode}', locationCode) + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterSearchInput=' + JSON.stringify(search);
        $rootScope.applicationConfiguration = {application: {name: 'ADAMS'}};
        $httpBackend.expectGET(url).respond(locationsSearchData);
        sampleSvcObj.getCostCentersByLocationCode(limit, page, sort, 'LADFFGS', search ).abort();
    });

    it('should return empty getCostCentersByLocationCode on error ', function(){
        var limit = 25,
            page = 1,
            search = '',
            sort = '',
            locationCode = 'LADFFGS',
            url = urlSpace.urls.local.getCostCentersByLocationCode.replace('{locationCode}', locationCode) + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterSearchInput=' + JSON.stringify(search);
        $rootScope.applicationConfiguration = {application: {name: 'ADAMS'}};
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getCostCentersByLocationCode(limit, page, sort, 'LADFFGS', search ).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should getCostCentersByUserName Info', inject(function($rootScope){
        var limit = 25,
            page = 1,
            search = '',
            sort = '',
            appName = 'ADAMS',
            roleName = 'Admin',
            url = urlSpace.urls.local.getCostCentersByUserName + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterSearchInput=' + JSON.stringify(search) + '&appName=' + appName + '&roleName=' + roleName;
        // spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(locationsSearchData);
        sampleSvcObj.getCostCentersByUserName(limit, page, sort, search ).then(function(data) {
            expect(data).toEqual(locationsSearchData);
        });
        $httpBackend.flush();
    }));

    it('should abort getCostCentersByUserName promise', function(){
        var limit = 25,
            page = 1,
            search = '',
            sort = '',
            appName = 'ADAMS',
            roleName = 'Admin',
            url = urlSpace.urls.local.getCostCentersByUserName + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterSearchInput=' + JSON.stringify(search) + '&appName=' + appName + '&roleName=' + roleName;
        $httpBackend.expectGET(url).respond(locationsSearchData);
        sampleSvcObj.getCostCentersByUserName(limit, page, sort, search ).abort();
    });

    it('should return empty getCostCentersByUserName on error ', function(){
        var limit = 25,
            page = 1,
            search = '',
            sort = '',
            appName = 'ADAMS',
            roleName = 'Admin',
            url = urlSpace.urls.local.getCostCentersByUserName + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterSearchInput=' + JSON.stringify(search) + '&appName=' + appName + '&roleName=' + roleName;
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getCostCentersByUserName(limit, page, sort, search ).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should addCostCentersByLocationCode Info', inject(function($rootScope){
        var locationCode = 'LADFFGS',
            costCenterData = [{"sector": "K00000", "division": "KN0000", "region": "KNB000", "district": "KNB07", "cost_center": "34365", "cost_center_description": "WCD SPECIALTY CONC", "source_system_id": "1001"}],
            url = urlSpace.urls.local.addCostCentersByLocationCode.replace('{locationCode}', locationCode);
        // spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectPOST(url).respond(costCenterData);
        sampleSvcObj.addCostCentersByLocationCode(locationCode, costCenterData).then(function(response) {
            expect(response.data[0]).toEqual(costCenterData[0]);
        });
        $httpBackend.flush();
    }));

    it('should return empty addCostCentersByLocationCode on error ', function(){
        var locationCode = 'LADFFGS',
            costCenterData = [{"sector": "K00000", "division": "KN0000", "region": "KNB000", "district": "KNB07", "cost_center": "34365", "cost_center_description": "WCD SPECIALTY CONC", "source_system_id": "1001"}],
            url = urlSpace.urls.local.addCostCentersByLocationCode.replace('{locationCode}', locationCode);
        $httpBackend.expectPOST(url).respond(400, {});
        sampleSvcObj.addCostCentersByLocationCode(locationCode, costCenterData).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });


    it('should updateCostCentersByLocationAndCostCenterName Info', inject(function($rootScope){
        var locationCode = 'LADFFGS',
            costCenterName = '34365',
            sourceSystemId = '1001',
            costCenterData = {"sector": "K00000", "division": "KN0000", "region": "KNB000", "location_code": "LADFFGS", "cost_center_name": "34365", "cost_center_description": "WCD SPECIALTY CONC", "source_system_id": "1001"},
            url = urlSpace.urls.local.updateCostCentersByLocationAndCostCenterName.replace('{locationCode}', locationCode).replace('{costCenterName}', costCenterName) + '?sourceSystemId='+ sourceSystemId;
        // spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectPUT(url).respond(costCenterData);
        sampleSvcObj.updateCostCentersByLocationAndCostCenterName(costCenterData).then(function(response) {
            expect(response.data[0]).toEqual(costCenterData[0]);
        });
        $httpBackend.flush();
    }));

    it('should return empty updateCostCentersByLocationAndCostCenterName on error ', function(){
        var locationCode = 'LADFFGS',
            costCenterName = '34365',
            sourceSystemId = '1001',
            costCenterData = {"sector": "K00000", "division": "KN0000", "region": "KNB000", "location_code": "LADFFGS", "cost_center_name": "34365", "cost_center_description": "WCD SPECIALTY CONC", "source_system_id": "1001"},
            url = urlSpace.urls.local.updateCostCentersByLocationAndCostCenterName.replace('{locationCode}', locationCode).replace('{costCenterName}', costCenterName) + '?sourceSystemId='+ sourceSystemId;
        $httpBackend.expectPUT(url).respond(400, {});
        sampleSvcObj.updateCostCentersByLocationAndCostCenterName(costCenterData).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });
});