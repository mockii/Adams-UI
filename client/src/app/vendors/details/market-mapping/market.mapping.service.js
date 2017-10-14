'use strict';

(function () {
    angular.module('adams.market.mapping.service', [])
        .factory('MarketMappingService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', function($rootScope, $http, ADAMS_URL_SPACE, $q) {
            var marketMappingService = {};
            marketMappingService.getMarketMappingData = function(limit, page, sort, vendorNumber, marketName, teamName) {
                var marketMappingSearchDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.vendorAndListMarkets + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&vendorNumber=' + vendorNumber + '&marketName=' + marketName + '&teamName=' + teamName;

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

            marketMappingService.deleteMarketMapping = function(vendorNumber, marketName, teamName, vendorSourceSystemId, teamSourceSystemId) {
                var url = ADAMS_URL_SPACE.urls.local.deleteVendorsTeam.replace('{vendorNumber}', vendorNumber).replace('{marketName}', marketName).replace('{teamName}', teamName).replace('{vendorSourceSystemId}', vendorSourceSystemId).replace('{teamSourceSystemId}', teamSourceSystemId);//+ '?vendorSourceSystemId=' + vendorSourceSystemId + '&teamSourceSystemId=' + teamSourceSystemId
                return $http.delete(url)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        console.error('An error occurred deleting Market Mapping', error.data);
                        return 'error';
                    });
            };

            marketMappingService.addMarketMapping = function(vendorNumber, marketName, vendorSourceSystemId, marketMappingData) {
                var url = ADAMS_URL_SPACE.urls.local.addMarketMapping.replace('{vendorNumber}', vendorNumber).replace('{marketName}', marketName)+ '?vendorSourceSystemId=' + vendorSourceSystemId;

                return $http.post(url, marketMappingData)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        console.error('An error occurred adding Market Mapping', error.data);
                        return 'error';
                    });
            };

            return marketMappingService;
        }]);
})();
