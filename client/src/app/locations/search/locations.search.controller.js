'use strict';

(function () {
    angular.module('adams.locations.search.controller', ['ui.grid.pinning', 'common.modules.logging'])
        .controller('LocationsSearchController', ['$scope', '$state', 'LocationsSearchService', 'LocationsDetailsService', 'StgStatesService', '$uibModal', 'Utils', 'CompassToastr', 'ModalDialogService', '$timeout', 'LOCATIONS_STATUS_CONSTANTS', '$log',
        function ($scope, $state, LocationsSearchService, LocationsDetailsService, StgStatesService, $uibModal, Utils, CompassToastr, ModalDialogService, $timeout, LOCATIONS_STATUS_CONSTANTS, $log) {
            var locationsSearchController = this,
                locationsSearchStatusChangePromise,
                searchProperty = "active";

            function initialize() {
                locationsSearchController.gridOptions = defineLocationsSearchGridOptions();
                locationsSearchController.locationStatuses = LOCATIONS_STATUS_CONSTANTS;
                locationsSearchController.locationStatus = locationsSearchController.locationStatuses[1];
                locationsSearchController.statusFilterChanged(locationsSearchController.locationStatus);
            }

            locationsSearchController.statusFilterChanged = function(status){
                if (status.name === 'Active') {
                    locationsSearchController.searchPropertyValue = true;
                }
                else if (status.name === 'Inactive') {
                    locationsSearchController.searchPropertyValue = false;
                }
                else {
                    locationsSearchController.searchPropertyValue = '';
                }
                $scope.$broadcast('uiGridParameterChange');
            };

            locationsSearchController.getGridData = function (pageSize, pageNumber, sort, searchInput) {

                if(locationsSearchController.hasOwnProperty('searchPropertyValue') &&
                    locationsSearchController.searchPropertyValue === '' &&
                    searchInput.search.length === 1 &&
                    searchInput.search[0].property === 'active') {
                    return LocationsSearchService.getAllLocationsSearchDetails(pageSize, pageNumber, {}, sort);
                }
                else {

                    if(!searchInput.search) {
                        searchInput.search = [];
                    }
                    // delete if exist
                    if (Utils.checkIfSearchObjectPresent(searchProperty, searchInput.search)) {
                        var index = searchInput.search.findIndex(Utils.getSearchIndex, searchProperty);
                        searchInput.search.splice(index, 1);
                    }
                    if(locationsSearchController.searchPropertyValue !== ""){
                        searchInput.search.push({
                            "property": searchProperty,
                            "value": locationsSearchController.searchPropertyValue === null ? '' : locationsSearchController.searchPropertyValue,
                            "operator": ""
                        });
                    }

                    if (searchInput.search && searchInput.search.length > 0) {
                        for (var i = 0; i < searchInput.search.length; i++) {
                            if (searchInput.search[i].property === 'status' &&
                                typeof(searchInput.search[i].value) === "string") {
                                searchInput.search[i].value = searchInput.search[i].value === '' ? '' :
                                    searchInput.search[i].value === "true" ? true : false;
                            }
                        }
                    }
                    locationsSearchController.search = searchInput;
                    return LocationsSearchService.getAllLocationsSearchDetails(pageSize, pageNumber, locationsSearchController.search, sort);
                }
            };

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller
                gridApi.grid.appScope.changeLocationsStatus = locationsSearchController.changeLocationsStatus;
                gridApi.grid.appScope.editLocationsSearchData = locationsSearchController.editLocationsSearchData;
                gridApi.grid.appScope.showLocationsHours = locationsSearchController.showLocationsHours;
            });

            locationsSearchController.showLocationsHours = function (locationsRow, event) {
                $uibModal.open({
                    templateUrl: 'locations/search/locations-hours.tpl.html',
                    controller: 'LocationsHoursController as locationsHoursController',
                    windowClass: 'show-location-operating-hours-modal',
                    backdrop: 'static',
                    resolve: {
                        locationsSearchData: locationsRow
                    }
                });
            };

            locationsSearchController.editLocationsSearchData = function (locationsRow, event) {
                StgStatesService.goToState('locationsdetails', {
                    locationsSearchData: locationsRow,
                    locationCode: locationsRow.location_code,
                    action: 'edit'
                });
            };

            locationsSearchController.addLocations = function () {
                StgStatesService.goToState('locationsdetails', {
                    action: 'add'
                });
            };

            locationsSearchController.changeLocationsStatus = function (locationsRow, event) {
                var locationsRowData = locationsRow;
                locationsRowData.active = event.currentTarget.checked;
                $uibModal.open({
                    templateUrl: 'locations/search/locations-status-change.tpl.html',
                    controller: 'LocationsStatusChangeController as locationsStatusChangeController',
                    size: 'sm',
                    backdrop: 'static'
                }).result.then(function (res, err) {
                    if (res === 'true') {
                        locationsRowData.active = !locationsRowData.active;
                    } else {
                        Utils.startBlockUI("locations-grid");
                        updateLocationDetailsByLocationCode(locationsRowData).then(function(){
                            Utils.stopBlockUI("locations-grid");
                        });
                    }
                }, function(error){
                    locationsRowData.active = !locationsRowData.active;
                    locationsSearchController.errorHandling(error);
                });
            };

            locationsSearchController.errorHandling = function (errorMessage) {
                ModalDialogService.confirm({
                    bodyText: errorMessage,
                    title: 'Error Message',
                    okText: 'Ok'
                });
            };

            function updateLocationDetailsByLocationCode(locationsRowData) {
                locationsSearchStatusChangePromise = LocationsDetailsService.updateLocationDetailsByLocationCode(locationsRowData);
                locationsSearchStatusChangePromise.then(
                    function (response) {
                        if (response === 'error') {
                            locationsRowData.status = !locationsRowData.status;
                            CompassToastr.error("A error occurred while updating locations status." + response);
                        }
                        else {
                            CompassToastr.success("Location " + locationsRowData.location_name + " status has been successfully changed.");
                        }
                        // TODO: Do we need a grid refresh here? Refresh the Grid. Callback
                        $scope.$broadcast('uiGridParameterChange');
                    },
                    function (error) {
                        locationsRowData.status = !locationsRowData.status;
                        CompassToastr.error("A error occurred while updating location status." + error);
                        $log.error("An error occurred while updating location status.");
                    });
                return locationsSearchStatusChangePromise;
            }


            /** PRIVATE FUNCTIONS **/
            function defineLocationsSearchGridOptions() {
                return {
                    paginationPageSizes: [25, 50, 75],
                    paginationPageSize: 25, // pagination out of box
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
                            field: 'name',
                            cellTemplate: '<div><i class="fa fa-pencil" ng-click="grid.appScope.editLocationsSearchData(row.entity, $event)"></i></div>',
                            displayName: "Edit",
                            enableFiltering: false,
                            enableSorting: false,
                            enableColumnMenu: false,
                            enableHiding: false,
                            width: 60,
                            cellClass: "view-cell",
                            pinnedLeft:true
                        },
                        {
                            field: 'location_name',
                            displayName: "Location Name",
                            width: 200,
                            filter: {
                                placeholder: ''
                            },
                            pinnedLeft:true
                        },
                        {
                            field: 'location_description',
                            displayName: "Location Description",
                            width: 300,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'address1',
                            displayName: "Address",
                            width: 300,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'address2',
                            displayName: "Address 2",
                            width: 300,
                            filter: {
                                placeholder: ''
                            }

                        },
                        {
                            field: 'city',
                            displayName: "City",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'state',
                            displayName: "State",
                            width: 170,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'zip',
                            displayName: "Zip",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'status',
                            displayName: "Active",
                            cellTemplate: '<label class="switch"><input class="switch-input" ng-checked="row.entity.active" ng-click="grid.appScope.changeLocationsStatus(row.entity, $event)" type="checkbox"/><span class="switch-label" data-on="YES" data-off="NO"></span><span class="switch-handle"></span></label>',
                            cellClass: 'switchClass',
                            enableFiltering: false,
                            minWidth: 100,
                            width: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'location_hours',
                            cellTemplate: '<div><i class="fa fa-clock-o" aria-hidden="true" ng-click="grid.appScope.showLocationsHours(row.entity, $event)" ng-bind="row.getProperty(col.field)"></i></div>',
                            displayName: "Hours",
                            enableFiltering: false,
                            enableSorting: false,
                            enableColumnMenu: false,
                            enableHiding: false,
                            minWidth: 60,
                            width: 60,
                            cellClass: "view-cell",
                            filter: {
                                placeholder: ''
                            }
                        }/*,
                        {
                            field: 'created_by',
                            displayName: "Created By",
                            width: 125,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'created_date',
                            displayName: "Created Date",
                            width: 125,
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                            filter: {
                                placeholder: ''
                            }
                        },/!*
                        {
                            field: 'longitude_latitude',
                            displayName: "Longitude Latitude",
                            width: 225,
                            filter: {
                                placeholder: ''
                            }
                        },*!/
                        {
                            field: 'modified_date',
                            displayName: "Modified Date",
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                            width: 125,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'modified_by',
                            displayName: "Modified By",
                            width: 125,
                            filter: {
                                placeholder: ''
                            }
                        }*/
                    ]
                };
            }

            initialize();
        }
    ]);

})();