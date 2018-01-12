describe('Comm Preferences Routes', function() {

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
        commPreferencesRouter;


    before(function(){
        config = new Config();

        commPreferencesRouter = require('../../src/routes/comm-preferences-routes')(config, mockData.stgAuth);
        app.use(config.server.rootContext, commPreferencesRouter);
    });



    it('should get Communication Preferences', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.commPreferences;

        return request(app)
            .get(url)
            .query({
                userName: 'vasiru01'
            })
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get Communication Preferences and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.commPreferences;

        return request(app)
            .get(url)
            .query({
                userName: 'vasiru01'
            })
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should add Communication Preferences', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.commPreferences;

        return request(app)
            .post(url)
            .query({
                userName: 'vasiru01'
            })
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to add Communication Preferences and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.commPreferences;

        return request(app)
            .post(url)
            .query({
                userName: 'vasiru01'
            })
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should update Communication Preferences', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.updateCommPreferences;

        return request(app)
            .put(url)
            .query({
                userName: 'vasiru01',
                communicationPreferencesCode: '123qwe'
            })
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to update Communication Preferences and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.updateCommPreferences;

        return request(app)
            .put(url)
            .query({
                userName: 'vasiru01',
                communicationPreferencesCode: '123qwe'
            })
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

});

