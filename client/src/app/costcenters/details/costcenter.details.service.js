(function () {
    angular.module('adams.costcenter.details.service', [])
        .factory('CostCenterDetailsService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', function($rootScope, $http, ADAMS_URL_SPACE, $q) {
            var costcenterDetailsService = {};
            costcenterDetailsService.getCostCenterDetails = function(costCenterNumber,sourceSystemId) {
                var url = ADAMS_URL_SPACE.urls.local.costCenterDetails+ '?sourceSystemId=' + sourceSystemId+ '&costCenterNumber=' + costCenterNumber;
                return $http.get(url)
                    .then(function(response) {
                        return response.data.data[0];
                    }, function(error) {
                          return 'error';
                    });
            };
            return costcenterDetailsService;
        }]);
})();
