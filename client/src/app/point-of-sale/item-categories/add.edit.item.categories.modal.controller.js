(function () {
    'use strict';

    angular.module('adams.add.edit.item.categories.modal.controller', ['common.modules.logging'])
        .controller('AddEditItemCategoriesModalController',  ['$rootScope', '$scope', '$uibModalInstance', 'PosItemCategoriesService', 'action', 'itemCategoriesRowData', '$log',
            function ($rootScope, $scope, $uibModalInstance, PosItemCategoriesService, action, itemCategoriesRowData, $log) {
                var addEditItemCategoriesModalController = this;

                addEditItemCategoriesModalController.action = action;
                addEditItemCategoriesModalController.itemCategoryName = itemCategoriesRowData.name;
                addEditItemCategoriesModalController.itemCategoryDescription = itemCategoriesRowData.description;

                addEditItemCategoriesModalController.save = function() {
                    var itemCategory =
                        {
                            "name" : addEditItemCategoriesModalController.itemCategoryName,
                            "description" : addEditItemCategoriesModalController.itemCategoryDescription
                        };
                    if(addEditItemCategoriesModalController.action === 'Add'){
                        PosItemCategoriesService.addPosItemCategory(itemCategory)
                            .then(function (response) {
                                $uibModalInstance.close(response);
                                $rootScope.$broadcast('reloadItemCategories');
                            },function(error){
                                $log.error("An error occurred while adding item categories " + error);
                            });

                    } else {
                        itemCategory.item_category_code = itemCategoriesRowData.item_category_code;
                        PosItemCategoriesService.updatePosItemCategory(itemCategory)
                            .then(function (response) {
                                $uibModalInstance.close(response);
                                $rootScope.$broadcast('reloadItemCategories');
                            },function(error){
                                $log.error("An error occurred while editing item categories " + error);
                            });
                    }
                };

                addEditItemCategoriesModalController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        ]);
})();