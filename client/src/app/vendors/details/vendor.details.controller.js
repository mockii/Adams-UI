(function () {
    angular.module('adams.vendor.details.controller',[]).controller('VendorDetailsController',[ '$state', '$scope','$location', 'VendorDetailsService',
        function($state, $scope, $location, VendorDetailsService) {
            var vendorDetailsController = this;

            vendorDetailsController.vendorSearchData = {};
            vendorDetailsController.isCollapsed = true;

            //Getting vendor number and assigning at scope level store in scope and use in other tabs to avoid replicating code
            var vendorNumber = $location.path().split('/')[2];
            $scope.vendorNumber = vendorNumber;

        }
    ]);
})();