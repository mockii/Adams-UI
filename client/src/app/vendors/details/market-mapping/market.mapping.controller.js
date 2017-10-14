(function () {
    'use strict';

    angular.module('adams.market.mapping.controller',['common.modules.logging'])
        .controller('MarketMappingController', ['$scope', 'MarketMappingService', 'ModalDialogService', 'CompassToastr', '$uibModal', '$state', '$location', 'vendorSearchData', '$log',
    function($scope, MarketMappingService, ModalDialogService, CompassToastr, $uibModal, $state, $location, vendorSearchData, $log){
        var marketMappingController = this;

        $state.current.data.pageTitle = vendorSearchData.vendor_name_1 + ' (' + vendorSearchData.vendor_number + ')';
        marketMappingController.vendorSearchData = $state.params.vendorSearchData;
        marketMappingController.vendorNumber = $scope.vendorNumber;
        $scope.vendorDetailsController.vendorSearchData = vendorSearchData;

        function initialize() {
            marketMappingController.gridOptions = defineMarketMappingGridOptions();
        }

        marketMappingController.getGridData = function(pageSize, pageNumber, sort, searchInput) {
            var marketName = getSearchValue(searchInput, "market_name"),
                teamName = getSearchValue(searchInput, "team_name");
            return MarketMappingService.getMarketMappingData(pageSize, pageNumber, sort, marketMappingController.vendorNumber, marketName, teamName);
        };

        function getSearchValue(searchInput, propertyName){
            var value = "";
            if(searchInput && angular.isArray(searchInput.search)){
                angular.forEach(searchInput.search, function(searchObject){
                    if(searchObject.property === propertyName){
                        value = searchObject.value || "";
                    }
                });
            }
            return value;
        }

        $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
            // emitted gridOptions and gridApi from Directive controller
            gridApi.grid.appScope.confirmDeleteMarketMapping = marketMappingController.confirmDeleteMarketMapping;
        });

        marketMappingController.confirmDeleteMarketMapping = function(marketMappingRowData) {
            ModalDialogService.confirm({
                bodyText: 'You are about to remove the market mapping between '+marketMappingRowData.market_description + ' and ' + marketMappingRowData.team_name + ' - ' + marketMappingRowData.team_description + ' are you sure you wish to continue?',
                title: 'Confirmation',
                okText: 'Delete',
                cancelText: 'Cancel'
            }).then(function(){
                marketMappingController.deleteMarketMapping(marketMappingRowData);
            });
        };

        $scope.$on('uiGridSelectedRows', function ($event, mySelectedRows, selectionEvent) {
            // emitted selected rows and row selected event from Directive controller
        });

        marketMappingController.deleteMarketMapping = function(marketMappingRowData) {
            MarketMappingService.deleteMarketMapping(marketMappingController.vendorNumber, marketMappingRowData.market_name, marketMappingRowData.team_name,marketMappingRowData.vendor_source_system_id, marketMappingRowData.team_source_system_id).then(
                function(response){
                    CompassToastr.success("You have successfully removed the market mapping between "+marketMappingRowData.market_description+" and "+marketMappingRowData.team_name + ' - ' + marketMappingRowData.team_description + ".");
                    $scope.$broadcast('uiGridParameterChange');
                },
                function(error){
                    $log.error("An error occurred while Deleting Market Mapping");
                });
        };

        marketMappingController.openAddUserMapping = function() {
            var addMarketMappingModal = $uibModal.open({
                                            templateUrl: 'vendors/details/market-mapping/add-market-mapping.tpl.html',
                                            controller: 'AddMarketMappingController as addMarketMappingController',
                                            size: 'lg',
                                            backdrop: 'static',
                                            resolve: {
                                                addMarketMappingData : {'vendorNumber': marketMappingController.vendorNumber,
                                                                        'vendorSourceSystemId': marketMappingController.vendorSearchData === null ? $location.search().source_system_id : marketMappingController.vendorSearchData.source_system_id}
                                            }
                                        });
            addMarketMappingModal.result.then(function(res, err){
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
                columnDefs: [
                    {
                        field: 'name',
                        cellTemplate: '<div><i class="fa fa-trash" aria-hidden="true" ng-click="grid.appScope.confirmDeleteMarketMapping(row.entity)" ng-bind="row.getProperty(col.field)"></i></div>',
                        displayName: "",
                        enableFiltering: false,
                        enableSorting: false,
                        enableColumnMenu: false,
                        enableHiding: false,
                        width:'3%',
                        cellClass: "view-cell"
                    },
                    {   field: 'market_name',
                        displayName: "Market",
                        wordWrap: false,
                        width:'35%',
                        cellTemplate: '<div style="padding-left: 15px; padding-top: 5px;"><b>{{row.entity.market_name}} - {{row.entity.market_description}}</b></div><div class="market-mapping-grid">{{row.entity.market_display_path}}</div>',
                        headerRowHeight: 60,
                        filter: {
                            placeholder: ''
                        }
                    },
                    {   field: 'team_name',
                        displayName: "Team",
                        width:'62%',
                        cellTemplate: '<div style="padding-left: 15px; padding-top: 5px;"><b>{{row.entity.team_name}} - {{row.entity.team_description}}</b></div><div class="market-mapping-grid">{{row.entity.team_display_path}}</div>',
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