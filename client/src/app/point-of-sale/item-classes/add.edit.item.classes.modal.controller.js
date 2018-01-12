(function () {
    'use strict';

    angular.module('adams.add.edit.item.classes.modal.controller', ['common.modules.logging'])
        .controller('AddEditItemClassesModalController', ['$rootScope', '$scope', '$uibModalInstance', 'PosItemClassesService', 'action', 'itemClassesGridData', 'itemClassesRowData', '$log',
            function ($rootScope, $scope, $uibModalInstance, PosItemClassesService, action, itemClassesGridData, itemClassesRowData, $log) {
                var addEditItemClassesModalController = this;

                addEditItemClassesModalController.action = action;
                addEditItemClassesModalController.isInvalidRange = false;
                addEditItemClassesModalController.itemClassesGridData = itemClassesGridData;
                addEditItemClassesModalController.itemClassesRowData = itemClassesRowData;
                addEditItemClassesModalController.itemClassName = itemClassesRowData.name;
                addEditItemClassesModalController.itemClassRangeStart = itemClassesRowData.range_start;
                addEditItemClassesModalController.itemClassRangeEnd = itemClassesRowData.range_end;
                addEditItemClassesModalController.itemClassDescription = itemClassesRowData.description;

                addEditItemClassesModalController.save = function() {
                    if((addEditItemClassesModalController.itemClassRangeStart !== itemClassesRowData.range_start ||
                        addEditItemClassesModalController.itemClassRangeEnd !== itemClassesRowData.range_end)) {
                        addEditItemClassesModalController.isInvalidRange = addEditItemClassesModalController.itemClassRangeStart >= addEditItemClassesModalController.itemClassRangeEnd ||
                            doesRangeOverlapWithOthers();
                    }

                    if(!addEditItemClassesModalController.isInvalidRange){
                        var itemClass =
                            {
                                "name" : addEditItemClassesModalController.itemClassName,
                                "range_start" : addEditItemClassesModalController.itemClassRangeStart,
                                "range_end" : addEditItemClassesModalController.itemClassRangeEnd,
                                "description" : addEditItemClassesModalController.itemClassDescription
                            };
                        if(addEditItemClassesModalController.action === 'Add'){
                            PosItemClassesService.addPosItemClass(itemClass)
                                .then(function (response) {
                                    $uibModalInstance.close(response);
                                    $rootScope.$broadcast('reloadItemClasses');
                                },function(error){
                                    $log.error("An error occurred while adding item classes " + error);
                                });

                        } else {
                            itemClass.item_class_code = itemClassesRowData.item_class_code;
                            PosItemClassesService.updatePosItemClass(itemClass)
                                .then(function (response) {
                                    $uibModalInstance.close(response);
                                    $rootScope.$broadcast('reloadItemClasses');
                                },function(error){
                                    $log.error("An error occurred while editing item classes " + error);
                                });
                        }
                    }
                };

                /* Check if the entered start range and end range already exists or overlaps */
                function doesRangeOverlapWithOthers(){
                    return isInsideExistingRange(addEditItemClassesModalController.itemClassRangeStart) ||
                        isInsideExistingRange(addEditItemClassesModalController.itemClassRangeEnd);
                }

                function isInsideExistingRange(numberToValidate) {
                    for(var i = 0; i < itemClassesGridData.length; i++){
                        if(itemClassesRowData !== itemClassesGridData[i] &&
                            numberToValidate >= itemClassesGridData[i].range_start &&
                            numberToValidate <= itemClassesGridData[i].range_end){
                            return true;
                        }
                    }
                    return false;
                }

                addEditItemClassesModalController.close = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        ]);
})();