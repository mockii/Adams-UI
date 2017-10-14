'use strict';

(function () {
    angular.module('adams.costcenter.search.controller', ['ui.grid.pinning']).controller('CostCenterSearchController', ['$scope', '$state', 'StgStatesService', 'CostCenterSearchService',
        function ($scope, $state, StgStatesService, CostCenterSearchService) {
            var costCenterSearchController = this;

            function initialize() {
                costCenterSearchController.gridOptions = defineCostcenterSearchGridOptions();
            }

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller
                gridApi.grid.appScope.showCostCenterSearchData = costCenterSearchController.showCostCenterSearchData;
            });

            costCenterSearchController.showCostCenterSearchData = function (costCenterSearchData) {
                StgStatesService.goToState('costcenterdetails', {
                    costCenterSearchData: costCenterSearchData,
                    costCenter_number: costCenterSearchData.cost_center,
                    source_system_id: costCenterSearchData.source_system_id
                });
            };

            $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                // emitted selected rows and row selected event from Directive controller
            });

            costCenterSearchController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                var fields = "";
                return CostCenterSearchService.getAllCostCenterSearchDetails(pageSize, pageNumber,
                    searchInput, sort, fields);
            };

            /** PRIVATE FUNCTIONS **/
            function defineCostcenterSearchGridOptions() {
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
                            cellTemplate: '<div><i class="fa fa-eye" ng-click="grid.appScope.showCostCenterSearchData(row.entity)"></i></div>',
                            displayName: "View",
                            enableFiltering: false,
                            enableSorting: false,
                            enableColumnMenu: false,
                            enableHiding: false,
                            width: 60,
                            cellClass: "view-cell",
                            pinnedLeft: true
                        },
                        {
                            field: 'cost_center',
                            displayName: "Cost Center Number",
                            width: 160,
                            filter: {
                                placeholder: ''
                            },
                            pinnedLeft: true
                        },
                        {
                            field: 'cost_center_long_description',
                            displayName: "Long Description",
                            width: 200,
                            filter: {
                                placeholder: ''
                            },
                            pinnedLeft: true
                        },
                        {
                            field: 'cost_center_description',
                            displayName: "Short Description",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'status_description',
                            displayName: "Status Description",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'sector',
                            displayName: "Sector",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'sector_description',
                            displayName: "Sector Description",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'division',
                            displayName: "Division",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'division_description',
                            displayName: "Division Description",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'region',
                            displayName: "Region",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'region_description',
                            displayName: "Region Description",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'district',
                            displayName: "District",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'district_description',
                            displayName: "District Description",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'complex',
                            displayName: "Complex",
                            width: 140,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'complex_description',
                            displayName: "Complex Description",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'address1',
                            displayName: "Address 1",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'address2',
                            displayName: "Address 2",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'city',
                            displayName: "City",
                            width: 140,
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
                            width: 80,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'phone_number',
                            displayName: "Phone Number",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'accountant_user_name',
                            displayName: "Accountant User Name",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'accountant_group',
                            displayName: "Accountant Group",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'accountant_email',
                            displayName: "Accountant Email",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'accountant_phone_number',
                            displayName: "Accountant Phone Number",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'accountant_emp_id',
                            displayName: "Accountant Personal Number",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'lockbox_address1',
                            displayName: "Lockbox Address 1",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'lockbox_address2',
                            displayName: "Lockbox Address 2",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'lockbox_city',
                            displayName: "Lockbox City",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'lockbox_ind',
                            displayName: "Lockbox",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'lockbox_state',
                            displayName: "Lockbox State",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'lockbox_zip',
                            displayName: "Lockbox Zip",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'open_date',
                            displayName: "Open Date",
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'assigned_profit_center',
                            displayName: "Assigned Profit Center",
                            width: 180,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'profit_center_profile_code',
                            displayName: "Profit Center Profile Code",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'legal_contract_id',
                            displayName: "Legal Contract Id",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'profit_center_number',
                            displayName: "Profile Center Number",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'subsidy_flag',
                            displayName: "Subsidy Flag",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'on_ledger_ind',
                            displayName: "On Ledger",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'tax_jurisdiction_rate',
                            displayName: "Tax Jurisdiction Rate",
                            width: 180,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'tax_jurisdiction_code',
                            displayName: "Tax Jurisdiction Code",
                            width: 180,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'legal_entity',
                            displayName: "Legal Entity",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'legal_entity_description',
                            displayName: "Legal Entity Description",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'close_date',
                            displayName: "Close Date",
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                            width: 140,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'activity_flag',
                            displayName: "Activity Flag",
                            width: 140,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'unit_manager_first_name',
                            displayName: "Unit Manager First Name",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'unit_manager_last_name',
                            displayName: "Unit Manager Last Name",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'unit_manager_email',
                            displayName: "Unit Manager Email",
                            width: 180,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'unit_manager_telephone',
                            displayName: "Unit Manager Phone Number",
                            width: 220,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'unit_manager_perno',
                            displayName: "Unit Manager Personal Number",
                            width: 240,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'district_manager_first_name',
                            displayName: "District Manager First Name",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'district_manager_last_name',
                            displayName: "District Manager Last Name",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'district_manager_email',
                            displayName: "District Manager Email",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'district_manager_telephone',
                            displayName: "District Manager Phone Number",
                            width: 220,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'district_manager_perno',
                            displayName: "District Manager Personal Number",
                            width: 240,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'region_manager_first_name',
                            displayName: "Regional Manager First Name",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'region_manager_last_name',
                            displayName: "Regional Manager Last Name",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'region_manager_email',
                            displayName: "Regional Manager Email",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'region_manager_telephone',
                            displayName: "Regional Manager Telephone",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'region_manager_perno',
                            displayName: "Regional Manager Personal Number",
                            width: 240,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'company_code',
                            displayName: "Company Code",
                            width: 140,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'source_system_id',
                            displayName: "Source System Id",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'accounting_close_date',
                            displayName: "Accountant Close Date",
                            width: 200,
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'accounting_open_date',
                            displayName: "Accountant Open Date",
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'activity_type_code',
                            displayName: "Activity Type Code",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'billing_cycle',
                            displayName: "Billing Cycle",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'business_area',
                            displayName: "Business Area",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'client_reporting_year',
                            displayName: "Client Reporting Year",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'cost_center_category',
                            displayName: "Cost Center Category",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'day_period_close',
                            displayName: "Day Period Close",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'financial_close_date',
                            displayName: "Financial Close Date",
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                            width: 180,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'line_of_business',
                            displayName: "Line of Business",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'profile_description',
                            displayName: "Profile Description",
                            width: 200,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'created_by',
                            displayName: "Created By",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'created_date',
                            displayName: "Created Date",
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'modified_by',
                            displayName: "Modified By",
                            width: 160,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'modified_date',
                            displayName: "Modified Date",
                            type: 'date',
                            cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                            width: 160,
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