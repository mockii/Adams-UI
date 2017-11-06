'use strict';

(function () {

    angular.module('adams.point.of.sale.item.details.service', [])
        .factory('PointOfSaleItemDetailsService', ['$rootScope', '$q', '$http', 'ADAMS_URL_SPACE', '$log',
            'PosRevenueCategoriesService', 'PosItemCategoriesService', 'PosItemClassesService', 'PointOfSaleSystemCategoriesService',
            function ($rootScope, $q, $http, ADAMS_URL_SPACE, $log,
                      PosRevenueCategoriesService, PosItemCategoriesService, PosItemClassesService, PointOfSaleSystemCategoriesService) {

                var pointOfSaleItemDetailsService =
                    {
                        revenueCategories : [],
                        itemCategories : [],
                        itemClasses : [],
                        typeDetailsRepo : [],
                        typeDetails : {}
                    };

                pointOfSaleItemDetailsService.getPosItem = function (posId) {
                    var posItemDeferred = $q.defer(),
                        url = ADAMS_URL_SPACE.urls.local.getPosItem.replace('{pos_id}', posId);

                    var request = $http({
                        method: "get",
                        url: url,
                        timeout: posItemDeferred.promise
                    });

                    var promise = request.then(
                        function (response) {
                            return response.data;
                        },
                        function (error) {
                            return [];
                        }
                    );

                    return promise;
                };

                pointOfSaleItemDetailsService.getAllPosRevenueCategoriesDetails = function () {
                    if(pointOfSaleItemDetailsService.revenueCategories.length === 0){
                        var revenueCategoriesPromise = PosRevenueCategoriesService.getAllPosRevenueCategoriesDetails('','','','');

                        revenueCategoriesPromise.then(
                            function (response) {
                                pointOfSaleItemDetailsService.revenueCategories = response;
                            },
                            function (error) {
                                $log.error(error);
                            }
                        );
                        return revenueCategoriesPromise;
                    }else{
                        var deferred = $q.defer();
                        deferred.resolve(pointOfSaleItemDetailsService.revenueCategories);
                        return deferred.promise;
                    }
                };

                pointOfSaleItemDetailsService.getAllPosItemCategoriesDetails = function () {
                    if(pointOfSaleItemDetailsService.itemCategories.length === 0){
                        var itemCategoriesPromise = PosItemCategoriesService.getAllPosItemCategoriesDetails('','','','');

                        itemCategoriesPromise.then(
                            function (response) {
                                pointOfSaleItemDetailsService.itemCategories = response;
                            },
                            function (error) {
                                $log.error(error);
                            }
                        );
                        return itemCategoriesPromise;
                    }else{
                        var deferred = $q.defer();
                        deferred.resolve(pointOfSaleItemDetailsService.itemCategories);
                        return deferred.promise;
                    }
                };

                pointOfSaleItemDetailsService.getAllPosItemClassesDetails = function () {
                    if(pointOfSaleItemDetailsService.itemClasses.length === 0){
                        var itemClassesPromise = PosItemClassesService.getAllPosItemClassesDetails('','','','');

                        itemClassesPromise.then(
                            function (response) {
                                pointOfSaleItemDetailsService.itemClasses = response;
                            },
                            function (error) {
                                $log.error(error);
                            }
                        );
                        return itemClassesPromise;
                    }else{
                        var deferred = $q.defer();
                        deferred.resolve(pointOfSaleItemDetailsService.itemClasses);
                        return deferred.promise;
                    }
                };

                pointOfSaleItemDetailsService.getTypeDetailsForSystemCategoryAndVendor = function (systemCategory, vendorName, type) {
                    if(shouldLoadTypeDetails(systemCategory, vendorName, type)){
                        var typeDetailsPromise = PointOfSaleSystemCategoriesService.getTypeDetailsForSystemCategoryAndVendor(systemCategory, vendorName, type);

                        typeDetailsPromise.then(
                            function (response) {
                                pointOfSaleItemDetailsService.typeDetailsRepo.push(
                                    {
                                        "systemCategory": systemCategory,
                                        "vendorName": vendorName,
                                        "type": type,
                                        "details": response
                                    }
                                );
                            },
                            function (error) {
                                $log.error(error);
                            }
                        );
                        return typeDetailsPromise;
                    }else{
                        var deferred = $q.defer();
                        deferred.resolve(pointOfSaleItemDetailsService.typeDetails.details);
                        return deferred.promise;
                    }

                };

                function shouldLoadTypeDetails(systemCategory, vendorName, type) {
                    for(var index=0;index<pointOfSaleItemDetailsService.typeDetailsRepo.length;index++){
                        if(pointOfSaleItemDetailsService.typeDetailsRepo[index].systemCategory === systemCategory &&
                            pointOfSaleItemDetailsService.typeDetailsRepo[index].vendorName === vendorName &&
                            pointOfSaleItemDetailsService.typeDetailsRepo[index].type === type){
                            pointOfSaleItemDetailsService.typeDetails = pointOfSaleItemDetailsService.typeDetailsRepo[index];
                            return false;
                        }
                    }
                    return true;
                }

                $rootScope.$on('reloadRevenueCategories', function () {
                    pointOfSaleItemDetailsService.revenueCategories = [];
                });

                $rootScope.$on('reloadItemCategories', function () {
                    pointOfSaleItemDetailsService.itemCategories = [];
                });

                $rootScope.$on('reloadItemClasses', function () {
                    pointOfSaleItemDetailsService.itemClasses = [];
                });

                $rootScope.$on('reloadTypeDetails', function ($event, systemCategory, vendorName, type) {
                    for(var index=0;index<pointOfSaleItemDetailsService.typeDetailsRepo.length;index++){
                        if(pointOfSaleItemDetailsService.typeDetailsRepo[index].systemCategory === systemCategory &&
                            pointOfSaleItemDetailsService.typeDetailsRepo[index].vendorName === vendorName &&
                            pointOfSaleItemDetailsService.typeDetailsRepo[index].type === type){
                            pointOfSaleItemDetailsService.typeDetailsRepo.splice(index,1);
                            break;
                        }
                    }
                });

                return pointOfSaleItemDetailsService;
            }]);

})();