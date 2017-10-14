(function () {
    'use strict';
    angular.module('adams.vendor.mapping.disassociate.edi.reason.controller', []).controller('VendorMappingDisAssociateEdiReasonController', ['$scope', '$state', '$uibModalInstance', 'ADAMS_CONSTANTS',
        function ($scope, $state, $uibModalInstance, ADAMS_CONSTANTS) {
            var vendorMappingDisAssociateEdiReasonController = this;

            vendorMappingDisAssociateEdiReasonController.cancel = function () {
                $uibModalInstance.close('true');
            };
        }
    ]);
})();