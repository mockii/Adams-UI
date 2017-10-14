'use strict';

describe('ProductDetailsController', function() {

    var Ctrl,
        Ctrl1,
        $rootScope,
        $scope,
        $location,
        $interval,
        history,
        $q,
        $httpBackend,
        productsDetailsService,
        productSearchData ={},
        logService = {},
        multimediaData,
        $state,
        mockModal;
    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.products.product.details.controller'));
    beforeEach(module('adams.products.details.service'));
    beforeEach(module('adams.products.constants'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('productSearchData', productSearchData);
            $provide.value('STGLogService', logService);
            $provide.value('multimediaData', multimediaData);
        });
    });

    beforeEach(inject(function (_$state_, _$location_, $controller, _$rootScope_, _$interval_, _$q_, _$httpBackend_, STGLogService, ProductsDetailsService, MULTIMEDIA_CONSTANTS, multimediaData) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $interval = _$interval_;
        $q = _$q_;
        $state = _$state_;
        $location = _$location_;
        $httpBackend = _$httpBackend_;
        logService = STGLogService;
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
        $scope.productsDetailsController = {};
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

        multimediaData = [{"multimedia_id":35161,"created_by":null,"created_date":null,"end_date":"1900-01-01T00:00:00","file_format":"Jpg","file_name":"00096248177413_LeftAngle.Jpg","gdsn_status":"ACTIVE","gtin":"10096248177410","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"multimedia_type":"PRODUCT_LABEL_IMAGE","provider_gln":"0096248000001","start_date":"1900-01-01T00:00:00","target_market":"US","uri":""},{"multimedia_id":35162,"created_by":null,"created_date":null,"end_date":"1900-01-01T00:00:00","file_format":"Jpg","file_name":"10096248177410_LeftAngle.Jpg","gdsn_status":"ACTIVE","gtin":"10096248177410","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"multimedia_type":"PRODUCT_IMAGE","provider_gln":"0096248000001","start_date":"1900-01-01T00:00:00","target_market":"US","uri":"http://www.fsenetportal.com/FSENetimages.nsf/0/95535FAD66745ECE85257EB400352BF7/$file/10096248177410_LeftAngle.Jpg"},{"multimedia_id":35163,"created_by":null,"created_date":null,"end_date":"1900-01-01T00:00:00","file_format":"jpg","file_name":"10096248177410_F-L130W.jpg","gdsn_status":"ACTIVE","gtin":"10096248177410","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"multimedia_type":"PRODUCT_IMAGE","provider_gln":"0096248000001","start_date":"1900-01-01T00:00:00","target_market":"US","uri":"http://www.fsenetportal.com/FSENetimages.nsf/0/277804AC0AFB2A2785257EB300305784/$file/10096248177410_F-L130W.jpg"},{"multimedia_id":35164,"created_by":null,"created_date":null,"end_date":"1900-01-01T00:00:00","file_format":"jpg","file_name":"10096248177410_F-L110W.jpg","gdsn_status":"ACTIVE","gtin":"10096248177410","inactivated_date":null,"major_release":"UPDATED","modified_by":null,"modified_date":null,"multimedia_type":"PRODUCT_IMAGE","provider_gln":"0096248000001","start_date":"1900-01-01T00:00:00","target_market":"US","uri":"http://www.fsenetportal.com/FSENetimages.nsf/0/94EF95305A9418E085257EB700286370/$file/10096248177410_F-L110W.jpg"}];

        productsDetailsService = ProductsDetailsService;

        Ctrl = $controller('ProductDetailsController', {$state: $state, $rootScope: $rootScope, $scope: $scope, $uibModalInstance : mockModal, $interval: $interval, history: history, multimediaData: multimediaData});
        Ctrl1 = $controller('ProductDetailsController', {$state: $state, $rootScope: $rootScope, $scope: $scope, $uibModalInstance : mockModal, $interval: $interval, history: history, multimediaData: null});
    }));

    it('should initialize the ProductDetailsController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should initialize the ProductDetailsController properly for multimedia null', function () {
        expect(Ctrl1).not.toBeUndefined();
    });

    it('should call opened ', function () {
        spyOn(Ctrl, 'opened').and.callThrough();
        Ctrl.opened();
        $scope.$apply();
        expect(Ctrl.opened).toHaveBeenCalled();
    });

    it('should call closed', function () {
        spyOn(Ctrl, 'closed').and.callThrough();
        Ctrl.closed();
        $scope.$apply();
        expect(Ctrl.closed).toHaveBeenCalled();
    });

    it('should call openGallery', function () {
        spyOn($scope, 'openGallery').and.callThrough();

        $scope.methods = {
            open: function () {
                return
            },
            close: function () {
                return;
            },
            next: function () {
                return;
            },
            prev: function () {
                return;
            }
        };
        $scope.openGallery();
        $scope.$apply();
        expect($scope.openGallery).toHaveBeenCalled();
    });

    it('should call closeGallery', function () {
        spyOn($scope, 'closeGallery').and.callThrough();

        $scope.methods = {
            open: function () {
                return
            },
            close: function () {
                return;
            },
            next: function () {
                return;
            },
            prev: function () {
                return;
            }
        };
        $scope.closeGallery();
        $scope.$apply();
        expect($scope.closeGallery).toHaveBeenCalled();
    });

    it('should call nextImg', function () {
        spyOn($scope, 'nextImg').and.callThrough();

        $scope.methods = {
            open: function () {
                return
            },
            close: function () {
                return;
            },
            next: function () {
                return;
            },
            prev: function () {
                return;
            }
        };
        $scope.nextImg();
        $scope.$apply();
        expect($scope.nextImg).toHaveBeenCalled();
    });

    it('should call prevImg', function () {
        spyOn($scope, 'prevImg').and.callThrough();

        $scope.methods = {
            open: function () {
                return
            },
            close: function () {
                return;
            },
            next: function () {
                return;
            },
            prev: function () {
                return;
            }
        };
        $scope.prevImg();
        $scope.$apply();
        expect($scope.prevImg).toHaveBeenCalled();
    });
});

