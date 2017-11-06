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
            var posItemData =
                {
                    "metadata":
                        {
                            "resultCount": 3,
                            "status": "success",
                            "http_status_code": "200"
                        },
                    "data":
                        [
                            {
                                "pos_id":"1111",
                                "barcode":"3434",
                                "webtrition_master_reference_number": "5465646",
                                "long_name": "Starbucks Capuccino",
                                "item_class_name": "Prepared Items",
                                "revenue_category_name": "Beverage Hot",
                                "item_category_name": "Beverage > Coffee Hot",
                                "active": true
                            },
                            {
                                "pos_id":"2222",
                                "barcode":"3434",
                                "webtrition_master_reference_number": "5465646",
                                "long_name": "Starbucks Capuccino",
                                "item_class_name": "Prepared Items",
                                "revenue_category_name": "Beverage Hot",
                                "item_category_name": "Beverage > Coffee Hot",
                                "active": false
                            },
                            {
                                "pos_id":"3333",
                                "barcode":"3434",
                                "webtrition_master_reference_number": "5465646",
                                "long_name": "Starbucks Capuccino",
                                "item_class_name": "Prepared Items",
                                "revenue_category_name": "Beverage Hot",
                                "item_category_name": "Beverage > Coffee Hot",
                                "active": true
                            }
                        ]
                };
            res.send(posItemData);
        });

    /* Get a POS Item */

    posRoutes.route(urlSpace.urls.local.getPosItem)
        .get(function (req, res) {
            var posItem = {},
                posId = req.params.pos_id;

            posItem.posId = posId;
            posItem.name = "Starbucks Capuccino";
            posItem.revenueCategory = {
                "revenue_category_name": "Breakfast",
                "revenue_category_code": "A"
            };
            posItem.itemCategory = {
                "item_category_name": "Additions > Combo Additions"
            };
            posItem.unitOfMeasure = {
                "name" : "pounds"
            };

            res.send(posItem);
        });

    /* Get System Categories */

    posRoutes.route(urlSpace.urls.local.getTypeDetailsForSystemCategoryAndVendor)
        .get(function (req, res) {
            var systemCategory = req.params.system_category,
                vendorName = req.params.vendor_name,
                type = req.params.type,
                typeDetails = {};

            if(vendorName === 'InfoGenesis'){
                if(systemCategory === 'default'){
                    switch (type){
                        case 'product_class': typeDetails={
                                "metadata":
                                    {
                                        "resultCount": 4,
                                        "status": "success",
                                        "http_status_code": "200"
                                    },
                                "data":
                                    [
                                        {
                                            "name" : "Beverage"
                                        },
                                        {
                                            "name" : "Food"
                                        },
                                        {
                                            "name" : "Retail"
                                        },
                                        {
                                            "name" : "Alcohol"
                                        }
                                    ]
                            }; break;
                        case 'revenue_category': typeDetails={
                                "metadata":
                                    {
                                        "resultCount": 4,
                                        "status": "success",
                                        "http_status_code": "200"
                                    },
                                "data":
                                    [
                                        {
                                            "name" : "Rev Cat 1"
                                        },
                                        {
                                            "name" : "Rev Cat 2"
                                        },
                                        {
                                            "name" : "Rev Cat 3"
                                        },
                                        {
                                            "name" : "Rev Cat 4"
                                        }
                                    ]
                            }; break;
                        default : typeDetails={};
                    }
                }

                if(systemCategory === 'morrison'){
                    switch (type){
                        case 'product_class': typeDetails={
                            "metadata":
                                {
                                    "resultCount": 4,
                                    "status": "success",
                                    "http_status_code": "200"
                                },
                            "data":
                                [
                                    {
                                        "name" : "Beverage"
                                    },
                                    {
                                        "name" : "Food"
                                    },
                                    {
                                        "name" : "Retail"
                                    },
                                    {
                                        "name" : "Alcohol"
                                    }
                                ]
                        }; break;
                        case 'revenue_category': typeDetails={
                            "metadata":
                                {
                                    "resultCount": 4,
                                    "status": "success",
                                    "http_status_code": "200"
                                },
                            "data":
                                [
                                    {
                                        "name" : "Rev Cat 1"
                                    },
                                    {
                                        "name" : "Rev Cat 2"
                                    },
                                    {
                                        "name" : "Rev Cat 3"
                                    },
                                    {
                                        "name" : "Rev Cat 4"
                                    }
                                ]
                        }; break;
                        default : typeDetails={};
                    }
                }

                if(systemCategory === 'eurest'){
                    switch (type){
                        case 'product_class': typeDetails={
                            "metadata":
                                {
                                    "resultCount": 4,
                                    "status": "success",
                                    "http_status_code": "200"
                                },
                            "data":
                                [
                                    {
                                        "name" : "Beverage"
                                    },
                                    {
                                        "name" : "Food"
                                    },
                                    {
                                        "name" : "Retail"
                                    },
                                    {
                                        "name" : "Alcohol"
                                    }
                                ]
                        }; break;
                        case 'revenue_category': typeDetails={
                            "metadata":
                                {
                                    "resultCount": 4,
                                    "status": "success",
                                    "http_status_code": "200"
                                },
                            "data":
                                [
                                    {
                                        "name" : "Rev Cat 1"
                                    },
                                    {
                                        "name" : "Rev Cat 2"
                                    },
                                    {
                                        "name" : "Rev Cat 3"
                                    },
                                    {
                                        "name" : "Rev Cat 4"
                                    }
                                ]
                        }; break;
                        default : typeDetails={};
                    }
                }

            }

            if(vendorName === 'Simphony'){
                if(systemCategory === 'default'){
                    switch (type){
                        case 'major_group': typeDetails={
                            "metadata":
                                {
                                    "resultCount": 4,
                                    "status": "success",
                                    "http_status_code": "200"
                                },
                            "data":
                                [
                                    {
                                        "name" : "Major Group 1"
                                    },
                                    {
                                        "name" : "Major Group 2"
                                    },
                                    {
                                        "name" : "Major Group 3"
                                    },
                                    {
                                        "name" : "Major Group 4"
                                    }
                                ]
                        }; break;
                        case 'family_group': typeDetails={
                            "metadata":
                                {
                                    "resultCount": 4,
                                    "status": "success",
                                    "http_status_code": "200"
                                },
                            "data":
                                [
                                    {
                                        "name" : "Family Group 1"
                                    },
                                    {
                                        "name" : "Family Group 2"
                                    },
                                    {
                                        "name" : "Family Group 3"
                                    },
                                    {
                                        "name" : "Family Group 4"
                                    }
                                ]
                        }; break;
                        default : typeDetails={};
                    }
                }

                if(systemCategory === 'morrison'){
                    switch (type){
                        case 'major_group': typeDetails={
                            "metadata":
                                {
                                    "resultCount": 4,
                                    "status": "success",
                                    "http_status_code": "200"
                                },
                            "data":
                                [
                                    {
                                        "name" : "Major Group 1"
                                    },
                                    {
                                        "name" : "Major Group 2"
                                    },
                                    {
                                        "name" : "Major Group 3"
                                    },
                                    {
                                        "name" : "Major Group 4"
                                    }
                                ]
                        }; break;
                        case 'family_group': typeDetails={
                            "metadata":
                                {
                                    "resultCount": 4,
                                    "status": "success",
                                    "http_status_code": "200"
                                },
                            "data":
                                [
                                    {
                                        "name" : "Family Group 1"
                                    },
                                    {
                                        "name" : "Family Group 2"
                                    },
                                    {
                                        "name" : "Family Group 3"
                                    },
                                    {
                                        "name" : "Family Group 4"
                                    }
                                ]
                        }; break;
                        default : typeDetails={};
                    }
                }

                if(systemCategory === 'eurest'){
                    switch (type){
                        case 'major_group': typeDetails={
                            "metadata":
                                {
                                    "resultCount": 4,
                                    "status": "success",
                                    "http_status_code": "200"
                                },
                            "data":
                                [
                                    {
                                        "name" : "Major Group 1"
                                    },
                                    {
                                        "name" : "Major Group 2"
                                    },
                                    {
                                        "name" : "Major Group 3"
                                    },
                                    {
                                        "name" : "Major Group 4"
                                    }
                                ]
                        }; break;
                        case 'family_group': typeDetails={
                            "metadata":
                                {
                                    "resultCount": 4,
                                    "status": "success",
                                    "http_status_code": "200"
                                },
                            "data":
                                [
                                    {
                                        "name" : "Family Group 1"
                                    },
                                    {
                                        "name" : "Family Group 2"
                                    },
                                    {
                                        "name" : "Family Group 3"
                                    },
                                    {
                                        "name" : "Family Group 4"
                                    }
                                ]
                        }; break;
                        default : typeDetails={};
                    }
                }

            }



            res.send(typeDetails);
        });

    // POS Revenue Categories

    /*Get POS Revenue Categories*/
    posRoutes.route(urlSpace.urls.local.getPosRevenueCategories)
        .get(function(req, res) {

            var fields = req.query.fields,
                limit = req.query.limit,
                page = req.query.page,
                search = req.query.search,
                sorts = req.query.sorts,
                url = config.urls.adams + urlSpace.urls.adams.getPosRevenueCategories.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                envPath = process.env.NODE_ENV ? process.env.NODE_ENV : 'pos';


            /*  utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.send(data);
                  logger.info('get book of records route response - ', data);
              }, function (error) {
                  logger.info('get book of records route error - ', error);
                  var status = (error.http_status) ? error.http_status : 500;
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.status(status).send(error);
              });*/

            var posAllRevenueCategories =
                {
                    "metadata":
                        {
                            "resultCount": 4,
                            "status": "success",
                            "http_status_code": "200"
                        },
                    "data":
                        [
                            {
                                "revenue_category_name": "Beverage Cold",
                                "revenue_category_code": "B"
                            },
                            {
                                "revenue_category_name": "Entree",
                                "revenue_category_code": "D"
                            },
                            {
                                "revenue_category_name": "Beverage Hot",
                                "revenue_category_code": "C"
                            },
                            {
                                "revenue_category_name": "Breakfast",
                                "revenue_category_code": "A"
                            }
                        ]
                };

            res.send(posAllRevenueCategories);

        });

    /* Add POS Revenue Category*/
    posRoutes.route(urlSpace.urls.local.addPosRevenueCategory)
        .post(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addPosRevenueCategory,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            /*utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });*/

            res.send('true');
        });

    /* Update POS Revenue Category*/
    posRoutes.route(urlSpace.urls.local.updatePosRevenueCategory)
        .put(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.updatePosRevenueCategory,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            /*utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('update locations error ', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });*/
            res.send('true');
        });


    // POS Item Category

    /* Get POS Item Categories*/
    posRoutes.route(urlSpace.urls.local.getPosItemCategories)
        .get(function(req, res) {

            var fields = req.query.fields,
                limit = req.query.limit,
                page = req.query.page,
                search = req.query.search,
                sorts = req.query.sorts,
                url = config.urls.adams + urlSpace.urls.adams.getPosItemCategories.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                envPath = process.env.NODE_ENV ? process.env.NODE_ENV : 'pos';


            /*  utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.send(data);
                  logger.info('get book of records route response - ', data);
              }, function (error) {
                  logger.info('get book of records route error - ', error);
                  var status = (error.http_status) ? error.http_status : 500;
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.status(status).send(error);
              });*/

            var posAllItemCategories =
                {
                    "metadata":
                        {
                            "resultCount": 5,
                            "status": "success",
                            "http_status_code": "200"
                        },
                    "data":
                        [
                            {
                                "item_category_name": "Additions > Breakfast Additions"
                            },
                            {
                                "item_category_name": "Additions > Coffee Additions"
                            },
                            {
                                "item_category_name": "Additions > Grill Additions"
                            },
                            {
                                "item_category_name": "Additions > Combo Additions"
                            },
                            {
                                "item_category_name": "Additions > Pizza Additions"
                            }
                        ]
                };

            res.send(posAllItemCategories);

        });

    /* Add POS Item Category*/
    posRoutes.route(urlSpace.urls.local.addPosItemCategory)
        .post(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addPosItemCategory,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            /*utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });*/

            res.send('true');
        });

    /* Update POS Item Category*/
    posRoutes.route(urlSpace.urls.local.updatePosItemCategory)
        .put(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.updatePosItemCategory,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            /*utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('update locations error ', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });*/

            res.send('true');
        });

    // POS Item Classes

    /* Get POS Item Classes*/
    posRoutes.route(urlSpace.urls.local.getPosItemClasses)
        .get(function(req, res) {

            var fields = req.query.fields,
                limit = req.query.limit,
                page = req.query.page,
                search = req.query.search,
                sorts = req.query.sorts,
                url = config.urls.adams + urlSpace.urls.adams.getPosItemClasses.replace('{limit}', limit).replace('{page}', page).replace('{sorts}', sorts).replace('{search}', search),
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                envPath = process.env.NODE_ENV ? process.env.NODE_ENV : 'pos';


            /*  utils.makeApiCallWithOAuthToken(url, token, accept, 'GET').then(function (data) {
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.send(data);
                  logger.info('get book of records route response - ', data);
              }, function (error) {
                  logger.info('get book of records route error - ', error);
                  var status = (error.http_status) ? error.http_status : 500;
                  res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                  res.status(status).send(error);
              });*/

            var posItemClasses =
                {
                    "metadata":
                        {
                            "resultCount": 5,
                            "status": "success",
                            "http_status_code": "200"
                        },
                    "data":
                        [
                            {
                                "item_class_name": "Prepared Item"
                            },
                            {
                                "item_class_name": "Prepackaged Item"
                            },
                            {
                                "item_class_name": "Webtrition Item"
                            }
                        ]
                };
            res.send(posItemClasses);

        });

    /* Add POS Item Classes*/
    posRoutes.route(urlSpace.urls.local.addPosItemClass)
        .post(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.addPosItemClass,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            /*utils.makeApiCallWithOAuthToken(url, token, accept, 'POST', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });*/

            res.send('true');
        });

    /* Update POS Item Classes*/
    posRoutes.route(urlSpace.urls.local.updatePosItemClass)
        .put(function (req, res) {
            var body = req.body,
                url = config.urls.adams + urlSpace.urls.adams.updatePosItemClass,
                token = stgAuth.getTokenFromHeader(req),
                accept = urlSpace.headers.adams.accept.v1,
                contentType = urlSpace.headers.contentType.json;

            /*utils.makeApiCallWithOAuthToken(url, token, accept, 'PUT', body, contentType)
                .then(function (data) {
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.send(data);
                }, function (error) {
                    logger.info('update locations error ', error);
                    var status = (error.http_status) ? error.http_status : 500;
                    res.setHeader(urlSpace.headers.contentType.name, urlSpace.headers.contentType.json);
                    res.status(status).send(error);
                });*/

            res.send('true');
        });

    return posRoutes;
};

module.exports = posRoutes;