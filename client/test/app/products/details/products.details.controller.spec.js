'use strict';

describe('ProductsDetailsController', function() {

    var Ctrl,
        $rootScope,
        $scope,
        $location,
        $interval,
        history,
        $q,
        $httpBackend,
        logService = {},
        productsDetailsService,
        productSearchData ={},
        $state,
        mockModal;
    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.products.details.controller'));
    beforeEach(module('adams.products.details.service'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('STGLogService', logService);
            $provide.value('productSearchData', productSearchData);
        });
    });

    beforeEach(inject(function (_$state_, _$location_, $controller, _$rootScope_, _$interval_, _$q_, _$httpBackend_, ProductsDetailsService, STGLogService, productSearchData) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $interval = _$interval_;
        $q = _$q_;
        $state = _$state_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        logService = STGLogService;


        productsDetailsService = ProductsDetailsService;

        Ctrl = $controller('ProductsDetailsController', {$rootScope: $rootScope, $scope: $scope, $uibModalInstance : mockModal, $interval: $interval, history: history, productSearchDat: {}});
    }));

    it('should initialize the ProductsDetailsController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    /*it('should call backtoSearch ', function () {
        spyOn($state, 'go');
        spyOn(Ctrl, 'backtoSearch').and.callThrough();
        Ctrl.backtoSearch();
        $scope.$apply();
        expect($state.go).toHaveBeenCalledWith('vendors');
        expect(Ctrl.backtoSearch).toHaveBeenCalled();
    });*/
});

