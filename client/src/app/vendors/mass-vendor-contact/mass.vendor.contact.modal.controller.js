
(function () {
    'use strict';

    angular.module('adams.vendors.mass.vendor.contact.modal.controller', [])
        .controller('MassVendorContactModalController', ['$scope', '$state', '$window', '$uibModalInstance', 'CompassToastr', 'VendorMappingService', 'VendorSearchService', 'ContactInfoService', 'costCenter',
        function ($scope, $state, $window, $uibModalInstance, CompassToastr, VendorMappingService, VendorSearchService, ContactInfoService, costCenter) {
            var massVendorContactModalController = this;

            function initialize() {
                massVendorContactModalController.costCenter = costCenter;
                massVendorContactModalController.availableContacts = [];
                massVendorContactModalController.selectedContacts = [];
                massVendorContactModalController.vendorGridOptions = defineVendorGridOptions();
            }


            massVendorContactModalController.getVendorGridData = function (pageSize, pageNumber, sort, searchInput) {
                if (massVendorContactModalController.costCenter) {
                    return VendorMappingService.getVendorMappingData(pageSize, pageNumber, sort, massVendorContactModalController.costCenter.costCenterSourceSystemId, massVendorContactModalController.costCenter.costCenterNumber, searchInput);
                } else {
                    return VendorSearchService.getAllVendorSearchDetails(pageSize, pageNumber, searchInput, sort);
                }
            };

            massVendorContactModalController.addContactToSelectedContactList = function(contact) {
                if (!isContactAlreadySelected(contact)) {
                    massVendorContactModalController.selectedContacts.push(contact);
                }
            };

            massVendorContactModalController.removeContactedFromSelectedContactList = function(contact) {
                for (var i=0; i<massVendorContactModalController.selectedContacts.length; i++) {
                    if (massVendorContactModalController.selectedContacts[i].email.toLowerCase() === contact.email.toLowerCase()) {
                        massVendorContactModalController.selectedContacts.splice(i,1);
                        break;
                    }
                }
            };

            massVendorContactModalController.submit = function() {
                var contactEmailList = [];
                for (var i=0; i<massVendorContactModalController.selectedContacts.length; i++) {
                    contactEmailList.push(massVendorContactModalController.selectedContacts[i].email);
                }

                $uibModalInstance.close({
                    selectedContacts: contactEmailList
                });
            };

            massVendorContactModalController.close = function() {
                $uibModalInstance.dismiss('cancel');
            };



            /** LISTENERS **/

            $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows) {
                $event.preventDefault();

                massVendorContactModalController.selectedVendor = mySelectedRows[0];

                var sourceSystemId = mySelectedRows[0].source_system_id | mySelectedRows[0].vendor_source_system_id;

                ContactInfoService.getContactInfoData(999, 1, null, mySelectedRows[0].vendor_number, sourceSystemId, null)
                    .then(function(response) {
                        massVendorContactModalController.availableContacts = response.data;
                    }, function(error){
                        massVendorContactModalController.availableContacts = [];
                        CompassToastr.error('There was an error in getting vendor contact details. Please try again later!');
                    });
            });


            /** PRIVATE FUNCTIONS **/

            function isContactAlreadySelected(contact) {
                var contactFound = false;
                for (var i=0; i<massVendorContactModalController.selectedContacts.length; i++) {
                    if (massVendorContactModalController.selectedContacts[i].email.toLowerCase() === contact.email.toLowerCase()) {
                        contactFound = true;
                        break;
                    }
                }

                return contactFound;
            }

            function defineVendorGridOptions() {
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
                            field: 'vendor_number',
                            displayName: "Vendor Number",
                            minWidth: 125,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'vendor_name_1',
                            displayName: "Vendor Name 1",
                            minWidth: 200,
                            filter: {
                                placeholder: ''
                            }

                        },
                        {
                            field: 'vendor_name_2',
                            displayName: "Vendor Name 2",
                            minWidth: 150,
                            filter: {
                                placeholder: ''
                            }
                        },
                        {
                            field: 'vendor_name_3',
                            displayName: "Vendor Name 3",
                            minWidth: 150,
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
