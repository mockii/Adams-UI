(function () {
    angular.module('adams.vendor.mapping.disassociate.controller', []).controller('VendorMappingDisAssociateController', ['$scope', '$state', '$uibModalInstance', 'ADAMS_CONSTANTS',
        function ($scope, $state, $uibModalInstance, ADAMS_CONSTANTS) {
            var vendorMappingDisAssociateController = this;

            vendorMappingDisAssociateController.descriptionReason = "";

            vendorMappingDisAssociateController.cancel = function () {
                $uibModalInstance.close('true');
            };
            vendorMappingDisAssociateController.submit = function () {
                $uibModalInstance.close(vendorMappingDisAssociateController.descriptionReason);
            };
        }
    ]);
})();