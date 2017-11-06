'use strict';

describe('POS Item Details testing', function () {
    var pointOfSaleItemDetailsService,
        $q,
        scope,
        urlSpace,
        $httpBackend,
        posItem={},
        revenueCategories={},
        itemCategories={},
        itemClasses={},
        typeDetails={},
        posRevenueCategoriesService={},
        posItemCategoriesService={},
        posItemClassesService={},
        pointOfSaleSystemCategoriesService={},
        posId = "";

    beforeEach(module('common.url'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.point.of.sale.item.details.service'));
    beforeEach(module('adams.point.of.sale.system.categories.service'));
    beforeEach(module('adams.point.of.sale.revenue.categories.service'));
    beforeEach(module('adams.point.of.sale.item.categories.service'));
    beforeEach(module('adams.point.of.sale.item.classes.service'));

    beforeEach(inject(function($rootScope, _$httpBackend_, PointOfSaleItemDetailsService, _$q_, ADAMS_URL_SPACE,
                               PosRevenueCategoriesService, PosItemCategoriesService, PosItemClassesService, PointOfSaleSystemCategoriesService) {
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        urlSpace = ADAMS_URL_SPACE;
        pointOfSaleItemDetailsService = PointOfSaleItemDetailsService;
        posRevenueCategoriesService = PosRevenueCategoriesService;
        posItemCategoriesService = PosItemCategoriesService;
        posItemClassesService = PosItemClassesService;
        pointOfSaleSystemCategoriesService = PointOfSaleSystemCategoriesService;
        posId = "1111";

        posItem = {
            "pos_id":"1111",
            "barcode":"3434",
            "webtrition_master_reference_number": "5465646",
            "long_name": "Starbucks Capuccino",
            "item_class_name": "Prepared Items",
            "revenue_category_name": "Beverage Hot",
            "item_category_name": "Beverage > Coffee Hot",
            "active": true
        };


        revenueCategories = [{"name":"cat one"}];
        itemCategories = [{"name":"item cat one"}];
        itemClasses = [{"name":"item class one"}];
        typeDetails = [{"name":"type one"}];

        posRevenueCategoriesService.getAllPosRevenueCategoriesDetails = function () {
            var deferred = $q.defer();
            deferred.resolve(revenueCategories);
            return deferred.promise;
        };

        posItemCategoriesService.getAllPosItemCategoriesDetails = function () {
            var deferred = $q.defer();
            deferred.resolve(itemCategories);
            return deferred.promise;
        };

        posItemClassesService.getAllPosItemClassesDetails = function () {
            var deferred = $q.defer();
            deferred.resolve(itemClasses);
            return deferred.promise;
        };

        pointOfSaleSystemCategoriesService.getTypeDetailsForSystemCategoryAndVendor = function (systemCategory, vendorName, type) {
            var deferred = $q.defer();
            deferred.resolve(typeDetails);
            return deferred.promise;
        }

    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    describe('pos item', function () {
        it('should get pos item', function () {
            var url = urlSpace.urls.local.getPosItem.replace('{pos_id}', posId);
            $httpBackend.expectGET(url).respond(posItem);
            pointOfSaleItemDetailsService.getPosItem(posId).then(function(response) {
                expect(response).toEqual(posItem);
            });
            $httpBackend.flush();
        });

        it('should throw error get pos item', function(){
            var url = urlSpace.urls.local.getPosItem.replace('{pos_id}', posId);
            $httpBackend.expectGET(url).respond(400, {});
            pointOfSaleItemDetailsService.getPosItem(posId).then(function(response) {
                expect(response).toEqual([]);
            });
            $httpBackend.flush();
            scope.$digest();
        });
    });

    describe('revenue categories', function () {
        it('should get revenue categories', function () {
            pointOfSaleItemDetailsService.revenueCategories = [];
            pointOfSaleItemDetailsService.getAllPosRevenueCategoriesDetails().then(function (response) {
                expect(response).toEqual(revenueCategories);
                expect(pointOfSaleItemDetailsService.revenueCategories).toBe(revenueCategories);
            });
        });

        it('should get revenue categories from cache', function () {
            pointOfSaleItemDetailsService.revenueCategories = revenueCategories;
            pointOfSaleItemDetailsService.getAllPosRevenueCategoriesDetails().then(function (response) {
                expect(response).toEqual(revenueCategories);
                expect(pointOfSaleItemDetailsService.revenueCategories).toBe(revenueCategories);
            });
        });

        it('should throw error revenue categories', function () {
            inject(function(PosRevenueCategoriesService) {
                var posRevenueCategoriesServiceError = PosRevenueCategoriesService;
                posRevenueCategoriesServiceError.getAllPosRevenueCategoriesDetails = function () {
                    var deferred = $q.defer();
                    deferred.reject('error');
                    return deferred.promise;
                };
            });

            pointOfSaleItemDetailsService.revenueCategories = [];
            pointOfSaleItemDetailsService.getAllPosRevenueCategoriesDetails().then(function (response) {
                expect(response).toEqual([]);
                expect(pointOfSaleItemDetailsService.revenueCategories).toEqual([]);
            });
        });

        it('should clear revenue categories cache', function () {
            pointOfSaleItemDetailsService.revenueCategories = [{"name":"cat one"}];
            scope.$broadcast('reloadRevenueCategories');
            scope.$apply();
            expect(pointOfSaleItemDetailsService.revenueCategories.length).toBe(0);
        });

    });

    describe('item categories', function () {
        it('should get item categories', function () {
            pointOfSaleItemDetailsService.itemCategories = [];
            pointOfSaleItemDetailsService.getAllPosItemCategoriesDetails().then(function (response) {
                expect(response).toEqual(itemCategories);
                expect(pointOfSaleItemDetailsService.itemCategories).toBe(itemCategories);
            });
        });

        it('should get item categories from cache', function () {
            pointOfSaleItemDetailsService.itemCategories = itemCategories;
            pointOfSaleItemDetailsService.getAllPosItemCategoriesDetails().then(function (response) {
                expect(response).toEqual(itemCategories);
                expect(pointOfSaleItemDetailsService.itemCategories).toBe(itemCategories);
            });
        });

        it('should throw error item categories', function () {
            inject(function(PosItemCategoriesService) {
                var posItemCategoriesServiceError = PosItemCategoriesService;
                posItemCategoriesServiceError.getAllPosItemCategoriesDetails = function () {
                    var deferred = $q.defer();
                    deferred.reject('error');
                    return deferred.promise;
                };
            });

            pointOfSaleItemDetailsService.itemCategories = [];
            pointOfSaleItemDetailsService.getAllPosItemCategoriesDetails().then(function (response) {
                expect(response).toEqual([]);
                expect(pointOfSaleItemDetailsService.itemCategories).toEqual([]);
            });
        });

        it('should clear item categories cache', function () {
            pointOfSaleItemDetailsService.itemCategories = [{"name":"item cat one"}];
            scope.$broadcast('reloadItemCategories');
            scope.$apply();
            expect(pointOfSaleItemDetailsService.itemCategories.length).toBe(0);
        });
    });

    describe('item classes', function () {
        it('should get item classes', function () {
            pointOfSaleItemDetailsService.itemClasses = [];
            pointOfSaleItemDetailsService.getAllPosItemClassesDetails().then(function (response) {
                expect(response).toEqual(itemClasses);
                expect(pointOfSaleItemDetailsService.itemClasses).toBe(itemClasses);
            });
        });

        it('should get item classes from cache', function () {
            pointOfSaleItemDetailsService.itemClasses = itemClasses;
            pointOfSaleItemDetailsService.getAllPosItemClassesDetails().then(function (response) {
                expect(response).toEqual(itemClasses);
                expect(pointOfSaleItemDetailsService.itemClasses).toBe(itemClasses);
            });
        });

        it('should throw error item classes', function () {
            inject(function(PosItemClassesService) {
                var posItemClassesServiceError = PosItemClassesService;
                posItemClassesServiceError.getAllPosItemClassesDetails = function () {
                    var deferred = $q.defer();
                    deferred.reject('error');
                    return deferred.promise;
                };
            });

            pointOfSaleItemDetailsService.itemClasses = [];
            pointOfSaleItemDetailsService.getAllPosItemClassesDetails().then(function (response) {
                expect(response).toEqual([]);
                expect(pointOfSaleItemDetailsService.itemClasses).toEqual([]);
            });
        });

        it('should clear item classes cache', function () {
            pointOfSaleItemDetailsService.itemClasses = [{"name":"item class one"}];
            scope.$broadcast('reloadItemClasses');
            scope.$apply();
            expect(pointOfSaleItemDetailsService.itemClasses.length).toBe(0);
        });
    });

    describe('type details', function () {
        it('should get type details', function () {
            var typeDetailsRepo = [];
            typeDetailsRepo.push({
                "systemCategory": 'default',
                "vendorName": 'InfoGenesis',
                "type": 'product_class',
                "details": typeDetails
            });
            pointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('default', 'InfoGenesis', 'product_class').then(function (response) {
                expect(response).toEqual(typeDetails);
                expect(pointOfSaleItemDetailsService.typeDetailsRepo.details).toBe(typeDetailsRepo.details);
            });
        });

        it('should get type details from cache', function () {
            pointOfSaleItemDetailsService.typeDetails = {};
            pointOfSaleItemDetailsService.typeDetailsRepo = [
                {
                    "systemCategory": "default",
                    "vendorName": "InfoGenesis",
                    "type": "product_class",
                    "details": typeDetails
                }
            ];
            pointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('default', 'InfoGenesis', 'product_class').then(function (response) {
                expect(response).toEqual(typeDetails);
                expect(pointOfSaleItemDetailsService.typeDetails.details).toBe(typeDetails);
            });
        });

        it('should get type details from cache - no match', function () {
            pointOfSaleItemDetailsService.typeDetails = {};
            pointOfSaleItemDetailsService.typeDetailsRepo = [
                {
                    "systemCategory": "default",
                    "vendorName": "InfoGenesis",
                    "type": "product_class",
                    "details": typeDetails
                }
            ];
            pointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('default', 'InfoGenesis', 'revenue_categories').then(function (response) {
                expect(response).toEqual(typeDetails);
            });
        });

        it('should throw error type details', function () {
            inject(function(PointOfSaleSystemCategoriesService) {
                var pointOfSaleSystemCategoriesServiceError = PointOfSaleSystemCategoriesService;
                pointOfSaleSystemCategoriesServiceError.getTypeDetailsForSystemCategoryAndVendor = function (a,b,c,d) {
                    var deferred = $q.defer();
                    deferred.reject('error');
                    return deferred.promise;
                };
            });

            pointOfSaleItemDetailsService.typeDetailsRepo = [];
            pointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('default', 'InfoGenesis', 'product_class').then(function (response) {
                expect(response).toEqual([]);
                expect(pointOfSaleItemDetailsService.typeDetailsRepo).toEqual([]);
            });
        });

        it('should clear type details cache', function () {
            pointOfSaleItemDetailsService.typeDetailsRepo = [
                    {
                        "systemCategory": "default",
                        "vendorName": "InfoGenesis",
                        "type": "product_class",
                        "details": {"name":"type one"}
                    },
                    {
                        "systemCategory": "default",
                        "vendorName": "InfoGenesis",
                        "type": "revenue_category",
                        "details": {"name":"type one"}
                    }
                ];
            scope.$broadcast('reloadTypeDetails','default','InfoGenesis','revenue_category');
            scope.$apply();
            expect(pointOfSaleItemDetailsService.typeDetailsRepo.length).toBe(1);

            scope.$broadcast('reloadTypeDetails','default','InfoGenesis','product_class');
            scope.$apply();
            expect(pointOfSaleItemDetailsService.typeDetailsRepo.length).toBe(0);
        });
    });



});