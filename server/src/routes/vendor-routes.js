/**
 * Created by ChouhR01 on 10/24/2016.
 */

var express = require('express'),
    log4js = require('log4js'),
    logger = log4js.getLogger('server'),
    urlSpace = require('../url-space'),
    utils = require('../utils');


var vendorRoutes = function (config, stgAuth) {

    // Declare router
    var vendorRoutes = express.Router();

    // vendor link routes

    // delete vendor teams
    vendorRoutes.route(urlSpace.urls.local.deleteVendorsTeam)
        .delete(function (req, res) {
            var vendorNumber = req.params.vendorNumber,
                teamName = req.params.teamName,
                marketName = req.params.marketName,
                vendorSourceSystemId = req.params.vendorSourceSystemId,
                teamSourceSystemId = req.params.teamSourceSystemId,
                url = config.urls.adams + urlSpace.urls.adams.deleteVendorsTeam.replace('{vendorNumber}', vendorNumber).replace('{marketName}', marketName).replace('{teamName}', teamName).replace('{vendorSourceSystemId}', vendorSourceSystemId).replace('{teamSourceSystemId}', teamSourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'DELETE')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting vendor teams', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get Market Mapping Data List
    vendorRoutes.route(urlSpace.urls.local.vendorAndListMarkets)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                marketName = req.query.marketName,
                teamName = req.query.teamName,
                sorts = req.query.sorts,
                vendorNumber = req.query.vendorNumber,
                url = config.urls.adams + urlSpace.urls.adams.vendorAndListMarkets.replace('{limit}', limit).replace('{page}', page).replace('{vendor_number}', vendorNumber).replace('{marketName}', marketName).replace('{teamName}', teamName).replace('{sorts}', sorts),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting market mapping data', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get Market Mapping Root Hierarchy Data
    vendorRoutes.route(urlSpace.urls.local.marketMappingRoot)
        .get(function (req, res) {
            var url = config.urls.adams + urlSpace.urls.adams.marketMappingRoot,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting root market', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get Market Mapping Children Hierarchy Data
    vendorRoutes.route(urlSpace.urls.local.marketMappingChildren)
        .get(function (req, res) {
            var marketName = req.params.marketName,
                url = config.urls.adams + urlSpace.urls.adams.marketMappingChildren.replace('{marketName}', marketName),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting child markets', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Add Market Mapping Data List
    vendorRoutes.route(urlSpace.urls.local.addMarketMapping)
        .post(function (req, res) {

            var vendorNumber = req.params.vendorNumber,
                marketName = req.params.marketName,
                vendorSourceSystemId = req.query.vendorSourceSystemId,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addMarketMapping.replace('{vendorNumber}', vendorNumber).replace('{marketName}', marketName).replace('{vendorSourceSystemId}', vendorSourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('add market mapping route error', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get vendor Details data
    vendorRoutes.route(urlSpace.urls.local.vendorDetails)
        .get(function (req, res) {

            var vendorNumber = req.query.vendorNumber,
                sourceSystemId = req.query.sourceSystemId,
                url = config.urls.adams + urlSpace.urls.adams.vendorDetails.replace('{vendor_number}', vendorNumber).replace('{sourceSystemId}', sourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting vendor details', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        })
        .patch(function (req, res) {
            var vendorNumber = req.query.vendorNumber,
                sourceSystemId = req.query.sourceSystemId,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.vendorDetails.replace('{vendor_number}', vendorNumber).replace('{sourceSystemId}', sourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PATCH', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error patching vendor details', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        })
    ;

    // get vendor search data
    vendorRoutes.route(urlSpace.urls.local.vendorSearchData)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                vendorSearchInput = req.query.vendorSearchInput,
                url = config.urls.adams + urlSpace.urls.adams.vendorSearchData.replace('{limit}', limit).replace('{page}', page).replace('{vendorSearchInput}', vendorSearchInput).replace('{sorts}', sorts),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v2;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error performing vendor search', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get vendor cost center data
    vendorRoutes.route(urlSpace.urls.local.vendorCostCenters)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                vendorNumber = req.query.vendorNumber,
                costCenterSearchInput = req.query.costCenterSearchInput,
                url = config.urls.adams + urlSpace.urls.adams.vendorCostCenters.replace('{limit}', limit).replace('{page}', page).replace('{vendorNumber}', vendorNumber).replace('{costCenterSearchInput}', costCenterSearchInput).replace('{sorts}', sorts),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting vendor cost center data', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Update vendor cost center
    vendorRoutes.route(urlSpace.urls.local.updateVendorCostCenter)
        .put(function (req, res) {
            var body = req.body,
                vendorSourceSystemId = req.query.vendorSourceSystemId,
                costCenterSourceSystemId = req.query.costCenterSourceSystemId,
                vendorNumber = req.params.vendorNumber,
                costCenterName = req.params.costCenterName,
                url = config.urls.adams + urlSpace.urls.adams.updateVendorCostCenter.replace('{vendor_number}', vendorNumber).replace('{cost_center_name}', costCenterName).replace('{vendorSourceSystemId}', vendorSourceSystemId).replace('{costCenterSourceSystemId}', costCenterSourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('update vendor cost center error ', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get cost center mapping history data
    vendorRoutes.route(urlSpace.urls.local.vendorCostCenterHistory)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                vendorNumber = req.params.vendorNumber,
                costCenterName = req.params.costCenterName,
                vendorSourceSystemId = req.query.vendorSourceSystemId,
                costCenterSourceSystemId = req.query.costCenterSourceSystemId,
                costCenterMappingHistorySearchInput = req.query.costCenterMappingHistorySearchInput,
                url = config.urls.adams + urlSpace.urls.adams.vendorCostCenterHistory.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{vendor_number}', vendorNumber).replace('{cost_center_name}', costCenterName).replace('{vendorSourceSystemId}', vendorSourceSystemId).replace('{costCenterSourceSystemId}', costCenterSourceSystemId).replace('{costCenterMappingHistorySearchInput}', costCenterMappingHistorySearchInput),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting vendor cost center mapping history', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get eligible cost center data
    vendorRoutes.route(urlSpace.urls.local.eligibleVendorCostCenter)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                vendorNumber = req.params.vendorNumber,
                vendorSourceSystemId = req.query.vendorSourceSystemId,
                eligibleCostCenterSearchInput = req.query.eligibleCostCenterSearchInput,
                url = config.urls.adams + urlSpace.urls.adams.eligibleVendorCostCenter.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{vendor_number}', vendorNumber).replace('{vendorSourceSystemId}', vendorSourceSystemId).replace('{eligibleCostCenterSearchInput}', eligibleCostCenterSearchInput),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting eligible cost center data', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // add eligible cost center data
    vendorRoutes.route(urlSpace.urls.local.addEligibleCostCenters)
        .post(function (req, res) {

            var vendorNumber = req.params.vendorNumber,
                vendorSourceSystemId = req.query.vendorSourceSystemId,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addEligibleCostCenters.replace('{vendor_number}', vendorNumber).replace('{vendorSourceSystemId}', vendorSourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('add cost center mapping route error', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });



    // get vendor contacts
    vendorRoutes.route(urlSpace.urls.local.vendorContacts)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                vendorNumber = req.params.vendorNumber,
                vendorSourceSystemId = req.query.vendorSourceSystemId,
                contactSearchInput = req.query.contactSearchInput,
                url = config.urls.adams + urlSpace.urls.adams.vendorContacts.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{vendor_number}', vendorNumber).replace('{vendorSourceSystemId}', vendorSourceSystemId).replace('{contactSearchInput}', contactSearchInput),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting vendor contacts', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });


    // delete vendor contact
    vendorRoutes.route(urlSpace.urls.local.deleteVendorContact)
        .delete(function (req, res) {
            var vendorNumber = req.params.vendorNumber,
                vendorContactId = req.params.vendorContactId,
                vendorSourceSystemId = req.query.vendorSourceSystemId,
                url = config.urls.adams + urlSpace.urls.adams.deleteVendorContact.replace('{vendorNumber}', vendorNumber).replace('{vendorContactId}', vendorContactId).replace('{vendorSourceSystemId}', vendorSourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'DELETE')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error deleting vendor contact', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });


    // add vendor contact
    vendorRoutes.route(urlSpace.urls.local.addContactInfo)
        .post(function (req, res) {
            var vendorNumber = req.params.vendorNumber,
                vendorSourceSystemId = req.query.vendorSourceSystemId,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addContactInfo.replace('{vendorNumber}', vendorNumber).replace('{vendorSourceSystemId}', vendorSourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('add contact info route error', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });


    // Update vendor coontact
    vendorRoutes.route(urlSpace.urls.local.updateContactInfo)
        .put(function (req, res) {
            var body = req.body,
                vendorSourceSystemId = req.query.vendorSourceSystemId,
                vendorNumber = req.params.vendorNumber,
                vendorContactId = req.params.vendorContactId,
                url = config.urls.adams + urlSpace.urls.adams.updateContactInfo.replace('{vendorNumber}', vendorNumber).replace('{vendorContactId}', vendorContactId).replace('{vendorSourceSystemId}', vendorSourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('update vendor contact info error ', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });


    return vendorRoutes;
};

module.exports = vendorRoutes;