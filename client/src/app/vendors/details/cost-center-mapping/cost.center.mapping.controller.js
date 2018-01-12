(function () {
    angular.module('adams.cost.center.mapping.controller', ['ui.grid.pinning', 'common.modules.logging'])
        .controller('CostCenterMappingController', ['$scope', '$state', '$location', 'StgStatesService', 'uiGridConstants', 'CostCenterMappingService', 'CompassToastr', '$uibModal', 'Utils', 'vendorSearchData', '$log', 'STATUS_CONSTANT',
            function ($scope, $state, $location, StgStatesService, uiGridConstants, CostCenterMappingService, CompassToastr, $uibModal, Utils, vendorSearchData, $log, STATUS_CONSTANT) {
                var costCenterMappingController = this,
                    searchProperty = "associated",
                    vendorCostCenterUpdatePromise;

                $state.current.data.pageTitle = vendorSearchData.vendor_name_1 + ' (' + vendorSearchData.vendor_number + ')';
                costCenterMappingController.vendorSourceSystemId = $state.params.vendor_source_system_id;
                costCenterMappingController.vendorNumber = $state.params.vendor_number;
                $scope.vendorDetailsController.vendorSearchData = vendorSearchData;

                function initialize() {
                    costCenterMappingController.gridOptions = defineCostCenterGridOptions();
                    costCenterMappingController.costCenterMappingStatuses = STATUS_CONSTANT;
                    costCenterMappingController.costCenterMappingStatus = costCenterMappingController.costCenterMappingStatuses[1];
                    costCenterMappingController.statusFilterChanged(costCenterMappingController.costCenterMappingStatus);
                }

                costCenterMappingController.statusFilterChanged = function(status){
                    if (status.name === 'Active') {
                        costCenterMappingController.searchPropertyValue = true;
                    }
                    else if (status.name === 'Inactive') {
                        costCenterMappingController.searchPropertyValue = false;
                    }
                    else {
                        costCenterMappingController.searchPropertyValue = '';
                    }
                    $scope.$broadcast('uiGridParameterChange');
                };

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                    // emitted gridOptions and gridApi from Directive controller
                    gridApi.grid.appScope.changeCostCenterAssociation = costCenterMappingController.changeCostCenterAssociation;

                    gridApi.grid.appScope.showCostCenterMappingHistory = costCenterMappingController.showCostCenterMappingHistory;

                    gridApi.grid.appScope.navigateToCostCenterDetail = costCenterMappingController.navigateToCostCenterDetail;
                });

                costCenterMappingController.changeCostCenterAssociation = function (costCenterRow, event) {
                    var costCenterRowData = costCenterRow.entity;
                    costCenterRowData.associated = event.currentTarget.checked;
                    if (!costCenterRowData.associated) {
                        if (costCenterRowData.edi_pay_status === 1) {
                            $uibModal.open({
                                templateUrl: 'vendors/details/cost-center-mapping/cost-center-mapping-disassociate-edi-reason.tpl.html',
                                controller: 'CostCenterMappingDisAssociateEdiReasonController as costCenterMappingDisAssociateEdiReasonController',
                                size: 'md',
                                backdrop: 'static'
                            }).result.then(function (res, err) {
                                if (res === 'true') {
                                    costCenterRowData.associated = res;
                                    event.preventDefault();
                                }
                            });
                        } else {
                            $uibModal.open({
                                templateUrl: 'vendors/details/cost-center-mapping/cost-center-mapping-disassociate.tpl.html',
                                controller: 'CostCenterMappingDisAssociateController as costCenterMappingDisAssociateController',
                                size: 'md',
                                backdrop: 'static'
                            }).result.then(function (res, err) {
                                if (res === 'true') {
                                    costCenterRowData.associated = res;
                                    event.preventDefault();
                                } else {
                                    costCenterRowData.disassociation_reason = res;
                                    Utils.startBlockUI("cost-center-mapping-grid");
                                    updateVendorCostCenter(costCenterRowData).then(function(){
                                        Utils.stopBlockUI("cost-center-mapping-grid");
                                    });
                                }
                            }, function(){
                                costCenterRowData.associated = !costCenterRowData.associated;
                                event.preventDefault();
                            });
                        }
                    } else {
                        Utils.startBlockUI("cost-center-mapping-grid");
                        updateVendorCostCenter(costCenterRowData).then(function(){
                            Utils.stopBlockUI("cost-center-mapping-grid");
                        });
                    }
                };

                costCenterMappingController.showCostCenterMappingHistory = function (costCenterRow, event) {
                    var costCenterRowData = costCenterRow.entity;
                    $uibModal.open({
                        templateUrl: 'vendors/details/cost-center-mapping/cost-center-mapping-history.tpl.html',
                        controller: 'CostCenterMappingHistoryController as costCenterMappingHistoryController',
                        size: 'lg',
                        backdrop: 'static',
                        resolve: {
                            costCenterRowData: costCenterRowData
                        }
                    });
                };

                costCenterMappingController.navigateToCostCenterDetail = function(row) {
                    StgStatesService.goToState('costcenterdetails', {
                        costCenter_number: row.entity.cost_center_name,
                        costCenter_source_system_id: row.entity.cost_center_source_system_id
                    });
                };

                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                    // emitted selected rows and row selected event from Directive controller
                });

                function updateVendorCostCenter(costCenterRowData) {
                    vendorCostCenterUpdatePromise = CostCenterMappingService.updateVendorCostCenter(costCenterRowData);
                    vendorCostCenterUpdatePromise.then(
                        function (response) {
                            if (response === 'error') {
                                costCenterRowData.associated = !costCenterRowData.associated;
                                CompassToastr.error("A error occured while updating vendor cost center association." + response);
                            }
                            else {
                                var association = costCenterRowData.associated ? 'associated' : 'disassociated';
                                CompassToastr.success("Cost center " + costCenterRowData.cost_center_name + " for vendor " + costCenterRowData.vendor_number + " has been successfully " + association);
                            }
                            // Refresh the Grid. Callback
                            $scope.$broadcast('uiGridParameterChange');
                        },
                        function (error) {
                            costCenterRowData.associated = !costCenterRowData.associated;
                            CompassToastr.error("A error occured while updating vendor cost center association." + error);
                            $log.error("An error occurred while updating vendor cost center association");
                        });
                    return vendorCostCenterUpdatePromise;
                }

                costCenterMappingController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                    if(costCenterMappingController.hasOwnProperty('searchPropertyValue') &&
                        costCenterMappingController.searchPropertyValue === '' &&
                        searchInput.search.length === 1 &&
                        searchInput.search[0].property === 'active') {
                        return CostCenterMappingService.getCostCenterMappingData(pageSize, pageNumber, sort, costCenterMappingController.vendorNumber, {});
                    }
                    else {
                        if(!searchInput.search) {
                            searchInput.search = [];
                        }
                        // delete if exist
                        if (Utils.checkIfSearchObjectPresent(searchProperty, searchInput.search)) {
                            var index = Utils.getSearchObjectIndex(searchProperty, searchInput.search);
                            searchInput.search.splice(index, 1);
                        }
                        if(costCenterMappingController.searchPropertyValue !== ""){
                            searchInput.search.push({
                                "property": searchProperty,
                                "value": costCenterMappingController.searchPropertyValue === null ? '' : costCenterMappingController.searchPropertyValue,
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
                        costCenterMappingController.search = searchInput;
                        return CostCenterMappingService.getCostCenterMappingData(pageSize, pageNumber, sort, costCenterMappingController.vendorNumber, costCenterMappingController.search);
                    }
                };

                costCenterMappingController.openAddCostCenterMapping = function () {
                    var addCostCenterMappingModal = $uibModal.open({
                        templateUrl: 'vendors/details/cost-center-mapping/add-cost-center-mapping.tpl.html',
                        controller: 'AddCostCenterMappingController as addCostCenterMappingController',
                        size: 'lg',
                        backdrop: 'static',
                        resolve: {
                            addEligibleCostCenterData: {
                                'vendorSearchData': vendorSearchData,
                                'vendorNumber': costCenterMappingController.vendorNumber,
                                'vendorSourceSystemId': costCenterMappingController.vendorSourceSystemId === null ? $location.search().source_system_id : costCenterMappingController.vendorSourceSystemId
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
                                field: 'history',
                                cellTemplate: '<div><i class="fa fa-clock-o" aria-hidden="true" ng-click="grid.appScope.showCostCenterMappingHistory(row)" ng-bind="row.getProperty(col.field)"></i></div>',
                                displayName: "History",
                                enableFiltering: false,
                                enableSorting: false,
                                enableColumnMenu: false,
                                enableHiding: false,
                                minWidth: 60,
                                cellClass: "view-cell",
                                pinnedLeft:true
                            },
                            {
                                field: 'cost_center_name',
                                displayName: "Name",
                                minWidth: 150,
                                filter: {
                                    placeholder: ''
                                },
                                cellClass: 'hyperlink-cell',
                                cellTemplate:'<a ng-click="grid.appScope.navigateToCostCenterDetail(row)">{{row.entity.cost_center_name}}</a>'
                            },
                            {
                                field: 'cost_center_description',
                                displayName: "Description",
                                minWidth: 200,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'compliance',
                                displayName: "Compliance",
                                minWidth: 150,
                                filter: {
                                    placeholder: ''
                                }

                            },
                            {
                                field: 'edi_pay_status',
                                displayName: "EDI Pay Status",
                                minWidth: 150,
                                cellFilter: 'ediPayStatusFilter',
                                filter: {
                                    placeholder: '',
                                    type: uiGridConstants.filter.SELECT,
                                    selectOptions: [{value: true, label: 'true'}, {value: false, label: 'false'}]
                                }
                            },
                            {
                                field: 'edi_live_date',
                                displayName: "EDI Live Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                                minWidth: 150,
                                enableFiltering: false
                            },
                            {
                                field: 'associated',
                                displayName: "Associated",
                                cellTemplate: '<label class="switch" stg-secured-object="Vendor Cost Center Association"><input class="switch-input" ng-checked="row.entity.associated" ng-click="grid.appScope.changeCostCenterAssociation(row, $event)" type="checkbox"/><span class="switch-label" data-on="YES" data-off="NO"></span><span class="switch-handle"></span></label>',
                                cellClass: 'switchClass',
                                minWidth: 100,
                                enableFiltering: false
                            },
                            {
                                field: 'associated_by',
                                displayName: "Associated By",
                                minWidth: 200,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'associated_date',
                                displayName: "Associated Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                                minWidth: 150,
                                enableFiltering: false
                            },
                            {
                                field: 'disassociated_by',
                                displayName: "Disassociated By",
                                minWidth: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'disassociated_date',
                                displayName: "Disassociated Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                                minWidth: 150,
                                enableFiltering: false
                            },
                            {
                                field: 'disassociation_reason',
                                displayName: "Disassociated Reason",
                                minWidth: 300,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'created_by',
                                displayName: "Created By",
                                minWidth: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'created_date',
                                displayName: "Created Date",
                                minWidth: 150,
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                                enableFiltering: false
                            },
                            {
                                field: 'modified_by',
                                displayName: "Modified By",
                                minWidth: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'modified_date',
                                displayName: "Modified Date",
                                minWidth: 150,
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                                enableFiltering: false
                            }
                        ]
                    };
                }

                initialize();
            }])
        .filter('ediPayStatusFilter', function () {
            return function (value) {
                return value === 1;
            };
        });
})();