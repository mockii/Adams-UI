/**
 * Setup PMX for advanced monitoring of NodeJS application in Keymetrics
 * For more information see:
 *     https://www.npmjs.com/package/pmx
 *     http://docs.keymetrics.io/docs/usage/install-pmx/
 *     http://docs.keymetrics.io/docs/pages/custom-metrics/
 */
var pmx = require('pmx').init({
	http          : true, // HTTP routes logging (default: true)
	ignore_routes : [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
	errors        : true, // Exceptions logging (default: true)
	custom_probes : true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
	network       : true, // Network monitoring at the application level
	ports         : true  // Shows which ports your app is listening on (default: false)
});

var express = require('express'),
	app = express(),
	fs = require('fs'),
	path = require('path'),
	bodyParser = require('body-parser'),
	request = require('request'),
	promise = require('promise'),
	proxy = require('express-http-proxy'),
	log4js = require('log4js'),
	utils = require('./utils'),
	Config = require('./config'),
	config = new Config(),
	constants = require('./constants'),
	urlSpace = require('./url-space');
	
/**
 * make a log directory, just in case it isn't there.
 * this is only needed for local environments.
 */
if (!process.env.NODE_ENV) {
	try {
		fs.mkdirSync(config.server.logPath);
	} catch (e) {
		if (e.code !== 'EEXIST') {
			console.error("Could not set up log directory, error was: ", e);
			process.exit(1);
		}
	}
}

log4js.configure(__dirname + '/log4js-config.json', {reloadSecs: 60, cwd: config.server.logPath});
var logger = log4js.getLogger('server'),
	clientLogger = log4js.getLogger('client'),
	httpLogger = log4js.getLogger('http');

logger.info('Starting NodeJS Server for ADAMS');

app.use(log4js.connectLogger(httpLogger, { level: 'auto' }));

var APP_FOLDER_LOCATION = '@@APP_LOCATION';

var authVariables = {
	app: app,
	config: config,
	token: {
		revalidateAfterMin: 30,
		longestTimeToLiveHours: 8
	}
};

// include oauth libraries, passing reference to app and psudeo-env variables
var stgAuth = require('stgwebutils-server-oauth')(authVariables);

app.use(stgAuth.ensureAuthenticated);
app.use(config.server.rootContext, setupConfigFile, express.static(__dirname + APP_FOLDER_LOCATION));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit:50000 }));
app.use(bodyParser.json());

logger.info('initializing routers');
var userAdminRouter = require('./routes/useradmin-routes')(config, stgAuth),
	vendorRoutes = require('./routes/vendor-routes')(config, stgAuth),
	costCenterRoutes = require('./routes/costcenter-routes')(config, stgAuth),
	tempAssociatesRoutes = require('./routes/tempassociates-routes')(config, stgAuth),
	productsRoutes = require('./routes/products-routes')(config, stgAuth),
    bookOfRecordRoutes = require('./routes/book-of-record-routes')(config, stgAuth),
    locationsRoutes = require('./routes/locations-routes')(config, stgAuth);


logger.info('registering routers with Express', config.server.rootContext);
app.use(config.server.rootContext, userAdminRouter);
app.use(config.server.rootContext, vendorRoutes);
app.use(config.server.rootContext, costCenterRoutes);
app.use(config.server.rootContext, tempAssociatesRoutes);
app.use(config.server.rootContext, productsRoutes);
app.use(config.server.rootContext, bookOfRecordRoutes);
app.use(config.server.rootContext, locationsRoutes);

// catch whichever file needs to contain "common.settings.oauth"
function setupConfigFile(req, res, next) {
	if (req.url === "/scripts/stgAuth.js") {
		stgAuth.getAuthSettingsFile(req, res, next);
	} else {
		next();
	}
}

function callApiWithOAuth(req, res, url, accept, method, body) {
	var token = stgAuth.getTokenFromHeader(req);
	
	return utils.makeApiCallWithOAuthToken(url, token, accept, method, body).then(function(data){
		return data;
	}, function(error){
		return error;
	});
}

function callApi(req, res, url, accept, method, body, contentType) {
	logger.debug('Making API call to', url, ', method', method, ', body', body);
	var token = stgAuth.getTokenFromHeader(req);
	return utils.makeApiCallWithOAuthToken(url, token, accept, method, body, contentType).then(function(data){
		return data;
	}, function(error){
		return error;
	});
}

/**
 * Basic Application Routes
 */

if ('/' !== config.server.rootContext) {
	app.get('/', function(req, res) {
		if (req.session) {
			req.session.destroy();
		}
		res.redirect(config.server.rootContext);
	});
}

app.get(config.server.rootContext + '/', function(req, res) {
	if (req.session) {
		req.session.destroy();
	}
	res.redirect(config.server.rootContext + '/auth');
});

app.get(config.server.rootContext +'/logout', function(req, res) {
	res.redirect(config.urls.sso + '/closeBrowser.jsp');
});

app.post(config.server.rootContext + urlSpace.urls.local.clientLogger, function(req, res) {
    var logs = req.body,
        contentType = urlSpace.headers.contentType.json,
        contentTypeName = urlSpace.headers.contentType.name;

    logs.forEach(function(item){
       clientLogger[item.type](item.message);
    });

    res.setHeader(contentTypeName, contentType);
    res.send(JSON.stringify("Success"));
});

var nodeServer = app.listen(config.server.port, function(){
	var host = nodeServer.address().address;
	var port = nodeServer.address().port || config.server.port;
	logger.info('ADAMS server started listening at http://%s:%s', host, port, "with pid", process.pid);
	console.log('ADAMS server started listening at http://%s:%s', host, port, "with pid", process.pid);
});