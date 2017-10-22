'use strict';

describe('UserTeamAccessController', function() {

    var Ctrl, Ctrl1, Ctrl2, appName2, roleName2, $timeout, selectRoleOptions2, uiGridConstants,
        userAdministrationService,
        $rootScope,
        $scope,
        $window,
        $interval,
        $uibModal,
        userName,
        appName,
        $intervalSpy,
        roleName,
        teamName,
        sourceSystemId,
        applications,
        limit,
        page,
        loginRoles,
        userRoles,
        searchUserName,
        searchLastName,
        searchFirstName,
        $uibModalInstance,
        searchCostCenter,
        searchStatus,
        teams,
        teams1,
        teams2,
        logService = {},
        sort,
        gridOptions,
        gridApi,
        index,
        adamsConstants,
        statesService = {},
        mockUserAdministrationService = {},
        mockBlockUI = {},
        mockUtils = {},
        $q,
        $httpBackend,
        userData,
        selectApplicationOptions,
        selectRoleOptions,
        mockModalDialogService,
        mockModal,
        mockModal1,
        mockRBACService = {},
        localFunctions = {
            blockUser: function() {
                return ;
            }

        };
    
    beforeEach(module('ui.bootstrap'));
   /* beforeEach(module('STGWebUtils'));*/
    beforeEach(module('ui.grid'));

    beforeEach(module('adams.user.administration.team.access.modal.controller'));
    beforeEach(module('adams.user.administration.service'));
    /*beforeEach(module('adams.user.administration.add.user.access.modal.controller'));
    beforeEach(module('adams.user.administration.show.history.modal.controller'));*/
    beforeEach(module('adams.common.constants'));
    

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('UserAdministrationService', mockUserAdministrationService);
            $provide.value('BlockUI', mockBlockUI);
            $provide.value('RBACService', mockRBACService);
            $provide.value('StgStatesService', statesService);
            $provide.value('Utils', mockUtils);
            $provide.value('STGLogService', logService);
            // $provide.value('ModalDialogService', mockModalDialogService);
        });
    });

    beforeEach(inject(function ($controller, _$rootScope_, _$window_, _$interval_, UserAdministrationService, ADAMS_CONSTANTS, _$q_, _$timeout_, _uiGridConstants_, _$httpBackend_, STGLogService) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;
        userName = 'VASIRU01';
        logService = STGLogService;
        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
        $intervalSpy = jasmine.createSpy('$interval', $interval);
        loginRoles  = [{"role": "NoAccess"}, {"role": "Global Admin"}, {"role": "Admin"}, {"role": "User"}];
        userRoles  = [{"name": "Admin", "default_role": true, "teams": [{team_display_path: "/none/", "team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}, {"name": "User", "default_role": false, "teams": [{"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}];

        applications = [{name: 'ADAMS'}, {name: 'Webtrition'}, {name: 'MyAdmin'}];

        //$uibModal = jasmine.createSpyObj('$uibModal', ['close', 'dismiss']);
        adamsConstants = ADAMS_CONSTANTS;
        userAdministrationService = UserAdministrationService;
        
        $q = _$q_;
        $timeout = _$timeout_;
        $httpBackend = _$httpBackend_;
        appName = 'ADAMS';
        roleName = 'Admin';
        teamName = 100007;
        sourceSystemId = 1002;
        limit = 25;
        page = 1;
        searchUserName = '';
        searchLastName = '';
        searchFirstName = '';
        searchCostCenter = '';
        sort = '';
        index = 0;
        uiGridConstants = _uiGridConstants_;

        teams = '[{"metadata": {"resultCount": "600359"}, "data": [{"team_name": "COMPASS", "team_display_name": "COMPASS", "team_display_path": "/COMPASS/100007", "team_path": "GROUP/COMPASS/100000/","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}]',
        teams1 = '[{"metadata": {"resultCount": "600359"}, "data": [{"team_name": "COMPASS", "team_display_name": "COMPASS1", "team_display_path": "/COMPASS/200007", "team_path": "GROUP/COMPASS/100000/","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}]',
        teams2 = '[{"metadata": {"resultCount": "600359"}, "data": [{"team_name": "COMPASS", "team_display_name": "COMPASS", "team_display_path": "/COMPASS/100007", "team_path": "GROUP1/COMPASS1/200000/","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}]',


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
                    showProductsSearchData: jasmine.createSpy('gridApi.grid.appScope.showProductsSearchData')
                },
                columns: [{
                    name: 'something',
                    filters: [{
                        term: 'someterm'
                    }]
                },{
                    name: 'something',
                    filters: [{
                        term: 'someterm'
                    }]
                },{
                    name: 'something',
                    filters: [{
                        term: 'someterm'
                    }]
                },{
                    name: 'something',
                    filters: [{
                        term: 'someterm'
                    }]
                },{
                    name: 'something',
                    filters: [{
                        term: 'someterm'
                    }]
                }]
            },
            selection: {
                selectRow: function(){
                    return '';
                },
                unSelectRow: function(){
                    return '';
                }
            }
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
        
        // mockModal = {
        //     result: {
        //         then: function(confirmCallback, cancelCallback) {
        //             //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
        //             this.confirmCallBack = confirmCallback;
        //             this.cancelCallback = cancelCallback;
        //         }
        //     },
        //     close: function( result ) {
        //         //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
        //         this.result.confirmCallBack( result );
        //     },
        //     dismiss: function( type ) {
        //         //The user clicked cancel on the modal dialog, call the stored cancel callback
        //         this.result.cancelCallback( type );
        //     }
        // };

        function mockModal(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.resolve({action: 'ADD', selectedTeam: teamName, current_app_from_modal: 'something'});
            this.result = this.resultDeferred.promise;
            // console.log(this.open();
        }
        mockModal.prototype.open = function(options){
            if(options && options.resolve) {
                options.resolve.loginAppName ? options.resolve.loginAppName() : '';
                options.resolve.loginRoleName ? options.resolve.loginRoleName(): '';
                options.resolve.applications ? options.resolve.applications() : '';
                options.resolve.defaultApplication ? options.resolve.defaultApplication() : '';
                options.resolve.userRoles ? options.resolve.userRoles() : '';
                options.resolve.roleName ? options.resolve.roleName() : '';
                options.resolve.target_applications ? options.resolve.target_applications(): '';
                options.resolve.userName ? options.resolve.userName() : '';
                options.resolve.history ? options.resolve.history[1](mockUserAdministrationService): '';

                options.resolve.loginRoles ? options.resolve.loginRoles(): '';

            }
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

        mockModal = new mockModal();

        function mockModal1(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.resolve({action: 'ADD', selectedTeam: teamName, current_app_from_modal: 'something'});
            this.result = this.resultDeferred.promise;
            // console.log(this.open();
        }
        mockModal1.prototype.open = function(options){
            if(options && options.resolve) {
                options.resolve.loginAppName ? options.resolve.loginAppName() : '';
                options.resolve.loginRoleName ? options.resolve.loginRoleName(): '';
                options.resolve.applications ? options.resolve.applications() : '';
                options.resolve.defaultApplication ? options.resolve.defaultApplication() : '';
                options.resolve.userRoles ? options.resolve.userRoles() : '';
                options.resolve.roleName ? options.resolve.roleName() : '';
                options.resolve.target_applications ? options.resolve.target_applications(): '';
                options.resolve.userName ? options.resolve.userName() : '';
                options.resolve.history ? options.resolve.history[1](mockUserAdministrationService): '';

                if(options.resolve.loginRoles){Ctrl2.defaultApplication = null; options.resolve.loginRoles();};

            }
            return this;
        };
        mockModal1.prototype.close = function (item) {
            this.resultDeferred.resolve(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };
        mockModal1.prototype.dismiss = function (item) {
            this.resultDeferred.reject(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };

        mockModal1 = new mockModal1();
        
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

        mockModalDialogService.alert = function(){
            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
        };

        mockUserAdministrationService.getUserName = function() {
            var deferred = $q.defer();
            deferred.resolve({user_name: "VASIRU01"});
            return deferred.promise.$$state.value;
        };


        mockUserAdministrationService.getHierarchicalTeams = function() {
            var deferred = $q.defer();
            deferred.resolve([]);
            return deferred.promise;
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

        mockUserAdministrationService.deleteApp = function(userName, appName) {
            var deferred = $q.defer();
            deferred.resolve([{"message": "Success"}]);
            return deferred.promise;
        };

        mockUserAdministrationService.deleteRoles = function(userName, appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve([{"message": "Success"}]);
            return deferred.promise;
        };

        mockUserAdministrationService.deleteTeam = function(userName, appName, roleName, teamName, sourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve([{"message": "Success"}]);
            return deferred.promise;
        };

        mockUserAdministrationService.changeDefaultRole = function(userName, appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve([{"message": "Success"}]);
            return deferred.promise;
        };

        mockUserAdministrationService.changeDefaultTeam = function(userName, appName, roleName, teamName, sourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve([{"message": "Success"}]);
            return deferred.promise;
        };

        mockRBACService.changeRbacProfile = function(qs) {
            var deferred = $q.defer();
            deferred.resolve([{"message": "Success"}]);
            return deferred.promise;
        };

        userData = {user: "ZZAARONP01",
                    userApplications: [{"name": "ADAMS"},{"name": "MyAdmin"}]
                };

        selectApplicationOptions = [{name: "ADAMS"},{name: "MyAdmin"}, {name: "MyAdmin"}];

        selectRoleOptions = [{name: "Admin"}, {name: 'User"'}, {name: "Global Admin"}];



        Ctrl = $controller('UserTeamAccessController', {$rootScope: $rootScope, $scope: $scope, $uibModal : mockModal, $uibModalInstance: $uibModalInstance, UserAdministrationService: userAdministrationService, $timeout: $timeout, userName: userName,
                                blockUI: mockBlockUI, loginAppName: "ADAMS", loginRoleName: "Admin", applications: applications, defaultApplication: appName, roleName: roleName, ADAMS_CONSTANTS: adamsConstants, ModalDialogService: mockModalDialogService, loginRoles: loginRoles, userRoles: userRoles,
                                userData: userData, selectApplicationOptions: selectApplicationOptions, selectRoleOptions: selectRoleOptions, uiGridConstants: uiGridConstants, RBACService: mockRBACService, Utils: mockUtils, StgStatesService: statesService});

        appName2 = '';
        roleName2 = '';
        selectRoleOptions2 = [{"name":"Account User","description":"Account User - Recipe Create","rank":500,"order":50},{"name":"Accountant","description":"Accountant","rank":500,"order":50},{"name":"AccountingSeniorManagementGroup","description":"Accounting Senior Management Group","rank":500,"order":50},{"name":"AccountingSupervisor","description":"Accounting Supervisor","rank":500,"order":50},{"name":"Admin","description":"Administrator","rank":999,"order":60},{"name":"Application Owner","description":"Application Owner","rank":300,"order":10},{"name":"AssetPurchaseRequestApprover","description":"Asset Purchase Request Approver","rank":50,"order":50},{"name":"AssetPurchaseRequestCompliance","description":"Asset Purchase Request Compliance Team","rank":50,"order":50},{"name":"AssetViolationApprover","description":"Asset Violation Approver Team","rank":50,"order":50},{"name":"AssetViolationCompliance","description":"Asset Violation Team","rank":50,"order":50},{"name":"BPMSysAdmin","description":"BPM System Administrator","rank":800,"order":100},{"name":"BenefitsCompliance","description":"Benefits Compliance","rank":500,"order":50},{"name":"CanteenAccounting","description":"Canteen Accounting Team","rank":500,"order":50},{"name":"CashManagement","description":"Cash Management Department","rank":500,"order":50},{"name":"ContractualTeam","description":"Contractual Team","rank":500,"order":50},{"name":"ContractualTeamApprover","description":"Contractual Team Approver","rank":500,"order":50},{"name":"FANewOpenings","description":"FA New Openings","rank":50,"order":50},{"name":"FANewOpeningsManagement","description":"FA New Openings Management","rank":51,"order":51},{"name":"FASystems","description":"FA Systems","rank":500,"order":50},{"name":"FIM","description":"Field Implementation Manager","rank":500,"order":50},{"name":"FieldHR","description":"Field HR Team","rank":500,"order":50},{"name":"FieldSystems","description":"Field Systems","rank":500,"order":50},{"name":"FleetManagement","description":"Fleet Management Team","rank":500,"order":50},{"name":"FringeRateApprover","description":"Fringe Rate Approver","rank":500,"order":100},{"name":"FuelCardRepresentative","description":"Fuel Card Team","rank":500,"order":50},{"name":"Global Admin","description":"Global Admin","rank":700,"order":50},{"name":"HRIS","description":"HRIS Support Team","rank":500,"order":50},{"name":"ImprestFundApprover","description":"Imprest Fund Approver","rank":500,"order":50},{"name":"LiquorLicenseCompliance","description":"Liquor License Team","rank":500,"order":50},{"name":"MSLFANewOpeningsMgmt","description":"Morrison FA New Openings Management","rank":500,"order":50},{"name":"Menu Publisher","description":"Menu Publisher","rank":500,"order":50},{"name":"Menu-Recipe View Only","description":"Menu-Recipe View Only","rank":500,"order":50},{"name":"MorrisonCashManagement","description":"Morrison Cash Management Department","rank":50,"order":50},{"name":"MorrisonFANewOpenings","description":"Morrison FA New Openings","rank":500,"order":50},{"name":"MorrisonFANewOpeningsMgmt","description":"Morrison FA New Openings Management","rank":500,"order":50},{"name":"MorrisonFixedAsset","description":"Morrison Fixed Asset Team","rank":50,"order":50},{"name":"MorrisonTaxAndLicensing","description":"Morrison Tax and Licensing Department","rank":50,"order":50},{"name":"MySTAFFTimeClock","description":"MySTAFF Clock Team","rank":500,"order":50},{"name":"NewBusinessRequestFAManagement","description":"New Business Request Field Accountant Management","rank":50,"order":50},{"name":"NewBusinessRequestFieldAccountant","description":"New Business Request Field Accountant","rank":50,"order":50},{"name":"NoAccess","description":"No Access Role - This role provides no access to any system","rank":-1,"order":50},{"name":"PCardRepresentative","description":"PCard Representative","rank":500,"order":50},{"name":"PayrollNewBusiness","description":"Payroll New Business Support Team","rank":500,"order":50},{"name":"Recipe View Only","description":"Recipe - view only","rank":500,"order":50},{"name":"SESCompliance","description":"SES Compliance Team","rank":50,"order":50},{"name":"SESTeam","description":"SES Team","rank":50,"order":50},{"name":"SalesTax","description":"Sales Tax Department","rank":500,"order":50},{"name":"SectorController","description":"Sector Controller","rank":500,"order":50},{"name":"TangibleTeam","description":"Tangible Team","rank":500,"order":50},{"name":"TangibleTeamApprover","description":"Tangible Team Approver","rank":500,"order":50},{"name":"TreasuryCreditCardTeam","description":"Treasury Credit Card Team","rank":500,"order":50},{"name":"User","description":"User","rank":100,"order":10},{"name":"User Admin","description":"User Admin","rank":500,"order":50}];
        $rootScope.applicationConfiguration = {application: {name: 'ADAMS'}};


        userAdministrationService = jasmine.createSpyObj('userAdministrationService', ['getRoleName', 'getUserDetails', 'getSelectRoleOptions']);

        userAdministrationService.getRoleName.and.returnValues('Admin');

        userAdministrationService.getUserDetails.and.callFake(function(limit, page, appName, roleName, searchUserName, searchLastName, searchFirstName, searchCostCenter, sort) {
            var deferred = $q.defer();
            // userData = '[{"total_count": 59988, "users": [{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]}]';

            deferred.resolve({"metadata": {"resultCount": "600359"}, "data": [{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]});
            return deferred.promise;
        });


        var pageSize = 100;
        var pageNumber = 1;
        var selectedApplicationName = 'MyAdmin';

        //userAdministrationService = jasmine.createSpyObj('userAdministrationService', ['getSelectRoleOptions']);
        userAdministrationService.getSelectRoleOptions.and.callFake(function(selectedApplicationName, pageSize, pageNumber){
            var deferred = $q.defer();
            deferred.resolve([{"name":"Admin"},{"name":"Application Owner"},{"name":"User"}]);
            return deferred.promise;
        });



        Ctrl1 = $controller('UserTeamAccessController', {$rootScope: $rootScope, $scope: $scope, $uibModal : mockModal, $uibModalInstance: $uibModalInstance, UserAdministrationService: userAdministrationService, $timeout: $timeout, loginRoles: loginRoles, userName: userName,
            blockUI: mockBlockUI, applications: applications, loginAppName: "ADAMS", loginRoleName: "Admin", defaultApplication: appName2, roleName: roleName2, ADAMS_CONSTANTS: adamsConstants, ModalDialogService: mockModalDialogService, userRoles: userRoles,
            userData: userData, selectApplicationOptions: selectApplicationOptions, selectRoleOptions: selectRoleOptions2, uiGridConstants: uiGridConstants, RBACService: mockRBACService});


        Ctrl2 = $controller('UserTeamAccessController', {$rootScope: $rootScope, $scope: $scope, $uibModal : mockModal1, $uibModalInstance: $uibModalInstance, UserAdministrationService: userAdministrationService, $timeout: $timeout, loginRoles: loginRoles, userName: userName,
            blockUI: mockBlockUI, applications: applications, loginAppName: "ADAMS", loginRoleName: "Admin", defaultApplication: appName2, roleName: roleName2, ADAMS_CONSTANTS: adamsConstants, ModalDialogService: mockModalDialogService, userRoles: userRoles,
            userData: userData, selectApplicationOptions: selectApplicationOptions, selectRoleOptions: selectRoleOptions2, uiGridConstants: uiGridConstants, RBACService: mockRBACService});
    }));


    it('should call hierarchyTreeTeamSelectionChange', function() {
        // spyOn($scope, 'hierarchyTreeTeamSelectionChange');
        Ctrl.role = "Admin";
        Ctrl.teams = [{team_display_name:"something", team_display_path:"/none/", "team_name": 100007,"team_description": "Compass Group USA","source_system_id": 1002,"team_type": "BusinessType","default_team": false}];
        Ctrl.removedTeams = [{"team_name": 100007,"team_description": "Compass Group USA","source_system_id": 1002,"team_type": "BusinessType","default_team": false}];
        $rootScope.$broadcast('hierarchyTreeTeamSelectionChange','', false, {team_display_name:"", team_display_path:"/something/", team_id: '0'});
        $scope.$apply();
        // expect($scope.$on).toHaveBeenCalled();
    });

    it('should call hierarchyTreeTeamSelectionChange', function() {
        // spyOn($scope, 'hierarchyTreeTeamSelectionChange');
        Ctrl.role = "Admin";
        Ctrl.teams = [{"team_name": 100007,"team_description": "Compass Group USA","source_system_id": 1002,"team_type": "BusinessType","default_team": false}];
        Ctrl.removedTeams = [{"team_name": 100007,"team_description": "Compass Group USA","source_system_id": 1002,"team_type": "BusinessType","default_team": false}];
        $rootScope.$broadcast('hierarchyTreeTeamSelectionChange','', false, {team_display_name:"qwer", team_display_path:"/asdf/", team_id: '1'});
        $scope.$apply();
        // expect($scope.$on).toHaveBeenCalled();
    });

    it('should call hierarchyTreeTeamSelectionChange', function() {
        // spyOn($scope, 'hierarchyTreeTeamSelectionChange');
        Ctrl.role = "Admin";
        Ctrl.teams = [{"team_name": 100007,"team_description": "Compass Group USA","source_system_id": 1002,"team_type": "BusinessType","default_team": false}];
        Ctrl.removedTeams = [{"team_name": 100007,"team_description": "Compass Group USA","source_system_id": 1002,"team_type": "BusinessType","default_team": false}];
        $rootScope.$broadcast('hierarchyTreeTeamSelectionChange','', false, {team_display_path:"", team_id: '0'});
        $scope.$apply();
        // expect($scope.$on).toHaveBeenCalled();
    });

    it('should call hierarchyTreeTeamSelectionChange', function() {
        // spyOn($scope, 'hierarchyTreeTeamSelectionChange');
        Ctrl.role = "Admin";
        Ctrl.teams = [{team_display_name:"qwert", team_display_path:"/asdfg/", "team_name": 100007,"team_description": "Compass Group USA","source_system_id": 1002,"team_type": "BusinessType","default_team": false}, {team_display_name:"qwert", team_display_path:"/asdfg/", "team_name": 100007,"team_description": "Compass Group USA","source_system_id": 1002,"team_type": "BusinessType","default_team": false}];
        Ctrl.removedTeams = [{"team_name": 100007,"team_description": "Compass Group USA","source_system_id": 1002,"team_type": "BusinessType","default_team": false}];
        $rootScope.$broadcast('hierarchyTreeTeamSelectionChange','', false, {team_display_name:"qwer", team_display_path:"/asdfg/",  team_id: '0'});
        $scope.$apply();
        // expect($scope.$on).toHaveBeenCalled();
    });


    it('should call getGridData ', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.getGridData(25,1,'',{search:
                [{
                    "team_name": "Adams",
                    "team_description": "Compass",
                    "team_type_name": "UI"
                }]
            }
        );
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });


    it('should call getGridData ', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.getGridData(25,1,'',{search:
                {
                    "team_name": "Adams",
                    "team_description": "Compass",
                    "team_type_name": "UI"
                }
            }
        );
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });


    it('should call getGridData ', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.getGridData(25,1,'',{search:
                [{
                    "team_name": "Adams",
                    "team_description": "Compass",
                    "team_type_name": "UI",
                    "property": "team_name"
                }]
            }
        );
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should get selected item', function () {
        var oldrole = 'User',
            newRole = '{"role": "Admin"}',
            role = '{"currentRole":"User","newRole":"Admin"}';

        newRole = JSON.parse(newRole);

        mockUserAdministrationService.updateRole = function(userName, appName, role) {
            var deferred = $q.defer(),
                message = "[Success]";

            deferred.resolve(message);
            return deferred.promise;
        };

        Ctrl.itemSelected(1);
        $scope.$apply();

        // expect(Ctrl.itemSelected).toHaveBeenCalled();
    });

    it('should get selected item - error', function () {
        var oldrole = 'User',
            newRole = '{"role": "Admin"}',
            role = '{"currentRole":"User","newRole":"Admin"}';

        newRole = JSON.parse(newRole);

        mockUserAdministrationService.updateRole = function(userName, appName, role) {
            var deferred = $q.defer(),
                message = "[Success]";

            deferred.resolve('error');
            return deferred.promise;
        };

        Ctrl.itemSelected(newRole, oldrole);
        $scope.$apply();

        // expect(Ctrl.itemSelected).toHaveBeenCalled();
    });

    it('should get selected item - error', function () {
        var oldrole = 'User',
            newRole = '{"role": "Admin"}',
            role = '{"currentRole":"User","newRole":"Admin"}';

        newRole = JSON.parse(newRole);

        mockUserAdministrationService.updateRole = function(userName, appName, role) {
            var deferred = $q.defer(),
                message = "[Success]";

            deferred.reject();
            return deferred.promise;
        };

        Ctrl.itemSelected(newRole, oldrole);
        $scope.$apply();

        // expect(Ctrl.itemSelected).toHaveBeenCalled();
    });

    it('should set teamIndex', function () {
        Ctrl.teamIndex(index);
        $scope.$apply();
    });

    it('should call close', function () {
        Ctrl.close(index);
        $scope.$apply();
    });

    it('should call switchTab - if', function() {
        spyOn(Ctrl, 'switchTab').and.callThrough();
        Ctrl.switchTab('hierarchyTeam');
        $scope.$apply();
        expect(Ctrl.switchTab).toHaveBeenCalledWith('hierarchyTeam');
    });


    it('should call switchTab - else', function() {
        spyOn(Ctrl, 'switchTab').and.callThrough();
        Ctrl.switchTab();
        $scope.$apply();
        expect(Ctrl.switchTab).toHaveBeenCalled();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        // $interval.flush(0,1);

        // expect($intervalSpy).toHaveBeenCalled();
        // expect(Ctrl.gridApi).toEqual(gridApi);
    });

    it('should call submit', function () {
        Ctrl.teams = [{"team_name": 100007,"team_description": "Compass Group USA","source_system_id": 1002,"team_type": "BusinessType","default_team": false}];
        Ctrl.submit(index);
        $scope.$apply();
    });


    it('should call getLoginUserRoles - data error', function() {
        mockUserAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };
        spyOn(Ctrl, 'getLoginUserRoles').and.callThrough();
        Ctrl.getLoginUserRoles();
        $scope.$apply();
        expect(Ctrl.getLoginUserRoles).toHaveBeenCalled();
    });

    it('should call getLoginUserRoles - data {}', function() {
        mockUserAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };
        spyOn(Ctrl, 'getLoginUserRoles').and.callThrough();
        Ctrl.getLoginUserRoles();
        $scope.$apply();
        expect(Ctrl.getLoginUserRoles).toHaveBeenCalled();
    });

    it('should call getLoginUserRoles - error', function() {
        mockUserAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        spyOn(Ctrl, 'getLoginUserRoles').and.callThrough();
        Ctrl.getLoginUserRoles();
        $scope.$apply();
        expect(Ctrl.getLoginUserRoles).toHaveBeenCalled();
    });



    it('should call uiGridSelectedRows with event - target', function() {
        var selectionEvent = {
            target: {
                className: { includes: function(){return true;}}
            },
            srcElement: {
                className: undefined
            }
        };
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        $rootScope.$broadcast('uiGridSelectedRows', applications, selectionEvent);
        $scope.$apply();
        expect(Ctrl.gridApi).toEqual(gridApi);
        // $rootScope.$digest();
    });

    it('should call uiGridSelectedRows with event - srcElement', function() {
        var selectionEvent = {
            target: {
                className: undefined
            },
            srcElement: {
                className: { includes: function(){return true;}}
            }
        };
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        $rootScope.$broadcast('uiGridSelectedRows', applications, selectionEvent);
        $scope.$apply();
        expect(Ctrl.gridApi).toEqual(gridApi);
    });

    it('should call uiGridSelectedRows with event - else, handleRowSelectionChange - if if if', function() {
        var selectionEvent = {
            target: {
                className: { includes: function(){return false;}}
            },
            srcElement: {
                className: { includes: function(){return false;}}
            }
        };
        console.log("From test", selectionEvent.target.className.includes(), selectionEvent.srcElement.className.includes());
        Ctrl.teams = JSON.parse(teams)[0].data;
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        $rootScope.$broadcast('uiGridSelectedRows', Ctrl.teams, selectionEvent);
        $scope.$apply();
        expect(Ctrl.gridApi).toEqual(gridApi);
    });


    it('should call uiGridSelectedRows with event - else, handleRowSelectionChange - if if else', function() {
        var selectionEvent = {
            target: {
                className: { includes: function(){return false;}}
            },
            srcElement: {
                className: { includes: function(){return false;}}
            }
        };
        console.log("From test", selectionEvent.target.className.includes(), selectionEvent.srcElement.className.includes());
        Ctrl.teams = JSON.parse(teams)[0].data;
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        $rootScope.$broadcast('uiGridSelectedRows', JSON.parse(teams1)[0].data, selectionEvent);
        $scope.$apply();
        expect(Ctrl.gridApi).toEqual(gridApi);
    });

    it('should call uiGridSelectedRows with event - null', function() {
        var selectionEvent = {
            target: {
                className: { includes: function(){return false;}}
            },
            srcElement: {
                className: { includes: function(){return false;}}
            }
        };
        Ctrl.gridApi = gridApi;
        Ctrl.teams = JSON.parse(teams)[0].data;
        $rootScope.$broadcast('uiGridSelectedRows', applications, null);
        $scope.$apply();
        $rootScope.$digest();
    });

    it('should call contains', function() {
        spyOn(Ctrl, 'contains').and.callThrough();
        Ctrl.teams = JSON.parse(teams2)[0].data;
        var teamDisplayName = 'COMPASS1', teamPath = '100007';
        console.log("FT - ",teamDisplayName, teamPath);
        Ctrl.contains(teamDisplayName, teamPath);
        $scope.$apply();
        expect(Ctrl.contains).toHaveBeenCalledWith(teamDisplayName, teamPath);
    });

    /*it('should call openAddUserModal', function() {
        spyOn(Ctrl, 'openAddUserModal').and.callThrough();
        Ctrl.openAddUserModal(roleName);
        $scope.$apply();
        expect(Ctrl.openAddUserModal).toHaveBeenCalledWith(roleName);
    });


    it('should call openAddUserModal - data error', function() {
        userAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        userAdministrationService.getApplicationsByUser = function(userName) {
            var deferred = $q.defer();
            deferred.resolve([]);
            return deferred.promise;
        };
        spyOn(Ctrl2, 'openAddUserModal').and.callThrough();
        Ctrl2.openAddUserModal(roleName);
        $scope.$apply();
        expect(Ctrl2.openAddUserModal).toHaveBeenCalledWith(roleName);
    });

    it('should call openAddUserModal - data {}', function() {
        userAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve('{}');
            return deferred.promise;
        };

        userAdministrationService.getApplicationsByUser = function(userName) {
            var deferred = $q.defer();
            deferred.resolve([]);
            return deferred.promise;
        };
        spyOn(Ctrl2, 'openAddUserModal').and.callThrough();
        Ctrl2.openAddUserModal(roleName);
        $scope.$apply();
        expect(Ctrl2.openAddUserModal).toHaveBeenCalledWith(roleName);
    });

    it('should call openAddUserModal - error', function() {
        userAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        userAdministrationService.getApplicationsByUser = function(userName) {
            var deferred = $q.defer();
            deferred.resolve([]);
            return deferred.promise;
        };
        spyOn(Ctrl2, 'openAddUserModal').and.callThrough();
        Ctrl2.openAddUserModal(roleName);
        $scope.$apply();
        expect(Ctrl2.openAddUserModal).toHaveBeenCalledWith(roleName);
    });



    it('should call openTeamUserModal', function() {
        spyOn(Ctrl, 'openTeamUserModal').and.callThrough();
        Ctrl.openTeamUserModal(roleName);
        $scope.$apply();
        expect(Ctrl.openTeamUserModal).toHaveBeenCalledWith(roleName);
    });


    it('should call openTeamUserModal - data error', function() {
        userAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };
        spyOn(Ctrl2, 'openTeamUserModal').and.callThrough();
        Ctrl2.openTeamUserModal(roleName);
        $scope.$apply();
        expect(Ctrl2.openTeamUserModal).toHaveBeenCalledWith(roleName);
    });

    it('should call openTeamUserModal - data {}', function() {
        userAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve('{}');
            return deferred.promise;
        };
        spyOn(Ctrl2, 'openTeamUserModal').and.callThrough();
        Ctrl2.openTeamUserModal(roleName);
        $scope.$apply();
        expect(Ctrl2.openTeamUserModal).toHaveBeenCalledWith(roleName);
    });

    it('should call openTeamUserModal - error', function() {
        userAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        spyOn(Ctrl2, 'openTeamUserModal').and.callThrough();
        Ctrl2.openTeamUserModal(roleName);
        $scope.$apply();
        expect(Ctrl2.openTeamUserModal).toHaveBeenCalledWith(roleName);
    });



    it('should call $stateChangeSuccess', function() {
        // spyOn($scope, '$on');
        $rootScope.$broadcast('$stateChangeSuccess', null, 'toState', {}, 'fromState', {});
        $scope.$apply();
        // expect($scope.$on).toHaveBeenCalled();
    });

    it('should call $stateChangeSuccess - if ', function() {
        // spyOn($scope, '$on');
        $rootScope.$broadcast('$stateChangeSuccess', 'state', 'params', 'state', 'params');
        $scope.$apply();
        // expect($scope.$on).toHaveBeenCalled();
    });

    it('should call uiGridLoadDetails ', function() {
        // spyOn($scope, '$on');
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        $scope.$apply();
        expect(Ctrl.gridApi).toEqual(gridApi);
    });

    it('should call getGridData ', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.searchObject = {
            "property": "market_name",
            "value": "something",
            "operator": ""
        };
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

    it('should call getGridData without search input- searchPropertyValue false', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.searchPropertyValue = false;
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input - searchPropertyValue null', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.searchObject = {
            "property": null,
            "value": "something",
            "operator": ""
        };
        Ctrl.searchPropertyValue = null;
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });







    it('should initialize the controller properly', function () {
        var appData = '[{"data": [{"Applications": [{"name": "ADAMS"},{"name": "MyAdmin"}]}]}]';

        appData = JSON.parse(appData);
        expect(Ctrl).not.toBeUndefined();
        $scope.$apply();
        expect(Ctrl.loginUserApps).toEqual(appData[0].data[0].Applications);
    });

    it('should get UserDetails', function () {
    
        var userDetails = '[{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]';
    
        userDetails = JSON.parse(userDetails);
        Ctrl.getUserDetails(userDetails);
        expect(Ctrl.firstName).toEqual('PAULA');
    });
    
    it('should get Apps', function () {
        var appData = '[{"name": "ADAMS"},{"name": "MyAdmin"}]';
        appData = JSON.parse(appData);        
        Ctrl.getApps();
        $scope.$apply();
        expect(Ctrl.Applications).toEqual(appData);
        expect(Ctrl.application).toEqual('ADAMS');
    });
    
    it('Apps should be empty', function () {
        mockUserAdministrationService.getApplicationsByUser = function(userName) {
            var deferred = $q.defer();
            deferred.resolve([]);
            return deferred.promise;
        };
       
        var appData = [];
        Ctrl.getApps();
        $scope.$apply();
        expect(Ctrl.Applications).toEqual(appData);
        // expect(Ctrl.application).toEqual('ADAMS');
    });
    
    it('should get roles', function () {
        var roleData = '[{"name": "Admin", "default_role": true, "teams": [{"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}, {"name": "User", "default_role": false, "teams": [{"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}]',
            userDetails = '[{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]';
    
        roleData = JSON.parse(roleData);
        userDetails = JSON.parse(userDetails);
    
        Ctrl.getUserDetails(userDetails);
        Ctrl.getApps();
        Ctrl.getRoles();
        $scope.$apply();
        expect(Ctrl.roles).toEqual(roleData);
    });
    
    it('roles should be empty1', function () {
    
        mockUserAdministrationService.getRolesByUser = function(userName, appName) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };
    
        var roleData = [],
            userDetails = '[{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]';
    
        userDetails = JSON.parse(userDetails);
    
        Ctrl.getUserDetails(userDetails);
        Ctrl.getApps();
        Ctrl.getRoles();
        $scope.$apply();
        expect(Ctrl.roles).toEqual(roleData);
    });
    
    it('roles should be empty2', function () {
    
        mockUserAdministrationService.getRolesByUser = function(userName, appName) {
            var deferred = $q.defer();
            deferred.resolve([]);
            return deferred.promise;
        };
    
        var roleData = [],
            userDetails = '[{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]';
    
        userDetails = JSON.parse(userDetails);
    
        Ctrl.getUserDetails(userDetails);
        Ctrl.getApps();
        Ctrl.getRoles();
        $scope.$apply();
        expect(Ctrl.roles).toEqual(roleData);
    });
    
    it('login roles should be empty', function () {
    
        mockUserAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };
    
        var roleData = [],
            appData = '[{"name": "ADAMS"},{"name": "MyAdmin"}]';
    
        appData = JSON.parse(appData);
        Ctrl.loginUserApps = appData;
    
        Ctrl.getLoginRoles();
        $scope.$apply();
        expect(Ctrl.loginRoles).toEqual(roleData);
    });
    
    it('should loadDetails', inject(function($interval) {
        Ctrl.gridOptions = gridOptions;
        Ctrl.gridApi = gridApi;
        Ctrl.loadDetails();
        $interval.flush(0);
        $rootScope.$apply();
    }));
    
    it('should delete app', function () {
    
        mockUserAdministrationService.deleteApp = function(userName) {
            var deferred = $q.defer();
            deferred.resolve([{"success": "true"}]);
            return deferred.promise;
        };
    
        Ctrl.deleteApp();
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });

    it('should delete app - data error', function () {

        mockUserAdministrationService.deleteApp = function(userName) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        Ctrl.deleteApp();
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });

    it('should delete app - error', function () {

        mockUserAdministrationService.deleteApp = function(userName) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        Ctrl.deleteApp();
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });



    it('should delete roles', function () {

        mockUserAdministrationService.deleteRoles = function(userName) {
            var deferred = $q.defer();
            deferred.resolve([{"success": "true"}]);
            return deferred.promise;
        };

        Ctrl.deleteRole();
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });

    it('should delete deleteRoles - data error', function () {

        mockUserAdministrationService.deleteRoles = function(userName) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        Ctrl.deleteRole();
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });

    it('should delete deleteRoles - error', function () {

        mockUserAdministrationService.deleteRoles = function(userName) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        Ctrl.deleteRole();
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });




    it('should delete team', function () {

        mockUserAdministrationService.deleteTeam = function(userName, appName, roleName, teamName, sourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve([{"success": "true"}]);
            return deferred.promise;
        };

        Ctrl.deleteTeam(userName, appName, roleName, teamName, sourceSystemId);
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });

    it('should delete team - data error', function () {

        mockUserAdministrationService.deleteTeam = function(userName, appName, roleName, teamName, sourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        Ctrl.deleteTeam(userName, appName, roleName, teamName, sourceSystemId);
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });

    it('should delete team - error', function () {

        mockUserAdministrationService.deleteTeam = function(userName, appName, roleName, teamName, sourceSystemId) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        Ctrl.deleteTeam(userName, appName, roleName, teamName, sourceSystemId);
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });




    it('should roleChecked', function () {

        mockUserAdministrationService.changeDefaultRole = function(userName, appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve([{"success": "true"}]);
            return deferred.promise;
        };

        Ctrl.roleChecked(userName, appName, roleName);
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });

    it('should roleChecked - data error', function () {

        mockUserAdministrationService.changeDefaultRole = function(userName, appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        Ctrl.roleChecked(userName, appName, roleName);
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });

    it('should roleChecked - error', function () {

        mockUserAdministrationService.changeDefaultRole = function(userName, appName, roleName) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        Ctrl.roleChecked(userName, appName, roleName);
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });




    it('should teamChecked', function () {

        mockUserAdministrationService.changeDefaultTeam = function(userName, appName, roleName, teamName, sourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve([{"success": "true"}]);
            return deferred.promise;
        };

        Ctrl.teamChecked(roleName, teamName, sourceSystemId);
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });

    it('should teamChecked - data error', function () {

        mockUserAdministrationService.changeDefaultTeam = function(userName, appName, roleName, teamName, sourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        Ctrl.teamChecked(roleName, teamName, sourceSystemId);
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });

    it('should teamChecked - error', function () {

        mockUserAdministrationService.changeDefaultTeam = function(userName, appName, roleName, teamName, sourceSystemId) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        Ctrl.teamChecked(roleName, teamName, sourceSystemId);
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });



    it('should getApps with Default App Name', function () {

        mockUserAdministrationService.getApplicationsByUser = function(userName) {
            var deferred = $q.defer();
            deferred.resolve([{"success": "true"}]);
            return deferred.promise;
        };

        Ctrl.defaultAppName = "ADMAMS";
        Ctrl.getApps();
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });

    it('should getApps', function () {

        mockUserAdministrationService.getApplicationsByUser = function(userName) {
            var deferred = $q.defer();
            deferred.resolve([{"success": "true"}]);
            return deferred.promise;
        };

        Ctrl.getApps();
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });

    it('should getApps - data error', function () {

        mockUserAdministrationService.getApplicationsByUser = function(userName) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        Ctrl.getApps();
        $scope.$apply();
        expect(Ctrl.application).toEqual('');
    });

    it('should getApps - data {}', function () {

        mockUserAdministrationService.getApplicationsByUser = function(userName) {
            var deferred = $q.defer();
            deferred.resolve("{}");
            return deferred.promise;
        };
        Ctrl.getApps();
        $scope.$apply();
        expect(Ctrl.application).toEqual('');
    });

    it('should getApps - error', function () {

        mockUserAdministrationService.getApplicationsByUser = function(userName) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        Ctrl.getApps();
        $scope.$apply();
        expect(Ctrl.application).toEqual(undefined);
    });



    it('should getLoginRoles ', function () {

        mockUserAdministrationService.getRolesByLoginUser = function(appName) {
            var deferred = $q.defer();
            deferred.resolve([{"success": "true"}]);
            return deferred.promise;
        };

        Ctrl.application = appName;
        Ctrl.getLoginRoles();
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });

    it('should getLoginRoles - data error', function () {

        mockUserAdministrationService.getRolesByLoginUser = function(appName) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };
        Ctrl.application = appName;
        Ctrl.getLoginRoles();
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });

    it('should getLoginRoles - data {}', function () {

        mockUserAdministrationService.getRolesByLoginUser = function(appName) {
            var deferred = $q.defer();
            deferred.resolve("{}");
            return deferred.promise;
        };
        Ctrl.application = appName;
        Ctrl.getLoginRoles();
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });

    it('should getLoginRoles - error', function () {

        mockUserAdministrationService.getRolesByLoginUser = function(appName) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        Ctrl.application = appName;
        Ctrl.getLoginRoles();
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });



    it('should getRoles - data {}', function () {

        mockUserAdministrationService.getRolesByUser = function(userName, appName) {
            var deferred = $q.defer();
            deferred.resolve("{}");
            return deferred.promise;
        };
        Ctrl.userName = "Chouhr01";
        Ctrl.application = appName;
        Ctrl.getRoles();
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });

    it('should getRoles - error', function () {

        mockUserAdministrationService.getRolesByUser = function(userName, appName) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        Ctrl.userName = "Chouhr01";
        Ctrl.application = appName;
        Ctrl.getRoles();
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });






    it('should getTeams - data error', function () {

        mockUserAdministrationService.getTeamsByUser = function(userName, appName, roleName, index) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };
        Ctrl.application = appName;
        Ctrl.roles = [{"role": "NoAccess"}, {"role": "Global Admin"}, {"role": "Admin"}, {"role": "User"}];
        Ctrl.getTeams(userName, appName, roleName, 0);
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });

    it('should getTeams  - data {}', function () {

        mockUserAdministrationService.getTeamsByUser = function(userName, appName, roleName, index) {
            var deferred = $q.defer();
            deferred.resolve("{}");
            return deferred.promise;
        };
        Ctrl.userName = "Chouhr01";
        Ctrl.application = appName;
        Ctrl.roles = [{"role": "NoAccess"}, {"role": "Global Admin"}, {"role": "Admin"}, {"role": "User"}];
        Ctrl.getTeams(userName, appName, roleName, 0);
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });

    it('should getTeams - error', function () {

        mockUserAdministrationService.getTeamsByUser = function(userName, appName, roleName, index) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        Ctrl.userName = "Chouhr01";
        Ctrl.application = appName;
        Ctrl.getTeams(userName, appName, roleName, 0);
        $scope.$apply();
        expect(Ctrl.application).toEqual('ADAMS');
    });


    it('should call uiGridSelectedRows', function() {
        userAdministrationService.getApplicationsByUser = function(userName) {
            var deferred = $q.defer();
            deferred.resolve([{"success": "true"}]);
            return deferred.promise;
        };
        $rootScope.$broadcast('uiGridSelectedRows', [{"role": "NoAccess"}, {"role": "Global Admin"}, {"role": "Admin"}, {"role": "User"}], null);
        $scope.$apply();
        expect(Ctrl.mySelectedRows.length).toEqual(4);
        // $rootScope.$digest();
    });
    
    it('should call viewSecuredObjects', function () {
        spyOn(Ctrl, 'viewSecuredObjects').and.callThrough();
        Ctrl.viewSecuredObjects (appName, roleName);
        $scope.$apply();
        expect(Ctrl.viewSecuredObjects).toHaveBeenCalledWith(appName, roleName);
    });

    it('should call clearAll', function() {
        spyOn(Ctrl, 'clearAll').and.callThrough();
        Ctrl.gridApi = gridApi;
        Ctrl.clearAll();
        $scope.$apply();
        expect(Ctrl.clearAll).toHaveBeenCalled();
    });

    it('should set roleindex', function () {
        Ctrl.roleIndex (index, roleName);
        $scope.$apply();
        expect(Ctrl.role).toEqual(roleName);
    });

    it('should call initialize_searchObject', function () {
        spyOn(Ctrl, 'initialize_searchObject').and.callThrough();
        Ctrl.searchObject = null;
        Ctrl.initialize_searchObject();
        $scope.$apply();
        expect(Ctrl.initialize_searchObject).toHaveBeenCalled();
    });
    
    it('should set teamindex', function () {
        var parentIndex = 1,
            userDetails = '[{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]',
            teams = '{"team_name": 100007,"team_description": "Compass Group USA","source_system_id": 1002,"team_type": "BusinessType","default_team": false}';
    
        userDetails = JSON.parse(userDetails);
        teams = JSON.parse(teams);
        Ctrl.getUserDetails(userDetails);
        Ctrl.getApps();
        Ctrl.getRoles();
        $scope.$apply();
        Ctrl.teamIndex(index, parentIndex, teams);
        $scope.$apply();
        expect(Ctrl.teamName).toEqual(teamName);
    });
    
    it('should call showHistoryModal', function () {
        mockUserAdministrationService.getUserHistory = function(a,b,c,d,e) {
            var deferred = $q.defer();
            deferred.resolve({user_name: "VASIRU01"});
            return deferred.promise;
        };

        spyOn(Ctrl, 'showHistoryModal').and.callThrough();
        Ctrl.userName = userName;
        Ctrl.showHistoryModal();
        $scope.$apply();
        expect(Ctrl.showHistoryModal).toHaveBeenCalled();
    });

    it('should call showHistoryModal', function () {
        mockUserAdministrationService.getUserHistory = function(a,b,c,d,e) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        spyOn(Ctrl, 'showHistoryModal').and.callThrough();
        Ctrl.userName = userName;
        Ctrl.showHistoryModal();
        $scope.$apply();
        expect(Ctrl.showHistoryModal).toHaveBeenCalled();
    });

    it('should set activetab', function () {
        mockUserAdministrationService.getApplicationsByUser(userName);
        Ctrl.Applications = [{"name": "ADAMS"},{"name": "MyAdmin"}];
        $scope.$apply();
        Ctrl.setActiveTab(index, appName);
        expect(Ctrl.appName).toEqual(appName);
    });

    it('should set activetab - else', function () {
        mockUserAdministrationService.getApplicationsByUser(userName);
        Ctrl.Applications = [{"name": "ADAMS"},{"name": "MyAdmin"}];
        $scope.$apply();
        Ctrl.setActiveTab(index, "ADAMS1");
        expect(Ctrl.appName).toEqual(appName);
    });
    
    it('should change default role', function () {
        var roleData = '[{"name": "Admin", "default_role": true, "teams": [{"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}, {"name": "User", "default_role": false, "teams": [{"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}]',
            userDetails = '[{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]';
    
        roleData = JSON.parse(roleData);
        userDetails = JSON.parse(userDetails);
        Ctrl.roleChecked(roleName);
        Ctrl.getUserDetails(userDetails);
        Ctrl.getApps();        
        $scope.$apply();
        expect(Ctrl.roles).toEqual(roleData);
    });
    
    it('should change default team', function () {
        var teamsData = '[{"team_name": "100007","team_description": "Compass Group USA","source_system_id": "1002","team_type": "BusinessType","default_team": true}, {"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]',
            userDetails = '[{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]';
    
        mockUserAdministrationService.getTeamsByUser = function(userName, appName, roleName, index) {
            var deferred = $q.defer();
            deferred.resolve([{"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}, {"team_name": "100007","team_description": "Compass Group USA","source_system_id": "1002","team_type": "BusinessType","default_team": true}]);
            return deferred.promise;
        };
       
        teamsData = JSON.parse(teamsData);
        userDetails = JSON.parse(userDetails);
        Ctrl.teamChecked(roleName, teamName, sourceSystemId);
        Ctrl.getUserDetails(userDetails);
        Ctrl.getApps();
        $scope.$apply();
        expect(Ctrl.roles[0].teams).toEqual(teamsData);
    });
    
    // it('should get selected item', function () {
    //     Ctrl.dropboxItemSelected(1);
    //     expect(Ctrl.selectedItem).toEqual(1);
    // });
    
    it('should get selected item', function () {
        var oldrole = 'User',
            newRole = '{"role": "Admin"}',
            role = '{"currentRole":"User","newRole":"Admin"}';
    
        newRole = JSON.parse(newRole);
    
        mockUserAdministrationService.updateRole = function(userName, appName, role) {
            var deferred = $q.defer(),
                message = "[Success]";
    
            deferred.resolve(message);
            return deferred.promise;
        };        
    
        Ctrl.itemSelected(newRole, oldrole);
        $scope.$apply();
       
        // expect(Ctrl.itemSelected).toHaveBeenCalled();
    });

    it('should get selected item - error', function () {
        var oldrole = 'User',
            newRole = '{"role": "Admin"}',
            role = '{"currentRole":"User","newRole":"Admin"}';

        newRole = JSON.parse(newRole);

        mockUserAdministrationService.updateRole = function(userName, appName, role) {
            var deferred = $q.defer(),
                message = "[Success]";

            deferred.resolve('error');
            return deferred.promise;
        };

        Ctrl.itemSelected(newRole, oldrole);
        $scope.$apply();

        // expect(Ctrl.itemSelected).toHaveBeenCalled();
    });

    it('should get selected item - error', function () {
        var oldrole = 'User',
            newRole = '{"role": "Admin"}',
            role = '{"currentRole":"User","newRole":"Admin"}';

        newRole = JSON.parse(newRole);

        mockUserAdministrationService.updateRole = function(userName, appName, role) {
            var deferred = $q.defer(),
                message = "[Success]";

            deferred.reject();
            return deferred.promise;
        };

        Ctrl.itemSelected(newRole, oldrole);
        $scope.$apply();

        // expect(Ctrl.itemSelected).toHaveBeenCalled();
    });
    
    it('should check the value contains', function () {
        var appData = '[{"name": "ADAMS"},{"name": "MyAdmin"}]';
    
        appData = JSON.parse(appData);
        Ctrl.loginUserApps = appData;
        $scope.$apply();
        expect(Ctrl.contains('MyAdmin')).toEqual(true);
    });

    describe('Default values for application and role', function() {
        describe('no default application is passed as a query parameter in the Url', function() {
            it('application should default', function() {
                //$rootScope.applicationConfiguration = {application: {name: 'ADAMS'}};
                //appName = '';
                expect(Ctrl1.appName).toEqual('ADAMS');
            });
        });
        describe('no default role is passed as a query parameter in the Url', function() {
            it('role should default', function() {
                //$rootScope.applicationConfiguration = {application: {name: 'ADAMS'}};
                //userAdministrationService = jasmine.createSpyObj('userAdministrationService', ['getRoleName']);

                //userAdministrationService.getRoleName.and.returnValues('Admin');

                //roleName = '';
                expect(Ctrl1.loginRoleName).toEqual('Admin');
            });
        });
        describe('Initial Actuve Tab', function () {
            describe('set initial application', function () {
                it('should set active based on query params in Url', function () {

                    Ctrl1.Applications = [{name: 'ADAMS'}, {name: 'Webtrition'}, {name: 'MyAdmin'}];
                    appName2 = 'MyAdmin';
                    Ctrl1.setActiveTabInit(appName2);
                    expect(Ctrl1.application).toEqual(appName2);
                    expect(Ctrl1.activeTab).toEqual(2);
                });
            });
        });
        describe('Initial Actuve Tab', function () {
            describe('set initial application', function () {
                it('should set active based on no query params in Url', function () {

                    Ctrl1.Applications = [{name: 'ADAMS'}, {name: 'Webtrition'}, {name: 'MyAdmin'}];
                    appName2 = '';
                    Ctrl1.setActiveTabInit(Ctrl1.appName);
                    expect(Ctrl1.application).toEqual(Ctrl1.appName);
                    expect(Ctrl1.activeTab).toEqual(0);
                });
            });
        });

    });

    describe('Timeout should cancel', function() {
        describe('timeout', function() {
            it('should cancel', function() {
                $scope.filterTimeout = $timeout(500);
                jasmine.createSpyObj('$scope', ['$on']);
            });
        });
    });


    describe('Application Filter Changed', function() {
        describe('role filter \'Global Admin\' has been selected', function() {
            it('should return valid MyAdmin app roles, since \'Global Admin\' is not a valid role for application \'MyAdmin\'' , function () {

                var selectedApplication = {name:'MyAdmin'};

                var selectedRole = {name: 'Global Admin'};
                var calculatedRoles = [{"name":"Admin"},{"name":"Application Owner"},{"name":"User"}];


                Ctrl1.gridRole = selectedRole;
                Ctrl1.gridApplication = selectedApplication;
                Ctrl1.gridTeamName = '15657';

                Ctrl1.applicationFilterChanged();

                $scope.$apply();
                expect(Ctrl1.gridRoles).toEqual(calculatedRoles);
            });

            it('should return valid MyAdmin app roles, since \'Global Admin\' is not a valid role for application \'MyAdmin\' - error' , function () {

                userAdministrationService.getSelectRoleOptions = function(selectedApplicationName, pageSize, pageNumber){
                    var deferred = $q.defer();
                    deferred.reject();
                    return deferred.promise;
                };

                var selectedApplication = {name:'MyAdmin'};

                var selectedRole = {name: 'Global Admin'};
                var calculatedRoles = [{"name":"Admin"},{"name":"Application Owner"},{"name":"User"}];


                Ctrl1.gridRole = selectedRole;
                Ctrl1.gridApplication = selectedApplication;
                Ctrl1.gridTeamName = '15657';

                Ctrl1.applicationFilterChanged();

                $scope.$apply();
                expect(Ctrl1.gridRoles).toEqual(selectRoleOptions2);
            });
        });

        describe('role filter \'Admin\' has been selected', function() {
            it('should return valid MyAdmin app roles, since \'Admin\' is a valid role for application \'MyAdmin\'' , function () {

                var selectedApplication = {name:'MyAdmin'};

                var selectedRole = {name: 'Admin'};
                var calculatedRoles = [{"name":"Admin"},{"name":"Application Owner"},{"name":"User"}];


                Ctrl1.gridRole = selectedRole;
                Ctrl1.gridApplication = selectedApplication;

                Ctrl1.applicationFilterChanged();

                $scope.$apply();
                expect(Ctrl1.gridRoles).toEqual(calculatedRoles);
            });
        });

        describe('role filter not selected', function() {
            it('should return valid MyAdmin app roles' , function () {

                var selectedApplication = {name:'MyAdmin'};

                var selectedRole = '';
                var calculatedRoles = [{"name":"Admin"},{"name":"Application Owner"},{"name":"User"}];


                Ctrl1.gridRole = selectedRole;
                Ctrl1.gridApplication = selectedApplication;

                Ctrl1.applicationFilterChanged();

                $scope.$apply();
                expect(Ctrl1.gridRoles).toEqual(calculatedRoles);
            });
        });
    });

    describe('Role Filter Changed', function() {
        describe('application filter \'MyAdmin\' has been selected', function() {
            it('should return valid MyAdmin app roles' , function () {

                var selectedApplication = {name:'MyAdmin'};

                var selectedRole = {name: 'Admin'};
                var calculatedRoles = [{"name":"Admin"},{"name":"Application Owner"},{"name":"User"}];


                Ctrl1.gridRole = selectedRole;
                Ctrl1.gridApplication = selectedApplication;
                Ctrl1.gridTeamName = '15657';
                Ctrl1.gridRoles = calculatedRoles;

                Ctrl1.roleFilterChanged();

                $scope.$apply();
                expect(Ctrl1.gridRoles).toEqual(calculatedRoles);
            });


            it('should return valid MyAdmin app roles -else' , function () {
                userAdministrationService.getSelectRoleOptions = function(selectedApplicationName, pageSize, pageNumber){
                    var deferred = $q.defer();
                    deferred.resolve([]);
                    return deferred.promise;
                };


                var selectedApplication = {name:'MyAdmin'};

                var selectedRole = {name: 'Admin'};
                var calculatedRoles = [{"name":"Admin"},{"name":"Application Owner"},{"name":"User"}];


                Ctrl1.gridRole = selectedRole;
                Ctrl1.gridApplication = selectedApplication;
                Ctrl1.gridTeamName = '15657';
                Ctrl1.gridRoles = calculatedRoles;

                Ctrl1.roleFilterChanged();

                $scope.$apply();
                expect(Ctrl1.gridRoles).toEqual(selectRoleOptions2);
            });


            it('should return valid MyAdmin app roles - error' , function () {
                userAdministrationService.getSelectRoleOptions = function(selectedApplicationName, pageSize, pageNumber){
                    var deferred = $q.defer();
                    deferred.reject();
                    return deferred.promise;
                };


                var selectedApplication = {name:'MyAdmin'};

                var selectedRole = {name: 'Admin'};
                var calculatedRoles = [{"name":"Admin"},{"name":"Application Owner"},{"name":"User"}];


                Ctrl1.gridRole = selectedRole;
                Ctrl1.gridApplication = selectedApplication;
                Ctrl1.gridTeamName = '15657';
                Ctrl1.gridRoles = calculatedRoles;

                Ctrl1.roleFilterChanged();

                $scope.$apply();
                expect(Ctrl1.gridRoles).toEqual(calculatedRoles);
            });
        });

        describe('application filter not selected', function() {
            it('should return the full list of app roles' , function () {

                var selectedApplication = '';
                var selectedRole = {name: 'Admin'};

                Ctrl1.gridRole = selectedRole;
                Ctrl1.gridApplication = selectedApplication;

                Ctrl1.roleFilterChanged();

                $scope.$apply();
                expect(Ctrl1.gridRoles).toEqual(selectRoleOptions2);
            });
        });
    });*/

    




});

