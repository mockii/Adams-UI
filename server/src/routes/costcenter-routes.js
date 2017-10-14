/**
 * Created by ChouhR01 on 10/24/2016.
 */
var express = require('express'),
    log4js = require('log4js'),
    logger = log4js.getLogger('server'),
    urlSpace = require('../url-space'),
    utils = require('../utils');


var costCenterRoutes = function (config, stgAuth) {

    // Declare router
    var costCenterRoutes = express.Router();

    // get costCenter search data
    costCenterRoutes.route(urlSpace.urls.local.costCenters)
        .get(function (req, res) {
            var fields = req.query.fields,
                limit = req.query.limit,
                page = req.query.page,
                costCenterSearchInput = req.query.costCenterSearchInput,
                sort = req.query.sort,
                url = config.urls.adams + urlSpace.urls.adams.costCenters.replace('{fields}', fields).replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sort).replace('{costCenterSearchInput}', costCenterSearchInput),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v2;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function (error) {
                logger.info('get cost center route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get costCenter Details data
    costCenterRoutes.route(urlSpace.urls.local.costCenterDetails)
        .get(function (req, res) {

            var costCenterNumber = req.query.costCenterNumber,
                sourceSystemId = req.query.sourceSystemId,
                url = config.urls.adams + urlSpace.urls.adams.costCenterDetails.replace('{costCenterNumber}', costCenterNumber).replace('{sourceSystemId}', sourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting cost center details', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get Market Mapping Data List
    costCenterRoutes.route(urlSpace.urls.local.costCenterAndListMarkets)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sourceSystemId = req.query.sourceSystemId,
                sorts = req.query.sorts,
                search = req.query.search,
                costCenterNumber = req.query.costCenterNumber,
                url = config.urls.adams + urlSpace.urls.adams.costCenterAndListMarkets.replace('{limit}', limit).replace('{page}', page).replace('{costCenterNumber}', costCenterNumber).replace('{sourceSystemId}', sourceSystemId).replace('{sorts}', sorts).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error get cost center markets mapping data', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get Market Mapping Root Hierarchy Data
    costCenterRoutes.route(urlSpace.urls.local.marketMappingRoot)
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
    costCenterRoutes.route(urlSpace.urls.local.marketMappingChildren)
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
                    logger.info('error getting children for market', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // delete costCenter Markets
    costCenterRoutes.route(urlSpace.urls.local.deleteCostCentersMarkets)
        .delete(function (req, res) {
            var costCenterNumber = req.params.costCenterNumber,
                marketName = req.params.marketName,
                sourceSystemId = req.query.sourceSystemId,
                url = config.urls.adams + urlSpace.urls.adams.deleteCostCentersMarkets.replace('{costCenterNumber}', costCenterNumber).replace('{marketName}', marketName).replace('{sourceSystemId}', sourceSystemId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'DELETE')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error deleting market from cost center', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Add Market Mapping Data List
    costCenterRoutes.route(urlSpace.urls.local.addCostCenterMarketMapping)
        .post(function (req, res) {

            var costCenterNumber = req.params.costCenterNumber,
                body = req.body,
                sourceSystemId = req.query.sourceSystemId,
                url = config.urls.adams + urlSpace.urls.adams.addCostCenterMarketMapping.replace('{costCenterNumber}', costCenterNumber).replace('{sourceSystemId}', sourceSystemId),
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

    // get costcenter vendor data
    costCenterRoutes.route(urlSpace.urls.local.costCenterVendors)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                sourceSystemId = req.query.sourceSystemId,
                costCenterNumber = req.query.costCenterNumber,
                vendorSearchInput = req.query.vendorSearchInput,
                url = config.urls.adams + urlSpace.urls.adams.costCenterVendors.replace('{sourceSystemId}', sourceSystemId).replace('{limit}', limit).replace('{page}', page).replace('{costCenterNumber}', costCenterNumber).replace('{vendorSearchInput}', vendorSearchInput).replace('{sorts}', sorts),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v2;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting vendors mapped to cost center', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // Update vendor cost center
    costCenterRoutes.route(urlSpace.urls.local.updateCostCenterVendor)
        .put(function (req, res) {
            var body = req.body,
                vendorSourceSystemId = req.query.vendorSourceSystemId,
                costCenterSourceSystemId = req.query.costCenterSourceSystemId,
                costCenterNumber = req.params.costCenterNumber,
                vendorNumber = req.params.vendorNumber,
                url = config.urls.adams + urlSpace.urls.adams.updateCostCenterVendor.replace('{costCenterNumber}', costCenterNumber).replace('{vendorNumber}', vendorNumber).replace('{vendorSourceSystemId}', vendorSourceSystemId).replace('{costCenterSourceSystemId}', costCenterSourceSystemId),
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

    // get vendor mapping history data
    costCenterRoutes.route(urlSpace.urls.local.costCenterVendorHistory)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                costCenterNumber = req.params.costCenterNumber,
                vendorNumber = req.params.vendorNumber,
                vendorSourceSystemId = req.query.vendorSourceSystemId,
                costCenterSourceSystemId = req.query.costCenterSourceSystemId,
                vendorMappingHistorySearchInput = req.query.vendorMappingHistorySearchInput,
                url = config.urls.adams + urlSpace.urls.adams.costCenterVendorHistory.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{costCenterNumber}', costCenterNumber).replace('{vendorNumber}', vendorNumber).replace('{vendorSourceSystemId}', vendorSourceSystemId).replace('{costCenterSourceSystemId}', costCenterSourceSystemId).replace('{vendorMappingHistorySearchInput}', vendorMappingHistorySearchInput),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting cost center vendor mapping history', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get eligible cost center data
    costCenterRoutes.route(urlSpace.urls.local.eligibleCostCenterVendor)
        .get(function (req, res) {
            var limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                costCenterNumber = req.params.costCenterNumber,
                costCenterSourceSystemId = req.query.costCenterSourceSystemId,
                eligibleVendorSearchInput = req.query.eligibleVendorSearchInput,
                url = config.urls.adams + urlSpace.urls.adams.eligibleCostCenterVendor.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{costCenterNumber}', costCenterNumber).replace('{costCenterSourceSystemId}', costCenterSourceSystemId).replace('{eligibleVendorSearchInput}', eligibleVendorSearchInput),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function(error){
                    logger.info('error getting eligible cost centers', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // add eligible cost center data
    costCenterRoutes.route(urlSpace.urls.local.addEligibleVendors)
        .post(function (req, res) {

            var costCenterNumber = req.params.costCenterNumber,
                body = req.body,
                costCenterSourceSystemId = req.query.costCenterSourceSystemId,
                url = config.urls.adams + urlSpace.urls.adams.addEligibleVendors.replace('{costCenterNumber}', costCenterNumber).replace('{costCenterSourceSystemId}', costCenterSourceSystemId),
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

    return costCenterRoutes;
};

module.exports = costCenterRoutes;