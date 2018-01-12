
'use strict';

describe('PosItemClassesService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        logService = {},
        urlSpace,
        itemClassesData = {'item_class_code':'123'};

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
        sampleSvcObj.addPosItemClass(itemClassesData).then(function(response) {
            expect(response).toBeDefined();
        });
        $httpBackend.flush();
    });

    it('should return empty addPosItemClass on error ', function(){
        var url = urlSpace.urls.local.addPosItemClass;
        $httpBackend.expectPOST(url).respond(400, {});
        sampleSvcObj.addPosItemClass(itemClassesData).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });


    it('should updatePosItemClass Info', inject(function($rootScope){
        var url = urlSpace.urls.local.updatePosItemClass.replace('{item_class_code}',itemClassesData.item_class_code),
            response = {data: itemClassesData};
        $httpBackend.expectPUT(url).respond(response);
        sampleSvcObj.updatePosItemClass(itemClassesData).then(function(response) {
            expect(response).toBeDefined();
        });
        $httpBackend.flush();
    }));

    it('should return empty updatePosItemClass on error ', function(){
        var url = urlSpace.urls.local.updatePosItemClass.replace('{item_class_code}',itemClassesData.item_class_code);
        $httpBackend.expectPUT(url).respond(400, {});
        sampleSvcObj.updatePosItemClass(itemClassesData).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });
});