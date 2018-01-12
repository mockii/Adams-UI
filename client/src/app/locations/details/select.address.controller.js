'use strict';

(function () {
    angular.module('adams.locations.select.address.controller', [])
        .controller('SelectAddressController', ['$uibModalInstance', 'formattedAddresses',
        function ($uibModalInstance, formattedAddresses) {
            var selectAddressController = this;
            selectAddressController.formattedAddresses = formattedAddresses;
            selectAddressController.isSelectedPlaceId = null;

            selectAddressController.close = function() {
                $uibModalInstance.close('true');
            };
            selectAddressController.select = function() {
                $uibModalInstance.close(selectAddressController.selectedAddress);
            };
            selectAddressController.setSelectedAddress = function(address) {
                selectAddressController.isSelectedPlaceId = address.placeId;
                selectAddressController.selectedAddress = address;
            };

        }
    ]);
})();