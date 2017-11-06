'use strict';

describe('POS item search controller', function () {

    var pointOfSaleItemSearchController,
        $scope,
        $rootScope,
        $q,
        gridApi,
        gridOptions,
        stgStatesService={},
        modalDialogService={},
        pointOfSaleItemSearchService={};

    beforeEach(module('adams.point.of.sale.item.search.controller'));

    beforeEach(function() {
        module(function ($provide) {
            $provide.value('StgStatesService', stgStatesService);
        });
    });

    beforeEach(inject(function ($controller, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;

        stgStatesService.goToState = function(state, params){
            return;
        };

        pointOfSaleItemSearchService.getPosItems = function () {
            var deferred = $q.defer();
            deferred.resolve({});
            deferred.promise.abort = function () {};
            return deferred.promise;
        };

        modalDialogService = {
            result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function( result ) {
                this.result.confirmCallBack( result );
            },
            dismiss: function( type ) {
                this.result.cancelCallback( type );
            },
            confirm: function( errorMessage ) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        pointOfSaleItemSearchController = $controller('PointOfSaleItemSearchController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                $q: $q,
                PointOfSaleItemSearchService: pointOfSaleItemSearchService,
                ModalDialogService: modalDialogService
            }
        );
    }));


    it('should exist', function () {
        expect(pointOfSaleItemSearchController).toBeDefined();
    });

    it('should call errorHandling', function () {
        spyOn(pointOfSaleItemSearchController, "errorHandling").and.callThrough();
        pointOfSaleItemSearchController.errorHandling('error');
        $scope.$apply();
        expect(pointOfSaleItemSearchController.errorHandling).toHaveBeenCalledWith('error');
    });

    it('should call addItem', function () {
        spyOn(stgStatesService, 'goToState');
        spyOn(pointOfSaleItemSearchController, 'addItem').and.callThrough();
        pointOfSaleItemSearchController.addItem();
        $scope.$apply();
        expect(stgStatesService.goToState).toHaveBeenCalledWith('additem', {});
        expect(pointOfSaleItemSearchController.addItem).toHaveBeenCalled();
    });

    it('should call editItem', function () {
        var row = {pos_id:'111'};
        spyOn(stgStatesService, 'goToState');
        spyOn(pointOfSaleItemSearchController, 'editItem').and.callThrough();
        pointOfSaleItemSearchController.editItem(row);
        $scope.$apply();
        expect(stgStatesService.goToState).toHaveBeenCalledWith('edititem', {posId:row.pos_id});
        expect(pointOfSaleItemSearchController.editItem).toHaveBeenCalled();
    });

    it('should call uiGridLoadDetails', function() {
        gridApi = {grid:{appScope:{}}};
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
    });

    it('should call getGridData', function() {
        pointOfSaleItemSearchController.getGridData();
    });

    it('should abort getGridData', function() {
        pointOfSaleItemSearchController.getGridData().abort();
    });

});