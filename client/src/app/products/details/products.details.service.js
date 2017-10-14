(function () {
    angular.module('adams.products.details.service', ['common.modules.logging'])
        .factory('ProductsDetailsService', ['$http', 'ADAMS_URL_SPACE', '$q', '$log',
            function ($http, ADAMS_URL_SPACE, $q, $log) {
                var productsDetailsService = {};

                productsDetailsService.getProductDetails = function (gtin) {
                    var url = ADAMS_URL_SPACE.urls.local.productDetails.replace('{gtin}', gtin);
                    return $http.get(url)
                        .then(function (response) {
                            return response.data.data[0];
                        }, function (error) {
                            $log.error("Error occurred while fetching products details data ", error);
                            return 'error';
                        });
                };

                productsDetailsService.getProductImages = function (gtin) {
                    var url = ADAMS_URL_SPACE.urls.local.multimedia.replace('{gtin}', gtin);
                    return $http.get(url)
                        .then(function (response) {
                            return response.data.data;
                        }, function (error) {
                            $log.error("Error occurred while fetching products images data ", error);
                            return 'error';
                        });
                };

                return productsDetailsService;
            }]);
})();
