var express = require('express'),
    urlSpace = require('../url-space'),
    log4js = require('log4js'),
    utils = require('../utils');

var userAdminRoutes = function (config, stgAuth) {
    //declare router
    var userAdminRouter = express.Router();

    var logger = log4js.getLogger('server');

    // get user data
    userAdminRouter.route(urlSpace.urls.local.userDetails)
        .get(function(req, res) {

            var limit = req.query.limit,
                page = req.query.page,
                appName = req.query.appName,
                roleName = req.query.roleName,
                sorts = req.query.sorts,
                search = req.query.search,
                url = config.urls.adams + urlSpace.urls.adams.userDetails.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{search}', search).replace('{appName}', appName).replace('{roleName}', roleName),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v2;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('all user details route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get applications assigned to user
    userAdminRouter.route(urlSpace.urls.local.applicationsByUser)
        .get(function(req, res) {

            var userName = req.params.userName,
                url = config.urls.adams + urlSpace.urls.adams.applicationsByUser.replace('{userName}', userName),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('applications by user route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });


    // get user history
    userAdminRouter.route(urlSpace.urls.local.userHistory)
        .get(function(req, res) {

            var userName = req.params.userName,
                limit = req.query.limit,
                page = req.query.page,
                sorts = req.query.sorts,
                fields = req.query.fields,
                search = req.query.search,
                url = config.urls.adams + urlSpace.urls.adams.userHistory.replace('{userName}', userName).replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{fields}', fields).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;



            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('applications by user route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get roles assigned to Login user by application
    userAdminRouter.route(urlSpace.urls.local.rolesByLoginUser)
        .get(function(req, res) {

            var application = req.params.application,
                url = config.urls.adams + urlSpace.urls.adams.rolesByLoginUser.replace('{application}', application),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('roles by login user route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get roles assigned to user by application
    userAdminRouter.route(urlSpace.urls.local.rolesByUser)
        .get(function(req, res) {

            var userName = req.params.userName,
                application = req.params.application,
                url = config.urls.adams + urlSpace.urls.adams.rolesByUser.replace('{userName}', userName).replace('{application}', application),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('roles by user route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get teams assigned to user by application & roles
    userAdminRouter.route(urlSpace.urls.local.teamsByUser)
        .get(function(req, res) {

            var userName = req.params.userName,
                application = req.params.application,
                role = req.params.role,
                url = config.urls.adams + urlSpace.urls.adams.teamsByUser.replace('{userName}', userName).replace('{application}', application).replace('{role}', role),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('teams by user route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // update role
    userAdminRouter.route(urlSpace.urls.local.updateRole)
        .put(function(req, res) {

            var userName = req.params.userName,
                application = req.params.application,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.updateRole.replace('{userName}', userName).replace('{application}', application),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType).then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('update role route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // cnange default role
    userAdminRouter.route(urlSpace.urls.local.changeDefaultRole)
        .put(function(req, res) {

            var userName = req.params.userName,
                application = req.params.application,
                role = req.params.role,
                url = config.urls.adams + urlSpace.urls.adams.modifyRole.replace('{userName}', userName).replace('{application}', application).replace('{role}', role),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('update default role route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // cnange default team
    userAdminRouter.route(urlSpace.urls.local.changeDefaultTeam)
        .put(function(req, res) {

            var userName = req.params.userName,
                application = req.params.application,
                role = req.params.role,
                team = req.params.team,
                sourceSystemID = req.params.sourcesystemid,
                url = config.urls.adams + urlSpace.urls.adams.modifyTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role).replace('{teamname}', team).replace('{sourcesystemid}', sourceSystemID),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('update default team route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // delete apps
    userAdminRouter.route(urlSpace.urls.local.deleteApp)
        .delete(function(req, res) {

            var userName = req.params.userName,
                application = req.params.application,
                url = config.urls.adams + urlSpace.urls.adams.deleteApp.replace('{userName}', userName).replace('{application}', application),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'DELETE').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('delete apps route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // delete roles
    userAdminRouter.route(urlSpace.urls.local.deleteRole)
        .delete(function(req, res) {

            var userName = req.params.userName,
                application = req.params.application,
                role = req.params.role,
                url = config.urls.adams + urlSpace.urls.adams.modifyRole.replace('{userName}', userName).replace('{application}', application).replace('{role}', role),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'DELETE').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('delete roles route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // delete teams
    userAdminRouter.route(urlSpace.urls.local.deleteTeam)
        .delete(function(req, res) {

            var userName = req.params.userName,
                application = req.params.application,
                role = req.params.role,
                team = req.params.team,
                sourceSystemID = req.params.sourcesystemid,
                url = config.urls.adams + urlSpace.urls.adams.modifyTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role).replace('{teamname}', team).replace('{sourcesystemid}', sourceSystemID),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'DELETE').then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('delete team route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // add teams
    userAdminRouter.route(urlSpace.urls.local.addTeam)
        .post(function(req, res) {

            var userName = req.params.userName,
                application = req.params.application,
                role = req.params.role,
                body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType).then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('add team route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // get teams
    userAdminRouter.route(urlSpace.urls.local.costCenterByLoginUser)
        .get(function(req, res) {

            var limit = req.query.limit,
                page = req.query.page,
                application = req.params.application,
                role = req.params.role,
                sort = req.query.sort,
                searchTeamName = req.query.searchTeamName,
                searchTeamDescription = req.query.searchTeamDescription,
                searchTeamType = req.query.searchTeamType,
                url = config.urls.adams + urlSpace.urls.adams.costCenterByLoginUser.replace('{application}', application).replace('{role}', role).replace('{limit}', limit).replace('{page}', page).replace('{searchTeamName}', searchTeamName).replace('{searchTeamDescription}', searchTeamDescription).replace('{searchTeamType}', searchTeamType).replace('{sorts}', sort),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET', null, contentType).then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('get hierarchical teams route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });

        });

    userAdminRouter.route(urlSpace.urls.local.secApplication)
        .get(function(req, res) {

            var limit = req.query.limit,
                page = req.query.page,
                url = config.urls.adams + urlSpace.urls.adams.secApplication.replace('{limit}', limit).replace('{page}', page),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET', null, contentType).then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('get select application optionss route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });

        });

    userAdminRouter.route(urlSpace.urls.local.secRole)
        .get(function(req, res) {

            var limit = req.query.limit,
                page = req.query.page,
                application_name = req.query.application_name,
                url,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            if (application_name) {
                url = config.urls.adams + urlSpace.urls.adams.secRole.replace('{limit}', limit).replace('{page}', page).replace('{application_name}', application_name);

            } else {
                url = config.urls.adams + urlSpace.urls.adams.secRole_no_application.replace('{limit}', limit).replace('{page}', page);

            }

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET', null, contentType).then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('get select role options route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });

        });


    userAdminRouter.route(urlSpace.urls.local.secObjects)
        .get(function(req, res) {

            var limit = req.query.limit,
                page = req.query.page,
                application_name = req.query.application_name,
                role_name = req.query.role_name,
                url,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            if (application_name) {
                url = config.urls.adams + urlSpace.urls.adams.secObjects.replace('{limit}', limit).replace('{page}', page).replace('{application_name}', application_name).replace('{role_name}', role_name);

            }

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET', null, contentType).then(function(data){
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
            }, function(error){
                logger.info('get select role options route error', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });

        });



    return userAdminRouter;
};


module.exports = userAdminRoutes;