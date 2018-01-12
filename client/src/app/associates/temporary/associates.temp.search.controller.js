'use strict';

(function () {
    angular.module('adams.associates.temp.search.controller', ['adams.associates.temp.search.service'])
        .controller('AssociatesSearchController',['$rootScope', '$scope', '$state', 'StgStatesService', 'ADAMS_CONSTANTS', '$timeout', 'AssociatesSearchService', 'ModalDialogService', 'timeTrackingSystem', 'Utils',
        function($rootScope, $scope, $state, StgStatesService, ADAMS_CONSTANTS, $timeout, AssociatesSearchService, ModalDialogService, timeTrackingSystem, Utils){
            var associatesSearchController = this;
            var searchProperty = "active_engagement";

            function initialize() {
                associatesSearchController.resources = ADAMS_CONSTANTS.TEMP_ASSOCIATE_RESOURCES;
                associatesSearchController.resource = associatesSearchController.resources[0];
                associatesSearchController.gridOptions = defineAssociateSearchGridOptions();
            }

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                gridApi.grid.appScope.showAssociateSearchData = associatesSearchController.showAssociateSearchData;
            });

            associatesSearchController.showAssociateSearchData = function(associateSearchData){
                StgStatesService.goToState('addTempAssociates', {
                    associateSearchData: associateSearchData,
                    personnel_number: associateSearchData.personnel_number,
                    time_tracking_system: timeTrackingSystem
                });
            };

            associatesSearchController.getGridData = function(pageSize, pageNumber, sort, searchInput) {
                if(associatesSearchController.hasOwnProperty('searchPropertyValue')){
                    if (!searchInput.search) {
                        searchInput.search = [];
                    }
                    // delete if exist
                    if(Utils.checkIfSearchObjectPresent(searchProperty, searchInput.search)){
                        var index = Utils.getSearchObjectIndex(searchProperty, searchInput.search);
                        searchInput.search.splice(index,1);
                    }
                    searchInput.search.push({
                        "property": searchProperty,
                        "value": associatesSearchController.searchPropertyValue === null ? '' : associatesSearchController.searchPropertyValue,
                        "operator": ""
                    });
                }
                associatesSearchController.search = searchInput;
                return AssociatesSearchService.getTempAssociates(pageSize, pageNumber, sort, associatesSearchController.search);
            };

            associatesSearchController.go = function(path) {
                StgStatesService.goToState(path,{ time_tracking_system: timeTrackingSystem });
            };

            associatesSearchController.resourceSelected = function(resources) {
                if (resources === 'Engaged Resources') {
                    associatesSearchController.searchPropertyValue = true;
                }
                else if (resources === 'Available Resources') {
                    associatesSearchController.searchPropertyValue = false;
                }
                else {
                    associatesSearchController.searchPropertyValue = '';
                }

                $scope.$broadcast('uiGridParameterChange');
            };

            /** PRIVATE FUNCTIONS **/
            function defineAssociateSearchGridOptions() {
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
                    // treeRowHeaderAlwaysVisible: true,
                    enableGridMenu: true, //true will display grid menu on top-right
                    enableSorting: true,
                    columnDefs: [
                        {
                            field: 'name',
                            cellTemplate: '<div><i class="fa fa-pencil" ng-click="grid.appScope.showAssociateSearchData(row.entity)"></i></div>',
                            displayName: "Action",
                            enableFiltering: false,
                            enableSorting: false,
                            enableColumnMenu: false,
                            width: 60,
                            cellClass: "view-cell"
                        },
                        {   field: 'personnel_number',
                            displayName: "Personnel Number",
                            minWidth: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'first_name',
                            displayName: "First Name",
                            minWidth: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'last_name',
                            displayName: "Last Name",
                            minWidth: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'email',
                            displayName: "Email Address",
                            minWidth: 150,
                            filter: {
                                placeholder: ''
                            }

                        },
                        {   field: 'phone_number',
                            displayName: "Phone Number",
                            minWidth: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'cost_center_name',
                            displayName: "Cost Center",
                            minWidth: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'cost_center_description',
                            displayName: "Cost Center Description",
                            minWidth: 175,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'job_name',
                            displayName: "Job",
                            minWidth: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'vendor_name_1',
                            displayName: "Agency",
                            minWidth: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'base_rate',
                            displayName: "Bill Rate",
                            minWidth: 100,
                            cellFilter: 'currency',
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'start_date',
                            displayName: "Start Date",
                            minWidth: 100,
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy\'',
                            enableFiltering: false
                            // filter: {
                            //     placeholder: ''
                            // }
                        },
                        {   field: 'end_date',
                            displayName: "End Date",
                            minWidth: 100,
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy\'',
                            enableFiltering: false
                            // filter: {
                            //     placeholder: ''
                            // }
                        }
                    ]
                };
            }
            initialize();
        }
    ]);

})();