'use strict';

(function () {

    angular.module('adams.user.administration.controller',
        [
            'adams.user.administration.service',
            'adams.user.administration.add.user.access.modal.controller',
            'adams.user.administration.show.history.modal.controller',
            'adams.user.administration.team.access.modal.controller',
            'common.modules.logging'
        ])
        .controller('UserAdministrationController', ['$rootScope', '$scope', '$window', '$filter', '$timeout', '$interval', '$uibModal', 'StgStatesService', 'UserAdministrationService', 'blockUI', 'appName', 'roleName',
            'userData', 'selectApplicationOptions', 'selectRoleOptions', 'ADAMS_CONSTANTS', 'ModalDialogService', 'RBACService', 'uiGridConstants', 'Utils', '$log',
            function ($rootScope, $scope, $window, $filter, $timeout, $interval, $uibModal, StgStatesService, UserAdministrationService, blockUI, appName, roleName,
                      userData, selectApplicationOptions, selectRoleOptions, ADAMS_CONSTANTS, ModalDialogService, RBACService, uiGridConstants, Utils, $log) {
                var userAdministrationController = this,
                    userSearchGridPromise;

                function initialize() {
                    blockUserPortlets();


                    userAdministrationController.gender = '';
                    userAdministrationController.search = '';


                    userAdministrationController.isCollapsed = true;
                    userAdministrationController.activeTab = 0;

                    userAdministrationController.job_description = '';

                    userAdministrationController.loginUserApps = userData.userApplications;

                    userAdministrationController.applications = [];


                    userAdministrationController.gridApplication = ' ';
                    userAdministrationController.gridApplications = selectApplicationOptions;

                    userAdministrationController.gridRole = ' ';
                    userAdministrationController.gridRoles = selectRoleOptions;

                    userAdministrationController.gridTeamName = '';

                    userAdministrationController.searchObject = {};

                    userAdministrationController.callPagination = true;

                    userAdministrationController.applicationAuthorizedForLoginUser = false;


                    if (appName) {
                        userAdministrationController.appName = appName;
                    }
                    else {
                        userAdministrationController.appName = $rootScope.applicationConfiguration.application.name;
                    }

                    if (roleName) {
                        userAdministrationController.loginRoleName = roleName;
                    }
                    else {
                        userAdministrationController.loginRoleName = UserAdministrationService.getRoleName();
                    }

                    $scope.$on('$stateChangeSuccess',
                        function (event, toState, toParams, fromState, fromParams) {
                            if (angular.equals(toState, fromState) && angular.equals(toParams, fromParams)) {
                                return;
                            }
                            else {
                                if (appName && roleName) {
                                    var qs = {};
                                    qs.rbac_role_name = roleName;
                                    qs.rbac_app_name = appName;
                                    RBACService.changeRbacProfile(qs);
                                }
                            }
                        }
                    );

                    userAdministrationController.loginUserName = userData.user;

                    userAdministrationController.gridOptions = defineUserSearchGridOptions();

                    $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                        // emitted gridOptions and gridApi from Directive controller

                        userAdministrationController.gridApi = gridApi;

                        userAdministrationController.loadDetails();

                    });


                    unblockUserPortlets();
                }

                // destroy the timeout function
                $scope.$on("$destroy", function (event) {
                    if (angular.isDefined($scope.filterTimeout)) {
                        $timeout.cancel($scope.filterTimeout);
                    }
                });


                var currentProperty;
                userAdministrationController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                    //Copy the UI-Grid Filter Object from directive controller and External filter Object from root controller to target object

                    if (!searchInput.search) {
                        searchInput.search = [];
                    }
                    for (var property in userAdministrationController.searchObject) {
                        currentProperty = property;
                        if (userAdministrationController.searchObject.hasOwnProperty(currentProperty)) {
                            // delete if exist
                            if(Utils.checkIfSearchObjectPresent(currentProperty, searchInput.search)){
                                var index = searchInput.search.findIndex(Utils.getSearchIndex, currentProperty);
                                searchInput.search.splice(index,1);
                            }
                            searchInput.search.push({
                                "property": currentProperty,
                                "value": userAdministrationController.searchObject[currentProperty] === null ? '' : userAdministrationController.searchObject[currentProperty],
                                "operator": ""
                            });
                        }
                    }

                    userAdministrationController.search = searchInput;

                    return UserAdministrationService.getUserDetails(pageSize, pageNumber, sort, userAdministrationController.search, userAdministrationController.appName, userAdministrationController.loginRoleName);
                };

                userAdministrationController.loadDetails = function () {
                    // $interval whilst we wait for the grid to digest the data we just gave it
                    $interval(function () {
                        userAdministrationController.gridApi.selection.selectRow(userAdministrationController.gridOptions.data[0]);
                    }, 0, 1);
                };


                userAdministrationController.itemSelected = function (newRole, oldRole) {
                    var role = [];
                    role.push({currentRole: oldRole, newRole: newRole.name});
                    role = JSON.stringify(role[0]);

                    UserAdministrationService.updateRole(userAdministrationController.userName, userAdministrationController.application, role).then(
                        function (data) {
                            if (data === 'error') {
                                userAdministrationController.errorMessage = 'An error occurred while updating role from ' + oldRole + ' to ' + newRole + 'for User: ' + userAdministrationController.userName + ', application: ' + userAdministrationController.application;
                                userAdministrationController.errorHandling(userAdministrationController.errorMessage);
                            }
                            userAdministrationController.getRoles();
                        },
                        function () {
                            unblockUserPortlets();
                            $log.error("An error occurred while updating role: " +  oldRole  + " for " + userAdministrationController.userName);
                        });
                };

                userAdministrationController.setActiveTabInit = function (application) {
                    //userAdministrationController.applicationAuthorizedForLoginUser = false;

                    userAdministrationController.activeTab = 0;
                    userAdministrationController.application = userAdministrationController.applications[0].name;
                    userAdministrationController.defaultApplication = userAdministrationController.applications[0].name;

                    for (var i = 0; i < userAdministrationController.applications.length; i++) {
                        if (userAdministrationController.applications[i].name === application) {
                            userAdministrationController.application = application;
                            userAdministrationController.defaultApplication = userAdministrationController.application;
                            userAdministrationController.activeTab = i;
                            break;
                        }
                    }
                };

                userAdministrationController.setActiveTab = function (index, application) {
                    //userAdministrationController.applicationAuthorizedForLoginUser = false;

                    userAdministrationController.activeTab = index;
                    userAdministrationController.application = application;

                    for (var i = 0; i < userAdministrationController.applications.length; i++) {
                        if (userAdministrationController.applications[i].name === userAdministrationController.application) {

                            //userAdministrationController.applicationAuthorizedForLoginUser = true;

                            userAdministrationController.application = application;
                            userAdministrationController.defaultApplication = userAdministrationController.application;
                            userAdministrationController.activeTab = i;
                            break;
                        }
                        else {
                            userAdministrationController.application = application;
                            userAdministrationController.defaultApplication = userAdministrationController.applications[0].name;
                            userAdministrationController.activeTab = 0;
                        }
                    }

                    userAdministrationController.getLoginRoles();

                    userAdministrationController.getRoles();
                };

                userAdministrationController.deleteApp = function () {

                    ModalDialogService.confirm({
                        bodyText: 'Are you sure want to delete Application: ' + userAdministrationController.application + '?',
                        title: 'Confirmation',
                        okText: 'Delete',
                        cancelText: 'Cancel'
                    }).then(function () {
                        UserAdministrationService.deleteApp(userAdministrationController.userName, userAdministrationController.application).then(
                            function (data) {
                                if (data === 'error') {
                                    userAdministrationController.errorMessage = 'An error occurred while deleting application: ' + userAdministrationController.application + 'for User: ' + userAdministrationController.userName;
                                    userAdministrationController.errorHandling(userAdministrationController.errorMessage);
                                }
                                userAdministrationController.getApps();
                            },
                            function () {
                                unblockUserPortlets();
                                $log.error("An error occurred while deleting application for " + userAdministrationController.userName);
                            });
                    });
                };

                userAdministrationController.roleIndex = function (index, role) {
                    userAdministrationController.roleIndexToDelete = index;
                    userAdministrationController.role = role;
                    userAdministrationController.deleteRole(role);
                };

                userAdministrationController.deleteRole = function (roleName) {
                    ModalDialogService.confirm({
                        bodyText: 'Are you sure want to delete Role: ' + roleName + '?',
                        title: 'Confirmation',
                        okText: 'Delete',
                        cancelText: 'Cancel'
                    }).then(function () {
                        UserAdministrationService.deleteRoles(userAdministrationController.userName, userAdministrationController.application, userAdministrationController.role).then(
                            function (data) {
                                if (data === 'error') {
                                    userAdministrationController.errorMessage = 'An error occurred while deleting role: ' + roleName + 'for User: ' + userAdministrationController.userName + ', application: ' + userAdministrationController.application;
                                    userAdministrationController.errorHandling(userAdministrationController.errorMessage);
                                }
                                userAdministrationController.getApps();
                            },
                            function () {
                                unblockUserPortlets();
                                $log.error("An error occurred while deleting roles for " + userAdministrationController.userName);
                            });
                    });
                };

                userAdministrationController.teamIndex = function (index, parentIndex, team) {
                    userAdministrationController.teamIndexToDelete = index;
                    userAdministrationController.role = userAdministrationController.roles[parentIndex].name;
                    userAdministrationController.roleIndexToDelete = parentIndex;
                    userAdministrationController.teamDetails = team.team_type + ':' + team.team_name + '-' + team.team_description;
                    userAdministrationController.teamName = team.team_name;
                    userAdministrationController.sourceSystemId = team.source_system_id;
                    userAdministrationController.deleteTeam(userAdministrationController.teamDetails);

                };

                userAdministrationController.deleteTeam = function (teamDetails) {

                    ModalDialogService.confirm({
                        bodyText: 'Are you sure want to delete Team: ' + teamDetails + '?',
                        title: 'Confirmation',
                        okText: 'Delete',
                        cancelText: 'Cancel'
                    }).then(function () {
                        UserAdministrationService.deleteTeam(userAdministrationController.userName, userAdministrationController.application, userAdministrationController.role, userAdministrationController.teamName, userAdministrationController.sourceSystemId).then(
                            function (data) {
                                if (data === 'error') {
                                    userAdministrationController.errorMessage = 'An error occurred while deleting team: ' + userAdministrationController.teamName + 'for User: ' + userAdministrationController.userName + ', application: ' + userAdministrationController.application + ' and role: ' + userAdministrationController.role;
                                    userAdministrationController.errorHandling(userAdministrationController.errorMessage);
                                }
                                userAdministrationController.getLoginRoles();
                                userAdministrationController.getRoles();
                            },
                            function () {
                                unblockUserPortlets();
                                $log.error("An error occurred while deleting teams for " + userAdministrationController.userName);
                            });
                    });

                };

                userAdministrationController.roleChecked = function (roleName) {
                    UserAdministrationService.changeDefaultRole(userAdministrationController.userName, userAdministrationController.application, roleName).then(
                        function (data) {
                            if (data === 'error') {
                                userAdministrationController.errorMessage = 'An error occurred while setting default role: ' + roleName + 'for User: ' + userAdministrationController.userName + ', application: ' + userAdministrationController.application;
                                userAdministrationController.errorHandling(userAdministrationController.errorMessage);
                            }
                            userAdministrationController.getRoles();
                        },
                        function () {
                            $log.error("An error occurred while getting roles for " + userAdministrationController.userName);
                        });
                };

                userAdministrationController.teamChecked = function (roleName, teamName, sourceSystemId) {
                    UserAdministrationService.changeDefaultTeam(userAdministrationController.userName, userAdministrationController.application, roleName, teamName, sourceSystemId).then(
                        function (data) {
                            if (data === 'error') {
                                userAdministrationController.errorMessage = 'An error occurred while setting default team: ' + teamName + 'for User: ' + userAdministrationController.userName + ', application: ' + userAdministrationController.application + ' and role: ' + roleName;
                                userAdministrationController.errorHandling(userAdministrationController.errorMessage);
                            }
                            userAdministrationController.getRoles();
                        },
                        function () {
                            $log.error("An error occurred while getting teams for " + userAdministrationController.userName);
                        });
                };

                userAdministrationController.openAddUserModal = function (roleName) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'administration/add-user-access-modal.tpl.html',
                        controller: 'AddUserAccessModalController as addUserAccessModalController',
                        size: 'lg',
                        windowClass: 'addUserAccessModal',
                        backdrop: 'static',
                        resolve: {
                            loginAppName: function () {
                                return userAdministrationController.appName;
                            },
                            loginRoleName: function () {
                                return userAdministrationController.loginRoleName;
                            },
                            applications: function () {
                                return userAdministrationController.loginUserApps;
                            },
                            target_applications: function () {
                                return userAdministrationController.applications;
                            },
                            defaultApplication: function () {
                                if (!userAdministrationController.contains(userAdministrationController.defaultApplication)) {
                                    userAdministrationController.defaultApplication = userAdministrationController.appName;
                                }
                                return userAdministrationController.defaultApplication;
                            },
                            loginRoles: function () {
                                if (!userAdministrationController.defaultApplication) {
                                    userAdministrationController.defaultApplication = userAdministrationController.appName;
                                }

                                return UserAdministrationService.getRolesByLoginUser(userAdministrationController.defaultApplication).then(
                                    function (data) {

                                        if (data === "{}") { //API issue - instead of returning an empty array, it is returnin and empty object literal
                                            data = [];
                                        }

                                        if (data === 'error' || data.length === 0) {
                                            return [];
                                        }
                                        else if (data) {
                                            return data;
                                        }
                                    },
                                    function () {
                                        $log.error("An error occurred while getting login user roles data");

                                    });
                            },
                            userRoles: function () {
                                return userAdministrationController.roles;
                            },
                            userName: function () {
                                return userAdministrationController.userName;
                            },
                            roleName: function () {
                                return roleName;
                            }
                        }
                    });

                    //update the grid in the controller
                    modalInstance.result.then(function (result) {
                        if (ADAMS_CONSTANTS.MODAL_ACTION_ADD === result.action) {

                            if (result.current_app_from_modal) {
                                userAdministrationController.defaultAppName = result.current_app_from_modal;
                            }
                            userAdministrationController.getApps();
                        }
                    });

                };

                //team user
                userAdministrationController.openTeamUserModal = function (roleName) {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'administration/user-team-modal.tpl.html',
                        controller: 'UserTeamAccessController as userTeamAccessController',
                        size: 'lg',
                        windowClass: '',
                        backdrop: 'static',
                        resolve: {
                            loginAppName: function () {
                                return userAdministrationController.appName;
                            },
                            loginRoleName: function () {
                                return userAdministrationController.loginRoleName;
                            },
                            applications: function () {
                                return userAdministrationController.loginUserApps;
                            },
                            target_applications: function () {
                                return userAdministrationController.applications;
                            },
                            defaultApplication: function () {
                                if (!userAdministrationController.contains(userAdministrationController.defaultApplication)) {
                                    userAdministrationController.defaultApplication = userAdministrationController.appName;
                                }
                                return userAdministrationController.defaultApplication;
                            },
                            loginRoles: function () {
                                if (!userAdministrationController.defaultApplication) {
                                    userAdministrationController.defaultApplication = userAdministrationController.appName;
                                }

                                return UserAdministrationService.getRolesByLoginUser(userAdministrationController.defaultApplication).then(
                                    function (data) {
                                        if (data === 'error' || data.length === 0) {
                                            return [];
                                        }
                                        else if (data) {
                                            return data;
                                        }
                                    },
                                    function () {
                                        $log.error("An error occurred while getting login user roles data");
                                    });
                            },
                            userRoles: function () {
                                return userAdministrationController.roles;
                            },
                            userName: function () {
                                return userAdministrationController.userName;
                            },
                            roleName: function () {
                                return roleName;
                            }
                        }
                    });

                    //update the grid in the controller
                    modalInstance.result.then(function (result) {
                        if (result.selectedTeam) {
                            userAdministrationController.gridTeamName = result.selectedTeam;

                            if (userAdministrationController.gridTeamName) {
                                userAdministrationController.searchObject = userAdministrationController.searchObject || {};

                                userAdministrationController.searchObject.person_team_name = userAdministrationController.gridTeamName;

                                $rootScope.$broadcast('uiGridParameterChange');

                            }

                        }

                    });

                };


                userAdministrationController.clearAll = function () {
                    $('.selectpicker').val(' ').selectpicker('refresh');// reset bootstrap-select selectpicker

                    userAdministrationController.gridApplication = {};
                    userAdministrationController.gridRole = {};

                    userAdministrationController.gridRoles = selectRoleOptions;

                    userAdministrationController.gridTeamName = null;

                    userAdministrationController.gridApi.grid.columns[0].filters[0].term = null;
                    userAdministrationController.gridApi.grid.columns[1].filters[0].term = null;
                    userAdministrationController.gridApi.grid.columns[2].filters[0].term = null;
                    userAdministrationController.gridApi.grid.columns[3].filters[0].term = null;
                    userAdministrationController.gridApi.grid.columns[4].filters[0].term = null;

                    userAdministrationController.searchObject = {};

                    $rootScope.$broadcast('uiGridParameterChange');


                };


                userAdministrationController.applicationFilterChanged = function () {
                    //Initialize searchInput Object
                    userAdministrationController.initialize_searchObject();

                    var validRolesForApplication = [];

                    // Get role for default application
                    UserAdministrationService.getSelectRoleOptions(userAdministrationController.gridApplication.name, 100, 1)
                        .then(function (response) {
                            validRolesForApplication = response;

                            if (userAdministrationController.gridRole.name && userAdministrationController.gridRole.name.length > 0) { // role selected
                                var resultRoleArray = [];

                                if (validRolesForApplication.length > 0) {
                                    resultRoleArray = validRolesForApplication.filter(function (role) {
                                        if (role.name === userAdministrationController.gridRole.name) {
                                            return true;
                                        }
                                    });
                                }

                                if (resultRoleArray.length > 0) { // found role
                                    userAdministrationController.gridRoles = validRolesForApplication; // set role dropdowm select options
                                    userAdministrationController.searchObject.person_role = userAdministrationController.gridRole.name;

                                } else { // reset role filter
                                    userAdministrationController.gridRoles = validRolesForApplication; // set role dropdowm select options
                                    $('.selected-role').val(' ').selectpicker('refresh');

                                }

                                userAdministrationController.searchObject.person_application = userAdministrationController.gridApplication.name;

                                if (userAdministrationController.gridTeamName) {
                                    userAdministrationController.searchObject.person_team_name = userAdministrationController.gridTeamName;
                                }

                                $rootScope.$broadcast('uiGridParameterChange');


                            } else { // no role selected
                                userAdministrationController.gridRoles = validRolesForApplication; // set role dropdowm select options

                                $('.selected-role').selectpicker('refresh');


                                userAdministrationController.searchObject.person_application = userAdministrationController.gridApplication.name;

                                $rootScope.$broadcast('uiGridParameterChange');

                            }
                        })
                        .catch(function (error) {
                            var errorMessage = 'An error occurred getting role options data' + error;
                            console.error(errorMessage);
                        });


                };

                userAdministrationController.initialize_searchObject = function () {

                    userAdministrationController.searchObject = userAdministrationController.searchObject || {};

                    userAdministrationController.searchObject.person_application = null;
                    userAdministrationController.searchObject.person_role = null;

                };


                userAdministrationController.roleFilterChanged = function () {
                    //Initialize searchInput Object
                    userAdministrationController.initialize_searchObject();

                    var validRolesForApplication = [];
                    if (userAdministrationController.gridApplication.name && userAdministrationController.gridApplication.name.length > 0) { // application selected
                        UserAdministrationService.getSelectRoleOptions(userAdministrationController.gridApplication.name, 100, 1)
                            .then(function (response) {
                                validRolesForApplication = response;

                                var resultRoleArray = [];
                                if (validRolesForApplication.length > 0) {
                                    resultRoleArray = validRolesForApplication.filter(function (role) {
                                        if (role.name === userAdministrationController.gridRole.name) {
                                            return true;
                                        }
                                    });
                                }

                                if (resultRoleArray.length > 0) {
                                    userAdministrationController.searchObject.person_application = userAdministrationController.gridApplication.name;
                                    userAdministrationController.searchObject.person_role = userAdministrationController.gridRole.name;

                                } else { // reset role filter
                                    userAdministrationController.searchObject.person_application = userAdministrationController.gridApplication.name;

                                    userAdministrationController.gridRoles = selectRoleOptions;
                                    $('.selected-role').val(' ').selectpicker('refresh');

                                }

                                $rootScope.$broadcast('uiGridParameterChange');


                            })
                            .catch(function (error) {
                                var errorMessage = 'An error occurred getting role options data' + error;
                                console.error(errorMessage);
                            });
                    } else { // no application selected
                        userAdministrationController.searchObject.person_role = userAdministrationController.gridRole.name;

                        $rootScope.$broadcast('uiGridParameterChange');


                    }

                };


                userAdministrationController.showHistoryModal = function () {
                    $uibModal.open({
                        templateUrl: 'administration/show-history-modal.tpl.html',
                        controller: 'ShowHistoryModalController as showHistoryModalController',
                        size: 'lg',
                        backdrop: 'static',
                        resolve: {
                            userName: function () {
                                return userAdministrationController.userName;
                            },
                            history: ['UserAdministrationService', function (UserAdministrationService) {
                                return UserAdministrationService.getUserHistory(undefined, undefined, undefined, undefined, userAdministrationController.userName)
                                    .then(function (response) {
                                        return response;
                                    })
                                    .catch(function (error) {
                                        $log.error('An error occurred while getting user history data');
                                    });
                            }]
                        }
                    });
                };

                userAdministrationController.getUserDetails = function (mySelectedRows) {
                    userAdministrationController.firstName = mySelectedRows[0].first_name;
                    userAdministrationController.middleName = mySelectedRows[0].middle_name;
                    userAdministrationController.lastName = mySelectedRows[0].last_name;
                    userAdministrationController.userName = mySelectedRows[0].user_name;
                    userAdministrationController.costCenter = mySelectedRows[0].cost_center_display_name;
                    userAdministrationController.active = mySelectedRows[0].active;

                    userAdministrationController.gender = mySelectedRows[0].gender;

                    userAdministrationController.workPhone = mySelectedRows[0].work_phone;
                    userAdministrationController.mobilePhone = mySelectedRows[0].mobile_phone;
                    userAdministrationController.emailAddress = mySelectedRows[0].email_address;

                    userAdministrationController.defaultAppName = '';

                    var sector = mySelectedRows[0].sector,
                        sectorDescription = mySelectedRows[0].sector_description,
                        division = mySelectedRows[0].division,
                        divisionDescription = mySelectedRows[0].division_description;

                    userAdministrationController.sector = sector + ' ' + '-' + ' ' + sectorDescription;
                    userAdministrationController.division = division + ' ' + '-' + ' ' + divisionDescription;

                    userAdministrationController.job_description = mySelectedRows[0].job_description;

                    userAdministrationController.displayName = userAdministrationController.lastName + ', ' + userAdministrationController.firstName + ' (' + userAdministrationController.userName + ')';
                    userAdministrationController.getApps();

                };

                userAdministrationController.getApps = function () {
                    UserAdministrationService.getApplicationsByUser(userAdministrationController.userName).then(
                        function (data) {

                            if (data === "{}") { //API issue - instead of returning an empty array, it is returnin and empty object literal
                                data = [];
                            }

                            if (data === 'error') {
                                userAdministrationController.applications = [];
                                userAdministrationController.application = '';
                                userAdministrationController.defaultApplication = userAdministrationController.appName;
                                userAdministrationController.roles = [];
                                unblockUserPortlets();
                                userAdministrationController.errorMessage = 'An error occurred while getting applications for User: ' + userAdministrationController.userName;
                                userAdministrationController.errorHandling(userAdministrationController.errorMessage);
                            }
                            else {
                                userAdministrationController.applications = $filter('orderBy')(data, 'name');
                                if (userAdministrationController.applications.length > 0) {
                                    userAdministrationController.application = userAdministrationController.applications[0].name;
                                    userAdministrationController.defaultApplication = userAdministrationController.applications[0].name;
                                    userAdministrationController.activeTab = 0;

                                    if (userAdministrationController.defaultAppName && userAdministrationController.defaultAppName.length > 0) {
                                        userAdministrationController.setActiveTabInit(userAdministrationController.defaultAppName);
                                    }
                                    else if (appName) {
                                        userAdministrationController.setActiveTabInit(appName);
                                    }

                                    userAdministrationController.getLoginRoles();
                                    userAdministrationController.getRoles();
                                }
                                else {
                                    userAdministrationController.applications = [];
                                    userAdministrationController.application = '';
                                    userAdministrationController.defaultApplication = userAdministrationController.appName;
                                    userAdministrationController.roles = [];
                                }
                            }
                        },
                        function () {
                            unblockUserPortlets();
                            $log.error("An error occurred while getting applications for " + userAdministrationController.userName);
                        });
                };

                userAdministrationController.getLoginRoles = function () {
                    userAdministrationController.loginRoles = [];

                    if (userAdministrationController.contains(userAdministrationController.application)) {
                        UserAdministrationService.getRolesByLoginUser(userAdministrationController.application).then(
                            function (data) {

                                if (data === "{}") { //API issue - instead of returning an empty array, it is returnin and empty object literal
                                    data = [];
                                }

                                if (data === 'error' || data.length === 0) {
                                    userAdministrationController.loginRoles = [];
                                }
                                else if (data) {
                                    userAdministrationController.loginRoles = data;
                                }

                            },
                            function () {
                                unblockUserPortlets();
                                $log.error("An error occurred while getting login user roles data");

                            });
                    }
                };

                userAdministrationController.getRoles = function () {
                    userAdministrationController.roles = [];
                    if (userAdministrationController.userName && userAdministrationController.application) {
                        UserAdministrationService.getRolesByUser(userAdministrationController.userName, userAdministrationController.application).then(
                            function (data) {

                                if (data === "{}") { //API issue - instead of returning an empty array, it is returnin and empty object literal
                                    data = [];
                                }

                                if (data === 'error') {
                                    userAdministrationController.roles = [];
                                    unblockUserPortlets();
                                    userAdministrationController.errorMessage = 'An error occurred while getting roles for User: ' + userAdministrationController.userName + ' and application: ' + userAdministrationController.application;
                                    userAdministrationController.errorHandling(userAdministrationController.errorMessage);
                                }
                                else if (data) {
                                    userAdministrationController.roles = $filter('orderBy')(data, ['-default_role', 'name']);
                                }

                                if (userAdministrationController.roles.length > 0) {
                                    for (var j = 0; j < userAdministrationController.roles.length; j++) {
                                        userAdministrationController.getTeams(userAdministrationController.userName, userAdministrationController.application, userAdministrationController.roles[j].name, j);
                                    }
                                }
                            },
                            function () {
                                unblockUserPortlets();
                                $log.error("An error occurred while getting roles for " + userAdministrationController.userName);

                            });
                    }
                };

                userAdministrationController.getTeams = function (userName, application, roleName, index) {
                    UserAdministrationService.getTeamsByUser(userName, application, roleName).then(
                        function (data) {

                            if (data === "{}") { //API issue - instead of returning an empty array, it is returnin and empty object literal
                                data = [];
                            }

                            if (data === 'error') {
                                userAdministrationController.roles[index].teams = [];
                                unblockUserPortlets();
                                userAdministrationController.errorMessage = 'An error occurred while getting teams for User: ' + userName + ', application: ' + application + ' and role: ' + roleName;
                                userAdministrationController.errorHandling(userAdministrationController.errorMessage);
                            }
                            else if (data && userAdministrationController.roles[index]) {
                                userAdministrationController.roles[index].teams = $filter('orderBy')(data, ['-default_team', 'team_name']);
                            }
                            unblockUserPortlets();
                        },
                        function () {
                            unblockUserPortlets();
                            $log.error("An error occurred while getting teams for " + userAdministrationController.userName);
                        });
                };

                userAdministrationController.errorHandling = function (errorMessage) {
                    ModalDialogService.confirm({
                        bodyText: errorMessage,
                        title: 'Error Message',
                        okText: 'Ok'
                    });
                };

                userAdministrationController.contains = function (application) {

                    userAdministrationController.applicationAuthorizedForLoginUser = false;

                    for (var i = 0; i < userAdministrationController.loginUserApps.length; i++) {
                        if (userAdministrationController.loginUserApps[i].name === application) {

                            userAdministrationController.applicationAuthorizedForLoginUser = true;

                            return true;
                        }
                    }
                    return false;
                };


                userAdministrationController.viewSecuredObjects = function(applicationName, roleName) {
                    StgStatesService.goToState('securedObjects', {
                        application_name: applicationName,
                        role_name: roleName
                    });
                };

                /** PRIVATE FUNCTIONS **/

                function defineUserSearchGridOptions() {
                    return {
                        paginationPageSizes: [25, 50, 75],
                        paginationPageSize: 25, // pagination out of box
                        virtualizationThreshold: 25,
                        useExternalPagination: true,
                        useExternalFiltering: true,
                        useExternalSorting: true,
                        enableFiltering: true, //step1 to enable all grid columns filtering
                        enableRowSelection: true,
                        enableRowHeaderSelection: false,
                        multiSelect: false,
                        modifierKeysToMultiSelect: false,
                        noUnselect: true,
                        showColumnFooter: false,
                        treeRowHeaderAlwaysVisible: true,
                        enableGridMenu: true, //true will display grid menu on top-right
                        enableSorting: true,
                        columnDefs: [
                            {
                                field: 'user_name',
                                displayName: "User ID",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'last_name',
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'first_name',
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'cost_center_name',
                                minWidth: 100,
                                displayName: "Cost Center",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'active',
                                minWidth: 60,
                                displayName: "Status",
                                filter: {
                                    placeholder: '',
                                    type: uiGridConstants.filter.SELECT,
                                    selectOptions: [{value: true, label: 'Active'}, {value: false, label: 'Inactive'}]
                                },
                                cellFilter: 'statusFilter'
                            }
                        ]
                    };
                }

                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                    // emitted selected rows and row selected event from Directive controller

                    // integrated  the existing function with the new event fron stg-ui-grid
                    userAdministrationController.mySelectedRows = mySelectedRows;

                    if (userAdministrationController.mySelectedRows.length > 0) {
                        userAdministrationController.getUserDetails(userAdministrationController.mySelectedRows);
                    }
                });


                function blockUserPortlets() {
                    blockUI.instances.get("blockui_user_details_container").start();
                }

                function unblockUserPortlets() {
                    //added a slight buffer here to allow the UI to finish executing the repeaters for roles and teams before we unblock the UI
                    setTimeout(function () {
                        blockUI.instances.get("blockui_user_details_container").stop();
                    }, 500);
                }

                initialize();
            }
        ]);
})();
