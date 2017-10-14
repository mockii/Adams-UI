var express = require('express'),
    urlSpace = require('../url-space'),
    log4js = require('log4js'),
    utils = require('../utils');

var tempAssociatesRoutes = function (config, stgAuth) {
    //declare router
    var tempAssociatesRouter = express.Router();
    
    var logger = log4js.getLogger('server');
    
    // get temp associate
    tempAssociatesRouter.route(urlSpace.urls.local.tempAssociates)
        .get(function(req, res) {

            var limit = req.query.limit,
                page = req.query.page,
                searchInput = req.query.searchInput,
                sort = req.query.sort,                
                url = config.urls.adams + urlSpace.urls.adams.tempAssociates.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sort).replace('{searchInput}', searchInput),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v2;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('all temp associates route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // add temp associate
    tempAssociatesRouter.route(urlSpace.urls.local.tempAssociates)
        .post(function(req, res) {

            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addTempAssociates,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType).then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('add temp associate info error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // modify temp associate
    tempAssociatesRouter.route(urlSpace.urls.local.modifyTempAssociates)
        .put(function(req, res) {

            var personnelNumber = req.params.personnel_number,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.tempAssociateByPersonalNo.replace('{personnel_number}', personnelNumber),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType).then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('change temp associate info error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get temp associate by personal number
    tempAssociatesRouter.route(urlSpace.urls.local.modifyTempAssociates)
        .get(function(req, res) {

            var personnelNumber = req.params.personnel_number,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.tempAssociateByPersonalNo.replace('{personnel_number}', personnelNumber),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET', body, contentType).then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('change temp associate info error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get temp associate engagements
    tempAssociatesRouter.route(urlSpace.urls.local.tempAssociatesEngagements)
        .get(function(req, res) {

            var personnelNumber = req.params.personnel_number,
                limit = req.query.limit,
                page = req.query.page,
                searchInput = req.query.searchInput,
                sort = req.query.sort,
                url = config.urls.adams + urlSpace.urls.adams.tempAssociatesEngagements.replace('{personnel_number}', personnelNumber).replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sort).replace('{searchInput}', searchInput),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v2;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('temp associate engagements route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get time tracking systems
    tempAssociatesRouter.route(urlSpace.urls.local.timeTrackingSystems)
        .get(function(req, res) {

            var url = config.urls.adams + urlSpace.urls.adams.timeTrackingSystems,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('time tracking systems route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get jobs
    tempAssociatesRouter.route(urlSpace.urls.local.jobs)
        .get(function(req, res) {

            var sourceSystemId = req.query.source_system_id,
                limit = req.query.limit,
                page = req.query.page,
                jobSearchInput = req.query.searchInput,
                sort = req.query.sort,
                fields = req.query.fields,
                url = config.urls.adams + urlSpace.urls.adams.jobs.replace('{source_system_id}', sourceSystemId).replace('{fields}', fields).replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sort).replace('{jobSearchInput}', jobSearchInput),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v2;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('get all jobs route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get vendors
    tempAssociatesRouter.route(urlSpace.urls.local.vendors)
        .get(function(req, res) {

            var fields = req.query.fields,
                url = config.urls.adams + urlSpace.urls.adams.vendors.replace('{fields}', fields),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v2;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('get vendor route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });
    
    return tempAssociatesRouter;
};


module.exports = tempAssociatesRoutes;