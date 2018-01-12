(function () {
    'use strict';

    angular.module('adams.point.of.sale.revenue.category.defaults.controller',[])
        .controller('RevenueCategoryDefaultsController',['$rootScope', '$scope', 'PosRevenueCategoriesService', 'PointOfSaleSystemCategoriesDefaultsService', '$log',
                function ($rootScope, $scope, PosRevenueCategoriesService, PointOfSaleSystemCategoriesDefaultsService, $log ) {
            var revenueCategoryDefaultsController = this;

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller
            });

            revenueCategoryDefaultsController.revenueCategoriesGetGridData = function (pageSize, pageNumber, sort, searchInput) {
                return PosRevenueCategoriesService.getAllPosRevenueCategoriesDetails(pageSize, pageNumber, searchInput, sort);
            };

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller
            });

            $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows) {
                // emitted selected rows from Directive controller
                handleRowSelectionChange(mySelectedRows);
            });

            function handleRowSelectionChange(selectedRows) {
                $scope.$parent.pointOfSaleSystemCategoryDefaultsController.selectedRevenueCategory = selectedRows[0];
                PointOfSaleSystemCategoriesDefaultsService.getTypeDetailsForSystemCategoryDefaultsAndVendor(selectedRows[0].revenue_category_code)
                    .then(function(response){
                        $scope.$parent.pointOfSaleSystemCategoryDefaultsController.revenueCategoriesModelObjects = response;
                        $scope.$parent.pointOfSaleSystemCategoryDefaultsController.setRevenueCategoriesModelObjects();
                    }, function(error){
                        $log.error('An error occurred while loading default revenue category - ', error);
                    });
            }

            function initialize() {
                $scope.$parent.pointOfSaleSystemCategoryDefaultsController.selectedRevenueCategory = null;
                revenueCategoryDefaultsController.revenueCategoriesGridOptions = defineRevenueCategoriesGridOptions();
            }

            /** PRIVATE FUNCTIONS **/
            function defineRevenueCategoriesGridOptions() {
                return {
                    paginationPageSizes: [25, 50, 75],
                    paginationPageSize: 25, // pagination out of box
                    virtualizationThreshold: 25,
                    useExternalPagination: true,
                    useExternalFiltering: true,
                    autoRowSelection: false,
                    enableFiltering: true, //step1 to enable all grid columns filtering
                    enableRowSelection: true,
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    noUnselect: false,
                    showColumnFooter: false,
                    treeRowHeaderAlwaysVisible: false,
                    enableGridMenu: true, //true will display grid menu on top-right
                    enableSorting: true,
                    enableExpandable: false,
                    enableExpandableRowHeader : false,
                    expandableRowHeight: 125,
                    columnDefs: [
                        {   field: 'name',
                            displayName: "Name",
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'type',
                            displayName: "Type",
                            filter: {
                                placeholder: ''
                            },
                            cellFilter: ''
                        },
                        {   field: 'description',
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