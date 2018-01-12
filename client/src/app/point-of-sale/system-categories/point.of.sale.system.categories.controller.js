(function () {
    'use strict';

    angular.module('adams.point.of.sale.system.categories.controller',[])
        .controller('PointOfSaleSystemCategoriesController',['PointOfSaleSystemCategoriesService', function (PointOfSaleSystemCategoriesService) {

            var pointOfSaleSystemCategoriesController = this;

            function initialize() {

                pointOfSaleSystemCategoriesController.systemCategories = [];

                loadSystemCategories();

            }

            function loadSystemCategories() {
                PointOfSaleSystemCategoriesService.getAllSystemCategories().then(
                    function (response) {
                        if(response !== 'error'){
                            pointOfSaleSystemCategoriesController.systemCategories = response.data;
                        }
                    },
                    function (error) {
                        pointOfSaleSystemCategoriesController.systemCategories = [];
                    }
                );
            }

            initialize();
        }
        ]);
})();