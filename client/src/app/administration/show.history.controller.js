'use strict';

(function () {

    angular.module('adams.user.administration.show.history.modal.controller', [])
        .controller('ShowHistoryModalController', ['$rootScope', '$scope', '$uibModalInstance', '$interval', 'history', 'userName', 'ADAMS_CONSTANTS', '$timeout', 'ModalDialogService', 'UserAdministrationService', 'Utils',
            function($rootScope, $scope, $uibModalInstance, $interval, history, userName, ADAMS_CONSTANTS, $timeout, ModalDialogService, UserAdministrationService, Utils) {
                var showHistoryModalController = this,
                    showHistoryModalGridPromise;

                function initialize() {

                    showHistoryModalController.fields = 'action_date, action_by, action, application, role, message';

                    showHistoryModalController.gridApi = '';
                    showHistoryModalController.userName = userName;

                    showHistoryModalController.gridOptions.data = history.data || [];


                }

                // destroy the timeout function
                $scope.$on("$destroy", function (event) {
                    if (angular.isDefined($scope.filterTimeout)) {
                        $timeout.cancel($scope.filterTimeout);
                    }
                });


                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                    // emitted gridOptions and gridApi from Directive controller

                    showHistoryModalController.gridApi = gridApi;
                });


                showHistoryModalController.gridOptions = defineUserSearchGridOptions();

                function defineUserSearchGridOptions() {
                    return {
                        paginationPageSizes: [25, 50, 75],
                        paginationPageSize: 25, // pagination out of box
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
                        useExternalSorting: true,
                        useExternalPagination: true,
                        useExternalFiltering: true,
                        columnDefs: [
                            {
                                field: 'action_date',
                                minWidth: 150,
                                filter: {
                                    placeholder: ''
                                },
                                type: 'date',
                                cellFilter: 'date:"MM/dd/yyyy hh:mm a"',
                                filterCellFiltered: true,
                                enableFiltering: false
                            },
                            {
                                field: 'action_by',
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'action',
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'application',
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'role',
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'message',
                                minWidth: 500,
                                filter: {
                                    placeholder: ''
                                }
                            }
                        ]
                    };

                }



                //Get Grid Data Fn when using only UI-Grid filtering
                showHistoryModalController.getGridData = function(pageSize, pageNumber, sort, searchInput) {
                    return UserAdministrationService.getUserHistory(pageSize, pageNumber, sort, searchInput, showHistoryModalController.userName, showHistoryModalController.fields);
                };


                showHistoryModalController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };

                showHistoryModalController.submit = function() {
                };


                initialize();
            }
        ]);
})();