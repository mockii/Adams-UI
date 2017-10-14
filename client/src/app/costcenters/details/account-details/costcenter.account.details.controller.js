(function () {
    angular.module('adams.costcenter.account.details.controller', []).controller('CostCenterAccountDetailsController', ['$state', '$scope', '$location', 'CostCenterDetailsService', 'costCenterSearchData',
        function ($state, $scope, $location, CostCenterDetailsService, costCenterSearchData) {
            var costCenterAccountDetailsController = this;

            $state.current.data.pageTitle = costCenterSearchData.cost_center_description + ' (' + costCenterSearchData.cost_center + ')';
            costCenterAccountDetailsController.costCenterSearchData = costCenterSearchData;
            $scope.costCenterDetailsController.costCenterSearchData = costCenterAccountDetailsController.costCenterSearchData;
        }]);
})();