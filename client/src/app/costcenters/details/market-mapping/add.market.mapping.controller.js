(function () {
    angular.module('adams.costcenter.add.market.mapping.controller', ['common.modules.logging']).controller('CostCenterAddMarketMappingController', ['$scope', 'CostCenterMarketMappingService', 'addMarketMappingData', '$state', '$uibModalInstance', 'ModalDialogService', '$timeout', 'Utils', '$log',
        function ($scope, CostCenterMarketMappingService, addMarketMappingData, $state, $uibModalInstance, ModalDialogService, $timeout, Utils, $log) {
            var costCenterAddMarketMappingController = this,
                addMarketMappingPromise;



            function initialize() {
                costCenterAddMarketMappingController.marketMappingRefId = "marketRefId";
                costCenterAddMarketMappingController.disableSelectButton = true;

                costCenterAddMarketMappingController.selectedMarketNode = null;
                costCenterAddMarketMappingController.selectedMarkets = [];
            }


            costCenterAddMarketMappingController.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            costCenterAddMarketMappingController.select = function () {
                Utils.startBlockUI("add-market-mapping");
                var marketMappingData = {};
                marketMappingData.markets = [];
                angular.forEach(costCenterAddMarketMappingController.selectedMarkets, function (obj) {
                    var market = {};
                    // market.source_system_id = obj.source_system_id;
                    market.market_name = obj.market_name;
                    marketMappingData.markets.push(market);
                });
                addMarketMappingPromise = CostCenterMarketMappingService.addCostCenterMarketMapping(addMarketMappingData.costCenterNumber, marketMappingData, addMarketMappingData.costCenterSourceSystemId);
                addMarketMappingPromise.then(
                    function (response) {
                        if (response === 'error') {
                            Utils.stopBlockUI("add-market-mapping", 500);
                            costCenterAddMarketMappingController.errorMessage = 'An error occurred while adding market mapping data';
                            costCenterAddMarketMappingController.errorHandling(costCenterAddMarketMappingController.errorMessage);
                            addMarketMappingPromise = null;
                        }
                        $uibModalInstance.close('refresh');
                    },
                    function (error) {
                        Utils.stopBlockUI("add-market-mapping", 500);
                        $uibModalInstance.close('refresh');
                        $log.error("An error occurred while adding market mapping data");
                    });
            };

            costCenterAddMarketMappingController.errorHandling = function (errorMessage) {
                ModalDialogService.confirm({
                    bodyText: errorMessage,
                    title: 'Error Message',
                    okText: 'Ok'
                });
            };


            /** PRIVATE FUNCTION **/

            function isNodePresent(node, selectedMarketsArray) {
                return (-1 !== selectedMarketsArray.indexOf(node));
            }


            /** LISTENERS **/

            $scope.$on('hierarchyTreeTeamSelectionChange', function (event, refId, isSelected, node) {
                if (isSelected && node && !isNodePresent(node, costCenterAddMarketMappingController.selectedMarkets)) {
                    costCenterAddMarketMappingController.selectedMarkets.push(node);
                } else if (!isSelected && node && isNodePresent(node, costCenterAddMarketMappingController.selectedMarkets)) {
                    costCenterAddMarketMappingController.selectedMarkets.pop(node);
                }
                costCenterAddMarketMappingController.disableSelectButton = costCenterAddMarketMappingController.selectedMarkets.length === 0;
            });


            initialize();
        }]);
})();