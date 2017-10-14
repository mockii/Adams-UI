'use strict';

describe('AllergenController', function() {

    var Ctrl0,
        Ctrl,
        Ctrl1,
        Ctrl2,
        Ctrl3,
        $rootScope,
        $scope,
        $location,
        $interval,
        history,
        $q,
        $httpBackend,
        productSearchData,
        allergenData,
        allergenData1,
        allergenData2,
        allergenData3,
        $state,
        mockModal;
    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.products.allergen.controller'));
    beforeEach(module('adams.products.constants'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('allergenData', allergenData);
            $provide.value('allergenData', allergenData1);
            $provide.value('allergenData', allergenData2);
        });
    });

    beforeEach(inject(function (_$state_, _$location_, $controller, _$rootScope_, _$interval_, _$q_, _$httpBackend_, allergenData) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $interval = _$interval_;
        $q = _$q_;
        $state = _$state_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        $scope.productsDetailsController = {};
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
        $scope.productsDetailsController.productSearchData = productSearchData;
        $state = {
            go: function () {
                return;
            },
            current: {
                data: {
                    pageTitle: ''
                }
            }
        };
        allergenData = [];
        allergenData1 = [{"allergen_id":880944,"allergen_agency":"FDA","allergen_level":"May Contain","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"Nuts and/or nut derivatives","allergen_type_code":"AN","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":880945,"allergen_agency":"FDA","allergen_level":"Derived From","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"Fish and/or fish derivatives","allergen_type_code":"AF","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":881172,"allergen_agency":"FDA","allergen_level":"Not Derived From","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"AS","allergen_type_code":"AS","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":881575,"allergen_agency":"FDA","allergen_level":"Not Derived From","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"Crustaceans and/or crusteacean derivatives","allergen_type_code":"AC","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":881575,"allergen_agency":"FDA","allergen_level":"Contains","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"Crustaceans and/or crusteacean derivatives","allergen_type_code":"AC","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":882145,"allergen_agency":"FDA","allergen_level":"Undeclared","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"Mulluscs and/or mullusc derivatives","allergen_type_code":"UM","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":882183,"allergen_agency":"FDA","allergen_level":"Contains","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"Milk and/or milk derivatives","allergen_type_code":"AM","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":882263,"allergen_agency":"FDA","allergen_level":"Contains","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"Eggs and/or egg derivatives","allergen_type_code":"AE","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":882368,"allergen_agency":"FDA","allergen_level":"Contains","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"Wheat and/or wheat derivatives","allergen_type_code":"UW","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":882374,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"AX","allergen_type_code":"AX","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":882699,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"BM","allergen_type_code":"BM","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":882708,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"Peanuts and/or peanut derivatives","allergen_type_code":"AP","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"},{"allergen_id":882794,"allergen_agency":"FDA","allergen_level":"Contains","allergen_relevant_data_provided":null,"allergen_specification_name":"Food Allergen Labeling and Consumer Protection Act of 2004","allergen_text":"Soybeans and/or soybean derivatives","allergen_type_code":"AY","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"10048800270664","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0048800000004","target_market":"US"}];

        allergenData2 = [{"allergen_id":580274,"allergen_agency":"FDA","allergen_level":"Undeclared","allergen_relevant_data_provided":'Y',"allergen_specification_name":"Big8","allergen_text":"AS","allergen_type_code":"AS","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":580274,"allergen_agency":"FDA","allergen_level":"Not intentionally nor inherently included","allergen_relevant_data_provided":'Y',"allergen_specification_name":"Big8","allergen_text":"AS","allergen_type_code":"AS","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"}, {"allergen_id":580274,"allergen_agency":"FDA","allergen_level":"Contains","allergen_relevant_data_provided":'Y',"allergen_specification_name":"Big8","allergen_text":"AS","allergen_type_code":"AS","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":580274,"allergen_agency":"FDA","allergen_level":"Derived From","allergen_relevant_data_provided":'Y',"allergen_specification_name":"Big8","allergen_text":"AS","allergen_type_code":"AS","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":581668,"allergen_agency":"FDA","allergen_level":"Contains","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Soybeans and/or soybean derivatives","allergen_type_code":"AY","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":581792,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Milk and/or milk derivatives","allergen_type_code":"AM","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":581964,"allergen_agency":"FDA","allergen_level":"Not Derived From","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Wheat and/or wheat derivatives","allergen_type_code":"UW","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":582220,"allergen_agency":"FDA","allergen_level":"Undeclared","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Peanuts and/or peanut derivatives","allergen_type_code":"AP","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":582394,"allergen_agency":"FDA","allergen_level":"Contains","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Crustaceans and/or crusteacean derivatives","allergen_type_code":"AC","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":582465,"allergen_agency":"FDA","allergen_level":"Contains","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Eggs and/or egg derivatives","allergen_type_code":"AE","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":583121,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Fish and/or fish derivatives","allergen_type_code":"AF","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":583143,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Nuts and/or nut derivatives","allergen_type_code":"AN","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"}];
        allergenData3 = [{"allergen_id":580274,"allergen_agency":"FDA","allergen_level":"May Contain","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"AS","allergen_type_code":"AS","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":581668,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Soybeans and/or soybean derivatives","allergen_type_code":"AY","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":581792,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Milk and/or milk derivatives","allergen_type_code":"AM","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":581964,"allergen_agency":"FDA","allergen_level":"Not intentionally nor inherently included","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Wheat and/or wheat derivatives","allergen_type_code":"UW","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":582220,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Peanuts and/or peanut derivatives","allergen_type_code":"AP","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":582394,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Crustaceans and/or crusteacean derivatives","allergen_type_code":"AC","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":582465,"allergen_agency":"FDA","allergen_level":"Contains","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Eggs and/or egg derivatives","allergen_type_code":"AE","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":583121,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Fish and/or fish derivatives","allergen_type_code":"AF","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"},{"allergen_id":583143,"allergen_agency":"FDA","allergen_level":"Free From","allergen_relevant_data_provided":null,"allergen_specification_name":"Big8","allergen_text":"Nuts and/or nut derivatives","allergen_type_code":"AN","created_by":null,"created_date":null,"gdsn_status":"ACTIVE","gtin":"00687080279108","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"provider_gln":"0687080000009","target_market":"US"}];

        Ctrl0 = $controller('AllergenController', {$state: $state, $rootScope: $rootScope, $scope: $scope, allergenData: null});
        Ctrl = $controller('AllergenController', {$state: $state, $rootScope: $rootScope, $scope: $scope, allergenData: allergenData});
        Ctrl1 = $controller('AllergenController', {$state: $state, $rootScope: $rootScope, $scope: $scope, allergenData: allergenData1});
        Ctrl2 = $controller('AllergenController', {$state: $state, $rootScope: $rootScope, $scope: $scope, allergenData: allergenData2});
        Ctrl3 = $controller('AllergenController', {$state: $state, $rootScope: $rootScope, $scope: $scope, allergenData: allergenData3});

    }));

    it('should initialize the AllergenController properly', function () {
        expect(Ctrl0).not.toBeUndefined();
        expect(Ctrl).not.toBeUndefined();
        expect(Ctrl1).not.toBeUndefined();
        expect(Ctrl2).not.toBeUndefined();
        expect(Ctrl3).not.toBeUndefined();
    });
});