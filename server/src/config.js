module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'production':
            return {
                application: {
                    name: 'ADAMS'
                },
                oauth: {
                    clientID: "ADAMS",
                    clientSecret: "application data is my life",
                    url: "https://sso.compassmanager.com/oauth2.0",
                    nodeBaseURL: "https://adams.compassmanager.com",
                    autoLogoutOnSessionExpired: "true"
                },
                server: {
                    port: 3005,
                    rootContext: '/ui',
                    logPath: '/applogs/adams'
                },
                urls: {
                    adams: 'https://adams.compassmanager.com',
                    sso: 'https://sso.compassmanager.com'
                },
                ga: {
                    id: ''
                },
                dynatrace: {
                    enabled: false
                }
            };

        case 'sbx':
            return {
                application: {
                    name: 'ADAMS'
                },
                oauth: {
                    clientID: "ADAMS SBX",
                    clientSecret: "application data is my life",
                    url: "https://ssoqas.compassmanager.com/oauth2.0",
                    nodeBaseURL: "https://adamssnd.compassmanager.com",
                    autoLogoutOnSessionExpired: "true"
                },
                server: {
                    port: 3007,
                    rootContext: '/ui',
                    logPath: '/applogs/adams/sbx'
                },
                urls: {
                    adams: 'https://adamssnd.compassmanager.com',
                    sso: 'https://ssoqas.compassmanager.com'
                },
                ga: {
                    id: ''
                },
                dynatrace: {
                    enabled: false
                }
            };

        case 'qas':
            return {
                application: {
                    name: 'ADAMS'
                },
                oauth: {
                    clientID: "ADAMS QAS",
                    clientSecret: "application data is my life",
                    url: "https://ssoqas.compassmanager.com/oauth2.0",
                    nodeBaseURL: "https://adamsqas.compassmanager.com",
                    autoLogoutOnSessionExpired: "true"
                },
                server: {
                    port: 3008,
                    rootContext: '/ui',
                    logPath: '/applogs/adams/qas'
                },
                urls: {
                    adams: 'https://adamsqas.compassmanager.com',
                    sso: 'https://ssoqas.compassmanager.com'
                },
                ga: {
                    id: ''
                },
                dynatrace: {
                    enabled: false
                }
            };

        case 'development':
            return {
                application: {
                    name: 'ADAMS'
                },
                oauth: {
                    clientID: "ADAMS DEV",
                    clientSecret: "application data is my life",
                    url: "https://ssodev.compassmanager.com/oauth2.0",
                    nodeBaseURL: "https://adamsdev.compassmanager.com",
                    autoLogoutOnSessionExpired: "true"
                },
                server: {
                    port: 5004,
                    rootContext: '/ui',
                    logPath: '/applogs/adams/dev'
                },
                urls: {
                    adams: 'https://adamsdev.compassmanager.com',
                    sso: 'https://ssodev.compassmanager.com'
                },
                ga: {
                    id: ''
                },
                dynatrace: {
                    enabled: false
                }
            };

        case 'ci':
            return {
                application: {
                    name: 'ADAMS'
                },
                oauth: {
                    clientID: "ADAMS CI",
                    clientSecret: "application data is my life",
                    url: "https://ssodev.compassmanager.com/oauth2.0",
                    nodeBaseURL: "https://adamsci.compassmanager.com",
                    autoLogoutOnSessionExpired: "true"
                },
                server: {
                    port: 5003,
                    rootContext: '/ui',
                    logPath: '/applogs/adams/ci'
                },
                urls: {
                    adams: 'https://adamsci.compassmanager.com',
                    sso: 'https://ssodev.compassmanager.com'
                },
                ga: {
                    id: ''
                },
                dynatrace: {
                    enabled: false
                }
            };

        default:
            return {
                application: {
                    name: 'ADAMS'
                },
                oauth: {
                    clientID: "ADAMS Local",
                    clientSecret: "application data is my life",
                    url: "https://ssodev.compassmanager.com/oauth2.0",
                    autoLogoutOnSessionExpired: "true"
                },
                server: {
                    port: 3005,
                    rootContext: '/ui',
                    logPath: __dirname + '/logs'
                },
                urls: {
                    // adams: 'https://adamsdev.compassmanager.com',
                    adams: 'https://adamsci.compassmanager.com',
                    // adams: 'http://cgl-5cg6496zfc:9080/master_data_web',
                    // adams: 'http://172.29.130.103:8080/master_data_web',
                    // adams: 'http://cgl-5cd63382hq:9080/master_data_web',
                    // adams: 'http://172.29.130.13:8080/master_data_web',
                    sso: 'https://ssodev.compassmanager.com'
                },
                ga: {
                    id: ''
                },
                dynatrace: {
                    enabled: false
                },
                clientLogger: {
                    flushInterval: 600000, // 10 mins
                    maxLogLength: 10000,
                    isDebugEnabled: true,
                    enableLogService: true
                },
                googlemaps: {
                    enabled: true,
                    clientId: 'AIzaSyBx5XGGSNfkc_nODEPsInQMg7iZKcbd6BE',
                    url: 'https://maps.googleapis.com/maps',
                    scriptEndpoint: 'https://maps.googleapis.com/maps/api/js'
                }
            };
    }
};