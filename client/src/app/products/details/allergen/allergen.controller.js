(function () {
    angular.module('adams.products.allergen.controller', [])
        .controller('AllergenController', ['$scope', '$state', 'ALLERGEN_LEVELS', 'MAPPED_ALLERGEN_CODES', 'UNMAPPED_ALLERGEN_CODES', 'BIG_EIGHT_ALLERGENS', 'OTHER_ALLERGENS', 'allergenData',
            function ($scope, $state, ALLERGEN_LEVELS, MAPPED_ALLERGEN_CODES, UNMAPPED_ALLERGEN_CODES, BIG_EIGHT_ALLERGENS, OTHER_ALLERGENS, allergenData) {
                var allergenController = this,
                    bigEightAllergenKeys = Object.keys(BIG_EIGHT_ALLERGENS),
                    otherAllergenKeys = Object.keys(OTHER_ALLERGENS),
                    allergenKeys = Object.keys(MAPPED_ALLERGEN_CODES),
                    allergenLevelKeysArray = Object.keys(ALLERGEN_LEVELS),
                    allergenLevelValuesArray = Object.values(ALLERGEN_LEVELS);

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

                    allergenData.forEach(function(allergen){
                        var data = {};
                        if(bigEightAllergenKeys.indexOf(allergen.allergen_type_code) > -1 &&
                            allergenKeys.indexOf(allergen.allergen_type_code) > -1 &&
                            !containsAllergenKey(allergen.allergen_type_code, allergenController.bigEightAllergensData)){
                            data.allergen = MAPPED_ALLERGEN_CODES[allergen.allergen_type_code];
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.CONTAINS)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.CONTAINS ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.FREE_FROM)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.FREE_FROM ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.MAY_CONTAIN)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.MAY_CONTAIN ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.DERIVED_FROM)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.DERIVED_FROM ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.NOT_DERIVED_FROM)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.NOT_DERIVED_FROM ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.NOT_INTENTIONALLY_NOR_INHERENTLY_INCLUDED)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.NOT_INTENTIONALLY_NOR_INHERENTLY_INCLUDED ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.UNDECLARED)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.UNDECLARED ? true : false;

                            data.allergen_type_code = allergen.allergen_type_code;
                            allergenController.bigEightAllergensData.push(data);

                        } else if(otherAllergenKeys.indexOf(allergen.allergen_type_code) > -1 &&
                            allergenKeys.indexOf(allergen.allergen_type_code) > -1 &&
                            !containsAllergenKey(allergen.allergen_type_code, allergenController.otherAllergensData)){

                            data.allergen = MAPPED_ALLERGEN_CODES[allergen.allergen_type_code];
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.CONTAINS)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.CONTAINS ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.FREE_FROM)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.FREE_FROM ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.MAY_CONTAIN)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.MAY_CONTAIN ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.DERIVED_FROM)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.DERIVED_FROM ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.NOT_DERIVED_FROM)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.NOT_DERIVED_FROM ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.NOT_INTENTIONALLY_NOR_INHERENTLY_INCLUDED)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.NOT_INTENTIONALLY_NOR_INHERENTLY_INCLUDED ? true : false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.UNDECLARED)].toLowerCase()] =
                                allergen.allergen_level === ALLERGEN_LEVELS.UNDECLARED ? true : false;
                            allergenController.otherAllergensData.push(data);

                        } else if (UNMAPPED_ALLERGEN_CODES.indexOf(allergen.allergen_type_code) > -1){
                            allergenController.unMappedAllergens.push(allergen);
                        } else {
                            //do nothing
                        }
                    });
                }

                function buildAllergenListWithRelevantData(){
                    if(allergenController.bigEightAllergensData.length > 0 &&
                        allergenController.bigEightAllergensData.length < 8 && hasAllergenRelevantData()){
                        getExcludedKeys();
                        allergenController.hasBeenBuiltWithRelevantData = true;
                        excludedKeys.forEach(function(key){
                            var data = {};
                            data.allergen = BIG_EIGHT_ALLERGENS[key];
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.CONTAINS)].toLowerCase()] = false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.FREE_FROM)].toLowerCase()] = true;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.MAY_CONTAIN)].toLowerCase()] = false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.DERIVED_FROM)].toLowerCase()] = false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.NOT_DERIVED_FROM)].toLowerCase()] = false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.NOT_INTENTIONALLY_NOR_INHERENTLY_INCLUDED)].toLowerCase()] = false;
                            data[allergenLevelKeysArray[allergenLevelValuesArray.indexOf(ALLERGEN_LEVELS.UNDECLARED)].toLowerCase()] = false;
                            data.allergen_type_code = key;
                            data.allergen_built_with_relevant_data = true;

                            allergenController.bigEightAllergensData.push(data);
                        });
                    }
                }

                /*Check duplicate allergens from the actal allergens data*/
                function containsAllergenKey(key, allergensList){
                    for(var i = 0; i < allergensList.length; i++){
                        if(allergensList[i].allergen_type_code === key){
                            return true;
                        }
                    }
                    return false;
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