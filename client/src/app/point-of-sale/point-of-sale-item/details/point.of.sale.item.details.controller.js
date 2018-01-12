(function () {
    'use strict';

    angular.module('adams.point.of.sale.item.details.controller',[])
        .controller('PointOfSaleItemDetailsController',['$rootScope', '$scope', '$state', '$q', '$log', '$uibModal', '$timeout',
            '$filter', 'StgStatesService', 'pos_item', 'PointOfSaleItemDetailsService', 'CompassToastr', 'Utils', 'RBACService', 'ApplicationConfigurationService',
            function ($rootScope, $scope, $state, $q, $log, $uibModal, $timeout,
                      $filter, StgStatesService, pos_item, PointOfSaleItemDetailsService, CompassToastr, Utils, RBACService, ApplicationConfigurationService) {

            var pointOfSaleItemDetailsController = this;


            function initialize() {
                pointOfSaleItemDetailsController.edit_item_action = 'edititem';
                pointOfSaleItemDetailsController.copy_item_action = 'copyitem';
                pointOfSaleItemDetailsController.add_item_action = 'additem';

                pointOfSaleItemDetailsController.infogenesis_vendor_name = 'Infogenesis';
                pointOfSaleItemDetailsController.infogenesis_general_category = 'General';
                pointOfSaleItemDetailsController.infogenesis_texts_category = 'Texts';
                pointOfSaleItemDetailsController.infogenesis_product_classes_category = 'Product Classes';
                pointOfSaleItemDetailsController.infogenesis_revenue_categories_category = 'Revenue Categories';

                pointOfSaleItemDetailsController.simphony_vendor_name = 'Simphony';
                pointOfSaleItemDetailsController.simphony_general_category = 'General';
                pointOfSaleItemDetailsController.simphony_product_name_category = 'Simphony Product Name';
                pointOfSaleItemDetailsController.simphony_major_groups_category = 'Major Groups';
                pointOfSaleItemDetailsController.simphony_family_groups_category = 'Family Groups';

                pointOfSaleItemDetailsController.default_system_category_name = 'Default';
                pointOfSaleItemDetailsController.morrison_system_category_name = 'Morrison';
                pointOfSaleItemDetailsController.eurest_system_category_name = 'Eurest';

                pointOfSaleItemDetailsController.infogenesisIdLabel = 'infogenesis_id';
                pointOfSaleItemDetailsController.itemNameLabel = 'infogenesis_item_name';
                pointOfSaleItemDetailsController.buttonText1Label = 'infogenesis_button_text1';
                pointOfSaleItemDetailsController.buttonText2Label = 'infogenesis_button_text2';

                pointOfSaleItemDetailsController.customerReceiptTextLabel = 'customer_receipt_text';
                pointOfSaleItemDetailsController.kitchenPrinterTextLabel = 'kitchen_printer_text';
                pointOfSaleItemDetailsController.kitchenVideoTextLabel = 'kitchen_video_text';

                pointOfSaleItemDetailsController.defaultProductClassLabel = 'default_product_class';
                pointOfSaleItemDetailsController.morrisonProductClassLabel = 'morrison_product_class';
                pointOfSaleItemDetailsController.eurestProductClassLabel = 'eurest_product_class';

                pointOfSaleItemDetailsController.defaultRevenueCategoryLabel = 'default_revenue_category';
                pointOfSaleItemDetailsController.morrisonRevenueCategoryLabel = 'morrison_revenue_category';
                pointOfSaleItemDetailsController.eurestRevenueCategoryLabel = 'eurest_revenue_category';

                pointOfSaleItemDetailsController.simphonyNumberLabel = 'simphony_number';

                pointOfSaleItemDetailsController.masterRecordNameLabel = 'master_record_name';
                pointOfSaleItemDetailsController.firstNameLabel = 'first_name';
                pointOfSaleItemDetailsController.secondNameLabel = 'second_name';
                pointOfSaleItemDetailsController.thirdNameLabel = 'third_name';

                pointOfSaleItemDetailsController.defaultMajorGroupLabel = 'default_major_group';
                pointOfSaleItemDetailsController.morrisonMajorGroupLabel = 'morrison_major_group';
                pointOfSaleItemDetailsController.eurestMajorGroupLabel = 'eurest_major_group';

                pointOfSaleItemDetailsController.defaultFamilyGroupLabel = 'default_family_group';
                pointOfSaleItemDetailsController.morrisonFamilyGroupLabel = 'morrison_family_group';
                pointOfSaleItemDetailsController.eurestFamilyGroupLabel = 'eurest_family_group';

                pointOfSaleItemDetailsController.hiddenMenu = ApplicationConfigurationService.isMenuHidden();
                pointOfSaleItemDetailsController.action = $state.current.name;
                pointOfSaleItemDetailsController.infogenesisData = {};
                pointOfSaleItemDetailsController.simphonyData = {};
                pointOfSaleItemDetailsController.webtritionItem = {};
                pointOfSaleItemDetailsController.prepackagedItem = {};

                pointOfSaleItemDetailsController.tags = [];
                pointOfSaleItemDetailsController.vendorTabs = [];

                pointOfSaleItemDetailsController.itemClasses = [];
                pointOfSaleItemDetailsController.revenueCategories = [];
                pointOfSaleItemDetailsController.itemCategories = [];
                pointOfSaleItemDetailsController.unitsOfMeasure = [];

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
                pointOfSaleItemDetailsController.modifier_indicator = false;
                pointOfSaleItemDetailsController.sold_by_weight_indicator = false;

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

                pointOfSaleItemDetailsController.longNameMaxLength = 128;
                pointOfSaleItemDetailsController.midNameMaxLength = 50;
                pointOfSaleItemDetailsController.shortNameMaxLength = 16;
                pointOfSaleItemDetailsController.itemNotesMaxLength = 256;
            };

            pointOfSaleItemDetailsController.setPageTitle = function () {
                if(pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.edit_item_action || pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.copy_item_action) {
                    $state.current.data.pageTitle = pos_item.name + ' (' + pos_item.pos_id + ')';
                }
            };

            pointOfSaleItemDetailsController.initializeForm = function () {
                pointOfSaleItemDetailsController.loadRevenueCategories();
                pointOfSaleItemDetailsController.loadItemCategories();
                pointOfSaleItemDetailsController.loadItemClasses();
                pointOfSaleItemDetailsController.loadUnitsOfMeasure();

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

                pointOfSaleItemDetailsController.loadAvailablePosTags();

                initializePosItem();

            };

            function initializePosItem() {
                pointOfSaleItemDetailsController.isInfogenesisIdDisabled = true;
                pointOfSaleItemDetailsController.isSimphonyNumberDisabled = true;

                if(pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.add_item_action || pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.copy_item_action){
                    pointOfSaleItemDetailsController.isInfogenesisIdEditable = true;
                    pointOfSaleItemDetailsController.isSimphonyNumberEditable = true;
                }else{
                    pointOfSaleItemDetailsController.isInfogenesisIdEditable = false;
                    pointOfSaleItemDetailsController.isSimphonyNumberEditable = false;
                }

                if(pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.edit_item_action || pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.copy_item_action) {
                    pointOfSaleItemDetailsController.posId = pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.edit_item_action ? pos_item.pos_id : "";
                    pointOfSaleItemDetailsController.created_by = pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.edit_item_action ? pos_item.created_by : "";
                    pointOfSaleItemDetailsController.created_date = pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.edit_item_action ? pos_item.created_date : "";
                    pointOfSaleItemDetailsController.modified_by = pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.edit_item_action ? pos_item.modified_by : "";
                    pointOfSaleItemDetailsController.modified_date = pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.edit_item_action ? pos_item.modified_date : "";
                    pointOfSaleItemDetailsController.infogenesisData.infogenesisId = pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.edit_item_action ? pos_item.pos_id : "";
                    pointOfSaleItemDetailsController.simphonyData.simphonyNumber = pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.edit_item_action ? pos_item.pos_id : "";

                    pointOfSaleItemDetailsController.pos_item_code = pos_item.pos_item_code;
                    pointOfSaleItemDetailsController.item_name = pos_item.name;
                    pointOfSaleItemDetailsController.longName = pos_item.long_name;
                    pointOfSaleItemDetailsController.midName = pos_item.mid_name;
                    pointOfSaleItemDetailsController.shortName = pos_item.short_name;

                    pointOfSaleItemDetailsController.active_indicator = pos_item.active;
                    pointOfSaleItemDetailsController.modifier_indicator = pos_item.modifier;
                    pointOfSaleItemDetailsController.sold_by_weight_indicator = pos_item.sold_by_weight;

                    pointOfSaleItemDetailsController.cost = pos_item.item_cost;
                    pointOfSaleItemDetailsController.defaultPrice = pos_item.default_price;
                    pointOfSaleItemDetailsController.revenueCategory = pos_item.revenue_category_code;
                    pointOfSaleItemDetailsController.itemCategory = pos_item.item_category_code;
                    pointOfSaleItemDetailsController.itemClass = pos_item.item_class_code;
                    pointOfSaleItemDetailsController.itemNotes = pos_item.item_notes;

                    /* Prepackaged Items data */
                    pointOfSaleItemDetailsController.prepackagedItem.barcode = pos_item.barcode;

                    /* Webtrition Items data */
                    pointOfSaleItemDetailsController.webtritionItem.unitOfMeasure = pos_item.unit_of_measure_code;
                    pointOfSaleItemDetailsController.webtritionItem.masterReferenceNumber = pos_item.mrn;
                    pointOfSaleItemDetailsController.webtritionItem.portionQuantity = pos_item.portion_quantity;
                    pointOfSaleItemDetailsController.webtritionItem.selectionQuantity = pos_item.selection_quantity;

                    pointOfSaleItemDetailsController.tags = pos_item.item_tags;

                    if(pos_item.pos_vendors){
                        /* InfoGenesis data */
                        var infogenesis_general_attributes = getAttributesForVendor(pointOfSaleItemDetailsController.infogenesis_vendor_name, pointOfSaleItemDetailsController.infogenesis_general_category);
                        pointOfSaleItemDetailsController.infogenesisData.infogenesisId = getAttributeValue(infogenesis_general_attributes, pointOfSaleItemDetailsController.infogenesisIdLabel);
                        pointOfSaleItemDetailsController.infogenesisData.itemName = getAttributeValue(infogenesis_general_attributes, pointOfSaleItemDetailsController.itemNameLabel);
                        pointOfSaleItemDetailsController.infogenesisData.buttonText1 = getAttributeValue(infogenesis_general_attributes, pointOfSaleItemDetailsController.buttonText1Label);
                        pointOfSaleItemDetailsController.infogenesisData.buttonText2 = getAttributeValue(infogenesis_general_attributes, pointOfSaleItemDetailsController.buttonText2Label);

                        var texts_attributes = getAttributesForVendor(pointOfSaleItemDetailsController.infogenesis_vendor_name, pointOfSaleItemDetailsController.infogenesis_texts_category);
                        pointOfSaleItemDetailsController.infogenesisData.customerReceiptText = getAttributeValue(texts_attributes, pointOfSaleItemDetailsController.customerReceiptTextLabel);
                        pointOfSaleItemDetailsController.infogenesisData.kitchenPrinterText = getAttributeValue(texts_attributes, pointOfSaleItemDetailsController.kitchenPrinterTextLabel);
                        pointOfSaleItemDetailsController.infogenesisData.kitchenVideoText = getAttributeValue(texts_attributes, pointOfSaleItemDetailsController.kitchenVideoTextLabel);

                        var product_class_attributes = getAttributesForVendor(pointOfSaleItemDetailsController.infogenesis_vendor_name, pointOfSaleItemDetailsController.infogenesis_product_classes_category);
                        pointOfSaleItemDetailsController.infogenesisData.defaultProductClass = getAttributeValue(product_class_attributes, pointOfSaleItemDetailsController.defaultProductClassLabel);
                        pointOfSaleItemDetailsController.infogenesisData.morrisonProductClass = getAttributeValue(product_class_attributes, pointOfSaleItemDetailsController.morrisonProductClassLabel);
                        pointOfSaleItemDetailsController.infogenesisData.eurestProductClass = getAttributeValue(product_class_attributes, pointOfSaleItemDetailsController.eurestProductClassLabel);

                        var revenue_category_attributes = getAttributesForVendor(pointOfSaleItemDetailsController.infogenesis_vendor_name, pointOfSaleItemDetailsController.infogenesis_revenue_categories_category);
                        pointOfSaleItemDetailsController.infogenesisData.defaultRevenueCategory = getAttributeValue(revenue_category_attributes, pointOfSaleItemDetailsController.defaultRevenueCategoryLabel);
                        pointOfSaleItemDetailsController.infogenesisData.morrisonRevenueCategory = getAttributeValue(revenue_category_attributes, pointOfSaleItemDetailsController.morrisonRevenueCategoryLabel);
                        pointOfSaleItemDetailsController.infogenesisData.eurestRevenueCategory = getAttributeValue(revenue_category_attributes, pointOfSaleItemDetailsController.eurestRevenueCategoryLabel);

                        /* Simphony data */

                        var simphony_general_attributes = getAttributesForVendor(pointOfSaleItemDetailsController.simphony_vendor_name, pointOfSaleItemDetailsController.simphony_general_category);
                        pointOfSaleItemDetailsController.simphonyData.simphonyNumber = getAttributeValue(simphony_general_attributes, pointOfSaleItemDetailsController.simphonyNumberLabel);

                        var simphony_product_name_attributes = getAttributesForVendor(pointOfSaleItemDetailsController.simphony_vendor_name, pointOfSaleItemDetailsController.simphony_product_name_category);
                        pointOfSaleItemDetailsController.simphonyData.masterRecordName = getAttributeValue(simphony_product_name_attributes, pointOfSaleItemDetailsController.masterRecordNameLabel);
                        pointOfSaleItemDetailsController.simphonyData.firstName = getAttributeValue(simphony_product_name_attributes, pointOfSaleItemDetailsController.firstNameLabel);
                        pointOfSaleItemDetailsController.simphonyData.secondName = getAttributeValue(simphony_product_name_attributes, pointOfSaleItemDetailsController.secondNameLabel);
                        pointOfSaleItemDetailsController.simphonyData.thirdName = getAttributeValue(simphony_product_name_attributes, pointOfSaleItemDetailsController.thirdNameLabel);

                        var major_group_attributes = getAttributesForVendor(pointOfSaleItemDetailsController.simphony_vendor_name, pointOfSaleItemDetailsController.simphony_major_groups_category);
                        pointOfSaleItemDetailsController.simphonyData.defaultMajorGroup = getAttributeValue(major_group_attributes, pointOfSaleItemDetailsController.defaultMajorGroupLabel);
                        pointOfSaleItemDetailsController.simphonyData.morrisonMajorGroup = getAttributeValue(major_group_attributes, pointOfSaleItemDetailsController.morrisonMajorGroupLabel);
                        pointOfSaleItemDetailsController.simphonyData.eurestMajorGroup = getAttributeValue(major_group_attributes, pointOfSaleItemDetailsController.eurestMajorGroupLabel);

                        var family_group_attributes = getAttributesForVendor(pointOfSaleItemDetailsController.simphony_vendor_name, pointOfSaleItemDetailsController.simphony_family_groups_category);
                        pointOfSaleItemDetailsController.simphonyData.defaultFamilyGroup = getAttributeValue(family_group_attributes, pointOfSaleItemDetailsController.defaultFamilyGroupLabel);
                        pointOfSaleItemDetailsController.simphonyData.morrisonFamilyGroup = getAttributeValue(family_group_attributes, pointOfSaleItemDetailsController.morrisonFamilyGroupLabel);
                        pointOfSaleItemDetailsController.simphonyData.eurestFamilyGroup = getAttributeValue(family_group_attributes, pointOfSaleItemDetailsController.eurestFamilyGroupLabel);
                    }

                    pointOfSaleItemDetailsController.legacy_pos_id = pos_item.legacy_pos_id;
                    pointOfSaleItemDetailsController.legacy_pos_description = pos_item.legacy_pos_description;
                }
            }

            function getAttributeValue(attributes, attribute_name) {
                return attributes[attribute_name];
            }

            function getAttributesForVendor(vendor_name, category_name) {
                var vendors = pos_item.pos_vendors,
                    vendorData,
                    attributes = [];

                for(var index=0; index<vendors.length;index++){
                    if(vendors[index].pos_vendor_name.toUpperCase() === vendor_name.toUpperCase()){
                        vendorData =  vendors[index];
                        break;
                    }
                }

                if(vendorData){
                    for(index=0; index<vendorData.pos_vendor_category_types.length; index++){
                        if(vendorData.pos_vendor_category_types[index].pos_vendor_category_type_name.toUpperCase() === category_name.toUpperCase()){
                            attributes = vendorData.pos_vendor_category_types[index].pos_item_attributes;
                            break;
                        }
                    }
                }
                return attributes;
            }

            pointOfSaleItemDetailsController.loadRevenueCategories = function () {
                var revenueCategoriesPromise = PointOfSaleItemDetailsService.getAllPosRevenueCategoriesDetails();

                revenueCategoriesPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.revenueCategories = $filter('orderBy')(response.data, 'name', false);
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
                        pointOfSaleItemDetailsController.itemCategories = $filter('orderBy')(response.data, 'name', false);
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
                        pointOfSaleItemDetailsController.itemClasses = $filter('orderBy')(response.data, 'name', false);

                        pointOfSaleItemDetailsController.webtrition_items_label = getCodeForItemClass('Webtrition Items');
                        pointOfSaleItemDetailsController.prepackaged_items_label = getCodeForItemClass('Prepackaged Items');
                        pointOfSaleItemDetailsController.prepared_items_label = getCodeForItemClass('Prepared Items');
                    },
                    function (error) {
                        $log.error('An error occured while loading item classes - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadUnitsOfMeasure = function () {
                PointOfSaleItemDetailsService.getAllUnitsOfMeasure().then(function (response) {
                    pointOfSaleItemDetailsController.unitsOfMeasure = $filter('orderBy')(response.data, 'name', false);
                },function (error) {
                    $log.error('Error occured while getting POS units of measure');
                    pointOfSaleItemDetailsController.unitsOfMeasure = [];
                });
            };

            pointOfSaleItemDetailsController.loadDefaultProductClasses = function () {
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.default_system_category_name,pointOfSaleItemDetailsController.infogenesis_vendor_name,pointOfSaleItemDetailsController.infogenesis_product_classes_category);
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
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.default_system_category_name,pointOfSaleItemDetailsController.infogenesis_vendor_name,pointOfSaleItemDetailsController.infogenesis_revenue_categories_category);
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
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.default_system_category_name,pointOfSaleItemDetailsController.simphony_vendor_name,pointOfSaleItemDetailsController.simphony_major_groups_category);
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
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.default_system_category_name,pointOfSaleItemDetailsController.simphony_vendor_name,pointOfSaleItemDetailsController.simphony_family_groups_category);
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
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.morrison_system_category_name,pointOfSaleItemDetailsController.infogenesis_vendor_name,pointOfSaleItemDetailsController.infogenesis_product_classes_category);
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
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.morrison_system_category_name,pointOfSaleItemDetailsController.infogenesis_vendor_name,pointOfSaleItemDetailsController.infogenesis_revenue_categories_category);
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
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.morrison_system_category_name,pointOfSaleItemDetailsController.simphony_vendor_name,pointOfSaleItemDetailsController.simphony_major_groups_category);
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
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.morrison_system_category_name,pointOfSaleItemDetailsController.simphony_vendor_name,pointOfSaleItemDetailsController.simphony_family_groups_category);
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
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.eurest_system_category_name,pointOfSaleItemDetailsController.infogenesis_vendor_name,pointOfSaleItemDetailsController.infogenesis_product_classes_category);
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
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.eurest_system_category_name,pointOfSaleItemDetailsController.infogenesis_vendor_name,pointOfSaleItemDetailsController.infogenesis_revenue_categories_category);
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
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.eurest_system_category_name,pointOfSaleItemDetailsController.simphony_vendor_name,pointOfSaleItemDetailsController.simphony_major_groups_category);
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
                var typeDetailsPromise = PointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor(pointOfSaleItemDetailsController.eurest_system_category_name,pointOfSaleItemDetailsController.simphony_vendor_name,pointOfSaleItemDetailsController.simphony_family_groups_category);
                typeDetailsPromise.then(
                    function (response) {
                        pointOfSaleItemDetailsController.simphonyData.eurestFamilyGroups = $filter('orderBy')(response.data, 'name', false);
                    },
                    function (error) {
                        $log.error('An error occured while loading eurest family groups - ', error);
                    }
                );
            };

            pointOfSaleItemDetailsController.loadAvailablePosTags = function () {
                PointOfSaleItemDetailsService.getPosTags().then(function (response) {
                    pointOfSaleItemDetailsController.availableTags = response.data;
                },function (error) {
                    $log.error('Error occured while getting POS tags');
                    pointOfSaleItemDetailsController.availableTags = [];
                });
            };

            pointOfSaleItemDetailsController.openAddTags = function () {
                var addTagsModal = $uibModal.open({
                    templateUrl: 'point-of-sale/point-of-sale-item/details/add.point.of.sale.tags.tpl.html',
                    controller: 'AddPointOfSaleTagsController as addPointOfSaleTagsController',
                    size: 'md',
                    backdrop: 'static',
                    resolve: {
                        selectedTags : {tags:pointOfSaleItemDetailsController.tags},
                        availableTags : {tags:pointOfSaleItemDetailsController.availableTags}
                    }
                });
                addTagsModal.result.then(function (result) {
                    pointOfSaleItemDetailsController.tags = result.newSelectedTags;
                });
            };

            pointOfSaleItemDetailsController.removeTag = function (tagName) {
                for(var index=0; index<pointOfSaleItemDetailsController.tags.length; index++) {
                    if(pointOfSaleItemDetailsController.tags[index].tag_name === tagName) {
                        pointOfSaleItemDetailsController.tags.splice(index, 1);
                        break;
                    }
                }
            };

            pointOfSaleItemDetailsController.clearAndGoBack = function () {
                //$rootScope.$broadcast('reloadTypeDetails',pointOfSaleItemDetailsController.default_system_category_name, 'InfoGenesis', pointOfSaleItemDetailsController.infogenesis_product_classes_category);
                StgStatesService.goToBackState();
            };

            pointOfSaleItemDetailsController.savePointOfSaleItem = function () {
                Utils.startBlockUI('point-of-sale-item-details');

                // submit form here
                var posItem = buildPosItem(),
                    userName = RBACService.getUsername();

                if(pointOfSaleItemDetailsController.action === pointOfSaleItemDetailsController.edit_item_action){
                    posItem.modified_by = userName;

                    PointOfSaleItemDetailsService.savePosItem(posItem)
                        .then(
                            function (response) {
                                if(response === 'error'){
                                    CompassToastr.error('An error occured while saving POS item. Please try again later');
                                }else{
                                    // save pos item is successful. go to POS item search grid
                                    StgStatesService.goToState('pointOfSale', {});
                                }
                                Utils.stopBlockUI('point-of-sale-item-details', 1000);
                            }
                        );
                }else{
                    // add or copy item
                    posItem.created_by = userName;

                    PointOfSaleItemDetailsService.addPosItem(posItem)
                        .then(
                            function (response) {
                                if(response === 'error'){
                                    CompassToastr.error('An error occured while adding POS item. Please try again later');
                                }else{
                                    // add pos item is successful. go to POS item search grid
                                    StgStatesService.goToState('pointOfSale', {});
                                }
                                Utils.stopBlockUI('point-of-sale-item-details', 1000);
                            }
                        );
                }
            };

            function buildPosItem() {
                return {
                    "pos_item_code": pointOfSaleItemDetailsController.pos_item_code,
                    "name": pointOfSaleItemDetailsController.item_name,
                    "pos_id": pointOfSaleItemDetailsController.posId,
                    "long_name": pointOfSaleItemDetailsController.longName,
                    "mid_name": pointOfSaleItemDetailsController.midName,
                    "short_name": pointOfSaleItemDetailsController.shortName,
                    "active": pointOfSaleItemDetailsController.active_indicator,
                    "modifier": pointOfSaleItemDetailsController.modifier_indicator,
                    "revenue_category_code": pointOfSaleItemDetailsController.revenueCategory,
                    "item_category_code": pointOfSaleItemDetailsController.itemCategory,
                    "sold_by_weight": pointOfSaleItemDetailsController.sold_by_weight_indicator,
                    "item_cost": pointOfSaleItemDetailsController.cost,
                    "default_price": pointOfSaleItemDetailsController.defaultPrice,
                    "item_class_code": pointOfSaleItemDetailsController.itemClass,
                    "item_tags": buildTags(),
                    "pos_vendors": buildPOSVendorDetails(),

                    "item_notes": pointOfSaleItemDetailsController.itemNotes,

                    /* Webtrition Items data */
                    "mrn": pointOfSaleItemDetailsController.itemClass === pointOfSaleItemDetailsController.webtrition_items_label ? pointOfSaleItemDetailsController.webtritionItem.masterReferenceNumber : '',
                    "portion_quantity": pointOfSaleItemDetailsController.itemClass === pointOfSaleItemDetailsController.webtrition_items_label ? pointOfSaleItemDetailsController.webtritionItem.portionQuantity : '',
                    "selection_quantity": pointOfSaleItemDetailsController.itemClass === pointOfSaleItemDetailsController.webtrition_items_label ? pointOfSaleItemDetailsController.webtritionItem.selectionQuantity : '',
                    "unit_of_measure_code": pointOfSaleItemDetailsController.itemClass === pointOfSaleItemDetailsController.webtrition_items_label ? pointOfSaleItemDetailsController.webtritionItem.unitOfMeasure : '',

                    /* Prepackaged Items data */
                    "bar_code": pointOfSaleItemDetailsController.itemClass === pointOfSaleItemDetailsController.prepackaged_items_label ? pointOfSaleItemDetailsController.prepackagedItem.barcode : ''
                };
            }
            
            function buildTags() {
                var tags = [],
                    tag = {};
                
                for(var index=0; index < pointOfSaleItemDetailsController.tags.length; index++){
                    tag.tag_name = pointOfSaleItemDetailsController.tags[index].tag_name;
                    tag.tag_description = pointOfSaleItemDetailsController.tags[index].tag_description;
                    tags.push(tag);
                }

                return tags;
            }

            function buildPOSVendorDetails() {
                var vendorDetail,
                    vendorDetails = [];

                /* InfoGenesis */
                vendorDetail =
                    {
                        "pos_vendor_name": pointOfSaleItemDetailsController.infogenesis_vendor_name,
                        "pos_vendor_description": "",
                        "pos_vendor_category_types": buildInfoGenesisCategoryTypes()
                    };

                vendorDetails.push(vendorDetail);

                /* Simphony */
                vendorDetail =
                    {
                        "pos_vendor_name": pointOfSaleItemDetailsController.simphony_vendor_name,
                        "pos_vendor_description": "",
                        "pos_vendor_category_types": buildSimphonyCategoryTypes()
                    };

                vendorDetails.push(vendorDetail);

                return vendorDetails;
            }

            function buildInfoGenesisCategoryTypes() {
                var vendorCategoryTypes = [];

                /* General */
                var infogenesisGeneral = buildVendorCategory(pointOfSaleItemDetailsController.infogenesis_general_category);
                infogenesisGeneral.pos_item_attributes[pointOfSaleItemDetailsController.infogenesisIdLabel] = pointOfSaleItemDetailsController.infogenesisData.infogenesisId;
                infogenesisGeneral.pos_item_attributes[pointOfSaleItemDetailsController.itemNameLabel] = pointOfSaleItemDetailsController.infogenesisData.itemName;
                infogenesisGeneral.pos_item_attributes[pointOfSaleItemDetailsController.buttonText1Label] = pointOfSaleItemDetailsController.infogenesisData.buttonText1;
                infogenesisGeneral.pos_item_attributes[pointOfSaleItemDetailsController.buttonText2Label] = pointOfSaleItemDetailsController.infogenesisData.buttonText2;

                vendorCategoryTypes.push(infogenesisGeneral);

                /* Texts */
                var infogenesisTexts = buildVendorCategory(pointOfSaleItemDetailsController.infogenesis_texts_category);

                infogenesisTexts.pos_item_attributes[pointOfSaleItemDetailsController.customerReceiptTextLabel] = pointOfSaleItemDetailsController.infogenesisData.customerReceiptText;
                infogenesisTexts.pos_item_attributes[pointOfSaleItemDetailsController.kitchenPrinterTextLabel] = pointOfSaleItemDetailsController.infogenesisData.kitchenPrinterText;
                infogenesisTexts.pos_item_attributes[pointOfSaleItemDetailsController.kitchenVideoTextLabel] = pointOfSaleItemDetailsController.infogenesisData.kitchenVideoText;

                vendorCategoryTypes.push(infogenesisTexts);

                /* Product Classes */
                var infogenesisProductClass = buildVendorCategory(pointOfSaleItemDetailsController.infogenesis_product_classes_category);

                infogenesisProductClass.pos_item_attributes[pointOfSaleItemDetailsController.defaultProductClassLabel] = pointOfSaleItemDetailsController.infogenesisData.defaultProductClass;
                infogenesisProductClass.pos_item_attributes[pointOfSaleItemDetailsController.morrisonProductClassLabel] = pointOfSaleItemDetailsController.infogenesisData.morrisonProductClass;
                infogenesisProductClass.pos_item_attributes[pointOfSaleItemDetailsController.eurestProductClassLabel] = pointOfSaleItemDetailsController.infogenesisData.eurestProductClass;

                vendorCategoryTypes.push(infogenesisProductClass);

                /* Revenue Categories */
                var infogenesisRevenueCategory = buildVendorCategory(pointOfSaleItemDetailsController.infogenesis_revenue_categories_category);

                infogenesisRevenueCategory.pos_item_attributes[pointOfSaleItemDetailsController.defaultRevenueCategoryLabel] = pointOfSaleItemDetailsController.infogenesisData.defaultRevenueCategory;
                infogenesisRevenueCategory.pos_item_attributes[pointOfSaleItemDetailsController.morrisonRevenueCategoryLabel] = pointOfSaleItemDetailsController.infogenesisData.morrisonRevenueCategory;
                infogenesisRevenueCategory.pos_item_attributes[pointOfSaleItemDetailsController.eurestRevenueCategoryLabel] = pointOfSaleItemDetailsController.infogenesisData.eurestRevenueCategory;

                vendorCategoryTypes.push(infogenesisRevenueCategory);

                return vendorCategoryTypes;
            }

            function buildSimphonyCategoryTypes() {
                var vendorCategoryTypes = [];

                /* Product Name */
                var simphonyProductName = buildVendorCategory(pointOfSaleItemDetailsController.simphony_product_name_category);

                simphonyProductName.pos_item_attributes[pointOfSaleItemDetailsController.firstNameLabel] = pointOfSaleItemDetailsController.simphonyData.firstName;
                simphonyProductName.pos_item_attributes[pointOfSaleItemDetailsController.secondNameLabel] = pointOfSaleItemDetailsController.simphonyData.secondName;
                simphonyProductName.pos_item_attributes[pointOfSaleItemDetailsController.thirdNameLabel] = pointOfSaleItemDetailsController.simphonyData.thirdName;
                simphonyProductName.pos_item_attributes[pointOfSaleItemDetailsController.masterRecordNameLabel] = pointOfSaleItemDetailsController.simphonyData.masterRecordName;

                vendorCategoryTypes.push(simphonyProductName);

                /* Major Groups */
                var simphonyMajorGroup = buildVendorCategory(pointOfSaleItemDetailsController.simphony_major_groups_category);

                simphonyMajorGroup.pos_item_attributes[pointOfSaleItemDetailsController.defaultMajorGroupLabel] = pointOfSaleItemDetailsController.simphonyData.defaultMajorGroup;
                simphonyMajorGroup.pos_item_attributes[pointOfSaleItemDetailsController.morrisonMajorGroupLabel] = pointOfSaleItemDetailsController.simphonyData.morrisonMajorGroup;
                simphonyMajorGroup.pos_item_attributes[pointOfSaleItemDetailsController.eurestMajorGroupLabel] = pointOfSaleItemDetailsController.simphonyData.eurestMajorGroup;

                vendorCategoryTypes.push(simphonyMajorGroup);

                /* Family Groups */
                var simphonyFamilyGroup = buildVendorCategory(pointOfSaleItemDetailsController.simphony_family_groups_category);

                simphonyFamilyGroup.pos_item_attributes[pointOfSaleItemDetailsController.defaultFamilyGroupLabel] = pointOfSaleItemDetailsController.simphonyData.defaultFamilyGroup;
                simphonyFamilyGroup.pos_item_attributes[pointOfSaleItemDetailsController.morrisonFamilyGroupLabel] = pointOfSaleItemDetailsController.simphonyData.morrisonFamilyGroup;
                simphonyFamilyGroup.pos_item_attributes[pointOfSaleItemDetailsController.eurestFamilyGroupLabel] = pointOfSaleItemDetailsController.simphonyData.eurestFamilyGroup;

                vendorCategoryTypes.push(simphonyFamilyGroup);

                return vendorCategoryTypes;
            }

            function buildVendorCategory(categoryName) {
                return {
                    "pos_vendor_category_type_name": categoryName,
                    "pos_vendor_category_description": "",
                    "pos_item_attributes": {}
                };
            }

            function getCodeForItemClass(itemClassName){
                if(pointOfSaleItemDetailsController.itemClasses){
                    for(var index=0; index<pointOfSaleItemDetailsController.itemClasses.length; index++){
                        if(itemClassName === pointOfSaleItemDetailsController.itemClasses[index].name){
                            return pointOfSaleItemDetailsController.itemClasses[index].item_class_code;
                        }
                    }
                }
            }


            pointOfSaleItemDetailsController.isNotReadyToSubmit = function(){
                return pointOfSaleItemDetailsController.revenueCategory === undefined ||
                        pointOfSaleItemDetailsController.itemCategory === undefined ||
                        pointOfSaleItemDetailsController.itemClass === undefined ||
                        (pointOfSaleItemDetailsController.itemClass.name === pointOfSaleItemDetailsController.webtrition_items_label && pointOfSaleItemDetailsController.webtritionItem.unitOfMeasure === undefined) ||
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