
'use strict';

describe('product.details', function() {
    var $state,
        $rootScope,
        $scope,
        $injector,
        $ocLazyLoad,
        state = 'productsdetails',
        productSearchData = {
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

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.products.details.controller');
        module('adams.products.details.service');
        module('adams.products.product.details.controller');
        module('adams.products.nutrition.controller');
        module('adams.products.nutrition.service');
        module('adams.products.allergen.controller');
        module('adams.products.allergen.service');
        module('adams.products.constants');

        module('adams.products.details', function ($provide) {
            //$provide.value('$ocLazyLoad', $ocLazyLoadMock = {});
        });

        inject(function (_$state_, $templateCache, _$rootScope_, _$injector_, $controller, _$ocLazyLoad_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $injector = _$injector_;
            $ocLazyLoad = _$ocLazyLoad_;
            $ocLazyLoad.load({
                name:'productsdetails',
                    files:['css/products-details.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });

            $templateCache.put('products/details/products.details.tpl.html', '');
        });
    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/products//');
    });

    it('should go to productsdetails', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('productsdetails').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('productsdetails').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('productsdetails').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('should go to productSearchData - else block', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location,ProductsDetailsService) {

        $injector.invoke($state.get('productsdetails').resolve['productSearchData'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        //expect($state.get('productsdetails').resolve['productsSearchData'][0]($stateParams, $location,ProductsDetailsService )).toBeDefined();
    }));

    it('should go to productSearchData - if block', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams) {

        $stateParams.productSearchData = productSearchData;
        $injector.invoke($state.get('productsdetails').resolve['productSearchData']);
        //expect($state.get('productsdetails').resolve['productsSearchData'][0]($stateParams, $location,ProductsDetailsService )).toBeDefined();
    }));

    it('productsdetails.productmapping', inject(function($state, $stateParams, $injector, $httpBackend) {
        $injector.invoke($state.get('productsdetails.productmapping').resolve['multimediaData'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
    }));

    it('productsdetails.nutrition - nutritionData', inject(function($state, $stateParams, $injector, $httpBackend) {
        $injector.invoke($state.get('productsdetails.nutrition').resolve['nutritionData'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
    }));

    it('productsdetails.productmapping - dietType', inject(function($state, $stateParams, $injector, $httpBackend) {
        $injector.invoke($state.get('productsdetails.nutrition').resolve['dietType'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
    }));

    it('productsdetails.productmapping - marketingData', inject(function($state, $stateParams, $injector, $httpBackend) {
        $injector.invoke($state.get('productsdetails.nutrition').resolve['marketingData'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
    }));

    it('productsdetails.allergen', inject(function($state, $stateParams, $injector, $httpBackend) {
        $injector.invoke($state.get('productsdetails.allergen').resolve['allergenData'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
    }));
});