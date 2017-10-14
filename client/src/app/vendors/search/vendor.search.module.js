'use strict';

(function () {
    angular.module('adams.vendor.search', ['adams.vendor.search.controller','adams.vendor.search.service'])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('vendors', {
                    url: "/vendors/search",
                    templateUrl: "vendors/search/vendor.search.tpl.html",
                    controller: "VendorSearchController as vendorSearchController",
                    data: {
                        pageTitle: "Vendor Search"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'vendorSearch',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/vendor-search.css'
                                ]
                            });
                        }]
                    }
                })
            ;
        }]);
})();