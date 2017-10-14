'use strict';

(function () {

    angular.module('adams.user.administration.service', ['common.services.RBAC'])
        .factory('UserAdministrationService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', 'RBACService', function($rootScope, $http, ADAMS_URL_SPACE, $q, RBACService) {
            var userAdministrationService = {};

            userAdministrationService.getUserDetails = function(limit, page, sorts, search, appName, roleName) {
                var userSearchDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.userDetails + '?limit=' + limit + '&page=' + page + '&appName=' + appName + '&roleName=' + roleName + '&sorts=' + sorts + '&search=' + JSON.stringify(search);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: userSearchDeferred.promise
                });

                var promise = request.then(
                    function( response ) {
                        return( response.data );
                    },
                    function(error) {
                        return error;
                    }
                );

                promise.abort = function() {
                    userSearchDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        userSearchDeferred = request = promise = null;
                    }
                );


                return( promise );
            };

            userAdministrationService.getApplicationsByUser = function(userName) {
                var url = ADAMS_URL_SPACE.urls.local.applicationsByUser.replace('{userName}', userName);
                return $http.get(url)
                    .then(function(response) {
                        return response.data.data;
                    }, function(error) {
                        console.error('An error occurred getting applications data', error);
                        return 'error';
                    });
            };

            userAdministrationService.getRolesByLoginUser = function(application) {
                var url = ADAMS_URL_SPACE.urls.local.rolesByLoginUser.replace('{application}', application);
                return $http.get(url)
                    .then(function(response) {
                        return response.data.data;
                    }, function(error) {
                        console.error('An error occurred getting roles data', error.data);
                        return 'error';
                    });
            };

            userAdministrationService.getRolesByUser = function(userName, application) {
                var url = ADAMS_URL_SPACE.urls.local.rolesByUser.replace('{userName}', userName).replace('{application}', application);
                return $http.get(url)
                    .then(function(response) {
                        return response.data.data;
                    }, function(error) {
                        console.error('An error occurred getting roles data', error.data);
                        return [];
                    });
            };

            userAdministrationService.getTeamsByUser = function(userName, application, role) {
                var url = ADAMS_URL_SPACE.urls.local.teamsByUser.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);

                return $http.get(url)
                    .then(function(response) {
                        return response.data.data;
                    }, function(error) {
                        console.error('An error occurred getting roles data', error.data);
                        return [];
                    });
            };

            userAdministrationService.updateRole = function(userName, application, role) {
                var url = ADAMS_URL_SPACE.urls.local.updateRole.replace('{userName}', userName).replace('{application}', application);
                
                return $http.put(url, role)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        console.error('An error occurred updating role', error.data);
                        return 'error';
                    });
            };

            userAdministrationService.changeDefaultRole = function(userName, application, role) {
                var url = ADAMS_URL_SPACE.urls.local.changeDefaultRole.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);

                return $http.put(url)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        console.error('An error occurred changing default role', error.data);
                        return 'error';
                    });
            };

            userAdministrationService.changeDefaultTeam = function(userName, application, role, team, sourceSystemID) {
                var url = ADAMS_URL_SPACE.urls.local.changeDefaultTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role).replace('{team}', team).replace('{sourcesystemid}', sourceSystemID);

                return $http.put(url)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        console.error('An error occurred changing default team', error.data);
                        return [];
                    });
            };

            userAdministrationService.deleteApp = function(userName, application) {
                var url = ADAMS_URL_SPACE.urls.local.deleteApp.replace('{userName}', userName).replace('{application}', application);

                return $http.delete(url)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        console.error('An error occurred deleting app', error.data);
                        return 'error';
                    });
            };

            userAdministrationService.deleteRoles = function(userName, application, role) {
                var url = ADAMS_URL_SPACE.urls.local.deleteRole.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);

                return $http.delete(url)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        console.error('An error occurred deleting roles', error.data);
                        return 'error';
                    });
            };

            userAdministrationService.deleteTeam = function(userName, application, role, team, sourceSystemID) {
                var url = ADAMS_URL_SPACE.urls.local.deleteTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role).replace('{team}', team).replace('{sourcesystemid}', sourceSystemID);

                return $http.delete(url)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        console.error('An error occurred deleting teams', error.data);
                        return 'error';
                    });
            };

            userAdministrationService.addTeams = function(userName, application, role, teams) {
                var url = ADAMS_URL_SPACE.urls.local.addTeam.replace('{userName}', userName).replace('{application}', application).replace('{role}', role);
                
                return $http.post(url, teams)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        console.error('An error occurred adding Teams', error.data);
                        return 'error';
                    });
            };

            userAdministrationService.getHierarchicalTeams = function(limit, page, application, role, searchTeamName, searchTeamDescription, searchTeamType, sort) {
                var userSearchDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.costCenterByLoginUser.replace('{application}', application).replace('{role}', role);
                
                url = url + '?limit=' + limit + '&page=' + page + '&searchTeamName=' + searchTeamName + '&searchTeamDescription=' + searchTeamDescription + '&searchTeamType=' + searchTeamType + '&sort=' + sort;

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: userSearchDeferred.promise
                });

                var promise = request.then(
                    function( response ) {
                        return response.data;
                    },
                    function(error) {

                        return error;
                    }
                );

                promise.abort = function() {
                    userSearchDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        userSearchDeferred = request = promise = null;
                    }
                );


                return( promise );
            };

            userAdministrationService.getUserHistory = function(limit, page, sorts, search, userName, fields) {
                var userSearchDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.userHistory.replace('{userName}', userName);

                limit = limit || '';
                page = page || '';
                sorts = sorts || JSON.stringify({sorts: [{direction: 'DESC', property:'action_date'}]});
                fields = fields || '';
                search = search || null;

                url = url + '?limit=' + limit + '&page=' + page + '&sorts=' + sorts  + '&fields=' + fields + '&search=' + JSON.stringify(search);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: userSearchDeferred.promise
                });

                var promise = request.then(
                    function( response ) {
                        return response.data;
                    },
                    function(error) {

                        return error;
                    }
                );

                promise.abort = function() {
                    userSearchDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        userSearchDeferred = request = promise = null;
                    }
                );


                return( promise );
            };


            userAdministrationService.getUserName = function() {
                return RBACService.getCurrentProfile().user_name;
            };
            
            userAdministrationService.getRoleName = function() {
                return RBACService.getCurrentRoleName();
            };


            userAdministrationService.getApplicationsByLoginUser = function () {
                var userName;
                userName = RBACService.getCurrentProfile().user_name;

                var url = ADAMS_URL_SPACE.urls.local.applicationsByUser.replace('{userName}', userName);
                return $http.get(url)
                    .then(function (response) {
                        var userData = {};

                        userData.user = userName;
                        userData.userApplications = response.data.data;

                        return $q.when(userData);
                    })
                    .catch(function (error) {
                        var errorMessage = 'An error occurred getting applications data' + error;
                        console.error('An error occurred getting applications data', error);
                        return $q.reject(errorMessage);
                    });

            };

            userAdministrationService.getSelectApplicationOptions = function (limit, page) {
                var url = ADAMS_URL_SPACE.urls.local.secApplication + '?limit=' + limit + '&page=' + page;

                return $http.get(url)
                    .then(function (response) {
                        return $q.when(response.data.data);
                    })
                    .catch(function (error) {
                        var errorMessage = 'An error occurred getting application options data' + error;
                        console.error('An error occurred getting application option data', error);
                        return $q.reject(errorMessage);
                    });
            };

            userAdministrationService.getSelectRoleOptions = function (selectedApplication, limit, page) {
                var url;
                if (selectedApplication && selectedApplication.length > 0) {
                    url = ADAMS_URL_SPACE.urls.local.secRole + '?limit=' + limit + '&page=' + page + '&application_name=' + selectedApplication;

                } else {
                    url = ADAMS_URL_SPACE.urls.local.secRole + '?limit=' + limit + '&page=' + page;
                }

                return $http.get(url)
                    .then(function (response) {
                        return response.data.data;
                    })
                    .catch(function (error) {
                        var errorMessage = 'An error occurred getting application options data' + error;
                        console.error('An error occurred getting application option data', error);
                        return errorMessage;
                    });
            };

            

            return userAdministrationService;
        }]);
})();
