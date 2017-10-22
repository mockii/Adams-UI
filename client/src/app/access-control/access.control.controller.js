(function () {
    'use strict';

    angular.module('adams.access.control.controller',[])
        .controller('AccessControlController', ['$rootScope', '$scope', '$log', '$timeout', '$q', '$interval',
            'SecuredObjectsService', 'ADAMS_CONSTANTS', 'ModalDialogService', 'AccessControlService',
            'application_name', 'secured_object_name',
            function ($rootScope, $scope, $log, $timeout, $q, $interval,
                      SecuredObjectsService, ADAMS_CONSTANTS, ModalDialogService, AccessControlService,
                      application_name, secured_object_name) {

            var accessControlController = this,
                accessControlApplicationsPromise;

            function initialize(){
                accessControlController.application = {};
                accessControlController.applications = [];
                accessControlController.showSecuredObjectsLoading = false;
                accessControlController.showRolesLoading = false;
                accessControlController.showOverridesLoading = false;
                accessControlController.applicationSelected = false;
                accessControlController.selectedSecuredObject = {};
                accessControlController.getApplicationData();

                accessControlController.securedObjectsData = {};
                accessControlController.securedObjectsData.metadata = {};
                accessControlController.securedObjectsData.metadata.http_status_code = "200";
                accessControlController.securedObjectsData.metadata.resultCount = 1;
                accessControlController.securedObjectsData.data = [];

                accessControlController.rolesData = {};
                accessControlController.rolesData.metadata = {};
                accessControlController.rolesData.metadata.http_status_code = "200";
                accessControlController.rolesData.metadata.resultCount = 1;
                accessControlController.rolesData.data = [];

                accessControlController.overridesData = {};
                accessControlController.overridesData.metadata = {};
                accessControlController.overridesData.metadata.http_status_code = "200";
                accessControlController.overridesData.metadata.resultCount = 1;
                accessControlController.overridesData.data = [];

                accessControlController.securedObjectsGridId = 0;
                accessControlController.rolesGridId = 1;
                accessControlController.overridesGridId = 2;

                accessControlController.setDefaultApplication();

            }

            accessControlController.setDefaultApplication = function () {

                var applicationsPromise,
                    applications = [];

                if(application_name){
                    accessControlController.applicationSelected = true;

                    applicationsPromise = SecuredObjectsService.getApplications(ADAMS_CONSTANTS.SEC_APPLICATION_COUNT, ADAMS_CONSTANTS.PAGE_NO);

                    applicationsPromise.then(
                        function(response){

                            for(var index=0; index < response.data.length; index++){
                                if(response.data[index].name === application_name){
                                    accessControlController.application = response.data[index];
                                }
                            }
                            $scope.$broadcast('uiGridParameterChange', accessControlController.securedObjectsGridId);
                        },
                        function(error){
                            $log.error("An error occurred while getting Applications data");
                        }
                    );
                }
            };

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi, refId) {

                if(refId === accessControlController.securedObjectsGridId && secured_object_name){
                    var selectedSecuredObjectIndex;

                    for(var index=0; index < gridOptions.data.length; index++){
                        if(gridOptions.data[index].object_name === secured_object_name){
                            selectedSecuredObjectIndex = index;
                            break;
                        }
                    }

                    //selecting the row matching secured object parameter
                    $interval(function() {
                        gridApi.selection.selectRow(gridOptions.data[selectedSecuredObjectIndex]);
                    }, 0, 1);

                }

            });

            accessControlController.securedObjectsGridOptions = defineSecuredObjectsGridOptions();

            function defineSecuredObjectsGridOptions() {
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
                    enableSorting: false,
                    autoRowSelection : false,
                    columnDefs: [
                        {   field: 'object_name',
                            displayName: "Secured Object",
                            minWidth: 100,
                            filter: {
                                placeholder: ''
                            }
                        }
                    ]
                };
            }

            accessControlController.rolesGridOptions = defineRolesGridOptions();

            function defineRolesGridOptions() {
                return {
                    paginationPageSizes: [25, 50, 75],
                    paginationPageSize: 25, // pagination out of box
                    virtualizationThreshold: 25,
                    useExternalPagination: true,
                    useExternalFiltering: true,
                    enableFiltering: true, //step1 to enable all grid columns filtering
                    enableRowSelection: false,
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    noUnselect: true,
                    showColumnFooter: false,
                    treeRowHeaderAlwaysVisible: true,
                    enableGridMenu: true, //true will display grid menu on top-right
                    enableSorting: false,
                    columnDefs: [
                        {   field: 'role_name',
                            displayName: "Role",
                            minWidth: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'access_type',
                            displayName: "Access",
                            minWidth: 50,
                            filter: {
                                placeholder: ''
                            }
                        }
                    ]
                };
            }

            accessControlController.overridesGridOptions = defineOverridesGridOptions();

            function defineOverridesGridOptions() {
                return {
                    paginationPageSizes: [25, 50, 75],
                    paginationPageSize: 25, // pagination out of box
                    virtualizationThreshold: 25,
                    useExternalPagination: true,
                    useExternalFiltering: true,
                    enableFiltering: true, //step1 to enable all grid columns filtering
                    enableRowSelection: false,
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    noUnselect: true,
                    showColumnFooter: false,
                    treeRowHeaderAlwaysVisible: true,
                    enableGridMenu: true, //true will display grid menu on top-right
                    enableSorting: false,
                    columnDefs: [
                        {   field: 'criteria',
                            displayName: "Criteria",
                            minWidth: 100,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {   field: 'access_type',
                            displayName: "Access",
                            minWidth: 50,
                            filter: {
                                placeholder: ''
                            }
                        }
                    ]
                };
            }

            accessControlController.getApplicationData = function() {

                accessControlApplicationsPromise = SecuredObjectsService.getApplications(ADAMS_CONSTANTS.SEC_APPLICATION_COUNT, ADAMS_CONSTANTS.PAGE_NO);

                accessControlApplicationsPromise.then(
                    function(response){
                        if (response.data === '{}') {
                            accessControlController.applications = [];
                            if (response.error.userErrorMessage.httpStatus !== '404') {
                                $timeout(function() {
                                    accessControlController.errorHandling('An error occurred while getting Applications data');
                                }, 500);
                            }
                        }
                        else {
                            accessControlController.applications = response.data;
                        }
                    },
                    function(error){
                        $log.error("An error occurred while getting Applications data");
                    });
            };

            accessControlController.getSecuredObjectsForApplication = function(pageSize, pageNumber) {
                accessControlController.selectedSecuredObject = {};

                if(accessControlController.application.name === undefined){
                    var deferred = $q.defer();
                    deferred.resolve(accessControlController.securedObjectsData);
                    deferred.promise.abort = function() {
                        deferred.resolve();
                    };
                    return deferred.promise;
                }

                return SecuredObjectsService.getSecuredObjectsForApplication(pageSize, pageNumber, accessControlController.application.name);

            };

            accessControlController.getRolesForSecuredObject = function(pageSize, pageNumber) {
                if(accessControlController.selectedSecuredObject.object_name === undefined){
                    var deferred = $q.defer();
                    deferred.resolve(accessControlController.rolesData);
                    deferred.promise.abort = function() {
                        deferred.resolve();
                    };
                    return deferred.promise;
                }

                return AccessControlService.getRolesForSecuredObject(pageSize, pageNumber, accessControlController.application.name, accessControlController.selectedSecuredObject.object_name);

            };

            accessControlController.getOverridesForSecuredObject = function(pageSize, pageNumber) {
                if(accessControlController.selectedSecuredObject.object_name === undefined){
                    var deferred = $q.defer();
                    deferred.resolve(accessControlController.overridesData);
                    deferred.promise.abort = function() {
                        deferred.resolve();
                    };
                    return deferred.promise;
                }

                return AccessControlService.getOverridesForSecuredObject(pageSize, pageNumber, accessControlController.application.name, accessControlController.selectedSecuredObject.object_name);

            };

            accessControlController.errorHandling = function (errorMessage) {
                ModalDialogService.confirm({
                    bodyText: errorMessage,
                    title: 'Error Message',
                    okText: 'Ok'
                });
            };

            accessControlController.applicationChange = function (selectedApplication) {
                // reset default secured object.
                secured_object_name = {};

                accessControlController.securedObjectsGridOptions.data = [];
                accessControlController.rolesGridOptions.data = [];
                accessControlController.application = selectedApplication;
                accessControlController.applicationSelected = true;
                if(accessControlController.application) {
                    $scope.$broadcast('uiGridParameterChange', accessControlController.securedObjectsGridId);
                }
            };

            $scope.$on('uiGridSelectedRows', function ($event, selectedRows, refId) {
                accessControlController.selectedSecuredObject = selectedRows[0];
                $scope.$broadcast('uiGridParameterChange', accessControlController.rolesGridId);
                $scope.$broadcast('uiGridParameterChange', accessControlController.overridesGridId);
            });

            initialize();
            }]
    );
})();