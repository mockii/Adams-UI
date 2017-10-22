(function () {
    'use strict';
    
    angular.module('adams.point.of.sale',['adams.point.of.sale.item.search.controller',
                                        'adams.point.of.sale.revenue.categories.controller',
                                        'adams.point.of.sale.item.categories.controller',
                                        'adams.point.of.sale.item.classes.controller',
                                        'adams.point.of.sale.system.categories.controller',
                                        'adams.point.of.sale.system.category.defaults.controller'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('pointofsale', {
                    url: "/pointofsale",
                    templateUrl : "point-of-sale/point.of.sale.tpl.html",
                    redirectTo : 'pointofsale.itemsearch',
                    data : {
                        pageTitle : "Point Of Sale"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'pointOfSale',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/point-of-sale.css'
                                ]
                            });
                        }]
                    }
                })
                .state('pointofsale.itemsearch', {
                    url: "/item/search",
                    templateUrl : "point-of-sale/point-of-sale-item/search/point.of.sale.item.search.tpl.html",
                    controller : "PointOfSaleItemSearchController as pointOfSaleItemSearchController",
                    data : {
                        pageTitle : "Point Of Sale"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'pointOfSale',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/point-of-sale.css'
                                ]
                            });
                        }]
                    }
                })
                .state('pointofsale.revenuecategories', {
                    url: "/revenueCategories",
                    templateUrl : "point-of-sale/revenue-categories/point.of.sale.revenue.categories.tpl.html",
                    controller : "PointOfSaleRevenueCategoriesController as pointOfSaleRevenueCategoriesController",
                    data : {
                        pageTitle : "Point Of Sale"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'pointOfSale',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/point-of-sale.css'
                                ]
                            });
                        }]
                    }
                })
                .state('pointofsale.itemcategories', {
                    url: "/itemCategories",
                    templateUrl : "point-of-sale/item-categories/point.of.sale.item.categories.tpl.html",
                    controller : "PointOfSaleItemCategoriesController as pointOfSaleItemCategoriesController",
                    data : {
                        pageTitle : "Point Of Sale"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'pointOfSale',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/point-of-sale.css'
                                ]
                            });
                        }]
                    }
                })
                .state('pointofsale.itemclasses', {
                    url: "/itemClasses",
                    templateUrl : "point-of-sale/item-classes/point.of.sale.item.classes.tpl.html",
                    controller : "PointOfSaleItemClassesController as pointOfSaleItemClassesController",
                    data : {
                        pageTitle : "Point Of Sale"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'pointOfSale',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/point-of-sale.css'
                                ]
                            });
                        }]
                    }
                })
                .state('pointofsale.systemcategories', {
                    url: "/systemCategories",
                    templateUrl : "point-of-sale/system-categories/point.of.sale.system.categories.tpl.html",
                    controller : "PointOfSaleSystemCategoriesController as pointOfSaleSystemCategoriesController",
                    data : {
                        pageTitle : "Point Of Sale"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'pointOfSale',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/point-of-sale.css'
                                ]
                            });
                        }]
                    }
                })
                .state('pointofsale.systemcategorydefaults', {
                    url: "/systemCategoryDefaults",
                    templateUrl : "point-of-sale/system-category-defaults/point.of.sale.system.category.defaults.tpl.html",
                    controller : "PointOfSaleSystemCategoryDefaultsController as pointOfSaleSystemCategoryDefaultsController",
                    data : {
                        pageTitle : "Point Of Sale"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'pointOfSale',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/point-of-sale.css'
                                ]
                            });
                        }]
                    }
                });
            }
        ]);
})();