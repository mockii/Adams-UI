
var express = require('express'),
    log4js = require('log4js'),
    logger = log4js.getLogger('server'),
    urlSpace = require('../url-space'),
    utils = require('../utils'),
    fs = require('fs'),
    envPath = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

var accessControlRoutes = function (config, stgAuth) {

    // Declare router
    var accessControlRoutes = express.Router();

    accessControlRoutes.route(urlSpace.urls.local.secObjectsForApp)
        .get(function(req, res) {

            var appName = req.params.applicationName;

            fs.readFile(__dirname + '/../data/' + envPath + '/access-control/'+ appName +'/securedObjects.json', 'utf8', function (error, data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            });

    });

    accessControlRoutes.route(urlSpace.urls.local.rolesForSecuredObject)
        .get(function(req, res) {

            var appName = req.params.applicationName,
                securedObjectName = req.params.securedObjectName;

            fs.readFile(__dirname + '/../data/' + envPath + '/access-control/'+ appName + '/'+ securedObjectName +'/roles.json', 'utf8', function (error, data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            });

        });

    accessControlRoutes.route(urlSpace.urls.local.overridesForSecuredObject)
        .get(function(req, res) {

            var appName = req.params.applicationName,
                securedObjectName = req.params.securedObjectName;

            fs.readFile(__dirname + '/../data/' + envPath + '/access-control/'+ appName + '/'+ securedObjectName +'/overrides.json', 'utf8', function (error, data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            });

        });

    return accessControlRoutes;
};

module.exports = accessControlRoutes;
