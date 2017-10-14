'use strict';

(function () {

    angular.module('adams.user.administration.add.user.access.modal.controller', ['common.modules.logging'])
        .controller('AddUserAccessModalController', ['$rootScope', '$scope', '$uibModalInstance', 'blockUI', '$timeout', '$interval', 'ModalDialogService', 'loginAppName', 'loginRoleName',
            'applications', 'target_applications', 'defaultApplication', 'loginRoles', 'userRoles', 'userName', 'roleName', 'UserAdministrationService', 'ADAMS_CONSTANTS', '$log',
            function($rootScope, $scope, $uibModalInstance, blockUI, $timeout, $interval, ModalDialogService, loginAppName, loginRoleName,
                     applications, target_applications, defaultApplication, loginRoles, userRoles, userName, roleName, UserAdministrationService, ADAMS_CONSTANTS, $log) {

                var addUserAccessModalController = this;

                addUserAccessModalController.target_applications = target_applications;

                $scope.$on('hierarchyTreeTeamSelectionChange', function($event, refId, isSelected, node) {
                    if(addUserAccessModalController.teams.length > 0){
                        if (node.team_id === '1') {
                            addUserAccessModalController.teams = [];
                            addUserAccessModalController.teams.push(node);
                            return;
                        }

                        if (addUserAccessModalController.contains(node.team_path)) {
                            return;
                        }
                        else {
                            addUserAccessModalController.teams.push(node);
                        }
                    }
                    else {
                        addUserAccessModalController.teams.push(node);
                    }
                    addUserAccessModalController.teams.sort();

                    for (var i = 0; i < addUserAccessModalController.teams.length; i++) {
                        addUserAccessModalController.teams[i].team_display_name = addUserAccessModalController.teams[i].team_name + ' - ' + addUserAccessModalController.teams[i].team_description;
                    }

                    if (addUserAccessModalController.role.length > 0) {
                        addUserAccessModalController.checkforParent();
                    }
                });


                function initialize() {
                    addUserAccessModalController.teams = [];
                    addUserAccessModalController.searchTeamName = '';
                    addUserAccessModalController.searchTeamDescription = '';
                    addUserAccessModalController.searchTeamType = '';
                    addUserAccessModalController.sort = '';
                    addUserAccessModalController.applications = angular.copy(applications);
                    addUserAccessModalController.application = defaultApplication || addUserAccessModalController.applications[0].name;
                    addUserAccessModalController.userRoles = userRoles;
                    addUserAccessModalController.loginRoles = loginRoles;
                    addUserAccessModalController.loginUserApp = loginAppName;
                    addUserAccessModalController.loginUserRole = loginRoleName;
                    addUserAccessModalController.userName = userName;

                    if(roleName) {
                        addUserAccessModalController.roleName = roleName;
                        addUserAccessModalController.role = roleName;
                    }
                    else {
                        addUserAccessModalController.roleName = '';
                        addUserAccessModalController.role = ' ';
                    }

                    addUserAccessModalController.hierarchyTeam = false;

                    addUserAccessModalController.gridOptions = defineUserSearchGridOptions();

                    addUserAccessModalController.messageFieldConfig = {
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

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi, refId) {
                    // $interval whilst we wait for the grid to digest the data we just gave it
                    $interval( function() {

                        gridApi.selection.selectRow(gridOptions.data[0]);
                    }, 0, 1);
                });


                // destroy the timeout function
                $scope.$on("$destroy", function (event) {
                    if (angular.isDefined($scope.filterTimeout)) {
                        $timeout.cancel($scope.filterTimeout);
                    }
                });

                addUserAccessModalController.getGridData = function(pageSize, pageNumber, sort, searchInput) {

                    addUserAccessModalController.searchTeamName = getSearchValue(searchInput, "team_name");
                    addUserAccessModalController.searchTeamDescription = getSearchValue(searchInput, "team_description");
                    addUserAccessModalController.searchTeamType = getSearchValue(searchInput, "team_type_name");
                    return UserAdministrationService.getHierarchicalTeams(pageSize, pageNumber, addUserAccessModalController.loginUserApp, addUserAccessModalController.loginUserRole,
                        addUserAccessModalController.searchTeamName, addUserAccessModalController.searchTeamDescription, addUserAccessModalController.searchTeamType, sort);
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

                addUserAccessModalController.itemSelected = function (index) {
                    if(index === 1) {
                        addUserAccessModalController.application = addUserAccessModalController.application.name;
                        addUserAccessModalController.getLoginUserRoles();
                    }
                    else {
                        addUserAccessModalController.role = addUserAccessModalController.role.name;
                        addUserAccessModalController.checkforParent();

                    }
                };

                addUserAccessModalController.teamIndex = function(index) {
                    addUserAccessModalController.teams.splice(index, 1);
                };


                addUserAccessModalController.doesTargetContainAppAndRole = function (){

                    if (addUserAccessModalController.target_applications.length > 0) {

                        var appFound = false;

                        for (var i = 0; i < addUserAccessModalController.target_applications.length; i++) {
                            if (addUserAccessModalController.target_applications[i].name === addUserAccessModalController.application) {
                                appFound = true;
                                break;
                            }
                        }


                        if (appFound) { // app found

                            var roleFound;

                            roleFound = doesTargetContainRole();

                            if (roleFound) { // role found
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                };

                function doesTargetContainRole() {
                    var roleFound = false;
                    if (addUserAccessModalController.userRoles.length > 0) {
                        for (var j = 0; j < addUserAccessModalController.userRoles.length; j++) {
                            if (addUserAccessModalController.userRoles[j].name === addUserAccessModalController.role) {

                                roleFound = true;
                                break;
                            }
                        }
                    }

                    return roleFound;
                }
                addUserAccessModalController.checkforParent = function() {

                    if (addUserAccessModalController.doesTargetContainAppAndRole() && addUserAccessModalController.teams.length > 0 ) {
                        addUserAccessModalController.message = '';
                        addUserAccessModalController.removedTeams = [];
                        addUserAccessModalController.selectedRoles = [];
                        addUserAccessModalController.selectedRoles.push({
                            name: addUserAccessModalController.role,
                            teams: []
                        });
                        for (var i = 0; i < addUserAccessModalController.teams.length; i++) {
                            addUserAccessModalController.selectedRoles[0].teams.push({
                                team_name: addUserAccessModalController.teams[i].team_name,
                                team_path: addUserAccessModalController.teams[i].team_path,
                                team_display_name: addUserAccessModalController.teams[i].team_display_name,
                                team_display_path: addUserAccessModalController.teams[i].team_display_path
                            });
                        }

                        for (var j = 0; j < addUserAccessModalController.selectedRoles[0].teams.length; j++) {
                            var teams = addUserAccessModalController.selectedRoles[0].teams;

                            addUserAccessModalController.clearChildTeam(teams[j].team_name, teams[j].team_path, teams[j].team_display_name);
                        }

                        if (addUserAccessModalController.removedTeams.length > 0) {
                            for (var k = 0; k < addUserAccessModalController.removedTeams.length; k++) {
                                addUserAccessModalController.message += '<br>' + addUserAccessModalController.removedTeams[k];
                            }

                            ModalDialogService.alert({
                                bodyHTML: 'User already have access to Parent Team(s) for the following team(s): <br>' + addUserAccessModalController.message,
                                title: 'Selected Teams',
                                size: 'md'
                            });
                        }
                    }


                };

                addUserAccessModalController.clearChildTeam = function (teamName, teamPath, teamDisplayName) {
                    for (var x=0; x <  addUserAccessModalController.userRoles.length; x++) {
                        var roles = addUserAccessModalController.userRoles[x];
                        if (addUserAccessModalController.role === roles.name) {
                            for (var i=0; i < roles.teams.length; i++) {

                                var pathTeamsNames;
                                pathTeamsNames = extractTeamNamesFromPath(teamPath);

                                if (searchTeamPath(pathTeamsNames, roles.teams[i].team_name)) {
                                    for(var y=0; y < addUserAccessModalController.teams.length; y++) {
                                        if(addUserAccessModalController.teams[y].team_display_name === teamDisplayName) {
                                            addUserAccessModalController.teams.splice(y, 1);
                                            addUserAccessModalController.removedTeams.push(teamDisplayName);
                                            break;
                                        }
                                    }
                                }

                            }
                        }
                    }
                };

                function extractTeamNamesFromPath(teamPath) {
                    var pathTeamsNames;
                    var resultPathTeamsNames;

                    pathTeamsNames = teamPath.split('/');

                    resultPathTeamsNames = pathTeamsNames.filter(function(pathTeamsName) { // remove empty entries
                        if (pathTeamsName.length === 0) {
                            return false;
                        } else {
                            return true;
                        }
                    });

                    return resultPathTeamsNames;
                }

                function searchTeamPath(pathTeamsNames, teamName) {
                    for ( var i = 0; i < pathTeamsNames.length; i++) {
                        if (pathTeamsNames[i] === teamName) {
                            return true;
                        }
                    }

                    return false;
                }

                addUserAccessModalController.contains = function (teamPath) {
                    var pathTeamsNames;
                    pathTeamsNames = extractTeamNamesFromPath(teamPath);

                    for (var i=0; i < addUserAccessModalController.teams.length; i++) {
                        if (searchTeamPath(pathTeamsNames, addUserAccessModalController.teams[i].team_name)) {
                            return true;
                        }
                        else if (addUserAccessModalController.teams[i].team_path.includes(teamPath)) {
                            addUserAccessModalController.teams.splice(i, 1);
                            i--;
                        }
                    }
                    return false;
                };

                addUserAccessModalController.getLoginUserRoles = function() {
                    UserAdministrationService.getRolesByLoginUser(addUserAccessModalController.application, loginRoleName).then(
                        function(data){
                            if(data) {
                                if (data === 'error') {
                                    addUserAccessModalController.loginRoles = [];
                                } else {
                                    addUserAccessModalController.loginRoles = data;
                                    addUserAccessModalController.role = ' ';
                                }
                            } else {
                                addUserAccessModalController.loginRoles = [];
                            }
                        },
                        function(){
                            $log.error("An error occurred while getting login user roles data");
                        });
                };

                addUserAccessModalController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };

                addUserAccessModalController.submit = function() {

                    blockUI.instances.get("add-user-access-modal").start();

                    var teams = {'teams': []};
                    for (var i =0; i < addUserAccessModalController.teams.length; i++) {
                        teams.teams.push({defaultTeam: null, sourceSystemId: addUserAccessModalController.teams[i].source_system_id, teamDescription: null,
                            teamDisplayPath: null, teamName: addUserAccessModalController.teams[i].team_name,
                            teamPath: null, teamType: null});
                    }

                    UserAdministrationService.addTeams(userName, addUserAccessModalController.application, addUserAccessModalController.role, JSON.stringify(teams)).then(
                        function(data){

                            blockUI.instances.get("add-user-access-modal").stop();

                            $uibModalInstance.close({action: ADAMS_CONSTANTS.MODAL_ACTION_ADD, message: data[0], current_app_from_modal: addUserAccessModalController.application});
                            if (data === 'error') {
                                ModalDialogService.confirm({
                                    bodyText: 'An error occurred while adding Team(s)',
                                    title: 'Error Message',
                                    okText: 'Ok'
                                });
                            }
                        },
                        function(error){

                            blockUI.instances.get("add-user-access-modal").stop();

                            ModalDialogService.alert({
                                bodyText: error,
                                title: 'Error'
                            });
                        });
                };

                addUserAccessModalController.switchTab = function(id) {
                    if(id === 'hierarchyTeam')
                    {
                        addUserAccessModalController.hierarchyTeam = true;
                    }
                    else {
                        addUserAccessModalController.hierarchyTeam = false;
                    }
                };

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                    // emitted gridOptions and gridApi from Directive controller
                    addUserAccessModalController.gridApi = gridApi;
                });

                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                    // emitted selected rows from Directive controller
                    if (selectionEvent) {
                        var elemClass = selectionEvent.target.className || selectionEvent.srcElement.className;

                        if(elemClass.includes("ui-grid-icon-plus-squared") || elemClass.includes("ui-grid-icon-minus-squared")) {
                            addUserAccessModalController.gridApi.selection.unSelectRow(mySelectedRows[0]);
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
                        autoRowSelection: false,
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
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'team_description',
                                displayName: "Description",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'team_type_name',
                                displayName: "Type",
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
                        if(addUserAccessModalController.teams.length > 0){
                            if (addUserAccessModalController.contains(node.team_path)) {
                                return;
                            }
                            else {
                                addUserAccessModalController.teams.push(node);
                            }
                        }
                        else {
                            addUserAccessModalController.teams.push(node);
                        }
                    }

                    if (addUserAccessModalController.teams.length > 0) {
                        for (var i = 0; i < addUserAccessModalController.teams.length; i++) {
                            addUserAccessModalController.teams[i].team_display_name = addUserAccessModalController.teams[i].team_name + ' - ' + addUserAccessModalController.teams[i].team_description;
                        }
                    }

                    if (addUserAccessModalController.role.length > 0) {
                        addUserAccessModalController.checkforParent();

                    }
                }

                initialize();
            }
        ]);
})();