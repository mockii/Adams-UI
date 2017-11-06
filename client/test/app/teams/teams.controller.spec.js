'use strict';

describe('TeamsController', function() {

    var Ctrl,
        Ctrl1,
        Ctrl2,
        Ctrl3,
        Ctrl4,
        uiGridConstants,
        userAdministrationService,
        $rootScope,
        $scope,
        $window,
        $interval,
        blockUI,
        $uibModal,
        userName,
        applications,
        target_applications,
        loginRoles,
        teams,
        teams1,
        teams2,
        appName,
        userRoles,
        roleName,
        teamName,
        sourceSystemId,
        limit,
        page,
        searchTeamName,
        searchTeamDesc,
        searchTeamType,
        sort,
        index,
        adamsConstants,
        mockUserAdministrationService = {},
        mockUserAdministrationService1 = {},
        mockUserAdministrationService2 = {},
        mockUserAdministrationService3 = {},
        logService = {},
        mockBlockUI,
        $q,
        gridOptions,
        gridOptions1,
        $intervalSpy,
        TEAMS_TYPE,
        gridApi,
        $httpBackend,
        mockModalDialogService,
        mockModal;

    beforeEach(module('ui.grid'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.teams.controller'));
    beforeEach(module('adams.user.administration.service'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.teams.constants'));


    beforeEach(function () {
        module(function ($provide) {
            $provide.value('UserAdministrationService', mockUserAdministrationService);
            // $provide.value('UserAdministrationService', mockUserAdministrationService1);
            $provide.value('blockUI', mockBlockUI);
            $provide.value('ModalDialogService', mockModalDialogService);
            $provide.value('STGLogService', logService);
            $provide.value('TEAMS_TYPE', TEAMS_TYPE);
        });
    });

    beforeEach(inject(function ($controller, _$rootScope_, _$window_, _$interval_, UserAdministrationService, ADAMS_CONSTANTS, _$q_, _$httpBackend_, STGLogService, _uiGridConstants_, TEAMS_TYPE) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;
        userName = 'VASIRU01';
        logService = STGLogService;
        uiGridConstants = _uiGridConstants_;

        $intervalSpy = jasmine.createSpy('$interval', $interval);

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

        //blockUI = mockBlockUI;
        //$uibModal = jasmine.createSpyObj('$uibModal', ['close', 'dismiss']);
        adamsConstants = ADAMS_CONSTANTS;
        userAdministrationService = UserAdministrationService;

        $q = _$q_;
        $httpBackend = _$httpBackend_;
        appName = 'ADAMS';
        roleName = 'Admin';
        teamName = 100007;
        sourceSystemId = 1002;
        limit = 25;
        page = 1;
        searchTeamName = '';
        searchTeamDesc = '';
        searchTeamType = '';
        sort = '';
        index = 1;
        applications = '[{"name": "ADAMS"},{"name": "MyAdmin"}]';
        target_applications = '[{"name": "ADAMS"},{"name": "MyAdmin"}]';
        loginRoles = '[{"role": "NoAccess"}, {"role": "Global Admin"}, {"role": "Admin"}, {"role": "User"}]';
        userRoles = '[{"name": "User", "default_role": false, "teams": [{"team_name": "COMPASS","team_display_path": "/COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}, {"name": "Admin", "default_role": true, "teams": [{"team_name": "COMPASS","team_description": "Compass Group USA","team_display_path": "/COMPASS","source_system_id": "0","team_type": "BusinessType","default_team": false}]}]';
        // userRoles = '[{"name": "User", "default_role": false, "teams": [{"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}, {"name": "Admin", "default_role": true, "teams": [{"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}]';
        // teams = '[{"total_count": 107893, "hierarchy_teams": [{"team_name": "COMPASS", "team_display_name": "COMPASS", "team_display_path": "/COMPASS/100007","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}]';
        teams = '[{"metadata": {"resultCount": "600359"}, "data": [{"team_name": "COMPASS", "team_status_ind": "A", "team_display_name": "COMPASS", "team_display_path": "/COMPASS/100007", "team_path": "GROUP/COMPASS/100000/","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}]',
            teams1 = '[{"metadata": {"resultCount": "600359"}, "data": [{"team_name": "COMPASS", "team_status_ind": "I", "team_display_name": "COMPASS", "team_display_path": "/COMPASS/100007", "team_path": "GROUP/COMPASS/100000/","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}]',
            teams2 = '[{"metadata": {"resultCount": "600359"}, "data": [{"team_name": "COMPASS", "team_display_name": "COMPASS", "team_status_ind": "I", "team_display_path": "/COMPASS/100007", "team_path": "GROUP1/COMPASS1/200000/","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}]',
            applications = JSON.parse(applications);
        loginRoles = JSON.parse(loginRoles);
        userRoles = JSON.parse(userRoles);


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

        gridOptions = {
            data: [
                { col1: 'col1', col2: 'col2', team_status_ind: 'A' }
            ],
            onRegisterApi: function( api ){
                gridApi = api;
            }
        };

        gridOptions1 = {
            data: [
                { col1: 'col1', col2: 'col2', team_status_ind: 'I' }
            ],
            onRegisterApi: function( api ){
                gridApi = api;
            }
        };

        gridApi = {
            grid: {
                appScope: {
                    showProductsSearchData: jasmine.createSpy('gridApi.grid.appScope.showProductsSearchData')
                }
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

        mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss')
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

        mockUserAdministrationService.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve({"roles": [{"role": "NoAccess"}, {"role": "Global Admin"}, {"role": "Admin"}, {"role": "User"}]});
            return deferred.promise;
        };

        mockUserAdministrationService1.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockUserAdministrationService2.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        mockUserAdministrationService3.getRolesByLoginUser = function(appName, roleName) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockUserAdministrationService.addTeams = function(userName, appName, roleName, teams) {
            var deferred = $q.defer();
            deferred.resolve([{"message": "Success"}]);
            return deferred.promise;
        };

        mockUserAdministrationService1.addTeams = function(userName, appName, roleName, teams) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockUserAdministrationService2.addTeams = function(userName, appName, roleName, teams) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        mockUserAdministrationService.getHierarchicalTeams = function(limit, page, appName, roleName, searchTeamName, searchTeamDesc, searchTeamType, sort) {
            var deferred = $q.defer();
            // teamData = '{"metadata": {"resultCount": "600359"}, "data": [{"team_name": "COMPASS", "team_display_name": "COMPASS", "team_display_path": "/COMPASS/100007","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}';

            deferred.resolve({"metadata": {"resultCount": "600359"}, "data": [{"team_name": "COMPASS", "team_display_name": "COMPASS", "team_display_path": "/COMPASS/100007","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]});
            return deferred.promise;
        };

        Ctrl = $controller('TeamsController', {$rootScope: $rootScope, $scope: $scope, $uibModalInstance : mockModal, ModalDialogService: mockModalDialogService,
            userAppName: userName, userRoleName: roleName, UserAdministrationService: userAdministrationService, uiGridConstants: uiGridConstants, TEAMS_TYPE: TEAMS_TYPE});

        Ctrl1 = $controller('TeamsController', {$rootScope: $rootScope, $scope: $scope, $uibModalInstance : mockModal, ModalDialogService: mockModalDialogService,
            userAppName: userName, userRoleName: '', UserAdministrationService: userAdministrationService, uiGridConstants: uiGridConstants, TEAMS_TYPE: TEAMS_TYPE});

        Ctrl2 = $controller('TeamsController', {$rootScope: $rootScope, $scope: $scope, $uibModalInstance : mockModal, ModalDialogService: mockModalDialogService,
            userAppName: userName, userRoleName: '', UserAdministrationService: mockUserAdministrationService1, uiGridConstants: uiGridConstants, TEAMS_TYPE: TEAMS_TYPE});

        Ctrl3 = $controller('TeamsController', {$rootScope: $rootScope, $scope: $scope, $uibModalInstance : mockModal, ModalDialogService: mockModalDialogService,
            userAppName: userName, userRoleName: '', UserAdministrationService: mockUserAdministrationService2, uiGridConstants: uiGridConstants, TEAMS_TYPE: TEAMS_TYPE});

        Ctrl4 = $controller('TeamsController', {$rootScope: $rootScope, $scope: $scope, $uibModalInstance : mockModal, ModalDialogService: mockModalDialogService,
            userAppName: userName, userRoleName: '', UserAdministrationService: mockUserAdministrationService3, uiGridConstants: uiGridConstants, TEAMS_TYPE: TEAMS_TYPE});
    }));

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


    it('should call getTeamStatus ', function() {
        spyOn(Ctrl, "getTeamStatus").and.callThrough();
        teams = JSON.parse(teams);
        Ctrl.selectedTeam = teams[0].data[0];
        Ctrl.getTeamStatus();
        $scope.$apply();
        expect(Ctrl.getTeamStatus).toHaveBeenCalled();
    });


    it('should call getTeamStatus ', function() {
        spyOn(Ctrl, "getTeamStatus").and.callThrough();
        teams1 = JSON.parse(teams1);
        Ctrl.selectedTeam = teams1[0].data[0];
        Ctrl.getTeamStatus();
        $scope.$apply();
        expect(Ctrl.getTeamStatus).toHaveBeenCalled();
    });

    it('should initialize the controller properly', function () {
        var appData = '[{"name": "ADAMS"},{"name": "MyAdmin"}]';

        appData = JSON.parse(appData);
        teams = JSON.parse(teams);
        $scope.$apply();
        expect(Ctrl1).not.toBeUndefined();
    });

    it('should respond to the hierarchyTreeTeamSelectionChange event1', function () {
        var teams = '[{"team_id": "1", "team_name": "COMPASS", "team_display_name": "COMPASS", "team_status_ind": "A", "team_description": "Compass Group USA", "team_path": "/Compass",  "source_system_id": "0","team_type": "BusinessType","default_team": false}]',
            node = '{"team_id": "11", "team_name": "100007", "team_display_name": "100007", "team_status_ind": "A", "team_description": "Compass Group USA", "team_path": "/COMPASS/100007", "source_system_id": "1002","team_type": "BusinessType","default_team": false}',
            refId = 1,
            isSelected = true;

        teams = JSON.parse(teams);
        node = JSON.parse(node);
        $scope.$apply();
        spyOn($scope, '$on');
        $scope.$apply(function() {
            Ctrl.teams = teams;
            $rootScope.$broadcast('hierarchyTreeTeamSelectionChange', refId, isSelected, node);
        });
        //expect(Ctrl.teams).toEqual(teams);
    });

    it('should call uiGridLoadDetails', inject(function($interval) {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        $interval.flush(0,1);

        // expect($intervalSpy).toHaveBeenCalled();
        // expect(Ctrl.gridApi).toEqual(gridApi);
    }));

    it('should call uiGridLoadDetails', inject(function($interval) {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions1, gridApi);
        $interval.flush(0,1);

        // expect($intervalSpy).toHaveBeenCalled();
        // expect(Ctrl.gridApi).toEqual(gridApi);
    }));

    it('should call $destroy', inject(function($timeout) {
        $scope.filterTimeout = {};
        $rootScope.$broadcast('$destroy');
    }));

    it('should call $destroy - undefined', function() {
        $scope.filterTimeout = undefined;
        $rootScope.$broadcast('$destroy');
    });


    it('should respond to the hierarchyTreeTeamSelectionChange event2', function () {
        var teams = '[{"team_id": "11", "team_name": "100007", "team_display_name": "100007", "team_status_ind": "I", "team_description": "Compass Group USA", "team_path": "/Compass/100007", "source_system_id": "1002","team_type": "BusinessType","default_team": false}]',
            node = '{"team_id": "1", "team_name": "COMPASS", "team_display_name": "COMPASS", "team_status_ind": "I", "team_description": "Compass Group USA", "team_path": "/Compass",  "source_system_id": "0","team_type": "BusinessType","default_team": false}',
            teamData = '[{"team_id": "1", "team_name": "COMPASS", "team_display_name": "COMPASS", "team_status_ind": "I", "team_description": "Compass Group USA", "team_path": "/Compass",  "source_system_id": "0","team_type": "BusinessType","default_team": false}]',
            refId = 1,
            isSelected = true;

        teams = JSON.parse(teams);
        node = JSON.parse(node);
        teamData = JSON.parse(teamData);
        $scope.$apply();
        spyOn($scope, '$on');
        $scope.$apply(function() {
            Ctrl.teams = teams;
            $rootScope.$broadcast('hierarchyTreeTeamSelectionChange', refId, isSelected, node);
        });
        // expect(Ctrl.teams).toEqual(teams);
    });

    /*it('should respond to the hierarchyTreeTeamSelectionChange event3', function () {
        var teams = '[{"team_id": "11", "team_name": "100007", "team_display_name": "100007", "team_description": "Compass Group USA", "team_path": "/10007", "source_system_id": "1002","team_type": "BusinessType","default_team": false}]',
            node = '{"team_id": "12", "team_name": "COMPASS", "team_display_name": "COMPASS", "team_description": "Compass Group USA", "team_path": "/Compass",  "source_system_id": "0","team_type": "BusinessType","default_team": false}',
            teamData = '[{"team_id": "11", "team_name": "100007", "team_display_name": "100007 - Compass Group USA", "team_description": "Compass Group USA", "team_path": "/10007", "source_system_id": "1002","team_type": "BusinessType","default_team": false}, {"team_id": "12", "team_name": "COMPASS", "team_display_name": "COMPASS - Compass Group USA", "team_description": "Compass Group USA", "team_path": "/Compass",  "source_system_id": "0","team_type": "BusinessType","default_team": false}]',
            refId = 1,
            isSelected = true;

        teams = JSON.parse(teams);
        node = JSON.parse(node);
        teamData = JSON.parse(teamData);
        $scope.$apply();
        spyOn($scope, '$on');
        $scope.$apply(function() {
            Ctrl.teams = teams;
            $rootScope.$broadcast('hierarchyTreeTeamSelectionChange', refId, isSelected, node);
        });
        expect(Ctrl.teams).toEqual(teamData);
    });*/

    /*it('should respond to the hierarchyTreeTeamSelectionChange event4', function () {
        var teams = '[]',
            node = '{"team_id": "12", "team_name": "COMPASS", "team_display_name": "COMPASS", "team_description": "Compass Group USA", "team_display_path": "/Compass",  "source_system_id": "0","team_type": "BusinessType","default_team": false}',
            teamData = '[{"team_id": "12", "team_name": "COMPASS", "team_display_name": "COMPASS - Compass Group USA", "team_description": "Compass Group USA", "team_display_path": "/Compass",  "source_system_id": "0","team_type": "BusinessType","default_team": false}]',
            refId = 1,
            isSelected = true;

        teams = JSON.parse(teams);
        node = JSON.parse(node);
        teamData = JSON.parse(teamData);
        $scope.$apply();
        spyOn($scope, '$on');
        $scope.$apply(function() {
            Ctrl.teams = teams;
            $rootScope.$broadcast('hierarchyTreeTeamSelectionChange', refId, isSelected, node);
        });
        expect(Ctrl.teams).toEqual(teamData);
    });*/

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
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions1, gridApi);
        $rootScope.$broadcast('uiGridSelectedRows', JSON.parse(teams2)[0].data, selectionEvent);
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
});

