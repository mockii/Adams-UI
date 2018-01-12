(function () {
    angular.module('adams.costcenter.market.mapping.service', [])
        .factory('CostCenterMarketMappingService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', function($rootScope, $http, ADAMS_URL_SPACE, $q) {
            var costCenterMarketMappingService = {};


            costCenterMarketMappingService.getDefaultMarket = function(costCenterNumber, sourceSystemId, searchInput) {
                var url = ADAMS_URL_SPACE.urls.local.costCenterAndListMarkets + '?limit=' + 10 + '&page=' + 1 + '&sorts=' + null + '&costCenterNumber=' + costCenterNumber + '&sourceSystemId=' + sourceSystemId + '&search=' + JSON.stringify(searchInput);
                return $http.get(url)
                    .then(function(response) {
                        return response.data.data[0];
                    }, function(error) {
                        return 'error';
                    });
            };

            costCenterMarketMappingService.getMarketMappingData = function(limit, page, sort, costCenterNumber, sourceSystemId, search) {
                var marketMappingSearchDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.costCenterAndListMarkets + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterNumber=' + costCenterNumber + '&sourceSystemId=' + sourceSystemId + '&search=' + JSON.stringify(search);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: marketMappingSearchDeferred.promise
                });

                var promise = request.then(
                    function( response ) {
                        return( response.data );
                    },
                    function() {
                        return [];
                    }
                );

                promise.abort = function() {
                    marketMappingSearchDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        marketMappingSearchDeferred = request = promise = null;
                    }
                );
                return( promise );
            };

            costCenterMarketMappingService.deleteCostCentersMarket = function(costCenterNumber, marketName, sourceSystemId) {
                var url = ADAMS_URL_SPACE.urls.local.deleteCostCentersMarkets.replace('{costCenterNumber}', costCenterNumber).replace('{marketName}', marketName) + '?sourceSystemId=' + sourceSystemId;
                return $http.delete(url)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        return 'error';
                    });
            };

            costCenterMarketMappingService.addCostCenterMarketMapping = function(costCenterNumber, marketMappingData, sourceSystemId) {
                var url = ADAMS_URL_SPACE.urls.local.addCostCenterMarketMapping.replace('{costCenterNumber}', costCenterNumber) + '?sourceSystemId=' + sourceSystemId;

                return $http.post(url, marketMappingData)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        return 'error';
                    });
            };

            return costCenterMarketMappingService;
        }]);
})();