(function () {
    'use strict';

    angular.module('adams.add.edit.revenue.categories.modal.controller', ['common.modules.logging'])
        .controller('AddEditRevenueCategoriesModalController', ['$rootScope', '$scope', '$uibModalInstance', 'action', 'revenueCategoriesRowData', 'PosRevenueCategoriesService', '$log',
            function ($rootScope, $scope, $uibModalInstance, action, revenueCategoriesRowData, PosRevenueCategoriesService, $log) {
                var addEditRevenueCategoriesModalController = this;

                addEditRevenueCategoriesModalController.action = action;
                addEditRevenueCategoriesModalController.revenueCategoryName = revenueCategoriesRowData.name;
                addEditRevenueCategoriesModalController.revenueCategoryType = revenueCategoriesRowData.type;
                addEditRevenueCategoriesModalController.revenueCategoryDescription = revenueCategoriesRowData.description;

                addEditRevenueCategoriesModalController.save = function() {
                    var revenueCategory =
                        {
                            'name' : addEditRevenueCategoriesModalController.revenueCategoryName,
                            'type' : addEditRevenueCategoriesModalController.revenueCategoryType,
                            'description' : addEditRevenueCategoriesModalController.revenueCategoryDescription
                        };
                    if(addEditRevenueCategoriesModalController.action === 'Add'){
                        PosRevenueCategoriesService.addPosRevenueCategory(revenueCategory)
                            .then(function (response) {
                                $uibModalInstance.close(response);
                                $rootScope.$broadcast('reloadRevenueCategories');
                            },function(error){
                                $log.error("An error occurred while adding revenue categories " + error);
                            });
                    } else {
                        revenueCategory.revenue_category_code = revenueCategoriesRowData.revenue_category_code;
                        PosRevenueCategoriesService.updatePosRevenueCategory(revenueCategory)
                            .then(function (response) {
                                $uibModalInstance.close(response);
                                $rootScope.$broadcast('reloadRevenueCategories');
                            },function(error){
                                $log.error("An error occurred while editing revenue categories " + error);
                            });
                    }
                };

                addEditRevenueCategoriesModalController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        ]);

})();