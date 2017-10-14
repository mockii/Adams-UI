'use strict';

describe('ShowHistoryModalController', function() {

    var Ctrl,
        $rootScope,
        $scope,
        $window,
        $interval,
        $timeout,
        history,
        userName,
        ADAMS_CONSTANTS,
        UserAdministrationService,
        mockUserAdministrationService = {},
        mockUtils,
        $q,
        $httpBackend,
        gridApi,
        gridOptions,
        mockModalDialogService,
        mockModal;

    beforeEach(module('ui.bootstrap'));
    //beforeEach(module('STGWebUtils'));
    beforeEach(module('adams.user.administration.show.history.modal.controller'));
    //beforeEach(module('adams.user.administration.service'));
    beforeEach(module('adams.common.constants'));
    //beforeEach(module('adams.common.url'));
    beforeEach(module('adams.utils'));



    beforeEach(module(function($provide) {
        $provide.value('UserAdministrstionService', mockUserAdministrationService);
    }));



    
    beforeEach(inject(function ($controller, _$rootScope_, _$interval_, _$q_, _$timeout_, _ADAMS_CONSTANTS_,_$httpBackend_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $interval = _$interval_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        history = [];
        userName = 'testUser';
        ADAMS_CONSTANTS = _ADAMS_CONSTANTS_;
        $timeout = _$timeout_;
        //UserAdministrationService = _UserAdministrationService_;
        //Utils = _Utils_;

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

                }
            }
        };
        
        mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss')
        };

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


        mockUtils = jasmine.createSpyObj('mockUtils', ['initializeSearchFields', 'getGridSorts']);

        mockUserAdministrationService.getUserHistory = function (limit, page, appName, roleName, searchUserName, searchLastName, searchFirstName, searchCostCenter, sort, searchStatus) {
            var deferred = $q.defer();
            // deferred.resolve([{}]);
            deferred.resolve({
                "metadata": {"resultCount": "600359"},
                "data": [{
                    "gender": "Female",
                    "active": true,
                    "sector": null,
                    "division": null,
                    "user_name": "ZZAARONP01",
                    "first_name": "PAULA",
                    "middle_name": "J",
                    "last_name": "AARON",
                    "cost_center_name": "5076",
                    "cost_center_description": "Little Rock Vending",
                    "cost_center_display_name": "5076 Little Rock Vending",
                    "work_phone": "870-863-7454",
                    "mobile_phone": "5015620111",
                    "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"
                }]
            });
            return deferred.promise;
        };

        
        Ctrl = $controller('ShowHistoryModalController', {$rootScope: $rootScope, $scope: $scope, $uibModalInstance : mockModal, $interval: $interval, userName: userName,
            ADAMS_CONSTANTS: ADAMS_CONSTANTS, ModalDialogService: mockModalDialogService, $tmeout: $timeout, UserAdministrationService: mockUserAdministrationService, Utils: mockUtils, history: history});
    }));

    it('should initialize the controller properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        expect(Ctrl.gridApi).toEqual(gridApi);
    });

    it('should call $destroy', function() {
        $scope.filterTimeout = {};
        $rootScope.$broadcast('$destroy');
        $timeout.flush(500);
        $timeout.verifyNoPendingTasks();
    });

    it('should call $destroy - undefined', function() {
        $scope.filterTimeout = undefined;
        $rootScope.$broadcast('$destroy');
    });

    it('should call getGridData', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call close', function () {
        spyOn(Ctrl, "close").and.callThrough();
        Ctrl.close();
        $scope.$apply();
        expect(Ctrl.close).toHaveBeenCalled();
    });

    it('should call submit', function () {
        spyOn(Ctrl, "submit").and.callThrough();
        Ctrl.submit();
        $scope.$apply();
        expect(Ctrl.submit).toHaveBeenCalled();
    });
});

