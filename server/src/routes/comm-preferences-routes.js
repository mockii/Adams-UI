var express = require('express'),
    urlSpace = require('../url-space'),
    log4js = require('log4js'),
    utils = require('../utils');

var commPreferencesRoutes = function (config, stgAuth) {
    //declare router
    var commPreferencesRouter = express.Router();

    var logger = log4js.getLogger('server');

    // get Communication Preferences
    commPreferencesRouter.route(urlSpace.urls.local.commPreferences)
        .get(function (req, res) {
            var userName = req.params.userName,
                url = config.urls.adams + urlSpace.urls.adams.commPreferences.replace('{userName}', userName),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function (error) {
                logger.info('get communication preferences route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // add Communication Preferences
    commPreferencesRouter.route(urlSpace.urls.local.commPreferences)
        .post(function (req, res) {
            var userName = req.params.userName,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.commPreferences.replace('{userName}', userName),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType).then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function (error) {
                logger.info('add communication preferences route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // update Communication Preferences
    commPreferencesRouter.route(urlSpace.urls.local.updateCommPreferences)
        .put(function (req, res) {
            var userName = req.params.userName,
                communicationPreferencesCode = req.params.communicationPreferencesCode,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.updateCommPreferences.replace('{userName}', userName).replace('{communicationPreferencesCode}', communicationPreferencesCode),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType).then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function (error) {
                logger.info('update communication preferences route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    return commPreferencesRouter;
};


module.exports = commPreferencesRoutes;