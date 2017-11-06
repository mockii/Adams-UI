(function() {
    'use strict';

    angular.module('adams.point.of.sale.item.classes.service', ['common.modules.logging'])
        .factory('PosItemClassesService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', '$log', function($rootScope, $http, ADAMS_URL_SPACE, $q, $log) {
            $log.debug('Inside factory service');

            var posItemClassesService = {},
                allItemClasses = [];

            posItemClassesService.getAllPosItemClassesDetails = function(limit, page, search, sort) {
                if(allItemClasses.length === 0){
                    var pointOfSaleItemClassesDeferred = $q.defer(),
                        url = ADAMS_URL_SPACE.urls.local.getPosItemClasses + '?limit=' + limit + '&page=' + page  + '&search=' + JSON.stringify(search) + '&sorts=' + sort;
                    var request = $http({
                        method: "get",
                        url: url,
                        timeout: pointOfSaleItemClassesDeferred.promise
                    });
                    var promise = request.then(
                        function( response ) {
                            allItemClasses = response.data;
                            return( allItemClasses );
                        },
                        function(error) {
                            $log.error('An error occurred while fetching Item Classes.', error.data);
                            return [];
                        }
                    );
                    promise.abort = function() {
                        pointOfSaleItemClassesDeferred.resolve();
                    };

                    promise.finally(
                        function() {
                            promise.abort = angular.noop;
                            pointOfSaleItemClassesDeferred = request = promise = null;
                        }
                    );
                    return( promise );
                }else{
                    var deferred = $q.defer();
                    deferred.resolve(allItemClasses);
                    return deferred.promise;
                }
            };

            posItemClassesService.addPosItemClass = function(itemClassData){
                var url = ADAMS_URL_SPACE.urls.local.addPosItemClass;

                return $http.post(url, itemClassData)
                    .then(function (response) {
                        $rootScope.$broadcast('reloadItemClasses');
                        return response.data.data[0];
                    }, function (error) {
                        $log.error("An error occurred while adding Item Classes.", error.data);
                        return 'error';
                    });
            };

            posItemClassesService.updatePosItemClass = function(itemClassData){
                var url = ADAMS_URL_SPACE.urls.local.updatePosItemClass;

                return $http.put(url, itemClassData)
                    .then(function (response) {
                        $rootScope.$broadcast('reloadItemClasses');
                        return response.data.data[0];
                    }, function (error) {
                        $log.error('An error occurred while updating Item Classes.', error.data);
                        return 'error';
                    });
            };

            return posItemClassesService;
        }]);

})();