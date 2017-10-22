(function () {
    angular.module('adams.locations.details1', [
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
                .state('addLocation', {
                    url: "/locations/create",
                    templateUrl: "locations/details/locations.details1.tpl.html"
                });
        }]);
})();