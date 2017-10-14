(function () {
    angular.module('adams.products.nutrition.service', ['common.modules.logging'])
        .factory('NutritionService', ['$http', 'ADAMS_URL_SPACE', '$q', '$log',
            function ($http, ADAMS_URL_SPACE, $q, $log) {
                var nutritionService = {};

                nutritionService.getNutritionData = function (gtin) {
                    var url = ADAMS_URL_SPACE.urls.local.nutrients.replace('{gtin}', gtin);
                    return $http.get(url)
                        .then(function (response) {
                            return response.data.data;
                        }, function (error) {
                            $log.error("Error occurred while fetching nutrition data ", error);
                            return 'error';
                        });
                };

                nutritionService.getDietType = function (gtin) {
                    var url = ADAMS_URL_SPACE.urls.local.dietTypes.replace('{gtin}', gtin);
                    return $http.get(url)
                        .then(function (response) {
                            return response.data.data;
                        }, function (error) {
                            $log.error("Error occurred while fetching dietTypes data ", error);
                            return 'error';
                        });
                };

                nutritionService.getMarketing = function (gtin) {
                    var url = ADAMS_URL_SPACE.urls.local.marketing.replace('{gtin}', gtin);
                    return $http.get(url)
                        .then(function (response) {
                            return response.data.data[0];
                        }, function (error) {
                            $log.error("Error occurred while fetching marketing data - specifically for 'preperation instructions' ", error);
                            return 'error';
                        });
                };

                /*nutritionService.getNutritionData = function(gtin){
                    var promises = [];

                    var serviceUrls = [
                        ADAMS_URL_SPACE.urls.local.nutrients.replace('{gtin}', gtin),
                        ADAMS_URL_SPACE.urls.local.dietTypes.replace('{gtin}', gtin),
                        ADAMS_URL_SPACE.urls.local.marketing.replace('{gtin}', gtin)
                    ];

                    angular.forEach(serviceUrls, function(serviceUrl){
                        var promise = $http({
                            method: "get",
                            url: serviceUrl,
                            data: gtin
                        });
                        promises.push(promise);
                    });
                    return $q.all(promises);
                };*/

                return nutritionService;
            }]);
})();