(function () {
    angular.module('adams.products.details', [
        'adams.products.details.controller',
        'adams.products.details.service',
        'adams.products.product.details.controller',
        'adams.products.nutrition.controller',
        'adams.products.nutrition.service',
        'adams.products.allergen.controller',
        'adams.products.allergen.service',
        'adams.products.constants'
    ])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('productsdetails', {
                    url: "/products/{gtin}/",
                    templateUrl: "products/details/products.details.tpl.html",
                    controller: "ProductsDetailsController as productsDetailsController",
                    redirectTo: 'productsdetails.productmapping',
                    params: {
                        productSearchData: null
                    },
                    data: {
                        pageTitle: "Products"
                    },
                    resolve: {
                        productSearchData: function ($stateParams, $location, ProductsDetailsService) {
                            if($stateParams.productSearchData) {
                                return $stateParams.productSearchData;
                            } else {
                                var gtin = $stateParams.gtin || $location.path().split('/')[2];
                                return ProductsDetailsService.getProductDetails(gtin);
                            }
                        },
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'productsDetails',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/products-details.css'
                                ]
                            });
                        }]
                    }
                })
                .state('productsdetails.productmapping', {
                    url: "productdetails",
                    templateUrl: "products/details/product-details/product-details-tab-content.tpl.html",
                    controller: "ProductDetailsController as productDetailsController",
                    params: {
                        productSearchData: null
                    },
                    data: {
                        pageTitle: "Product Details"
                    },
                    resolve: {
                        multimediaData: function ($stateParams, $location, ProductsDetailsService) {
                            var gtin = $stateParams.gtin || $location.path().split('/')[2];
                            return ProductsDetailsService.getProductImages(gtin);
                        }
                    }
                })
                .state('productsdetails.nutrition', {
                    url: "nutrition",
                    templateUrl: "products/details/nutrition/nutrition-tab-content.tpl.html",
                    controller: "NutritionController as nutritionController",
                    params: {
                        productSearchData: null
                    },
                    data: {
                        pageTitle: "Nutritional Information"
                    },
                    resolve: {
                        nutritionData: function($stateParams, $location, NutritionService) {
                            var gtin = $stateParams.gtin || $location.path().split('/')[2];
                            return NutritionService.getNutritionData(gtin);
                        },
                        dietType: function($stateParams, $location, NutritionService) {
                            var gtin = $stateParams.gtin || $location.path().split('/')[2];
                            return NutritionService.getDietType(gtin);
                        },
                        marketingData: function ($stateParams, $location, NutritionService) {
                            var gtin = $stateParams.gtin || $location.path().split('/')[2];
                            return NutritionService.getMarketing(gtin);
                        }
                    }
                })
                .state('productsdetails.allergen', {
                    url: "allergen",
                    templateUrl: "products/details/allergen/allergen-tab-content.tpl.html",
                    controller: "AllergenController as allergenController",
                    params: {
                        productSearchData: null
                    },
                    data: {
                        pageTitle: "Allergen Information"
                    },
                    resolve: {
                        allergenData: function ($stateParams, $location, AllergenService) {
                            var gtin = $stateParams.gtin || $location.path().split('/')[2];
                            return AllergenService.getAllergensData(gtin);
                        }
                    }
                });
        }]);
})();