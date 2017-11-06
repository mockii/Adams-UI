'use strict';

describe('POS item categories modal controller', function () {

    var addEditItemCategoriesModalController,
        addEditItemCategoriesModalController1,
        $scope,
        itemCategoriesRowData = {},
        logService = {},
        $q,
        $uibModalInstance,
        mockPosItemCategoriesService = {},
        mockPosItemCategoriesService1 = {},
        $rootScope;

    beforeEach(module('adams.add.edit.item.categories.modal.controller'));beforeEach(module('adams.common.url'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.utils'));

    beforeEach(module(function($provide) {
            $provide.value('PosItemCategoriesService', mockPosItemCategoriesService);
            $provide.value('PosItemCategoriesService', mockPosItemCategoriesService1);
            $provide.value('STGLogService', logService);
        }
    ));

    beforeEach(inject(function ($controller, _$rootScope_, STGLogService, $log, $q) {
        $rootScope = _$rootScope_;
        $q = $q;
        $scope = _$rootScope_.$new();
        logService = STGLogService;
        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

        itemCategoriesRowData = {
            "item_category_code"	: "string",
            "name"					: "string",
            "description"			: "string",
            "type"					: "string",
            "active"				: true,
            "created_by"			: "",
            "created_date"			: "epoch time",
            "modified_by"			: "string",
            "modified_date"			: "epoch time"
        };

        mockPosItemCategoriesService.addPosItemCategory = function(){
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockPosItemCategoriesService.updatePosItemCategory = function(){
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockPosItemCategoriesService1.addPosItemCategory = function(){
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        mockPosItemCategoriesService1.updatePosItemCategory = function(){
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        addEditItemCategoriesModalController = $controller('AddEditItemCategoriesModalController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                $uibModalInstance: $uibModalInstance,
                itemCategoriesRowData: itemCategoriesRowData,
                action: '',
                PosItemCategoriesService: mockPosItemCategoriesService
            }
        );

        addEditItemCategoriesModalController1 = $controller('AddEditItemCategoriesModalController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                $uibModalInstance: $uibModalInstance,
                itemCategoriesRowData: itemCategoriesRowData,
                action: '',
                PosItemCategoriesService: mockPosItemCategoriesService1
            }
        );
    }));

    it('should exist', function () {
        expect(addEditItemCategoriesModalController).toBeDefined();
    });

    it('should dismiss the modal with result "dismiss" when dismissed', function () {
        addEditItemCategoriesModalController.close($uibModalInstance.dismiss('cancel'));
        expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

    it('should call save', function() {
        spyOn(addEditItemCategoriesModalController, 'save').and.callThrough();
        addEditItemCategoriesModalController.action = 'Add';
        addEditItemCategoriesModalController.save();
        $scope.$apply();
        expect(addEditItemCategoriesModalController.save).toHaveBeenCalled();
    });

    it('should call save', function() {
        spyOn(addEditItemCategoriesModalController, 'save').and.callThrough();
        addEditItemCategoriesModalController.action = 'Edit';
        addEditItemCategoriesModalController.save();
        $scope.$apply();
        expect(addEditItemCategoriesModalController.save).toHaveBeenCalled();
    });

    it('should call save', function() {
        spyOn(addEditItemCategoriesModalController1, 'save').and.callThrough();
        addEditItemCategoriesModalController1.action = 'Add';
        addEditItemCategoriesModalController1.save();
        $scope.$apply();
        expect(addEditItemCategoriesModalController1.save).toHaveBeenCalled();
    });

    it('should call save', function() {
        spyOn(addEditItemCategoriesModalController1, 'save').and.callThrough();
        addEditItemCategoriesModalController1.action = 'Edit';
        addEditItemCategoriesModalController1.save();
        $scope.$apply();
        expect(addEditItemCategoriesModalController1.save).toHaveBeenCalled();
    });
});