'use strict';

describe('AssociatesSearchController', function() {

    var Ctrl,
        $rootScope,
        $scope,
        $window,
        $interval,
        $timeout,
        $state,
        index,
        adamsConstants,
        mockBlockUI = {},
        mockUtils = {},
        statesService = {},
        timeTrackingSystem,
        $q,
        $httpBackend,
        associatesSearchService,
        gridOptions,
        gridApi,
        mockModalDialogService,
        mockAssociatesSearchService = {},
        associateData,
        mockModal;

    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.associates.temp.search.controller'));
    beforeEach(module('adams.associates.temp.search.service'));
    beforeEach(module('adams.common.constants'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('AssociatesSearchService', mockAssociatesSearchService);
            $provide.value('StgStatesService', statesService);
            $provide.value('Utils', mockUtils);
            // $provide.value('ModalDialogService', mockModalDialogService);
        });
    });

    beforeEach(inject(function ($controller, _$rootScope_, _$window_, _$interval_, ADAMS_CONSTANTS, _$q_, _$httpBackend_, _$timeout_, AssociatesSearchService) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;
        adamsConstants = ADAMS_CONSTANTS;
        timeTrackingSystem = '';
        associatesSearchService = AssociatesSearchService;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
        index = 0;

        associateData = {"metadata": {"resultCount": "25"}, "data": [{ "personnel_number": "1801619", "username": "vasiru01", "first_name": "Udaykiran", "middle_name": "J", "last_name": "Vasireddy", "birthdate": 562890600000, "last_four_ssn": "4545", "email": "udaykiran.vasireddy@compass-usa.com", "phone_number": "614-787-9876", "time_tracking_system": "MyStaff", "cost_center_name": "12345", "cost_center_description": "Compass-USA", "cost_center_source_system_id": "1008", "start_date": 1462890600000, "end_date": 2462890600000, "termination_date": "", "vendor_number": "12124545", "vendor_name_1": "Food Buy", "vendor_source_system_id": "1001", "base_rate": "200.00", "agency": "Agency", "job_name": "Chef", "job_description": "Cook food", "job_source_system_id": "010", "comments": "Testing 123", "active_engagement": true}]};

        mockModalDialogService = {
            result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function( result ) {
                //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
                this.result.confirmCallBack( result );
            },
            dismiss: function( type ) {
                //The user clicked cancel on the modal dialog, call the stored cancel callback
                this.result.cancelCallback( type );
            }
        };

        mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss')
        };

        statesService.goToState = function(state, params){
            // spyOn($state, 'go');
            return;
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
            },
            checkIfSearchObjectPresent: function(property, searchItems){
                return true;
            },
            getSearchIndex: function(){
                return -1;
            }
        };

        mockBlockUI = {
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
        };

        mockModalDialogService.confirm = function(){
            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
        };

        mockAssociatesSearchService.getTempAssociates = function(limit, page, sort, searchInput) {
            var deferred = $q.defer();
            deferred.resolve({"metadata": {"resultCount": "25"}, "data": [{ "personnel_number": "1801619", "username": "vasiru01", "first_name": "Udaykiran", "middle_name": "J", "last_name": "Vasireddy", "birthdate": 562890600000, "last_four_ssn": "4545", "email": "udaykiran.vasireddy@compass-usa.com", "phone_number": "614-787-9876", "time_tracking_system": "MyStaff", "cost_center_name": "12345", "cost_center_description": "Compass-USA", "cost_center_source_system_id": "1008", "start_date": 1462890600000, "end_date": 2462890600000, "termination_date": "", "vendor_number": "12124545", "vendor_name_1": "Food Buy", "vendor_source_system_id": "1001", "base_rate": "200.00", "agency": "Agency", "job_name": "Chef", "job_description": "Cook food", "job_source_system_id": "010", "comments": "Testing 123", "active_engagement": true}]});
            return deferred.promise;
        };

        $state = { go: function() { return; }};

        gridOptions = {
            data: [
                { col1: 'col1', col2: 'col2' }
            ],
            onRegisterApi: function( api ){
                gridApi = api;
            }
        };

        gridApi = {
            grid: {
                appScope: {
                    showVendorSearchData: jasmine.createSpy('gridApi.grid.appScope.showVendorSearchData')
                }
            }
        };
        
        Ctrl = $controller('AssociatesSearchController', {$scope: $scope, $state: $state, ADAMS_CONSTANTS: adamsConstants, $timeout: $timeout, AssociatesSearchService: mockAssociatesSearchService, ModalDialogService: mockModalDialogService, timeTrackingSystem: timeTrackingSystem, Utils: mockUtils, StgStatesService: statesService});
    }));

    // it('should initialize the controller properly', function () {
    //     expect(Ctrl).not.toBeUndefined();
    //     $scope.$apply();
    //     expect(Ctrl.gridOptions.totalItems).toEqual('25');
    // });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        expect(Ctrl.showAssociateSearchData).toEqual(gridApi.grid.appScope.showAssociateSearchData)
    });

    it('should change the state', function () {
        spyOn(Ctrl, 'showAssociateSearchData').and.callThrough();
        Ctrl.showAssociateSearchData(associateData.data[0]);
        $scope.$apply();
        expect(Ctrl.showAssociateSearchData).toHaveBeenCalledWith(associateData.data[0]);
    });

    it('should change the state', function () {
        spyOn(statesService, 'goToState');
        Ctrl.go('tempAssociates');
        $scope.$apply();
        expect(statesService.goToState).toHaveBeenCalled();
    });

    it('should call resourceSelected', function () {
        spyOn(Ctrl, 'resourceSelected').and.callThrough();
        Ctrl.resourceSelected('Engaged Resources');
        $scope.$apply();
        expect(Ctrl.resourceSelected).toHaveBeenCalled();
        expect(Ctrl.searchPropertyValue).toEqual(true);
    });

    it('should call resourceSelected - Available Resources', function () {
        spyOn(Ctrl, 'resourceSelected').and.callThrough();
        Ctrl.resourceSelected('Available Resources');
        $scope.$apply();
        expect(Ctrl.resourceSelected).toHaveBeenCalled();
        expect(Ctrl.searchPropertyValue).toEqual(false);
    });

    it('should call resourceSelected - else block', function () {
        spyOn(Ctrl, 'resourceSelected').and.callThrough();
        Ctrl.resourceSelected();
        $scope.$apply();
        expect(Ctrl.resourceSelected).toHaveBeenCalled();
        expect(Ctrl.searchPropertyValue).toEqual('');
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
        Ctrl.getGridData(25,1,'',{search: null});
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
    
});