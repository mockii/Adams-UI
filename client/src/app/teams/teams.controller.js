'use strict';

(function () {

    angular.module('adams.teams.controller', ['common.modules.logging'])
        .controller('TeamsController', ['$rootScope', '$scope', '$timeout', '$interval', 'ModalDialogService',
                'userAppName', 'userRoleName', 'UserAdministrationService', 'uiGridConstants', 'TEAMS_TYPE',
            function($rootScope, $scope, $timeout, $interval, ModalDialogService, userAppName, userRoleName,
                     UserAdministrationService, uiGridConstants, TEAMS_TYPE) {

                var teamsController = this;

                $scope.$on('hierarchyTreeTeamSelectionChange', function($event, refId, isSelected, node) {
                    teamsController.selectedTeam = node;
                    teamsController.teamStatus = teamsController.selectedTeam.team_status_ind.trim() === 'A' ? true : false;
                });

                function initialize() {
                    teamsController.searchTeamName = '';
                    teamsController.searchTeamDescription = '';
                    teamsController.searchTeamType = '';
                    teamsController.sort = '';
                    teamsController.userAppName = userAppName;
                    teamsController.userRoleName = userRoleName;

                    teamsController.hierarchyTeam = false;

                    teamsController.gridOptions = defineUserSearchGridOptions();
                }

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi, refId) {
                    // $interval whilst we wait for the grid to digest the data we just gave it
                    $interval( function() {
                        teamsController.selectedTeam = gridOptions.data[0];
                        teamsController.teamStatus = teamsController.selectedTeam.team_status_ind.trim() === 'A' ? true : false;
                        gridApi.selection.selectRow(teamsController.selectedTeam);
                    }, 0, 1);
                });

                // destroy the timeout function
                $scope.$on("$destroy", function (event) {
                    if (angular.isDefined($scope.filterTimeout)) {
                        $timeout.cancel($scope.filterTimeout);
                    }
                });

                teamsController.getGridData = function(pageSize, pageNumber, sort, searchInput) {
                    teamsController.searchTeamName = getSearchValue(searchInput, "team_name");
                    teamsController.searchTeamDescription = getSearchValue(searchInput, "team_description");
                    teamsController.searchTeamType = getSearchValue(searchInput, "team_type_name");
                    return UserAdministrationService.getHierarchicalTeams(pageSize, pageNumber, teamsController.userAppName, teamsController.userRoleName,
                        teamsController.searchTeamName, teamsController.searchTeamDescription, teamsController.searchTeamType, sort);
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

                teamsController.getTeamStatus = function() {
                    /*if(teamsController.hasOwnProperty('teamStatus') && typeof(teamsController.teamStatus) === "boolean"){
                        return teamsController.teamStatus;
                    } else {
                        return teamsController.selectedTeam && teamsController.selectedTeam.team_status_ind.trim() === 'A' ? true : false;
                    }*/
                    return teamsController.selectedTeam && teamsController.selectedTeam.team_status_ind.trim() === 'A' ? true : false;
                };

                teamsController.switchTab = function(id) {
                    teamsController.hierarchyTeam = id === 'hierarchyTeam' ? true : false;
                };

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                    // emitted gridOptions and gridApi from Directive controller
                    teamsController.gridApi = gridApi;
                });

                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                    // emitted selected rows from Directive controller
                    if (selectionEvent) {
                        var elemClass = selectionEvent.target.className || selectionEvent.srcElement.className;

                        if(elemClass.includes("ui-grid-icon-plus-squared") || elemClass.includes("ui-grid-icon-minus-squared")) {
                            teamsController.gridApi.selection.unSelectRow(mySelectedRows[0]);
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
                                    placeholder: '',
                                    type: uiGridConstants.filter.SELECT,
                                    selectOptions: TEAMS_TYPE
                                },
                                cellFilter: ''
                            }
                        ]
                    };
                }

                function handleRowSelectionChange(selectedRows) {
                    teamsController.selectedTeam = selectedRows[0];
                    teamsController.teamStatus = teamsController.selectedTeam.team_status_ind.trim() === 'A' ? true : false;
                }

                initialize();
            }
        ]);
})();