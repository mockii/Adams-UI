(function () {
    'use strict';

    angular.module('adams.add.market.mapping.controller',['common.modules.logging']).controller('AddMarketMappingController',[ '$scope', 'MarketMappingService', 'addMarketMappingData', '$state','$uibModalInstance', 'ModalDialogService', '$timeout', 'Utils', '$log',
    function($scope, MarketMappingService, addMarketMappingData, $state, $uibModalInstance, ModalDialogService, $timeout, Utils, $log){
        var addMarketMappingController = this,
            addMarketMappingPromise;
        addMarketMappingController.marketMappingRefId = "marketRefId";
        addMarketMappingController.teamMappingRefId = "teamRefId";
        addMarketMappingController.disableSelectButton = true;
        function initialize() {
            addMarketMappingController.selectedMarketNode = null;
            addMarketMappingController.selectedTeams = [];
        }
        addMarketMappingController.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.$on('hierarchyTreeTeamSelectionChange', function(event, refId, isSelected, node){
            if(refId === addMarketMappingController.marketMappingRefId) {
                addMarketMappingController.selectedMarketNode = node;
            }
            else {
                if(isSelected && node && !isNodePresent(node, addMarketMappingController.selectedTeams)) {
                    addMarketMappingController.selectedTeams.push(node);
                } else if(!isSelected && node && isNodePresent(node, addMarketMappingController.selectedTeams)){
                    addMarketMappingController.selectedTeams.pop(node);
                }
            }
            addMarketMappingController.disableSelectButton = (!(addMarketMappingController.selectedMarketNode != null && addMarketMappingController.selectedTeams.length !== 0));
        });

        addMarketMappingController.select = function() {
            Utils.startBlockUI("add-market-mapping");
            var marketMappingData = {};
            marketMappingData.teams = [];
            angular.forEach(addMarketMappingController.selectedTeams, function(obj){
                var team = {};
                team.source_system_id = obj.source_system_id;
                team.team_name = obj.team_name;
                marketMappingData.teams.push(team);
            });
            addMarketMappingPromise = MarketMappingService.addMarketMapping(addMarketMappingData.vendorNumber, addMarketMappingController.selectedMarketNode.market_name, addMarketMappingData.vendorSourceSystemId, marketMappingData);
            addMarketMappingPromise.then(
                function(response){
                    if (response === 'error') {
                        Utils.stopBlockUI("add-market-mapping", 500);
                        addMarketMappingController.errorMessage = 'An error occurred while adding market mapping data';
                        addMarketMappingController.errorHandling(addMarketMappingController.errorMessage);
                        addMarketMappingPromise = null;
                    }
                    $uibModalInstance.close('refresh');
                },
                function(error){
                    Utils.stopBlockUI("add-market-mapping", 500);
                    $uibModalInstance.close('refresh');
                    $log.error("An error occurred while adding market mapping data");
                });
        };

        addMarketMappingController.errorHandling = function(errorMessage) {
            ModalDialogService.confirm({
                bodyText: errorMessage,
                title: 'Error Message',
                okText: 'Ok'
            });
        };

        function isNodePresent(node, selectedTeamsArray){
            return(-1 !== selectedTeamsArray.indexOf(node));
        }
        initialize();
    }
    ]);

})();