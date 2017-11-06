(function () {
    'use strict';
    
    angular.module('adams.point.of.sale',['adams.point.of.sale.item.details',
                                        'adams.point.of.sale.item.search.controller',
                                        'adams.point.of.sale.item.search.service',
                                        'adams.point.of.sale.item.details.controller',
                                        'adams.point.of.sale.item.details.service',
                                        'adams.point.of.sale.system.categories.controller',
                                        'adams.point.of.sale.system.categories.service',
                                        'adams.point.of.sale.system.category.defaults.controller',
                                        'adams.point.of.sale.add.tags.controller',
                                        'adams.point.of.sale.revenue.categories.controller',
                                        'adams.point.of.sale.revenue.categories.service',
                                        'adams.add.edit.revenue.categories.modal.controller',
                                        'adams.point.of.sale.item.categories.controller',
                                        'adams.point.of.sale.item.categories.service',
                                        'adams.add.edit.item.categories.modal.controller',
                                        'adams.point.of.sale.item.classes.controller',
                                        'adams.point.of.sale.item.classes.service',
                                        'adams.add.edit.item.classes.modal.controller'
    ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('pointOfSale', {
                    url: "/pointofsale",
                    templateUrl : "point-of-sale/point.of.sale.tpl.html",
                    redirectTo : 'pointOfSale.itemSearch',
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
                .state('pointOfSale.itemSearch', {
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
                .state('pointOfSale.revenueCategories', {
                    url: "/revenuecategories",
                    templateUrl : "point-of-sale/revenue-categories/point.of.sale.revenue.categories.tpl.html",
                    controller : "PosRevenueCategoriesController as posRevenueCategoriesController",
                    data : {
                        pageTitle : "Point Of Sale - Revenue Categories"
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
                .state('pointOfSale.itemCategories', {
                    url: "/itemcategories",
                    templateUrl : "point-of-sale/item-categories/point.of.sale.item.categories.tpl.html",
                    controller : "PosItemCategoriesController as posItemCategoriesController",
                    data : {
                        pageTitle : "Point Of Sale - Item Categories"
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
                .state('pointOfSale.itemClasses', {
                    url: "/itemclasses",
                    templateUrl : "point-of-sale/item-classes/point.of.sale.item.classes.tpl.html",
                    controller : "PosItemClassesController as posItemClassesController",
                    data : {
                        pageTitle : "Point Of Sale - Item Classes"
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
                .state('pointOfSale.systemCategories', {
                    url: "/systemcategories",
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
                .state('pointOfSale.systemCategoryDefaults', {
                    url: "/systemcategorydefaults",
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