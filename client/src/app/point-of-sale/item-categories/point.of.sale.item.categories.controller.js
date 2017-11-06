(function () {
    'use strict';

    angular.module('adams.point.of.sale.item.categories.controller',[])
        .controller('PosItemCategoriesController',['$rootScope', '$scope', '$q', 'PosItemCategoriesService', '$uibModal', 'CompassToastr',  function ($rootScope, $scope, $q, PosItemCategoriesService, $uibModal, CompassToastr) {
            var posItemCategoriesController = this,
                editAction = 'Edit';

            function initialize() {
                posItemCategoriesController.gridOptions = definePOSICGridOptions();
            }

            posItemCategoriesController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                return PosItemCategoriesService.getAllPosItemCategoriesDetails(pageSize, pageNumber, searchInput, sort);
            };

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller
                gridApi.grid.appScope.openAddEditItemModal = posItemCategoriesController.openAddEditItemModal;
            });

            // Modal
            posItemCategoriesController.openAddEditItemModal = function(action, itemCategoriesRowData) {
                var status = action === 'Add' ? 'added' : 'updated';

                $uibModal.open({
                    templateUrl: 'point-of-sale/item-categories/add-edit-item-categories-modal.tpl.html',
                    controller: 'AddEditItemCategoriesModalController as addEditItemCategoriesModalController',
                    size: 'md',
                    backdrop: 'static',
                    resolve: {
                        action: function(){return action || editAction;},
                        itemCategoriesRowData: itemCategoriesRowData || {}
                    }
                }).result.then(function(response){
                    // Refresh the Grid. Callback
                    $scope.$broadcast('uiGridParameterChange');
                    CompassToastr.success("Item Category has been successfully " + status);
                }, function(){
                    // Do nothing on cancel
                });
            };

            function definePOSICGridOptions(){
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
                            cellTemplate: '<div><i class="fa fa-pencil" ng-click="grid.appScope.openAddEditItemModal(editAction, row.entity)"></i></div>',
                            enableFiltering: false,
                            enableSorting: false,
                            enableColumnMenu: false,
                            enableHiding: false,
                            width: 50,
                            cellClass: "view-cell",
                            pinnedLeft: true
                        },
                        {
                            field: 'item_category_name',
                            displayName: "Item Category Name",
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'description',
                            displayName: "Description",
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