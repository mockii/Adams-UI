(function () {
    angular.module('adams.costcenter.search', ['adams.costcenter.search.controller', 'adams.costcenter.search.service'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('costcenters', {
                    url: "/costcenters/search",
                    templateUrl: "costcenters/search/costcenter.search.tpl.html",
                    controller: "CostCenterSearchController as costCenterSearchController",
                    data: {
                        pageTitle: "Cost Center Search"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'costCenterSearch',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/cost-center-search.css'
                                ]
                            });
                        }]
                    }
                });
        }]);
})();