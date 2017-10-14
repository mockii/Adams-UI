'use strict';

(function () {
    angular.module('adams.vendor.search.controller', ['ui.grid.pinning'])
        .controller('VendorSearchController', ['$scope', '$state', 'StgStatesService', 'VendorSearchService',
        function ($scope, $state, StgStatesService, VendorSearchService) {
            var vendorSearchController = this;

            function initialize() {
                vendorSearchController.gridOptions = defineVendorSearchGridOptions();
            }

            vendorSearchController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                return VendorSearchService.getAllVendorSearchDetails(pageSize, pageNumber,
                    searchInput, sort, vendorSearchController.source_system_id);
            };

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller
                gridApi.grid.appScope.showVendorSearchData = vendorSearchController.showVendorSearchData;
            });

            vendorSearchController.showVendorSearchData = function (vendorSearchData) {
                StgStatesService.goToState('vendordetails', {
                    vendorSearchData: vendorSearchData,
                    vendor_number: vendorSearchData.vendor_number,
                    source_system_id: vendorSearchData.source_system_id
                });
            };

            $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                // emitted selected rows and row selected event from Directive controller
            });

            /** PRIVATE FUNCTIONS **/
            function defineVendorSearchGridOptions() {
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
                            cellTemplate: '<div><i class="fa fa-eye" ng-click="grid.appScope.showVendorSearchData(row.entity)"></i></div>',
                            displayName: "View",
                            enableFiltering: false,
                            enableSorting: false,
                            enableColumnMenu: false,
                            enableHiding: false,
                            width: 60,
                            cellClass: "view-cell",
                            pinnedLeft:true
                        },
                        {
                            field: 'central_posting_block',
                            displayName: "Blocked",
                            width: 80,
                            filter: {
                                placeholder: ''
                            },
                            pinnedLeft:true
                        },
                        {
                            field: 'vendor_number',
                            displayName: "Vendor Number",
                            width: 125,
                            filter: {
                                placeholder: ''
                            },
                            pinnedLeft:true
                        },
                        {
                            field: 'vendor_name_1',
                            displayName: "Vendor Name 1",
                            width: 200,
                            filter: {
                                placeholder: ''
                            },
                            pinnedLeft:true

                        },
                        {
                            field: 'vendor_name_2',
                            displayName: "Vendor Name 2",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'vendor_name_3',
                            displayName: "Vendor Name 3",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'model_market_classification',
                            displayName: "Market Classification",
                            width: 175,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'category_code',
                            displayName: "AP Category Code",
                            width: 140,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'category_description',
                            displayName: "AP Category Description",
                            width: 180,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'ap_term_key',
                            displayName: "AP Term Key",
                            width: 125,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'ap_term_code',
                            displayName: "AP Term Code",
                            width: 125,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'ap_term_description',
                            displayName: "AP Term Description",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'address',
                            displayName: "Address",
                            width: 225,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'city',
                            displayName: "City",
                            width: 125,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'state',
                            displayName: "State",
                            width: 65,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'zipcode',
                            displayName: "Zip",
                            width: 75,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'country',
                            displayName: "Country",
                            width: 80,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'telephone_number_1',
                            displayName: "Telephone Number 1",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'telephone_number_2',
                            displayName: "Telephone Number 2",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'fax_number',
                            displayName: "Fax Number",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'extraneous',
                            displayName: "Extraneous",
                            width: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'excluded',
                            displayName: "Excluded",
                            width: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'diversity_code',
                            displayName: "Diversity Code",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'district',
                            displayName: "District",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'train_station',
                            displayName: "Train Station",
                            width: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'industry_key',
                            displayName: "Industry Key",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'parent_record_created_date',
                            displayName: "Parent Record Created Date",
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'parent_record_created_by',
                            displayName: "Parent Record Created By",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'child_record_created_date',
                            displayName: "Child Record Created Date",
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'child_record_created_by',
                            displayName: "Child Record Created By",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'account_group',
                            displayName: "Account Group",
                            width: 125,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'account_number_alt_payee',
                            displayName: "Account Number Alternate Payee",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'master_record_delete_flag',
                            displayName: "Master Record Delete Flat",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'tax_1',
                            displayName: "Tax 1",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'tax_2',
                            displayName: "Tax 2",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'one_time_account_ind',
                            displayName: "One Time Account Indicatory",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'training_partner_id',
                            displayName: "Training Partner Id",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'business_type',
                            displayName: "Business Type",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'telebox',
                            displayName: "Telebox",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'personnel_number',
                            displayName: "Personnel Number",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'group_key',
                            displayName: "Group Key",
                            width: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'imposed_purchase_block',
                            displayName: "Imposed Purchase Block",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'payment_block',
                            displayName: "Payment Block",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'company_code_posting_block',
                            displayName: "Company Code Posting Block",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'tax_jurisdiction',
                            displayName: "Tax Jurisdiction Code",
                            width: 180,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'company_code',
                            displayName: "Company Code",
                            width: 125,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'customer_number',
                            displayName: "Customer Number",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'terms_payment_key',
                            displayName: "Terms Payment Key",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'account_number',
                            displayName: "Account Number",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'clerk',
                            displayName: "Clerk",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'consolidation_code',
                            displayName: "Consolidation Code",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'consolidation_description',
                            displayName: "Consolidation Code",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'nominated_code',
                            displayName: "Nominated Code",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'nominated_description',
                            displayName: "Nominated Description",
                            width: 180,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'source_system_id',
                            displayName: "Source System Id",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'created_by',
                            displayName: "Created By",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'created_date',
                            displayName: "Created Date",
                            type: 'date',
                            cellFilter: "date:'MM/dd/yyyy hh:mm a'",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'modified_by',
                            displayName: "Modified By",
                            width: 150,
                            filter: {
                                placeholder: ''
                            }
                        },

                        {
                            field: 'modified_date',
                            displayName: "Modified Date",
                            type: 'date',
                            cellFilter: "date:'MM/dd/yyyy hh:mm a'",
                            width: 150,
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