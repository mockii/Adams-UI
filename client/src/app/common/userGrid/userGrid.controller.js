'use strict';

(function () {

    angular.module('adams.common.user.grid.controller', [])
        .controller('UserGridController', ['$rootScope', '$scope', 'UserAdministrationService', '$uibModalInstance', 'ADAMS_CONSTANTS', 'ModalDialogService', '$timeout',
            function($rootScope, $scope, UserAdministrationService, $uibModalInstance, ADAMS_CONSTANTS, ModalDialogService, $timeout) {
                var userGridController = this;

                function initialize() {
                    userGridController.mySelectedRows = '';
                    userGridController.appName = $rootScope.applicationConfiguration.application.name;
                    userGridController.loginRoleName = UserAdministrationService.getRoleName();
                    userGridController.gridOptions = defineUserSearchGridOptions();
                }

                userGridController.getGridData = function(pageSize, pageNumber, sort, searchInput) {
                    userGridController.search = searchInput;
                    return UserAdministrationService.getUserDetails(pageSize, pageNumber, sort, userGridController.search, userGridController.appName, userGridController.loginRoleName);
                };

                $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent, refId) {
                    userGridController.mySelectedRows = mySelectedRows;
                });

                userGridController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };

                userGridController.submit = function() {
                    $uibModalInstance.close(userGridController.mySelectedRows);
                };

                /** PRIVATE FUNCTIONS **/

                function defineUserSearchGridOptions() {
                    return {
                        paginationPageSizes: [10, 20, 30],
                        paginationPageSize: 10, // pagination out of box
                        virtualizationThreshold: 10,
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
                        columnDefs: [
                            {   field: 'user_name',
                                displayName: "User ID",
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'last_name',
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'first_name',
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'cost_center_name',
                                filter: {
                                    placeholder: ''
                                }
                            }
                        ]
                    };
                }

                initialize();
            }
        ]);
})();