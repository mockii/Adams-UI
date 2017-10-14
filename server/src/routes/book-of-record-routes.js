/**
 * Created by BrownB11 on 6/20/2017.
 */

var express = require('express'),
    log4js = require('log4js'),
    logger = log4js.getLogger('server'),
    urlSpace = require('../url-space'),
    utils = require('../utils');

var bookOfRecordRoutes = function (config, stgAuth) {

    // Declare router
    var bookOfRecordRoutes = express.Router();

    bookOfRecordRoutes.route(urlSpace.urls.local.bookOfRecords)
        .get(function(req, res) {

            var userName = req.query.userName,
                appName = req.query.appName,
                roleName = req.query.roleName,
                fields = req.query.fields,
                limit = req.query.limit,
                page = req.query.page,
                search = req.query.search,
                sorts = req.query.sorts,
                url = config.urls.adams + urlSpace.urls.adams.bookOfRecords.replace('{userName}', userName).replace('{appName}', appName).replace('{roleName}', roleName).replace('{fields}', fields).replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
                logger.info('get book of records route response - ', data);
            }, function (error) {
                logger.info('get book of records route error - ', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });

           /* fs.readFile(__dirname + '/../data/' + envPath + '/book-of-record/bookofrecord.json', 'utf8', function (error, data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            });*/

    });

    return bookOfRecordRoutes;
};

module.exports = bookOfRecordRoutes;
