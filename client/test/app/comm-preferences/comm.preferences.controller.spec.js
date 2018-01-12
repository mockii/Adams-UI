'use strict';

describe("Comm Preferences Controller Testing", function () {
    var Ctrl, Ctrl2, $timeout, selectRoleOptions2, uiGridConstants,
        userAdministrationService,
        $rootScope,
        $scope,
        CompassToastr,
        ADAMS_CONSTANTS,
        getCommPreferences,
        getCommPreferences2,
        addCommPreferences,
        updateCommPreferences,
        mockCommPreferencesService = {},
        mockBlockUI = {},
        mockUtils = {},
        logService = {},
        $q,
        $log,
        $state,
        $state2,
        $httpBackend,
        mockModalDialogService,
        mockModal,
        mockRBACService = {},
        localFunctions = {
            blockUser: function() {
                return ;
            }

        };

    beforeEach(module('adams.communication.preferences.controller'));
    beforeEach(module('adams.communication.preferences.service'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('common.modules.logging'));
    beforeEach(module('mockedObjectsData'));
    beforeEach(module('common.services.Utils'));

    beforeEach(function() {
        module(function($provide) {
            $provide.value('CommPreferencesService', mockCommPreferencesService);
            $provide.value('BlockUI', mockBlockUI);
            $provide.value('RBACService', mockRBACService);
            $provide.value('STGLogService', logService);
        });

    });


    beforeEach(inject(function($controller,  _$rootScope_, _$q_, _ADAMS_CONSTANTS_, CommPreferencesService, defaultObjects, _$timeout_, _$log_, STGLogService) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $timeout = _$timeout_;
        $log = _$log_;
        logService = STGLogService;
        ADAMS_CONSTANTS = _ADAMS_CONSTANTS_;
        mockCommPreferencesService = CommPreferencesService;
        getCommPreferences = defaultObjects.getCommPreferences;
        getCommPreferences2 = [];
        addCommPreferences = defaultObjects.addCommPreferences;
        updateCommPreferences = defaultObjects.updateCommPreferences;

        CompassToastr = jasmine.createSpyObj('CompassToastr', ['success', 'error']);

        mockModalDialogService = {
            result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function( result ) {
                this.result.confirmCallBack( result );
            },
            dismiss: function( type ) {
                this.result.cancelCallback( type );
            },
            confirm: function( errorMessage ) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        mockBlockUI = {
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
        };

        mockCommPreferencesService.getCommPreferences = function(userName) {
            var deferred = $q.defer();
            deferred.resolve(getCommPreferences);
            return deferred.promise;
        };

        mockCommPreferencesService.addCommPreferences = function(userName, commPreferences) {
            var deferred = $q.defer();
            deferred.resolve(addCommPreferences);
            return deferred.promise;
        };

        mockCommPreferencesService.updateCommPreferences = function(userName, commPreferences, communication_preference_code) {
            var deferred = $q.defer();
            deferred.resolve(updateCommPreferences);
            return deferred.promise;
        };

        mockRBACService.getCurrentProfile = function() {
            var deferred = $q.defer();
            deferred.resolve({user_name: "VASIRU01"});
            return deferred.promise.$$state.value;
        };

        $state = {params:{ userName: 'vasiru01' }};
        $state2 = {params:{ }};

        Ctrl = $controller('CommPreferencesController', {RBACService: mockRBACService, $state: $state, getCommPreferences: getCommPreferences, CommPreferencesService: mockCommPreferencesService,
            CompassToastr: CompassToastr, ADAMS_CONSTANTS: ADAMS_CONSTANTS, blockUI: mockBlockUI,
        });

        Ctrl2 = $controller('CommPreferencesController', {RBACService: mockRBACService, $state: $state2, getCommPreferences: getCommPreferences2, CommPreferencesService: mockCommPreferencesService,
            CompassToastr: CompassToastr, ADAMS_CONSTANTS: ADAMS_CONSTANTS, blockUI: mockBlockUI,
        });
    }));

    it('should initialize the CommPreferencesController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should initialize the CommPreferencesController properly', function () {
        expect(Ctrl2).not.toBeUndefined();
    });

    it('should call update user', function () {
        Ctrl.updateUser();
        $scope.$apply();
        expect(CompassToastr.success).toHaveBeenCalled();
    });

    it('should call update user else case', function () {
        updateCommPreferences = {"metadata":{"version":"1.0","status":"","http_status_code":"404","resultCount":"0"},"data":[],"error":[]};
        mockCommPreferencesService.updateCommPreferences = function(userName, commPreferences, communication_preference_code) {
            var deferred = $q.defer();
            deferred.resolve(updateCommPreferences);
            return deferred.promise;
        };

        Ctrl.updateUser();
        $scope.$apply();
        expect(CompassToastr.error).toHaveBeenCalled();
    });

    it('should call update user else case', function () {
        mockCommPreferencesService.updateCommPreferences = function(userName, commPreferences, communication_preference_code) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        Ctrl.updateUser();
        $scope.$apply();
    });

    it('should call update user', function () {
        Ctrl2.updateUser();
        $scope.$apply();
        expect(CompassToastr.success).toHaveBeenCalled();
    });

    it('should call update user else case', function () {
        addCommPreferences = {"metadata":{"version":"1.0","status":"","http_status_code":"404","resultCount":"0"},"data":[],"error":[]};
        mockCommPreferencesService.addCommPreferences = function(userName, commPreferences, communication_preference_code) {
            var deferred = $q.defer();
            deferred.resolve(addCommPreferences);
            return deferred.promise;
        };

        Ctrl2.updateUser();
        $scope.$apply();
        expect(CompassToastr.error).toHaveBeenCalled();
    });

    it('should call update user else case', function () {
        mockCommPreferencesService.addCommPreferences = function(userName, commPreferences, communication_preference_code) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        Ctrl2.updateUser();
        $scope.$apply();
    });

});