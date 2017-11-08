(function () {
    'use strict';

    angular.module('adams.point.of.sale.item.details.controller',[])
        .controller('PointOfSaleItemDetailsController',['$rootScope', '$scope', '$state', '$q', '$log', '$uibModal', '$timeout',
            '$filter', 'StgStatesService', 'pos_item', 'PointOfSaleItemDetailsService',
            function ($rootScope, $scope, $state, $q, $log, $uibModal, $timeout,
                      $filter, StgStatesService, pos_item, PointOfSaleItemDetailsService) {

            var pointOfSaleItemDetailsController = this;

            function initialize() {

                pointOfSaleItemDetailsController.action = $state.current.name;
                pointOfSaleItemDetailsController.infogenesisData = {};
                pointOfSaleItemDetailsController.simphonyData = {};
                pointOfSaleItemDetailsController.webtritionItem = {};

                pointOfSaleItemDetailsController.tags = [];
                pointOfSaleItemDetailsController.vendorTabs = [];

                pointOfSaleItemDetailsController.itemClasses = [];
                pointOfSaleItemDetailsController.revenueCategories = [];
                pointOfSaleItemDetailsController.itemCategories = [];
                pointOfSaleItemDetailsController.unitOfMeasures = [];

                pointOfSaleItemDetailsController.infogenesisData.defaultProductClasses = [];
                pointOfSaleItemDetailsController.infogenesisData.defaultRevenueCategories = [];
                pointOfSaleItemDetailsController.simphonyData.defaultMajorGroups = [];
                pointOfSaleItemDetailsController.simphonyData.defaultFamilyGroups = [];

                pointOfSaleItemDetailsController.infogenesisData.morrisonProductClasses = [];
                pointOfSaleItemDetailsController.infogenesisData.morrisonRevenueCategories = [];
                pointOfSaleItemDetailsController.simphonyData.morrisonMajorGroups = [];
                pointOfSaleItemDetailsController.simphonyData.morrisonFamilyGroups = [];

                pointOfSaleItemDetailsController.infogenesisData.eurestProductClasses = [];
                pointOfSaleItemDetailsController.infogenesisData.eurestRevenueCategories = [];
                pointOfSaleItemDetailsController.simphonyData.eurestMajorGroups = [];
                pointOfSaleItemDetailsController.simphonyData.eurestFamilyGroups = [];

                // default active indicator to true
                pointOfSaleItemDetailsController.active_indicator = true;

                pointOfSaleItemDetailsController.initializeMaxLengthsForTextInputs();
                pointOfSaleItemDetailsController.initializeVendorTabStates();
                pointOfSaleItemDetailsController.setPageTitle();
                pointOfSaleItemDetailsController.initializeForm();
            }
            pointOfSaleItemDetailsController.setActiveVendorTab = function (vendorName) {
                pointOfSaleItemDetailsController.activeVendorTabName = vendorName;
            };

            pointOfSaleItemDetailsController.initializeVendorTabStates = function () {
                pointOfSaleItemDetailsController.vendorTabs = [
                    {"name":"InfoGenesis"},
                    {"name":"Simphony"}
                ];
                pointOfSaleItemDetailsController.activeVendorTabName = pointOfSaleItemDetailsController.vendorTabs[0].name;
            };

            pointOfSaleItemDetailsController.initializeMaxLengthsForTextInputs = function () {

                pointOfSaleItemDetailsController.infogenesisData.buttonText1MaxLength = 7;
                pointOfSaleItemDetailsController.infogenesisData.buttonText2MaxLength = 7;

                pointOfSaleItemDetailsController.simphonyData.masterRecordNameMaxLength = 100;
                pointOfSaleItemDetailsController.simphonyData.firstNameMaxLength = 100;
                pointOfSaleItemDetailsController.simphonyData.secondNameMaxLength = 100;
                pointOfSaleItemDetailsController.simphonyData.thirdNameMaxLength = 100;

                pointOfSaleItemDetailsController.longMaxLength = 128;
                pointOfSaleItemDetailsController.midMaxLength = 50;
                pointOfSaleItemDetailsController.shortMaxLength = 16;
                pointOfSaleItemDetailsController.itemNotesMaxLength = 256;
            };

            pointOfSaleItemDetailsController.setPageTitle = function () {
                if(pointOfSaleItemDetailsController.action === "edititem") {
                    $state.current.data.pageTitle = pos_item.name + ' (' + pos_item.posId + ')';
                }
            };

            pointOfSaleItemDetailsController.initializeForm = function () {
                pointOfSaleItemDetailsController.loadRevenueCategories();
                pointOfSaleItemDetailsController.loadItemCategories();
                pointOfSaleItemDetailsController.loadItemClasses();
                pointOfSaleItemDetailsController.loadUnitOfMeasures();

                pointOfSaleItemDetailsController.loadDefaultProductClasses();
                pointOfSaleItemDetailsController.loadDefaultRevenueCategories();
                pointOfSaleItemDetailsController.loadDefaultMajorGroups();
                pointOfSaleItemDetailsController.loadDefaultFamilyGroups();

                pointOfSaleItemDetailsController.loadMorrisonProductClasses();
                pointOfSaleItemDetailsController.loadMorrisonRevenueCategories();
                pointOfSaleItemDetailsController.loadMorrisonMajorGroups();
                pointOfSaleItemDetailsController.loadMorrisonFamilyGroups();

                pointOfSaleItemDetailsController.loadEurestProductClasses();
                pointOfSaleItemDetailsController.loadEurestRevenueCategories();
                pointOfSaleItemDetailsController.loadEurestMajorGroups();
                pointOfSaleItemDetailsController.loadEurestFamilyGroups();

                if(pointOfSaleItemDetailsController.action === "edititem") {
                    pointOfSaleItemDetailsController.posId = pos_item.posId;
                    pointOfSaleItemDetailsController.revenueCategory = pos_item.revenueCategory;
                    pointOfSaleItemDetailsController.itemCategory = pos_item.itemCategory;
                    pointOfSaleItemDetailsController.unitOfMeasure = pos_item.unitOfMeasure;
                }
            };

            pointOfSaleItemDetailsController.loadRevenueCategories = function () {
                var revenueCategoriesPromise = PointOfSaleItemDetailsService.getAllPosRevenueCategoriesDetails();

                revenueCategoriesPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.revenueCategories = $filter('orderBy')(response.data, 'revenue_category_name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading revenue categories - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadItemCategories = function () {
                var itemCategoriesPromise = PointOfSaleItemDetailsService.getAllPosItemCategoriesDetails('', '', '', '');

                itemCategoriesPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.itemCategories = $filter('orderBy')(response.data, 'item_category_name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading item categories - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadItemClasses = function () {
                var itemClassesPromise = PointOfSaleItemDetailsService.getAllPosItemClassesDetails('', '', '', '');

                itemClassesPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.itemClasses = $filter('orderBy')(response.data, 'item_class_name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading item classes - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadUnitOfMeasures = function () {
                var response = [
                    {
                        "name" : "kilograms"
                    },
                    {
                        "name" : "pounds"
                    },
                    {
                        "name" : "mililiters"
                    },
                    {
                        "name" : "cups"
                    }
                ];

                pointOfSaleItemDetailsController.webtritionItem.unitOfMeasures = $filter('orderBy')(response, 'name', false);
            };

            pointOfSaleItemDetailsController.loadDefaultProductClasses = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('default','InfoGenesis','product_class');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.infogenesisData.defaultProductClasses = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading default product classes - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadDefaultRevenueCategories = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('default','InfoGenesis','revenue_category');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.infogenesisData.defaultRevenueCategories = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading default revenue category - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadDefaultMajorGroups = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('default','Simphony','major_group');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.simphonyData.defaultMajorGroups = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading default major groups - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadDefaultFamilyGroups = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('default','Simphony','family_group');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.simphonyData.defaultFamilyGroups = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading default family groups - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadMorrisonProductClasses = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('morrison','InfoGenesis','product_class');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.infogenesisData.morrisonProductClasses = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading morrison product classes - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadMorrisonRevenueCategories = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('morrison','InfoGenesis','revenue_category');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.infogenesisData.morrisonRevenueCategories = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading morrison revenue category - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadMorrisonMajorGroups = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('morrison','Simphony','major_group');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.simphonyData.morrisonMajorGroups = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading morrison major groups - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadMorrisonFamilyGroups = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('morrison','Simphony','family_group');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.simphonyData.morrisonFamilyGroups = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading morrison family groups - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadEurestProductClasses = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('eurest','InfoGenesis','product_class');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.infogenesisData.eurestProductClasses = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading eurest product classes - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadEurestRevenueCategories = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('eurest','InfoGenesis','revenue_category');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.infogenesisData.eurestRevenueCategories = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading eurest revenue category - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadEurestMajorGroups = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('eurest','Simphony','major_group');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.simphonyData.eurestMajorGroups = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading eurest major groups - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadEurestFamilyGroups = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor('eurest','Simphony','family_group');
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.simphonyData.eurestFamilyGroups = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading eurest family groups - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.openAddTags = function () {
                var addTagsModal = $uibModal.open({
                    templateUrl: 'point-of-sale/point-of-sale-item/details/add.point.of.sale.tags.tpl.html',
                    controller: 'AddPointOfSaleTagsController as addPointOfSaleTagsController',
                    size: 'md',
                    backdrop: 'static',
                    resolve: {
                        selectedTags : {tags:pointOfSaleItemDetailsController.tags}
                    }
                });
                addTagsModal.result.then(function (result) {
                    pointOfSaleItemDetailsController.tags = result.newSelectedTags;
                });
            };

            pointOfSaleItemDetailsController.removeTag = function (tagName) {
                for(var index=0; index<pointOfSaleItemDetailsController.tags.length; index++) {
                    if(pointOfSaleItemDetailsController.tags[index].name === tagName) {
                        pointOfSaleItemDetailsController.tags.splice(index, 1);
                        break;
                    }
                }
            };

            pointOfSaleItemDetailsController.clearAndGoBack = function () {
                //$rootScope.$broadcast('reloadTypeDetails','default', 'InfoGenesis', 'product_class');
                StgStatesService.goToBackState();
            };

            pointOfSaleItemDetailsController.savePointOfSaleItem = function () {
                // submit form here

            };

            pointOfSaleItemDetailsController.isNotReadyToSubmit = function(){
                return pointOfSaleItemDetailsController.revenueCategory === undefined ||
                        pointOfSaleItemDetailsController.itemCategory === undefined ||
                        pointOfSaleItemDetailsController.itemClass === undefined ||
                        (pointOfSaleItemDetailsController.itemClass.item_class_name === 'Webtrition Item' && pointOfSaleItemDetailsController.webtritionItem.unitOfMeasure === undefined) ||
                        pointOfSaleItemDetailsController.infogenesisData.defaultProductClass === undefined ||
                        pointOfSaleItemDetailsController.infogenesisData.morrisonProductClass === undefined ||
                        pointOfSaleItemDetailsController.infogenesisData.eurestProductClass === undefined ||
                        pointOfSaleItemDetailsController.infogenesisData.defaultRevenueCategory === undefined ||
                        pointOfSaleItemDetailsController.infogenesisData.morrisonRevenueCategory === undefined ||
                        pointOfSaleItemDetailsController.infogenesisData.eurestRevenueCategory === undefined ||
                        pointOfSaleItemDetailsController.simphonyData.defaultMajorGroup === undefined ||
                        pointOfSaleItemDetailsController.simphonyData.morrisonMajorGroup === undefined ||
                        pointOfSaleItemDetailsController.simphonyData.eurestMajorGroup === undefined ||
                        pointOfSaleItemDetailsController.simphonyData.defaultFamilyGroup === undefined ||
                        pointOfSaleItemDetailsController.simphonyData.morrisonFamilyGroup === undefined ||
                        pointOfSaleItemDetailsController.simphonyData.eurestFamilyGroup === undefined;
            };


            initialize();
        }
        ]);
})();