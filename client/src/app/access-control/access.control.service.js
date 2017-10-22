(function () {
    'use strict';

    angular.module('adams.access.control.service', [])
        .factory('AccessControlService', ['$rootScope', '$q', '$http', 'ADAMS_URL_SPACE', '$log',
            function ($rootScope,  $q, $http, ADAMS_URL_SPACE, $log) {

            var accessControlService = {};

            accessControlService.getRolesForSecuredObject = function (limit, page, applicationName, securedObjectName) {
                var rolesForSecuredObjectDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.rolesForSecuredObject.replace('{applicationName}', applicationName).replace('{securedObjectName}', securedObjectName) + '?limit=' + limit + '&page=' + page;
                var request = $http({
                    method: "get",
                    url: url,
                    timeout: rolesForSecuredObjectDeferred.promise
                });
                var promise = request.then(
                    function( response ) {
                        return( response.data );
                    },
                    function(error) {
                        return [];
                    }
                );
                promise.abort = function() {
                    rolesForSecuredObjectDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        rolesForSecuredObjectDeferred = request = promise = null;
                    }
                );
                return( promise );
            };

            accessControlService.getOverridesForSecuredObject = function (limit, page, applicationName, securedObjectName) {
                var overridesForSecuredObjectDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.overridesForSecuredObject.replace('{applicationName}', applicationName).replace('{securedObjectName}', securedObjectName) + '?limit=' + limit + '&page=' + page;
                var request = $http({
                    method: "get",
                    url: url,
                    timeout: overridesForSecuredObjectDeferred.promise
                });
                var promise = request.then(
                    function( response ) {
                        return( response.data );
                    },
                    function(error) {
                        return [];
                    }
                );
                promise.abort = function() {
                    overridesForSecuredObjectDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        overridesForSecuredObjectDeferred = request = promise = null;
                    }
                );
                return( promise );

            };

            return accessControlService;

        }]);
})();