'use strict';

(function () {

    angular.module('adams.point.of.sale.item.search.service', [])
        .factory('PointOfSaleItemSearchService', ['$q', '$http', 'ADAMS_URL_SPACE', '$log',
            function ($q, $http, ADAMS_URL_SPACE, $log) {

            var pointOfSaleItemSearchService = {};

            pointOfSaleItemSearchService.getPosItems = function () {
                var posItemsDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.getPosItems;

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: posItemsDeferred.promise
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
                    posItemsDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        posItemsDeferred = request = promise = null;
                    }
                );

                return promise;
            };

            return pointOfSaleItemSearchService;

        }]);

})();