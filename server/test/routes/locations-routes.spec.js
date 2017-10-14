describe('Location Routes', function() {

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
        locationRouter;


    before(function(){
        config = new Config();

        locationRouter = require('../../src/routes/locations-routes')(config, mockData.stgAuth);
        app.use(config.server.rootContext, locationRouter);
    });



    it('should get locations based on user access', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.getLocationsByUser;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get locations based on user access and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.getLocationsByUser;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get locations based on user access and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.getLocationsByUser;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should add location', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.addLocation;

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to add location and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.addLocation;

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to add location and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.addLocation;

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get location details by location code', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.getLocationDetailsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get location details by location code and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.getLocationDetailsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get location details by location code and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.getLocationDetailsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should update location details by location code', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateLocationDetailsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to update location details by location code and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateLocationDetailsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to update location details by location code and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.updateLocationDetailsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get cost centers based on user access', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.getCostCentersByUserName;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get cost centers based on user access and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.getCostCentersByUserName;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get cost centers based on user access and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.getCostCentersByUserName;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get cost centers mapped to a location based on location code', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.getCostCentersByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get cost centers mapped to a location based on location code and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.getCostCentersByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get cost centers mapped to a location based on location code and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.getCostCentersByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should add cost center mapping to location', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.addCostCentersByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to add cost center mapping to location and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.addCostCentersByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to add cost center mapping to location and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.addCostCentersByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should update cost center mapping for location', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateCostCentersByLocationAndCostCenterName
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':cost_center_name', mockData.adams.constants.costCenterName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to update cost center mapping for location and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateCostCentersByLocationAndCostCenterName
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':cost_center_name', mockData.adams.constants.costCenterName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to update cost center mapping for location and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.updateCostCentersByLocationAndCostCenterName
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':cost_center_name', mockData.adams.constants.costCenterName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get stations', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext + urlSpace.urls.local.getStations;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get stations and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext + urlSpace.urls.local.getStations;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get stations and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext + urlSpace.urls.local.getStations;

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get stations for location by location code', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.getStationsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get stations for location by location code and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.getStationsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get stations for location by location code and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.getStationsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should add stations to location', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.addStationsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to add stations to location and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.addStationsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to add stations to location and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.addStationsByLocationCode
                .replace(':location_code', mockData.adams.constants.locationCode);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get station for location', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.stationsByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get station for location and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.stationsByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get station for location and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.stationsByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should update station for location', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.stationsByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to update station for location and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.stationsByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to update station for location and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.stationsByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should get cost center for location and station', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.getCostCentersByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to get cost center for location and station and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.getCostCentersByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to get cost center for location and station and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.getCostCentersByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .get(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should add a cost center to location and station', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.addCostCentersByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to add a cost center to location and station and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.getCostCentersByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to add a cost center to location and station and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.getCostCentersByLocationAndStationCode
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode);

        return request(app)
            .post(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });







    it('should update a cost center for location and station', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).resolves(mockData.adams.api.genericSuccess);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateStationsCostCenter
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode)
                .replace(':cost_center_name', mockData.adams.constants.costCenterName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(200);
            });
    });

    it('should try to update a cost center for location and station and handle failures', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects(mockData.adams.api.genericFailure);

        var url = config.server.rootContext +
            urlSpace.urls.local.updateStationsCostCenter
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode)
                .replace(':cost_center_name', mockData.adams.constants.costCenterName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

    it('should try to update a cost center for location and station and handle failures - v2', function(){
        utils.makeApiCallWithOAuthToken = sinon.stub().usingPromise(Promise).rejects();

        var url = config.server.rootContext +
            urlSpace.urls.local.updateStationsCostCenter
                .replace(':location_code', mockData.adams.constants.locationCode)
                .replace(':station_code', mockData.adams.constants.stationCode)
                .replace(':cost_center_name', mockData.adams.constants.costCenterName);

        return request(app)
            .put(url)
            .then(function(res){
                expect(res.statusCode).to.equal(500);
            });
    });

























});

