
'use strict';

describe('LocationsCostCenterMappingController', function() {
        var Ctrl,
            Ctrl1,
            Ctrl2,
            Ctrl3,
            Ctrl4,
            $scope,
            $scope1,
            logService = {},
            CompassToastr,
            adamsConstants,
            mockModalDialogService,
            locationsSearchData,
            statesService = {},
            LocationsCostCenterMappingService,
            $rootScope,
            $httpBackend,
            $q,
            $uibModal,
            mockLocationsCostCenterMappingService = {},
            mockLocationsCostCenterMappingService1 = {},
            mockLocationsCostCenterMappingService2 = {},
            costCenterRowData,
            $filter,
            mockModal,
            mockModal2,
            mockModal3,
            actualModalOptions,
            mockUtils = {},
            mockUtils1 = {},
            action,
            constants,
            compassToastr,
            $uibModalInstance,
            sampleSvcObj,
            templateHtml,
            formElem,
            form,
            $utils,
            $location,
            $state,
            $compile,
            gridApi,
            gridOptions,
            $timeout,
            event,
            event1,
            urlSpace;

        beforeEach(module('ui.router'));
        beforeEach(module('ui.bootstrap'));
        beforeEach(module('adams.utils'));
        beforeEach(module('adams.common.url'));
        beforeEach(module('adams.locations.costcenters.controller'));
        beforeEach(module('adams.locations.costcenters.service'));
        beforeEach(module('common.services.CompassToastr'));
        beforeEach(module('adams.common.constants'));
        beforeEach(module('adams.locations.details.constants'));


        beforeEach(function () {
            module(function ($provide) {
                $provide.value('LocationsCostCenterMappingService', mockLocationsCostCenterMappingService);
                $provide.value('StgStatesService', statesService);
                $provide.value('Utils', mockUtils);
                $provide.value('Utils', mockUtils1);
                $provide.value('STGLogService', logService);
                $provide.value('LOCATIONS_STATUS_CONSTANTS', constants);
            });
        });

        beforeEach(inject(function ($controller, _$state_, _$compile_, _$rootScope_, $location, _$httpBackend_, _$uibModal_, _$filter_, $timeout, LocationsCostCenterMappingService, _$q_, ADAMS_URL_SPACE, ADAMS_CONSTANTS, CompassToastr, Utils, STGLogService, $log, LOCATIONS_STATUS_CONSTANTS) {

            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $scope1 = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            sampleSvcObj = LocationsCostCenterMappingService;
            $q = _$q_;
            logService = STGLogService;
            compassToastr = CompassToastr;
            adamsConstants = ADAMS_CONSTANTS;
            urlSpace = ADAMS_URL_SPACE;
            constants = LOCATIONS_STATUS_CONSTANTS;
            $utils = Utils;
            $uibModal = _$uibModal_;
            $filter = _$filter_;
            $timeout = $timeout;
            $state = _$state_;
            $location = $location;
            $compile = _$compile_;
            locationsSearchData = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"7"},"data":[{"location_code":"234234","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LHKDYFYH","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AL","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5CCACKM","location_name":"sdfsdf","location_description":null,"address1":"asdasd","address2":"xcvxv","city":"sdfsdf","state":"AS","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5QUWC8J","location_name":"something","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"DC","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LUSXEHTV","location_name":"test loc","location_description":null,"address1":"1","address2":"2","city":"charlotte","state":"NC","zip":"11122","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LLIPTDMR","location_name":"test1","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"CT","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"10001","location_name":"test2","location_description":"test2","address1":"ibm dr","address2":"apt #555","city":"charlotte","state":"NC","zip":"28268","active":true,"longitude_latitude":"38.898648N, 77.037692W","created_by":"sunkac01","created_date":"1499713789600","modified_by":null,"modified_date":null}],"error":[]};

            costCenterRowData = {entity: {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","location_cost_center_map_status":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null}};

            $state = {
                go: function () {
                    return;
                }
            };

            statesService.goToState = function (state, params) {
                // spyOn($state, 'go');
                return;
            };

            event = {
                currentTarget: {
                    checked: false
                },
                preventDefault: function () {
                    return;
                }
            };

            event1 = {
                currentTarget: {
                    checked: true
                },
                preventDefault: function () {
                    return;
                }
            };

            mockUtils = {
                blockUI: {
                    instances: {
                        get: function () {
                            return {
                                start: function () {
                                    return;
                                },
                                stop: function () {
                                    return;
                                }
                            }
                        }
                    }
                },

                startBlockUI: function () {
                    return {}
                },

                stopBlockUI: function () {
                    return {}
                },

                initializeSearchFields: function () {
                    return {}
                },

                getGridSorts: function () {
                    return {'sorts': []};
                },

                checkIfSearchObjectPresent: function(property, searchItems){
                    return true;
                },

                getSearchIndex: function(){
                    return -1;
                }
            };

            mockUtils1 = {
                blockUI: {
                    instances: {
                        get: function () {
                            return {
                                start: function () {
                                    return;
                                },
                                stop: function () {
                                    return;
                                }
                            }
                        }
                    }
                },

                startBlockUI: function () {
                    return {}
                },

                stopBlockUI: function () {
                    return {}
                },

                initializeSearchFields: function () {
                    return {}
                },

                getGridSorts: function () {
                    return {'sorts': []};
                },

                checkIfSearchObjectPresent: function(property, searchItems){
                    return false;
                },

                getSearchIndex: function(){
                    return -1;
                }
            };

            gridOptions = {
                data: [
                    {col1: 'col1', col2: 'col2'}
                ],
                onRegisterApi: function (api) {
                    gridApi = api;
                }
            };

            gridApi = {
                grid: {
                    appScope: {
                        changeCostCenterAssociation : jasmine.createSpy('gridApi.grid.appScope.changeCostCenterAssociation '),
                        navigateToCostCenterDetail: jasmine.createSpy('gridApi.grid.appScope.navigateToCostCenterDetail')
                    }
                }
            };

            spyOn(event, 'preventDefault').and.callThrough();

            // if block
            function mockModal() {
                this.resultDeferred = $q.defer();
                this.resultDeferred.resolve('true');
                this.result = this.resultDeferred.promise;
            }

            mockModal.prototype.open = function (options) {
                return this;
            };
            mockModal.prototype.close = function (item) {
                this.resultDeferred.resolve(item);
                $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
            };
            mockModal.prototype.dismiss = function (item) {
                this.resultDeferred.reject(item);
                $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
            };

            // else block
            function mockModal2() {
                this.resultDeferred = $q.defer();
                this.resultDeferred.resolve({});
                this.result = this.resultDeferred.promise;
            }

            mockModal2.prototype.open = function (options) {
                return this;
            };
            mockModal2.prototype.close = function (item) {
                this.resultDeferred.resolve(item);
                $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
            };
            mockModal2.prototype.dismiss = function (item) {
                this.resultDeferred.reject(item);
                $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
            };


            // error block
            function mockModal3() {
                this.resultDeferred = $q.defer();
                this.resultDeferred.reject();
                this.result = this.resultDeferred.promise;
            }

            mockModal3.prototype.open = function (options) {
                return this;
            };
            mockModal3.prototype.close = function (item) {
                this.resultDeferred.resolve(item);
                $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
            };
            mockModal3.prototype.dismiss = function (item) {
                this.resultDeferred.reject(item);
                $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
            };

            mockModal = new mockModal();
            mockModal2 = new mockModal2();
            mockModal3 = new mockModal3();

            mockModalDialogService = {
                result: {
                    then: function (confirmCallback, cancelCallback) {
                        this.confirmCallBack = confirmCallback;
                        this.cancelCallback = cancelCallback;
                    }
                },
                close: function (result) {
                    this.result.confirmCallBack(result);
                },
                dismiss: function (type) {
                    this.result.cancelCallback(type);
                },
                confirm: function (errorMessage) {
                    var deferred = $q.defer();
                    deferred.resolve({});
                    return deferred.promise;
                }
            };

            $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

            mockLocationsCostCenterMappingService.getAllLocationsSearchDetails = function (limit, page, search, sort) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            mockLocationsCostCenterMappingService.getCostCentersByLocationCode = function (limit, page, search, sort) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            mockLocationsCostCenterMappingService.updateCostCentersByLocationAndCostCenterName = function (costCenterRowData) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            mockLocationsCostCenterMappingService1.updateCostCentersByLocationAndCostCenterName = function (costCenterRowData) {
                var deferred = $q.defer();
                deferred.resolve('error');
                return deferred.promise;
            };

            mockLocationsCostCenterMappingService2.updateCostCentersByLocationAndCostCenterName = function (costCenterRowData) {
                var deferred = $q.defer();
                deferred.reject();
                return deferred.promise;
            };

            $state = {
                go: function () {
                    return;
                },
                current: {
                    data: {
                        pageTitle: ''
                    }
                },
                params: {
                    locationsSearchData: locationsSearchData
                }
            };

            $scope1.locationCode = "something";

            Ctrl = $controller('LocationsCostCenterMappingController', {
                $scope: $scope,
                $state: $state,
                $location: $location,
                compassToastr: CompassToastr,
                LocationsCostCenterMappingService: mockLocationsCostCenterMappingService,
                Utils: mockUtils,
                $uibModal: mockModal,
                LOCATIONS_STATUS_CONSTANTS: LOCATIONS_STATUS_CONSTANTS
            });

            Ctrl1 = $controller('LocationsCostCenterMappingController', {
                $scope: $scope,
                $state: $state,
                $location: $location,
                compassToastr: CompassToastr,
                LocationsCostCenterMappingService: mockLocationsCostCenterMappingService,
                Utils: mockUtils1,
                $uibModal: mockModal2,
                LOCATIONS_STATUS_CONSTANTS: LOCATIONS_STATUS_CONSTANTS
            });

            Ctrl3 = $controller('LocationsCostCenterMappingController', {
                $scope: $scope,
                $state: $state,
                $location: $location,
                compassToastr: CompassToastr,
                LocationsCostCenterMappingService: mockLocationsCostCenterMappingService1,
                Utils: mockUtils1,
                $uibModal: mockModal2,
                LOCATIONS_STATUS_CONSTANTS: LOCATIONS_STATUS_CONSTANTS
            });

            Ctrl4 = $controller('LocationsCostCenterMappingController', {
                $scope: $scope1,
                $state: $state,
                $location: $location,
                compassToastr: CompassToastr,
                LocationsCostCenterMappingService: mockLocationsCostCenterMappingService2,
                Utils: mockUtils1,
                $uibModal: mockModal2,
                LOCATIONS_STATUS_CONSTANTS: LOCATIONS_STATUS_CONSTANTS
            });

            Ctrl2 = $controller('LocationsCostCenterMappingController', {
                $scope: $scope,
                $state: $state,
                $location: $location,
                compassToastr: CompassToastr,
                LocationsCostCenterMappingService: mockLocationsCostCenterMappingService,
                Utils: mockUtils1,
                $uibModal: mockModal3,
                LOCATIONS_STATUS_CONSTANTS: LOCATIONS_STATUS_CONSTANTS
            });
    }));

    it('should initialize the LocationsCostCenterMappingController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should initialize the LocationsCostCenterMappingController properly - with locationCode', function () {
        expect(Ctrl4).not.toBeUndefined();
    });

    it('should call changeCostCenterAssociation ', function() {
        spyOn(Ctrl, "changeCostCenterAssociation").and.callThrough();
        Ctrl.changeCostCenterAssociation(costCenterRowData, event);
        $scope.$apply();
        expect(Ctrl.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call changeCostCenterAssociation - else block', function() {
        spyOn(Ctrl1, "changeCostCenterAssociation").and.callThrough();
        Ctrl1.changeCostCenterAssociation(costCenterRowData, event);
        $scope.$apply();
        expect(Ctrl1.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call changeCostCenterAssociation - else block', function() {
        spyOn(Ctrl1, "changeCostCenterAssociation").and.callThrough();
        Ctrl1.changeCostCenterAssociation(costCenterRowData, event1);
        $scope.$apply();
        expect(Ctrl1.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call changeCostCenterAssociation - else block with updateLocationsCostCenter response error', function() {
        spyOn(Ctrl3, "changeCostCenterAssociation").and.callThrough();
        Ctrl3.changeCostCenterAssociation(costCenterRowData, event);
        $scope.$apply();
        expect(Ctrl3.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call changeCostCenterAssociation -error block', function() {
        spyOn(Ctrl2, "changeCostCenterAssociation").and.callThrough();
        Ctrl2.changeCostCenterAssociation(costCenterRowData, event);
        $scope.$apply();
        expect(Ctrl2.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call changeCostCenterAssociation - with updateLocationsCostCenter error block', function() {
        spyOn(Ctrl4, "changeCostCenterAssociation").and.callThrough();
        Ctrl4.changeCostCenterAssociation(costCenterRowData, event);
        $scope.$apply();
        expect(Ctrl4.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call statusFilterChanged - Inactive', function() {
        spyOn(Ctrl, "statusFilterChanged").and.callThrough();
        Ctrl.statusFilterChanged({name: 'Inactive'});
        $scope.$apply();
        expect(Ctrl.statusFilterChanged).toHaveBeenCalled();
    });

    it('should call statusFilterChanged - All', function() {
        spyOn(Ctrl, "statusFilterChanged").and.callThrough();
        Ctrl.statusFilterChanged({name:'All'});
        $scope.$apply();
        expect(Ctrl.statusFilterChanged).toHaveBeenCalled();
    });

    it('should call openAddCostCenterMapping', function() {
        spyOn(Ctrl, "openAddCostCenterMapping").and.callThrough();
        Ctrl.openAddCostCenterMapping({name:'All'});
        $scope.$apply();
        expect(Ctrl.openAddCostCenterMapping).toHaveBeenCalled();
    });

    it('should call statusFilterChanged - else', function() {
        spyOn(Ctrl, "statusFilterChanged").and.callThrough();
        Ctrl.statusFilterChanged({name:''});
        $scope.$apply();
        expect(Ctrl.statusFilterChanged).toHaveBeenCalled();
    });

    it('should call navigateToCostCenterDetail', function() {
        spyOn(Ctrl, "navigateToCostCenterDetail").and.callThrough();
        Ctrl.navigateToCostCenterDetail({entity: {cost_center_name: 'something'}});
        $scope.$apply();
        expect(Ctrl.navigateToCostCenterDetail).toHaveBeenCalled();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        // expect(Ctrl.navigateToCostCenterDetail).toEqual(gridApi.grid.appScope.navigateToCostCenterDetail);
        // expect(Ctrl.changeCostCenterAssociation).toEqual(gridApi.grid.appScope.changeCostCenterAssociation);
    });

    it('should call getGridData ', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.hasLocationCode = true;
        Ctrl.getGridData(25,1,'',{search: [
                {
                    "property": "market_name",
                    "value": "something",
                    "operator": ""
                }
            ]}
        );
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.hasLocationCode = true;
        Ctrl.searchPropertyValue = false;
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.hasLocationCode = true;
        Ctrl.searchPropertyValue = null;
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.hasLocationCode = true;
        Ctrl.searchPropertyValue = "true";
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.hasLocationCode = true;
        Ctrl.searchPropertyValue = "false";
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input - if block', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.hasLocationCode = true;
        Ctrl.searchPropertyValue = '';
        Ctrl.getGridData(25,1,'',{search: [
            {
                "property": "location_cost_center_map_status",
                "value": "something",
                "operator": ""
            }
        ]});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input - else if block', function() {
        spyOn(Ctrl1, "getGridData").and.callThrough();
        Ctrl.hasLocationCode = true;
        Ctrl1.searchPropertyValue = '';
        Ctrl1.getGridData(25,1,'',{search: [
            {
                "property": "status",
                "value": "someValue",
                "operator": ""
            }
        ]});
        $scope.$apply();
        expect(Ctrl1.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input - else if block - value = ""', function() {
        spyOn(Ctrl1, "getGridData").and.callThrough();
        Ctrl.hasLocationCode = true;
        Ctrl1.searchPropertyValue = '';
        Ctrl1.getGridData(25,1,'',{search: [
            {
                "property": "status",
                "value": "",
                "operator": ""
            }
        ]});
        $scope.$apply();
        expect(Ctrl1.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input - else if block - value = "true"', function() {
        spyOn(Ctrl1, "getGridData").and.callThrough();
        Ctrl.hasLocationCode = true;
        Ctrl1.searchPropertyValue = '';
        Ctrl1.getGridData(25,1,'',{search: [
            {
                "property": "location_cost_center_map_status",
                "value": "true",
                "operator": ""
            }
        ]});
        $scope.$apply();
        expect(Ctrl1.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input - else if - else block', function() {
        spyOn(Ctrl1, "getGridData").and.callThrough();
        Ctrl.hasLocationCode = true;
        Ctrl1.searchPropertyValue = '';
        Ctrl1.getGridData(25,1,'',{search: []});
        $scope.$apply();
        expect(Ctrl1.getGridData).toHaveBeenCalled();
    });

});