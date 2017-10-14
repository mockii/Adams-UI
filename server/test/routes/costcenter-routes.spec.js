describe('Cost Center Routes', function() {

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
        costCenterRouter;


    before(function(){
        config = new Config();

        costCenterRouter = require('../../src/routes/costcenter-routes')(config, mockData.stgAuth);
        app.use(config.server.rootContext, costCenterRouter);
    });



    it('should get cost centers', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.costCenters;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get cost centers and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.costCenters;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get cost centers and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.costCenters;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get cost center details', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.costCenterDetails;

        return request(app)
            .get(url)
            .query({
                costCenterNumber: mockData.adams.constants.costCenterName,
                sourceSystemId: mockData.adams.constants.costCenterSourceSystemId
            })
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get cost center details and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.costCenterDetails;

        return request(app)
            .get(url)
            .query({
                costCenterNumber: mockData.adams.constants.costCenterName,
                sourceSystemId: mockData.adams.constants.costCenterSourceSystemId
            })
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get cost center details and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.costCenterDetails;

        return request(app)
            .get(url)
            .query({
                costCenterNumber: mockData.adams.constants.costCenterName,
                sourceSystemId: mockData.adams.constants.costCenterSourceSystemId
            })
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get markets mapped to cost center', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.costCenterAndListMarkets;

        return request(app)
            .get(url)
            .query({
                costCenterNumber: mockData.adams.constants.costCenterName,
                sourceSystemId: mockData.adams.constants.costCenterSourceSystemId
            })
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get markets mapped to cost center and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.costCenterAndListMarkets;

        return request(app)
            .get(url)
            .query({
                costCenterNumber: mockData.adams.constants.costCenterName,
                sourceSystemId: mockData.adams.constants.costCenterSourceSystemId
            })
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get markets mapped to cost center and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.costCenterAndListMarkets;

        return request(app)
            .get(url)
            .query({
                costCenterNumber: mockData.adams.constants.costCenterName,
                sourceSystemId: mockData.adams.constants.costCenterSourceSystemId
            })
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get root market', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.marketMappingRoot;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get root market and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.marketMappingRoot;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get root market and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.marketMappingRoot;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get children of market', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.marketMappingChildren;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to children of market and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.marketMappingChildren;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get market and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.marketMappingChildren;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should delete market mapping from cost center', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteCostCentersMarkets
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName)
                .replace(':marketName', mockData.adams.constants.marketName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to delete market mapping from cost center and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteCostCentersMarkets
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName)
                .replace(':marketName', mockData.adams.constants.marketName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to delete market mapping from cost center and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteCostCentersMarkets
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName)
                .replace(':marketName', mockData.adams.constants.marketName);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should add market mapping to cost center', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.addCostCenterMarketMapping
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to add market mapping to cost center and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.addCostCenterMarketMapping
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to add market mapping to cost center and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.addCostCenterMarketMapping
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get vendors mapped to cost center', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.costCenterVendors
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get vendors mapped to cost center and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.costCenterVendors
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get vendors mapped to cost center and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.costCenterVendors
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should update vendor mapped to cost center', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateCostCenterVendor
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName)
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to update vendor mapped to cost center and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateCostCenterVendor
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName)
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to update vendor mapped to cost center and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.updateCostCenterVendor
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName)
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get cost center vendor mapping history', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.costCenterVendorHistory
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName)
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get cost center vendor mapping history and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.costCenterVendorHistory
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName)
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get cost center vendor mapping history and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.costCenterVendorHistory
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName)
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get vendors eligible for mapping to cost center', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.eligibleCostCenterVendor
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get vendors eligible for mapping to cost center and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.eligibleCostCenterVendor
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get vendors eligible for mapping to cost center and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.eligibleCostCenterVendor
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should add vendor mapping to cost center', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.addEligibleVendors
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to add vendor mapping to cost center and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.addEligibleVendors
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to add vendor mapping to cost center and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.addEligibleVendors
                .replace(':costCenterNumber', mockData.adams.constants.costCenterName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

});

