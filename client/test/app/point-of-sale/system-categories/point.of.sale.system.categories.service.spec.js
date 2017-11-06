'use strict';

describe('POS System Categories testing', function () {
    var pointOfSaleSystemCategoriesService,
        $q,
        scope,
        urlSpace,
        $httpBackend,
        typeDetails=[],
        systemCategory,
        vendorName,
        type;

    beforeEach(module('adams.point.of.sale.system.categories.service'));
    beforeEach(module('common.url'));
    beforeEach(module('adams.common.url'));

    beforeEach(inject(function($rootScope, _$httpBackend_, PointOfSaleSystemCategoriesService, _$q_, ADAMS_URL_SPACE) {
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        urlSpace = ADAMS_URL_SPACE;
        pointOfSaleSystemCategoriesService = PointOfSaleSystemCategoriesService;

        systemCategory = "default";
        vendorName = "InfoGenesis";
        type = "product_class";

        typeDetails = [
            {
                "name" : "type one"
            },
            {
                "name" : "type two"
            },
            {
                "name" : "type three"
            }
        ];
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should get pos items', function () {
        var url = urlSpace.urls.local.getTypeDetailsForSystemCategoryAndVendor.replace('{system_category}',systemCategory).replace('{vendor_name}',vendorName).replace('{type}', type);

        $httpBackend.expectGET(url).respond(typeDetails);
        pointOfSaleSystemCategoriesService.getTypeDetailsForSystemCategoryAndVendor(systemCategory, vendorName, type).then(function(response) {
            expect(response).toEqual(typeDetails);
        });
        $httpBackend.flush();
    });

    it('should throw error get pos items', function(){
        var url = urlSpace.urls.local.getTypeDetailsForSystemCategoryAndVendor.replace('{system_category}',systemCategory).replace('{vendor_name}',vendorName).replace('{type}', type);

        $httpBackend.expectGET(url).respond(400, {});
        pointOfSaleSystemCategoriesService.getTypeDetailsForSystemCategoryAndVendor(systemCategory, vendorName, type).then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should abort promise get pos items', function(){
        var url = urlSpace.urls.local.getTypeDetailsForSystemCategoryAndVendor.replace('{system_category}',systemCategory).replace('{vendor_name}',vendorName).replace('{type}', type);
        $httpBackend.expectGET(url).respond(typeDetails);
        pointOfSaleSystemCategoriesService.getTypeDetailsForSystemCategoryAndVendor(systemCategory, vendorName, type).abort();
    });

});