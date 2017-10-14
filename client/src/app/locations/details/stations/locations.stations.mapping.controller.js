(function () {
    angular.module('adams.locations.stations.controller', ['ui.grid.pinning', 'common.modules.logging'])
        .controller('LocationsStationsMappingController', ['$scope', '$state', '$location', 'LocationsStationsMappingService', 'CompassToastr', '$uibModal', 'Utils', 'LOCATIONS_STATUS_CONSTANTS','$q', '$log',
            function ($scope, $state, $location, LocationsStationsMappingService, CompassToastr, $uibModal, Utils, LOCATIONS_STATUS_CONSTANTS, $q, $log) {
                var locationsStationsMappingController = this,
                    locationStationUpdatePromise,
                    searchProperty = "location_cost_center_station_map_status";

                locationsStationsMappingController.locationCode = $scope.locationCode;
                locationsStationsMappingController.hasLocationCode = locationsStationsMappingController.locationCode ? true : false;

                function initialize() {
                    locationsStationsMappingController.gridOptions = defineStationsGridOptions();
                    locationsStationsMappingController.locationStationsStatuses = LOCATIONS_STATUS_CONSTANTS;
                    locationsStationsMappingController.locationStationStatus = locationsStationsMappingController.locationStationsStatuses[1];
                    locationsStationsMappingController.statusFilterChanged(locationsStationsMappingController.locationStationStatus);
                }

                locationsStationsMappingController.statusFilterChanged = function(status){
                    if (status.name === 'Active') {
                        locationsStationsMappingController.searchPropertyValue = true;
                    }
                    else if (status.name === 'Inactive') {
                        locationsStationsMappingController.searchPropertyValue = false;
                    }
                    else {
                        locationsStationsMappingController.searchPropertyValue = '';
                    }
                    $scope.$broadcast('uiGridParameterChange');
                };

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                    // emitted gridOptions and gridApi from Directive controller
                    locationsStationsMappingController.stationsGridData = gridOptions.data;
                    gridApi.grid.appScope.changeStationsAssociation = locationsStationsMappingController.changeStationsAssociation;
                    gridApi.grid.appScope.navigateToCostCenterDetail = locationsStationsMappingController.navigateToCostCenterDetail;
                });

                locationsStationsMappingController.changeStationsAssociation = function (stationRow, event) {
                    var stationRowData = stationRow.entity;
                    stationRowData.location_cost_center_station_map_status = event.currentTarget.checked;
                    $uibModal.open({
                        templateUrl: 'locations/details/stations/locations-stations-status-change.tpl.html',
                        controller: 'LocationsStationsStatusChangeController as locationsStationsStatusChangeController',
                        size: 'sm',
                        backdrop: 'static'
                    }).result.then(function (res, err) {
                        if (res === 'true') {
                            stationRowData.location_cost_center_station_map_status = !stationRowData.location_cost_center_station_map_status;
                        } else {
                            Utils.startBlockUI("stations-mapping-grid");
                            updateLocationsStation(stationRowData).then(function(){
                                Utils.stopBlockUI("stations-mapping-grid");
                            });
                        }
                    }, function(error){
                        stationRowData.location_cost_center_station_map_status = !stationRowData.location_cost_center_station_map_status;
                    });
                };

                locationsStationsMappingController.navigateToCostCenterDetail = function(row) {
                    $state.go('costcenterdetails', {
                        costCenter_number: row.entity.cost_center_name,
                        source_system_id: row.entity.source_system_id
                    });
                };

                function updateLocationsStation(stationRowData) {
                    locationStationUpdatePromise = LocationsStationsMappingService
                        .updateStationDetailsByLocationAndStationCode(locationsStationsMappingController.locationCode, stationRowData.station_code, stationRowData);
                    locationStationUpdatePromise.then(
                        function (response) {
                            if (response === 'error') {
                                stationRowData.location_cost_center_station_map_status = !stationRowData.location_cost_center_station_map_status;
                                CompassToastr.error("A error occurred while updating locations station association." + response);
                            }
                            else {
                                var association = stationRowData.location_cost_center_station_map_status ? 'associated' : 'disassociated';
                                CompassToastr.success("Status  for Station " + stationRowData.station_name + " has been successfully " + association);
                            }
                            // Refresh the Grid. Callback
                            $scope.$broadcast('uiGridParameterChange');
                        },
                        function (error) {
                            stationRowData.location_cost_center_station_map_status = !stationRowData.location_cost_center_station_map_status;
                            CompassToastr.error("A error occurred while updating locations station status." + error);
                            $log.error("An error occurred while updating locations station status");
                        });
                    return locationStationUpdatePromise;
                }

                locationsStationsMappingController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                    if(!locationsStationsMappingController.hasLocationCode) {
                        var emptyPromise = $q.defer(),
                            emptyResponseData = {
                                "metadata": {
                                    "version": "1.0",
                                    "status": "error!",
                                    "http_status_code": "404",
                                    "resultCount": "0"
                                },
                                "data": [],
                                "error": {
                                    "userErrorMessage": {
                                        "httpStatus": "404",
                                        "userMessage": "Request resource not found"
                                    },
                                    "systemErrorMessage": {
                                        "message": null,
                                        "errorCode": "Adams API"
                                    }
                                }
                            };

                        emptyPromise.resolve(emptyResponseData);
                        return emptyPromise.promise;
                    }
                    if(locationsStationsMappingController.hasOwnProperty('searchPropertyValue') &&
                        locationsStationsMappingController.searchPropertyValue === '' &&
                        searchInput.search.length === 1 &&
                        searchInput.search[0].property === 'location_cost_center_station_map_status') {
                        return LocationsStationsMappingService.getStationsDataByLocationCode(pageSize, pageNumber, sort, locationsStationsMappingController.locationCode, {});
                    }
                    else {
                        if (!searchInput.search) {
                            searchInput.search = [];
                        }
                        // delete if exist
                        if(Utils.checkIfSearchObjectPresent(searchProperty, searchInput.search)){
                            var index = searchInput.search.findIndex(Utils.getSearchIndex, searchProperty);
                            searchInput.search.splice(index,1);
                        }
                        if(locationsStationsMappingController.searchPropertyValue !== ""){
                            searchInput.search.push({
                                "property": searchProperty,
                                "value": locationsStationsMappingController.searchPropertyValue === null ? '' : locationsStationsMappingController.searchPropertyValue,
                                "operator": ""
                            });
                        }


                        if(searchInput.search && searchInput.search.length > 0){
                            for (var i = 0; i < searchInput.search.length; i++){
                                if(searchInput.search[i].property === 'location_cost_center_station_map_status' &&
                                    typeof(searchInput.search[i].value) === "string"){
                                    searchInput.search[i].value = searchInput.search[i].value === '' ? '' :
                                        searchInput.search[i].value === "true" ? true : false;
                                }
                            }
                        }
                        locationsStationsMappingController.search = searchInput;
                        return LocationsStationsMappingService.getStationsDataByLocationCode(pageSize, pageNumber, sort, locationsStationsMappingController.locationCode, locationsStationsMappingController.search);
                    }
                };

                locationsStationsMappingController.openAddOrEditStationMapping = function (stationRowData) {
                    var action = stationRowData === undefined ? 'add' : 'edit';
                    var addOrEditStationMappingModal = $uibModal.open({
                        templateUrl: 'locations/details/stations/add-or-edit-stations-mapping.tpl.html',
                        controller: 'AddOrEditStationsMappingController as addOrEditStationsMappingController',
                        size: 'lg',
                        backdrop: 'static',
                        resolve: {
                            stationsData: {
                                'locationCode': locationsStationsMappingController.locationCode,
                                'action': action,
                                'stationRowData': stationRowData,
                                'stationsGridData': locationsStationsMappingController.stationsGridData
                            }
                        }
                    });
                    addOrEditStationMappingModal.result.then(function (res, err) {
                        // Refresh the Grid. Callback
                        $scope.$broadcast('uiGridParameterChange');
                    });
                };

                function defineStationsGridOptions() {
                    return {
                        paginationPageSizes: [25, 50, 75],
                        paginationPageSize: 25,
                        virtualizationThreshold: 25,
                        useExternalPagination: true,
                        useExternalFiltering: true,
                        enableFiltering: true, //step1 to enable all grid columns filtering
                        enableRowSelection: true,
                        enableRowHeaderSelection: false,
                        multiSelect: false,
                        modifierKeysToMultiSelect: false,
                        noUnselect: true,
                        showColumnFooter: false,
                        treeRowHeaderAlwaysVisible: false,
                        enableGridMenu: true, //true will display grid menu on top-right
                        enableSorting: true,
                        columnDefs: [
                            {
                                field: 'action',
                                cellTemplate: '<i class="fa fa-pencil" aria-hidden="true" ng-click="grid.appScope.openAddOrEditStationMapping(row.entity)" ng-bind="row.getProperty(col.field)"></i>',
                                displayName: "Edit",
                                enableFiltering: false,
                                enableSorting: false,
                                enableColumnMenu: false,
                                width: 50,
                                cellClass: "view-cell"
                            },
                            {
                                field: 'station_name',
                                displayName: "Name",
                                width: 200,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'cost_center_name',
                                displayName: "Cost Center Name",
                                width: 200,
                                filter: {
                                    placeholder: ''
                                },
                                cellClass: 'hyperlink-cell',
                                cellTemplate:'<a ng-click="grid.appScope.navigateToCostCenterDetail(row, $event)">{{row.entity.cost_center_name}}</a>'
                            },
                            {
                                field: 'cost_center_description',
                                displayName: "Description",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'location_cost_center_station_map_status',
                                displayName: "Active",
                                cellTemplate: '<label class="switch"><input class="switch-input" ng-checked="row.entity.location_cost_center_station_map_status" ng-click="grid.appScope.changeStationsAssociation(row, $event)" type="checkbox"/><span class="switch-label" data-on="YES" data-off="NO"></span><span class="switch-handle"></span></label>',
                                cellClass: 'switchClass',
                                enableFiltering: false,
                                width: 100,
                                filter: {
                                    placeholder: ''
                                }
                            }]
                    };
                }

                initialize();
            }]);
})();