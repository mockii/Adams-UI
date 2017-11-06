'use strict';

describe('POS revenue categories modal controller', function () {

    var addEditRevenueCategoriesModalController,
        addEditRevenueCategoriesModalController1,
        $scope,
        revenueCategoriesRowData = {},
        logService = {},
        $q,
        $uibModalInstance,
        mockPosRevenueCategoriesService = {},
        mockPosRevenueCategoriesService1 = {},
        $rootScope;

    beforeEach(module('adams.add.edit.revenue.categories.modal.controller'));beforeEach(module('adams.common.url'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.utils'));

    beforeEach(module(function($provide) {
            $provide.value('PosRevenueCategoriesService', mockPosRevenueCategoriesService);
            $provide.value('PosRevenueCategoriesService', mockPosRevenueCategoriesService1);
            $provide.value('STGLogService', logService);
        }
    ));

    beforeEach(inject(function ($controller, _$rootScope_, STGLogService, $log, $q) {
        $rootScope = _$rootScope_;
        $q = $q;
        $scope = _$rootScope_.$new();
        logService = STGLogService;
        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

        revenueCategoriesRowData = {
            "revenue_category_code"	: "string",
            "name"					: "string",
            "description"			: "string",
            "type"					: "string",
            "active"				: true,
            "created_by"			: "",
            "created_date"			: "epoch time",
            "modified_by"			: "string",
            "modified_date"			: "epoch time"
        };

        mockPosRevenueCategoriesService.addPosRevenueCategory = function(){
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockPosRevenueCategoriesService.updatePosRevenueCategory = function(){
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockPosRevenueCategoriesService1.addPosRevenueCategory = function(){
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        mockPosRevenueCategoriesService1.updatePosRevenueCategory = function(){
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        addEditRevenueCategoriesModalController = $controller('AddEditRevenueCategoriesModalController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                $uibModalInstance: $uibModalInstance,
                revenueCategoriesRowData: revenueCategoriesRowData,
                action: '',
                PosRevenueCategoriesService: mockPosRevenueCategoriesService
            }
        );

        addEditRevenueCategoriesModalController1 = $controller('AddEditRevenueCategoriesModalController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                $uibModalInstance: $uibModalInstance,
                revenueCategoriesRowData: revenueCategoriesRowData,
                action: '',
                PosRevenueCategoriesService: mockPosRevenueCategoriesService1
            }
        );
    }));

    it('should exist', function () {
        expect(addEditRevenueCategoriesModalController).toBeDefined();
    });

    it('should dismiss the modal with result "dismiss" when dismissed', function () {
        addEditRevenueCategoriesModalController.close($uibModalInstance.dismiss('cancel'));
        expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

    it('should call save', function() {
        spyOn(addEditRevenueCategoriesModalController, 'save').and.callThrough();
        addEditRevenueCategoriesModalController.action = 'Add';
        addEditRevenueCategoriesModalController.save();
        $scope.$apply();
        expect(addEditRevenueCategoriesModalController.save).toHaveBeenCalled();
    });

    it('should call save', function() {
        spyOn(addEditRevenueCategoriesModalController, 'save').and.callThrough();
        addEditRevenueCategoriesModalController.action = 'Edit';
        addEditRevenueCategoriesModalController.save();
        $scope.$apply();
        expect(addEditRevenueCategoriesModalController.save).toHaveBeenCalled();
    });

    it('should call save', function() {
        spyOn(addEditRevenueCategoriesModalController1, 'save').and.callThrough();
        addEditRevenueCategoriesModalController1.action = 'Add';
        addEditRevenueCategoriesModalController1.save();
        $scope.$apply();
        expect(addEditRevenueCategoriesModalController1.save).toHaveBeenCalled();
    });

    it('should call save', function() {
        spyOn(addEditRevenueCategoriesModalController1, 'save').and.callThrough();
        addEditRevenueCategoriesModalController1.action = 'Edit';
        addEditRevenueCategoriesModalController1.save();
        $scope.$apply();
        expect(addEditRevenueCategoriesModalController1.save).toHaveBeenCalled();
    });
});