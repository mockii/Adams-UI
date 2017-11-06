'use strict';

describe('POS system category defaults controller', function () {

    var posSystemCategoryDefaultsController,
        $scope,
        $rootScope;

    beforeEach(module('adams.point.of.sale.system.category.defaults.controller'));

    beforeEach(inject(function ($controller, _$rootScope_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();

        posSystemCategoryDefaultsController = $controller('PointOfSaleSystemCategoryDefaultsController',
            {
                $rootScope: $rootScope,
                $scope: $scope
            }
        );
    }));


    it('should exist', function () {
        expect(posSystemCategoryDefaultsController).toBeDefined();
    });

});