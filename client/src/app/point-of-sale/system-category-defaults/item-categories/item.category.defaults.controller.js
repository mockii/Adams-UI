(function () {
    'use strict';

    angular.module('adams.point.of.sale.item.category.defaults.controller',[])
        .controller('ItemCategoryDefaultsController',['$rootScope', '$scope', 'PosItemCategoriesService', 'PointOfSaleSystemCategoriesDefaultsService', '$log',
                function ($rootScope, $scope, PosItemCategoriesService, PointOfSaleSystemCategoriesDefaultsService, $log ) {
            var itemCategoryDefaultsController = this;

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller
            });

            itemCategoryDefaultsController.itemCategoriesGetGridData = function (pageSize, pageNumber, sort, searchInput) {
                return PosItemCategoriesService.getAllPosItemCategoriesDetails(pageSize, pageNumber, searchInput, sort);
            };

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller
            });

            $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows) {
                // emitted selected rows from Directive controller
                handleRowSelectionChange(mySelectedRows);
            });

            function handleRowSelectionChange(selectedRows) {
                $scope.$parent.pointOfSaleSystemCategoryDefaultsController.selectedItemCategory = selectedRows[0];
                PointOfSaleSystemCategoriesDefaultsService.getTypeDetailsForSystemCategoryDefaultsAndVendor(selectedRows[0].item_category_code)
                    .then(function(response){
                        $scope.$parent.pointOfSaleSystemCategoryDefaultsController.itemCategoriesModelObjects = response;
                    }, function(error){
                        $log.error('An error occurred while loading default revenue category - ', error);
                    });
            }

            function initialize() {
                $scope.$parent.pointOfSaleSystemCategoryDefaultsController.selectedItemCategory = null;
                itemCategoryDefaultsController.itemCategoriesGridOptions = defineItemCategoriesGridOptions();
            }

            /** PRIVATE FUNCTIONS **/

            function defineItemCategoriesGridOptions() {
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