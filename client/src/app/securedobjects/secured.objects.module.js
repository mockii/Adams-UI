/**
 * Created by KanduN01 on 1/12/2017.
 */


'use strict';

(function () {

    angular.module('adams.secured.objects', ['adams.secured.objects.controller'])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('securedObjects', {
                    url: "/securedobjects?{application_name}&{role_name}",
                    templateUrl: "securedobjects/secured.objects.tpl.html",
                    controller: "SecuredObjectsController as securedObjectController",
                    data: {
                        pageTitle: "Secured Objects"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'securedObjects',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/securedobjects.css'
                                ]
                            });
                        }],
                        application: function($stateParams) {
                            return $stateParams.application_name;
                        },
                        role: function($stateParams) {
                            return $stateParams.role_name;
                        }
                    }
                });
        }
        ]);
})();
