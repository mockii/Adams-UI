'use strict';

describe('POS item details controller', function () {

    var posItemDetailsController,
        $scope,
        $rootScope,
        $state,
        $q,
        uibModal,
        stgStatesService={},
        compassToastr={},
        pointOfSaleItemDetailsService={},
        pointOfSaleItemDetailsServiceError = {},
        posItemDetailsControllerError = {},
        mockUtils = {},
        rbacService = {},
        mockApplicationConfigurationService = {},
        pos_item=
            {
                "pos_id": "1111",
                "item_name": "Starbucks Capuccino",
                "name": "Breakfast",
                "revenue_category_code": "A",
                "item_ctegory_name": "Additions > Combo Additions",
                "unit_of_measure": "pounds",
                "long_name": "Starbucks Capuccino",
                "mid_name": "SBUX CCINO",
                "short_name": "SBUX",
                "item_cost": 2.50,
                "default_price": 2.50,
                "active" : true,
                "modifier" : true,
                "sold_by_weight" : true,
                "item_class_name": "Prepared Item",
                "item_notes": "Item Notes Example",
                "item_tags": [
                    {
                        "tag_name": "Tag One",
                        "tag_description": "First tag"
                    },
                    {
                        "tag_name": "Tag Three",
                        "tag_description": "Third tag"
                    }
                ],

                "pos_vendors" : [
                    {
                        "pos_vendor_name": "InfoGenesis",
                        "pos_vendor_description": "Infogenesis Vendor",
                        "pos_vendor_category_types": [
                            {
                                "pos_vendor_category_type_name": "product_class",
                                "pos_vendor_category_description": "product class",
                                "pos_item_attributes": {
                                    "SIM_EUREST_MG": "POS6KYQAKB",
                                    "SIM_MORRISON_MG": "POSK9NUQPO"
                                }
                            },
                            {
                                "pos_vendor_category_type_name": "revenue_category",
                                "pos_vendor_category_description": "revenue category",
                                "pos_item_attributes": {
                                    "SIM_MORRISON_FG": "POSBKCVWAJ",
                                    "SIM_EUREST_FG": "POSMLELG9B"
                                }
                            }
                        ]
                    },
                    {
                        "pos_vendor_name": "Simphony",
                        "pos_vendor_description": "Simphony Vendor",
                        "pos_vendor_category_types": [
                            {
                                "pos_vendor_category_type_name": "major_group",
                                "pos_vendor_category_description": "major group",
                                "pos_item_attributes": {
                                    "SIM_MORRISON_FG": "POSBKCVWAJ",
                                    "SIM_EUREST_FG": "POSMLELG9B"
                                }
                            },
                            {
                                "pos_vendor_category_type_name": "family_group",
                                "pos_vendor_category_description": "family group",
                                "pos_item_attributes": {
                                    "SIM_EUREST_MG": "POS6KYQAKB",
                                    "SIM_MORRISON_MG": "POSK9NUQPO"
                                }
                            }
                        ]
                    }
                ],

                "legacy_pos_id": "1111",
                "legacy_pos_description": "Coffee",
                "created_by": "ABC",
                "created_date": "1510244602569",
                "modified_by": "DEF",
                "modified_date": "1510245602569"
            };

    beforeEach(module('ui.router'));
    beforeEach(module('adams.point.of.sale.item.details.controller'));
    beforeEach(module('common.url'));
    beforeEach(module('common.services.RBAC'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.url'));

    describe('generic',function () {
        beforeEach(function() {
            module(function ($provide) {
                $provide.value('pos_item', pos_item);
                $provide.value('Utils', mockUtils);
                $provide.value('RBACService', rbacService);
                $provide.value('ApplicationConfigurationService', mockApplicationConfigurationService);
            });
        });

        beforeEach(inject(function ($controller, _$rootScope_, _$state_, _$q_, CompassToastr) {
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            $q = _$q_;
            compassToastr = CompassToastr;

            stgStatesService = {
                goToBackState: jasmine.createSpy('stgStatesService.goToBackState')
            };

            mockUtils = {
                blockUI: {
                    instances: {
                        get: function () {
                            return {
                                start : function(){
                                    return;
                                },
                                stop : function(){
                                    return;
                                }
                            }
                        }
                    }
                },

                startBlockUI: function() {
                    return {}
                },

                stopBlockUI: function() {
                    return {}
                },

                initializeSearchFields: function () {
                    return {}
                },

                getGridSorts: function () {
                    return {'sorts': []};
                }
            };

            rbacService.getUsername = function () {
                return 'username';
            };

            mockApplicationConfigurationService.isMenuHidden = function () {
                return true;
            };

            pointOfSaleItemDetailsService.addPosItem = function (posItem) {
                var deferred = $q.defer();
                deferred.resolve(pos_item);
                return deferred.promise;
            };

            pointOfSaleItemDetailsService.savePosItem = function (posItem) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsService.getAllUnitsOfMeasure = function () {
                var deferred = $q.defer();
                deferred.resolve([{"name":"kg"}]);
                return deferred.promise;
            };

            pointOfSaleItemDetailsService.getAllPosRevenueCategoriesDetails = function () {
                var deferred = $q.defer();
                deferred.resolve([{"name":"cat one"}]);
                return deferred.promise;
            };

            pointOfSaleItemDetailsService.getAllPosItemCategoriesDetails  = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsService.getAllPosItemClassesDetails  = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsService.getPosTags = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            function mockModal(){
                this.resultDeferred = $q.defer();
                this.resultDeferred.resolve({newSelectedTags:[{"name":"tag one"},{"name":"tag two"}]});
                this.result = this.resultDeferred.promise;
            }
            mockModal.prototype.open = function(options){
                if(options && options.resolve) {
                    [{"name":"tag one"}];
                }
                return this;
            };

            posItemDetailsController = $controller('PointOfSaleItemDetailsController',
                {
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $state: $state,
                    $q: $q,
                    $uibModal: new mockModal(),
                    StgStatesService: stgStatesService,
                    CompassToastr: compassToastr,
                    PointOfSaleItemDetailsService: pointOfSaleItemDetailsService,
                    Utils: mockUtils,
                    ApplicationConfigurationService : mockApplicationConfigurationService,
                    RBACService : rbacService
                }
            );

            pointOfSaleItemDetailsServiceError.getAllUnitsOfMeasure = function () {
                var deferred = $q.defer();
                deferred.reject();
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceError.getAllPosRevenueCategoriesDetails = function () {
                var deferred = $q.defer();
                deferred.reject();
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceError.getAllPosItemCategoriesDetails  = function () {
                var deferred = $q.defer();
                deferred.reject();
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceError.getAllPosItemClassesDetails  = function () {
                var deferred = $q.defer();
                deferred.reject();
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceError.getTypeDetailsForSystemCategoryAndVendor = function () {
                var deferred = $q.defer();
                deferred.reject();
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceError.getPosTags = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            posItemDetailsControllerError = $controller('PointOfSaleItemDetailsController',
                {
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $state: $state,
                    $q: $q,
                    $uibModal: new mockModal(),
                    StgStatesService: stgStatesService,
                    CompassToastr: compassToastr,
                    PointOfSaleItemDetailsService: pointOfSaleItemDetailsServiceError,
                    Utils: mockUtils,
                    ApplicationConfigurationService : mockApplicationConfigurationService,
                    RBACService : rbacService
                }
            );

        }));

        it('should initialize', function () {
            expect(posItemDetailsController).toBeDefined();
        });

        it('should remove tag', function () {
            posItemDetailsController.tags = [{"tag_name":"tag one"},{"tag_name":"tag two"}, {"tag_name":"tag three"}];
            posItemDetailsController.removeTag('tag two');
            expect(posItemDetailsController.tags.length).toBe(2);
            expect(posItemDetailsController.tags).not.toContain({"tag_name":"tag two"});
        });

        it('should clear and go back',function () {
            posItemDetailsController.clearAndGoBack();
            expect(stgStatesService.goToBackState).toHaveBeenCalled();
        });

        it('should call openAddTags', function() {
            spyOn(posItemDetailsController, 'openAddTags').and.callThrough();
            posItemDetailsController.openAddTags();
            $scope.$apply();
            expect(posItemDetailsController.openAddTags).toHaveBeenCalled();
        });

        it('should set active tab name', function () {
            var vendorNameToSetActive = "InfoGenesis";
            posItemDetailsController.setActiveVendorTab(vendorNameToSetActive);
            expect(posItemDetailsController.activeVendorTabName).toBe(vendorNameToSetActive);
        });

        it('should load all revenue categories', function () {
            spyOn(posItemDetailsController,'loadRevenueCategories').and.callThrough();
            posItemDetailsController.loadRevenueCategories();
            $scope.$apply();
            expect(posItemDetailsController.loadRevenueCategories).toHaveBeenCalled();
        });

        it('should load all revenue categories - error', function () {
            spyOn(posItemDetailsControllerError,'loadRevenueCategories').and.callThrough();
            posItemDetailsControllerError.loadRevenueCategories();
            $scope.$apply();
            expect(posItemDetailsControllerError.loadRevenueCategories).toHaveBeenCalled();
        });

        it('should load all item categories', function () {
            spyOn(posItemDetailsController,'loadItemCategories').and.callThrough();
            posItemDetailsController.loadItemCategories();
            $scope.$apply();
            expect(posItemDetailsController.loadItemCategories).toHaveBeenCalled();
        });

        it('should load all item categories - error', function () {
            spyOn(posItemDetailsControllerError,'loadItemCategories').and.callThrough();
            posItemDetailsControllerError.loadItemCategories();
            $scope.$apply();
            expect(posItemDetailsControllerError.loadItemCategories).toHaveBeenCalled();
        });

        it('should load all item classes', function () {
            spyOn(posItemDetailsController,'loadItemClasses').and.callThrough();
            posItemDetailsController.loadItemClasses();
            $scope.$apply();
            expect(posItemDetailsController.loadItemClasses).toHaveBeenCalled();
        });

        it('should load all item classes - error', function () {
            spyOn(posItemDetailsControllerError,'loadItemClasses').and.callThrough();
            posItemDetailsControllerError.loadItemClasses();
            $scope.$apply();
            expect(posItemDetailsControllerError.loadItemClasses).toHaveBeenCalled();
        });


        it('should check if form is ready to submit', function () {
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.revenueCategory='cat one';
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.itemCategory='cat one';
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.itemClass='class one';
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.itemClass={"name":'Webtrition Item'};
            posItemDetailsController.webtritionItem={"unitOfMeasure":"cups"};
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.infogenesisData.defaultProductClass="class one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.infogenesisData.morrisonProductClass="class one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.infogenesisData.eurestProductClass="class one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.infogenesisData.defaultRevenueCategory="cat one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.infogenesisData.morrisonRevenueCategory="cat one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.infogenesisData.eurestRevenueCategory="cat one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.simphonyData.defaultMajorGroup="group one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.simphonyData.morrisonMajorGroup="group one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.simphonyData.eurestMajorGroup="group one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.simphonyData.defaultFamilyGroup ="group one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.simphonyData.morrisonFamilyGroup ="group one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(true);

            posItemDetailsController.simphonyData.eurestFamilyGroup="group one";
            expect(posItemDetailsController.isNotReadyToSubmit()).toBe(false);
        });

    });

    describe('add item',function () {

        var pointOfSaleItemDetailsServiceForError = {},
            posItemDetailsControllerForError = {};

        beforeEach(function() {
            module(function ($provide) {
                $provide.value('pos_item', pos_item);
            });
        });

        beforeEach(inject(function ($controller, _$rootScope_, _$state_, _$q_) {
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            $q = _$q_;

            stgStatesService = {
                goToState: jasmine.createSpy('stgStatesService.goToState')
            };

            $state.current.name='additem';
            posItemDetailsController = $controller('PointOfSaleItemDetailsController',
                {
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $state: $state,
                    $q: $q,
                    $uibModal: uibModal,
                    StgStatesService: stgStatesService,
                    CompassToastr: compassToastr,
                    PointOfSaleItemDetailsService: pointOfSaleItemDetailsService,
                    Utils: mockUtils,
                    ApplicationConfigurationService : mockApplicationConfigurationService,
                    RBACService : rbacService
                }
            );


            pointOfSaleItemDetailsServiceForError.addPosItem = function (posItem) {
                var deferred = $q.defer();
                deferred.resolve('error');
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllUnitsOfMeasure = function () {
                var deferred = $q.defer();
                deferred.resolve([{"name":"kg"}]);
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllPosRevenueCategoriesDetails = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllPosItemCategoriesDetails  = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllPosItemClassesDetails  = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getTypeDetailsForSystemCategoryAndVendor = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getPosTags = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            posItemDetailsControllerForError = $controller('PointOfSaleItemDetailsController',
                {
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $state: $state,
                    $q: $q,
                    $uibModal: uibModal,
                    StgStatesService: stgStatesService,
                    CompassToastr: compassToastr,
                    PointOfSaleItemDetailsService: pointOfSaleItemDetailsServiceForError,
                    Utils: mockUtils,
                    ApplicationConfigurationService : mockApplicationConfigurationService,
                    RBACService : rbacService
                }
            );

        }));

        it('should initialize for add item state', function () {
            expect(posItemDetailsController).toBeDefined();
            expect(posItemDetailsController.vendorTabs.length).toBe(2);
            expect(posItemDetailsController.vendorTabs[0].name).toBe('InfoGenesis');
            expect(posItemDetailsController.vendorTabs[1].name).toBe('Simphony');
        });

        it('should add pos item',function () {
            spyOn(pointOfSaleItemDetailsService,"addPosItem").and.callThrough();
            posItemDetailsController.revenueCategory = {
                "name": "name",
                "revenue_category_code": "code"
            };

            posItemDetailsController.itemCategory = {
                "item_category_name": "name",
                "item_category_code": "code"
            };

            posItemDetailsController.itemClass = {
                "name": "name",
                "item_class_code": "code"
            };

            posItemDetailsController.infogenesisData.defaultProductClass = {
                "name" : "name"
            };
            posItemDetailsController.infogenesisData.morrisonProductClass = {
                "name" : "name"
            };
            posItemDetailsController.infogenesisData.eurestProductClass = {
                "name" : "name"
            };

            posItemDetailsController.infogenesisData.defaultRevenueCategory = {
                "name" : "name"
            };
            posItemDetailsController.infogenesisData.morrisonRevenueCategory = {
                "name" : "name"
            };
            posItemDetailsController.infogenesisData.eurestRevenueCategory = {
                "name" : "name"
            };

            /* Simphony data */

            posItemDetailsController.simphonyData.defaultMajorGroup = {
                "name" : "name"
            };
            posItemDetailsController.simphonyData.morrisonMajorGroup = {
                "name" : "name"
            };
            posItemDetailsController.simphonyData.eurestMajorGroup = {
                "name" : "name"
            };

            posItemDetailsController.simphonyData.defaultFamilyGroup = {
                "name" : "name"
            };
            posItemDetailsController.simphonyData.morrisonFamilyGroup = {
                "name" : "name"
            };
            posItemDetailsController.simphonyData.eurestFamilyGroup = {
                "name" : "name"
            };


            posItemDetailsController.savePointOfSaleItem();
            $scope.$apply();
            expect(stgStatesService.goToState).toHaveBeenCalled();
        });

        it('should add pos item - error',function () {
            spyOn(pointOfSaleItemDetailsServiceForError,"addPosItem").and.callThrough();

            posItemDetailsControllerForError.revenueCategory = {
                "name": "name",
                "revenue_category_code": "code"
            };

            posItemDetailsControllerForError.itemCategory = {
                "name": "name",
                "item_category_code": "code"
            };

            posItemDetailsControllerForError.itemClass = {
                "name": "name",
                "item_class_code": "code"
            };

            posItemDetailsControllerForError.infogenesisData.defaultProductClass = {
                "name" : "name"
            };
            posItemDetailsControllerForError.infogenesisData.morrisonProductClass = {
                "name" : "name"
            };
            posItemDetailsControllerForError.infogenesisData.eurestProductClass = {
                "name" : "name"
            };

            posItemDetailsControllerForError.infogenesisData.defaultRevenueCategory = {
                "name" : "name"
            };
            posItemDetailsControllerForError.infogenesisData.morrisonRevenueCategory = {
                "name" : "name"
            };
            posItemDetailsControllerForError.infogenesisData.eurestRevenueCategory = {
                "name" : "name"
            };

            /* Simphony data */

            posItemDetailsControllerForError.simphonyData.defaultMajorGroup = {
                "name" : "name"
            };
            posItemDetailsControllerForError.simphonyData.morrisonMajorGroup = {
                "name" : "name"
            };
            posItemDetailsControllerForError.simphonyData.eurestMajorGroup = {
                "name" : "name"
            };

            posItemDetailsControllerForError.simphonyData.defaultFamilyGroup = {
                "name" : "name"
            };
            posItemDetailsControllerForError.simphonyData.morrisonFamilyGroup = {
                "name" : "name"
            };
            posItemDetailsControllerForError.simphonyData.eurestFamilyGroup = {
                "name" : "name"
            };

            posItemDetailsControllerForError.savePointOfSaleItem();
            $scope.$apply();
        });
    });

    describe('edit item',function () {

        var pointOfSaleItemDetailsServiceForError = {},
            posItemDetailsControllerForError = {};

        beforeEach(function() {
            module(function ($provide) {
                $provide.value('pos_item', pos_item);
            });
        });

        beforeEach(inject(function ($controller, _$rootScope_, _$state_, _$q_) {
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            $q = _$q_;

            $state.current.name='edititem';
            $state.current.data={pageTitle:{}};
            posItemDetailsController = $controller('PointOfSaleItemDetailsController',
                {
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $state: $state,
                    $q: $q,
                    $uibModal: uibModal,
                    StgStatesService: stgStatesService,
                    CompassToastr: compassToastr,
                    PointOfSaleItemDetailsService: pointOfSaleItemDetailsService,
                    Utils: mockUtils,
                    ApplicationConfigurationService : mockApplicationConfigurationService,
                    RBACService : rbacService
                }
            );

            pointOfSaleItemDetailsServiceForError.savePosItem = function (posItem) {
                var deferred = $q.defer();
                deferred.resolve('error');
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllUnitsOfMeasure = function () {
                var deferred = $q.defer();
                deferred.resolve([{"name":"kg"}]);
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllPosRevenueCategoriesDetails = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllPosItemCategoriesDetails  = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllPosItemClassesDetails  = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getTypeDetailsForSystemCategoryAndVendor = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getPosTags = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            posItemDetailsControllerForError = $controller('PointOfSaleItemDetailsController',
                {
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $state: $state,
                    $q: $q,
                    $uibModal: uibModal,
                    StgStatesService: stgStatesService,
                    CompassToastr: compassToastr,
                    PointOfSaleItemDetailsService: pointOfSaleItemDetailsServiceForError,
                    Utils: mockUtils,
                    ApplicationConfigurationService : mockApplicationConfigurationService,
                    RBACService : rbacService
                }
            );

        }));

        it('should initialize for edit item state', function () {
            expect(posItemDetailsController).toBeDefined();
            expect(posItemDetailsController.vendorTabs.length).toBe(2);
            expect(posItemDetailsController.vendorTabs[0].name).toBe('InfoGenesis');
            expect(posItemDetailsController.vendorTabs[1].name).toBe('Simphony');
        });


        it('should edit pos item',function () {
            spyOn(pointOfSaleItemDetailsService,"savePosItem").and.callThrough();
            posItemDetailsController.savePointOfSaleItem();
            $scope.$apply();
            expect(stgStatesService.goToState).toHaveBeenCalled();
        });

        it('should edit pos item - error',function () {
            spyOn(pointOfSaleItemDetailsServiceForError,"savePosItem").and.callThrough();
            posItemDetailsControllerForError.savePointOfSaleItem();
            $scope.$apply();
        });
    });

    describe('copy item',function () {

        var pointOfSaleItemDetailsServiceForError = {},
            posItemDetailsControllerForError = {};

        beforeEach(function() {
            module(function ($provide) {
                $provide.value('pos_item', pos_item);
            });
        });

        beforeEach(inject(function ($controller, _$rootScope_, _$state_, _$q_) {
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            $q = _$q_;

            $state.current.name='copyitem';
            $state.current.data={pageTitle:{}};
            posItemDetailsController = $controller('PointOfSaleItemDetailsController',
                {
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $state: $state,
                    $q: $q,
                    $uibModal: uibModal,
                    StgStatesService: stgStatesService,
                    CompassToastr: compassToastr,
                    PointOfSaleItemDetailsService: pointOfSaleItemDetailsService,
                    Utils: mockUtils,
                    ApplicationConfigurationService : mockApplicationConfigurationService,
                    RBACService : rbacService
                }
            );

            pointOfSaleItemDetailsServiceForError.addPosItem = function (posItem) {
                var deferred = $q.defer();
                deferred.resolve('error');
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllUnitsOfMeasure = function () {
                var deferred = $q.defer();
                deferred.resolve([{"name":"kg"}]);
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllPosRevenueCategoriesDetails = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllPosItemCategoriesDetails  = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getAllPosItemClassesDetails  = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getTypeDetailsForSystemCategoryAndVendor = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            pointOfSaleItemDetailsServiceForError.getPosTags = function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            posItemDetailsControllerForError = $controller('PointOfSaleItemDetailsController',
                {
                    $rootScope: $rootScope,
                    $scope: $scope,
                    $state: $state,
                    $q: $q,
                    $uibModal: uibModal,
                    StgStatesService: stgStatesService,
                    CompassToastr: compassToastr,
                    PointOfSaleItemDetailsService: pointOfSaleItemDetailsServiceForError,
                    Utils: mockUtils,
                    ApplicationConfigurationService : mockApplicationConfigurationService,
                    RBACService : rbacService
                }
            );

        }));

        it('should initialize for copy item state', function () {
            expect(posItemDetailsController).toBeDefined();
            expect(posItemDetailsController.vendorTabs.length).toBe(2);
            expect(posItemDetailsController.vendorTabs[0].name).toBe('InfoGenesis');
            expect(posItemDetailsController.vendorTabs[1].name).toBe('Simphony');
        });

        it('should copy pos item',function () {
            spyOn(pointOfSaleItemDetailsService,"savePosItem").and.callThrough();
            posItemDetailsController.savePointOfSaleItem();
            $scope.$apply();
            expect(stgStatesService.goToState).toHaveBeenCalled();
        });

        it('should copy pos item - error',function () {
            spyOn(pointOfSaleItemDetailsServiceForError,"addPosItem").and.callThrough();
            posItemDetailsControllerForError.savePointOfSaleItem();
            $scope.$apply();
        });
    });

});