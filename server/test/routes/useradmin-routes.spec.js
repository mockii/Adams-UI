describe('User Admin Routes', function() {

    var expect = require('chai').expect,
        request = require('supertest'),
        sinon = require('sinon'),
        Promise = require('promise'),
        express = require('express'),
        app = express(),
        mockData = require('../mock-data'),
        urlSpace = require('../../src/url-space'),
        utils = require('../../src/utils'),
        Config = require('../../src/config'),
        config,
        userAdminRouter;


    before(function(){
        config = new Config();

        userAdminRouter = require('../../src/routes/useradmin-routes')(config, mockData.stgAuth);
        app.use(config.server.rootContext, userAdminRouter);
    });



    it('should get user details', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.userDetails;

        return request(app)
            .get(url)
            .query({
                appName: mockData.adams.constants.applicationName,
                roleName: mockData.adams.constants.roleName
            })
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get user details and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.userDetails;

        return request(app)
            .get(url)
            .query({
                appName: mockData.adams.constants.applicationName,
                roleName: mockData.adams.constants.roleName
            })
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get user details and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.userDetails;

        return request(app)
            .get(url)
            .query({
                appName: mockData.adams.constants.applicationName,
                roleName: mockData.adams.constants.roleName
            })
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get applications for user', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.applicationsByUser
                .replace(':userName', mockData.adams.constants.username);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get applications for user and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.applicationsByUser
                .replace(':userName', mockData.adams.constants.username);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get applications for user and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.applicationsByUser
                .replace(':userName', mockData.adams.constants.username);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get user history', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.userHistory
                .replace(':userName', mockData.adams.constants.username);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get user history and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.userHistory
                .replace(':userName', mockData.adams.constants.username);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get user history and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.userHistory
                .replace(':userName', mockData.adams.constants.username);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get roles for logged in user for application', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.rolesByLoginUser
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get roles for logged in user for application and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.rolesByLoginUser
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get roles for logged in user for application and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.rolesByLoginUser
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get roles for user for application', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.rolesByUser
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get roles for user for application and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.rolesByUser
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get roles for user for application and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.rolesByUser
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get teams for user for application and role', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.teamsByUser
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get teams for user for application and role and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.teamsByUser
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get teams for user for application and role and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.teamsByUser
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should update role for a user for an application', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateRole
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to update role for a user for an application and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateRole
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to update role for a user for an application and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.updateRole
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should set default role for user for application', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.changeDefaultRole
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to set default role for user for application and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.changeDefaultRole
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to set default role for user for application and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.changeDefaultRole
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should set default role for user for application', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.changeDefaultTeam
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName)
                .replace(':team', mockData.adams.constants.teamName)
                .replace(':sourcesystemid', mockData.adams.constants.teamSourceSystemId);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to set default role for user for application and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.changeDefaultTeam
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName)
                .replace(':team', mockData.adams.constants.teamName)
                .replace(':sourcesystemid', mockData.adams.constants.teamSourceSystemId);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to set default role for user for application and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.changeDefaultTeam
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName)
                .replace(':team', mockData.adams.constants.teamName)
                .replace(':sourcesystemid', mockData.adams.constants.teamSourceSystemId);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should delete application access for a user', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteApp
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to delete application access for a user and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteApp
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to delete application access for a user and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteApp
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should delete role access for a user for an application', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteRole
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to delete role access for a user for an application and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteRole
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to delete role access for a user for an application and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteRole
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should delete team access for a user for an application and role', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteTeam
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName)
                .replace(':team', mockData.adams.constants.teamName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to delete team access for a user for an application and role and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteTeam
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName)
                .replace(':team', mockData.adams.constants.teamName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to delete team access for a user for an application and role and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteTeam
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName)
                .replace(':team', mockData.adams.constants.teamName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should add team access for a user for an application and role', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.addTeam
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to add team access for a user for an application and role and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.addTeam
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to add team access for a user for an application and role and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.addTeam
                .replace(':userName', mockData.adams.constants.username)
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get teams for logged in user for application and role', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.costCenterByLoginUser
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get teams for logged in user for application and role and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.costCenterByLoginUser
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get teams for logged in user for application and role and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.costCenterByLoginUser
                .replace(':application', mockData.adams.constants.applicationName)
                .replace(':role', mockData.adams.constants.roleName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get list of applications the logged in user has access to', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.secApplication;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get list of applications the logged in user has access to and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.secApplication;
        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get list of applications the logged in user has access to and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.secApplication;
        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get list of roles the logged in user has access to', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.secRole;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should get list of roles for an application the logged in user has access to', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.secRole;

        return request(app)
            .get(url)
            .query({application_name: mockData.adams.constants.applicationName})
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get list of roles the logged in user has access to and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.secRole;
        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get list of roles the logged in user has access to and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.secRole;
        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get list of secured objects the logged in user has access to', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.secObjects;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should get list of secured objects for application and role that the logged in user has access to', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.secObjects;

        return request(app)
            .get(url)
            .query({
                application_name: mockData.adams.constants.applicationName,
                role_name: mockData.adams.constants.roleName
            })
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get list of secured objects the logged in user has access to and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.secObjects;
        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get list of secured objects the logged in user has access to and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.secObjects;
        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

});

