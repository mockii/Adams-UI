'use strict';

describe('POS item details controller', function () {

    var posItemDetailsController,
        $scope,
        $rootScope,
        $state,
        $q,
        uibModal,
        stgStatesService={},
        pointOfSaleItemDetailsService={},
        pos_item={
            pos_id:''
        };

    beforeEach(module('ui.router'));
    beforeEach(module('adams.point.of.sale.item.details.controller'));
    beforeEach(module('common.url'));
    beforeEach(module('adams.common.url'));

    describe('generic',function () {
        beforeEach(function() {
            module(function ($provide) {
                $provide.value('pos_item', pos_item);
            });
        });

        beforeEach(inject(function ($controller, _$rootScope_, _$state_, _$q_) {
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            $q = _$q_;

            stgStatesService = {
                goToBackState: jasmine.createSpy('stgStatesService.goToBackState')
            };

            pointOfSaleItemDetailsService.getAllPosRevenueCategoriesDetails = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsService.getAllPosItemCategoriesDetails  = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsService.getAllPosItemClassesDetails  = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            function mockModal(){
                this.resultDeferred = $q.defer();
                this.resultDeferred.resolve({newSelectedTags:[{"name":"tag one"},{"name":"tag two"}]});
                this.result = this.resultDeferred.promise;
            }
            mockModal.prototype.open = function(options){
                if(options && options.resolve) {
                    [{"name":"tag one"}];
                }
                return this;
            };

            posItemDetailsController = $controller('PointOfSaleItemDetailsController',
                {
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $state: $state,
                    $q: $q,
                    $uibModal: new mockModal(),
                    StgStatesService: stgStatesService,
                    PointOfSaleItemDetailsService: pointOfSaleItemDetailsService
                }
            );
        }));

        it('should initialize', function () {
            expect(posItemDetailsController).toBeDefined();
        });

        it('should remove tag', function () {
            posItemDetailsController.tags = [{"name":"tag one"},{"name":"tag two"}, {"name":"tag three"}];
            posItemDetailsController.removeTag('tag two');
            expect(posItemDetailsController.tags.length).toBe(2);
            expect(posItemDetailsController.tags).not.toContain({"name":"tag two"});
        });

        it('should clear and go back',function () {
            posItemDetailsController.clearAndGoBack();
            expect(stgStatesService.goToBackState).toHaveBeenCalled();
        });

        it('should submit form',function () {
            posItemDetailsController.savePointOfSaleItem();
        });

        it('should call openAddTags', function() {
            spyOn(posItemDetailsController, 'openAddTags').and.callThrough();
            posItemDetailsController.openAddTags();
            $scope.$apply();
            expect(posItemDetailsController.openAddTags).toHaveBeenCalled();
        });

        it('should set active tab name', function () {
            var vendorNameToSetActive = "InfoGenesis";
            posItemDetailsController.setActiveVendorTab(vendorNameToSetActive);
            expect(posItemDetailsController.activeVendorTabName).toBe(vendorNameToSetActive);
        });

    });

    describe('add item',function () {

        beforeEach(function() {
            module(function ($provide) {
                $provide.value('pos_item', pos_item);
            });
        });

        beforeEach(inject(function ($controller, _$rootScope_, _$state_, _$q_) {
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            $q = _$q_;

            $state.current.name='additem';
            posItemDetailsController = $controller('PointOfSaleItemDetailsController',
                {
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $state: $state,
                    $q: $q,
                    $uibModal: uibModal,
                    StgStatesService: stgStatesService,
                    PointOfSaleItemDetailsService: pointOfSaleItemDetailsService
                }
            );
        }));

        it('should initialize for add item state', function () {
            expect(posItemDetailsController).toBeDefined();
            expect(posItemDetailsController.vendorTabs.length).toBe(2);
            expect(posItemDetailsController.vendorTabs[0].name).toBe('InfoGenesis');
            expect(posItemDetailsController.vendorTabs[1].name).toBe('Simphony');
        });
    });

    describe('edit item',function () {

        beforeEach(function() {
            module(function ($provide) {
                $provide.value('pos_item', pos_item);
            });
        });

        beforeEach(inject(function ($controller, _$rootScope_, _$state_, _$q_) {
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            $q = _$q_;

            $state.current.name='edititem';
            $state.current.data={pageTitle:{}};
            posItemDetailsController = $controller('PointOfSaleItemDetailsController',
                {
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $state: $state,
                    $q: $q,
                    $uibModal: uibModal,
                    StgStatesService: stgStatesService,
                    PointOfSaleItemDetailsService: pointOfSaleItemDetailsService
                }
            );
        }));

        it('should initialize for edit item state', function () {
            expect(posItemDetailsController).toBeDefined();
            expect(posItemDetailsController.vendorTabs.length).toBe(2);
            expect(posItemDetailsController.vendorTabs[0].name).toBe('InfoGenesis');
            expect(posItemDetailsController.vendorTabs[1].name).toBe('Simphony');
        });
    });

});