describe('Book or Record Routes', function() {

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
        bookOfRecordRouter;


    before(function(){
        config = new Config();

        bookOfRecordRouter = require('../../src/routes/book-of-record-routes')(config, mockData.stgAuth);
        app.use(config.server.rootContext, bookOfRecordRouter);
    });

    after(function(){
        process.env.NODE_ENV = 'test';
    });



    it('should get book of record', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.bookOfRecords;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should get book of record - v1', function(){
        process.env.NODE_ENV = '';
        bookOfRecordRouter = require('../../src/routes/book-of-record-routes')(config, mockData.stgAuth);

        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.bookOfRecords;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should handle book of record api error', function(){
        process.env.NODE_ENV = '';
        bookOfRecordRouter = require('../../src/routes/book-of-record-routes')(config, mockData.stgAuth);

        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects([],500,[]);

        var url = config.server.rootContext + urlSpace.urls.local.bookOfRecords;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

});

