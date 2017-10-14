(function () {
    angular.module('adams.add.cost.center.mapping.controller',['common.modules.logging'])
        .controller('AddCostCenterMappingController', ['$scope', '$uibModalInstance', 'ModalDialogService', 'CostCenterMappingService', 'addEligibleCostCenterData', 'CompassToastr', 'Utils', '$log',
    function($scope, $uibModalInstance, ModalDialogService, CostCenterMappingService, addEligibleCostCenterData, CompassToastr, Utils, $log){
        var addCostCenterMappingController = this,
            addCostCenterMappingPromise;

        addCostCenterMappingController.refId = "addCostCenterMappingSelection";
        addCostCenterMappingController.costCenters = [];
        addCostCenterMappingController.vendorSearchData = addEligibleCostCenterData.vendorSearchData;

        function initialize() {
            addCostCenterMappingController.isCollapsed = true;
            addCostCenterMappingController.activeTab = 0;
            addCostCenterMappingController.gridOptions = defineAddCostCenterGridOptions();
        }

        $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
            // emitted gridOptions and gridApi from Directive controller
        });

        $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
            // emitted selected rows and row selected event from Directive controller
            addCostCenterMappingController.mySelectedRows = mySelectedRows;
            var costCenterRecord = addCostCenterMappingController.mySelectedRows[0].cost_center_name +' - '+ addCostCenterMappingController.mySelectedRows[0].cost_center_description;

            if(addCostCenterMappingController.mySelectedRows[0].isSelected) {
                addCostCenterMappingController.lastSelectedRow = addCostCenterMappingController.mySelectedRows[0];
            }
            if(!isCostCenterRecordPresent(addCostCenterMappingController.mySelectedRows[0], addCostCenterMappingController.costCenters)) {
                addCostCenterMappingController.costCenters.push(addCostCenterMappingController.mySelectedRows[0]);
            } else {
                $event.preventDefault();
                CompassToastr.warning(costCenterRecord + " already exists.");
            }
        });

        function isCostCenterRecordPresent(costCenterRecord, selectedCostCentersArray){
            var currentCostCenterRecord = costCenterRecord;
            for (var i = 0; i < selectedCostCentersArray.length; i++){
                var selectedCostCenter = selectedCostCentersArray[i];
                if(selectedCostCenter.cost_center_name === currentCostCenterRecord.cost_center_name &&
                    selectedCostCenter.cost_center_source_system_id === currentCostCenterRecord.cost_center_source_system_id){
                    return true;
                }
            }
            return false;
        }

        function defineAddCostCenterGridOptions(){
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
                    {   field: 'cost_center_name',
                        displayName: "Name",
                        enableColumnMenu: false,
                        enableCellEdit: false ,
                        width:'30%',
                        filter: {
                            placeholder: ''
                        }
                    },
                    {   field: 'cost_center_description',
                        displayName: "Description",
                        enableColumnMenu: false,
                        enableCellEdit: false ,
                        width:'35%',
                        filter: {
                            placeholder: ''
                        }
                    },
                    {   field: 'compliance',
                        displayName: "Compliance",
                        enableColumnMenu: false,
                        width:'35%',
                        filter: {
                            placeholder: ''
                        }

                    }
                ]
            };
        }

        addCostCenterMappingController.getGridData = function(pageSize, pageNumber, sort, searchInput) {
            return CostCenterMappingService.getEligibleCostCenterData(pageSize, pageNumber,
                sort, searchInput, addEligibleCostCenterData.vendorNumber, addEligibleCostCenterData.vendorSourceSystemId);
        };
        
        addCostCenterMappingController.close = function() {
            $uibModalInstance.dismiss('cancel');
        };
        
        addCostCenterMappingController.select = function() {
            Utils.startBlockUI("add-cost-center");
            var costCentersData = {},
                costCenters = [];
            angular.forEach(addCostCenterMappingController.costCenters, function(data){
                var costCenterObject = {};
                costCenterObject.cost_center_name = data.cost_center_name;
                costCenterObject.cost_center_source_system_id = data.cost_center_source_system_id;
                costCenters.push(costCenterObject);
            });
            costCentersData.costCenters = costCenters;
            addCostCenterMappingPromise = CostCenterMappingService.addCostCenterMapping(addEligibleCostCenterData.vendorNumber, addEligibleCostCenterData.vendorSourceSystemId, costCentersData);
            addCostCenterMappingPromise.then(
                function(response){
                    if (response === 'error') {
                        Utils.stopBlockUI("add-cost-center", 500);
                        addCostCenterMappingController.errorMessage = 'An error occurred while adding eligible cost center mapping data';
                        addCostCenterMappingController.errorHandling(addCostCenterMappingController.errorMessage);
                        addCostCenterMappingPromise = null;
                    }
                    $uibModalInstance.close('refresh');
                },
                function(error){
                    Utils.stopBlockUI("add-cost-center", 500);
                    $uibModalInstance.close('refresh');
                    $log.error("An error occurred while adding eligible cost center mapping data");
                });
        };

        addCostCenterMappingController.errorHandling = function(errorMessage) {
            ModalDialogService.confirm({
                bodyText: errorMessage,
                title: 'Error Message',
                okText: 'Ok'
            });
        };
        
        addCostCenterMappingController.costCenterIndex = function(index) {
            var removedCostCenter = addCostCenterMappingController.costCenters[index];
            addCostCenterMappingController.costCenters.splice(index, 1);
            if(addCostCenterMappingController.costCenters.length === 0 ){
                addCostCenterMappingController.gridApi.selection.clearSelectedRows();
            }
            if(addCostCenterMappingController.gridApi.selection.getSelectedRows().length !== 0 &&
                addCostCenterMappingController.gridApi.selection.getSelectedRows()[0].cost_center_name === removedCostCenter.cost_center_name) {
                addCostCenterMappingController.lastSelectedRow.isSelected = false;
            }
        };
        initialize();
    }
    ]);
})();