
'use strict';

describe('ProductsSearchController', function() {
    var Ctrl,
        $rootScope,
        $scope,
        $window,
        $interval,
        statesService = {},
        logService = {},
        $uibModal,
        userName,
        appName,
        roleName,
        teamName,
        sourceSystemId,
        limit,
        page,
        searchUserName,
        searchLastName,
        searchFirstName,
        searchCostCenter,
        sort,
        index,
        productsSearchData,
        adamsConstants,
        mockProductsSearchService = {},
        mockUtils = {},
        $q,
        $httpBackend,
        mockModalDialogService,
        mockModal,
        $timeout,
        $utils,
        gridApi,
        gridOptions,
        directiveElem,
        $state;

    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.products.search.service'));
    beforeEach(module('common.services.states'));
    beforeEach(module('adams.products.search.controller'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('ProductsSearchService', mockProductsSearchService);
            $provide.value('StgStatesService', statesService);
            $provide.value('STGLogService', logService);
            $provide.value('Utils', mockUtils);
        });
    });

    function getCompiledElement($scope, $compile){
        var element = angular.element('<div ui-grid="{ data: [] }"></div>');
        var compiledElement = $compile(element)($scope);
        $scope.$digest();
        return compiledElement;
    }

    beforeEach(inject(function ($controller, $compile, _$document_, _$rootScope_, _$timeout_, _$window_, _$interval_, ProductsSearchService, ADAMS_CONSTANTS, _$q_, _$httpBackend_, Utils, STGLogService) {
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;
        userName = 'VASIRU01';
        logService = STGLogService;


        adamsConstants = ADAMS_CONSTANTS;
        mockProductsSearchService = ProductsSearchService;

        $q = _$q_;
        $httpBackend = _$httpBackend_;
        appName = 'ADAMS';
        roleName = 'Admin';
        teamName = 100007;
        sourceSystemId = 1002;
        limit = 25;
        page = 1;
        searchUserName = '';
        searchLastName = '';
        searchFirstName = '';
        searchCostCenter = '';
        sort = '';
        index = 0;
        $utils = Utils;
        productsSearchData = {
            "functional_name": "SALAD/DESSERT PLATE 7 1/8\"",
            "net_weight_uom": "LB",
            "brand_owner": "Bon Chef  Inc.",
            "height_uom": "IN",
            "manufacturer_name": "Bon Chef  Inc.",
            "gtin_score_ingredient_sequence": "NO",
            "_lw_data_source_collection_s": "adamsProductsCI",
            "returnable_flag": null,
            "cube_uom": "IN",
            "catch_weight_flag": "N",
            "shipping_unit_flag": "Y",
            "gdsn_status": "ACTIVE",
            "minimum_temperature_uom": null,
            "_lw_data_source_type_s": "lucid.jdbc/jdbc",
            "depth_uom": "IN",
            "_lw_data_source_s": "Adams-CI",
            "minimum_temperature": null,
            "cube": 7.125,
            "maximum_temperature": null,
            "storage_usage": null,
            "product_name": "SALAD/DESSERT PLATE 7 1/8\"",
            "modified_date": null,
            "packaging_hierarchy": "EA",
            "gtin_score_allergen": "NO",
            "gtin_score_minimum": "YES",
            "maximum_temperature_uom": null,
            "target_market": "US",
            "gtin_score_image": "NO",
            "info_provider": "Bon Chef Inc.",
            "width_uom": "IN",
            "gtin_score_ingredient_statement": "NO",
            "gross_weight": 1,
            "base_unit_flag": "Y",
            "width": 0.1,
            "gtin_score_nutrient": "NO",
            "major_release": "UPDATED",
            "ingredient_list": null,
            "description": "SALAD/DESSERT PLATE 7 1/8\"",
            "invoice_unit_flag": "Y",
            "orderable_flag": "Y",
            "gross_weight_uom": "LB",
            "height": 7.125,
            "global_category_description": "Serving Trays",
            "_lw_batch_id_s": "1b25a9731ec64497b4ff029728f66218",
            "gtin_score_diet_type": "NO",
            "gtin": "00804476005343",
            "net_weight": 1,
            "consumer_unit_flag": "N",
            "gtin_score_is_food": "NO",
            "brand_name": "BON CHEF",
            "_lw_data_source_pipeline_s": "adamsProductsCI-default",
            "RECYCLABLE_FLAG": null,
            "LONG_DESCRIPTION": "PLATE",
            "DEPTH": 0.1,
            "id": "3423cd26-2d9d-4c54-90aa-7851992487f8",
            "manufacturer_item_id": 137582,
            "etl_run_number": 20170711,
            "provider_gln": "0804476000003",
            "global_category_code": "10002159",
            "bo_gln": "804476000003",
            "create_date": "2016-12-21T00:00:00Z",
            "major_release_indicator": 1,
            "effective_date": "2013-12-03T00:00:00Z",
            "minimum": null,
            "manufacturer_gln": "804476000003",
            "_version_": 1579160443931328500,
            "score": 1,
            "item_benefits": null,
            "serving_suggestions": null,
            "batch_num_flag": null,
            "inner_pack_quantity_no_gtin": 6,
            "shelf_life": null,
            "individual_unit_minimum": null,
            "ingredient_list_es": null,
            "container_contents": null,
            "benefits_es": null,
            "serving_suggestions_es": null,
            "individual_unit_minimum_uom": null,
            "product_name_es": null,
            "individual_unit_maximum": null,
            "expanded_description_es": null,
            "description_es": null,
            "storage_usage_es": null,
            "functional_name_es": null,
            "individual_unit_maximum_uom": null,
            "long_description_es": null,
            "expanded_description": "PLATE",
            "non_sold_flag": null,
            "availability_date": null,
            "inner_pack_next_quantity_no_gtin": null,
            "attr_minimum_": ["1080CARM"],
            "attr_manufacturer_gln_": null,
            "recyclable_flag": null,
            "long_description": "PLATE",
            "depth": 0.1
        };

        gridOptions = {
            data: [
                { col1: 'col1', col2: 'col2' }
            ],
            onRegisterApi: function( api ){
                gridApi = api;
            }
        };

        gridApi = {
            grid: {
                appScope: {
                    showProductsSearchData: jasmine.createSpy('gridApi.grid.appScope.showProductsSearchData')
                }
            }
        };

        statesService.goToState = function(state, params){
            // spyOn($state, 'go');
            return;
        };

        $state = { go: function() { return; }};

        mockUtils = {
            blockUI: {
                instances: {
                    get: function () {
                        return {
                            start : function(){
                                return;
                            },
                            stop : function(){
                                return;
                            }
                        }
                    }
                }
            },

            startBlockUI: function() {
                return {}
            },

            stopBlockUI: function() {
                return {}
            },

            initializeSearchFields: function () {
                return {}
            },

            getGridSorts: function () {
                return {'sorts': []};
            }
        };

        mockModalDialogService = {
            result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function( result ) {
                this.result.confirmCallBack( result );
            },
            dismiss: function( type ) {
                this.result.cancelCallback( type );
            }
        };

        mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss')
        };

        mockProductsSearchService.getAllProductsSearchDetails = function(limit, page, searchInput, sort) {
            var deferred = $q.defer();
            var response = {
                "metadata": {
                    "version": "1.0.0",
                    "status": "Success",
                    "http_status_code": "OK",
                    "resultCount": "235759"
                },
                "data": [{
                    "functional_name": "SALAD/DESSERT PLATE 7 1/8\"",
                    "net_weight_uom": "LB",
                    "brand_owner": "Bon Chef  Inc.",
                    "height_uom": "IN",
                    "manufacturer_name": "Bon Chef  Inc.",
                    "gtin_score_ingredient_sequence": "NO",
                    "_lw_data_source_collection_s": "adamsProductsCI",
                    "returnable_flag": null,
                    "cube_uom": "IN",
                    "catch_weight_flag": "N",
                    "shipping_unit_flag": "Y",
                    "gdsn_status": "ACTIVE",
                    "minimum_temperature_uom": null,
                    "_lw_data_source_type_s": "lucid.jdbc/jdbc",
                    "depth_uom": "IN",
                    "_lw_data_source_s": "Adams-CI",
                    "minimum_temperature": null,
                    "cube": 7.125,
                    "maximum_temperature": null,
                    "storage_usage": null,
                    "product_name": "SALAD/DESSERT PLATE 7 1/8\"",
                    "modified_date": null,
                    "packaging_hierarchy": "EA",
                    "gtin_score_allergen": "NO",
                    "gtin_score_minimum": "YES",
                    "maximum_temperature_uom": null,
                    "target_market": "US",
                    "gtin_score_image": "NO",
                    "info_provider": "Bon Chef Inc.",
                    "width_uom": "IN",
                    "gtin_score_ingredient_statement": "NO",
                    "gross_weight": 1,
                    "base_unit_flag": "Y",
                    "width": 0.1,
                    "gtin_score_nutrient": "NO",
                    "major_release": "UPDATED",
                    "ingredient_list": null,
                    "description": "SALAD/DESSERT PLATE 7 1/8\"",
                    "invoice_unit_flag": "Y",
                    "orderable_flag": "Y",
                    "gross_weight_uom": "LB",
                    "height": 7.125,
                    "global_category_description": "Serving Trays",
                    "_lw_batch_id_s": "1b25a9731ec64497b4ff029728f66218",
                    "gtin_score_diet_type": "NO",
                    "gtin": "00804476005343",
                    "net_weight": 1,
                    "consumer_unit_flag": "N",
                    "gtin_score_is_food": "NO",
                    "brand_name": "BON CHEF",
                    "_lw_data_source_pipeline_s": "adamsProductsCI-default",
                    "RECYCLABLE_FLAG": null,
                    "LONG_DESCRIPTION": "PLATE",
                    "DEPTH": 0.1,
                    "id": "3423cd26-2d9d-4c54-90aa-7851992487f8",
                    "manufacturer_item_id": 137582,
                    "etl_run_number": 20170711,
                    "provider_gln": "0804476000003",
                    "global_category_code": "10002159",
                    "bo_gln": "804476000003",
                    "create_date": "2016-12-21T00:00:00Z",
                    "major_release_indicator": 1,
                    "effective_date": "2013-12-03T00:00:00Z",
                    "minimum": null,
                    "manufacturer_gln": "804476000003",
                    "_version_": 1579160443931328500,
                    "score": 1,
                    "item_benefits": null,
                    "serving_suggestions": null,
                    "batch_num_flag": null,
                    "inner_pack_quantity_no_gtin": 6,
                    "shelf_life": null,
                    "individual_unit_minimum": null,
                    "ingredient_list_es": null,
                    "container_contents": null,
                    "benefits_es": null,
                    "serving_suggestions_es": null,
                    "individual_unit_minimum_uom": null,
                    "product_name_es": null,
                    "individual_unit_maximum": null,
                    "expanded_description_es": null,
                    "description_es": null,
                    "storage_usage_es": null,
                    "functional_name_es": null,
                    "individual_unit_maximum_uom": null,
                    "long_description_es": null,
                    "expanded_description": "PLATE",
                    "non_sold_flag": null,
                    "availability_date": null,
                    "inner_pack_next_quantity_no_gtin": null,
                    "attr_minimum_": ["1080CARM"],
                    "attr_manufacturer_gln_": null,
                    "recyclable_flag": null,
                    "long_description": "PLATE",
                    "depth": 0.1
                }]
            };
            deferred.resolve(response);
            return deferred.promise;
        };

        Ctrl = $controller('ProductsSearchController', {$scope: $scope, $state: $state, ProductsSearchService: mockProductsSearchService, StgStatesService: statesService});

        $scope.myData = [{firstName: "Cox", lastName: "Carney", company: "Enormo", employed: true}];

        // var element = '<div ui-i18n="en" class="grid ui-grid ng-isolate-scope grid1507231739530" id="grid1" ui-grid="{ data: [] }"><div class="ui-grid-contents-wrapper"><!-- ngIf: grid.options.enableGridMenu --><!-- ngIf: grid.hasLeftContainer() --><div role="grid" ui-grid-one-bind-id-grid="\'grid-container\'" class="ui-grid-render-container ng-isolate-scope ui-grid-render-container-body" ng-style="{ \'margin-left\': colContainer.getMargin(\'left\') + \'px\', \'margin-right\': colContainer.getMargin(\'right\') + \'px\' }" ui-grid-render-container="" container-id="\'body\'" col-container-name="\'body\'" row-container-name="\'body\'" bind-scroll-horizontal="true" bind-scroll-vertical="true" enable-horizontal-scrollbar="grid.options.enableHorizontalScrollbar" enable-vertical-scrollbar="grid.options.enableVerticalScrollbar" id="1507231739530-grid-container" style="margin-left: 0px; margin-right: 0px;"><!-- All of these dom elements are replaced in place --><div role="rowgroup" class="ui-grid-header ng-scope"><!-- theader --><div class="ui-grid-top-panel"><div class="ui-grid-header-viewport"><div class="ui-grid-header-canvas"><div class="ui-grid-header-cell-wrapper" ng-style="colContainer.headerCellWrapperStyle()"><div role="row" class="ui-grid-header-cell-row"><!-- ngRepeat: col in colContainer.renderedColumns track by col.uid --><div class="ui-grid-header-cell ui-grid-clearfix ng-scope ng-isolate-scope ui-grid-coluiGrid-0004" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell="" col="col" render-index="$index"><div role="columnheader" ng-class="{ \'sortable\': sortable }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \'-header-text \' + col.uid + \'-sortdir-text\'" aria-sort="none" class="ng-scope sortable" aria-labelledby="1507231739530-uiGrid-0004-header-text 1507231739530-uiGrid-0004-sortdir-text"><div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex"><span class="ui-grid-header-cell-label ng-binding" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'" id="1507231739530-uiGrid-0004-header-text">First Name</span> <span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="Sort None" class="ui-grid-invisible" id="1507231739530-uiGrid-0004-sortdir-text"><i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="" aria-hidden="true" class="ui-grid-icon-blank"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number ng-binding ui-grid-invisible">1</sub></span></div><!-- ngIf: grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false --><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button ng-scope" ng-if="grid.options.enableColumnMenus &amp;&amp; !col.isRowHeader  &amp;&amp; col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true" id="1507231739530-uiGrid-0004-menu-button" aria-label="Column Menu"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><!-- end ngIf: grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false --><div ui-grid-filter=""></div></div></div><!-- end ngRepeat: col in colContainer.renderedColumns track by col.uid --><div class="ui-grid-header-cell ui-grid-clearfix ng-scope ng-isolate-scope ui-grid-coluiGrid-0005" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell="" col="col" render-index="$index"><div role="columnheader" ng-class="{ \'sortable\': sortable }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \'-header-text \' + col.uid + \'-sortdir-text\'" aria-sort="none" class="ng-scope sortable" aria-labelledby="1507231739530-uiGrid-0005-header-text 1507231739530-uiGrid-0005-sortdir-text"><div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex"><span class="ui-grid-header-cell-label ng-binding" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'" id="1507231739530-uiGrid-0005-header-text">Last Name</span> <span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="Sort None" class="ui-grid-invisible" id="1507231739530-uiGrid-0005-sortdir-text"><i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="" aria-hidden="true" class="ui-grid-icon-blank"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number ng-binding ui-grid-invisible">1</sub></span></div><!-- ngIf: grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false --><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button ng-scope" ng-if="grid.options.enableColumnMenus &amp;&amp; !col.isRowHeader  &amp;&amp; col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true" id="1507231739530-uiGrid-0005-menu-button" aria-label="Column Menu"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><!-- end ngIf: grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false --><div ui-grid-filter=""></div></div></div><!-- end ngRepeat: col in colContainer.renderedColumns track by col.uid --><div class="ui-grid-header-cell ui-grid-clearfix ng-scope ng-isolate-scope ui-grid-coluiGrid-0006" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell="" col="col" render-index="$index"><div role="columnheader" ng-class="{ \'sortable\': sortable }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \'-header-text \' + col.uid + \'-sortdir-text\'" aria-sort="none" class="ng-scope sortable" aria-labelledby="1507231739530-uiGrid-0006-header-text 1507231739530-uiGrid-0006-sortdir-text"><div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex"><span class="ui-grid-header-cell-label ng-binding" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'" id="1507231739530-uiGrid-0006-header-text">Company</span> <span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="Sort None" class="ui-grid-invisible" id="1507231739530-uiGrid-0006-sortdir-text"><i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="" aria-hidden="true" class="ui-grid-icon-blank"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number ng-binding ui-grid-invisible">1</sub></span></div><!-- ngIf: grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false --><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button ng-scope" ng-if="grid.options.enableColumnMenus &amp;&amp; !col.isRowHeader  &amp;&amp; col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true" id="1507231739530-uiGrid-0006-menu-button" aria-label="Column Menu"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><!-- end ngIf: grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false --><div ui-grid-filter=""></div></div></div><!-- end ngRepeat: col in colContainer.renderedColumns track by col.uid --><div class="ui-grid-header-cell ui-grid-clearfix ng-scope ng-isolate-scope ui-grid-coluiGrid-0007" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell="" col="col" render-index="$index"><div role="columnheader" ng-class="{ \'sortable\': sortable }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \'-header-text \' + col.uid + \'-sortdir-text\'" aria-sort="none" class="ng-scope sortable" aria-labelledby="1507231739530-uiGrid-0007-header-text 1507231739530-uiGrid-0007-sortdir-text"><div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex"><span class="ui-grid-header-cell-label ng-binding" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'" id="1507231739530-uiGrid-0007-header-text">Employed</span> <span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="Sort None" class="ui-grid-invisible" id="1507231739530-uiGrid-0007-sortdir-text"><i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="" aria-hidden="true" class="ui-grid-icon-blank"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number ng-binding ui-grid-invisible">1</sub></span></div><!-- ngIf: grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false --><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button ng-scope ui-grid-column-menu-button-last-col" ng-if="grid.options.enableColumnMenus &amp;&amp; !col.isRowHeader  &amp;&amp; col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true" id="1507231739530-uiGrid-0007-menu-button" aria-label="Column Menu"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><!-- end ngIf: grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false --><div ui-grid-filter=""></div></div></div><!-- end ngRepeat: col in colContainer.renderedColumns track by col.uid --></div></div></div></div></div></div><div role="rowgroup" class="ui-grid-viewport ng-isolate-scope" ng-style="colContainer.getViewportStyle()" ui-grid-viewport="" style="overflow: auto;"><!-- tbody --><div class="ui-grid-canvas"><!-- ngRepeat: (rowRenderIndex, row) in rowContainer.renderedRows track by $index --><div ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by $index" class="ui-grid-row ng-scope" ng-style="Viewport.rowStyle(rowRenderIndex)"><div role="row" ui-grid-row="row" row-render-index="rowRenderIndex" class="ng-isolate-scope"><!-- ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0004" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-0-uiGrid-0004-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Cox</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0005" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-0-uiGrid-0005-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Carney</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0006" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-0-uiGrid-0006-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Enormo</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0007" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-0-uiGrid-0007-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">true</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --></div></div><!-- end ngRepeat: (rowRenderIndex, row) in rowContainer.renderedRows track by $index --><div ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by $index" class="ui-grid-row ng-scope" ng-style="Viewport.rowStyle(rowRenderIndex)"><div role="row" ui-grid-row="row" row-render-index="rowRenderIndex" class="ng-isolate-scope"><!-- ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0004" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-1-uiGrid-0004-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Lorraine</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0005" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-1-uiGrid-0005-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Wise</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0006" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-1-uiGrid-0006-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Comveyer</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0007" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-1-uiGrid-0007-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">false</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --></div></div><!-- end ngRepeat: (rowRenderIndex, row) in rowContainer.renderedRows track by $index --><div ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by $index" class="ui-grid-row ng-scope" ng-style="Viewport.rowStyle(rowRenderIndex)"><div role="row" ui-grid-row="row" row-render-index="rowRenderIndex" class="ng-isolate-scope"><!-- ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0004" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-2-uiGrid-0004-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Nancy</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0005" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-2-uiGrid-0005-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Waters</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0006" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-2-uiGrid-0006-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Fuelton</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0007" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-2-uiGrid-0007-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">false</div></div><!-- end ngRepeat: (colRenderIndex, col) in colContainer.renderedColumns track by col.uid --></div></div><!-- end ngRepeat: (rowRenderIndex, row) in rowContainer.renderedRows track by $index --></div></div><!-- ngIf: colContainer.needsHScrollbarPlaceholder() --><!-- ngIf: grid.options.showColumnFooter --></div><!-- ngIf: grid.hasRightContainer() --><!-- ngIf: grid.options.showGridFooter --><!-- ngIf: grid.options.enableColumnMenus --><div class="ui-grid-column-menu ng-scope" ui-grid-column-menu="" ng-if="grid.options.enableColumnMenus"><!-- ngIf: shown --></div><!-- end ngIf: grid.options.enableColumnMenus --></div></div>';
        directiveElem = $compile('<div ui-i18n="en" class="grid ui-grid ng-isolate-scope" id="grid1" ui-grid="{ data: myData }"><div class="ui-grid-contents-wrapper"><div role="grid" ui-grid-one-bind-id-grid="\'grid-container\'" class="ui-grid-render-container ng-isolate-scope ui-grid-render-container-body" ng-style="{ \'margin-left\': colContainer.getMargin(\'left\') + \'px\', \'margin-right\': colContainer.getMargin(\'right\') + \'px\' }" ui-grid-render-container="" container-id="\'body\'" col-container-name="\'body\'" row-container-name="\'body\'" bind-scroll-horizontal="true" bind-scroll-vertical="true" enable-horizontal-scrollbar="grid.options.enableHorizontalScrollbar" enable-vertical-scrollbar="grid.options.enableVerticalScrollbar" id="1507231739530-grid-container" style="margin-left: 0px; margin-right: 0px;"><div role="rowgroup" class="ui-grid-header ng-scope"><div class="ui-grid-top-panel"><div class="ui-grid-header-viewport"><div class="ui-grid-header-canvas"><div class="ui-grid-header-cell-wrapper" ng-style="colContainer.headerCellWrapperStyle()"><div role="row" class="ui-grid-header-cell-row"><div class="ui-grid-header-cell ui-grid-clearfix ng-scope ng-isolate-scope ui-grid-coluiGrid-0004" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell="" col="col" render-index="$index"><div role="columnheader" ng-class="{ \'sortable\': sortable }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \'-header-text \' + col.uid + \'-sortdir-text\'" aria-sort="none" class="ng-scope sortable" aria-labelledby="1507231739530-uiGrid-0004-header-text 1507231739530-uiGrid-0004-sortdir-text"><div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex"><span class="ui-grid-header-cell-label ng-binding" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'" id="1507231739530-uiGrid-0004-header-text">First Name</span> <span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="Sort None" class="ui-grid-invisible" id="1507231739530-uiGrid-0004-sortdir-text"><i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="" aria-hidden="true" class="ui-grid-icon-blank"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number ng-binding ui-grid-invisible">1</sub></span></div><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button ng-scope" ng-if="grid.options.enableColumnMenus &amp;&amp; !col.isRowHeader  &amp;&amp; col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true" id="1507231739530-uiGrid-0004-menu-button" aria-label="Column Menu"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><div ui-grid-filter=""></div></div></div><div class="ui-grid-header-cell ui-grid-clearfix ng-scope ng-isolate-scope ui-grid-coluiGrid-0005" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell="" col="col" render-index="$index"><div role="columnheader" ng-class="{ \'sortable\': sortable }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \'-header-text \' + col.uid + \'-sortdir-text\'" aria-sort="none" class="ng-scope sortable" aria-labelledby="1507231739530-uiGrid-0005-header-text 1507231739530-uiGrid-0005-sortdir-text"><div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex"><span class="ui-grid-header-cell-label ng-binding" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'" id="1507231739530-uiGrid-0005-header-text">Last Name</span> <span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="Sort None" class="ui-grid-invisible" id="1507231739530-uiGrid-0005-sortdir-text"><i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="" aria-hidden="true" class="ui-grid-icon-blank"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number ng-binding ui-grid-invisible">1</sub></span></div><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button ng-scope" ng-if="grid.options.enableColumnMenus &amp;&amp; !col.isRowHeader  &amp;&amp; col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true" id="1507231739530-uiGrid-0005-menu-button" aria-label="Column Menu"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><div ui-grid-filter=""></div></div></div><div class="ui-grid-header-cell ui-grid-clearfix ng-scope ng-isolate-scope ui-grid-coluiGrid-0006" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell="" col="col" render-index="$index"><div role="columnheader" ng-class="{ \'sortable\': sortable }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \'-header-text \' + col.uid + \'-sortdir-text\'" aria-sort="none" class="ng-scope sortable" aria-labelledby="1507231739530-uiGrid-0006-header-text 1507231739530-uiGrid-0006-sortdir-text"><div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex"><span class="ui-grid-header-cell-label ng-binding" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'" id="1507231739530-uiGrid-0006-header-text">Company</span> <span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="Sort None" class="ui-grid-invisible" id="1507231739530-uiGrid-0006-sortdir-text"><i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="" aria-hidden="true" class="ui-grid-icon-blank"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number ng-binding ui-grid-invisible">1</sub></span></div><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button ng-scope" ng-if="grid.options.enableColumnMenus &amp;&amp; !col.isRowHeader  &amp;&amp; col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true" id="1507231739530-uiGrid-0006-menu-button" aria-label="Column Menu"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><div ui-grid-filter=""></div></div></div><div class="ui-grid-header-cell ui-grid-clearfix ng-scope ng-isolate-scope ui-grid-coluiGrid-0007" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell="" col="col" render-index="$index"><div role="columnheader" ng-class="{ \'sortable\': sortable }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \'-header-text \' + col.uid + \'-sortdir-text\'" aria-sort="none" class="ng-scope sortable" aria-labelledby="1507231739530-uiGrid-0007-header-text 1507231739530-uiGrid-0007-sortdir-text"><div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex"><span class="ui-grid-header-cell-label ng-binding" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'" id="1507231739530-uiGrid-0007-header-text">Employed</span> <span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="Sort None" class="ui-grid-invisible" id="1507231739530-uiGrid-0007-sortdir-text"><i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="" aria-hidden="true" class="ui-grid-icon-blank"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number ng-binding ui-grid-invisible">1</sub></span></div><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button ng-scope ui-grid-column-menu-button-last-col" ng-if="grid.options.enableColumnMenus &amp;&amp; !col.isRowHeader  &amp;&amp; col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true" id="1507231739530-uiGrid-0007-menu-button" aria-label="Column Menu"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><div ui-grid-filter=""></div></div></div></div></div></div></div></div></div><div role="rowgroup" class="ui-grid-viewport ng-isolate-scope" ng-style="colContainer.getViewportStyle()" ui-grid-viewport="" style="overflow: auto;"><div class="ui-grid-canvas"><div ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by $index" class="ui-grid-row ng-scope" ng-style="Viewport.rowStyle(rowRenderIndex)"><div role="row" ui-grid-row="row" row-render-index="rowRenderIndex" class="ng-isolate-scope"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0004" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-0-uiGrid-0004-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Cox</div></div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0005" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-0-uiGrid-0005-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Carney</div></div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0006" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-0-uiGrid-0006-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Enormo</div></div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0007" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-0-uiGrid-0007-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">true</div></div></div></div><div ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by $index" class="ui-grid-row ng-scope" ng-style="Viewport.rowStyle(rowRenderIndex)"><div role="row" ui-grid-row="row" row-render-index="rowRenderIndex" class="ng-isolate-scope"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0004" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-1-uiGrid-0004-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Lorraine</div></div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0005" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-1-uiGrid-0005-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Wise</div></div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0006" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-1-uiGrid-0006-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Comveyer</div></div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0007" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-1-uiGrid-0007-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">false</div></div></div></div><div ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by $index" class="ui-grid-row ng-scope" ng-style="Viewport.rowStyle(rowRenderIndex)"><div role="row" ui-grid-row="row" row-render-index="rowRenderIndex" class="ng-isolate-scope"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0004" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-2-uiGrid-0004-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Nancy</div></div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0005" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-2-uiGrid-0005-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Waters</div></div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0006" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-2-uiGrid-0006-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">Fuelton</div></div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell ng-scope ui-grid-coluiGrid-0007" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="gridcell" ui-grid-cell="" id="1507231739530-2-uiGrid-0007-cell"><div class="ui-grid-cell-contents ng-binding ng-scope">false</div></div></div></div></div></div></div><div class="ui-grid-column-menu ng-scope" ui-grid-column-menu="" ng-if="grid.options.enableColumnMenus"></div></div></div>')($scope);
        console.log(directiveElem);
        $scope.$digest();
    }));

    it('should initialize the ProductsSearchController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        expect(Ctrl.showProductsSearchData).toEqual(gridApi.grid.appScope.showProductsSearchData);
    });

    it('should call showProductsSearchData', function() {
        //spyOn($state, 'go');
        spyOn(statesService, 'goToState');
        spyOn(Ctrl, 'showProductsSearchData').and.callThrough();
        Ctrl.showProductsSearchData(productsSearchData);
        $scope.$apply();
        expect(statesService.goToState).toHaveBeenCalledWith('productsdetails', {
            productsSearchData: productsSearchData,
            gtin: productsSearchData.gtin
        });
        expect(Ctrl.showProductsSearchData).toHaveBeenCalled();
    });

    it('should call uiGridSelectedRows', function() {
        $rootScope.$broadcast('uiGridSelectedRows');
    });

    it('should call getGridData ', function() {
        Ctrl.getGridData();
    });
});