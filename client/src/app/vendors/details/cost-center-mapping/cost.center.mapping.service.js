(function () {
    'use strict';
    angular.module('adams.cost.center.mapping.service', [])
        .factory('CostCenterMappingService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', function ($rootScope, $http, ADAMS_URL_SPACE, $q) {
            var costCenterMappingService = {};
            costCenterMappingService.getCostCenterMappingData = function (limit, page, sort, vendorNumber, costCenterSearchInput) {
                var costCenterMappingDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.vendorCostCenters.replace('{vendorNumber}', vendorNumber) + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&vendorNumber=' + vendorNumber + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput);

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
            costCenterMappingService.getCostCenterMappingHistoryData = function (limit, page, sort, costCenterMappingHistorySearchInput, costCenterRowData) {

                var costCenterHistoryMappingDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.vendorCostCenterHistory.replace('{vendorNumber}', costCenterRowData.vendor_number).replace('{costCenterName}', costCenterRowData.cost_center_name) + '?vendorSourceSystemId=' + costCenterRowData.vendor_source_system_id + '&costCenterSourceSystemId=' + costCenterRowData.cost_center_source_system_id + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterMappingHistorySearchInput=' + JSON.stringify(costCenterMappingHistorySearchInput);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: costCenterHistoryMappingDeferred.promise,
                    body: costCenterRowData
                });

                var promise = request.then(
                    function (response) {
                        return response.data;
                    },
                    function (error) {
                        console.error('An error occurred while retreiving cost center mapping history data', error.data);
                        return [];
                    }
                );

                promise.abort = function () {
                    costCenterHistoryMappingDeferred.resolve();
                };

                promise.finally(
                    function () {
                        promise.abort = angular.noop;
                        costCenterHistoryMappingDeferred = request = promise = null;
                    }
                );
                return ( promise );
            };

            costCenterMappingService.updateVendorCostCenter = function (costCenterRowData) {
                var url = ADAMS_URL_SPACE.urls.local.updateVendorCostCenter.replace('{vendorNumber}', costCenterRowData.vendor_number).replace('{costCenterName}', costCenterRowData.cost_center_name) + '?vendorSourceSystemId=' + costCenterRowData.vendor_source_system_id + '&costCenterSourceSystemId=' + costCenterRowData.cost_center_source_system_id;

                return $http.put(url, costCenterRowData)
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        console.error('An error occurred while updating vendor cost center association', error.data);
                        return 'error';
                    });
            };

            costCenterMappingService.getEligibleCostCenterData = function (limit, page, sort, eligibleCostCenterSearchInput, vendorNumber, vendorSourceSystemId) {

                var eligibleCostCenterDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.eligibleVendorCostCenter.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&eligibleCostCenterSearchInput=' + JSON.stringify(eligibleCostCenterSearchInput);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: eligibleCostCenterDeferred.promise
                });

                var promise = request.then(
                    function (response) {
                        return response.data;
                    },
                    function (error) {
                        console.error('An error occurred while retreiving eligible cost center data', error.data);
                        return [];
                    }
                );

                promise.abort = function () {
                    eligibleCostCenterDeferred.resolve();
                };

                promise.finally(
                    function () {
                        promise.abort = angular.noop;
                        eligibleCostCenterDeferred = request = promise = null;
                    }
                );
                return ( promise );
            };

            costCenterMappingService.addCostCenterMapping = function (vendorNumber, vendorSourceSystemId, costCenters) {
                var url = ADAMS_URL_SPACE.urls.local.addEligibleCostCenters.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId;

                return $http.post(url, costCenters)
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        console.error('An error occurred while adding eligible Cost Center Mapping', error.data);
                        return 'error';
                    });
            };

            return costCenterMappingService;
        }]);
})();
