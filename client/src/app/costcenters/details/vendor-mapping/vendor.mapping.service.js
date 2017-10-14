(function () {
    'use strict';
    angular.module('adams.vendor.mapping.service', [])
        .factory('VendorMappingService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', function ($rootScope, $http, ADAMS_URL_SPACE, $q) {
            var vendorMappingService = {};
            vendorMappingService.getVendorMappingData = function (limit, page, sort, sourceSystemId, costCenterNumber, vendorSearchInput) {
                var vendorMappingDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.costCenterVendors.replace('{costCenterNumber}', costCenterNumber) + '?sourceSystemId=' + sourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterNumber=' + costCenterNumber + '&vendorSearchInput=' + JSON.stringify(vendorSearchInput);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: vendorMappingDeferred.promise
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
                    vendorMappingDeferred.resolve();
                };

                promise.finally(
                    function () {
                        promise.abort = angular.noop;
                        vendorMappingDeferred = request = promise = null;
                    }
                );
                return ( promise );

            };
            vendorMappingService.getVendorMappingHistoryData = function (limit, page, sort, vendorMappingHistorySearchInput, vendorRowData) {

                var vendorHistoryMappingDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.costCenterVendorHistory.replace('{vendorNumber}', vendorRowData.vendor_number).replace('{costCenterNumber}', vendorRowData.cost_center_name) + '?vendorSourceSystemId=' + vendorRowData.vendor_source_system_id + '&costCenterSourceSystemId=' + vendorRowData.cost_center_source_system_id + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&vendorMappingHistorySearchInput=' + JSON.stringify(vendorMappingHistorySearchInput);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: vendorHistoryMappingDeferred.promise,
                    body: vendorRowData
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
                    vendorHistoryMappingDeferred.resolve();
                };

                promise.finally(
                    function () {
                        promise.abort = angular.noop;
                        vendorHistoryMappingDeferred = request = promise = null;
                    }
                );
                return ( promise );
            };

            vendorMappingService.updateCostCenterVendor = function (vendorRowData) {
                var url = ADAMS_URL_SPACE.urls.local.updateCostCenterVendor.replace('{vendorNumber}', vendorRowData.vendor_number).replace('{costCenterNumber}', vendorRowData.cost_center_name) + '?cost_center_vendor=' + vendorRowData.cost_center_name + '&vendor_number=' + vendorRowData.vendor_number + '&cost_center_name=' + vendorRowData.cost_center_name + '&vendorSourceSystemId=' + vendorRowData.vendor_source_system_id + '&costCenterSourceSystemId=' + vendorRowData.cost_center_source_system_id;

                return $http.put(url, vendorRowData)
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        console.error('An error occurred while updating vendor cost center association', error.data);
                        return 'error';
                    });
            };

            vendorMappingService.getEligibleVendorData = function (limit, page, sort, eligibleVendorSearchInput, costCenterNumber, costCenterSourceSystemId) {

                var eligibleVendorDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.eligibleCostCenterVendor.replace('{costCenterNumber}', costCenterNumber) + '?costCenterSourceSystemId=' + costCenterSourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&eligibleVendorSearchInput=' + JSON.stringify(eligibleVendorSearchInput);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: eligibleVendorDeferred.promise
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
                    eligibleVendorDeferred.resolve();
                };

                promise.finally(
                    function () {
                        promise.abort = angular.noop;
                        eligibleVendorDeferred = request = promise = null;
                    }
                );
                return ( promise );
            };

            vendorMappingService.addVendorMapping = function (costCenterNumber, costCenterSourceSystemId, vendors) {
                var url = ADAMS_URL_SPACE.urls.local.addEligibleVendors.replace('{costCenterNumber}', costCenterNumber) + '?costCenterSourceSystemId=' + costCenterSourceSystemId;

                return $http.post(url, vendors)
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        console.error('An error occurred while adding eligible Cost Center Mapping', error.data);
                        return 'error';
                    });
            };

            return vendorMappingService;
        }]);
})();
