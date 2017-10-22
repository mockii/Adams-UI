'use strict';

describe('UserAdministrationService', function(){

    var scope,
        sampleSvcObj,
        $q,
        mockRBACService = {},
        $httpBackend,
        urlSpace,
        userData = '[{"total_count": 59988, "users": [{ "gender": "Female", "active": true, "sector": null, "division": null, "user_name": "ZZAARONP01", "first_name": "PAULA", "middle_name": "J", "last_name": "AARON", "cost_center_name": "5076", "cost_center_description": "Little Rock Vending", "cost_center_display_name": "5076 Little Rock Vending", "work_phone": "870-863-7454", "mobile_phone": "5015620111", "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"}]}]';

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.user.administration.service'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('RBACService', mockRBACService);
        });
    });

    beforeEach(inject(function($rootScope, _$httpBackend_, UserAdministrationService, _$q_, ADAMS_URL_SPACE){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = UserAdministrationService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;
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
    }));

    it('should get UserName', function(){
        var userName = 'VASIRU01';
        expect(sampleSvcObj.getUserName()).toEqual(userName);
    });

    it('should get RoleName', function(){
        var roleName = 'Admin';
        expect(sampleSvcObj.getRoleName()).toEqual(roleName);
    });

    it('should get User Profile Info', function(){
        var limit = 25,
            page = 1,
            appName = 'ADAMS',
            roleName = 'Admin',
            searchUserName = '',
            searchLastName = '',
            searchFirstName = '',
            searchStatus = '',
            searchCostCenter = '',
            sorts = '',
            search = null,
            url = urlSpace.urls.local.userDetails + '?limit=' + limit + '&page=' + page + '&appName=' + appName + '&roleName=' + roleName +  '&sorts=' + sorts + '&search=' + search;
        userData = JSON.parse(userData);
        
        
        $httpBackend.expectGET(url).respond(userData);

        sampleSvcObj.getUserDetails(limit, page, sorts, search, appName, roleName).then(function(data) {
            expect(data[0]).toEqual(userData[0]);
        });
        $httpBackend.flush();
    });

    it('should abort get User Profile Info', function(){
        var limit = 25,
            page = 1,
            appName = 'ADAMS',
            roleName = 'Admin',
            searchUserName = '',
            searchLastName = '',
            searchFirstName = '',
            searchStatus = '',
            searchCostCenter = '',
            sorts = '',
            search = null,
            url = urlSpace.urls.local.userDetails + '?limit=' + limit + '&page=' + page + '&appName=' + appName + '&roleName=' + roleName +  '&sorts=' + sorts + '&search=' + search;


        $httpBackend.expectGET(url).respond(userData);

        sampleSvcObj.getUserDetails(limit, page, sorts, search, appName, roleName).abort();

    });

    it('should error out User Profile Info', function(){
        var limit = 25,
            page = 1,
            appName = 'ADAMS',
            roleName = 'Admin',
            searchUserName = '',
            searchLastName = '',
            searchFirstName = '',
            searchStatus = '',
            searchCostCenter = '',
            sorts = '',
            search = null,
            url = urlSpace.urls.local.userDetails + '?limit=' + limit + '&page=' + page + '&appName=' + appName + '&roleName=' + roleName + '&sorts=' + sorts + '&search=' + search;

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getUserDetails(limit, page, sorts, search, appName, roleName).then(function(data) {
            expect(data.data).toEqual({});
        });
        $httpBackend.flush();
    });

    it('should get User Profile Info', function(){
        var limit = null,
            page = null,
            sorts = '',
            search = null,
            fields = '',
            userName = 'Chouhr01',
            url = urlSpace.urls.local.userHistory.replace('{userName}', userName) + '?limit=' + '' + '&page=' + '' + '&sorts=' + JSON.stringify({sorts: [{direction: 'DESC', property:'action_date'}]})  + '&fields=' + fields + '&search=' + JSON.stringify(search);


        $httpBackend.expectGET(url).respond(userData);

        sampleSvcObj.getUserHistory(limit, page, sorts, search, userName, fields).then(function(data) {
            expect(data[0]).toEqual(userData[0]);
        });
        $httpBackend.flush();
    });

    it('should get User Profile Info', function(){
        var limit = 25,
            page = 1,
            sorts = JSON.stringify({sorts: [{direction: 'DESC', property:'action_date'}]}),
            search = null,
            fields = '',
            userName = 'Chouhr01',
            url = urlSpace.urls.local.userHistory.replace('{userName}', userName) + '?limit=' + limit + '&page=' + page + '&sorts=' + sorts  + '&fields=' + fields + '&search=' + JSON.stringify(search);


        $httpBackend.expectGET(url).respond(userData);

        sampleSvcObj.getUserHistory(limit, page, sorts, search, userName, fields).then(function(data) {
            expect(data[0]).toEqual(userData[0]);
        });
        $httpBackend.flush();
    });

    it('should abort getUserHistory', function(){
        var limit = 25,
            page = 1,
            sorts = JSON.stringify({sorts: [{direction: 'DESC', property:'action_date'}]}),
            search = null,
            fields = '',
            userName = 'Chouhr01',
            url = urlSpace.urls.local.userHistory.replace('{userName}', userName) + '?limit=' + limit + '&page=' + page + '&sorts=' + sorts  + '&fields=' + fields + '&search=' + JSON.stringify(search);


        $httpBackend.expectGET(url).respond(userData);

        sampleSvcObj.getUserHistory(limit, page, sorts, search, userName, fields).abort();

    });

    it('should error out getUserHistory', function(){
        var limit = 25,
            page = 1,
            sorts = JSON.stringify({sorts: [{direction: 'DESC', property:'action_date'}]}),
            search = null,
            fields = '',
            userName = 'Chouhr01',
            url = urlSpace.urls.local.userHistory.replace('{userName}', userName) + '?limit=' + limit + '&page=' + page + '&sorts=' + sorts  + '&fields=' + fields + '&search=' + JSON.stringify(search);

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getUserHistory(limit, page, sorts, search, userName, fields).then(function(data) {
            expect(data.data).toEqual({});
        });
        $httpBackend.flush();
    });

    it('should get applications Info by user', function(){
        var userName = 'VASIRU01',
            appData = '[{"data": [{"applications": [{"name": "ADAMS"},{"name": "MyAdmin"}]}]}]',
            url = urlSpace.urls.local.applicationsByUser.replace('{userName}', userName);

        appData = JSON.parse(appData);
        $httpBackend.expectGET(url).respond(userData);

        sampleSvcObj.getApplicationsByUser(userName).then(function(data) {
            expect(data).toEqual(appData[0].applications);
        });
        $httpBackend.flush();
    });

    it('should error out applications Info by user', function(){
        var userName = 'VASIRU01',
            appData = '[{"data": [{"applications": [{"name": "ADAMS"},{"name": "MyAdmin"}]}]}]',
            url = urlSpace.urls.local.applicationsByUser.replace('{userName}', userName);

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getApplicationsByUser(userName).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should get roles Info by loginuser', function(){
        var roleName = 'Admin',
            application = 'ADAMS',
            rolesData = '[{"data": [{"roles": [{"role": "NoAccess"}, {"role": "Global Admin"}, {"role": "Admin"}, {"role": "User"}]}]}]',
            url = urlSpace.urls.local.rolesByLoginUser.replace('{application}', application).replace('{role}', roleName);

        rolesData = JSON.parse(rolesData);
        $httpBackend.expectGET(url).respond(rolesData);

        sampleSvcObj.getRolesByLoginUser(application).then(function(data) {
            expect(data).toEqual(rolesData[0].roles);
        });
        $httpBackend.flush();
    });

    it('should error roles Info by loginuser', function(){
        var roleName = 'Admin',
            application = 'ADAMS',
            rolesData = '[{"data": [{"roles": [{"role": "NoAccess"}, {"role": "Global Admin"}, {"role": "Admin"}, {"role": "User"}]}]}]',
            url = urlSpace.urls.local.rolesByLoginUser.replace('{application}', application).replace('{role}', roleName);

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getRolesByLoginUser(application).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should get roles Info by user', function(){
        var userName = 'VASIRU01',
            application = 'ADAMS',
            rolesData = '[{"data": [{"name": "User", "default_role": false}, {"name": "Admin", "default_role": true}]}]',
            url = urlSpace.urls.local.rolesByUser.replace('{userName}', userName).replace('{application}', application);

        rolesData = JSON.parse(rolesData);
        $httpBackend.expectGET(url).respond(rolesData);

        sampleSvcObj.getRolesByUser(userName, application).then(function(data) {
            expect(data).toEqual(rolesData[0].roles);
        });
        $httpBackend.flush();
    });

    it('should error roles Info by user', function(){
        var userName = 'VASIRU01',
            application = 'ADAMS',
            rolesData = '[{"data": [{"name": "User", "default_role": false}, {"name": "Admin", "default_role": true}]}]',
            url = urlSpace.urls.local.rolesByUser.replace('{userName}', userName).replace('{application}', application);

        rolesData = JSON.parse(rolesData);
        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getRolesByUser(userName, application).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();
    });

    it('should get teams Info by user', function(){
        var userName = 'VASIRU01',
            application = 'ADAMS',
            role = 'Admin',
            teamsData = '[{"data": {"teams": [{"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}}]',
            url = urlSpace.urls.local.teamsByUser.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);

        teamsData = JSON.parse(teamsData);
        $httpBackend.expectGET(url).respond(teamsData);

        sampleSvcObj.getTeamsByUser(userName, application, role).then(function(data) {
            expect(data).toEqual(teamsData[0].teams);
        });
        $httpBackend.flush();
    });

    it('should error teams Info by user', function(){
        var userName = 'VASIRU01',
            application = 'ADAMS',
            role = 'Admin',
            teamsData = '[{"data": {"teams": [{"team_name": "COMPASS","team_description": "Compass Group USA","source_system_id": "0","team_type": "BusinessType","default_team": false}]}}]',
            url = urlSpace.urls.local.teamsByUser.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);

        teamsData = JSON.parse(teamsData);
        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getTeamsByUser(userName, application, role).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();
    });

    it('should update role Info by user', function(){
        var userName = 'ZZAARONP01',
            application = 'ADAMS',
            role = '{"currentRole":"User","newRole":"Admin"}',
            message = "Success",
            url = urlSpace.urls.local.updateRole.replace('{userName}', userName).replace('{application}', application);
        
        $httpBackend.expectPUT(url).respond(message);

        sampleSvcObj.updateRole(userName, application, role).then(function(response) {
            expect(response.data).toEqual(message);
        });
        $httpBackend.flush();
    });

    it('should error role Info by user', function(){
        var userName = 'ZZAARONP01',
            application = 'ADAMS',
            role = '{"currentRole":"User","newRole":"Admin"}',
            message = "Success",
            url = urlSpace.urls.local.updateRole.replace('{userName}', userName).replace('{application}', application);

        $httpBackend.expectPUT(url).respond(400, {});

        sampleSvcObj.updateRole(userName, application, role).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should change default role by user', function(){
        var userName = 'ZZAARONP01',
            application = 'ADAMS',
            role = 'Admin',
            message = "Success",
            url = urlSpace.urls.local.changeDefaultRole.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);
        
        $httpBackend.expectPUT(url).respond(message);

        sampleSvcObj.changeDefaultRole(userName, application, role).then(function(response) {
            expect(response.data).toEqual(message);
        });
        $httpBackend.flush();
    });

    it('should error default role by user', function(){
        var userName = 'ZZAARONP01',
            application = 'ADAMS',
            role = 'Admin',
            message = "Success",
            url = urlSpace.urls.local.changeDefaultRole.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);

        $httpBackend.expectPUT(url).respond(400, {});

        sampleSvcObj.changeDefaultRole(userName, application, role).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should change default team by user', function(){
        var userName = 'ZZAARONP01',
            application = 'ADAMS',
            role = 'Admin',
            team = '100007',
            sourceSystemID = '1002',
            message = "Success",
            url = urlSpace.urls.local.changeDefaultTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role).replace('{team}', team).replace('{sourcesystemid}', sourceSystemID);

        $httpBackend.expectPUT(url).respond(message);

        sampleSvcObj.changeDefaultTeam(userName, application, role, team, sourceSystemID).then(function(response) {
            expect(response.data).toEqual(message);
        });
        $httpBackend.flush();
    });

    it('should error default team by user', function(){
        var userName = 'ZZAARONP01',
            application = 'ADAMS',
            role = 'Admin',
            team = '100007',
            sourceSystemID = '1002',
            message = "Success",
            url = urlSpace.urls.local.changeDefaultTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role).replace('{team}', team).replace('{sourcesystemid}', sourceSystemID);

        $httpBackend.expectPUT(url).respond(400, {});

        sampleSvcObj.changeDefaultTeam(userName, application, role, team, sourceSystemID).then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
    });

    it('should delete app by user', function(){
        var userName = 'ZZAARONP01',
            application = 'ADAMS',
            message = "Success",
            url = urlSpace.urls.local.deleteApp.replace('{userName}', userName).replace('{application}', application);

        $httpBackend.expectDELETE(url).respond(message);

        sampleSvcObj.deleteApp(userName, application).then(function(response) {
            expect(response.data).toEqual(message);
        });
        $httpBackend.flush();
    });

    it('should error app by user', function(){
        var userName = 'ZZAARONP01',
            application = 'ADAMS',
            message = "Success",
            url = urlSpace.urls.local.deleteApp.replace('{userName}', userName).replace('{application}', application);

        $httpBackend.expectDELETE(url).respond(400, {});

        sampleSvcObj.deleteApp(userName, application).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should delete role by user', function(){
        var userName = 'ZZAARONP01',
            application = 'MyAdmin',
            role = 'Admin',
            message = "Success",
            url = urlSpace.urls.local.deleteRole.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);

        $httpBackend.expectDELETE(url).respond(message);

        sampleSvcObj.deleteRoles(userName, application, role).then(function(response) {
            expect(response.data).toEqual(message);
        });
        $httpBackend.flush();
    });

    it('should error role by user', function(){
        var userName = 'ZZAARONP01',
            application = 'MyAdmin',
            role = 'Admin',
            message = "Success",
            url = urlSpace.urls.local.deleteRole.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);

        $httpBackend.expectDELETE(url).respond(400, {});

        sampleSvcObj.deleteRoles(userName, application, role).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should delete team by user', function(){
        var userName = 'ZZAARONP01',
            application = 'MyAdmin',
            role = 'Admin',
            team = '100007',
            sourceSystemID = '1002',
            message = "Success",
            url = urlSpace.urls.local.deleteTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role).replace('{team}', team).replace('{sourcesystemid}', sourceSystemID);

        $httpBackend.expectDELETE(url).respond(message);

        sampleSvcObj.deleteTeam(userName, application, role, team, sourceSystemID).then(function(response) {
            expect(response.data).toEqual(message);
        });
        $httpBackend.flush();
    });

    it('should error team by user', function(){
        var userName = 'ZZAARONP01',
            application = 'MyAdmin',
            role = 'Admin',
            team = '100007',
            sourceSystemID = '1002',
            message = "Success",
            url = urlSpace.urls.local.deleteTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role).replace('{team}', team).replace('{sourcesystemid}', sourceSystemID);

        $httpBackend.expectDELETE(url).respond(400, {});

        sampleSvcObj.deleteTeam(userName, application, role, team, sourceSystemID).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should add team by user', function(){
        var userName = 'ZZAARONP01',
            application = 'MyAdmin',
            role = 'User',
            teams = '{"teams":[{"defaultTeam":null,"sourceSystemId":1009,"teamDescription":"Morrison Client Pay","teamDisplayPath":"GROUP~NA Group/COMPASS~Compass Group/100008~Morrison Client Pay/","teamName":"100008","teamPath":"GROUP/COMPASS/100008/","teamType":"SECTOR"}]}',
            message = "Success",
            url = urlSpace.urls.local.addTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);
        
        $httpBackend.expectPOST(url).respond(message);

        sampleSvcObj.addTeams(userName, application, role, teams).then(function(response) {
            expect(response.data).toEqual(message);
        });
        $httpBackend.flush();
    });

    it('should error team by user', function(){
        var userName = 'ZZAARONP01',
            application = 'MyAdmin',
            role = 'User',
            teams = '{"teams":[{"defaultTeam":null,"sourceSystemId":1009,"teamDescription":"Morrison Client Pay","teamDisplayPath":"GROUP~NA Group/COMPASS~Compass Group/100008~Morrison Client Pay/","teamName":"100008","teamPath":"GROUP/COMPASS/100008/","teamType":"SECTOR"}]}',
            message = "Success",
            url = urlSpace.urls.local.addTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);

        $httpBackend.expectPOST(url).respond(400, {});

        sampleSvcObj.addTeams(userName, application, role, teams).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
    });



    it('should getHierarchicalTeams ', function(){
        var limit = 25,
            page = 1,
            appName = 'ADAMS',
            roleName = 'Admin',
            searchTeamName = '',
            searchTeamDescription = '',
            searchTeamType = '',
            sort = '',
            searchInput = null,


        url = urlSpace.urls.local.costCenterByLoginUser.replace('{application}', appName).replace('{role}', roleName)
            + '?limit=' + limit + '&page=' + page + '&searchTeamName=' + searchTeamName + '&searchTeamDescription=' + searchTeamDescription + '&searchTeamType=' + searchTeamType + '&sort=' + sort;


        $httpBackend.expectGET(url).respond({});

        sampleSvcObj.getHierarchicalTeams(limit, page, appName, roleName, searchTeamName, searchTeamDescription, searchTeamType, sort).then(function(data) {
            expect(data).toEqual({});
        });
        $httpBackend.flush();
    });


    it('should abort getHierarchicalTeams ', function(){
        var limit = 25,
            page = 1,
            appName = 'ADAMS',
            roleName = 'Admin',
            searchTeamName = '',
            searchTeamDescription = '',
            searchTeamType = '',
            sort = '',
            searchInput = null,


        url = urlSpace.urls.local.costCenterByLoginUser.replace('{application}', appName).replace('{role}', roleName)
            + '?limit=' + limit + '&page=' + page + '&searchTeamName=' + searchTeamName + '&searchTeamDescription=' + searchTeamDescription + '&searchTeamType=' + searchTeamType + '&sort=' + sort;


        $httpBackend.expectGET(url).respond({});

        sampleSvcObj.getHierarchicalTeams(limit, page, appName, roleName, searchTeamName, searchTeamDescription, searchTeamType, sort).abort();
    });

    it('should error out getHierarchicalTeams ', function(){
        var limit = 25,
            page = 1,
            appName = 'ADAMS',
            roleName = 'Admin',
            searchTeamName = '',
            searchTeamDescription = '',
            searchTeamType = '',
            sort = '',
            searchInput = null,

            url = urlSpace.urls.local.costCenterByLoginUser.replace('{application}', appName).replace('{role}', roleName)
                + '?limit=' + limit + '&page=' + page + '&searchTeamName=' + searchTeamName + '&searchTeamDescription=' + searchTeamDescription + '&searchTeamType=' + searchTeamType + '&sort=' + sort;

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getHierarchicalTeams(limit, page, appName, roleName, searchTeamName, searchTeamDescription, searchTeamType, sort).then(function(data) {
            expect(data.status).toEqual(400);
        });
        $httpBackend.flush();
    });

    it('should getApplicationsByLoginUser  ', function(){
        var userName;
        userName = 'VASIRU01';

        var url = urlSpace.urls.local.applicationsByUser.replace('{userName}', userName);

        $httpBackend.expectGET(url).respond({});

        sampleSvcObj.getApplicationsByLoginUser ().then(function(data) {
            expect(data).toEqual({ user: 'VASIRU01', userApplications: undefined });
        });
        $httpBackend.flush();
    });

    it('should error out getApplicationsByLoginUser  ', function(){
        var userName;
        userName = 'VASIRU01';

        var url = urlSpace.urls.local.applicationsByUser.replace('{userName}', userName);

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getApplicationsByLoginUser ().then(function(data) {
            expect(data.status).toEqual(400);
        });
        $httpBackend.flush();
    });


    it('should getSelectApplicationOptions  ', function(){
        var limit = 25,
            page = 1;

        var url = urlSpace.urls.local.secApplication + '?limit=' + limit + '&page=' + page;

        $httpBackend.expectGET(url).respond({data: { user: 'VASIRU01', userApplications: undefined }});

        sampleSvcObj.getSelectApplicationOptions(limit, page).then(function(data) {
            expect(data).toEqual({ user: 'VASIRU01', userApplications: undefined });
        });
        $httpBackend.flush();
    });

    it('should error out getSelectApplicationOptions   ', function(){
        var limit = 25,
            page = 1;

        var url = urlSpace.urls.local.secApplication + '?limit=' + limit + '&page=' + page;

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getSelectApplicationOptions(limit, page).then(function(data) {
            expect(data.status).toEqual(400);
        });
        $httpBackend.flush();
    });

    it('should getSelectRoleOptions ', function(){
        var selectedApplication = 'ADAMS',
            limit = 25,
            page = 1;

        var url = urlSpace.urls.local.secRole + '?limit=' + limit + '&page=' + page + '&application_name=' + selectedApplication;

        $httpBackend.expectGET(url).respond({data: { user: 'VASIRU01', userApplications: undefined }});

        sampleSvcObj.getSelectRoleOptions(selectedApplication, limit, page).then(function(data) {
            expect(data).toEqual({ user: 'VASIRU01', userApplications: undefined });
        });
        $httpBackend.flush();
    });

    it('should getSelectRoleOptions call else url ', function(){
        var selectedApplication = '',
            limit = 25,
            page = 1;

        var url = urlSpace.urls.local.secRole + '?limit=' + limit + '&page=' + page;

        $httpBackend.expectGET(url).respond({data: { user: 'VASIRU01', userApplications: undefined }});

        sampleSvcObj.getSelectRoleOptions(selectedApplication, limit, page).then(function(data) {
            expect(data).toEqual({ user: 'VASIRU01', userApplications: undefined });
        });
        $httpBackend.flush();
    });

    it('should error out getSelectRoleOptions  ', function(){
        var selectedApplication = 'ADAMS',
            limit = 25,
            page = 1;

        var url = urlSpace.urls.local.secRole + '?limit=' + limit + '&page=' + page + '&application_name=' + selectedApplication;

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getSelectRoleOptions(selectedApplication, limit, page).then(function(data) {
            expect(data).toEqual('An error occurred getting application options data[object Object]');
        });
        $httpBackend.flush();
    });
});
