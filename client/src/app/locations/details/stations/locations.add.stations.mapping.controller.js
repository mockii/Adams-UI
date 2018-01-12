(function () {
    angular.module('adams.locations.add.stations.mapping.controller',['common.modules.logging'])
        .controller('AddOrEditStationsMappingController', ['$scope', '$uibModalInstance', 'ModalDialogService', 'LocationsStationsMappingService', 'LocationsCostCenterMappingService', 'stationsData', 'CompassToastr', 'Utils', '$interval', '$log',
    function($scope, $uibModalInstance, ModalDialogService, LocationsStationsMappingService, LocationsCostCenterMappingService, stationsData, CompassToastr, Utils, $interval, $log){
        var addOrEditStationsMappingController = this,
            stationsPromise;

        addOrEditStationsMappingController.stationRefId = "stationMappingSelection";
        addOrEditStationsMappingController.costCenterRefId = "costCenterMappingSelection";
        addOrEditStationsMappingController.lastSelectedStation = {};
        addOrEditStationsMappingController.lastSelectedCostCenter = {};
        addOrEditStationsMappingController.selectedStations = [];
        addOrEditStationsMappingController.selectedCostCenters = [];
        addOrEditStationsMappingController.locationsSearchData = stationsData.locationsSearchData;

        function initialize() {
            addOrEditStationsMappingController.gridStationsOptions = defineStationsGridOptions();
            addOrEditStationsMappingController.gridCostCentersOptions = defineCostCentersGridOptions();
        }

        $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi, refId) {
            addOrEditStationsMappingController.gridApi = gridApi;
        });

        $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent, refId) {
            // emitted selected rows and row selected event from Directive controller
            addOrEditStationsMappingController.mySelectedRows = mySelectedRows;
            if(refId === addOrEditStationsMappingController.stationRefId){
                addOrEditStationsMappingController.lastSelectedStation = addOrEditStationsMappingController.mySelectedRows[0] || {};
                addOrEditStationsMappingController.selectedStations = addOrEditStationsMappingController.mySelectedRows;
            }

            if(refId === addOrEditStationsMappingController.costCenterRefId){
                addOrEditStationsMappingController.lastSelectedCostCenter = addOrEditStationsMappingController.mySelectedRows[0] || {};
                addOrEditStationsMappingController.selectedCostCenters = addOrEditStationsMappingController.mySelectedRows;
            }

            if(Object.keys(addOrEditStationsMappingController.lastSelectedStation).length !== 0 &&
                Object.keys(addOrEditStationsMappingController.lastSelectedCostCenter).length !== 0){
                var costCenterRecord = addOrEditStationsMappingController.lastSelectedCostCenter.cost_center_name +' - '+ addOrEditStationsMappingController.lastSelectedCostCenter.cost_center_description;
                if(isStationCostCenterRecordPresent(stationsData.stationsGridData,
                        addOrEditStationsMappingController.lastSelectedStation, addOrEditStationsMappingController.lastSelectedCostCenter)) {
                    /*ModalDialogService.confirm({
                        bodyText: costCenterRecord + " already exists for station " + addOrEditStationsMappingController.lastSelectedStation.station_name+ ". Would you like to continue adding?",
                        title: 'Confirmation',
                        okText: 'Ok',
                        cancelText: 'Cancel'
                    }).then(function () {
                        // Do nothing
                    }, function(error){
                        addOrEditStationsMappingController.lastSelectedStation = {};
                        addOrEditStationsMappingController.lastSelectedCostCenter = {};
                        addOrEditStationsMappingController.selectedStations = [];
                        addOrEditStationsMappingController.selectedCostCenters = [];
                    });*/
                    CompassToastr.warning(costCenterRecord + " already exists for station " + addOrEditStationsMappingController.lastSelectedStation.station_name);
                }
            }
        });

        function isStationCostCenterRecordPresent(stationsGridData, selectedStation, selectedCostCenter){
            for (var i = 0; i < stationsGridData.length; i++){
                var stationGridObject = stationsGridData[i];
                if(stationGridObject.station_code === selectedStation.station_code &&
                    stationGridObject.cost_center_name === selectedCostCenter.cost_center_name &&
                    stationGridObject.source_system_id === selectedCostCenter.source_system_id){
                    return true;
                }
            }
            return false;
        }

        addOrEditStationsMappingController.getStationsGridData = function(pageSize, pageNumber, sort, searchInput) {
            return LocationsStationsMappingService.getStations(pageSize, pageNumber, sort, searchInput);
        };

        addOrEditStationsMappingController.getCostCentersGridData = function(pageSize, pageNumber, sort, searchInput) {
            return LocationsCostCenterMappingService.getCostCentersByLocationCode(pageSize, pageNumber, sort, stationsData.locationCode, searchInput);
        };
        
        addOrEditStationsMappingController.close = function() {
            $uibModalInstance.dismiss('cancel');
        };
        
        addOrEditStationsMappingController.select = function() {
            Utils.startBlockUI("add-station");
            var costCentersData = {},
                locCcStations = [];
            angular.forEach(addOrEditStationsMappingController.selectedCostCenters, function(data){
                var costCenterObject = {};
                costCenterObject.cost_center_name = data.cost_center_name;
                costCenterObject.source_system_id = data.source_system_id;
                costCenterObject.station_code = addOrEditStationsMappingController.lastSelectedStation.station_code;
                locCcStations.push(costCenterObject);
            });
            costCentersData.locCcStations = locCcStations;
            stationsPromise = LocationsStationsMappingService.addStationsByLocationCode(stationsData.locationCode, costCentersData);
            stationsPromise.then(
                function(response){
                    if (response === 'error') {
                        Utils.stopBlockUI("add-station", 500);
                        addOrEditStationsMappingController.errorMessage = 'An error occurred while adding Linked\ Available cost center mapping data to a station';
                        addOrEditStationsMappingController.errorHandling(addOrEditStationsMappingController.errorMessage);
                        stationsPromise = null;
                    }
                    $uibModalInstance.close('refresh');
                },
                function(error){
                    Utils.stopBlockUI("add-station", 500);
                    $uibModalInstance.close('refresh');
                    $log.error("An error occurred while adding Linked\ Available cost center mapping data to a station");
                });
        };

        addOrEditStationsMappingController.errorHandling = function(errorMessage) {
            ModalDialogService.confirm({
                bodyText: errorMessage,
                title: 'Error Message',
                okText: 'Ok'
            });
        };

        function defineStationsGridOptions(){
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
                noUnselect: false,
                showColumnFooter: false,
                showSelectionCheckbox: false,
                treeRowHeaderAlwaysVisible: false,
                enableGridMenu: false,
                enableSorting: false,
                enableHorizontalScrollbar: 1,
                columnDefs: [
                    {
                        field: 'station_name',
                        displayName: "",
                        enableColumnMenu: false,
                        enableCellEdit: false ,
                        width:'100%',
                        filter: {
                            placeholder: ''
                        }
                    }
                ]
            };
        }

        function defineCostCentersGridOptions(){
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
                noUnselect: false,
                showColumnFooter: false,
                showSelectionCheckbox: false,
                treeRowHeaderAlwaysVisible: false,
                enableGridMenu: false,
                enableSorting: false,
                enableHorizontalScrollbar: 1,
                columnDefs: [
                    {
                        field: 'cost_center_name',
                        displayName: "Cost Center Name",
                        enableColumnMenu: false,
                        enableCellEdit: false,
                        width:'40%',
                        filter: {
                            placeholder: ''
                        }
                    },{
                        field: 'cost_center_description',
                        displayName: "Cost Center Description",
                        enableColumnMenu: false,
                        enableCellEdit: false,
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