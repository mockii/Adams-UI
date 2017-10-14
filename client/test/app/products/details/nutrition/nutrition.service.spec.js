
'use strict';

describe('NutritionService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        urlSpace,
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

    beforeEach(module('common.url'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('common.modules.logging'));
    beforeEach(module('adams.products.nutrition.service'));

    beforeEach(inject(function($rootScope, _$httpBackend_, NutritionService, _$q_, ADAMS_URL_SPACE, $log){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = NutritionService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;
        $log = $log;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should getNutritionData  Info', function(){
        var gtin = '100',
            url = urlSpace.urls.local.nutrients.replace('{gtin}', gtin);
        var responseData = {
            data: {
                data: [{}]
            }
        };
        $httpBackend.expectGET(url).respond(responseData);
        sampleSvcObj.getNutritionData(gtin).then(function(response) {
            expect(response).toEqual(responseData.data);
        });
        $httpBackend.flush();
    });

    it('should throw error getNutritionData Info', function(){
        var gtin = '100',
            url = urlSpace.urls.local.nutrients.replace('{gtin}', gtin);
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getNutritionData(gtin).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should getDietType Info', function(){
        var gtin = '100',
            url = urlSpace.urls.local.dietTypes.replace('{gtin}', gtin);
        var responseData = {
            data: {
                data: [{}]
            }
        };
        $httpBackend.expectGET(url).respond(responseData);
        sampleSvcObj.getDietType(gtin).then(function(response) {
            expect(response).toEqual(responseData.data);
        });
        $httpBackend.flush();
    });

    it('should throw error getDietType Info', function(){
        var gtin = '100',
            url = urlSpace.urls.local.dietTypes.replace('{gtin}', gtin);
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getDietType(gtin).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should getMarketing Info', function(){
        var gtin = '100',
            url = urlSpace.urls.local.marketing.replace('{gtin}', gtin);
        var responseData = {
            data: {
                data: [{}]
            }
        };
        $httpBackend.expectGET(url).respond(responseData);
        sampleSvcObj.getMarketing(gtin).then(function(response) {
            expect(response).toEqual(undefined);
        });
        $httpBackend.flush();
    });

    it('should throw error getMarketing Info', function(){
        var gtin = '100',
            url = urlSpace.urls.local.marketing.replace('{gtin}', gtin);
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getMarketing(gtin).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });
});
