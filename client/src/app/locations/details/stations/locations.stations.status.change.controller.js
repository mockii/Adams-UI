'use strict';

(function () {
    angular.module('adams.locations.stations.status.change.controller', [])
        .controller('LocationsStationsStatusChangeController', ['$scope', '$state', '$uibModalInstance',
        function ($scope, $state, $uibModalInstance) {
            var locationsStationsStatusChangeController = this;

            locationsStationsStatusChangeController.cancel = function () {
                $uibModalInstance.close('true');
            };

            locationsStationsStatusChangeController.submit = function () {
                $uibModalInstance.close();
            };
        }
    ]);
})();