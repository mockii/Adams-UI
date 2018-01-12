'use strict';

(function () {

    angular.module('adams.point.of.sale.system.categories.service', [])
        .factory('PointOfSaleSystemCategoriesService', ['$q', '$http', 'ADAMS_URL_SPACE', '$log',
            function ($q, $http, ADAMS_URL_SPACE, $log) {

                var pointOfSaleSystemCategoriesService = {};

                pointOfSaleSystemCategoriesService.getTypeDetailsForSystemCategoryAndVendor = function (systemCategory, vendorName, type, limit, page, sort, search) {
                    var posSystemCategoriesDeferred = $q.defer(),
                        url = ADAMS_URL_SPACE.urls.local.getTypeDetailsForSystemCategoryAndVendor
                            .replace('{system_category}',systemCategory)
                            .replace('{vendor_name}',vendorName)
                            .replace('{type}',type) +
                            '?limit=' + limit + '&page=' + page  + '&search=' + JSON.stringify(search) + '&sorts=' + sort;

                    var request = $http({
                        method: "get",
                        url: url,
                        timeout: posSystemCategoriesDeferred.promise
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
                        posSystemCategoriesDeferred.resolve();
                    };

                    promise.finally(
                        function() {
                            promise.abort = angular.noop;
                            posSystemCategoriesDeferred = request = promise = null;
                        }
                    );

                    return promise;
                };

                pointOfSaleSystemCategoriesService.addTypeDetailsForSystemCategoryAndVendor = function (systemCategory, vendorName, typeName, typeDetails) {
                    var posSystemCategoriesDeferred = $q.defer(),
                        url = ADAMS_URL_SPACE.urls.local.getTypeDetailsForSystemCategoryAndVendor
                                .replace('{system_category}',systemCategory)
                                .replace('{vendor_name}',vendorName)
                                .replace('{type}',typeName);

                    return $http.post(url, typeDetails)
                        .then(function (response) {
                            return response.data;
                        }, function (error) {
                            $log.error("An error occurred while adding Type.", error.data);
                            return 'error';
                        });
                };

                pointOfSaleSystemCategoriesService.getAllSystemCategories = function () {
                    var posSystemCategoriesDeferred = $q.defer(),
                        url = ADAMS_URL_SPACE.urls.local.getSystemCategories;

                    var request = $http({
                        method: "get",
                        url: url,
                        timeout: posSystemCategoriesDeferred.promise
                    });

                    var promise = request.then(
                        function (response) {
                            return response.data;
                        },
                        function (error) {
                            return 'error';
                        }
                    );

                    return promise;
                };

                pointOfSaleSystemCategoriesService.getAllVendors = function () {
                    var posVendorsDeferred = $q.defer(),
                        url = ADAMS_URL_SPACE.urls.local.getVendors;

                    var request = $http({
                        method: "get",
                        url: url,
                        timeout: posVendorsDeferred.promise
                    });

                    var promise = request.then(
                        function (response) {
                            return response.data;
                        },
                        function (error) {
                            return 'error';
                        }
                    );

                    return promise;
                };

                pointOfSaleSystemCategoriesService.getTypesForVendor = function (vendorName) {
                    var posTypesDeferred = $q.defer(),
                        url = ADAMS_URL_SPACE.urls.local.getTypesForVendor.replace('{vendor_name}', vendorName);

                    var request = $http({
                        method: "get",
                        url: url,
                        timeout: posTypesDeferred.promise
                    });

                    var promise = request.then(
                        function (response) {
                            return response.data;
                        },
                        function (error) {
                            return 'error';
                        }
                    );

                    return promise;
                };

                return pointOfSaleSystemCategoriesService;

            }]);

})();