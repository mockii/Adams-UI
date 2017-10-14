'use strict';

(function () {
    angular.module('adams.locations.status.change.controller', [])
        .controller('LocationsStatusChangeController', ['$scope', '$state', '$uibModalInstance',
        function ($scope, $state, $uibModalInstance) {
            var locationsStatusChangeController = this;

            locationsStatusChangeController.cancel = function () {
                $uibModalInstance.close('true');
            };

            locationsStatusChangeController.submit = function () {
                $uibModalInstance.close();
            };
        }
    ]);
})();