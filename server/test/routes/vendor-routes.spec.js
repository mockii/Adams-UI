describe('Vendor Routes', function() {

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
        vendorRouter;


    before(function(){
        config = new Config();

        vendorRouter = require('../../src/routes/vendor-routes')(config, mockData.stgAuth);
        app.use(config.server.rootContext, vendorRouter);
    });



    it('should delete vendor team', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteVendorsTeam
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':marketName', mockData.adams.constants.marketName)
                .replace(':teamName', mockData.adams.constants.teamName)
                .replace(':vendorSourceSystemId', mockData.adams.constants.teamName)
                .replace(':teamSourceSystemId', mockData.adams.constants.teamSourceSystemId);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to delete vendor teams and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteVendorsTeam
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':marketName', mockData.adams.constants.marketName)
                .replace(':teamName', mockData.adams.constants.teamName)
                .replace(':vendorSourceSystemId', mockData.adams.constants.teamName)
                .replace(':teamSourceSystemId', mockData.adams.constants.teamSourceSystemId);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to delete vendor teams and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteVendorsTeam
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':marketName', mockData.adams.constants.marketName)
                .replace(':teamName', mockData.adams.constants.teamName)
                .replace(':vendorSourceSystemId', mockData.adams.constants.teamName)
                .replace(':teamSourceSystemId', mockData.adams.constants.teamSourceSystemId);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get market mapping data', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.vendorAndListMarkets;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get market mapping data and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.vendorAndListMarkets;
        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get market mapping data and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.vendorAndListMarkets;
        return request(app)
            .get(url)
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

    it('should get child markets', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.marketMappingChildren
                .replace(':marketName', mockData.adams.constants.marketName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get child markets and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.marketMappingChildren
                .replace(':marketName', mockData.adams.constants.marketName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get child markets and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.marketMappingChildren
                .replace(':marketName', mockData.adams.constants.marketName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should add markets mapping to vendor', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.addMarketMapping
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':marketName', mockData.adams.constants.marketName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to add markets mapping to vendor and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.addMarketMapping
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':marketName', mockData.adams.constants.marketName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to add markets mapping to vendor and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.addMarketMapping
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':marketName', mockData.adams.constants.marketName);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get vendor details', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.vendorDetails;

        return request(app)
            .get(url)
            .query({
                vendorNumber: mockData.adams.constants.vendorNumber,
                sourceSystemId: mockData.adams.constants.vendorSourceSystemId
            })
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get vendor details and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.vendorDetails;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get vendor details and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.vendorDetails;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should patch vendor details', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.vendorDetails;

        return request(app)
            .patch(url)
            .query({
                vendorNumber: mockData.adams.constants.vendorNumber,
                sourceSystemId: mockData.adams.constants.vendorSourceSystemId
            })
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to patch vendor details and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.vendorDetails;

        return request(app)
            .patch(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to patch vendor details and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.vendorDetails;

        return request(app)
            .patch(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should perform vendor search', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.vendorSearchData;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to perform vendor search and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.vendorSearchData;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to perform vendor search and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.vendorSearchData;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get vendor cost center data', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.vendorCostCenters
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get vendor cost center data and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.vendorCostCenters
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get vendor cost center data and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.vendorCostCenters
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should update vendor cost center data', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateVendorCostCenter
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':costCenterName', mockData.adams.constants.costCenterName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to update vendor cost center data and handle failure', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateVendorCostCenter
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':costCenterName', mockData.adams.constants.costCenterName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to update vendor cost center data and handle failure - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.updateVendorCostCenter
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':costCenterName', mockData.adams.constants.costCenterName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get vendor cost center history', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.vendorCostCenterHistory
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':costCenterName', mockData.adams.constants.costCenterName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get vendor cost center history and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.vendorCostCenterHistory
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':costCenterName', mockData.adams.constants.costCenterName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get vendor cost center history and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.vendorCostCenterHistory
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':costCenterName', mockData.adams.constants.costCenterName);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get cost centers eligible for vendor mapping', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.eligibleVendorCostCenter
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get cost centers eligible for vendor mapping and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.eligibleVendorCostCenter
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get cost centers eligible for vendor mapping and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.eligibleVendorCostCenter
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should map cost centers to vendor', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.addEligibleCostCenters
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to map cost centers to vendor and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.addEligibleCostCenters
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to map cost centers to vendor and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.addEligibleCostCenters
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get vendor contacts', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.vendorContacts
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get get vendor contacts and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.vendorContacts
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get get vendor contacts and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.vendorContacts
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should delete vendor contact', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteVendorContact
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':vendorContactId', mockData.adams.constants.vendorContactId);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to delete vendor contact and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteVendorContact
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':vendorContactId', mockData.adams.constants.vendorContactId);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to delete vendor contact and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.deleteVendorContact
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':vendorContactId', mockData.adams.constants.vendorContactId);

        return request(app)
            .delete(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should add vendor contact', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.addContactInfo
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to add vendor contact and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.addContactInfo
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to add vendor contact and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.addContactInfo
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should update vendor contact', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateContactInfo
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':vendorContactId', mockData.adams.constants.vendorContactId);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to update vendor contact and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateContactInfo
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':vendorContactId', mockData.adams.constants.vendorContactId);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to update vendor contact and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.updateContactInfo
                .replace(':vendorNumber', mockData.adams.constants.vendorNumber)
                .replace(':vendorContactId', mockData.adams.constants.vendorContactId);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

});

