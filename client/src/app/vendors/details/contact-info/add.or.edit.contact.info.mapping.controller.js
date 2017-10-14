(function () {
    angular.module('adams.add.or.edit.contact.info.controller', ['common.modules.logging'])
        .controller('AddOrEditContactInfoMappingController', ['$scope', '$state', '$uibModalInstance', 'CompassToastr', 'ADAMS_CONSTANTS', 'ModalDialogService', 'contactInfoRowData', 'action', 'vendorData', 'ContactInfoService', 'Utils', '$log',
        function ($scope, $state, $uibModalInstance, CompassToastr, ADAMS_CONSTANTS, ModalDialogService, contactInfoRowData, action, vendorData, ContactInfoService, Utils, $log) {
            var addOrEditContactInfoMappingController = this,
                addContactInfoPromise,
                editContactInfoPromise;
            addOrEditContactInfoMappingController.refId = "addCostCenterMappingSelection";

            addOrEditContactInfoMappingController.contactInfoRowData = contactInfoRowData;
            addOrEditContactInfoMappingController.action = action;

            function initialize() {
                $scope.originalController = angular.copy(addOrEditContactInfoMappingController);
            }

            /* Data Model*/
            if(action === "add") {
                addOrEditContactInfoMappingController.title = "Add Vendor Contact";
                addOrEditContactInfoMappingController.firstName = "";
                addOrEditContactInfoMappingController.lastName = "";
                addOrEditContactInfoMappingController.phoneNumber = "";
                addOrEditContactInfoMappingController.alternatePhoneNumber = "";
                addOrEditContactInfoMappingController.faxNumber = "";
                addOrEditContactInfoMappingController.emailAddress = "";
                addOrEditContactInfoMappingController.description = "";
                addOrEditContactInfoMappingController.notifyForOpeningsOrClosings = true;
            } else {
                addOrEditContactInfoMappingController.title = "Edit Vendor Contact " + contactInfoRowData.first_name + " " + contactInfoRowData.last_name;
                addOrEditContactInfoMappingController.firstName = contactInfoRowData.first_name;
                addOrEditContactInfoMappingController.lastName = contactInfoRowData.last_name ;
                addOrEditContactInfoMappingController.phoneNumber = contactInfoRowData.telephone_1;
                addOrEditContactInfoMappingController.alternatePhoneNumber = contactInfoRowData.telephone_2;
                addOrEditContactInfoMappingController.faxNumber = contactInfoRowData.fax;
                addOrEditContactInfoMappingController.emailAddress = contactInfoRowData.email;
                addOrEditContactInfoMappingController.description = contactInfoRowData.description;
                addOrEditContactInfoMappingController.notifyForOpeningsOrClosings = contactInfoRowData.notify_for_openings_closings;
            }

            addOrEditContactInfoMappingController.save = function (contactForm) {
                if (contactForm.$valid) {
                    Utils.startBlockUI('add-or-edit-contact-info-mapping');

                    var vendorContactData = {};
                    vendorContactData.first_name = addOrEditContactInfoMappingController.firstName;
                    vendorContactData.last_name = addOrEditContactInfoMappingController.lastName;
                    vendorContactData.email = addOrEditContactInfoMappingController.emailAddress;
                    vendorContactData.fax = addOrEditContactInfoMappingController.faxNumber;
                    vendorContactData.source_system_id = vendorData.vendorSourceSystemId;
                    vendorContactData.telephone_1 = addOrEditContactInfoMappingController.phoneNumber;
                    vendorContactData.telephone_2 = addOrEditContactInfoMappingController.alternatePhoneNumber;
                    vendorContactData.description = addOrEditContactInfoMappingController.description;
                    vendorContactData.notify_for_openings_closings = addOrEditContactInfoMappingController.notifyForOpeningsOrClosings;
                    vendorContactData.vendor_number = vendorData.vendorNumber;

                    if (action === "add") {

                        var data = {};
                        data.vendorContacts = [];
                        data.vendorContacts.push(vendorContactData);

                        addContactInfoPromise = ContactInfoService.addContactInfo(vendorData.vendorNumber, vendorData.vendorSourceSystemId, data);
                        addContactInfoPromise.then(
                            function (response) {
                                if (response === 'error') {
                                    addOrEditContactInfoMappingController.errorMessage = 'An error occurred while adding contact info data';
                                    addOrEditContactInfoMappingController.errorHandling(addOrEditContactInfoMappingController.errorMessage);
                                    addContactInfoPromise = null;
                                    CompassToastr.error("There occured a error while adding " + addOrEditContactInfoMappingController.firstName + ' ' + addOrEditContactInfoMappingController.lastName + "'s contact info.");
                                }
                                else {
                                    CompassToastr.success(addOrEditContactInfoMappingController.firstName + ' ' + addOrEditContactInfoMappingController.lastName + " contact info has been successfully added.");
                                }
                                Utils.stopBlockUI('add-or-edit-contact-info-mapping', 500);
                                $uibModalInstance.close('refresh');
                            },
                            function (error) {
                                Utils.stopBlockUI('add-or-edit-contact-info-mapping', 500);
                                $uibModalInstance.close('refresh');
                                $log.error("An error occurred while adding vendor contact info data");
                            });
                    } else if (action === "edit") {

                        vendorContactData.VENDOR_CONTACT_ID = contactInfoRowData.VENDOR_CONTACT_ID;
                        editContactInfoPromise = ContactInfoService.updateContactInfo(vendorData.vendorNumber, contactInfoRowData.vendor_contact_id, vendorData.vendorSourceSystemId, vendorContactData);
                        editContactInfoPromise.then(
                            function (response) {
                                if (response === 'error') {
                                    addOrEditContactInfoMappingController.errorMessage = 'An error occurred while updating contact info data';
                                    addOrEditContactInfoMappingController.errorHandling(addOrEditContactInfoMappingController.errorMessage);
                                    editContactInfoPromise = null;
                                    CompassToastr.error("There occured a error while updating " + addOrEditContactInfoMappingController.firstName + ' ' + addOrEditContactInfoMappingController.lastName + "'s contact info.");
                                }
                                else {
                                    CompassToastr.success(addOrEditContactInfoMappingController.firstName + ' ' + addOrEditContactInfoMappingController.lastName + " contact info has been successfully updated.");
                                }
                                Utils.stopBlockUI('add-or-edit-contact-info-mapping', 500);
                                $uibModalInstance.close('refresh');
                            },
                            function (error) {
                                Utils.stopBlockUI('add-or-edit-contact-info-mapping', 500);
                                $uibModalInstance.close('refresh');
                                $log.error("An error occurred while updating vendor contact info data");
                            });
                    }
                }

            };

            addOrEditContactInfoMappingController.errorHandling = function (errorMessage) {
                ModalDialogService.confirm({
                    bodyText: errorMessage,
                    title: 'Error Message',
                    okText: 'Ok'
                });
            };

            addOrEditContactInfoMappingController.close = function () {
                $uibModalInstance.dismiss('cancel');
            };

            addOrEditContactInfoMappingController.isFormActuallyDirty = false;
            addOrEditContactInfoMappingController.dirtyCheck = function (oldValue, newValue) {
                addOrEditContactInfoMappingController.isFormActuallyDirty = oldValue !== newValue;
            };

            initialize();
        }
    ]);
})();