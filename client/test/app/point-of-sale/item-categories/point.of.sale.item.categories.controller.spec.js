'use strict';

describe('POS item categories controller', function () {

    var posItemCategoriesController,
        $scope,
        $rootScope;

    beforeEach(module('adams.point.of.sale.item.categories.controller'));

    beforeEach(inject(function ($controller, _$rootScope_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();

        posItemCategoriesController = $controller('PosItemCategoriesController',
            {
                $rootScope: $rootScope,
                $scope: $scope
            }
        );
    }));

    it('should exist', function () {
        expect(posItemCategoriesController).toBeDefined();
    });

});