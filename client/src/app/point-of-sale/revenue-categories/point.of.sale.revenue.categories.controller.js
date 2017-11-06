(function () {
    'use strict';

    angular.module('adams.point.of.sale.revenue.categories.controller',[])
        .controller('PosRevenueCategoriesController',['$rootScope', '$scope', '$q', 'PosRevenueCategoriesService', '$uibModal', 'CompassToastr', function ($rootScope, $scope, $q, PosRevenueCategoriesService, $uibModal, CompassToastr) {

            var posRevenueCategoriesController = this,
                editAction = 'Edit';

            function initialize() {
                posRevenueCategoriesController.gridOptions = definePOSRCGridOptions();
            }

            posRevenueCategoriesController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                return PosRevenueCategoriesService.getAllPosRevenueCategoriesDetails(pageSize, pageNumber, searchInput, sort);
            };

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller
                gridApi.grid.appScope.openAddEditRevenueModal = posRevenueCategoriesController.openAddEditRevenueModal;

            });

            posRevenueCategoriesController.openAddEditRevenueModal = function(action, revenueCategoriesRowData) {
                var status = action === 'Add' ? 'added' : 'updated';

                $uibModal.open({
                    templateUrl: 'point-of-sale/revenue-categories/add-edit-revenue-categories-modal.tpl.html',
                    controller: 'AddEditRevenueCategoriesModalController as addEditRevenueCategoriesModalController',
                    size: 'md',
                    backdrop: 'static',
                    resolve: {
                        action: function(){return action || editAction;},
                        revenueCategoriesRowData: revenueCategoriesRowData || {}
                    }
                }).result.then(function(response){
                    // Refresh the Grid. Callback
                    $scope.$broadcast('uiGridParameterChange');
                    CompassToastr.success("Revenue Category has been successfully " + status);
                }, function(){
                    // Do nothing on cancel
                });
            };

            function definePOSRCGridOptions(){
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
                            displayName: "Edit",
                            headerCellTemplate: '<div class="ui-grid-cell-contents">Edit</div>',
                            cellTemplate: '<div><i class="fa fa-pencil" ng-click="grid.appScope.openAddEditRevenueCategoriesModal(editAction, row.entity)"></i></div>',
                            enableFiltering: false,
                            enableSorting: false,
                            enableColumnMenu: false,
                            enableHiding: false,
                            width: 50,
                            cellClass: "view-cell",
                            pinnedLeft: true
                        },
                        {
                            field: 'pos_id',
                            displayName: "POS ID",
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'long_name',
                            displayName: "Long Name",
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'item_class',
                            displayName: "item Class",
                            filter: {
                                placeholder: ''
                            }
                        }

                    ]
                };
            }

            initialize();
        }]);
})();