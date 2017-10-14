(function () {
    angular.module('adams.locations.details', [
        'adams.locations.details.constants',
        'adams.locations.details.controller',
        'adams.locations.details.service',
        'adams.locations.costcenters.controller',
        'adams.locations.costcenters.service',
        'adams.locations.operating.hours.controller',
        'adams.locations.costcenters.status.change.controller',
        'adams.locations.add.cost.center.mapping.controller',
        'adams.locations.stations.controller',
        'adams.locations.stations.service',
        'adams.locations.stations.status.change.controller',
        'adams.locations.add.stations.mapping.controller'
    ])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('locationsdetails', {
                    url: "/locations/{locationCode}",
                    templateUrl: "locations/details/locations.details.tpl.html",
                    controller: "LocationsDetailsController as locationsDetailsController",
                    redirectTo: 'locationsdetails.costcenters',
                    params: {
                        locationsSearchData: null,
                        action:''
                    },
                    data: {
                        pageTitle: "Locations",
                        backState: 'locations'
                    },
                    resolve: {
                        action: function($stateParams, $location) {
                            // Default action would be edit , if page has been reloaded from details page
                            if(($location.path() === '/locations/create/costcenters' || $location.path() === '/locations/create') &&
                                $stateParams.locationCode === 'create'){
                                $stateParams.action = 'add';
                            }
                            return $stateParams.action || 'edit';
                        },
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'locationsDetails',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/locations-details.css'
                                ]
                            });
                        }]
                    }
                })
                .state('locationsdetails.costcenters', {
                    url: "/costcenters",
                    templateUrl: "locations/details/costcenters/locations-cost-center-mapping-tab-content.tpl.html",
                    controller: "LocationsCostCenterMappingController as locationsCostCenterMappingController",
                    params: {
                        locationsSearchData: null,
                        action:''
                    },
                    data: {
                        pageTitle: "Location Details",
                        backState: 'locations'
                    },
                    resolve: {
                        action: function($stateParams, $location) {
                            if(($location.path() === '/locations/create/costcenters' || $location.path() === '/locations/create') &&
                                $stateParams.locationCode === 'create'){
                                $stateParams.action = 'add';
                            }
                            return $stateParams.action || 'edit';
                        }
                    }
                })
                .state('locationsdetails.stations', {
                    url: "/stations",
                    templateUrl: "locations/details/stations/locations-stations-mapping-tab-content.tpl.html",
                    controller: "LocationsStationsMappingController as locationsStationsMappingController",
                    params: {
                        locationsSearchData: null,
                        action:''
                    },
                    data: {
                        pageTitle: "Location Details",
                        backState: 'locations'
                    },
                    resolve: {
                        action: function($stateParams, $location) {
                            if(($location.path() === '/locations/create/costcenters' || $location.path() === '/locations/create') &&
                                $stateParams.locationCode === 'create'){
                                $stateParams.action = 'add';
                            }
                            return $stateParams.action || 'edit';
                        }
                    }
                });
        }]);
})();