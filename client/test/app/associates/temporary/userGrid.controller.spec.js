'use strict';

describe('UserGridController', function() {

    var Ctrl,
        userAdministrationService,
        $rootScope,
        $scope,
        $window,
        $interval,
        $timeout,
        $state,
        index,
        adamsConstants,
        mockRBACService = {},
        mockUserAdministrationService = {},
        mockBlockUI = {},
        $q,
        $httpBackend,
        userData,
        mockModalDialogService,
        mockModal;

    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.common.user.grid.controller'));
    beforeEach(module('adams.user.administration.service'));
    beforeEach(module('adams.common.constants'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('RBACService', mockRBACService);
        });
    });

    beforeEach(inject(function ($controller, _$rootScope_, _$window_, _$interval_, ADAMS_CONSTANTS, _$q_, _$httpBackend_, _$timeout_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;
        adamsConstants = ADAMS_CONSTANTS;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
        index = 0;
        $rootScope = {applicationConfiguration: {application: {name: 'ADAMS'}}};
        userData = [{"personnel_number":"1801619","username":"vasiru01","first_name":"Udaykiran","middle_name":"J","last_name":"Vasireddy","birthdate":562890600000,"last_four_ssn":"4545","email":"udaykiran.vasireddy@compass-usa.com","phone_number":"614-787-9876","time_tracking_system":"MyStaff","cost_center_name":"12345","cost_center_description":"Compass-USA","cost_center_source_system_id":"1008","start_date":1462890600000,"end_date":2462890600000,"termination_date":"","vendor_number":"12124545","vendor_name_1":"Food Buy","vendor_source_system_id":"1001","base_rate":"200.00","agency":"Agency","job_name":"Chef","job_description":"Cook food","job_source_system_id":"010","comments":"Testing 123","active_engagement":true,"$$hashKey":"uiGrid-000I"}];
        $state = { params: { associateSearchData: userData }};

        mockRBACService.getCurrentProfile = function() {
            var deferred = $q.defer();
            deferred.resolve({user_name: "VASIRU01"});
            return deferred.promise.$$state.value;
        };
        mockRBACService.getCurrentRoleName = function() {
            var deferred = $q.defer();
            deferred.resolve({role_name: "Admin"});
            return deferred.promise.$$state.value.role_name;
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

        mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss')
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

        mockUserAdministrationService.getUserName = function() {
            var deferred = $q.defer();
            deferred.resolve({user_name: "VASIRU01"});
            return deferred.promise.$$state.value;
        };

        mockUserAdministrationService.getRoleName = function() {
            var deferred = $q.defer();
            deferred.resolve({role_name: "Admin"});
            return deferred.promise.$$state.value.role_name;
        };

        mockUserAdministrationService.getApplicationsByUser = function(userName) {
            var deferred = $q.defer();
            deferred.resolve([{"name": "ADAMS"}, {"name": "MyAdmin"}]);
            return deferred.promise;
        };

        mockUserAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve([{"roles": [{"role": "NoAccess"}, {"role": "Global Admin"}, {"role": "Admin"}, {"role": "User"}]}]);
            return deferred.promise;
        };

        mockUserAdministrationService.getRolesByUser = function(userName, appName) {
            var deferred = $q.defer();
            deferred.resolve([{"name": "User", "default_role": false}, {"name": "Admin", "default_role": true}]);
            return deferred.promise;
        };

        mockUserAdministrationService.getTeamsByUser = function(userName, appName, roleName, index) {
            var deferred = $q.defer();
            deferred.resolve([{"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]);
            return deferred.promise;
        };

        mockUserAdministrationService.getUserDetails = function(limit, page, appName, roleName, searchUserName, searchLastName, searchFirstName, searchCostCenter, sort) {
            var deferred = $q.defer();
            // userData = '[{"total_count": 59988, "users": [{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]}]';

            deferred.resolve({"metadata": {"resultCount": "600359"}, "data": [{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]});
            return deferred.promise;
        };


        Ctrl = $controller('UserGridController', {
            $rootScope: $rootScope,
            $scope: $scope,
            $state: $state,
            $uibModalInstance : mockModal,
            ModalDialogService: mockModalDialogService,
            UserAdministrationService: mockUserAdministrationService,
            ADAMS_CONSTANTS: adamsConstants});
    }));

    it('should initialize the controller properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });
});