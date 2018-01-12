(function () {
    'use strict';

    angular.module('adams.point.of.sale.system.category.defaults.controller',[])
        .controller('PointOfSaleSystemCategoryDefaultsController',['$rootScope', '$scope', 'PointOfSaleSystemCategoriesService', 'PointOfSaleSystemCategoriesDefaultsService', 'PointOfSaleItemDetailsService', '$filter', '$log', '$state', 'SYSTEM_CATEGORY_TYPE_CONSTANTS', 'SYSTEM_CATEGORY_TYPE_NAME_CONSTANTS', 'SYSTEM_CATEGORY_NAME_CONSTANTS', 'SYSTEM_CATEGORY_VENDOR_CONSTANTS', '$interval',
                function ($rootScope, $scope, PointOfSaleSystemCategoriesService, PointOfSaleSystemCategoriesDefaultsService, PointOfSaleItemDetailsService, $filter, $log, $state, SYSTEM_CATEGORY_TYPE_CONSTANTS, SYSTEM_CATEGORY_TYPE_NAME_CONSTANTS, SYSTEM_CATEGORY_NAME_CONSTANTS, SYSTEM_CATEGORY_VENDOR_CONSTANTS, $interval ) {
            var pointOfSaleSystemCategoryDefaultsController = this;

            function initialize() {
                pointOfSaleSystemCategoryDefaultsController.systemCategories = [];
                loadSystemCategories();
                loadVendors();
            }

            function loadSystemCategories() {
                PointOfSaleSystemCategoriesService.getAllSystemCategories().then(
                    function (response) {
                        if(response !== 'error'){
                            pointOfSaleSystemCategoryDefaultsController.systemCategories = response.data;
                            pointOfSaleSystemCategoryDefaultsController.currentSystemCategoryName = response.data[0].name;
                        }
                    },
                    function (error) {
                        pointOfSaleSystemCategoryDefaultsController.systemCategories = [];
                    }
                );
            }

            function loadVendors() {
                PointOfSaleSystemCategoriesService.getAllVendors().then(
                    function (response) {
                        if(response !== 'error'){
                            pointOfSaleSystemCategoryDefaultsController.vendors = response.data;

                            for(var index=0; index < pointOfSaleSystemCategoryDefaultsController.vendors.length; index++){
                                getType(pointOfSaleSystemCategoryDefaultsController.vendors[index]);
                            }
                        }
                    },
                    function (error) {
                        pointOfSaleSystemCategoryDefaultsController.vendors = [];
                    }
                );
            }

            function getType(vendor) {
                PointOfSaleSystemCategoriesService.getTypesForVendor(vendor.name).then(
                    function (response) {
                        if(response !== 'error'){
                            vendor.types = response.data;
                            if(pointOfSaleSystemCategoryDefaultsController.revenueCategoriesModelObjects){
                                vendor.types.forEach(function(type){
                                    console.log(type);
                                    type.systemCategoryName = getSystemCategoryName(vendor, type);
                                });
                            }
                        }
                    },
                    function (error) {
                        vendor.types = [];
                    }
                );
            }

            function getSystemCategoryName(vendor, type){
                console.log("from getSystemCategoryName - ", vendor, type);
                return "";
            }

            pointOfSaleSystemCategoryDefaultsController.setRevenueCategoriesModelObjects = function(){
                // pointOfSaleSystemCategoryDefaultsController.revenueCategoriesModelObjects
                loadVendors();
            };

            pointOfSaleSystemCategoryDefaultsController.getItemTypeLabel = function(vendor, type){
                if($state.includes('pointOfSale.systemCategoryDefaults.revenueCategories') && type.is_system_category_specific === SYSTEM_CATEGORY_TYPE_CONSTANTS.REVENUE_CATEGORY){
                    return true;
                } else if($state.includes('pointOfSale.systemCategoryDefaults.itemCategories') && type.is_system_category_specific === SYSTEM_CATEGORY_TYPE_CONSTANTS.ITEM_CATEGORY){
                    return true;
                } else {
                    return false;
                }
            };

            pointOfSaleSystemCategoryDefaultsController.isSelectedCategory = function(type){
                if($state.includes('pointOfSale.systemCategoryDefaults.revenueCategories') &&
                    !pointOfSaleSystemCategoryDefaultsController.selectedRevenueCategory){
                    console.log(
                        pointOfSaleSystemCategoryDefaultsController.revenueCategoriesModelObjects,
                        pointOfSaleSystemCategoryDefaultsController.itemCategoriesModelObjects);
                    return true;
                }

                if($state.includes('pointOfSale.systemCategoryDefaults.itemCategories') &&
                    !pointOfSaleSystemCategoryDefaultsController.selectedItemCategory){
                    return true;
                }
                return false;
            };

            pointOfSaleSystemCategoryDefaultsController.systemCategoriesModelArray = [];


            /*pointOfSaleSystemCategoryDefaultsController.getSelectionModel = function(vendor, type){
                /!*for(var i=0; i < pointOfSaleSystemCategoryDefaultsController.modelObjects.length; i++){
                    if(pointOfSaleSystemCategoryDefaultsController.modelObjects[i].vendor_name === vendor.name &&
                        pointOfSaleSystemCategoryDefaultsController.modelObjects[i].type_name === type.name &&
                        pointOfSaleSystemCategoryDefaultsController.modelObjects[i].system_category_name === pointOfSaleSystemCategoryDefaultsController.currentSystemCategoryName){
                        return pointOfSaleSystemCategoryDefaultsController.modelObjects[i].vendor_category_item_code;
                    }
                }*!/
                //return {name: "", vendor_category_item_code: ""};

                if(!pointOfSaleSystemCategoryDefaultsController.systemCategoriesModelArray
                        .includes('pointOfSaleSystemCategoryDefaultsController.' + vendor.name.charAt(0).toLowerCase() + vendor.name.slice(1) + type.name.replace(/\s+/, "") + 'SelectedItem')){
                    console.log('pointOfSaleSystemCategoryDefaultsController.' + vendor.name.charAt(0).toLowerCase() + vendor.name.slice(1) + type.name.replace(/\s+/, "") + 'SelectedItem');
                    pointOfSaleSystemCategoryDefaultsController.systemCategoriesModelArray.push('pointOfSaleSystemCategoryDefaultsController.' + vendor.name.charAt(0).toLowerCase() + vendor.name.slice(1) + type.name.replace(/\s+/, "") + 'SelectedItem');
                }
                return 'pointOfSaleSystemCategoryDefaultsController.' + vendor.name.charAt(0).toLowerCase() + vendor.name.slice(1) + type.name.replace(/\s+/, "") + 'SelectedItem';
            };*/

            pointOfSaleSystemCategoryDefaultsController.onSelectedSystemCategory = function(item, model) {
              console.log(item, model);
            };

            var systemCategoryChoicesPromise;
            pointOfSaleSystemCategoryDefaultsController.getSystemCategoryChoices = function(vendor, type){
                $interval.cancel(systemCategoryChoicesPromise);
                systemCategoryChoicesPromise = $interval(systemCategoryChoicesFunction, 800, 1, true, vendor, type);
            };

            function systemCategoryChoicesFunction(vendor, type){
                console.log(vendor.name, type.name);
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleSystemCategoryDefaultsController.currentSystemCategoryName, vendor.name, type.name);
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleSystemCategoryDefaultsController.systemCategoryChoices = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occurred while loading default revenue category - ', error);
                    }
                );
            }

            pointOfSaleSystemCategoryDefaultsController.switchTab = function(systemCategoryName) {
                pointOfSaleSystemCategoryDefaultsController.currentSystemCategoryName = systemCategoryName;
            };

            initialize();
        }
        ]);
})();