(function () {
    'use strict';

    angular.module('adams.add.edit.item.classes.modal.controller', ['common.modules.logging'])
        .controller('AddEditItemClassesModalController', ['$scope', '$uibModalInstance', 'PosItemClassesService', 'action', 'itemClassesRowData', '$log',
            function ($scope, $uibModalInstance, PosItemClassesService, action, itemClassesRowData, $log) {
                var addEditItemClassesModalController = this;

                addEditItemClassesModalController.action = action;
                addEditItemClassesModalController.itemClassesRowData = itemClassesRowData;

                addEditItemClassesModalController.save = function() {
                    if(addEditItemClassesModalController.action === 'Add'){
                        PosItemClassesService.addPosItemClass(addEditItemClassesModalController.itemClassesRowData)
                            .then(function (response) {

                            },function(error){
                                $log.error("An error occurred while adding item classes " + error);
                            });

                    } else {
                        PosItemClassesService.updatePosItemClass(addEditItemClassesModalController.itemClassesRowData)
                            .then(function (response) {

                            },function(error){
                                $log.error("An error occurred while editing item classes " + error);
                            });
                    }

                    $uibModalInstance.dismiss('save');
                };

                addEditItemClassesModalController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        ]);
})();