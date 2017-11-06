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
                .state('locationsDetails', {
                    url: "/locations/{locationCode}/details",
                    templateUrl: "locations/details/locations.details.tpl.html",
                    controller: "LocationsDetailsController as locationsDetailsController",
                    redirectTo: 'locationsDetails.costCenters',
                    params: {
                        locationsSearchData: null,
                        locationRowData: null,
                        locationCode: '',
                        action:''
                    },
                    data: {
                        pageTitle: "Locations",
                        backState: 'locations'
                    },
                    resolve: {
                        action: function($stateParams) {
                            if(!$stateParams.action){
                                $stateParams.action = 'edit';
                            }
                            return $stateParams.action;
                        },
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'locationsDetails',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/locations-details.css'
                                ]
                            });
                        }],
                        locationRowData: function($location, $stateParams){
                            var locationCode = $location.path().split('/')[2];
                            if(locationCode === $stateParams.locationCode) {
                                return null;
                            } else {
                                return $stateParams.locationRowData;
                            }
                        },
                        locationsSearchData: function($stateParams, LocationsDetailsService){
                            if($stateParams.action === 'edit'){
                                return LocationsDetailsService.getLocationDetailsByLocationCode($stateParams.locationCode);
                            }
                        }
                    }
                })
                .state('locationsDetails.costCenters', {
                    url: "/costcenters",
                    templateUrl: "locations/details/costcenters/locations-cost-center-mapping-tab-content.tpl.html",
                    controller: "LocationsCostCenterMappingController as locationsCostCenterMappingController",
                    params: {
                        action:''
                    },
                    data: {
                        pageTitle: "Location Details",
                        backState: 'locations'
                    },
                    resolve: {
                        action: function($stateParams) {
                            if(!$stateParams.action){
                                $stateParams.action = 'edit';
                            }
                            return $stateParams.action;
                        }
                    }
                })
                .state('locationsDetails.stations', {
                    url: "/stations",
                    templateUrl: "locations/details/stations/locations-stations-mapping-tab-content.tpl.html",
                    controller: "LocationsStationsMappingController as locationsStationsMappingController",
                    params: {
                        action:''
                    },
                    data: {
                        pageTitle: "Location Details",
                        backState: 'locations'
                    },
                    resolve: {
                        action: function($stateParams) {
                            if(!$stateParams.action){
                                $stateParams.action = 'edit';
                            }
                            return $stateParams.action;
                        }
                    }
                })
                .state('addLocation', {
                    templateUrl: "locations/details/locations.details.tpl.html",
                    controller: "LocationsDetailsController as locationsDetailsController",
                    redirectTo: 'addLocation.costCenters',
                    params: {
                        locationsSearchData: null,
                        locationRowData: null,
                        locationCode: '',
                        action:''
                    },
                    data: {
                        pageTitle: "Locations",
                        backState: 'locations'
                    },
                    resolve: {
                        action: function($stateParams) {
                            if(!$stateParams.action){
                                $stateParams.action = 'add';
                            }
                            return $stateParams.action;
                        },
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'locationsDetails',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/locations-details.css'
                                ]
                            });
                        }],
                        locationRowData: function($stateParams){
                            return $stateParams.locationRowData;
                        },
                        locationsSearchData: function($stateParams){
                            return $stateParams.locationsSearchData;
                        }
                    }
                })
                .state('addLocation.costCenters', {
                    url: "/locations/create",
                    templateUrl: "locations/details/costcenters/locations-cost-center-mapping-tab-content.tpl.html",
                    controller: "LocationsCostCenterMappingController as locationsCostCenterMappingController",
                    params: {
                        locationsSearchData: null,
                        locationRowData: null,
                        locationCode: '',
                        action:''
                    },
                    data: {
                        pageTitle: "Location Details",
                        backState: 'locations'
                    },
                    resolve: {
                        action: function($stateParams) {
                            if(!$stateParams.action){
                                $stateParams.action = 'edit';
                            }
                            return $stateParams.action;
                        }
                    }
                })
                .state('addLocation.stations', {
                    url: "/locations/create",
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
                        action: function($stateParams) {
                            if(!$stateParams.action){
                                $stateParams.action = 'edit';
                            }
                            return $stateParams.action;
                        }
                    }
                });
        }]);
})();