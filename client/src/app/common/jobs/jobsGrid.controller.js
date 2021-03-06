'use strict';

(function () {

    angular.module('adams.common.jobs.grid.controller', [])
        .controller('JobsGridController', ['$rootScope', '$scope', 'AssociatesSearchService', '$uibModalInstance', 'ADAMS_CONSTANTS', 'timeTrackingSystem', 'ModalDialogService', '$timeout', 'Utils',
            function($rootScope, $scope, AssociatesSearchService, $uibModalInstance, ADAMS_CONSTANTS, timeTrackingSystem, ModalDialogService, $timeout, Utils) {
                var jobsGridController = this;
                var searchProperty = "source_system_id";

                function initialize() {
                    jobsGridController.sourceSystemId = '';
                    jobsGridController.fields = '';
                    jobsGridController.mySelectedRows = '';

                    jobsGridController.gridOptions = defineJobSearchGridOptions();

                    if(timeTrackingSystem === ADAMS_CONSTANTS.TIME_TRACKING_SYSTEM_MYSTAFF){
                        jobsGridController.searchPropertyValue = ADAMS_CONSTANTS.MYSTAFF_SOURCE_SYSTEM_ID;
                        jobsGridController.gridOptions.columnDefs[3].visible = false;
                    }
                }

                jobsGridController.getGridData = function(pageSize, pageNumber, sort, searchInput) {
                    // Special Case: Do not add search if searchPropertyValue does not exist.
                    if(jobsGridController.searchPropertyValue){
                        if (!searchInput.search) {
                            searchInput.search = [];
                        }
                        if(Utils.checkIfSearchObjectPresent(searchProperty, searchInput.search)){
                            var index = Utils.getSearchObjectIndex(searchProperty, searchInput.search);
                            searchInput.search.splice(index,1);
                        }
                        searchInput.search.push({
                            "property": searchProperty,
                            "value": jobsGridController.searchPropertyValue,
                            "operator": ""
                        });
                    }
                    jobsGridController.search = searchInput;
                    return AssociatesSearchService.getAllJobs(jobsGridController.sourceSystemId, jobsGridController.fields, pageSize, pageNumber, sort, jobsGridController.search);
                };

                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent, refId) {
                    jobsGridController.mySelectedRows = mySelectedRows;
                });

                jobsGridController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };

                jobsGridController.submit = function() {
                    $uibModalInstance.close(jobsGridController.mySelectedRows);
                };

                /** PRIVATE FUNCTIONS **/

                function defineJobSearchGridOptions() {
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
                            {   field: 'job_name',
                                displayName: "Job Name",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'job_description',
                                displayName: "Job Desc",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'salaried_indicator',
                                displayName: "Salaried Indicator",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'source_system_id',
                                displayName: "Source System Id",
                                filter: {
                                    placeholder: ''
                                }
                            }
                        ]
                    };
                }

                initialize();
            }
        ]);
})();