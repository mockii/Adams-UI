(function () {
    'use strict';

    angular.module('adams.add.edit.revenue.categories.modal.controller', ['common.modules.logging'])
        .controller('AddEditRevenueCategoriesModalController', ['$scope', '$uibModalInstance', 'action', 'revenueCategoriesRowData', 'PosRevenueCategoriesService', '$log',
            function ($scope, $uibModalInstance, action, revenueCategoriesRowData, PosRevenueCategoriesService, $log) {
                var addEditRevenueCategoriesModalController = this;

                addEditRevenueCategoriesModalController.action = action;
                addEditRevenueCategoriesModalController.revenueCategoriesRowData = revenueCategoriesRowData;

                addEditRevenueCategoriesModalController.save = function() {
                    if(addEditRevenueCategoriesModalController.action === 'Add'){
                        PosRevenueCategoriesService.addPosRevenueCategory(addEditRevenueCategoriesModalController.revenueCategoriesRowData)
                            .then(function (response) {

                            },function(error){
                                $log.error("An error occurred while adding revenue categories " + error);
                            });

                    } else {
                        PosRevenueCategoriesService.updatePosRevenueCategory(addEditRevenueCategoriesModalController.revenueCategoriesRowData)
                            .then(function (response) {

                            },function(error){
                                $log.error("An error occurred while editing revenue categories " + error);
                            });
                    }

                    $uibModalInstance.dismiss('save');
                };

                addEditRevenueCategoriesModalController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        ]);

})();