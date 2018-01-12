'use strict';

describe('POS item categories controller', function () {

    var posItemCategoriesController,
        posItemCategoriesController1,
        $scope,
        logService = {},
        mockModal,
        mockModal1,
        $q,
        gridApi,
        gridOptions,
        compassToastr,
        mockPosItemCategoriesService = {},
        mockPosItemCategoriesService1 = {},
        $rootScope;

    beforeEach(module('adams.point.of.sale.item.categories.controller'));
    beforeEach(module('adams.add.edit.item.categories.modal.controller'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.utils'));

    beforeEach(module(function($provide) {
            $provide.value('PosItemCategoriesService', mockPosItemCategoriesService);
            $provide.value('PosItemCategoriesService', mockPosItemCategoriesService1);
            $provide.value('STGLogService', logService);
        }
    ));

    beforeEach(inject(function ($controller, _$rootScope_, _$q_, CompassToastr) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
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
                    openAddEditItemCategoryModal: jasmine.createSpy('gridApi.grid.appScope.openAddEditItemCategoryModal')
                }
            }
        };

        mockPosItemCategoriesService.getAllPosItemCategoriesDetails = function(){
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockPosItemCategoriesService1.getAllPosItemCategoriesDetails = function(){
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        posItemCategoriesController = $controller('PosItemCategoriesController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                compassToastr: CompassToastr,
                $uibModal: mockModal,
                PosItemCategoriesService: mockPosItemCategoriesService
            }
        );

        posItemCategoriesController1 = $controller('PosItemCategoriesController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                compassToastr: CompassToastr,
                $uibModal: mockModal1,
                PosItemCategoriesService: mockPosItemCategoriesService
            }
        );
    }));

    it('should exist', function () {
        expect(posItemCategoriesController).toBeDefined();
    });

    it('should call getGridData ', function() {
        spyOn(posItemCategoriesController, "getGridData").and.callThrough();
        posItemCategoriesController.getGridData(25,1,'',{search: [
                {
                    "property": "market_name",
                    "value": "something",
                    "operator": ""
                }
            ]}
        );
        $scope.$apply();
        expect(posItemCategoriesController.getGridData).toHaveBeenCalled();
    });

    it('should call openAddEditItemCategoryModal ', function() {
        spyOn(posItemCategoriesController, "openAddEditItemCategoryModal").and.callThrough();
        posItemCategoriesController.openAddEditItemCategoryModal('Add');
        $scope.$apply();
        expect(posItemCategoriesController.openAddEditItemCategoryModal).toHaveBeenCalled();
    });

    it('should call openAddEditItemCategoryModal ', function() {
        spyOn(posItemCategoriesController, "openAddEditItemCategoryModal").and.callThrough();
        posItemCategoriesController.openAddEditItemCategoryModal(null);
        $scope.$apply();
        expect(posItemCategoriesController.openAddEditItemCategoryModal).toHaveBeenCalled();
    });

    it('should call openAddEditItemCategoryModal ', function() {
        spyOn(posItemCategoriesController1, "openAddEditItemCategoryModal").and.callThrough();
        posItemCategoriesController1.openAddEditItemCategoryModal();
        $scope.$apply();
        expect(posItemCategoriesController1.openAddEditItemCategoryModal).toHaveBeenCalled();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
    });
});