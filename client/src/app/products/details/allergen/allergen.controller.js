(function () {
    angular.module('adams.products.allergen.controller', [])
        .controller('AllergenController', ['$scope', '$state', 'ALLERGEN_LEVELS', 'BIG_EIGHT_ALLERGENS', 'allergenData',
            function ($scope, $state, ALLERGEN_LEVELS, BIG_EIGHT_ALLERGENS, allergenData) {
                var allergenController = this,
                    bigEightAllergenKeys = Object.keys(BIG_EIGHT_ALLERGENS);

                $scope.ALLERGEN_LEVELS = ALLERGEN_LEVELS;

                allergenController.productSearchData = $scope.productsDetailsController.productSearchData;
                $state.current.data.pageTitle = allergenController.productSearchData.description + " (" + allergenController.productSearchData.gtin + ")";

                function initialize() {
                    allergenController.bigEightAllergensData = [];
                    allergenController.otherAllergensData = [];
                    allergenController.unMappedAllergens = [];

                    buildAllergenList(allergenData || []);
                    buildAllergenListWithRelevantData();

                    allergenController.hasBigEigthAllergens = allergenController.bigEightAllergensData.length > 0;
                    allergenController.hasOtherAllergens = allergenController.otherAllergensData.length > 0;
                    allergenController.hasUnmappedAllergens = allergenController.unMappedAllergens.length > 0;
                }

                function buildAllergenList(allergenData) {
                    var existingAllergen;
                    allergenData.forEach(function(allergen){
                        if(allergen.big8 === 'YES' && allergen.label){
                            if(!containsAllergenLabel(allergen.label, allergenController.bigEightAllergensData)){
                                allergenController.bigEightAllergensData.push(allergen);
                            } else {
                                existingAllergen = getAllergen(allergen.label, allergenController.bigEightAllergensData);
                                if(existingAllergen.allergen_level !== allergen.allergen_level){
                                    allergenController.hasMultipleLevels = existingAllergen.hasMultipleLevels = true;
                                    existingAllergen.multipleAllergenLevels = existingAllergen.multipleAllergenLevels  || [];
                                    if(!containsAllergenLevel(allergen.allergen_level, existingAllergen.multipleAllergenLevels)){
                                        existingAllergen.multipleAllergenLevels.push(allergen);
                                    }
                                }
                            }

                        } else if(allergen.label && !containsAllergenLabel(allergen.label, allergenController.otherAllergensData)){
                            if(!containsAllergenLabel(allergen.label, allergenController.otherAllergensData)){
                                allergenController.otherAllergensData.push(allergen);
                            } else {
                                existingAllergen = getAllergen(allergen.label, allergenController.otherAllergensData);
                                if(existingAllergen.allergen_level !== allergen.allergen_level){
                                    allergenController.hasMultipleLevels = existingAllergen.hasMultipleLevels = true;
                                    existingAllergen.multipleAllergenLevels = existingAllergen.multipleAllergenLevels  || [];
                                    if(!containsAllergenLevel(allergen.allergen_level, existingAllergen.multipleAllergenLevels)){
                                        existingAllergen.multipleAllergenLevels.push(allergen);
                                    }
                                }
                            }
                        } else {
                            allergenController.unMappedAllergens.push(allergen);
                        }
                    });
                }

                function buildAllergenListWithRelevantData(){
                    if(hasAllergenRelevantData()){
                        getExcludedKeys();
                        allergenController.hasBeenBuiltWithRelevantData = true;
                        excludedKeys.forEach(function(key){
                            var data = {};
                            data.label = BIG_EIGHT_ALLERGENS[key];
                            data.allergen_type_code = key;
                            data.allergen_level = '';
                            data.allergenBuiltWithRelevantData = true;

                            allergenController.bigEightAllergensData.push(data);
                        });
                    }
                }

                /*Check duplicate allergens from the actual allergens data*/
                function containsAllergenKey(key, allergensList){
                    for(var i = 0; i < allergensList.length; i++){
                        if(allergensList[i].allergen_type_code === key){
                            return true;
                        }
                    }
                    return false;
                }

                /* Check if the Allergen Label exists in the Allergen List*/
                function getAllergen(label, allergensList){
                    for(var i = 0; i < allergensList.length; i++){
                        if(allergensList[i].label === label){
                            return allergensList[i];
                        }
                    }
                    return null;
                }

                /*Check duplicate allergens from the actual allergens data by allergen level*/
                function containsAllergenLevel(level, allergensList){
                    for(var i = 0; i < allergensList.length; i++){
                        if(allergensList[i].allergen_level === level){
                            return true;
                        }
                    }
                    return false;
                }

                /*Check duplicate allergens from the actual allergens data by allergen label*/
                function containsAllergenLabel(label, allergensList){
                    return getAllergen(label, allergensList) ? true : false;
                }

                /*Get the list of all keys that do not exist in allergenController.bigEightAllergensData*/
                var excludedKeys = [];
                function getExcludedKeys(){
                    bigEightAllergenKeys.forEach(function(key){
                        if(!containsAllergenKey(key, allergenController.bigEightAllergensData)){
                            excludedKeys.push(key);
                        }
                    });
                }

                /*Check if any allergen has relevant data*/
                function hasAllergenRelevantData(){
                    for(var i=0; i< allergenData.length; i++){
                        if(allergenData[i].allergen_relevant_data_provided === 'Y'){
                            return true;
                        }
                    }
                    return false;
                }

                initialize();
            }
    ]);
})();