'use strict';

describe('POS revenue categories controller', function () {

    var posRevenueCategoriesController,
        $scope,
        $rootScope;

    beforeEach(module('adams.point.of.sale.revenue.categories.controller'));

    beforeEach(inject(function ($controller, _$rootScope_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();

        posRevenueCategoriesController = $controller('PosRevenueCategoriesController',
            {
                $rootScope: $rootScope,
                $scope: $scope
            }
        );
    }));


    it('should exist', function () {
        expect(posRevenueCategoriesController).toBeDefined();
    });

});