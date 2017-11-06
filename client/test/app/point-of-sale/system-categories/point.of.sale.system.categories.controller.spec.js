'use strict';

describe('POS system categories controller', function () {

    var posSystemCategoriesController,
        $scope,
        $rootScope;

    beforeEach(module('adams.point.of.sale.system.categories.controller'));

    beforeEach(inject(function ($controller, _$rootScope_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();

        posSystemCategoriesController = $controller('PointOfSaleSystemCategoriesController',
            {
                $rootScope: $rootScope,
                $scope: $scope
            }
        );
    }));


    it('should exist', function () {
        expect(posSystemCategoriesController).toBeDefined();
    });

});