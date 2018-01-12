(function () {
    'use strict'; //posItemClassesController

    angular.module('adams.point.of.sale.item.classes.controller',[])
        .controller('PosItemClassesController',['$rootScope', '$scope', '$q', 'PosItemClassesService', '$uibModal', 'CompassToastr',
            function ($rootScope, $scope, $q, PosItemClassesService, $uibModal, CompassToastr) {

            var posItemClassesController = this,
                editAction = 'Edit';

            function initialize() {
                posItemClassesController.gridOptions = definePOSICLGridOptions();
            }

            posItemClassesController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                return PosItemClassesService.getAllPosItemClassesDetails(pageSize, pageNumber, searchInput, sort);
            };

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi, refId, response) {
                // emitted gridOptions and gridApi from Directive controller
                posItemClassesController.gridData = response.data;
                gridApi.grid.appScope.openAddEditItemClassesModal = posItemClassesController.openAddEditItemClassesModal;

            });

            // Modal
            posItemClassesController.openAddEditItemClassesModal = function(action, itemClassesRowData) {
                var status = action === 'Add' ? 'added' : 'updated';

                $uibModal.open({
                    templateUrl: 'point-of-sale/item-classes/add-edit-item-classes-modal.tpl.html',
                    controller: 'AddEditItemClassesModalController as addEditItemClassesModalController',
                    size: 'md',
                    backdrop: 'static',
                    resolve: {
                        action: function(){return action || editAction;},
                        itemClassesRowData: itemClassesRowData || {},
                        itemClassesGridData: function () {
                            return posItemClassesController.gridData;
                        }
                    }
                }).result.then(function(response){
                    if(response === 'error'){
                        CompassToastr.error("Item Class was not " + status + ". Please try again later!");
                    }else{
                        // Refresh the Grid. Callback
                        $scope.$broadcast('uiGridParameterChange');
                        CompassToastr.success("Item Class has been successfully " + status);
                    }
                }, function(){
                    // Do nothing on cancel
                });
            };

            function definePOSICLGridOptions(){
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
                            cellTemplate: '<div><i class="fa fa-pencil" ng-click="grid.appScope.openAddEditItemClassesModal(editAction, row.entity)"></i></div>',
                            enableFiltering: false,
                            enableSorting: false,
                            enableColumnMenu: false,
                            enableHiding: false,
                            width: 50,
                            cellClass: "view-cell",
                            pinnedLeft: true
                        },
                        {
                            field: 'name',
                            displayName: "Item Class Name",
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'range_start',
                            displayName: "Item ID Range Start",
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'range_end',
                            displayName: "Item ID Range End",
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
        }]);
})();