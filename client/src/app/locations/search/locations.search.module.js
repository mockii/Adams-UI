'use strict';

(function () {
    angular.module('adams.locations.search', [
        'adams.locations.search.controller',
        'adams.locations.search.service',
        'adams.locations.status.change.controller',
        'adams.locations.hours.controller',
        'adams.locations.search.constants'
    ])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('locations', {
                    url: "/locations/search",
                    templateUrl: "locations/search/locations.search.tpl.html",
                    controller: "LocationsSearchController as locationsSearchController",
                    data: {
                        pageTitle: "Locations Search"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'locationsSearch',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/locations-search.css'
                                ]
                            });
                        }]
                    }
                })
            ;
        }]);
})();