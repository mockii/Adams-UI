'use strict';

describe('POS Item Search testing', function () {
    var pointOfSaleItemSearchService,
        $q,
        scope,
        urlSpace,
        $httpBackend,
        posItems={};

    beforeEach(module('adams.point.of.sale.item.search.service'));
    beforeEach(module('common.url'));
    beforeEach(module('adams.common.url'));

    beforeEach(inject(function($rootScope, _$httpBackend_, PointOfSaleItemSearchService, _$q_, ADAMS_URL_SPACE) {
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        urlSpace = ADAMS_URL_SPACE;
        pointOfSaleItemSearchService = PointOfSaleItemSearchService;

        posItems = [
            {
                "pos_id":"1111",
                "barcode":"3434",
                "webtrition_master_reference_number": "5465646",
                "long_name": "Starbucks Capuccino",
                "item_class_name": "Prepared Items",
                "revenue_category_name": "Beverage Hot",
                "item_category_name": "Beverage > Coffee Hot",
                "active": true
            },
            {
                "pos_id":"2222",
                "barcode":"3434",
                "webtrition_master_reference_number": "5465646",
                "long_name": "Starbucks Capuccino",
                "item_class_name": "Prepared Items",
                "revenue_category_name": "Beverage Hot",
                "item_category_name": "Beverage > Coffee Hot",
                "active": false
            },
            {
                "pos_id":"3333",
                "barcode":"3434",
                "webtrition_master_reference_number": "5465646",
                "long_name": "Starbucks Capuccino",
                "item_class_name": "Prepared Items",
                "revenue_category_name": "Beverage Hot",
                "item_category_name": "Beverage > Coffee Hot",
                "active": true
            }
        ];
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should get pos items', function () {
        var url = urlSpace.urls.local.getPosItems + '?limit=&page=&search={}&sorts=';

        $httpBackend.expectGET(url).respond(posItems);
        pointOfSaleItemSearchService.getPosItems('','','',{}).then(function(response) {
            expect(response).toEqual(posItems);
        });
        $httpBackend.flush();
    });

    it('should throw error get pos items', function(){
        var url = urlSpace.urls.local.getPosItems + '?limit=&page=&search={}&sorts=';

        $httpBackend.expectGET(url).respond(400, {});
        pointOfSaleItemSearchService.getPosItems('','','',{}).then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should abort promise get pos items', function(){
        var url = urlSpace.urls.local.getPosItems + '?limit=&page=&search={}&sorts=';
        $httpBackend.expectGET(url).respond(posItems);
        pointOfSaleItemSearchService.getPosItems('','','',{}).abort();
    });

});