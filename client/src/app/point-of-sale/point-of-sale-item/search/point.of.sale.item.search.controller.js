(function () {
    'use strict';

    angular.module('adams.point.of.sale.item.search.controller',[])
        .controller('PointOfSaleItemSearchController',['$rootScope', '$scope', '$q', '$timeout', '$log',
            'StgStatesService', 'PointOfSaleItemSearchService', 'ModalDialogService',
            function ($rootScope, $scope, $q, $timeout, $log,
                      StgStatesService, PointOfSaleItemSearchService, ModalDialogService) {

            var pointOfSaleItemSearchController = this;

            function initialize() {
                pointOfSaleItemSearchController.gridOptions = definePOSItemGridOptions();
            }


            function definePOSItemGridOptions(){
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
                                cellTemplate: '<div><i class="fa fa-pencil" ng-click="grid.appScope.editItem(row.entity)"></i></div>',
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
                                displayName: "Copy",
                                headerCellTemplate: '<div class="ui-grid-cell-contents">Copy</div>',
                                cellTemplate: '<div><i class="fa fa-copy"></i></div>',
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
                                },
                            },
                            {
                                field: 'barcode',
                                displayName: "Barcode",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'webtrition_master_reference_number',
                                displayName: "Webtrition MRN",
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
                                field: 'item_class_name',
                                displayName: "Item Class",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'revenue_category_name',
                                displayName: "Revenue Category",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'item_category_name',
                                displayName: "Item Category",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'active',
                                displayName: "Active",
                                cellClass: 'switchClass',
                                cellTemplate: '<label class="switch"><input class="switch-input" ng-checked="row.entity.active" type="checkbox"/><span class="switch-label" data-on="YES" data-off="NO"></span><span class="switch-handle"></span></label>',
                                enableFiltering: false,
                                enableSorting: false,
                                enableColumnMenu: false,
                                enableHiding: false,
                                width: 100,
                                filter: {
                                    placeholder: ''
                                }
                            }
                        ]
                    };
            }

            pointOfSaleItemSearchController.getGridData = function () {
               return PointOfSaleItemSearchService.getPosItems();
            };

            pointOfSaleItemSearchController.errorHandling = function (errorMessage) {
                    ModalDialogService.confirm({
                        bodyText: errorMessage,
                        title: 'Error Message',
                        okText: 'Ok'
                    });
                };

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                gridApi.grid.appScope.editItem = pointOfSaleItemSearchController.editItem;
            });

            pointOfSaleItemSearchController.addItem = function () {
                StgStatesService.goToState('additem', {});
            };

            pointOfSaleItemSearchController.editItem = function (gridRow) {
                StgStatesService.goToState('edititem',
                                                {
                                                    posId:gridRow.pos_id
                                                }
                                            );
            };
            
            initialize();
        }
        ]);
})();