'use strict';

(function () {

    angular.module('adams.point.of.sale.system.categories.defaults.service', [])
        .factory('PointOfSaleSystemCategoriesDefaultsService', ['$q', '$http', 'ADAMS_URL_SPACE', '$log',
            function ($q, $http, ADAMS_URL_SPACE, $log) {

                var pointOfSaleSystemCategoriesDefaultsService = {};

                pointOfSaleSystemCategoriesDefaultsService.getTypeDetailsForSystemCategoryDefaultsAndVendor = function (itemCategoryCode) {
                    var itemCategoryMappedVendorItemsDeferred = $q.defer(),
                        url = ADAMS_URL_SPACE.urls.local.getTypeDetailsForSystemCategoryDefaultsAndVendor
                                .replace('{item_category_code}',itemCategoryCode);

                    var request = $http({
                        method: "get",
                        url: url,
                        timeout: itemCategoryMappedVendorItemsDeferred.promise
                    });

                    var promise = request.then(
                        function (response) {
                            return response.data;
                        },
                        function (error) {
                            return [];
                        }
                    );

                    promise.abort = function () {
                        itemCategoryMappedVendorItemsDeferred.resolve();
                    };

                    promise.finally(
                        function() {
                            promise.abort = angular.noop;
                            itemCategoryMappedVendorItemsDeferred = request = promise = null;
                        }
                    );

                    return promise;
                };

                pointOfSaleSystemCategoriesDefaultsService.updateRevenueCategoryDefaults = function (itemCategoryCode, systemCategoryName, vendorName, vendorCategoryTypeName, vendorCategoryItemDetails) {
                    var url = ADAMS_URL_SPACE.urls.local.getTypeDetailsForSystemCategoryAndVendor
                                .replace('{item_category_code}',itemCategoryCode)
                                .replace('{system_category_name}',systemCategoryName)
                                .replace('{vendor_name}',vendorName)
                                .replace('{vendor_category_type_name}',vendorCategoryTypeName);

                    return $http.put(url, vendorCategoryItemDetails)
                        .then(function (response) {
                            return response.data;
                        }, function (error) {
                            $log.error("An error occurred while updating vendor category item.", error.data);
                            return 'error';
                        });
                };

                pointOfSaleSystemCategoriesDefaultsService.updateItemCategoryDefaults = function (itemCategoryCode, systemCategoryName, vendorName, vendorCategoryTypeName, vendorCategoryItemDetails) {
                    var url = ADAMS_URL_SPACE.urls.local.getTypeDetailsForSystemCategoryAndVendor
                                .replace('{item_category_code}',itemCategoryCode)
                                .replace('{system_category_name}',systemCategoryName)
                                .replace('{vendor_name}',vendorName)
                                .replace('{vendor_category_type_name}',vendorCategoryTypeName);

                    return $http.put(url, vendorCategoryItemDetails)
                        .then(function (response) {
                            return response.data;
                        }, function (error) {
                            $log.error("An error occurred while updating vendor category item.", error.data);
                            return 'error';
                        });
                };

                return pointOfSaleSystemCategoriesDefaultsService;

            }]);

})();