'use strict';

describe('POS item classes controller', function () {

    var posItemClassesController,
        $scope,
        $rootScope;

    beforeEach(module('adams.point.of.sale.item.classes.controller'));

    beforeEach(inject(function ($controller, _$rootScope_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();

        posItemClassesController = $controller('PosItemClassesController',
            {
                $rootScope: $rootScope,
                $scope: $scope
            }
        );
    }));


    it('should exist', function () {
        expect(posItemClassesController).toBeDefined();
    });

});