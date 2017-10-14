(function () {
    'use strict';
    angular.module('adams.cost.center.mapping.disassociate.controller', []).controller('CostCenterMappingDisAssociateController', ['$scope', '$state', '$uibModalInstance', 'ADAMS_CONSTANTS',
        function ($scope, $state, $uibModalInstance, ADAMS_CONSTANTS) {
            var costCenterMappingDisAssociateController = this;

            costCenterMappingDisAssociateController.descriptionReason = "";

            costCenterMappingDisAssociateController.cancel = function () {
                $uibModalInstance.close('true');
            };
            costCenterMappingDisAssociateController.submit = function () {
                $uibModalInstance.close(costCenterMappingDisAssociateController.descriptionReason);
            };
        }
    ]);
})();