'use strict';

(function () {

    angular.module('adams.user.administration', ['adams.user.administration.controller'])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('userAdministration', {
                    url: "/useradministration?appName&roleName",
                    templateUrl: "administration/user.administration.tpl.html",
                    controller: "UserAdministrationController as userAdministrationController",
                    data: {
                        pageTitle: "User Administration"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'userAdministration',
                                insertBefore: '#ng_load_plugins_after',
                                 files: [
                                    'css/user-administration.css'
                                ]
                            });
                        }],
                        appName : function($stateParams){
                            return $stateParams.appName;
                        },
                        roleName : function($stateParams){
                            return $stateParams.roleName;
                        },
                        userData: ['UserAdministrationService', function(UserAdministrationService) {
                            return UserAdministrationService.getApplicationsByLoginUser();
                        }],
                        selectApplicationOptions: ['UserAdministrationService', function(UserAdministrationService) {
                            return UserAdministrationService.getSelectApplicationOptions(100, 1);
                        }],
                        selectRoleOptions: ['UserAdministrationService', function(UserAdministrationService) {
                            return UserAdministrationService.getSelectRoleOptions(null, 100, 1);
                        }]
                    }
                });
            }
        ]);
})();