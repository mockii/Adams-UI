'use strict';

(function () {
    angular.module('adams.communication.preferences', ['adams.communication.preferences.controller', 'adams.communication.preferences.service'])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('commPreferences', {
                    url: "/communicationpreferences",
                    templateUrl: "comm-preferences/comm-preferences.tpl.html",
                    controller: "CommPreferencesController as commPreferencesController",
                    data: {
                        pageTitle: "Communication Preferences"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'commPreferences',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/comm-preferences.css'
                                ]
                            });
                        }],
                        getCommPreferences: function($stateParams, CommPreferencesService, RBACService) {
                            if (!$stateParams.userName) {
                                $stateParams.userName = RBACService.getCurrentProfile().user_name;
                            }
                            return CommPreferencesService.getCommPreferences($stateParams.userName)
                                .then(
                                    function(response) {
                                        return response.data;
                                    })
                                .catch(
                                    function(error){
                                        console.error('An error occurred while getting comm preferences for ' + $stateParams.userName);
                                    }
                                );
                        }
                    }
                });
        }])
    ;
})();