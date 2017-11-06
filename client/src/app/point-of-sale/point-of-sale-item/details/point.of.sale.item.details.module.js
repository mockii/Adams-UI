(function () {
    'use strict';

    angular.module('adams.point.of.sale.item.details',[])
        .config(['$stateProvider', function ($stateProvider) {

            $stateProvider
                .state('additem', {
                    url: "/pointofsale/item/add",
                    templateUrl : "point-of-sale/point-of-sale-item/details/point.of.sale.item.details.tpl.html",
                    controller : "PointOfSaleItemDetailsController as pointOfSaleItemDetailsController",
                    data : {
                        pageTitle : "Add POS Item"
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
                        }],
                        pos_item: function () {
                            return {};
                        }
                    }
                })
                .state('edititem', {
                    url: "/pointofsale/item/{posId}/details",
                    templateUrl : "point-of-sale/point-of-sale-item/details/point.of.sale.item.details.tpl.html",
                    controller : "PointOfSaleItemDetailsController as pointOfSaleItemDetailsController",
                    data : {
                        pageTitle : ""
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
                        }],
                        pos_item: ['PointOfSaleItemDetailsService', '$stateParams' ,function (PointOfSaleItemDetailsService, $stateParams) {
                            return PointOfSaleItemDetailsService.getPosItem($stateParams.posId);
                        }]
                    }
                });
            }
        ]);
})();