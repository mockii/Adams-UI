(function(){
    'use strict';

    angular.module('adams.access.control',['adams.access.control.controller', 'adams.access.control.service'])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('accessControl', {
                    url : "/accesscontrol?{application_name}&{secured_object_name}",
                    templateUrl : "access-control/access.control.tpl.html",
                    controller : "AccessControlController as accessControlController",
                    data : {
                        pageTitle : "Access Control"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'accessControl',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/access-control.css'
                                ]
                            });
                        }],
                        application_name: function ($stateParams) {
                            return $stateParams.application_name;
                        },
                        secured_object_name: function ($stateParams) {
                            return $stateParams.secured_object_name;
                        }
                    }
                }
            );
        }
    ]);
})();