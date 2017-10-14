(function () {
    angular.module('adams.locations.add.cost.center.mapping.controller',['common.modules.logging'])
        .controller('LocationsAddCostCenterMappingController', ['$scope', '$uibModalInstance', 'ModalDialogService', 'LocationsCostCenterMappingService', 'addEligibleCostCenterData', 'CompassToastr', 'Utils', '$log',
    function($scope, $uibModalInstance, ModalDialogService, LocationsCostCenterMappingService, addEligibleCostCenterData, CompassToastr, Utils, $log){
        var locationsAddCostCenterMappingController = this,
            addCostCenterMappingPromise;

        locationsAddCostCenterMappingController.refId = "addCostCenterMappingSelection";
        locationsAddCostCenterMappingController.costCenters = [];
        locationsAddCostCenterMappingController.locationsSearchData = addEligibleCostCenterData.locationsSearchData;

        function initialize() {
            locationsAddCostCenterMappingController.gridOptions = defineAddCostCenterGridOptions();
        }

        $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
            // emitted gridOptions and gridApi from Directive controller
        });

        $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
            // emitted selected rows and row selected event from Directive controller
            locationsAddCostCenterMappingController.mySelectedRows = mySelectedRows;
            var costCenterRecord = locationsAddCostCenterMappingController.mySelectedRows[0].cost_center_name +' - '+ locationsAddCostCenterMappingController.mySelectedRows[0].cost_center_description;
            locationsAddCostCenterMappingController.lastSelectedRow = locationsAddCostCenterMappingController.mySelectedRows[0];

            if(!isCostCenterRecordPresent(locationsAddCostCenterMappingController.mySelectedRows[0], locationsAddCostCenterMappingController.costCenters)) {
                locationsAddCostCenterMappingController.costCenters.push(locationsAddCostCenterMappingController.mySelectedRows[0]);
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
                    selectedCostCenter.source_system_id === currentCostCenterRecord.source_system_id){
                    return true;
                }
            }
            return false;
        }

        locationsAddCostCenterMappingController.getGridData = function(pageSize, pageNumber, sort, searchInput) {
            return LocationsCostCenterMappingService.getCostCentersByUserName(pageSize, pageNumber, sort, searchInput);
        };
        
        locationsAddCostCenterMappingController.close = function() {
            $uibModalInstance.dismiss('cancel');
        };
        
        locationsAddCostCenterMappingController.select = function() {
            Utils.startBlockUI("add-cost-center");
            var costCentersData = {},
                costCenters = [];
            angular.forEach(locationsAddCostCenterMappingController.costCenters, function(data){
                var costCenterObject = {};
                costCenterObject.cost_center_name = data.cost_center_name;
                costCenterObject.source_system_id = data.source_system_id;
                costCenters.push(costCenterObject);
            });
            costCentersData.costCenters = costCenters;
            addCostCenterMappingPromise = LocationsCostCenterMappingService.addCostCentersByLocationCode(addEligibleCostCenterData.locationCode, costCentersData);
            addCostCenterMappingPromise.then(
                function(response){
                    if (response === 'error') {
                        Utils.stopBlockUI("add-cost-center", 500);
                        locationsAddCostCenterMappingController.errorMessage = 'An error occurred while adding eligible cost center mapping data';
                        locationsAddCostCenterMappingController.errorHandling(locationsAddCostCenterMappingController.errorMessage);
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

        locationsAddCostCenterMappingController.errorHandling = function(errorMessage) {
            ModalDialogService.confirm({
                bodyText: errorMessage,
                title: 'Error Message',
                okText: 'Ok'
            });
        };


        $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
            locationsAddCostCenterMappingController.gridApi = gridApi;
        });
        
        locationsAddCostCenterMappingController.costCenterIndex = function(index) {
            if(locationsAddCostCenterMappingController.costCenters.length === 0 ){
                locationsAddCostCenterMappingController.gridApi.selection.clearSelectedRows();
            }
            else if(locationsAddCostCenterMappingController.costCenters.length > 0) {
                var removedCostCenter = locationsAddCostCenterMappingController.costCenters[index];
                locationsAddCostCenterMappingController.costCenters.splice(index, 1);
                if(locationsAddCostCenterMappingController.gridApi.selection.getSelectedRows().length !== 0 &&
                    locationsAddCostCenterMappingController.gridApi.selection.getSelectedRows()[0].cost_center_name === removedCostCenter.cost_center_name) {
                    locationsAddCostCenterMappingController.lastSelectedRow = {};
                }
            } else {
                // Do nothing
            }
        };

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
                    {
                        field: 'cost_center_name',
                        displayName: "Name",
                        enableColumnMenu: false,
                        enableCellEdit: false ,
                        width:'40%',
                        filter: {
                            placeholder: ''
                        }
                    },
                    {
                        field: 'cost_center_description',
                        displayName: "Description",
                        enableColumnMenu: false,
                        enableCellEdit: false ,
                        width:'60%',
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