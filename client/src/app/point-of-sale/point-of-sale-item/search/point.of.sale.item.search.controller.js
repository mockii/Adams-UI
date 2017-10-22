(function () {
    'use strict';

    angular.module('adams.point.of.sale.item.search.controller',[])
        .controller('PointOfSaleItemSearchController',['$rootScope', '$scope', '$q', function ($rootScope, $scope, $q) {

            var pointOfSaleItemSearchController = this;

            function initialize() {
                pointOfSaleItemSearchController.gridOptions = definePOSItemGridOptions();
                pointOfSaleItemSearchController.posItemData =
                    {
                    "metadata":
                        {
                            "resultCount": 3,
                            "status": "success",
                            "http_status_code": "200"
                        },
                    "data":
                        [
                            {
                                "pos_id":"1111",
                                "barcode":"3434",
                                "webtrition_mrn": "5465646",
                                "long_name": "Starbucks Capuccino",
                                "item_class": "Prepared Items",
                                "revenue_category": "Beverage Hot",
                                "item_category": "Beverage > Coffee Hot",
                                "active_indicator": true
                            },
                            {
                                "pos_id":"1111",
                                "barcode":"3434",
                                "webtrition_mrn": "5465646",
                                "long_name": "Starbucks Capuccino",
                                "item_class": "Prepared Items",
                                "revenue_category": "Beverage Hot",
                                "item_category": "Beverage > Coffee Hot",
                                "active_indicator": false
                            },
                            {
                                "pos_id":"1111",
                                "barcode":"3434",
                                "webtrition_mrn": "5465646",
                                "long_name": "Starbucks Capuccino",
                                "item_class": "Prepared Items",
                                "revenue_category": "Beverage Hot",
                                "item_category": "Beverage > Coffee Hot",
                                "active_indicator": true
                            }
                        ]
                    };
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
                                cellTemplate: '<div><i class="fa fa-pencil"></i></div>',
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
                                field: 'webtrition_mrn',
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
                                field: 'item_class',
                                displayName: "Item Class",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'revenue_category',
                                displayName: "Revenue Category",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'item_category',
                                displayName: "Item Category",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'active_indicator',
                                displayName: "Active",
                                cellClass: 'switchClass',
                                cellTemplate: '<label class="switch"><input class="switch-input" ng-checked="row.entity.active_indicator" type="checkbox"/><span class="switch-label" data-on="YES" data-off="NO"></span><span class="switch-handle"></span></label>',
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
                var deferred = $q.defer();
                deferred.resolve(pointOfSaleItemSearchController.posItemData);
                deferred.promise.abort = function() {
                    deferred.resolve();
                };
                return deferred.promise;
            };
            
            initialize();
        }
        ]);
})();