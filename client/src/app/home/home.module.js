'use strict';

(function () {

    angular.module('adams.home', [])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('home', {
                    url: "/home",
                    templateUrl: "home/home.tpl.html",
                    data: {
                        pageTitle: "Adams Home"
                    }
                    // resolve: {
                    //     deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    //         return $ocLazyLoad.load({
                    //             name: 'home',
                    //             insertBefore: '#ng_load_plugins_after'
                    //         });
                    //     }]
                    // }
                });
            }
        ]);
})();