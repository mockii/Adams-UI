/**
 * Created by ChouhR01 on 07/27/2017.
 */
var express = require('express'),
    log4js = require('log4js'),
    logger = log4js.getLogger('server'),
    urlSpace = require('../url-space'),
    utils = require('../utils');


var productsRoutes = function (config, stgAuth) {

    // Declare router
    var productsRoutes = express.Router();

    // get products search data
    productsRoutes.route(urlSpace.urls.local.products)
        .get(function (req, res) {
            var fields = req.query.fields,
                limit = req.query.limit,
                page = req.query.page,
                search = req.query.search,
                sort = req.query.sort,
                url = config.urls.adams + urlSpace.urls.adams.products.replace('{fields}', fields).replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sort).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function (error) {
                logger.info('get products route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get product Details data
    productsRoutes.route(urlSpace.urls.local.productDetails)
        .get(function (req, res) {
            var gtin = req.params.gtin,
                url = config.urls.adams + urlSpace.urls.adams.productDetails.replace('{gtin}', gtin),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error to get product details', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get allergens data
    productsRoutes.route(urlSpace.urls.local.allergens)
        .get(function (req, res) {

            var gtin = req.params.gtin,
                url = config.urls.adams + urlSpace.urls.adams.allergens.replace('{gtin}', gtin),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error to get allergen data for product', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get dietTypes data
    productsRoutes.route(urlSpace.urls.local.dietTypes)
        .get(function (req, res) {

            var gtin = req.params.gtin,
                url = config.urls.adams + urlSpace.urls.adams.dietTypes.replace('{gtin}', gtin),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error getting diet types for product', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get marketing data
    productsRoutes.route(urlSpace.urls.local.marketing)
        .get(function (req, res) {

            var gtin = req.params.gtin,
                url = config.urls.adams + urlSpace.urls.adams.marketing.replace('{gtin}', gtin),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error getting marketing data for product', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });


    // get multimedia data
    productsRoutes.route(urlSpace.urls.local.multimedia)
        .get(function (req, res) {

            var gtin = req.params.gtin,
                url = config.urls.adams + urlSpace.urls.adams.multimedia.replace('{gtin}', gtin),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error get multimedia data for product', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    // get nutrients data
    productsRoutes.route(urlSpace.urls.local.nutrients)
        .get(function (req, res) {

            var gtin = req.params.gtin,
                url = config.urls.adams + urlSpace.urls.adams.nutrients.replace('{gtin}', gtin),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET')
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('error getting nutrient data for product', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    return productsRoutes;
};

module.exports = productsRoutes;