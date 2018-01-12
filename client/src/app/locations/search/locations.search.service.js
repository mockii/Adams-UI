'use strict';

(function () {
    angular.module('adams.locations.search.service', ['common.modules.logging', 'common.services.RBAC'])
        .factory('LocationsSearchService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', '$log', 'RBACService', 'ApplicationConfigurationService',
            function($rootScope, $http, ADAMS_URL_SPACE, $q, $log, RBACService, ApplicationConfigurationService) {
            //$log.debug('Locations Search Response debug');
            var locationsSearchService = {};

            locationsSearchService.getCurrentProfile = function() {
                return RBACService.getCurrentProfile();
            };

            locationsSearchService.getAllLocationsSearchDetails = function(limit, page, locationsSearchInput, sort) {
                var locationsSearchDeferred = $q.defer(),
                    appName = ApplicationConfigurationService.getApplicationName(),
                    url = ADAMS_URL_SPACE.urls.local.getLocationsByUser + '?limit=' + limit + '&page=' + page  + '&locationsSearchInput=' + encodeURIComponent(JSON.stringify(locationsSearchInput)) + '&sorts=' + sort + '&appName=' + appName + '&roleName=' + locationsSearchService.getCurrentProfile().current_role.role_name;
                var request = $http({
                    method: "get",
                    url: url,
                    timeout: locationsSearchDeferred.promise
                });
                $log.info('Locations Search Details Requested info');
                var promise = request.then(
                    function( response ) {
                        // $log.warn('Locations Search Response Successful warn' + JSON.stringify(response.data));
                        return( response.data );
                    },
                    function(error) {
                        return [];
                    }
                );

                promise.abort = function() {
                    locationsSearchDeferred.resolve();
                };

                promise.finally(
                    function() {
                        //$log.error('Garbage Collecting Locations Search Promise error');
                        //$log.log('Garbage Collecting Locations Search Promise trace');
                        promise.abort = angular.noop;
                        locationsSearchDeferred = request = promise = null;
                    }
                );
                return( promise );
            };

            return locationsSearchService;
        }]);
})();