'use strict';

describe('POS revenue categories controller', function () {

    var posRevenueCategoriesController,
        posRevenueCategoriesController1,
        $scope,
        logService = {},
        mockModal,
        mockModal1,
        $q,
        gridApi,
        gridOptions,
        compassToastr,
        mockPosRevenueCategoriesService = {},
        mockPosRevenueCategoriesService1 = {},
        $rootScope;

    beforeEach(module('adams.point.of.sale.revenue.categories.controller'));
    beforeEach(module('adams.add.edit.revenue.categories.modal.controller'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.utils'));

    beforeEach(module(function($provide) {
            $provide.value('PosRevenueCategoriesService', mockPosRevenueCategoriesService);
            $provide.value('PosRevenueCategoriesService', mockPosRevenueCategoriesService1);
            $provide.value('STGLogService', logService);
        }
    ));

    beforeEach(inject(function ($controller, _$rootScope_, $q, CompassToastr) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = $q;
        compassToastr = CompassToastr;

        function mockModal(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.resolve({});
            this.result = this.resultDeferred.promise;
        }
        mockModal.prototype.open = function(options){ if(options && options.resolve) { options.resolve.action()} return this;  };
        mockModal.prototype.close = function (item) {
            this.resultDeferred.resolve(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };
        mockModal.prototype.dismiss = function (item) {
            this.resultDeferred.reject(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };

        mockModal = new mockModal();

        function mockModal1(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.reject();
            this.result = this.resultDeferred.promise;
        }
        mockModal1.prototype.open = function(options){ return this;  };
        mockModal1.prototype.close = function (item) {
            this.resultDeferred.resolve(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };
        mockModal1.prototype.dismiss = function (item) {
            this.resultDeferred.reject(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };

        mockModal1 = new mockModal1();

        gridOptions = {
            data: [
                { col1: 'col1', col2: 'col2' }
            ],
            onRegisterApi: function( api ){
                gridApi = api;
            }
        };

        gridApi = {
            grid: {
                appScope: {
                    openAddEditRevenueCategoryModal: jasmine.createSpy('gridApi.grid.appScope.openAddEditRevenueCategoryModal')
                }
            }
        };

        mockPosRevenueCategoriesService.getAllPosRevenueCategoriesDetails = function(){
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockPosRevenueCategoriesService1.getAllPosRevenueCategoriesDetails = function(){
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        posRevenueCategoriesController = $controller('PosRevenueCategoriesController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                compassToastr: CompassToastr,
                $uibModal: mockModal,
                PosRevenueCategoriesService: mockPosRevenueCategoriesService
            }
        );

        posRevenueCategoriesController1 = $controller('PosRevenueCategoriesController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                compassToastr: CompassToastr,
                $uibModal: mockModal1,
                PosRevenueCategoriesService: mockPosRevenueCategoriesService
            }
        );
    }));

    it('should exist', function () {
        expect(posRevenueCategoriesController).toBeDefined();
    });

    it('should call getGridData ', function() {
        spyOn(posRevenueCategoriesController, "getGridData").and.callThrough();
        posRevenueCategoriesController.getGridData(25,1,'',{search: [
                {
                    "property": "market_name",
                    "value": "something",
                    "operator": ""
                }
            ]}
        );
        $scope.$apply();
        expect(posRevenueCategoriesController.getGridData).toHaveBeenCalled();
    });

    it('should call openAddEditRevenueCategoryModal ', function() {
        spyOn(posRevenueCategoriesController, "openAddEditRevenueCategoryModal").and.callThrough();
        posRevenueCategoriesController.openAddEditRevenueCategoryModal('Add');
        $scope.$apply();
        expect(posRevenueCategoriesController.openAddEditRevenueCategoryModal).toHaveBeenCalled();
    });

    it('should call openAddEditRevenueCategoryModal ', function() {
        spyOn(posRevenueCategoriesController, "openAddEditRevenueCategoryModal").and.callThrough();
        posRevenueCategoriesController.openAddEditRevenueCategoryModal(null);
        $scope.$apply();
        expect(posRevenueCategoriesController.openAddEditRevenueCategoryModal).toHaveBeenCalled();
    });

    it('should call openAddEditRevenueCategoryModal ', function() {
        spyOn(posRevenueCategoriesController1, "openAddEditRevenueCategoryModal").and.callThrough();
        posRevenueCategoriesController1.openAddEditRevenueCategoryModal();
        $scope.$apply();
        expect(posRevenueCategoriesController1.openAddEditRevenueCategoryModal).toHaveBeenCalled();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
    });
});