/**
 * Created by BrownB11 on 6/21/2017.
 */
(function () {
    'use strict';

    angular.module('adams.contact.info.modal.controller', [])
        .controller('ContactInfoModalController', ['$scope', '$state', 'ContactInfoService', '$uibModalInstance', 'vendorData',
        function ($scope, $state, ContactInfoService, $uibModalInstance, vendorData) {
            var contactInfoModalController = this,
                contactInfoModalDeferred;



            function initialize() {
                contactInfoModalController.vendorNumber = vendorData.vendorNumber;
                contactInfoModalController.vendorSourceSystemId = vendorData.vendorSourceSystemId;

                contactInfoModalController.gridOptions = defineContactInfoGridOptions();
            }

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller

                contactInfoModalController.gridApi = gridApi;
            });

            $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                // emitted selected rows and row selected event from Directive controller
            });

            contactInfoModalController.getGridData = function (pageSize, pageNumber, sort, searchInput) {

                return ContactInfoService.getContactInfoData(
                    pageSize, pageNumber, sort,
                    contactInfoModalController.vendorNumber,
                    contactInfoModalController.vendorSourceSystemId, searchInput);
            };

            function defineContactInfoGridOptions() {
                return {
                    paginationPageSizes: [25, 50, 75],
                    paginationPageSize: 25,
                    enableFiltering: true,
                    useExternalFiltering: true,
                    useExternalPagination: true,
                    useExternalSorting: true,
                    enableRowSelection: true,
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    noUnselect: true,
                    showColumnFooter: false,
                    showSelectionCheckbox: false,
                    treeRowHeaderAlwaysVisible: false,
                    enableGridMenu: true,
                    enableSorting: false,
                    enableHorizontalScrollbar: 1,

                    columnDefs: [
                        {
                            field: 'first_name',
                            displayName: "First Name",
                            enableColumnMenu: false,
                            enableCellEdit: false,
                            minWidth: 120,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'last_name',
                            displayName: "Last Name",
                            enableColumnMenu: false,
                            enableCellEdit: false,
                            minWidth: 120,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'description',
                            displayName: "Title",
                            enableColumnMenu: false,
                            enableCellEdit: false,
                            minWidth: 235,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'telephone_1',
                            displayName: "Phone Number",
                            enableColumnMenu: false,
                            minWidth: 120,
                            filter: {
                                placeholder: ''
                            }

                        },
                        {
                            field: 'telephone_2',
                            displayName: "Alternate Phone Number",
                            enableColumnMenu: false,
                            minWidth: 120,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'fax',
                            displayName: "Fax Number",
                            enableColumnMenu: false,
                            minWidth: 120,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'email',
                            displayName: "Email Address",
                            enableColumnMenu: false,
                            minWidth: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'notify_for_openings_closings',
                            displayName: "Notify For Openings Or Closings",
                            enableColumnMenu: false,
                            cellFilter: 'notifyFilter',
                            minWidth: 235,
                            filter: {
                                placeholder: ''
                            }
                        }
                    ]
                };
            }

            contactInfoModalController.close = function() {
                $uibModalInstance.dismiss('cancel');
            };

            initialize();
        }
    ]);

})();
