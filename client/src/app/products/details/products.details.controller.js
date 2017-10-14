(function () {
    angular.module('adams.products.details.controller', [])
        .controller('ProductsDetailsController', ['$state', '$scope', '$location', 'ProductsDetailsService', 'productSearchData',
            function ($state, $scope, $location, ProductsDetailsService, productSearchData) {
                var productsDetailsController = this;

                productsDetailsController.productSearchData = productSearchData || {};

                //Getting product number and assigning at scope level store in scope and use in other tabs to avoid replicating code
                var gtin = $location.path().split('/')[2];
                $scope.gtin = gtin;
                productsDetailsController.gtin = gtin;
            }
    ]);
})();