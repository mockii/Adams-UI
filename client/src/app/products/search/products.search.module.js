'use strict';

(function () {
    angular.module('adams.products.search', [
        'adams.products.search.controller',
        'adams.products.search.service'
    ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('products', {
                    url: "/products",
                    templateUrl: "products/search/products.search.tpl.html",
                    controller: "ProductsSearchController as productsSearchController",
                    data: {
                        pageTitle: "Products Search"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'productsSearch',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/products-search.css'
                                ]
                            });
                        }]
                    }
                });
        }]);
})();