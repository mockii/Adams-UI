'use strict';

describe('VendorDetailsController', function() {

    var Ctrl,
        $rootScope,
        $scope,
        $window,
        $location,
        $interval,
        history,
        $q,
        $httpBackend,
        vendorDetailsService,
        $state,
        mockModal;
    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.vendor.details.controller'));
    beforeEach(module('adams.vendor.account.details.controller'));
    beforeEach(module('adams.vendor.details.service'));

    beforeEach(inject(function (_$state_, _$location_, $controller, _$rootScope_, _$interval_, _$q_, _$httpBackend_, VendorDetailsService) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $interval = _$interval_;
        $q = _$q_;
        $state = _$state_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;

        vendorDetailsService = VendorDetailsService;

        Ctrl = $controller('VendorDetailsController', {$rootScope: $rootScope, $scope: $scope, $uibModalInstance : mockModal, $interval: $interval, history: history});
    }));

    it('should initialize the VendorDetailsController properly', function () {
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

