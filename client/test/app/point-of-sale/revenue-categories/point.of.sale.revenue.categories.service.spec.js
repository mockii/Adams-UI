
'use strict';

describe('PosRevenueCategoriesService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        logService = {},
        urlSpace,
        revenueCategoriesData = {'revenue_category_code':'123'};

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.point.of.sale.revenue.categories.service'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('STGLogService', logService);
        });
    });

    beforeEach(inject(function($rootScope, _$httpBackend_, PosRevenueCategoriesService, _$q_, ADAMS_URL_SPACE, STGLogService, $log){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = PosRevenueCategoriesService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;
        logService = STGLogService;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should getAllPosRevenueCategoriesDetails Info', function(){
        var url = urlSpace.urls.local.getPosRevenueCategories+ '?limit=undefined&page=undefined&sorts=undefined&search=undefined';
        $httpBackend.expectGET(url).respond(revenueCategoriesData);
        sampleSvcObj.getAllPosRevenueCategoriesDetails().then(function(response) {
            expect(response).toEqual(revenueCategoriesData);
        });
        $httpBackend.flush();
    });

    it('should throw error getAllPosRevenueCategoriesDetails Info', function(){
        var url = urlSpace.urls.local.getPosRevenueCategories+ '?limit=undefined&page=undefined&sorts=undefined&search=undefined';
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getAllPosRevenueCategoriesDetails().then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should abort promise', function(){
        var limit = 25,
            page = 1,
            sort = '',
            url = urlSpace.urls.local.getPosRevenueCategories+ '?limit=25&page=1&sorts=&search={}';

        $httpBackend.expectGET(url).respond({});
        sampleSvcObj.getAllPosRevenueCategoriesDetails(limit, page, {}, sort).abort();
    });

    it('should addPosRevenueCategory Info', function(){
        var url = urlSpace.urls.local.addPosRevenueCategory,
            response = {data: revenueCategoriesData};

        $httpBackend.expectPOST(url).respond(response);
        sampleSvcObj.addPosRevenueCategory(revenueCategoriesData).then(function(response) {
            expect(response).toBeDefined();
        });
        $httpBackend.flush();
    });

    it('should return empty addPosRevenueCategory on error ', function(){
        var url = urlSpace.urls.local.addPosRevenueCategory;
        $httpBackend.expectPOST(url).respond(400, {});
        sampleSvcObj.addPosRevenueCategory(revenueCategoriesData).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });


    it('should updatePosRevenueCategory Info', inject(function($rootScope){
        var url = urlSpace.urls.local.updatePosRevenueCategory.replace('{revenue_category_code}', revenueCategoriesData.revenue_category_code),
            response = {data: revenueCategoriesData};
        $httpBackend.expectPUT(url).respond(response);
        sampleSvcObj.updatePosRevenueCategory(revenueCategoriesData).then(function(response) {
            expect(response).toBeDefined();
        });
        $httpBackend.flush();
    }));

    it('should return empty updatePosRevenueCategory on error ', function(){
        var url = urlSpace.urls.local.updatePosRevenueCategory.replace('{revenue_category_code}', revenueCategoriesData.revenue_category_code);
        $httpBackend.expectPUT(url).respond(400, {});
        sampleSvcObj.updatePosRevenueCategory(revenueCategoriesData).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });
});