(function () {
    angular.module('adams.vendor.details.service', [])
        .factory('VendorDetailsService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', function($rootScope, $http, ADAMS_URL_SPACE, $q) {
            var vendorDetailsService = {};

            vendorDetailsService.getVendorDetails = function(vendorNumber, sourceSystemId) {
                var url = ADAMS_URL_SPACE.urls.local.vendorDetails+ '?sourceSystemId=' + sourceSystemId+ '&vendorNumber=' + vendorNumber;
                return $http.get(url)
                    .then(function(response) {
                        return response.data.data[0];
                    }, function(error) {
                          return 'error';
                    });
            };

            vendorDetailsService.updateVendorComment = function(vendorNumber, sourceSystemId, comment) {
                var url = ADAMS_URL_SPACE.urls.local.vendorDetails+ '?sourceSystemId=' + sourceSystemId + '&vendorNumber=' + vendorNumber;
                return $http.patch(url, {comment: comment})
                    .then(function(response) {
                        return response.data.data[0];
                    }, function(error) {
                        return 'error';
                    });
            };


            return vendorDetailsService;
        }]);
})();
