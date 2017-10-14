'use strict';

describe('CostCenterDetailsController', function() {

    var Ctrl,
        $rootScope,
        $scope,
        $window,
        $location,
        $interval,
        history,
        $q,
        $httpBackend,
        CostCenterDetailsService,
        $state,
        mockModal;
    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.costcenter.details.controller'));
    beforeEach(module('adams.costcenter.account.details.controller'));
    beforeEach(module('adams.costcenter.details.service'));

    beforeEach(inject(function (_$state_, _$location_, $controller, _$rootScope_, _$interval_, _$q_, _$httpBackend_, CostCenterDetailsService) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $interval = _$interval_;
        $q = _$q_;
        $state = _$state_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;

        CostCenterDetailsService = CostCenterDetailsService;

        Ctrl = $controller('CostCenterDetailsController', {$rootScope: $rootScope, $scope: $scope, $uibModalInstance : mockModal, $interval: $interval, history: history});
    }));

    it('should initialize the CostCenterDetailsController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    /*it('should call backtoSearch ', function () {
        spyOn($state, 'go');
        spyOn(Ctrl, 'backtoSearch').and.callThrough();
        Ctrl.backtoSearch();
        $scope.$apply();
        expect($state.go).toHaveBeenCalledWith('costcenters');
        expect(Ctrl.backtoSearch).toHaveBeenCalled();
    });*/
});

