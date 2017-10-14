'use strict';

(function () {

    angular.module('adams.user.administration.team.access.modal.controller', ['common.modules.logging'])
        .controller('UserTeamAccessController', ['$rootScope', '$scope', '$uibModalInstance', '$interval', 'ModalDialogService', 'loginAppName', 'loginRoleName', 'applications', 'defaultApplication', 'loginRoles', 'userRoles', 'userName', 'roleName', 'UserAdministrationService', 'ADAMS_CONSTANTS', '$timeout', '$log',
            function($rootScope, $scope, $uibModalInstance, $interval, ModalDialogService, loginAppName, loginRoleName, applications, defaultApplication, loginRoles, userRoles, userName, roleName, UserAdministrationService, ADAMS_CONSTANTS, $timeout, $log) {
                var userTeamAccessController = this,
                    userSearchGridPromise;

                $scope.$on('hierarchyTreeTeamSelectionChange', function($event, refId, isSelected, node) {

                    if(userTeamAccessController.teams.length > 0){
                        if (node.team_id === '1') {
                            userTeamAccessController.teams = [];
                            userTeamAccessController.teams.push(node);
                            return;
                        }

                        if (userTeamAccessController.contains(node.team_display_name, node.team_display_path)) {
                            return;
                        }
                        else {
                            userTeamAccessController.teams.push(node);
                        }
                    }
                    else {
                        userTeamAccessController.teams.push(node);
                    }
                    userTeamAccessController.teams.sort();

                    if(userTeamAccessController.role && userTeamAccessController.role.length > 0) {
                        userTeamAccessController.checkforParent();
                    }
                });

                function initialize() {
                    userTeamAccessController.teams = [];

                    userTeamAccessController.searchTeamName = '';
                    userTeamAccessController.searchTeamDescription = '';
                    userTeamAccessController.searchTeamType = '';

                    userTeamAccessController.applications = angular.copy(applications);
                    userTeamAccessController.application = defaultApplication || userTeamAccessController.applications[0].name;
                    userTeamAccessController.userRoles = userRoles;
                    userTeamAccessController.loginRoles = loginRoles;
                    userTeamAccessController.loginUserApp = loginAppName;
                    userTeamAccessController.loginUserRole = loginRoleName;

                    if(roleName) {
                        userTeamAccessController.roleName = '';
                        userTeamAccessController.role = ' ';
                    }
                    else {
                        userTeamAccessController.roleName = roleName;
                        userTeamAccessController.role = roleName;
                    }

                    userTeamAccessController.hierarchyTeam = false;

                    userTeamAccessController.gridOptions = defineUserSearchGridOptions();



                    userTeamAccessController.messageFieldConfig = {
                        height: 175,
                        toolbar: [
                            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                            ['textsize', ['fontsize']],
                            ['fontclr', ['color']],
                            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
                            ['height', ['height']],
                            ['table', ['table']],
                            ['insert', ['link','video','hr']],
                            ['view', ['codeview']]
                        ]
                    };
                }


                userTeamAccessController.getGridData = function(pageSize, pageNumber, sort, searchInput) {

                    userTeamAccessController.searchTeamName = getSearchValue(searchInput, "team_name");
                    userTeamAccessController.searchTeamDescription = getSearchValue(searchInput, "team_description");
                    userTeamAccessController.searchTeamType = getSearchValue(searchInput, "team_type_name");

                    return UserAdministrationService.getHierarchicalTeams(pageSize, pageNumber, userTeamAccessController.loginUserApp, userTeamAccessController.loginUserRole,
                        userTeamAccessController.searchTeamName, userTeamAccessController.searchTeamDescription, userTeamAccessController.searchTeamType, sort);
                };

                function getSearchValue(searchInput, propertyName){
                    var value = "";
                    if(searchInput && angular.isArray(searchInput.search)){
                        angular.forEach(searchInput.search, function(searchObject){
                            if(searchObject.property === propertyName){
                                value = searchObject.value || "";
                            }
                        });
                    }
                    return value;
                }

                userTeamAccessController.itemSelected = function (index) {
                    if(index === 1) {
                        userTeamAccessController.application = userTeamAccessController.application.name;
                        userTeamAccessController.getLoginUserRoles();
                    }
                    else {
                        userTeamAccessController.role = userTeamAccessController.role.name;
                        userTeamAccessController.checkforParent();
                    }
                };

                userTeamAccessController.teamIndex = function(index) {
                    userTeamAccessController.teams.splice(index, 1);
                };

                userTeamAccessController.checkforParent = function() {
                    if (userTeamAccessController.teams.length > 0) {
                        userTeamAccessController.message = '';
                        userTeamAccessController.removedTeams = [];
                        userTeamAccessController.selectedRoles = [];
                        userTeamAccessController.selectedRoles.push({name: userTeamAccessController.role, teams: []});
                        for (var i = 0; i < userTeamAccessController.teams.length; i++) {
                            userTeamAccessController.selectedRoles[0].teams.push({team_display_name: userTeamAccessController.teams[i].team_display_name, team_display_path: userTeamAccessController.teams[i].team_display_path});
                        }
                        for (var j = 0; j < userTeamAccessController.selectedRoles[0].teams.length; j++) {
                            var teams = userTeamAccessController.selectedRoles[0].teams;
                            userTeamAccessController.clearChildTeam(teams[j].team_display_name, teams[j].team_display_path);
                        }

                        if(userTeamAccessController.removedTeams.length > 0) {
                            for (var k = 0; k < userTeamAccessController.removedTeams.length; k++) {
                                userTeamAccessController.message += '<br>' + userTeamAccessController.removedTeams[k];
                            }

                            ModalDialogService.alert({
                                bodyHTML: 'User already have access to Parent Team(s) for the following team(s): <br>' + userTeamAccessController.message,
                                title: 'Selected Teams',
                                size: 'md'
                            });
                        }
                    }
                };

                userTeamAccessController.clearChildTeam = function (text, path) {
                    for (var x=0; x <  userTeamAccessController.userRoles.length; x++) {
                        var roles = userTeamAccessController.userRoles[x];
                        if (userTeamAccessController.role === roles.name) {
                            for (var i=0; i < roles.teams.length; i++) {
                                if (path.includes(roles.teams[i].team_display_path) || roles.teams[i].team_name + '-' + roles.teams[i].team_description === text) {
                                    for(var y=0; y < userTeamAccessController.teams.length; y++) {
                                        if(userTeamAccessController.teams[y].team_display_name === text) {
                                            userTeamAccessController.teams.splice(y, 1);
                                            userTeamAccessController.removedTeams.push(text);
                                            break;
                                        }
                                    }
                                }

                            }
                        }
                    }
                };

                userTeamAccessController.contains = function (text, path) {
                    for (var i=0; i < userTeamAccessController.teams.length; i++) {
                        if (userTeamAccessController.teams[i].team_display_name === text || path.includes(userTeamAccessController.teams[i].team_display_path)) {
                            return true;
                        }
                        else if (userTeamAccessController.teams[i].team_display_path.includes(path)) {
                            userTeamAccessController.teams.splice(i, 1);
                            i--;
                        }
                    }
                    return false;
                };

                userTeamAccessController.getLoginUserRoles = function() {
                    UserAdministrationService.getRolesByLoginUser(userTeamAccessController.application, loginRoleName).then(
                        function(data){
							if (data) {
								if (data === 'error') {
									userTeamAccessController.loginRoles = [];
								}
								else {
									userTeamAccessController.loginRoles = data;
									userTeamAccessController.role = ' ';
								}
								
							} else {
								userTeamAccessController.loginRoles = [];
							}
                            
                        },
                        function(){
                            $log.error("An error occurred while getting login user roles data");
                        });
                };

                userTeamAccessController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };

                userTeamAccessController.submit = function() {
                    $uibModalInstance.close({selectedTeam: userTeamAccessController.teams[0].team_name});
                };

                userTeamAccessController.switchTab = function(id) {
                    if(id === 'hierarchyTeam')
                    {
                        userTeamAccessController.hierarchyTeam = true;
                    }
                    else {
                        userTeamAccessController.hierarchyTeam = false;
                    }
                };

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                    // emitted gridOptions and gridApi from Directive controller
                    userTeamAccessController.gridApi = gridApi;
                });

                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                    // emitted selected rows from Directive controller
                    if (selectionEvent) {
                        var elemClass = selectionEvent.target.className || selectionEvent.srcElement.className;

                        if(elemClass.includes("ui-grid-icon-plus-squared") || elemClass.includes("ui-grid-icon-minus-squared")) {
                            userTeamAccessController.gridApi.selection.unSelectRow(mySelectedRows[0]);
                        }
                        else {
                            handleRowSelectionChange(mySelectedRows);
                        }
                    }
                });

                /** PRIVATE FUNCTIONS **/

                function defineUserSearchGridOptions() {
                    return {
                        paginationPageSizes: [25, 50, 75],
                        paginationPageSize: 25, // pagination out of box
                        virtualizationThreshold: 25,
                        useExternalPagination: true,
                        useExternalFiltering: true,
                        enableFiltering: true, //step1 to enable all grid columns filtering
                        enableRowSelection: true,
                        enableRowHeaderSelection: false,
                        multiSelect: false,
                        modifierKeysToMultiSelect: false,
                        noUnselect: false,
                        showColumnFooter: false,
                        treeRowHeaderAlwaysVisible: true,
                        enableGridMenu: true, //true will display grid menu on top-right
                        enableSorting: true,
                        enableExpandable: true,
                        enableExpandableRowHeader : true,
                        expandableRowTemplate: '<div team-display-path team-path="row.entity.team_display_path"></div>',
                        expandableRowHeight: 125,
                        //subGridVariable will be available in subGrid scope
                        expandableRowScope: {
                            subGridVariable: 'subGridScopeVariable'
                        },
                        columnDefs: [
                            {   field: 'team_name',
                                displayName: "Team Name",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'team_description',
                                displayName: "Description",
                                minWidth: 200,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'team_type_name',
                                displayName: "Type",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            }
                        ]
                    };
                }

                function handleRowSelectionChange(selectedRows) {
                    //Do something when a row is selected
                    var node = selectedRows[0];

                    if(node) {
                        if(userTeamAccessController.teams.length > 0){
                            if (userTeamAccessController.contains(node.team_name + ' - ' + node.team_description, node.team_display_path)) {
                                return;
                            }
                            else {
                                userTeamAccessController.teams.push(node);
                            }
                        }
                        else {
                            userTeamAccessController.teams.push(node);
                        }
                    }

                    if (userTeamAccessController.teams.length > 0) {
                        for (var i = 0; i < userTeamAccessController.teams.length; i++) {
                            userTeamAccessController.teams[i].team_display_name = userTeamAccessController.teams[i].team_name + ' - ' +
                                userTeamAccessController.teams[i].team_description;
                        }
                    }

                    if(userTeamAccessController.role.length > 0) {
                        userTeamAccessController.checkforParent();
                    }
                }

                initialize();
            }
        ]);
})();