(function () {
    'use strict';

    angular.module('adams.add.edit.item.categories.modal.controller', ['common.modules.logging'])
        .controller('AddEditItemCategoriesModalController',  ['$scope', '$uibModalInstance', 'PosItemCategoriesService', 'action', 'itemCategoriesRowData', '$log',
            function ($scope, $uibModalInstance, PosItemCategoriesService, action, itemCategoriesRowData, $log) {
                var addEditItemCategoriesModalController = this;

                addEditItemCategoriesModalController.action = action;
                addEditItemCategoriesModalController.itemCategoriesRowData = itemCategoriesRowData;

                addEditItemCategoriesModalController.save = function() {
                    if(addEditItemCategoriesModalController.action === 'Add'){
                        PosItemCategoriesService.addPosItemCategory(addEditItemCategoriesModalController.itemCategoriesRowData)
                            .then(function (response) {

                            },function(error){
                                $log.error("An error occurred while adding item categories " + error);
                            });

                    } else {
                        PosItemCategoriesService.updatePosItemCategory(addEditItemCategoriesModalController.itemCategoriesRowData)
                            .then(function (response) {

                            },function(error){
                                $log.error("An error occurred while editing item categories " + error);
                            });

                    }
                    $uibModalInstance.dismiss('save');
                };

                addEditItemCategoriesModalController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        ]);
})();