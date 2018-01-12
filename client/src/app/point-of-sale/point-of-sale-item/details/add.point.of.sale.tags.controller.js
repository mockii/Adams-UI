(function () {
    'use strict';

    angular.module('adams.point.of.sale.add.tags.controller',[])
        .controller('AddPointOfSaleTagsController',['$scope', '$q', '$uibModalInstance', '$interval', 'selectedTags', 'availableTags',
            function ($scope, $q, $uibModalInstance, $interval, selectedTags, availableTags) {

            var addPointOfSaleTagsController = this;

            function initialize() {
                addPointOfSaleTagsController.tagsGridId = 0;

                addPointOfSaleTagsController.newSelectedTags = [];
                addPointOfSaleTagsController.newSelectedTags = addPointOfSaleTagsController.newSelectedTags.concat(selectedTags.tags);
                addPointOfSaleTagsController.tags = availableTags.tags;
            }

            addPointOfSaleTagsController.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            addPointOfSaleTagsController.select = function () {
                $uibModalInstance.close({newSelectedTags: addPointOfSaleTagsController.newSelectedTags});
            };

            addPointOfSaleTagsController.addTag = function (tagToAdd) {
                var tagAddedAlready;

                for(var index=0; index<addPointOfSaleTagsController.newSelectedTags.length; index++){
                    if(addPointOfSaleTagsController.newSelectedTags[index].tag_name === tagToAdd.tag_name){
                        tagAddedAlready = true;
                        break;
                    }
                }

                if(!tagAddedAlready) {
                    addPointOfSaleTagsController.newSelectedTags.push(tagToAdd);
                }
            };

            addPointOfSaleTagsController.removeTag = function (tagName) {
                for(var index=0; index<addPointOfSaleTagsController.newSelectedTags.length; index++) {
                    if(addPointOfSaleTagsController.newSelectedTags[index].tag_name === tagName) {
                        addPointOfSaleTagsController.newSelectedTags.splice(index, 1);
                        break;
                    }
                }
            };

            initialize();
        }
    ]);
})();