'use strict';

describe('POS item classes modal controller', function () {

    var addEditItemClassesModalController,
        addEditItemClassesModalController1,
        $scope,
        itemClassesRowData = {},
        logService = {},
        $q,
        $uibModalInstance,
        mockPosItemClassesService = {},
        mockPosItemClassesService1 = {},
        $rootScope;

    beforeEach(module('adams.add.edit.item.classes.modal.controller'));beforeEach(module('adams.common.url'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.utils'));

    beforeEach(module(function($provide) {
            $provide.value('PosItemClassesService', mockPosItemClassesService);
            $provide.value('PosItemClassesService', mockPosItemClassesService1);
            $provide.value('STGLogService', logService);
        }
    ));

    beforeEach(inject(function ($controller, _$rootScope_, STGLogService, $log, $q) {
        $rootScope = _$rootScope_;
        $q = $q;
        $scope = _$rootScope_.$new();
        logService = STGLogService;
        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

        itemClassesRowData = {
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

        mockPosItemClassesService.addPosItemClass = function(){
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockPosItemClassesService.updatePosItemClass = function(){
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockPosItemClassesService1.addPosItemClass = function(){
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        mockPosItemClassesService1.updatePosItemClass = function(){
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        addEditItemClassesModalController = $controller('AddEditItemClassesModalController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                $uibModalInstance: $uibModalInstance,
                itemClassesRowData: itemClassesRowData,
                action: '',
                PosItemClassesService: mockPosItemClassesService
            }
        );

        addEditItemClassesModalController1 = $controller('AddEditItemClassesModalController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                $uibModalInstance: $uibModalInstance,
                itemClassesRowData: itemClassesRowData,
                action: '',
                PosItemClassesService: mockPosItemClassesService1
            }
        );
    }));

    it('should exist', function () {
        expect(addEditItemClassesModalController).toBeDefined();
    });

    it('should dismiss the modal with result "dismiss" when dismissed', function () {
        addEditItemClassesModalController.close($uibModalInstance.dismiss('cancel'));
        expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

    it('should call save', function() {
        spyOn(addEditItemClassesModalController, 'save').and.callThrough();
        addEditItemClassesModalController.action = 'Add';
        addEditItemClassesModalController.save();
        $scope.$apply();
        expect(addEditItemClassesModalController.save).toHaveBeenCalled();
    });

    it('should call save', function() {
        spyOn(addEditItemClassesModalController, 'save').and.callThrough();
        addEditItemClassesModalController.action = 'Edit';
        addEditItemClassesModalController.save();
        $scope.$apply();
        expect(addEditItemClassesModalController.save).toHaveBeenCalled();
    });

    it('should call save', function() {
        spyOn(addEditItemClassesModalController1, 'save').and.callThrough();
        addEditItemClassesModalController1.action = 'Add';
        addEditItemClassesModalController1.save();
        $scope.$apply();
        expect(addEditItemClassesModalController1.save).toHaveBeenCalled();
    });

    it('should call save', function() {
        spyOn(addEditItemClassesModalController1, 'save').and.callThrough();
        addEditItemClassesModalController1.action = 'Edit';
        addEditItemClassesModalController1.save();
        $scope.$apply();
        expect(addEditItemClassesModalController1.save).toHaveBeenCalled();
    });
});