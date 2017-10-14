(function () {
    angular.module('adams.products.search.controller', ['ui.grid.pinning', 'common.services.states'])
        .controller('ProductsSearchController', ['$scope', '$state', 'ProductsSearchService', 'StgStatesService',
            function ($scope, $state, ProductsSearchService,StgStatesService) {
                var productsSearchController = this;

                function initialize() {
                    productsSearchController.gridOptions = defineProductsSearchGridOptions();
                }

                productsSearchController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                    return ProductsSearchService.getAllProductsSearchDetails(pageSize, pageNumber,
                        searchInput, sort);
                };

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                    // emitted gridOptions and gridApi from Directive controller
                    gridApi.grid.appScope.showProductsSearchData = productsSearchController.showProductsSearchData;
                });

                productsSearchController.showProductsSearchData = function (productsSearchData) {
                    StgStatesService.goToState('productsdetails', {
                        productsSearchData: productsSearchData,
                        gtin: productsSearchData.gtin
                    });
                };

                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                    // emitted selected rows and row selected event from Directive controller
                });

                /** PRIVATE FUNCTIONS **/
                function defineProductsSearchGridOptions() {
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
                                field: 'id',
                                cellTemplate: '<div><i class="fa fa-eye" ng-click="grid.appScope.showProductsSearchData(row.entity)"></i></div>',
                                displayName: "View",
                                enableFiltering: false,
                                enableSorting: false,
                                enableColumnMenu: false,
                                enableHiding: false,
                                width: 60,
                                cellClass: "view-cell",
                                pinnedLeft:true
                            },
                            {
                                field: 'gtin',
                                displayName: "GTIN",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                },
                                pinnedLeft:true
                            },
                            {
                                field: 'description',
                                displayName: "Description",
                                width: 250,
                                filter: {
                                    placeholder: ''
                                },
                                pinnedLeft:true
                            },
                            {
                                field: 'long_description',
                                displayName: "Long Description",
                                width: 250,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'product_name',
                                displayName: "Product Name",
                                width: 250,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'provider_gln',
                                displayName: "Provider GLN",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'bo_gln',
                                displayName: "BO GLN",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'manufacturer_gln',
                                displayName: "Manufacturer GLN",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'manufacturer_name',
                                displayName: "Manufacturer Name",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'brand_name',
                                displayName: "Brand Name",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'brand_owner',
                                displayName: "Brand Owner",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'packaging_hierarchy',
                                displayName: "Packaging Hierarchy",
                                width: 160,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'global_category_description',
                                displayName: "Global Category Description",
                                width: 200,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'global_category_code',
                                displayName: "Global Category Code",
                                width: 180,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'orderable_flag',
                                displayName: "Orderable Flag",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'info_provider',
                                displayName: "Info Provider",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'expanded_description',
                                displayName: "Expanded Description",
                                width: 240,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'functional_name',
                                displayName: "Functional Name",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'target_market',
                                displayName: "Target Market",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'minimum_temperature',
                                displayName: "Minimum Temperature",
                                width: 180,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'minimum_temperature_uom',
                                displayName: "Minimum Temperature UOM",
                                width: 200,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'maximum_temperature',
                                displayName: "Maximum Temperature",
                                width: 180,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'maximum_temperature_uom',
                                displayName: "Maximum Temperature UOM",
                                width: 200,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'gross_weight',
                                displayName: "Gross Weight",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'gross_weight_uom',
                                displayName: "Gross Weight UOM",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'net_weight',
                                displayName: "Net Weight",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'net_weight_uom',
                                displayName: "Net Weight UOM",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'catch_weight_flag',
                                displayName: "Catch Weight Flag",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'height',
                                displayName: "Height",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'height_uom',
                                displayName: "Height UOM",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'width',
                                displayName: "Width",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'width_uom',
                                displayName: "Width UOM",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'depth',
                                displayName: "Depth",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'depth_uom',
                                displayName: "Depth UOM",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'cube',
                                displayName: "Cube",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'cube_uom',
                                displayName: "Cube UOM",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'shelf_life',
                                displayName: "Shelf Life",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'effective_date',
                                displayName: "Effective Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'container_contents',
                                displayName: "Container Contents",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'base_unit_flag',
                                displayName: "Base Unit Flag",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'returnable_flag',
                                displayName: "Returnable Flag",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'batch_num_flag',
                                displayName: "Batch Number Flag",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'non_sold_flag',
                                displayName: "Non Sold Flag",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'recyclable_flag',
                                displayName: "Recyclable Flag",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'availability_date',
                                displayName: "Availability Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'consumer_unit_flag',
                                displayName: "Consumer Unit Flag",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'shipping_unit_flag',
                                displayName: "Shipping Unit Flag",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'invoice_unit_flag',
                                displayName: "Invoice Unit Flag",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'inner_pack_quantity_no_gtin',
                                displayName: "Inner Pack Quantity No GTIN",
                                width: 220,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'inner_pack_next_quantity_no_gtin',
                                displayName: "Inner Pack Next Quantity No GTIN",
                                width: 240,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'individual_unit_minimum',
                                displayName: "Individual Unit Minimum",
                                width: 200,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'individual_unit_minimum_uom',
                                displayName: "Individual Unit Minimum UOM",
                                width: 220,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'individual_unit_maximum',
                                displayName: "Individual Unit Maximum",
                                width: 200,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'individual_unit_maximum_uom',
                                displayName: "Individual Unit Maximum UOM",
                                width: 220,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'ingredient_list',
                                displayName: "Ingredient List",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'storage_usage',
                                displayName: "Storage Usage",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'item_benefits',
                                displayName: "Item Benefits",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'serving_suggestions',
                                displayName: "Serving Suggestions",
                                width: 160,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'gtin_score_is_food',
                                displayName: "GTIN Score is Food",
                                width: 160,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'gtin_score_minimum',
                                displayName: "GTIN Score Minimum",
                                width: 160,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'gtin_score_image',
                                displayName: "GTIN Score Image",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'gtin_score_allergen',
                                displayName: "GTIN Score Allergen",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'gtin_score_nutrient',
                                displayName: "GTIN Score Nutrient",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'gtin_score_ingredient_statement',
                                displayName: "GTIN Score Ingredient Statement",
                                width: 240,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'gtin_score_ingredient_sequence',
                                displayName: "GTIN Score Ingredient Sequence",
                                width: 240,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'gtin_score_diet_type',
                                displayName: "GTIN Score Diet Type",
                                width: 180,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'etl_run_number',
                                displayName: "Etl Run Number",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'create_date',
                                displayName: "Create Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'gdsn_status',
                                displayName: "GDSN Status",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'inactivated_date',
                                displayName: "Inactivated Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'major_release',
                                displayName: "Major Release",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'major_release_indicator',
                                displayName: "Major Release Indicator",
                                width: 180,
                                filter: {
                                    placeholder: ''
                                }
                            }
                        ]
                    };
                }


                initialize();
            }
    ])

    .directive("uiGridHeaderCell", function(){
        return {
            restrict: 'C',
            link: function(scope, element, attrs){
                element.find('[role="button"]').removeAttr('tabindex');
            }
        };
    })
   ;

})();