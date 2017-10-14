(function () {
    'use strict';
    angular.module('adams.cost.center.mapping.disassociate.edi.reason.controller', []).controller('CostCenterMappingDisAssociateEdiReasonController', ['$scope', '$state', '$uibModalInstance', 'ADAMS_CONSTANTS',
        function ($scope, $state, $uibModalInstance, ADAMS_CONSTANTS) {
            var costCenterMappingDisAssociateEdiReasonController = this;

            costCenterMappingDisAssociateEdiReasonController.cancel = function () {
                $uibModalInstance.close('true');
            };
        }
    ]);
})();