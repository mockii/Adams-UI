(function () {
    angular.module('adams.products.nutrition.controller', [])
        .controller('NutritionController', ['$scope', '$state', 'nutritionData', 'dietType', 'marketingData',
            function ($scope, $state, nutritionData, dietType, marketingData) {
                var nutritionController = this;

                nutritionController.productSearchData = $scope.productsDetailsController.productSearchData;
                $state.current.data.pageTitle = nutritionController.productSearchData.description + " (" + nutritionController.productSearchData.gtin + ")";

                function initialize() {
                    nutritionController.nutritionData = nutritionData || [];
                    nutritionController.dietTypeData = dietType || [];
                    nutritionController.marketingData = marketingData;

                    nutritionController.hasNutritionData = nutritionController.nutritionData.length > 0;
                    nutritionController.hasDietTypeData = nutritionController.dietTypeData.length > 0;
                    nutritionController.hasIngredientList = (nutritionController.productSearchData.ingredient_list);
                    nutritionController.hasMarketingData = (marketingData);
                }

                initialize();
            }
    ]);
})();