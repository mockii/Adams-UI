(function() {
    'use strict';

    angular.module('adams.point.of.sale.revenue.categories.service', ['common.modules.logging'])
        .factory('PosRevenueCategoriesService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', '$log', function($rootScope, $http, ADAMS_URL_SPACE, $q, $log) {
           var posRevenueCategoriesService = {};

            posRevenueCategoriesService.getAllPosRevenueCategoriesDetails = function(limit, page, search, sort) {
                var posRevenueCategoriesDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.getPosRevenueCategories + '?limit=' + limit + '&page=' + page  + '&search=' + JSON.stringify(search) + '&sorts=' + sort;
                var request = $http({
                    method: "get",
                    url: url,
                    timeout: posRevenueCategoriesDeferred.promise
                });
                var promise = request.then(
                    function( response ) {
                        return( response.data );
                    },
                    function(error) {
                        $log.error('An error occurred while fetching Revenue Category.', error.data);
                        return [];
                    }
                );
                promise.abort = function() {
                    posRevenueCategoriesDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        posRevenueCategoriesDeferred = request = promise = null;
                    }
                );
                return( promise );
            };

            posRevenueCategoriesService.addPosRevenueCategory = function(revenueCategoryData){
                var url = ADAMS_URL_SPACE.urls.local.addPosRevenueCategory;

                return $http.post(url, revenueCategoryData)
                    .then(function (response) {
                        $rootScope.$broadcast('reloadRevenueCategories');
                        return response.data.data[0];
                    }, function (error) {
                        $log.error("An error occurred while adding Revenue Category.", error.data);
                        return 'error';
                    });
            };

            posRevenueCategoriesService.updatePosRevenueCategory = function(revenueCategoryData){
                var url = ADAMS_URL_SPACE.urls.local.updatePosRevenueCategory;

                return $http.put(url, revenueCategoryData)
                    .then(function (response) {
                        $rootScope.$broadcast('reloadRevenueCategories');
                        return response.data.data[0];
                    }, function (error) {
                        $log.error('An error occurred while updating Revenue Category.', error.data);
                        return 'error';
                    });
            };

            return posRevenueCategoriesService;

        }]);

})();