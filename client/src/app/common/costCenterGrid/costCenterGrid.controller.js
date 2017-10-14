'use strict';

(function () {

    angular.module('adams.common.cost.center.grid.controller', [])
        .controller('CostCenterGridController', ['$rootScope', '$scope', 'AssociatesSearchService', '$uibModalInstance', 'ADAMS_CONSTANTS', 'timeTrackingSystem', 'ModalDialogService', '$timeout', 'Utils',
            function($rootScope, $scope, AssociatesSearchService, $uibModalInstance, ADAMS_CONSTANTS, timeTrackingSystem, ModalDialogService, $timeout, Utils) {
                var costCenterGridController = this;
                var searchProperty = "source_system_id";

                function initialize() {
                    costCenterGridController.fields = 'cost_center, cost_center_description, source_system_id, sector, division, region, complex';
                    costCenterGridController.gridOptions = defineCostCenterSearchGridOptions();
                    costCenterGridController.mySelectedRows = '';
                   
                    if(timeTrackingSystem === ADAMS_CONSTANTS.TIME_TRACKING_SYSTEM_MYSTAFF){
                        costCenterGridController.searchPropertyValue = ADAMS_CONSTANTS.MYSTAFF_SOURCE_SYSTEM_ID;
                        costCenterGridController.gridOptions.columnDefs[2].visible = false;
                    }

                }

                costCenterGridController.getGridData = function(pageSize, pageNumber, sort, searchInput) {
                    // Special Case: Do not add search if searchPropertyValue does not exist.
                    if(costCenterGridController.searchPropertyValue){
                        if (!searchInput.search) {
                            searchInput.search = [];
                        }
                        // delete if exist
                        if(Utils.checkIfSearchObjectPresent(searchProperty, searchInput.search)){
                            var index = searchInput.search.findIndex(Utils.getSearchIndex, searchProperty);
                            searchInput.search.splice(index,1);
                        }
                        searchInput.search.push({
                            "property": searchProperty,
                            "value": !costCenterGridController.searchPropertyValue ? '' : costCenterGridController.searchPropertyValue,
                            "operator": ""
                        });
                    }

                    costCenterGridController.search = searchInput;
                    return AssociatesSearchService.getCostCenterDetails(pageSize, pageNumber, sort, costCenterGridController.search, costCenterGridController.fields);
                };

                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent, refId) {
                    costCenterGridController.mySelectedRows = mySelectedRows;
                });
                
                costCenterGridController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };

                costCenterGridController.submit = function() {
                    $uibModalInstance.close(costCenterGridController.mySelectedRows);
                };

                /** PRIVATE FUNCTIONS **/

                function defineCostCenterSearchGridOptions() {
                    return {
                        paginationPageSizes: [10, 20, 30],
                        paginationPageSize: 10, // pagination out of box
                        virtualizationThreshold: 10,
                        useExternalPagination: true,
                        useExternalFiltering: true,
                        enableFiltering: true, //step1 to enable all grid columns filtering
                        enableRowSelection: true,
                        enableRowHeaderSelection: false,
                        multiSelect: false,
                        modifierKeysToMultiSelect: false,
                        noUnselect: true,
                        showColumnFooter: false,
                        enableGridMenu: true, //true will display grid menu on top-right
                        enableSorting: true,
                        columnDefs: [
                            {   field: 'cost_center',
                                displayName: "Name",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'cost_center_description',
                                displayName: "Description",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'source_system_id',
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'sector',
                                filter: {
                                    placeholder: ''
                                },
                                visible: false
                            },
                            {   field: 'division',
                                filter: {
                                    placeholder: ''
                                },
                                visible: false
                            },
                            {   field: 'region',
                                filter: {
                                    placeholder: ''
                                },
                                visible: false
                            },
                            {   field: 'complex',
                                filter: {
                                    placeholder: ''
                                },
                                visible: false
                            }
                        ]
                    };
                }

                initialize();
            }
        ]);
})();