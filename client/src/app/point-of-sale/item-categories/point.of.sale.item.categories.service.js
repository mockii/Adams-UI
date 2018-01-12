(function() {
    'use strict';

    angular.module('adams.point.of.sale.item.categories.service', ['common.modules.logging'])
        .factory('PosItemCategoriesService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', '$log', function($rootScope, $http, ADAMS_URL_SPACE, $q, $log) {
            var posItemCategoriesService = {};

            posItemCategoriesService.getAllPosItemCategoriesDetails = function(limit, page, search, sort) {
                var pointOfSaleItemCategoriesDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.getPosItemCategories + '?limit=' + limit + '&page=' + page  + '&search=' + JSON.stringify(search) + '&sorts=' + sort;
                var request = $http({
                    method: "get",
                    url: url,
                    timeout: pointOfSaleItemCategoriesDeferred.promise
                });
                var promise = request.then(
                    function( response ) {
                        return( response.data );
                    },
                    function(error) {
                        $log.error('An error occurred while fetching Item Category.', error.data);
                        return [];
                    }
                );
                promise.abort = function() {
                    pointOfSaleItemCategoriesDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        pointOfSaleItemCategoriesDeferred = request = promise = null;
                    }
                );
                return( promise );
            };

            posItemCategoriesService.addPosItemCategory = function(itemCategoryData){
                var url = ADAMS_URL_SPACE.urls.local.addPosItemCategory;

                return $http.post(url, itemCategoryData)
                    .then(function (response) {
                        return response.data;
                    }, function (error) {
                        $log.error("An error occurred while adding Item Category.", error.data);
                        return 'error';
                    });
            };

            posItemCategoriesService.updatePosItemCategory = function(itemCategoryData){
                var url = ADAMS_URL_SPACE.urls.local.updatePosItemCategory.replace('{item_category_code}',itemCategoryData.item_category_code);

                return $http.put(url, itemCategoryData)
                    .then(function (response) {
                        return response.data;
                    }, function (error) {
                        $log.error('An error occurred while updating Item Category.', error.data);
                        return 'error';
                    });
            };
            
            return posItemCategoriesService;
        }]);

})();