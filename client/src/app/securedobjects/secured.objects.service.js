/**
 * Created by kandun01 on 1/26/2017.
 */

'use strict';

(function () {

    angular.module('adams.secured.objects.service', [])
        .factory('SecuredObjectsService', ['$http', 'ADAMS_URL_SPACE', '$q', function($http, ADAMS_URL_SPACE, $q) {
            var securedObjectsService = {};

            securedObjectsService.getApplications = function(limit, page) {
                var securedObjectsDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.secApplication + '?limit=' + limit + '&page=' + page;

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: securedObjectsDeferred.promise
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
                    securedObjectsDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        securedObjectsDeferred = request = promise = null;
                    }
                );


                return( promise );
            };

            securedObjectsService.getApplicationRoles = function(limit, page, search) {
                var securedObjectsDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.secRole + '?limit=' + limit + '&page=' + page +'&application_name='+search;

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: securedObjectsDeferred.promise
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
                    securedObjectsDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        securedObjectsDeferred = request = promise = null;
                    }
                );

                return( promise );
            };


            securedObjectsService.getSecuredObjectsForRole = function(limit, page, application, role) {
                var securedObjectsDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.secObjects+ '?limit=' + limit + '&page=' + page+ '&application_name='+ application + '&role_name='+role;

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: securedObjectsDeferred.promise
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
                    securedObjectsDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        securedObjectsDeferred = request = promise = null;
                    }
                );

                return( promise );
            };


            return securedObjectsService;

        }]);
})();

