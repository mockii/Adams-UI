(function () {
    angular.module('adams.products.search.service', [
        'common.modules.logging'
    ])
        .factory('ProductsSearchService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', '$log',
            function($rootScope, $http, ADAMS_URL_SPACE, $q, $log) {
                $log.debug('Products Search Response debug');
                var productsSearchData = {};
                productsSearchData.getAllProductsSearchDetails = function(limit, page, search, sort) {
                    var productsSearchDeferred = $q.defer(),
                        url = ADAMS_URL_SPACE.urls.local.products + '?limit=' + limit + '&page=' + page  + '&search=' + JSON.stringify(search) + '&sorts=' + sort;
                    var request = $http({
                        method: "get",
                        url: url,
                        timeout: productsSearchDeferred.promise
                    });
                    $log.info('Products Search Details Requested info');
                    var promise = request.then(
                        function( response ) {
                            // $log.warn('Products Search Response Successful warn' + JSON.stringify(response.data));
                            return( response.data );
                        },
                        function(error) {
                            return [];
                        }
                    );
                    promise.abort = function() {
                        productsSearchDeferred.resolve();
                    };

                    promise.finally(
                        function() {
                            //$log.error('Garbage Collecting Products Search Promise error');
                            $log.log('Garbage Collecting Products Search Promise trace');
                            promise.abort = angular.noop;
                            productsSearchDeferred = request = promise = null;
                        }
                    );
                    return( promise );
                };


                return productsSearchData;
        }]);
})();