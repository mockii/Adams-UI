
'use strict';

describe('PosItemCategoriesService', function(){
    var rootScope,
        scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        logService = {},
        urlSpace,
        itemCategoriesData = {'item_category_code':'123'};

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.point.of.sale.item.categories.service'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('STGLogService', logService);
        });
    });

    beforeEach(inject(function($rootScope, _$httpBackend_, PosItemCategoriesService, _$q_, ADAMS_URL_SPACE, STGLogService, $log){
        rootScope = $rootScope;
        scope = $rootScope.$new();
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
        sampleSvcObj.addPosItemCategory(itemCategoriesData).then(function(response) {
            expect(response).toBeDefined();
        });
        $httpBackend.flush();
    });

    it('should return empty addPosItemCategory on error ', function(){
        var url = urlSpace.urls.local.addPosItemCategory;
        $httpBackend.expectPOST(url).respond(400, {});
        sampleSvcObj.addPosItemCategory(itemCategoriesData).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });


    it('should updatePosItemCategory Info', inject(function($rootScope){
        var url = urlSpace.urls.local.updatePosItemCategory.replace('{item_category_code}', itemCategoriesData.item_category_code),
            response = {data: itemCategoriesData};
        $httpBackend.expectPUT(url).respond(response);
        sampleSvcObj.updatePosItemCategory(itemCategoriesData).then(function(response) {
            expect(response).toBeDefined();
        });
        $httpBackend.flush();
    }));

    it('should return empty updatePosItemCategory on error ', function(){
        var url = urlSpace.urls.local.updatePosItemCategory.replace('{item_category_code}', itemCategoriesData.item_category_code);
        $httpBackend.expectPUT(url).respond(400, {});
        sampleSvcObj.updatePosItemCategory(itemCategoriesData).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });
});