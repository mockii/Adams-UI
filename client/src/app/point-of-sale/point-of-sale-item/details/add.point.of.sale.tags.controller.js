(function () {
    'use strict';

    angular.module('adams.point.of.sale.add.tags.controller',[])
        .controller('AddPointOfSaleTagsController',['$scope', '$q', '$uibModalInstance', '$interval', 'selectedTags',
            function ($scope, $q, $uibModalInstance, $interval, selectedTags) {

            var addPointOfSaleTagsController = this;

            function initialize() {
                addPointOfSaleTagsController.tagsGridId = 0;

                addPointOfSaleTagsController.newSelectedTags = [];
                addPointOfSaleTagsController.newSelectedTags = addPointOfSaleTagsController.newSelectedTags.concat(selectedTags.tags);
                addPointOfSaleTagsController.tags=
                    {
                    "metadata":
                        {
                            "resultCount": 15,
                            "status": "success",
                            "http_status_code": "200"
                        },
                    "data":
                        [
                            {"name":"Tag One"},
                            {"name":"Tag Two"},
                            {"name":"Tag Three"},
                            {"name":"Tag Four"},
                            {"name":"Tag Five"},
                            {"name":"Tag Six"},
                            {"name":"Tag Seven"},
                            {"name":"Tag Eight"},
                            {"name":"Tag Nine"},
                            {"name":"Tag Ten"},
                            {"name":"Tag Eleven"},
                            {"name":"Tag Twelve"},
                            {"name":"Tag Thirteen"},
                            {"name":"Tag Fourteen"},
                            {"name":"Tag Fifteen"}
                        ]
                    };

            }

            addPointOfSaleTagsController.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            addPointOfSaleTagsController.select = function () {
                $uibModalInstance.close({newSelectedTags: addPointOfSaleTagsController.newSelectedTags});
            };

            addPointOfSaleTagsController.addTag = function (tagToAdd) {
                if(!addPointOfSaleTagsController.newSelectedTags.includes(tagToAdd)) {
                    addPointOfSaleTagsController.newSelectedTags.push(tagToAdd);
                }
            };

            addPointOfSaleTagsController.removeTag = function (tagName) {
                for(var index=0; index<addPointOfSaleTagsController.newSelectedTags.length; index++) {
                    if(addPointOfSaleTagsController.newSelectedTags[index].name === tagName) {
                        addPointOfSaleTagsController.newSelectedTags.splice(index, 1);
                        break;
                    }
                }
            };
            initialize();
        }
    ]);
})();