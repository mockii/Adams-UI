'use strict';

(function () {
    angular.module('adams.locations.costcenters.status.change.controller', [])
        .controller('LocationsCostCentersStatusChangeController', ['$scope', '$state', '$uibModalInstance',
        function ($scope, $state, $uibModalInstance) {
            var locationsCostCentersStatusChangeController = this;

            locationsCostCentersStatusChangeController.cancel = function () {
                $uibModalInstance.close('true');
            };

            locationsCostCentersStatusChangeController.submit = function () {
                $uibModalInstance.close();
            };
        }
    ]);
})();