/**
 * Created by ChouhR01 on 08/09/2017.
 */
var express = require('express'),
    log4js = require('log4js'),
    logger = log4js.getLogger('server'),
    urlSpace = require('../url-space'),
    utils = require('../utils');


var locationRoutes = function (config, stgAuth) {

    // Declare router
    var locationRoutes = express.Router();

    // location routes

    // get location search data
    locationRoutes.route(urlSpace.urls.local.getLocationsByUser)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                appName = req.query.appName,
                roleName = req.query.roleName,
                search = req.query.locationsSearchInput,
                url = config.urls.adams + urlSpace.urls.adams.getLocationsByUser.replace('{limit}', limit).replace('{page}', page).replace('{search}', search).replace('{sorts}', sorts).replace('{appName}', appName).replace('{roleName}', roleName),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error performing search on location data', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Add Locations
    locationRoutes.route(urlSpace.urls.local.addLocation)
        .post(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addLocation,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Get location details By location Code
    locationRoutes.route(urlSpace.urls.local.getLocationDetailsByLocationCode)
        .get(function (req, res) {
            var locationCode = req.params.location_code,
                url = config.urls.adams + urlSpace.urls.adams.getLocationDetailsByLocationCode.replace('{locationCode}', locationCode),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error getting location details', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Update location details By Location Code
    locationRoutes.route(urlSpace.urls.local.updateLocationDetailsByLocationCode)
        .put(function (req, res) {
            var body = req.body,
                locationCode = req.params.location_code,
                url = config.urls.adams + urlSpace.urls.adams.updateLocationDetailsByLocationCode.replace('{locationCode}', locationCode),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('update locations error ', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Get Cost centers for a location By user name
    locationRoutes.route(urlSpace.urls.local.getCostCentersByUserName)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                appName = req.query.appName,
                roleName = req.query.roleName,
                costCenterSearchInput = req.query.costCenterSearchInput,
                url = config.urls.adams + urlSpace.urls.adams.getCostCentersByUserName
                    .replace('{limit}', limit).replace('{page}', page).replace('{search}', costCenterSearchInput)
                    .replace('{sorts}', sorts).replace('{appName}', appName).replace('{roleName}', roleName),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v2;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error getting available cost centers for location mapping based on user access', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Get Cost centers for a location By location Code
    locationRoutes.route(urlSpace.urls.local.getCostCentersByLocationCode)
        .get(function (req, res) {
            var locationCode = req.params.location_code,
                limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                costCenterSearchInput = req.query.costCenterSearchInput,
                url = config.urls.adams + urlSpace.urls.adams.getCostCentersByLocationCode
                    .replace('{limit}', limit).replace('{page}', page).replace('{search}', costCenterSearchInput)
                    .replace('{sorts}', sorts).replace('{locationCode}', locationCode),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error getting cost centers mapped to location', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Add Cost centers for a location By location Code
    locationRoutes.route(urlSpace.urls.local.addCostCentersByLocationCode)
        .post(function (req, res) {
            var body = req.body,
                locationCode = req.params.location_code,
                url = config.urls.adams + urlSpace.urls.adams.addCostCentersByLocationCode.replace('{locationCode}', locationCode),
                accept = urlSpace.headers.adams.accept.v1,
                token = stgAuth.getTokenFromHeader(req),
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Update Cost centers for a location By location and cost center name
    locationRoutes.route(urlSpace.urls.local.updateCostCentersByLocationAndCostCenterName)
        .put(function (req, res) {
            var body = req.body,
                locationCode = req.params.location_code,
                costCenterName = req.params.cost_center_name,
                sourceSystemId = req.query.sourceSystemId,
                url = config.urls.adams + urlSpace.urls.adams.updateCostCentersByLocationAndCostCenterName.replace('{locationCode}', locationCode).replace('{costCenterName}', costCenterName).replace('{sourceSystemId}', sourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('Update Cost centers for a location By location and cost center name error ', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Get Stations
    locationRoutes.route(urlSpace.urls.local.getStations)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                search = req.query.stationsSearchInput,
                url = config.urls.adams + urlSpace.urls.adams.getStations.replace('{limit}', limit).replace('{page}', page).replace('{search}', search).replace('{sorts}', sorts),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error getting stations', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Get Stations By location Code
    locationRoutes.route(urlSpace.urls.local.getStationsByLocationCode)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                search = req.query.stationsSearchInput,
                locationCode = req.params.location_code,
                url = config.urls.adams + urlSpace.urls.adams.getStationsByLocationCode.replace('{locationCode}', locationCode).replace('{limit}', limit).replace('{page}', page).replace('{search}', search).replace('{sorts}', sorts),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error getting stations mapped to location', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Add Stations By location Code
    locationRoutes.route(urlSpace.urls.local.addStationsByLocationCode)
        .post(function (req, res) {
            var body = req.body,
                locationCode = req.params.location_code,
                url = config.urls.adams + urlSpace.urls.adams.addStationsByLocationCode.replace('{locationCode}', locationCode),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Get Station By location and station code
    locationRoutes.route(urlSpace.urls.local.stationsByLocationAndStationCode)
        .get(function (req, res) {
            var locationCode = req.params.location_code,
                stationCode = req.params.station_code,
                costCenterName = req.query.cost_center_name,
                sourceSystemId = req.query.source_system_id,
                url = config.urls.adams + urlSpace.urls.adams.stationsByLocationAndStationCode.replace('{locationCode}', locationCode).replace('{stationCode}', stationCode)
                    .replace('{costCenterName}', costCenterName).replace('{sourceSystemId}', sourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error getting station for location', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Update Station By location and station Name
    locationRoutes.route(urlSpace.urls.local.stationsByLocationAndStationCode)
        .put(function (req, res) {
            var body = req.body,
                locationCode = req.params.location_code,
                stationCode = req.params.station_code,
                costCenterName = req.query.cost_center_name,
                sourceSystemId = req.query.source_system_id,
                url = config.urls.adams + urlSpace.urls.adams.stationsByLocationAndStationCode.replace('{locationCode}', locationCode).replace('{stationCode}', stationCode)
                    .replace('{costCenterName}', costCenterName).replace('{sourceSystemId}', sourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('Update Station By location and station Name error ', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Get Cost Centers By location and station Name for a station
    locationRoutes.route(urlSpace.urls.local.getCostCentersByLocationAndStationCode)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                locationCode = req.params.location_code,
                stationName = req.params.station_name,
                costCenterSearchInput = req.query.costCenterSearchInput,
                url = config.urls.adams + urlSpace.urls.adams.getCostCentersByLocationAndStationCode.replace('{locationCode}', locationCode).replace('{stationName}', stationName).replace('{limit}', limit).replace('{page}', page).replace('{costCenterSearchInput}', costCenterSearchInput).replace('{sorts}', sorts),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error getting cost centers by location code and station code', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Add Cost Centers By location and station Name for a station
    locationRoutes.route(urlSpace.urls.local.addCostCentersByLocationAndStationCode)
        .post(function (req, res) {
            var locationCode = req.params.location_code,
                stationName = req.params.station_name,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addCostCentersByLocationAndStationCode.replace('{locationCode}', locationCode).replace('{stationName}', stationName),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Update station's cost center By cost center name, location name and station Name
    locationRoutes.route(urlSpace.urls.local.updateStationsCostCenter)
        .put(function (req, res) {
            var locationCode = req.params.location_code,
                stationName = req.params.station_name,
                costCenterName = req.params.cost_center_name,
                sourceSystemId = req.query.sourceSystemId,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.updateStationsCostCenter.replace('{locationCode}', locationCode).replace('{stationName}', stationName).replace('{costCenterName}', costCenterName).replace('{sourceSystemId}', sourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('Update station\'s cost center By cost center name, location name and station Name error ', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    return locationRoutes;
};

module.exports = locationRoutes;