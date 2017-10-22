(function () {

    angular.module('adams.costcenter.market.mapping.controller', ['common.modules.logging']).controller('CostCenterMarketMappingController', ['$scope', 'CostCenterMarketMappingService', 'ModalDialogService', 'CompassToastr', '$uibModal', '$state', '$location', 'costCenterSearchData', 'defaultMarket', '$log',
        function ($scope, CostCenterMarketMappingService, ModalDialogService, CompassToastr, $uibModal, $state, $location, costCenterSearchData, defaultMarket, $log) {
            var costCenterMarketMappingController = this;

            function initialize() {
                $state.current.data.pageTitle = costCenterSearchData.cost_center_description + ' (' + costCenterSearchData.cost_center + ')';
                costCenterMarketMappingController.costCenterSearchData = $state.params.costCenterSearchData;
                costCenterMarketMappingController.costCenterNumber = $state.params.costCenter_number;
                $scope.costCenterDetailsController.costCenterSearchData = costCenterSearchData;
                costCenterMarketMappingController.sourceSystemId = $state.params.costCenter_source_system_id;
                costCenterMarketMappingController.defaultMarket = defaultMarket || {};

                costCenterMarketMappingController.gridOptions = defineMarketMappingGridOptions();
                // costCenterMarketMappingController.gridOptions.data[0].market_display_path
            }

            costCenterMarketMappingController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                return CostCenterMarketMappingService.getMarketMappingData(pageSize, pageNumber, sort, costCenterMarketMappingController.costCenterNumber, costCenterMarketMappingController.sourceSystemId, searchInput);
            };

            $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                // emitted gridOptions and gridApi from Directive controller
                gridApi.grid.appScope.confirmDeleteMarketMapping = costCenterMarketMappingController.confirmDeleteMarketMapping;
            });

            costCenterMarketMappingController.confirmDeleteMarketMapping = function (marketMappingRowData) {
                ModalDialogService.confirm({
                    bodyText: 'You are about to remove market ' + marketMappingRowData.market_name + ', are you sure you wish to continue?',
                    title: 'Confirmation',
                    okText: 'Delete',
                    cancelText: 'Cancel'
                }).then(function () {
                    costCenterMarketMappingController.deleteCostCentersMarket(marketMappingRowData);
                });
            };


            costCenterMarketMappingController.deleteCostCentersMarket = function (marketMappingRowData) {
                CostCenterMarketMappingService.deleteCostCentersMarket(costCenterMarketMappingController.costCenterNumber, marketMappingRowData.market_name, costCenterMarketMappingController.sourceSystemId).then(
                    function (response) {
                        CompassToastr.success("You have successfully removed the market mapping between " + marketMappingRowData.market_name +".");
                        $scope.$broadcast('uiGridParameterChange');
                    },
                    function (error) {
                        $log.error("An error occurred while Deleting Market Mapping ", error);
                    });
            };

            costCenterMarketMappingController.openAddUserMapping = function () {
                var addMarketMappingModal = $uibModal.open({
                    templateUrl: 'costcenters/details/market-mapping/add-market-mapping.tpl.html',
                    controller: 'CostCenterAddMarketMappingController as costCenterAddMarketMappingController',
                    size: 'lg',
                    backdrop: 'static',
                    resolve: {
                        addMarketMappingData: {
                            'costCenterNumber': costCenterMarketMappingController.costCenterNumber,
                            'costCenterSourceSystemId': costCenterMarketMappingController.costCenterSearchData === null ? $location.search().costCenter_source_system_id : costCenterMarketMappingController.costCenterSearchData.source_system_id
                        }
                    }
                });
                addMarketMappingModal.result.then(function (res, err) {
                    // Refresh the Grid. Callback
                    $scope.$broadcast('uiGridParameterChange');
                });
            };


            /** PRIVATE FUNCTIONS **/

            function defineMarketMappingGridOptions() {
                return {
                    paginationPageSizes: [25, 50, 75],
                    paginationPageSize: 25, // pagination out of box
                    virtualizationThreshold: 25,
                    useExternalPagination: true,
                    useExternalFiltering: true,
                    enableFiltering: true, //step1 to enable all grid columns filtering
                    enableRowSelection: true,
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    noUnselect: true,
                    showColumnFooter: false,
                    treeRowHeaderAlwaysVisible: false,
                    enableGridMenu: true, //true will display grid menu on top-right
                    enableSorting: true,
                    data: [],
                    columnDefs: [
                        {
                            field: 'name',
                            cellTemplate: '<div><i class="fa fa-trash" aria-hidden="true" ng-click="grid.appScope.confirmDeleteMarketMapping(row.entity)" ng-bind="row.getProperty(col.field)"></i></div>',
                            displayName: "",
                            enableFiltering: false,
                            enableSorting: false,
                            enableColumnMenu: false,
                            enableHiding: false,
                            width: '3%',
                            cellClass: "view-cell"
                        },
                        {
                            field: 'market_name',
                            displayName: "Market",
                            wordWrap: false,
                            width: '100%',
                            cellTemplate: '<div style="padding-left: 15px; padding-top: 5px;"><b>{{row.entity.market_name}} - {{row.entity.market_description}}</b></div><div class="market-mapping-grid"">{{row.entity.market_display_path}}</div>',
                            headerRowHeight: 60,
                            filter: {
                                placeholder: ''
                            }
                        }
                    ]
                };
            }

            initialize();
        }]);
})();