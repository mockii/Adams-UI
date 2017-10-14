'use strict';

(function () {
    angular.module('adams.vendor.search.service', ['common.modules.logging'])
        .factory('VendorSearchService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', '$log', function($rootScope, $http, ADAMS_URL_SPACE, $q, $log) {
            //$log.debug('Vendor Search Response debug');
            var vendorSearchService = {};
            vendorSearchService.getAllVendorSearchDetails = function(limit, page, vendorSearchInput, sort, source_system_id) {
                var vendorSearchDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.vendorSearchData + '?limit=' + limit + '&page=' + page  + '&vendorSearchInput=' + JSON.stringify(vendorSearchInput) + '&sorts=' + sort + '&source_system_id=' + source_system_id ;
                var request = $http({
                    method: "get",
                    url: url,
                    timeout: vendorSearchDeferred.promise
                });
                $log.info('Vendor Search Details Requested info');
                var promise = request.then(
                    function( response ) {
                        // $log.warn('Vendor Search Response Successful warn' + JSON.stringify(response.data));
                        return( response.data );
                    },
                    function(error) {
                        return [];
                    }
                );

                promise.abort = function() {
                    vendorSearchDeferred.resolve();
                };

                promise.finally(
                    function() {
                        //$log.error('Garbage Collecting Vendor Search Promise error');
                        //$log.log('Garbage Collecting Vendor Search Promise trace');
                        promise.abort = angular.noop;
                        vendorSearchDeferred = request = promise = null;
                    }
                );
                return( promise );
            };
            return vendorSearchService;
        }]);
})();