'use strict';

describe('POS system categories controller', function () {

    var posSystemCategoriesController,
        $scope,
        uibModal,
        compassToastr={},
        $rootScope,
        $q,
        pointOfSaleSystemCategoriesService={};

    beforeEach(module('adams.point.of.sale.system.categories.controller'));
    beforeEach(module('common.services.CompassToastr'));

    beforeEach(inject(function ($controller, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $q = _$q_;

        pointOfSaleSystemCategoriesService.getAllSystemCategories = function () {
            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
        };

        posSystemCategoriesController = $controller('PointOfSaleSystemCategoriesController',
            {
                $rootScope: $rootScope,
                $scope: $scope,
                CompassToastr: compassToastr,
                $uibModal: uibModal,
                PointOfSaleSystemCategoriesService : pointOfSaleSystemCategoriesService
            }
        );
    }));


    it('should exist', function () {
        expect(posSystemCategoriesController).toBeDefined();
    });

});