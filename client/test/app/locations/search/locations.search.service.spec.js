
'use strict';

describe('LocationsSearchService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        $rootScope,
        urlSpace,
        promise,
        mockRBACService = {},
        locationsSearchData = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"7"},"data":[{"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LHKDYFYH","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AL","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5CCACKM","location_name":"sdfsdf","location_description":null,"address1":"asdasd","address2":"xcvxv","city":"sdfsdf","state":"AS","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5QUWC8J","location_name":"something","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"DC","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LUSXEHTV","location_name":"test loc","location_description":null,"address1":"1","address2":"2","city":"charlotte","state":"NC","zip":"11122","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LLIPTDMR","location_name":"test1","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"CT","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"10001","location_name":"test2","location_description":"test2","address1":"ibm dr","address2":"apt #555","city":"charlotte","state":"NC","zip":"28268","active":true,"longitude_latitude":"38.898648N, 77.037692W","created_by":"sunkac01","created_date":"1499713789600","modified_by":null,"modified_date":null}],"error":[]};

    beforeEach(module('common.url'));
    beforeEach(module('common.modules.logging'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.locations.search.service'));
    beforeEach(function () {
        module(function ($provide) {
            $provide.value('RBACService', mockRBACService);
        });
    });

    beforeEach(inject(function(_$rootScope_, _$httpBackend_, LocationsSearchService, _$q_, ADAMS_URL_SPACE, $log){
        $rootScope = _$rootScope_;
        scope = _$rootScope_.$new();
        $httpBackend = _$httpBackend_;
        sampleSvcObj = LocationsSearchService;
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

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get Locations Info', function(){
        var limit = 25,
            page = 1,
            search = '',
            sort = '',
            appName= 'ADAMS',
            roleName = 'Admin',
            url = urlSpace.urls.local.getLocationsByUser + '?limit=' + limit + '&page=' + page  + '&locationsSearchInput=' + encodeURIComponent(JSON.stringify(search)) + '&sorts=' + sort + '&appName=' + appName + '&roleName=' + roleName;

        spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(locationsSearchData);
        sampleSvcObj.getAllLocationsSearchDetails(limit, page, search, sort).then(function(data) {
            expect(data).toEqual(locationsSearchData);
        });
        $httpBackend.flush();
    });

    it('should abort get locations Info promise', function(){
        var limit = 25,
            page = 1,
            search = '',
            sort = '',
            appName= 'ADAMS',
            roleName = 'Admin',
            url = urlSpace.urls.local.getLocationsByUser + '?limit=' + limit + '&page=' + page  + '&locationsSearchInput=' + encodeURIComponent(JSON.stringify(search)) + '&sorts=' + sort + '&appName=' + appName + '&roleName=' + roleName;

        $httpBackend.expectGET(url).respond(locationsSearchData);
        sampleSvcObj.getAllLocationsSearchDetails(limit, page, search, sort).abort();
    });

    it('should return empty location Info on error ', function(){
        var limit = 25,
            page = 1,
            search = '',
            sort = '',
            appName= 'ADAMS',
            roleName = 'Admin',
            url = urlSpace.urls.local.getLocationsByUser + '?limit=' + limit + '&page=' + page  + '&locationsSearchInput=' + encodeURIComponent(JSON.stringify(search)) + '&sorts=' + sort + '&appName=' + appName + '&roleName=' + roleName;

        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getAllLocationsSearchDetails(limit, page, search, sort).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });
});