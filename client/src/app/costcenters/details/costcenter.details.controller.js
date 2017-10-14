(function () {
    angular.module('adams.costcenter.details.controller', []).controller('CostCenterDetailsController', ['$state', '$scope', '$location', 'CostCenterDetailsService',
        function ($state, $scope, $location, CostCenterDetailsService) {
            var costCenterDetailsController = this;

            costCenterDetailsController.costCenterSearchData = {};
            costCenterDetailsController.isCollapsed = true;

            //Getting costCenter number and assigning at scope level store in scope and use in other tabs to avoid replicating code
            var costCenterNumber = $location.path().split('/')[2];
            $scope.costCenterNumber = costCenterNumber;

        }]);
})();