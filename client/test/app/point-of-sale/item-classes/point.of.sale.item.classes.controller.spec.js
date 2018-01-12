'use strict';

describe('POS item classes controller', function () {

    var posItemClassesController,
        posItemClassesController1,
        $scope,
        logService = {},
        mockModal,
        mockModal1,
        $q,
        gridApi,
        gridOptions,
        compassToastr,
        mockPosItemClassesService = {},
        mockPosItemClassesService1 = {},
        $rootScope;

    beforeEach(module('adams.point.of.sale.item.classes.controller'));
    beforeEach(module('adams.add.edit.item.classes.modal.controller'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.utils'));

    beforeEach(module(function($provide) {
            $provide.value('PosItemClassesService', mockPosItemClassesService);
            $provide.value('PosItemClassesService', mockPosItemClassesService1);
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
                    openAddEditItemClassesModal : jasmine.createSpy('gridApi.grid.appScope.openAddEditItemClassesModal ')
                }
            }
        };

        mockPosItemClassesService.getAllPosItemClassesDetails = function(){
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockPosItemClassesService1.getAllPosItemClassesDetails = function(){
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        posItemClassesController = $controller('PosItemClassesController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                compassToastr: CompassToastr,
                $uibModal: mockModal,
                PosItemClassesService: mockPosItemClassesService
            }
        );

        posItemClassesController1 = $controller('PosItemClassesController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                compassToastr: CompassToastr,
                $uibModal: mockModal1,
                PosItemClassesService: mockPosItemClassesService
            }
        );
    }));

    it('should exist', function () {
        expect(posItemClassesController).toBeDefined();
    });

    it('should call getGridData ', function() {
        spyOn(posItemClassesController, "getGridData").and.callThrough();
        posItemClassesController.getGridData(25,1,'',{search: [
                {
                    "property": "market_name",
                    "value": "something",
                    "operator": ""
                }
            ]}
        );
        $scope.$apply();
        expect(posItemClassesController.getGridData).toHaveBeenCalled();
    });

    it('should call openAddEditItemClassesModal', function() {
        spyOn(posItemClassesController, "openAddEditItemClassesModal").and.callThrough();
        posItemClassesController.openAddEditItemClassesModal('Add');
        $scope.$apply();
        expect(posItemClassesController.openAddEditItemClassesModal).toHaveBeenCalled();
    });

    it('should call openAddEditItemClassesModal', function() {
        spyOn(posItemClassesController, "openAddEditItemClassesModal").and.callThrough();
        posItemClassesController.openAddEditItemClassesModal(null);
        $scope.$apply();
        expect(posItemClassesController.openAddEditItemClassesModal).toHaveBeenCalled();
    });

    it('should call openAddEditItemClassesModal', function() {
        spyOn(posItemClassesController1, "openAddEditItemClassesModal").and.callThrough();
        posItemClassesController1.openAddEditItemClassesModal();
        $scope.$apply();
        expect(posItemClassesController1.openAddEditItemClassesModal).toHaveBeenCalled();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi, '', {data: []});
    });
});