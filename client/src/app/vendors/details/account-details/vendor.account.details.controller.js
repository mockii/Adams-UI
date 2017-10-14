(function () {
    angular.module('adams.vendor.account.details.controller',[]).controller('VendorAccountDetailsController',[ '$state', '$scope','$location', 'VendorDetailsService', 'vendorSearchData',
        function($state, $scope, $location, VendorDetailsService, vendorSearchData) {
            var vendorAccountDetailsController = this;

            vendorAccountDetailsController.vendorSearchData = vendorSearchData;
            $scope.vendorDetailsController.vendorSearchData = vendorAccountDetailsController.vendorSearchData;

            $state.current.data.pageTitle = vendorSearchData.vendor_name_1 + ' (' + vendorSearchData.vendor_number + ')';
        }
    ]);
})();