var express = require('express'),
    log4js = require('log4js'),
    logger = log4js.getLogger('server'),
    urlSpace = require('../url-space'),
    utils = require('../utils');

var posRoutes = function (config, stgAuth) {

    // Declare router
    var posRoutes = express.Router();

    /* Get POS Items */

    posRoutes.route(urlSpace.urls.local.getPosItems)
        .get(function (req, res) {

            var limit = req.query.limit,
                page = req.query.page,
                search = req.query.search,
                sorts = req.query.sorts,
                url = config.urls.adams + urlSpace.urls.adams.getPosItems.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;


            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
                logger.info('get pos items route response - ', data);
            }, function (error) {
                logger.info('get pos items route error - ', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });

        });

    /* Get a POS Item */

    posRoutes.route(urlSpace.urls.local.getPosItem)
        .get(function (req, res) {

            var posId = req.params.pos_id,
                url = config.urls.adams + urlSpace.urls.adams.getPosItem.replace('{pos_id}', posId),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;


            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
                logger.info('get pos item route response - ', data);
            }, function (error) {
                logger.info('get pos item route error - ', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });

        });

    /* Add POS Item */

    posRoutes.route(urlSpace.urls.local.addPosItem)
        .post(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addPosItem,
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

    posRoutes.route(urlSpace.urls.local.savePosItem)
        .put(function (req, res) {
            var body = req.body,
                posItemCode = req.params.pos_id,
                url = config.urls.adams + urlSpace.urls.adams.savePosItem.replace('{pos_id}', posItemCode),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });
        });

    /* Get POS Tags */

    posRoutes.route(urlSpace.urls.local.getPosTags)
        .get(function (req, res) {

            var url = config.urls.adams + urlSpace.urls.adams.getPosTags,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;


            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
                logger.info('get pos tags route response - ', data);
            }, function (error) {
                logger.info('get pos tags route error - ', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });

        });

    /* Get POS Tags */

    posRoutes.route(urlSpace.urls.local.getPosUnitsOfMeasure)
        .get(function (req, res) {

            var url = config.urls.adams + urlSpace.urls.adams.getPosUnitsOfMeasure,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;


            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
                logger.info('get pos tags route response - ', data);
            }, function (error) {
                logger.info('get pos tags route error - ', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });


    /* Get System Categories */

    posRoutes.route(urlSpace.urls.local.getTypeDetailsForSystemCategoryAndVendor)
        .get(function (req, res) {
            var systemCategoryName = req.params.system_category,
                vendorName = req.params.vendor_name,
                typeName = req.params.type,
                limit = req.query.limit,
                page = req.query.page,
                search = req.query.search,
                sorts = req.query.sorts,
                url = config.urls.adams + urlSpace.urls.adams.getTypeDetailsForSystemCategoryAndVendor
                    .replace('{system_category_name}', systemCategoryName).replace('{vendor_name}', vendorName).replace('{type_name}', typeName)
                    .replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
                logger.info('get pos type details route response - ', data);
            }, function (error) {
                logger.info('get pos type details route error - ', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });

        });

    /* Add System Categories */

    posRoutes.route(urlSpace.urls.local.addTypeDetailsForSystemCategoryAndVendor)
        .get(function (req, res) {
            var body = req.body,
                systemCategoryName = req.params.system_category,
                vendorName = req.params.vendor_name,
                typeName = req.params.type,
                url = config.urls.adams + urlSpace.urls.adams.getTypeDetailsForSystemCategoryAndVendor
                    .replace('{system_category_name}', systemCategoryName).replace('{vendor_name}', vendorName).replace('{type_name}', typeName),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType).then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
                logger.info('get pos type details route response - ', data);
            }, function (error) {
                logger.info('get pos type details route error - ', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });

        });

    // POS Revenue Categories

    /*Get POS Revenue Categories*/
    posRoutes.route(urlSpace.urls.local.getPosRevenueCategories)
        .get(function(req, res) {

            var limit = req.query.limit,
                page = req.query.page,
                search = req.query.search,
                sorts = req.query.sorts,
                url = config.urls.adams + urlSpace.urls.adams.getPosRevenueCategories.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;


              utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.send(data);
                  logger.info('get pos revenue categories route response - ', data);
              }, function (error) {
                  logger.info('get pos revenue categories route error - ', error);
                  var status = (error.http_status) ? error.http_status : 500;
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.status(status).send(error);
              });


        });

    /* Add POS Revenue Category*/
    posRoutes.route(urlSpace.urls.local.addPosRevenueCategory)
        .post(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addPosRevenueCategory,
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

    /* Update POS Revenue Category*/
    posRoutes.route(urlSpace.urls.local.updatePosRevenueCategory)
        .put(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.updatePosRevenueCategory.replace('{revenue_category_code}', body.revenue_category_code),
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


    // POS Item Category

    /* Get POS Item Categories*/
    posRoutes.route(urlSpace.urls.local.getPosItemCategories)
        .get(function(req, res) {

            var limit = req.query.limit,
                page = req.query.page,
                search = req.query.search,
                sorts = req.query.sorts,
                url = config.urls.adams + urlSpace.urls.adams.getPosItemCategories.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;


              utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.send(data);
                  logger.info('get POS Item Categories route response - ', data);
              }, function (error) {
                  logger.info('get POS Item Categories route error - ', error);
                  var status = (error.http_status) ? error.http_status : 500;
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.status(status).send(error);
              });

        });

    /* Add POS Item Category*/
    posRoutes.route(urlSpace.urls.local.addPosItemCategory)
        .post(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addPosItemCategory,
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

            /*res.send('true');*/
        });

    /* Update POS Item Category*/
    posRoutes.route(urlSpace.urls.local.updatePosItemCategory)
        .put(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.updatePosItemCategory.replace('{item_category_code}', body.item_category_code),
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

            /*res.send('true');*/
        });

    // POS Item Classes

    /* Get POS Item Classes*/
    posRoutes.route(urlSpace.urls.local.getPosItemClasses)
        .get(function(req, res) {

            var limit = req.query.limit,
                page = req.query.page,
                search = req.query.search,
                sorts = req.query.sorts,
                url = config.urls.adams + urlSpace.urls.adams.getPosItemClasses.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

              utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.send(data);
                  logger.info('get POS Item Classes route response - ', data);
              }, function (error) {
                  logger.info('get POS Item Classes route error - ', error);
                  var status = (error.http_status) ? error.http_status : 500;
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.status(status).send(error);
              });

        });

    /* Add POS Item Classes*/
    posRoutes.route(urlSpace.urls.local.addPosItemClass)
        .post(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addPosItemClass,
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

            /*res.send('true');*/
        });

    /* Update POS Item Classes*/
    posRoutes.route(urlSpace.urls.local.updatePosItemClass)
        .put(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.updatePosItemClass.replace('{item_class_code}', body.item_class_code),
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

            res.send('true');
        });


    // POS System Categories

    /* Get POS System Categories */
    posRoutes.route(urlSpace.urls.local.getSystemCategories)
        .get(function (req, res) {
            var url = config.urls.adams + urlSpace.urls.adams.getSystemCategories,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
                logger.info('get POS System Categories route response - ', data);
            }, function (error) {
                logger.info('get POS System Categories route error - ', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // POS Vendors

    /* Get POS Vendors */

    posRoutes.route(urlSpace.urls.local.getVendors)
        .get(function (req, res) {
            var url = config.urls.adams + urlSpace.urls.adams.getVendors,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
                logger.info('get POS vendors route response - ', data);
            }, function (error) {
                logger.info('get POS vendors route error - ', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    // POS Vendor Types

    /* Get POS Vendor Types */

    posRoutes.route(urlSpace.urls.local.getTypesForVendor)
        .get(function (req, res) {
            var vendorName = req.params.vendor_name,
                url = config.urls.adams + urlSpace.urls.adams.getTypesForVendor.replace('{vendor_name}', vendorName),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
                logger.info('get POS types route response - ', data);
            }, function (error) {
                logger.info('get POS types route error - ', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });


    //  POS System Category defaults

    /*getTypeDetailsForSystemCategoryDefaultsAndVendor*/

    posRoutes.route(urlSpace.urls.local.getTypeDetailsForSystemCategoryDefaultsAndVendor)
        .get(function (req, res) {
            var itemCategoryCode = 'POSEZXVHLJ'/*req.params.item_category_code*/,
                url = config.urls.adams + urlSpace.urls.adams.getTypeDetailsForSystemCategoryDefaultsAndVendor
                    .replace('{item_category_code}', itemCategoryCode),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.send(data);
                logger.info('get POS types route response - ', data);
            }, function (error) {
                logger.info('get POS types route error - ', error);
                var status = (error.http_status) ? error.http_status : 500;
                res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                res.status(status).send(error);
            });
        });

    /*updateRevenueCategoryDefaults*/

    posRoutes.route(urlSpace.urls.local.updateRevenueCategoryDefaults)
        .put(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.updateRevenueCategoryDefaults
                    .replace('{revenue_category_code}', body.revenue_category_code)
                    .replace('{system_category_name}', body.system_category_name)
                    .replace('{vendor_name}', body.vendor_name)
                    .replace('{vendor_category_type_name}', body.vendor_category_type_name),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('update Revenue Categories error ', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });

            res.send('true');
        });

    /*updateItemCategoryDefaults*/

    posRoutes.route(urlSpace.urls.local.updateItemCategoryDefaults)
        .put(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.updateItemCategoryDefaults
                    .replace('{item_category_code}', body.item_category_code)
                    .replace('{system_category_name}', body.system_category_name)
                    .replace('{vendor_name}', body.vendor_name)
                    .replace('{vendor_category_type_name}', body.vendor_category_type_name),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('update Item Categories error ', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });

            res.send('true');
        });

    return posRoutes;
};

module.exports = posRoutes;