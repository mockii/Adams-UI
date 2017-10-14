/**
 * Created by KanduN01 on 1/17/2017.
 */

'use strict';

(function () {

    angular.module('adams.secured.objects.controller', ['adams.common.constants', 'adams.secured.objects.service', 'common.modules.logging'])
        .controller('SecuredObjectsController', ['$q', '$rootScope', '$scope', '$timeout', '$filter', 'ADAMS_CONSTANTS', 'SecuredObjectsService', 'application', 'role', '$interval', 'ModalDialogService', '$log',
            function($q, $rootScope, $scope, $timeout, $filter, ADAMS_CONSTANTS, SecuredObjectsService, application, role, $interval, ModalDialogService, $log) {

                var securedObjectController = this,
                    securedApplicationsPromise;


                function initialize(){
                    securedObjectController.applications = [];
                    securedObjectController.application = {};
                    securedObjectController.role = {};
                    securedObjectController.getApplicationData();
                    securedObjectController.rolesGridOptions.data = [];
                    securedObjectController.permissionsGridOptions.data = [];
                    securedObjectController.showRoleLoading = false;
                    securedObjectController.showPermissionLoading = false;

                    securedObjectController.roleGridId = 0;
                    securedObjectController.permissionGridId = 1;

                    securedObjectController.rolepaginationOptions = {
                        pageSize: 200,
                        pageNumber: ADAMS_CONSTANTS.UI_GRID_PAGE_NO,
                        sort: null
                    };

                    securedObjectController.permissionpaginationOptions = {
                        pageSize: 50,
                        pageNumber: ADAMS_CONSTANTS.UI_GRID_PAGE_NO,
                        sort: null
                    };

                    securedObjectController.preSelectRole = false;
                    securedObjectController.default_application = '- Select -';
                    if(application && role){
                        securedObjectController.application.name = application;
                        securedObjectController.role.name = role;
                        //securedObjectController.getApplicationRoles(securedObjectController.application.name);
                        securedObjectController.preSelectRole = true;
                        securedObjectController.default_application = application;
                        securedObjectController.applications.push(securedObjectController.application);
                    }else if(application){
                        securedObjectController.application.name = application;
                        //securedObjectController.getApplicationRoles(securedObjectController.application.name);
                        securedObjectController.applications.push(securedObjectController.application);
                        securedObjectController.default_application = application;
                    }


                    securedObjectController.rolesData = {};
                    securedObjectController.rolesData.metadata = {};
                    securedObjectController.rolesData.metadata.http_status_code = "200";
                    securedObjectController.rolesData.metadata.resultCount = 1;
                    securedObjectController.rolesData.data = [];
                }

                securedObjectController.rolesGridOptions = defineRoleGridOptions();

                function defineRoleGridOptions() {
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
                        noUnselect: true,
                        showColumnFooter: false,
                        treeRowHeaderAlwaysVisible: true,
                        enableGridMenu: true, //true will display grid menu on top-right
                        enableSorting: true,
                        autoRowSelection : true,
                        columnDefs: [
                            {   field: 'name',
                                displayName: "Role",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            }
                        ]
                    };
                }

                securedObjectController.permissionsGridOptions = definePermissionGridOptions();


                securedObjectController.applicationChange = function () {
                    securedObjectController.rolesGridOptions.data = [];
                    securedObjectController.permissionsGridOptions.data = [];
                    if(securedObjectController.application) {
                        securedObjectController.default_application = securedObjectController.application.name;
                        //securedObjectController.getApplicationRoles(securedObjectController.application.name);
                        $scope.$broadcast('uiGridParameterChange', securedObjectController.roleGridId);
                    }
                };

                function definePermissionGridOptions() {
                    return {
                        paginationPageSizes: [25, 50, 75],
                        paginationPageSize: 25, // pagination out of box
                        virtualizationThreshold: 25,
                        useExternalPagination: true,
                        useExternalFiltering: false,
                        enableFiltering: true, //step1 to enable all grid columns filtering
                        enableRowSelection: false,
                        enableRowHeaderSelection: false,
                        multiSelect: false,
                        modifierKeysToMultiSelect: false,
                        noUnselect: true,
                        showColumnFooter: false,
                        treeRowHeaderAlwaysVisible: true,
                        enableGridMenu: true, //true will display grid menu on top-right
                        enableSorting: true,
                        columnDefs: [
                            {   field: 'object_name',
                                displayName: "Object Name",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'object_description',
                                displayName: "Object Description",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'object_type',
                                displayName: "Object Type",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'object_display_name',
                                minWidth: 100,
                                displayName: "Object Display Name",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'access_type',
                                minWidth: 60,
                                displayName: "Access Type",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'attributes',
                                minWidth: 60,
                                displayName: "Attributes",
                                filter: {
                                    placeholder: ''
                                }
                            }
                        ]
                    };
                }


                securedObjectController.getApplicationData = function() {

                    if (securedApplicationsPromise) {
                        //securedApplicationsPromise.abort();
                    }

                    securedApplicationsPromise = SecuredObjectsService.getApplications(ADAMS_CONSTANTS.SEC_APPLICATION_COUNT, ADAMS_CONSTANTS.PAGE_NO);

                    securedApplicationsPromise.then(
                        function(response){
                            if (response.data === '{}' && response.error.userErrorMessage.httpStatus === '404') {
                                securedObjectController.applications = [];
                            }
                            else if (response.data === '{}' && response.error.userErrorMessage.httpStatus !== '404') {
                                securedObjectController.applications = [];
                                $timeout(function() {
                                    securedObjectController.errorMessage = 'An error occurred while getting applications data';
                                    securedObjectController.errorHandling(securedObjectController.errorMessage);
                                }, 500);
                            }
                            else {
                                securedObjectController.applications = response.data || [];
                            }
                        },
                        function(error){
                            $log.error("An error occurred while getting applications data");
                        });
                };

                securedObjectController.errorHandling = function (errorMessage) {
                    ModalDialogService.confirm({
                        bodyText: errorMessage,
                        title: 'Error Message',
                        okText: 'Ok'
                    });
                };

                securedObjectController.getRoleGridData = function(pageSize, pageNumber, sort, searchInput) {

                    if(securedObjectController.application === ''){
                        var deferred = $q.defer();
                        deferred.resolve(securedObjectController.rolesData);
                        deferred.promise.abort = function() {
                            deferred.resolve();
                        };
                        return deferred.promise;
                    }

                    return SecuredObjectsService.getApplicationRoles(pageSize, pageNumber, securedObjectController.application.name);

                };


                securedObjectController.getPermissionGridData = function(pageSize, pageNumber, sort, searchInput) {

                    if(securedObjectController.application === '' || securedObjectController.role.name === ''){
                        var deferred = $q.defer();
                        deferred.resolve(securedObjectController.rolesData);
                        deferred.promise.abort = function() {
                            deferred.resolve();
                        };
                        return deferred.promise;
                    }

                    return SecuredObjectsService.getSecuredObjectsForRole(pageSize, pageNumber, securedObjectController.application.name, securedObjectController.role.name);

                };


                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent, refId) {
                    securedObjectController.role = mySelectedRows[0];
                    securedObjectController.application = {};
                    securedObjectController.application.name = securedObjectController.default_application;
                    $scope.$broadcast('uiGridParameterChange', securedObjectController.permissionGridId);
                });


                initialize();
        }
    ]);
})();