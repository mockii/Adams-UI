(function () {
    angular.module('adams.cost.center.mapping.history.controller', [])
        .controller('CostCenterMappingHistoryController', ['$scope', 'CostCenterMappingService', '$uibModalInstance', 'costCenterRowData',
            function ($scope, CostCenterMappingService, $uibModalInstance, costCenterRowData) {
                var costCenterMappingHistoryController = this;
                costCenterMappingHistoryController.costCenterRowData = costCenterRowData;

                function initialize() {
                    costCenterMappingHistoryController.gridOptions = defineCostCenterHistoryGridOptions();
                }
                costCenterMappingHistoryController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                    return CostCenterMappingService.getCostCenterMappingHistoryData(pageSize, pageNumber,
                        sort, searchInput, costCenterRowData);
                };

                costCenterMappingHistoryController.close = function () {
                    $uibModalInstance.dismiss('close');
                };

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                    // emitted gridOptions and gridApi from Directive controller
                });

                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                    // emitted selected rows and row selected event from Directive controller
                });

                function defineCostCenterHistoryGridOptions() {
                    return {
                        paginationPageSizes: [25, 50, 75],
                        paginationPageSize: 25,
                        enableFiltering: true,
                        useExternalFiltering: true,
                        useExternalPagination: true,
                        enableRowSelection: true,
                        enableRowHeaderSelection: false,
                        multiSelect: false,
                        modifierKeysToMultiSelect: false,
                        noUnselect: true,
                        showColumnFooter: false,
                        showSelectionCheckbox: false,
                        treeRowHeaderAlwaysVisible: false,
                        enableGridMenu: true,
                        enableSorting: false,
                        enableHorizontalScrollbar: 1,
                        columnDefs: [
                            {
                                field: 'action_date',
                                displayName: "Date and Time",
                                enableColumnMenu: false,
                                enableCellEdit: false,
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                                width: '25%',
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'user_name',
                                displayName: "Who",
                                enableColumnMenu: false,
                                enableCellEdit: false,
                                width: '25%',
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'action',
                                displayName: "Action",
                                enableColumnMenu: false,
                                width: '25%',
                                filter: {
                                    placeholder: ''
                                }

                            },
                            {
                                field: 'message',
                                displayName: "Message",
                                enableColumnMenu: false,
                                width: '25%',
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