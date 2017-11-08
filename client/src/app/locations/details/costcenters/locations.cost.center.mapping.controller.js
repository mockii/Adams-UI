(function () {
    angular.module('adams.locations.costcenters.controller', ['ui.grid.pinning', 'common.modules.logging'])
        .controller('LocationsCostCenterMappingController', ['$scope', '$state', '$location', 'LocationsCostCenterMappingService', 'CompassToastr', '$uibModal', 'Utils', 'STATUS_CONSTANT', '$q','$log',
            function ($scope, $state, $location, LocationsCostCenterMappingService, CompassToastr, $uibModal, Utils, STATUS_CONSTANT, $q, $log) {
                var locationsCostCenterMappingController = this,
                    locationCostCenterUpdatePromise,
                    searchProperty = "location_cost_center_map_status";

                locationsCostCenterMappingController.locationCode = $scope.locationCode;
                locationsCostCenterMappingController.hasLocationCode = locationsCostCenterMappingController.locationCode ? true : false;

                function initialize() {
                    locationsCostCenterMappingController.gridOptions = defineCostCenterGridOptions();
                    locationsCostCenterMappingController.locationCostCenterStatuses = STATUS_CONSTANT;
                    locationsCostCenterMappingController.locationCostCenterStatus = locationsCostCenterMappingController.locationCostCenterStatuses[1];
                    locationsCostCenterMappingController.statusFilterChanged(locationsCostCenterMappingController.locationCostCenterStatus);
                }

                locationsCostCenterMappingController.statusFilterChanged = function(status){
                    if (status.name === 'Active') {
                        locationsCostCenterMappingController.searchPropertyValue = true;
                    }
                    else if (status.name === 'Inactive') {
                        locationsCostCenterMappingController.searchPropertyValue = false;
                    }
                    else if(status.name === 'All') {
                        locationsCostCenterMappingController.searchPropertyValue = '';
                    }
                    else {
                        // Do nothing
                    }

                    $scope.$broadcast('uiGridParameterChange');
                };

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                    // emitted gridOptions and gridApi from Directive controller
                    gridApi.grid.appScope.changeCostCenterAssociation = locationsCostCenterMappingController.changeCostCenterAssociation;
                    gridApi.grid.appScope.navigateToCostCenterDetail = locationsCostCenterMappingController.navigateToCostCenterDetail;
                });

                locationsCostCenterMappingController.changeCostCenterAssociation = function (costCenterRow, event) {
                    var costCenterRowData = costCenterRow.entity;
                    costCenterRowData.location_cost_center_map_status = event.currentTarget.checked;
                    $uibModal.open({
                        templateUrl: 'locations/details/costcenters/locations-costcenters-status-change.tpl.html',
                        controller: 'LocationsCostCentersStatusChangeController as locationsCostCentersStatusChangeController',
                        size: 'sm',
                        backdrop: 'static'
                    }).result.then(function (res, err) {
                        if (res === 'true') {
                            costCenterRowData.location_cost_center_map_status = !costCenterRowData.location_cost_center_map_status;
                        } else {
                            Utils.startBlockUI("cost-center-mapping-grid");
                            updateLocationsCostCenter(costCenterRowData).then(function(){
                                Utils.stopBlockUI("cost-center-mapping-grid");
                            });
                        }
                    }, function(error){
                        costCenterRowData.location_cost_center_map_status = !costCenterRowData.location_cost_center_map_status;
                    });
                };

                locationsCostCenterMappingController.navigateToCostCenterDetail = function(row) {
                    $state.go('costcenterdetails', {
                        costCenter_number: row.entity.cost_center_name,
                        costCenter_source_system_id: row.entity.source_system_id
                    });
                };

                function updateLocationsCostCenter(costCenterRowData) {
                    locationCostCenterUpdatePromise = LocationsCostCenterMappingService.updateCostCentersByLocationAndCostCenterName(costCenterRowData);
                    locationCostCenterUpdatePromise.then(
                        function (response) {
                            if (response === 'error') {
                                costCenterRowData.location_cost_center_map_status = !costCenterRowData.location_cost_center_map_status;
                                CompassToastr.error("A error occurred while updating locations cost center association." + response);
                            }
                            else {
                                var association = costCenterRowData.location_cost_center_map_status ? 'associated' : 'disassociated';
                                CompassToastr.success("Cost center " + costCenterRowData.cost_center_name + " for location " + costCenterRowData.location_name + " has been successfully " + association);
                            }
                            // Refresh the Grid. Callback
                            $scope.$broadcast('uiGridParameterChange');
                        },
                        function (error) {
                            costCenterRowData.location_cost_center_map_status = !costCenterRowData.location_cost_center_map_status;
                            CompassToastr.error("A error occurred while updating locations cost center association." + error);
                            $log.error("An error occurred while updating locations cost center association");
                        });
                    return locationCostCenterUpdatePromise;
                }

                locationsCostCenterMappingController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                    if(!locationsCostCenterMappingController.hasLocationCode){
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
                    if(locationsCostCenterMappingController.hasOwnProperty('searchPropertyValue') &&
                        locationsCostCenterMappingController.searchPropertyValue === '' &&
                        searchInput.search.length === 1 &&
                        searchInput.search[0].property === 'location_cost_center_map_status'){
                        return LocationsCostCenterMappingService.getCostCentersByLocationCode(pageSize, pageNumber, sort, locationsCostCenterMappingController.locationCode, {});
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
                        if(locationsCostCenterMappingController.searchPropertyValue !== ""){
                            searchInput.search.push({
                                "property": searchProperty,
                                "value": locationsCostCenterMappingController.searchPropertyValue === null ? '' : locationsCostCenterMappingController.searchPropertyValue,
                                "operator": ""
                            });
                        }

                        if(searchInput.search && searchInput.search.length > 0){
                            for (var i = 0; i < searchInput.search.length; i++){
                                if(searchInput.search[i].property === 'location_cost_center_map_status' &&
                                    typeof(searchInput.search[i].value) === "string"){
                                    searchInput.search[i].value = searchInput.search[i].value === '' ? '' :
                                        searchInput.search[i].value === "true" ? true : false;
                                }
                            }
                        }
                        locationsCostCenterMappingController.search = searchInput;
                        return LocationsCostCenterMappingService.getCostCentersByLocationCode(pageSize, pageNumber, sort, locationsCostCenterMappingController.locationCode, locationsCostCenterMappingController.search);
                    }
                };

                locationsCostCenterMappingController.openAddCostCenterMapping = function () {
                    var addCostCenterMappingModal = $uibModal.open({
                        templateUrl: 'locations/details/costcenters/locations-add-cost-center-mapping.tpl.html',
                        controller: 'LocationsAddCostCenterMappingController as locationsAddCostCenterMappingController',
                        size: 'lg',
                        backdrop: 'static',
                        resolve: {
                            addEligibleCostCenterData: {
                                'locationCode': locationsCostCenterMappingController.locationCode
                            }
                        }
                    });
                    addCostCenterMappingModal.result.then(function (res, err) {
                        // Refresh the Grid. Callback
                        $scope.$broadcast('uiGridParameterChange');
                    });
                };

                function defineCostCenterGridOptions() {
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
                                field: 'cost_center_name',
                                displayName: "Name",
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
                                field: 'location_cost_center_map_status',
                                displayName: "Active",
                                cellTemplate: '<label class="switch"><input class="switch-input" ng-checked="row.entity.location_cost_center_map_status" ng-click="grid.appScope.changeCostCenterAssociation(row, $event)" type="checkbox"/><span class="switch-label" data-on="YES" data-off="NO"></span><span class="switch-handle"></span></label>',
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
