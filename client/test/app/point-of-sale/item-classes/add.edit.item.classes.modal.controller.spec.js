'use strict';

describe('POS item classes modal controller', function () {

    var addEditItemClassesModalController,
        addEditItemClassesModalController1,
        addEditItemClassesModalController2,
        $scope,
        itemClassesRowData = {},
        itemClassesRowData1 = {},
        itemClassesGridData = {},
        logService = {},
        $q,
        $uibModalInstance,
        mockPosItemClassesService = {},
        mockPosItemClassesService1 = {},
        $rootScope;

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

    beforeEach(inject(function ($controller, _$rootScope_, STGLogService, $log, $q) {
        $rootScope = _$rootScope_;
        $q = $q;
        $scope = _$rootScope_.$new();
        logService = STGLogService;
        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

        itemClassesRowData = {"name":"Class1","description":"Class1 desc","active":true,"created_by":null,"created_date":null,"modified_by":null,"modified_date":null,"item_class_code":"701","range_start":21,"range_end":25};

        itemClassesRowData1 = {"name":"Class1","description":"Class1 desc","active":true,"created_by":null,"created_date":null,"modified_by":null,"modified_date":null,"item_class_code":"701","range_start":2,"range_end":5};

        itemClassesGridData = [{"name":"Class1","description":"Class1 desc","active":true,"created_by":null,"created_date":null,"modified_by":null,"modified_date":null,"item_class_code":"701","range_start":1,"range_end":10},{"name":"Class2","description":"Class2 desc","active":true,"created_by":null,"created_date":null,"modified_by":null,"modified_date":null,"item_class_code":"702","range_start":11,"range_end":20}];

        mockPosItemClassesService.addPosItemClass = function(itemClassesRowData){
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockPosItemClassesService.updatePosItemClass = function(itemClassesRowData){
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockPosItemClassesService1.addPosItemClass = function(itemClassesRowData){
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        mockPosItemClassesService1.updatePosItemClass = function(itemClassesRowData){
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        addEditItemClassesModalController = $controller('AddEditItemClassesModalController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                $uibModalInstance: $uibModalInstance,
                PosItemClassesService: mockPosItemClassesService,
                action: '',
                itemClassesRowData: itemClassesRowData,
                itemClassesGridData: itemClassesGridData
            }
        );

        addEditItemClassesModalController1 = $controller('AddEditItemClassesModalController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                $uibModalInstance: $uibModalInstance,
                PosItemClassesService: mockPosItemClassesService,
                action: '',
                itemClassesRowData: itemClassesRowData1,
                itemClassesGridData: itemClassesGridData
            }
        );

        addEditItemClassesModalController2 = $controller('AddEditItemClassesModalController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                $uibModalInstance: $uibModalInstance,
                PosItemClassesService: mockPosItemClassesService1,
                action: '',
                itemClassesRowData: itemClassesRowData,
                itemClassesGridData: itemClassesGridData
            }
        );
    }));

    it('should exist', function () {
        expect(addEditItemClassesModalController).toBeDefined();
        expect(addEditItemClassesModalController1).toBeDefined();
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

    it('should call save - containsRange', function() {
        spyOn(addEditItemClassesModalController1, 'save').and.callThrough();
        addEditItemClassesModalController1.action = 'Add';
        addEditItemClassesModalController1.save();
        $scope.$apply();
        expect(addEditItemClassesModalController1.save).toHaveBeenCalled();
    });

    it('should call save and throw add error', function() {
        spyOn(addEditItemClassesModalController2, 'save').and.callThrough();
        addEditItemClassesModalController2.action = 'Add';
        addEditItemClassesModalController2.save();
        $scope.$apply();
        expect(addEditItemClassesModalController2.save).toHaveBeenCalled();
    });

    it('should call save and throw edit error', function() {
        spyOn(addEditItemClassesModalController2, 'save').and.callThrough();
        addEditItemClassesModalController2.action = 'Edit';
        addEditItemClassesModalController2.save();
        $scope.$apply();
        expect(addEditItemClassesModalController2.save).toHaveBeenCalled();
    });
});