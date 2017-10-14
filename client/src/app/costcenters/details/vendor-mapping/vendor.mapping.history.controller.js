(function () {
    angular.module('adams.vendor.mapping.history.controller', [])
        .controller('VendorMappingHistoryController', ['VendorMappingService', '$uibModalInstance', 'vendorRowData',
            function (VendorMappingService, $uibModalInstance, vendorRowData) {
                var vendorMappingHistoryController = this;
                vendorMappingHistoryController.vendorRowData = vendorRowData;

                function initialize() {
                    vendorMappingHistoryController.gridOptions = defineVendorHistoryGridOptions();
                }

                vendorMappingHistoryController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                    return VendorMappingService.getVendorMappingHistoryData(pageSize, pageNumber,
                        sort, searchInput, vendorRowData);
                };

                vendorMappingHistoryController.close = function () {
                    $uibModalInstance.dismiss('close');
                };

                function defineVendorHistoryGridOptions() {
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
                                field: 'disassociated_reason',
                                displayName: "Disassociated Reason",
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