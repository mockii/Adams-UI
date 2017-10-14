'use strict';

(function () {
    angular.module('adams.associates.temp.search', ['adams.associates.temp.search.controller'])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('tempAssociates', {
                    url: "/associates/temporary/search?{time_tracking_system}",
                    templateUrl: "associates/temporary/associates.temp.search.tpl.html",
                    controller: "AssociatesSearchController as associatesSearchController",
                    data: {
                        pageTitle: "Temp Associates Search"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'associates',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/associates.css'
                                ]
                            });
                        }],
                        timeTrackingSystem: function($stateParams) {
                            return $stateParams.time_tracking_system;
                        }
                    }
                })
            ;
        }])
    ;
})();