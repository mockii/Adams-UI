(function () {
    'use strict';
    angular.module('adams.locations.stations.service', [])
        .factory('LocationsStationsMappingService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', function ($rootScope, $http, ADAMS_URL_SPACE, $q) {
            var locationsStationsMappingService = {};
            locationsStationsMappingService.getStationsDataByLocationCode = function (limit, page, sort, locationCode, stationsSearchInput) {
                var locationsStationsDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.getStationsByLocationCode.replace('{locationCode}', locationCode) + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&stationsSearchInput=' + JSON.stringify(stationsSearchInput);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: locationsStationsDeferred.promise
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
                    locationsStationsDeferred.resolve();
                };

                promise.finally(
                    function () {
                        promise.abort = angular.noop;
                        locationsStationsDeferred = request = promise = null;
                    }
                );
                return ( promise );
            };

            locationsStationsMappingService.getStations = function (limit, page, sort, stationsSearchInput) {
                var locationsStationsDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.getStations+ '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&stationsSearchInput=' + JSON.stringify(stationsSearchInput);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: locationsStationsDeferred.promise
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
                    locationsStationsDeferred.resolve();
                };

                promise.finally(
                    function () {
                        promise.abort = angular.noop;
                        locationsStationsDeferred = request = promise = null;
                    }
                );
                return ( promise );
            };

            locationsStationsMappingService.addStationsByLocationCode = function (locationCode, data) {
                var url = ADAMS_URL_SPACE.urls.local.addStationsByLocationCode.replace('{locationCode}', locationCode);

                return $http.post(url, data)
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        console.error('An error occurred while adding Stations', error.data);
                        return 'error';
                    });
            };

            /*locationsStationsMappingService.getStationDetailsByLocationAndStationCode = function (locationCode, stationCode) {

                var stationDetailsDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.stationsByLocationAndStationCode.replace('{locationCode}', locationCode).replace('{stationCode}', stationCode);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: stationDetailsDeferred.promise
                });

                var promise = request.then(
                    function (response) {
                        return response.data;
                    },
                    function (error) {
                        console.error('An error occurred while retrieving station details by location code and station code', error.data);
                        return [];
                    }
                );

                promise.abort = function () {
                    stationDetailsDeferred.resolve();
                };

                promise.finally(
                    function () {
                        promise.abort = angular.noop;
                        stationDetailsDeferred = request = promise = null;
                    }
                );
                return ( promise );
            };*/

            locationsStationsMappingService.updateStationDetailsByLocationAndStationCode = function (locationCode, stationCode, station) {
                var url = ADAMS_URL_SPACE.urls.local.stationsByLocationAndStationCode.replace('{locationCode}', locationCode).replace('{stationCode}', stationCode)+'?cost_center_name=' + station.cost_center_name + '&source_system_id=' + station.source_system_id;

                var data = {};
                data.location_cost_center_station_map_status = station.location_cost_center_station_map_status;
                return $http.put(url, data)
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        console.error('An error occurred while updating station by location code and station code', error.data);
                        return 'error';
                    });
            };

            /*locationsStationsMappingService.getCostCentersByLocationAndStationCode = function (limit, page, sort, search, locationCode, stationCode) {

                var costCenterStationDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.stationsByLocationAndStationName.replace('{locationCode}', locationCode) + '?limit=' + limit + '&page=' + page + '&sorts=' + sort + '&search=' + JSON.stringify(search);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: costCenterStationDeferred.promise
                });

                var promise = request.then(
                    function (response) {
                        return response.data;
                    },
                    function (error) {
                        console.error('An error occurred while retrieving cost centers by location code and station code', error.data);
                        return [];
                    }
                );

                promise.abort = function () {
                    costCenterStationDeferred.resolve();
                };

                promise.finally(
                    function () {
                        promise.abort = angular.noop;
                        costCenterStationDeferred = request = promise = null;
                    }
                );
                return ( promise );
            };*/

            /*locationsStationsMappingService.addCostCentersByLocationAndStationCode = function (locationCode, stationCode, costCenters) {
                var url = ADAMS_URL_SPACE.urls.local.addCostCentersByLocationAndStationCode.replace('{locationCode}', locationCode).replace('{stationCode}', stationCode);

                return $http.post(url, costCenters)
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        console.error('An error occurred while adding Cost Centers by location code and station code', error.data);
                        return 'error';
                    });
            };*/

            /*locationsStationsMappingService.updateStationsCostCenter = function (locationCode, stationCode, costCenterName, sourceSystemId, stationCostCenterData) {
                var url = ADAMS_URL_SPACE.urls.local.updateStationsCostCenter.replace('{locationCode}', locationCode).replace('{stationCode}', stationCode).replace('{costCenterName}', costCenterName) + '?sourceSystemId=' + sourceSystemId;

                return $http.put(url, stationCostCenterData)
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        console.error('An error occurred while updating stations cost center map data by location code, station code and cost center name', error.data);
                        return 'error';
                    });
            };*/

            return locationsStationsMappingService;
        }]);
})();
