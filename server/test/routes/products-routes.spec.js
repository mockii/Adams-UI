describe('Product Routes', function() {

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
        productRouter;


    before(function(){
        config = new Config();

        productRouter = require('../../src/routes/products-routes')(config, mockData.stgAuth);
        app.use(config.server.rootContext, productRouter);
    });



    it('should get products', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.products;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get products and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.products;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get products and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.products;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get product details', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.productDetails
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get product details and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.productDetails
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get product details and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.productDetails
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get allergen data for product', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.allergens
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get allergen data for product and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.allergens
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get allergen data for product and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.allergens
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get diet types for product', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.dietTypes
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get diet types for product and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.dietTypes
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get diet types for product and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.dietTypes
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get marketing data for product', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.marketing
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get marketing data for product and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.marketing
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get marketing data for product and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.marketing
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get multimedia data for product', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.multimedia
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get multimedia data for product and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.multimedia
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get multimedia data for product and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.multimedia
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get nutrients data for product', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.nutrients
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get nutrients data for product and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.nutrients
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get nutrients data for product and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.nutrients
                .replace(':gtin', mockData.adams.constants.gtin);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

});

