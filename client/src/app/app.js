'use strict';

(function () {

    var adams = angular.module('adams', [
        'STGWebUtils',
        'templates.app',
        'adams.controller',
        'adams.service',
        'adams.utils',
        'adams.common.services',
        'adams.common.filters',
        'adams.common.directives',
        'adams.common.constants',
        'adams.common.url',
        'adams.costcenter.search',
        'adams.costcenter.details',
        'adams.home',
        'adams.user.administration',
        'adams.vendor.search',
        'adams.vendor.details',
        'adams.vendor.markets',
        'adams.secured.objects',
        'adams.associates.temp.search',
        'adams.add.associates.temp',
        'adams.products.search',
        'adams.products.details',
        'adams.book.of.record',
        'thatisuday.ng-image-gallery',
        'adams.locations.search',
        'adams.locations.details',
        'scrollable-table',
        'adams.access.control',
        'adams.point.of.sale',
        'adams.teams',
        'adams.communication.preferences'
    ]);

    adams.config(['$urlRouterProvider', '$httpProvider', '$stateProvider',
        function($urlRouterProvider, $httpProvider, $stateProvider) {

            adams.stateProvider = $stateProvider;

            $httpProvider.defaults.cache = false;
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            // disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
            $urlRouterProvider.otherwise(function($injector){
                $injector.get('$state').go('home');
            });
        }
    ])

    .run(['$rootScope', 'PointOfSaleSystemCategoriesService',
        function ($rootScope, PointOfSaleSystemCategoriesService) {

            var systemCategoryState = {},
                systemCategory = {},
                systemCategoriesResponse = [],
                systemCategoriesPromise = PointOfSaleSystemCategoriesService.getAllSystemCategories();

            systemCategoriesPromise.then(function (response) {
                if(response !== 'error'){
                    systemCategoriesResponse = response.data;
                    for(var index = 0; index < systemCategoriesResponse.length; index++){
                        systemCategory = systemCategoriesResponse[index];
                        systemCategoryState = {};
                        systemCategoryState.name = 'pointOfSale.systemCategories.' + systemCategory.name;
                        systemCategoryState.url= '/' + systemCategory.name.toLowerCase();
                        systemCategoryState.templateUrl = 'point-of-sale/system-categories/point.of.sale.system.category.content.tpl.html';
                        systemCategoryState.controller = 'PointOfSaleSystemCategoryContentController as pointOfSaleSystemCategoryContentController';
                        systemCategoryState.data = { category : systemCategory.name };
                        adams.stateProvider.state(systemCategoryState);
                    }
                }
            }, function (error) {
                systemCategoriesResponse = [];
            });
        }]);

})();
