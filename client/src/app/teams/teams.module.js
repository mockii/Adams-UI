/**
 * Created by ChouhR01 on 10/30/2017.
 */


'use strict';

(function () {

    angular.module('adams.teams', ['adams.teams.controller', 'adams.user.administration.service', 'adams.teams.constants'])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('teams', {
                    url: "/teams",
                    templateUrl: "teams/teams.tpl.html",
                    controller: "TeamsController as teamsController",
                    data: {
                        pageTitle: "Teams"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'teams',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/teams.css'
                                ]
                            });
                        }],
                        userAppName: function(UserAdministrationService) { return UserAdministrationService.getRBACAppName();},
                        userRoleName: function(UserAdministrationService) { return UserAdministrationService.getRoleName();}
                    }
                });
        }
        ]);
})();
