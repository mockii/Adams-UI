'use strict';

(function () {

    angular.module('adams.point.of.sale.system.categories.service', [])
        .factory('PointOfSaleSystemCategoriesService', ['$q', '$http', 'ADAMS_URL_SPACE',
            function ($q, $http, ADAMS_URL_SPACE) {

                var pointOfSaleSystemCategoriesService = {};

                pointOfSaleSystemCategoriesService.getTypeDetailsForSystemCategoryAndVendor = function (systemCategory, vendorName, type) {
                    var posSystemCategoriesDeferred = $q.defer(),
                        url = ADAMS_URL_SPACE.urls.local.getTypeDetailsForSystemCategoryAndVendor
                            .replace('{system_category}',systemCategory)
                            .replace('{vendor_name}',vendorName)
                            .replace('{type}',type);

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

                return pointOfSaleSystemCategoriesService;

            }]);

})();