(function () {
    angular.module('adams.products.allergen.service', ['common.modules.logging'])
        .factory('AllergenService', ['$http', 'ADAMS_URL_SPACE', '$q', '$log',
            function ($http, ADAMS_URL_SPACE, $q, $log) {
                var allergenService = {};

                allergenService.getAllergensData = function (gtin) {
                    var url = ADAMS_URL_SPACE.urls.local.allergens.replace('{gtin}', gtin);
                    return $http.get(url)
                        .then(function (response) {
                            return response.data.data;
                        }, function (error) {
                            $log.error("Error occurred while fetching allergens data ", error);
                            return 'error';
                        });
                };

                return allergenService;
            }]);
})();