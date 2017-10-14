(function () {
    'use strict';
    angular.module('adams.contact.info.controller', ['common.modules.logging'])
        .controller('ContactInfoController', ['$scope', '$state', '$timeout', 'ContactInfoService', 'ModalDialogService', 'CompassToastr', '$uibModal', 'vendorSearchData', '$log',
        function ($scope, $state, $timeout, ContactInfoService, ModalDialogService, CompassToastr, $uibModal, vendorSearchData, $log) {
            var contactInfoController = this,
                deleteContactInfoPromise;

            $state.current.data.pageTitle = vendorSearchData.vendor_name_1 + ' (' + vendorSearchData.vendor_number + ')';
            contactInfoController.vendorSourceSystemId = $state.params.source_system_id;
            contactInfoController.vendorNumber = $scope.vendorNumber;
            $scope.vendorDetailsController.vendorSearchData = vendorSearchData;

            function initialize() {
                contactInfoController.gridOptions = defineContactInfoGridOptions();
            }

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller
                gridApi.grid.appScope.deleteContactInfo = contactInfoController.deleteContactInfoFunction;

                gridApi.grid.appScope.editContactInfo = contactInfoController.editContactInfoFunction;
            });

            contactInfoController.deleteContactInfoFunction = function (contactInfoRowData) {
                if (contactInfoController.gridOptions.totalItems === 1) {
                    $uibModal.open({
                        templateUrl: 'vendors/details/contact-info/contact-info-delete.tpl.html',
                        controller: 'ContactInfoDeleteController as contactInfoDeleteController',
                        size: 'sm',
                        backdrop: 'static'
                    });
                } else {
                    ModalDialogService.confirm({
                        bodyText: 'You are about to remove the contact info for ' + contactInfoRowData.first_name + ' ' + contactInfoRowData.last_name,
                        title: 'Confirmation',
                        okText: 'Delete',
                        cancelText: 'Cancel'
                    }).then(function () {

                        deleteContactInfoPromise = ContactInfoService.deleteContactInfo(contactInfoController.vendorNumber, contactInfoRowData.vendor_contact_id, contactInfoController.vendorSourceSystemId);

                        deleteContactInfoPromise.then(
                            function (response) {
                                if (response === "error") {
                                    $timeout(function () {
                                        contactInfoController.errorMessage = 'An error occurred while deleting contact info data';
                                        contactInfoController.errorHandling(contactInfoController.errorMessage);
                                    }, 500);
                                } else {
                                    CompassToastr.success("You have successfully removed the contact info for " + contactInfoRowData.first_name + ' ' + contactInfoRowData.last_name);
                                }
                                // Refresh the Grid. Callback
                                $scope.$broadcast('uiGridParameterChange');
                            },
                            function (error) {
                                $log.error("An error occurred while removing Contact Info ");
                            });
                    });
                }
            };

            contactInfoController.editContactInfoFunction = function (contactInfoRowData) {
                var contactModal = $uibModal.open({
                    templateUrl: 'vendors/details/contact-info/add-or-edit-contact-info-mapping.tpl.html',
                    controller: 'AddOrEditContactInfoMappingController as addOrEditContactInfoMappingController',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        contactInfoRowData: contactInfoRowData,
                        action: function(){return 'edit';},
                        vendorData: {
                            'vendorNumber': contactInfoController.vendorNumber,
                            'vendorSourceSystemId': contactInfoController.vendorSourceSystemId
                        }
                    }
                });

                contactModal.result.then(function (res, err) {
                    // Refresh the Grid. Callback
                    $scope.$broadcast('uiGridParameterChange');
                });
            };

            contactInfoController.errorHandling = function (errorMessage) {
                ModalDialogService.confirm({
                    bodyText: errorMessage,
                    title: 'Error Message',
                    okText: 'Ok'
                });
            };

            $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
                // emitted selected rows and row selected event from Directive controller
            });

            function defineContactInfoGridOptions() {
                return {
                    paginationPageSizes: [25, 50, 75],
                    paginationPageSize: 25,
                    enableFiltering: true,
                    useExternalFiltering: true,
                    useExternalPagination: true,
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
                            field: 'action',
                            cellTemplate: '<div>' +
                            '<i class="fa fa-trash" aria-hidden="true" ng-if="grid.appScope.$parent.contactInfoController.gridOptions.data.length > 1" ng-click="grid.appScope.deleteContactInfo(row.entity)" ng-bind="row.getProperty(col.field)"></i>  ' +
                            '<i class="fa fa-pencil" aria-hidden="true" ng-click="grid.appScope.editContactInfo(row.entity)" ng-bind="row.getProperty(col.field)"></i>  ' +
                            '</div>',
                            displayName: "Action",
                            enableFiltering: false,
                            enableSorting: false,
                            enableColumnMenu: false,
                            minWidth: 55,
                            cellClass: "view-cell"
                        },
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
                            },
                            cellClass: 'hyperlink-cell',
                            cellTemplate:'<a href="mailto:{{row.entity.email}}?subject=Contact%20Info">{{row.entity.email}}</a>'
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

            contactInfoController.openAddContactInfo = function () {
                var contactModal = $uibModal.open({
                    templateUrl: 'vendors/details/contact-info/add-or-edit-contact-info-mapping.tpl.html',
                    controller: 'AddOrEditContactInfoMappingController as addOrEditContactInfoMappingController',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        contactInfoRowData: null,
                        action: function(){return 'add';},
                        vendorData: {
                            'vendorNumber': contactInfoController.vendorNumber,
                            'vendorSourceSystemId': contactInfoController.vendorSourceSystemId
                        }
                    }
                });

                contactModal.result.then(function (res, err) {
                    // Refresh the Grid. Callback
                    $scope.$broadcast('uiGridParameterChange');
                });
            };

            contactInfoController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                return ContactInfoService.getContactInfoData(
                    pageSize, pageNumber, sort,
                    contactInfoController.vendorNumber,
                    contactInfoController.vendorSourceSystemId, searchInput);
            };

            initialize();
        }
    ])
    .filter('notifyFilter', function () {
        return function (value) {
            return value === true ? 'Yes' : 'No';
        };
    });
})();