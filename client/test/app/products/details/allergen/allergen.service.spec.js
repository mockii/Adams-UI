
'use strict';

describe('AllergenService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        urlSpace;

    beforeEach(module('common.url'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('common.modules.logging'));
    beforeEach(module('adams.products.allergen.service'));

    beforeEach(inject(function($rootScope, _$httpBackend_, AllergenService, _$q_, ADAMS_URL_SPACE, $log){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = AllergenService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;
        $log = $log;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should getAllergensData  Info', function(){
        var gtin = '100',
            url = urlSpace.urls.local.allergens.replace('{gtin}', gtin);
        var responseData = {
            data: {
                data: [{}]
            }
        };
        $httpBackend.expectGET(url).respond(responseData);
        sampleSvcObj.getAllergensData(gtin).then(function(response) {
            expect(response).toEqual(responseData.data);
        });
        $httpBackend.flush();
    });

    it('should throw error getAllergensData  Info', function(){
        var gtin = '100',
            url = urlSpace.urls.local.allergens.replace('{gtin}', gtin);
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getAllergensData(gtin).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });

});
