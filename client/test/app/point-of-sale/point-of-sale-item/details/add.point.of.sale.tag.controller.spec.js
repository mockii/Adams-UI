'use strict';

describe('POS item details controller', function () {

    var addPointOfSaleTagsController,
        $scope,
        $rootScope,
        $q,
        $interval,
        mockModal,
        selectedTags={};

    beforeEach(module('ui.router'));
    beforeEach(module('adams.point.of.sale.add.tags.controller'));

    beforeEach(function() {
        module(function ($provide) {
            $provide.value('selectedTags', selectedTags);
        });
    });

    beforeEach(inject(function ($controller, _$rootScope_, _$q_, _$interval_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
        $interval = _$interval_;

        mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss')
        };

        addPointOfSaleTagsController = $controller('AddPointOfSaleTagsController',
            {
                $scope: $scope,
                $q: $q,
                $interval: $interval,
                $uibModalInstance: mockModal
            }
        );
    }));

    it('should exist', function () {
        expect(addPointOfSaleTagsController).toBeDefined();
    });

    it('should call submit', function () {
        spyOn(addPointOfSaleTagsController, 'select').and.callThrough();
        addPointOfSaleTagsController.newSelectedTags = [{"name":"tag one"},{"name":"tag two"}, {"name":"tag three"}];
        addPointOfSaleTagsController.select();
        $scope.$apply();
        expect(addPointOfSaleTagsController.select).toHaveBeenCalled();
    });

    it('should call cancel', function () {
        addPointOfSaleTagsController.cancel();
        expect(mockModal.dismiss).toHaveBeenCalled();
    });

    it('should add new tag',function () {
        var tagToAdd = {"name":"Tag To Add"};
        // reset tags
        addPointOfSaleTagsController.newSelectedTags = [];

        addPointOfSaleTagsController.addTag(tagToAdd);
        expect(addPointOfSaleTagsController.newSelectedTags.length).toBe(1);
        expect(addPointOfSaleTagsController.newSelectedTags[0].name).toBe(tagToAdd.name);

        // add again and verify idempotency
        addPointOfSaleTagsController.addTag(tagToAdd);
        expect(addPointOfSaleTagsController.newSelectedTags.length).toBe(1);
        expect(addPointOfSaleTagsController.newSelectedTags[0].name).toBe(tagToAdd.name);
    });

    it('should remve a tag', function () {
        var tagToRemove = {"name":"tag two"};
        addPointOfSaleTagsController.newSelectedTags = [{"name":"tag one"},{"name":"tag two"}, {"name":"tag three"}];

        addPointOfSaleTagsController.removeTag(tagToRemove.name);
        expect(addPointOfSaleTagsController.newSelectedTags.length).toBe(2);
    });

});