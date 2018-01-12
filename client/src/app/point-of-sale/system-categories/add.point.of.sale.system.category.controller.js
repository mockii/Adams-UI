(function () {
    'use strict';
    
    angular.module('adams.add.point.of.sale.system.category.controller',[])
        .controller('AddPointOfSaleSystemCategoryController', ['$scope', '$uibModalInstance', 'identifier', 'PointOfSaleSystemCategoriesService', 'CompassToastr',
            function ($scope, $uibModalInstance, identifier, PointOfSaleSystemCategoriesService, CompassToastr) {

            var addPointOfSaleSystemCategoryController = this;
            
            function initialize() {
                addPointOfSaleSystemCategoryController.category = identifier.category;
                addPointOfSaleSystemCategoryController.vendor = identifier.vendor;
                addPointOfSaleSystemCategoryController.type = identifier.type;

                addPointOfSaleSystemCategoryController.systemCategoryTypeId = '';
                addPointOfSaleSystemCategoryController.systemCategoryTypeName = '';
                addPointOfSaleSystemCategoryController.systemCategoryTypeDescription = '';
            }

            addPointOfSaleSystemCategoryController.addType = function () {
                var typeDetails =
                    {
                        'vendor_category_item_code' : addPointOfSaleSystemCategoryController.systemCategoryTypeId,
                        'name' : addPointOfSaleSystemCategoryController.systemCategoryTypeName,
                        'description' : addPointOfSaleSystemCategoryController.systemCategoryTypeDescription
                    };
                PointOfSaleSystemCategoriesService.addTypeDetailsForSystemCategoryAndVendor(addPointOfSaleSystemCategoryController.category,
                                                                                            addPointOfSaleSystemCategoryController.vendor.name,
                                                                                            addPointOfSaleSystemCategoryController.type.name,
                                                                                            typeDetails).then(
                    function (response) {
                        if(response === 'error'){
                            $uibModalInstance.close(response);
                            CompassToastr.error('An error occured while adding type. Please try again later');
                        }else{
                            $uibModalInstance.close(response);
                            CompassToastr.success(addPointOfSaleSystemCategoryController.category + ' ' + addPointOfSaleSystemCategoryController.type +
                                                ' for ' + addPointOfSaleSystemCategoryController.vendor + ' added successfully');
                        }
                    },
                    function (error) {
                        $uibModalInstance.close(error);
                        CompassToastr.error('An error occured while adding type. Please try again later');
                    }

                );
            };

            addPointOfSaleSystemCategoryController.close = function() {
                $uibModalInstance.dismiss('cancel');
            };

            initialize();
        }]);
    }    
)();