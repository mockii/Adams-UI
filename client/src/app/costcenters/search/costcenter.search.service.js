(function () {
    angular.module('adams.costcenter.search.service', ['common.modules.logging'])
        .factory('CostCenterSearchService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', '$log', function ($rootScope, $http, ADAMS_URL_SPACE, $q, $log) {
            $log.debug('Costcenter Search Response debug');
            var costCenterSearchService = {};
            costCenterSearchService.getAllCostCenterSearchDetails = function (limit, page, costCenterSearchInput, sort, fields) {
                var costCenterSearchDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.costCenters + '?limit=' + limit + '&page=' + page + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput) + '&sort=' + sort + '&fields=' + fields;

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: costCenterSearchDeferred.promise
                });
                $log.info('costcenter Search Details Requested info');
                var promise = request.then(
                    function (response) {
                        $log.warn('costcenter Search Response Successful warn' + JSON.stringify(response.data));
                        return ( response.data );
                    },
                    function (error) {
                        return [];
                    }
                );
                promise.abort = function () {
                    costCenterSearchDeferred.resolve();
                };

                promise.finally(
                    function () {
                        $log.error('Garbage Collecting costcenter Search Promise error');
                        $log.log('Garbage Collecting costcenter Search Promise trace');
                        promise.abort = angular.noop;
                        costCenterSearchDeferred = request = promise = null;
                    }
                );
                return ( promise );
            };
            return costCenterSearchService;
        }]);
})();