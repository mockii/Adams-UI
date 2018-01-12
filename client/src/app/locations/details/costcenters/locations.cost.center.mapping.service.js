(function () {
    'use strict';
    angular.module('adams.locations.costcenters.service', ['common.services.RBAC'])
        .factory('LocationsCostCenterMappingService', ['$rootScope', '$http', 'RBACService', 'ADAMS_URL_SPACE', '$q', 'ApplicationConfigurationService',
            function ($rootScope, $http, RBACService, ADAMS_URL_SPACE, $q, ApplicationConfigurationService) {
            var locationsCostCenterMappingService = {};

            locationsCostCenterMappingService.getCurrentProfile = function() {
                return RBACService.getCurrentProfile();
            };

            locationsCostCenterMappingService.getCostCentersByLocationCode = function (limit, page, sort, locationCode, costCenterSearchInput) {
                var costCenterMappingDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.getCostCentersByLocationCode.replace('{locationCode}', locationCode) + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: costCenterMappingDeferred.promise
                });

                var promise = request.then(
                    function (response) {
                        return response.data;
                    },
                    function () {
                        return [];
                    }
                );

                promise.abort = function () {
                    costCenterMappingDeferred.resolve();
                };

                promise.finally(
                    function () {
                        promise.abort = angular.noop;
                        costCenterMappingDeferred = request = promise = null;
                    }
                );
                return ( promise );

            };

            locationsCostCenterMappingService.getCostCentersByUserName = function (limit, page, sort, costCenterSearchInput) {
                var costCenterMappingDeferred = $q.defer(),
                    appName = ApplicationConfigurationService.getApplicationName(),
                    url = ADAMS_URL_SPACE.urls.local.getCostCentersByUserName + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput) + '&appName=' + appName + '&roleName=' + locationsCostCenterMappingService.getCurrentProfile().current_role.role_name;

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: costCenterMappingDeferred.promise
                });

                var promise = request.then(
                    function (response) {
                        return response.data;
                    },
                    function () {
                        return [];
                    }
                );

                promise.abort = function () {
                    costCenterMappingDeferred.resolve();
                };

                promise.finally(
                    function () {
                        promise.abort = angular.noop;
                        costCenterMappingDeferred = request = promise = null;
                    }
                );
                return ( promise );

            };

            locationsCostCenterMappingService.addCostCentersByLocationCode = function (locationCode, costCentersData) {
                var url = ADAMS_URL_SPACE.urls.local.addCostCentersByLocationCode.replace('{locationCode}', locationCode);

                return $http.post(url, costCentersData)
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        console.error('An error occurred while adding eligible Cost Center Mapping', error.data);
                        return 'error';
                    });
            };

            locationsCostCenterMappingService.updateCostCentersByLocationAndCostCenterName = function (costCenterRowData) {
                var costCenterData = {},
                    url = ADAMS_URL_SPACE.urls.local.updateCostCentersByLocationAndCostCenterName.replace('{locationCode}', costCenterRowData.location_code).replace('{costCenterName}', costCenterRowData.cost_center_name) + '?sourceSystemId='+costCenterRowData.source_system_id;
                costCenterData.location_cost_center_map_status = costCenterRowData.location_cost_center_map_status;

                return $http.put(url, costCenterData)
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        console.error('An error occurred while updating locations cost center association', error.data);
                        return 'error';
                    });
            };

            return locationsCostCenterMappingService;
        }]);
})();
