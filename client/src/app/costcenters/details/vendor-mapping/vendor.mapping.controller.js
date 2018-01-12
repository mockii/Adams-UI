(function () {
    angular.module('adams.vendor.mapping.controller', ['ui.grid.pinning', 'common.modules.logging'])
        .controller('VendorMappingController', ['$scope', '$state', '$location', '$window', 'StgStatesService', 'uiGridConstants', 'VendorMappingService', 'CompassToastr', '$uibModal', 'costCenterSearchData', '$timeout', 'Utils', '$log', 'STATUS_CONSTANT',
            function ($scope, $state, $location, $window, StgStatesService, uiGridConstants, VendorMappingService, CompassToastr, $uibModal, costCenterSearchData, $timeout, Utils, $log, STATUS_CONSTANT) {
                var vendorMappingController = this,
                    searchProperty = "associated",
                    vendorUpdatePromise;

                $state.current.data.pageTitle = costCenterSearchData.cost_center_description + ' (' + costCenterSearchData.cost_center + ')';
                vendorMappingController.costCenterSourceSystemId = $state.params.costCenter_source_system_id;
                vendorMappingController.costCenterNumber = $state.params.costCenter_number;
                $scope.costCenterDetailsController.costCenterSearchData = costCenterSearchData;

                function initialize() {
                    vendorMappingController.gridOptions = defineVendorGridOptions();
                    vendorMappingController.vendorMappingStatuses = STATUS_CONSTANT;
                    vendorMappingController.vendorMappingStatus = vendorMappingController.vendorMappingStatuses[1];
                    vendorMappingController.statusFilterChanged(vendorMappingController.vendorMappingStatus);
                }

                vendorMappingController.statusFilterChanged = function(status){
                    if (status.name === 'Active') {
                        vendorMappingController.searchPropertyValue = true;
                    }
                    else if (status.name === 'Inactive') {
                        vendorMappingController.searchPropertyValue = false;
                    }
                    else {
                        vendorMappingController.searchPropertyValue = '';
                    }
                    $scope.$broadcast('uiGridParameterChange');
                };

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                    // emitted gridOptions and gridApi from Directive controller
                    gridApi.grid.appScope.changeVendorAssociation = vendorMappingController.changeVendorAssociation;

                    gridApi.grid.appScope.showVendorMappingHistory = vendorMappingController.showVendorMappingHistory;

                    gridApi.grid.appScope.navigateToVendorDetail = vendorMappingController.navigateToVendorDetail;
                });

                vendorMappingController.changeVendorAssociation = function (vendorRow, event) {
                    var vendorRowData = vendorRow.entity;
                    vendorRowData.associated = event.currentTarget.checked;
                    if (!vendorRowData.associated) {
                        if (vendorRowData.edi_pay_status === 1) {
                            $uibModal.open({
                                templateUrl: 'costcenters/details/vendor-mapping/vendor-mapping-disassociate-edi-reason.tpl.html',
                                controller: 'VendorMappingDisAssociateEdiReasonController as vendorMappingDisAssociateEdiReasonController',
                                size: 'md',
                                backdrop: 'static'
                            }).result.then(function (res, err) {
                                if (res === 'true') {
                                    vendorRowData.associated = res;
                                    event.preventDefault();
                                }
                            });
                        } else {
                            $uibModal.open({
                                templateUrl: 'costcenters/details/vendor-mapping/vendor-mapping-disassociate.tpl.html',
                                controller: 'VendorMappingDisAssociateController as vendorMappingDisAssociateController',
                                size: 'md',
                                backdrop: 'static'
                            }).result.then(function (res, err) {
                                if (res === 'true') {
                                    vendorRowData.associated = res;
                                    event.preventDefault();
                                } else {
                                    vendorRowData.disassociation_reason = res;
                                    Utils.startBlockUI("vendor-ui-grid");
                                    updateVendor(vendorRowData).then(function (){
                                        Utils.stopBlockUI("vendor-ui-grid");
                                    });
                                }
                            }, function(){
                                vendorRowData.associated = !vendorRowData.associated;
                                event.preventDefault();
                            });
                        }
                    } else {
                        Utils.startBlockUI("vendor-ui-grid");
                        updateVendor(vendorRowData).then(function (){
                            Utils.stopBlockUI("vendor-ui-grid");
                        });
                    }
                };

                vendorMappingController.showVendorMappingHistory = function (vendorRow, event) {
                    var vendorRowData = vendorRow.entity;
                    $uibModal.open({
                        templateUrl: 'costcenters/details/vendor-mapping/vendor-mapping-history.tpl.html',
                        controller: 'VendorMappingHistoryController as vendorMappingHistoryController',
                        size: 'lg',
                        backdrop: 'static',
                        resolve: {
                            vendorRowData: vendorRowData
                        }
                    });
                };

                vendorMappingController.navigateToVendorDetail = function(row) {
                    StgStatesService.goToState('vendordetails', {
                        vendor_number: row.entity.vendor_number,
                        vendor_source_system_id: row.entity.vendor_source_system_id
                    });
                };

                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                    // emitted selected rows and row selected event from Directive controller
                });

                function updateVendor(vendorRowData) {
                    vendorUpdatePromise = VendorMappingService.updateCostCenterVendor(vendorRowData);
                    vendorUpdatePromise.then(
                        function (response) {
                            if (response === 'error') {
                                vendorRowData.associated = !vendorRowData.associated;
                                CompassToastr.error("A error occured while updating vendor association. " + response);
                            }
                            else {
                                var association = vendorRowData.associated ? 'associated' : 'disassociated';
                                CompassToastr.success("Vendor " + vendorRowData.vendor_name_1 + " for cost center " + vendorRowData.cost_center_name + " - " + vendorRowData.cost_center_description + " has been successfully " + association);
                            }
                            // Refresh the Grid. Callback
                            $scope.$broadcast('uiGridParameterChange');
                        },
                        function (error) {
                            vendorRowData.associated = !vendorRowData.associated;
                            CompassToastr.error("A error occurred while updating vendor association." + error);
                            $log.error("An error occurred while updating vendor association");
                        });
                    return vendorUpdatePromise;
                }

                vendorMappingController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                    if(vendorMappingController.hasOwnProperty('searchPropertyValue') &&
                        vendorMappingController.searchPropertyValue === '' &&
                        searchInput.search.length === 1 &&
                        searchInput.search[0].property === 'active') {
                        return VendorMappingService.getVendorMappingData(pageSize, pageNumber, sort, vendorMappingController.costCenterSourceSystemId, vendorMappingController.costCenterNumber, {});
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
                        if(vendorMappingController.searchPropertyValue !== ""){
                            searchInput.search.push({
                                "property": searchProperty,
                                "value": vendorMappingController.searchPropertyValue === null ? '' : vendorMappingController.searchPropertyValue,
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
                        vendorMappingController.search = searchInput;
                        return VendorMappingService.getVendorMappingData(pageSize, pageNumber, sort, vendorMappingController.costCenterSourceSystemId, vendorMappingController.costCenterNumber, vendorMappingController.search);
                    }
                };

                vendorMappingController.openAddVendorMapping = function () {
                    var addVendorMappingModal = $uibModal.open({
                        templateUrl: 'costcenters/details/vendor-mapping/add-vendor-mapping.tpl.html',
                        controller: 'AddVendorMappingController as addVendorMappingController',
                        size: 'lg',
                        backdrop: 'static',
                        resolve: {
                            addEligibleVendorData: {
                                'costCenterNumber': vendorMappingController.costCenterNumber,
                                'costCenterSourceSystemId': vendorMappingController.costCenterSourceSystemId === null ? $location.search().source_system_id : vendorMappingController.costCenterSourceSystemId
                            }
                        }
                    });
                    addVendorMappingModal.result.then(function (res, err) {
                        // Refresh the Grid. Callback
                        $scope.$broadcast('uiGridParameterChange');
                    });
                };


                vendorMappingController.openMassVendorContactModal = function() {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'vendors/mass-vendor-contact/mass-vendor-contact-modal.tpl.html',
                        controller: 'MassVendorContactModalController as massVendorContactModalController',
                        size: 'lg',
                        backdrop: 'static',
                        windowClass: 'mass-vendor-contact-modal',
                        resolve: {
                            costCenter: function() {
                                return {
                                    costCenterNumber: vendorMappingController.costCenterNumber,
                                    costCenterSourceSystemId: vendorMappingController.costCenterSourceSystemId
                                };
                            }
                        }
                    });

                    modalInstance.result.then(function (result) {
                        $window.location.href = "mailto:"+ result.selectedContacts.join(';');
                    });
                };

                function defineVendorGridOptions() {
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
                                cellTemplate: '<div><i class="fa fa-clock-o" aria-hidden="true" ng-click="grid.appScope.showVendorMappingHistory(row)" ng-bind="row.getProperty(col.field)"></i></div>',
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
                                field: 'vendor_number',
                                displayName: "Vendor Number",
                                minWidth: 150,
                                filter: {
                                    placeholder: ''
                                },
                                cellClass: 'hyperlink-cell',
                                cellTemplate:'<a ng-click="grid.appScope.navigateToVendorDetail(row)">{{row.entity.vendor_number}}</a>'
                            },
                            {
                                field: 'vendor_name_1',
                                displayName: "Name1",
                                minWidth: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'vendor_name_2',
                                displayName: "Name2",
                                minWidth: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'vendor_name_3',
                                displayName: "Name3",
                                minWidth: 150,
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
                                displayName: "Edi Pay Status",
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
                                displayName: "Edi Live Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                                minWidth: 150,
                                enableFiltering: false
                            },
                            {
                                field: 'associated',
                                displayName: "Associated",
                                cellTemplate: '<label class="switch" stg-secured-object="Vendor Cost Center Association"><input class="switch-input" ng-checked="row.entity.associated" ng-click="grid.appScope.changeVendorAssociation(row, $event)" type="checkbox"/><span class="switch-label" data-on="YES" data-off="NO"></span><span class="switch-handle"></span></label>',
                                cellClass: 'switchClass',
                                minWidth: 100,
                                enableFiltering: false
                            },
                            {
                                field: 'associated_by',
                                displayName: "Associated By",
                                minWidth: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'associated_date',
                                displayName: "Associated Date",
                                minWidth: 150,
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
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
                                minWidth: 150,
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
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
                return value === 0 ? false : true;
            };
        });
})();