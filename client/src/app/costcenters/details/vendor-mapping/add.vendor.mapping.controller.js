(function () {
    angular.module('adams.add.vendor.mapping.controller',['common.modules.logging'])
        .controller('AddVendorMappingController', ['$scope', '$state', '$uibModalInstance', '$timeout', 'ADAMS_CONSTANTS', 'VendorMappingService', 'ModalDialogService', 'addEligibleVendorData', 'CompassToastr', 'Utils', '$log',
    function($scope, $state, $uibModalInstance, $timeout, ADAMS_CONSTANTS, VendorMappingService, ModalDialogService, addEligibleVendorData, CompassToastr, Utils, $log){
        var addVendorMappingController = this,
            addVendorMappingPromise;

        addVendorMappingController.refId = "addVendorMappingSelection";
        addVendorMappingController.vendors = [];

        function initialize() {
            addVendorMappingController.isCollapsed = true;
            addVendorMappingController.activeTab = 0;
            addVendorMappingController.gridOptions = defineAddVendorGridOptions();
        }

        $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
            // emitted gridOptions and gridApi from Directive controller
        });

        $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
            // emitted selected rows and row selected event from Directive controller
            addVendorMappingController.mySelectedRows = mySelectedRows;
            var vendorRecord = addVendorMappingController.mySelectedRows[0].vendor_number +' - '+ addVendorMappingController.mySelectedRows[0].vendor_name_1;

            if(addVendorMappingController.mySelectedRows[0].isSelected) {
                addVendorMappingController.lastSelectedRow = addVendorMappingController.mySelectedRows[0];
            }
            if(!isVendorRecordPresent(addVendorMappingController.mySelectedRows[0], addVendorMappingController.vendors)) {
                addVendorMappingController.vendors.push(addVendorMappingController.mySelectedRows[0]);
            } else {
                $event.preventDefault();
                CompassToastr.warning(vendorRecord + " already exists.");
            }
        });

        function isVendorRecordPresent(vendorRecord, selectedVendorsArray){
            var currentVendorRecord = vendorRecord;
            for (var i = 0; i < selectedVendorsArray.length; i++){
                var selectedVendor = selectedVendorsArray[i];
                if(selectedVendor.vendor_number === currentVendorRecord.vendor_number &&
                    selectedVendor.vendor_source_system_id === currentVendorRecord.vendor_source_system_id){
                    return true;
                }
            }
            return false;
        }

        function defineAddVendorGridOptions(){
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
                    {   field: 'vendor_number',
                        displayName: "Vendor Number",
                        minWidth: 121,
                        filter: {
                            placeholder: ''
                        }
                    },
                    {   field: 'vendor_name_1',
                        displayName: "Name",
                        minWidth: 121,
                        filter: {
                            placeholder: ''
                        }
                    },
                    {
                        field: 'vendor_name_2',
                        displayName: "Name2",
                        minWidth: 120,
                        filter: {
                            placeholder: ''
                        }
                    },
                    {
                        field: 'vendor_name_3',
                        displayName: "Name3",
                        minWidth: 120,
                        filter: {
                            placeholder: ''
                        }
                    },
                    {   field: 'compliance',
                        displayName: "Compliance",
                        minWidth: 125,
                        filter: {
                            placeholder: ''
                        }

                    }
                ]
            };
        }

        addVendorMappingController.getGridData = function(pageSize, pageNumber, sort, searchInput) {
            return VendorMappingService.getEligibleVendorData(pageSize, pageNumber,
                sort, searchInput, addEligibleVendorData.costCenterNumber, addEligibleVendorData.costCenterSourceSystemId);
        };
        
        addVendorMappingController.close = function() {
            $uibModalInstance.dismiss('cancel');
        };
        
        addVendorMappingController.select = function() {
            Utils.startBlockUI("add-vendor");
            var vendorsData = {},
                vendors = [];
            angular.forEach(addVendorMappingController.vendors, function(data){
                var vendorObject = {};
                vendorObject.vendor_number = data.vendor_number;
                vendorObject.vendor_source_system_id = data.vendor_source_system_id;
                vendors.push(vendorObject);
            });
            vendorsData.vendors = vendors;
            addVendorMappingPromise = VendorMappingService.addVendorMapping(addEligibleVendorData.costCenterNumber, addEligibleVendorData.costCenterSourceSystemId, vendorsData);
            addVendorMappingPromise.then(
                function(response){
                    if (response === 'error') {
                        Utils.stopBlockUI("add-vendor", 500);
                        addVendorMappingController.errorMessage = 'An error occurred while adding eligible vendor mapping data';
                        addVendorMappingController.errorHandling(addVendorMappingController.errorMessage);
                        addVendorMappingPromise = null;
                    }
                    $uibModalInstance.close('refresh');
                },
                function(error){
                    Utils.stopBlockUI("add-vendor", 500);
                    $uibModalInstance.close('refresh');
                    $log.error("An error occurred while adding eligible vendor mapping data");
                });
        };

        addVendorMappingController.errorHandling = function(errorMessage) {
            ModalDialogService.confirm({
                bodyText: errorMessage,
                title: 'Error Message',
                okText: 'Ok'
            });
        };
        
        addVendorMappingController.vendorIndex = function(index) {
            var removedVendor = addVendorMappingController.vendors[index];
            addVendorMappingController.vendors.splice(index, 1);
            if(addVendorMappingController.vendors.length === 0 ){
                addVendorMappingController.gridApi.selection.clearSelectedRows();
            }
            if(addVendorMappingController.gridApi.selection.getSelectedRows().length !== 0 &&
                addVendorMappingController.gridApi.selection.getSelectedRows()[0].vendor_number === removedVendor.vendor_number) {
                addVendorMappingController.lastSelectedRow.isSelected = false;
            }
        };
        initialize();
    }]);
})();