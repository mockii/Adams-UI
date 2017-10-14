
'use strict';

describe('LocationsSearchController', function() {
        var Ctrl,
            Ctrl1,
            Ctrl2,
            Ctrl3,
            Ctrl4,
            $scope,
            logService = {},
            CompassToastr,
            adamsConstants,
            mockModalDialogService,
            locationsSearchData,
            statesService = {},
            LocationsSearchService,
            $rootScope,
            $httpBackend,
            $q,
            $uibModal,
            mockLocationsService = {},
            mockLocationsDetailsService = {},
            mockLocationsDetailsService1 = {},
            mockLocationsDetailsService2 = {},
            locationsRowData,
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
            urlSpace;

        beforeEach(module('ui.router'));
        beforeEach(module('ui.bootstrap'));
        beforeEach(module('adams.utils'));
        beforeEach(module('adams.common.url'));
        beforeEach(module('adams.locations.search.controller'));
        beforeEach(module('adams.locations.search.service'));
        beforeEach(module('adams.locations.details.service'));
        beforeEach(module('common.services.CompassToastr'));
        beforeEach(module('adams.common.constants'));
        beforeEach(module('adams.locations.details.constants'));


        beforeEach(function () {
            module(function ($provide) {
                $provide.value('LocationsSearchService', mockLocationsService);
                $provide.value('LocationsDetailsService', mockLocationsDetailsService);
                $provide.value('LocationsDetailsService', mockLocationsDetailsService1);
                $provide.value('LocationsDetailsService', mockLocationsDetailsService2);
                $provide.value('StgStatesService', statesService);
                $provide.value('Utils', mockUtils);
                $provide.value('Utils', mockUtils1);
                $provide.value('STGLogService', logService);
                $provide.value('LOCATIONS_STATUS_CONSTANTS', constants);
            });
        });

        beforeEach(inject(function ($controller, _$state_, _$compile_, _$rootScope_, $location, _$httpBackend_, _$uibModal_, _$filter_, $timeout, LocationsSearchService, _$q_, ADAMS_URL_SPACE, ADAMS_CONSTANTS, CompassToastr, Utils, STGLogService, $log, LOCATIONS_STATUS_CONSTANTS) {

            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            sampleSvcObj = LocationsSearchService;
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
            locationsSearchData = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"7"},"data":[{"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LHKDYFYH","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AL","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5CCACKM","location_name":"sdfsdf","location_description":null,"address1":"asdasd","address2":"xcvxv","city":"sdfsdf","state":"AS","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5QUWC8J","location_name":"something","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"DC","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LUSXEHTV","location_name":"test loc","location_description":null,"address1":"1","address2":"2","city":"charlotte","state":"NC","zip":"11122","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LLIPTDMR","location_name":"test1","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"CT","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"10001","location_name":"test2","location_description":"test2","address1":"ibm dr","address2":"apt #555","city":"charlotte","state":"NC","zip":"28268","active":true,"longitude_latitude":"38.898648N, 77.037692W","created_by":"sunkac01","created_date":"1499713789600","modified_by":null,"modified_date":null}],"error":[]};

            locationsRowData = {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null};

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
                        changeLocationsStatus: jasmine.createSpy('gridApi.grid.appScope.changeLocationsStatus'),
                        editLocationsSearchData: jasmine.createSpy('gridApi.grid.appScope.editLocationsSearchData'),
                        showLocationsHours: jasmine.createSpy('gridApi.grid.appScope.showLocationsHours')
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

            mockLocationsService.getAllLocationsSearchDetails = function (limit, page, search, sort) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            mockLocationsDetailsService.updateLocationDetailsByLocationCode = function (locationsRowData) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };

            mockLocationsDetailsService1.updateLocationDetailsByLocationCode = function (locationsRowData) {
                var deferred = $q.defer();
                deferred.resolve('error');
                return deferred.promise;
            };

            mockLocationsDetailsService2.updateLocationDetailsByLocationCode = function (locationsRowData) {
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

            Ctrl = $controller('LocationsSearchController', {
                $scope: $scope,
                $state: $state,
                $timeout: $timeout,
                $location: $location,
                $uibModalInstance: $uibModalInstance,
                compassToastr: CompassToastr,
                ADAMS_CONSTANTS: adamsConstants,
                ModalDialogService: mockModalDialogService,
                LocationsSearchService: mockLocationsService,
                LocationsDetailsService: mockLocationsDetailsService,
                Utils: mockUtils,
                $uibModal: mockModal,
                StgStatesService: statesService,
                LOCATIONS_STATUS_CONSTANTS: LOCATIONS_STATUS_CONSTANTS
            });

            Ctrl1 = $controller('LocationsSearchController', {
                $scope: $scope,
                $state: $state,
                $timeout: $timeout,
                $location: $location,
                $uibModalInstance: $uibModalInstance,
                compassToastr: CompassToastr,
                ADAMS_CONSTANTS: adamsConstants,
                ModalDialogService: mockModalDialogService,
                LocationsSearchService: mockLocationsService,
                LocationsDetailsService: mockLocationsDetailsService,
                Utils: mockUtils1,
                $uibModal: mockModal2,
                StgStatesService: statesService,
                LOCATIONS_STATUS_CONSTANTS: LOCATIONS_STATUS_CONSTANTS
            });

            Ctrl3 = $controller('LocationsSearchController', {
                $scope: $scope,
                $state: $state,
                $timeout: $timeout,
                $location: $location,
                $uibModalInstance: $uibModalInstance,
                compassToastr: CompassToastr,
                ADAMS_CONSTANTS: adamsConstants,
                ModalDialogService: mockModalDialogService,
                LocationsSearchService: mockLocationsService,
                LocationsDetailsService: mockLocationsDetailsService1,
                Utils: mockUtils1,
                $uibModal: mockModal2,
                StgStatesService: statesService,
                LOCATIONS_STATUS_CONSTANTS: LOCATIONS_STATUS_CONSTANTS
            });

            Ctrl4 = $controller('LocationsSearchController', {
                $scope: $scope,
                $state: $state,
                $timeout: $timeout,
                $location: $location,
                $uibModalInstance: $uibModalInstance,
                compassToastr: CompassToastr,
                ADAMS_CONSTANTS: adamsConstants,
                ModalDialogService: mockModalDialogService,
                LocationsSearchService: mockLocationsService,
                LocationsDetailsService: mockLocationsDetailsService2,
                Utils: mockUtils1,
                $uibModal: mockModal2,
                StgStatesService: statesService,
                LOCATIONS_STATUS_CONSTANTS: LOCATIONS_STATUS_CONSTANTS
            });

            Ctrl2 = $controller('LocationsSearchController', {
                $scope: $scope,
                $state: $state,
                $timeout: $timeout,
                $location: $location,
                $uibModalInstance: $uibModalInstance,
                compassToastr: CompassToastr,
                ADAMS_CONSTANTS: adamsConstants,
                ModalDialogService: mockModalDialogService,
                LocationsSearchService: mockLocationsService,
                LocationsDetailsService: mockLocationsDetailsService2,
                Utils: mockUtils1,
                $uibModal: mockModal3,
                StgStatesService: statesService,
                LOCATIONS_STATUS_CONSTANTS: LOCATIONS_STATUS_CONSTANTS
            });
    }));

    it('should initialize the LocationsSearchController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call showLocationsHours', function() {
        spyOn(Ctrl, "showLocationsHours").and.callThrough();
        Ctrl.showLocationsHours(locationsRowData);
        $scope.$apply();
        expect(Ctrl.showLocationsHours).toHaveBeenCalled();
    });

    it('should call editLocationsSearchData', function() {
        spyOn(Ctrl, "editLocationsSearchData").and.callThrough();
        Ctrl.editLocationsSearchData(locationsRowData);
        $scope.$apply();
        expect(Ctrl.editLocationsSearchData).toHaveBeenCalled();
    });

    it('should call addLocations', function() {
        spyOn(Ctrl, "addLocations").and.callThrough();
        Ctrl.addLocations();
        $scope.$apply();
        expect(Ctrl.addLocations).toHaveBeenCalled();
    });

    it('should call changeLocationsStatus', function() {
        spyOn(Ctrl, "changeLocationsStatus").and.callThrough();
        Ctrl.changeLocationsStatus(locationsRowData, event);
        $scope.$apply();
        expect(Ctrl.changeLocationsStatus).toHaveBeenCalled();
    });

    it('should call changeLocationsStatus - else block', function() {
        spyOn(Ctrl1, "changeLocationsStatus").and.callThrough();
        Ctrl1.changeLocationsStatus(locationsRowData, event);
        $scope.$apply();
        expect(Ctrl1.changeLocationsStatus).toHaveBeenCalled();
    });

    it('should call changeLocationsStatus - else block with updateLocationDetailsByLocationCode response error', function() {
        spyOn(Ctrl3, "changeLocationsStatus").and.callThrough();
        Ctrl3.changeLocationsStatus(locationsRowData, event);
        $scope.$apply();
        expect(Ctrl3.changeLocationsStatus).toHaveBeenCalled();
    });

    it('should call changeLocationsStatus -error block', function() {
        spyOn(Ctrl2, "changeLocationsStatus").and.callThrough();
        Ctrl2.changeLocationsStatus(locationsRowData, event);
        $scope.$apply();
        expect(Ctrl2.changeLocationsStatus).toHaveBeenCalled();
    });

    it('should call changeLocationsStatus - with updateLocationDetailsByLocationCode error block', function() {
        spyOn(Ctrl4, "changeLocationsStatus").and.callThrough();
        Ctrl4.changeLocationsStatus(locationsRowData, event);
        $scope.$apply();
        expect(Ctrl4.changeLocationsStatus).toHaveBeenCalled();
    });

    it('should call errorHandling', function () {
        spyOn(Ctrl, 'errorHandling');
        Ctrl.errorHandling('error');
        expect(Ctrl.errorHandling).toHaveBeenCalled();
    });

    it('should call statusFilterChanged - Inactive', function() {
        spyOn(Ctrl, "statusFilterChanged").and.callThrough();
        Ctrl.statusFilterChanged({name: 'Inactive'});
        $scope.$apply();
        expect(Ctrl.statusFilterChanged).toHaveBeenCalled();
    });

    it('should call statusFilterChanged - All', function() {
        spyOn(Ctrl, "statusFilterChanged").and.callThrough();
        Ctrl.statusFilterChanged({name:''});
        $scope.$apply();
        expect(Ctrl.statusFilterChanged).toHaveBeenCalled();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        /*expect(Ctrl.changeLocationsStatus).toEqual(gridApi.grid.appScope.changeLocationsStatus);
        expect(Ctrl.editLocationsSearchData).toEqual(gridApi.grid.appScope.editLocationsSearchData);*/
        expect(Ctrl.navigateToCostCenterDetail).toEqual(gridApi.grid.appScope.navigateToCostCenterDetail);
    });

    it('should call getGridData ', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
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
        Ctrl.searchPropertyValue = false;
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.searchPropertyValue = null;
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input - if block', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.searchPropertyValue = '';
        Ctrl.getGridData(25,1,'',{search: [
            {
                "property": "active",
                "value": "something",
                "operator": ""
            }
        ]});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input - else if block', function() {
        spyOn(Ctrl1, "getGridData").and.callThrough();
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
        Ctrl1.searchPropertyValue = '';
        Ctrl1.getGridData(25,1,'',{search: [
            {
                "property": "status",
                "value": "true",
                "operator": ""
            }
        ]});
        $scope.$apply();
        expect(Ctrl1.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input - else if - else block', function() {
        spyOn(Ctrl1, "getGridData").and.callThrough();
        Ctrl1.searchPropertyValue = '';
        Ctrl1.getGridData(25,1,'',{search: []});
        $scope.$apply();
        expect(Ctrl1.getGridData).toHaveBeenCalled();
    });

});