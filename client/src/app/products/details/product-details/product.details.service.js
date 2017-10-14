(function () {
    angular.module('adams.products.product.details.service', [
        'common.modules.logging'
    ])
        .factory('ProductDetailsService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', '$log',
            function ($rootScope, $http, ADAMS_URL_SPACE, $q, $log) {
                var productDetailsService = {};
                productDetailsService.getProductDetails = function (productNumber) {
                    var url = ADAMS_URL_SPACE.urls.local.productDetails + '?productNumber=' + productNumber;
                    return $http.get(url)
                        .then(function (response) {
                            return response.data.data[0];
                        }, function (error) {
                            $log.error("Error occured while fetching product details data ", error);
                            return 'error';
                        });
                };
                return productDetailsService;
            }]);
})();