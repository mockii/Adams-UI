'use strict';

(function () {

    angular.module('adams', [
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
        'adams.point.of.sale'
    ])

    .config(['$urlRouterProvider', '$httpProvider',
        function($urlRouterProvider, $httpProvider) {
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

    .run(function ($rootScope) {
            //nothing needed here yet
        });

})();
