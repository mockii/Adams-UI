(function () {
    'use strict';

    angular.module('adams.point.of.sale.system.category.content.controller',[])
        .controller('PointOfSaleSystemCategoryContentController', ['$scope', '$state', 'CompassToastr', '$uibModal', 'PointOfSaleSystemCategoriesService',
            function ($scope, $state, CompassToastr, $uibModal, PointOfSaleSystemCategoriesService) {
        var pointOfSaleSystemCategoryContentController = this;

        function initialize() {

            pointOfSaleSystemCategoryContentController.activeSystemCategoryName = $state.current.data.category;

            pointOfSaleSystemCategoryContentController.vendors = [];
            pointOfSaleSystemCategoryContentController.systemCategories = [];

            loadSystemCategories();
            loadVendors();

        }

        function loadSystemCategories() {
            PointOfSaleSystemCategoriesService.getAllSystemCategories().then(
                function (response) {
                    if(response !== 'error'){
                        pointOfSaleSystemCategoryContentController.systemCategories = response.data;
                    }
                },
                function (error) {
                    pointOfSaleSystemCategoryContentController.systemCategories = [];
                }
            );
        }

        function loadVendors() {
            PointOfSaleSystemCategoriesService.getAllVendors().then(
                function (response) {
                    if(response !== 'error'){
                        pointOfSaleSystemCategoryContentController.vendors = response.data;

                        for(var index=0; index < pointOfSaleSystemCategoryContentController.vendors.length; index++){
                            getType(pointOfSaleSystemCategoryContentController.vendors[index]);
                        }
                    }
                },
                function (error) {
                    pointOfSaleSystemCategoryContentController.vendors = [];
                }
            );
        }

        function getType(vendor) {
            PointOfSaleSystemCategoriesService.getTypesForVendor(vendor.name).then(
                function (response) {
                    if(response !== 'error'){
                        vendor.types = response.data;
                    }
                },
                function (error) {
                    vendor.types = [];
                }
            );
        }

        pointOfSaleSystemCategoryContentController.addType = function(vendor, type){
            $uibModal.open({
                templateUrl: 'point-of-sale/system-categories/add.point.of.sale.system.category.tpl.html',
                controller: 'AddPointOfSaleSystemCategoryController as addPointOfSaleSystemCategoryController',
                size: 'md',
                backdrop: 'static',
                resolve: {
                    identifier : {
                        category : pointOfSaleSystemCategoryContentController.activeSystemCategoryName,
                        vendor : vendor,
                        type : type
                    }
                }
            }).result.then(function (result) {
                var refId = pointOfSaleSystemCategoryContentController.activeSystemCategoryName + '.' + vendor.name + '.' + type.name;
                $scope.$broadcast('uiGridParameterChange', refId);
            });

        };

        pointOfSaleSystemCategoryContentController.getGridData = function(pageSize, pageNumber, sort, searchInput, refId, gridDataParams){
            var vendor = gridDataParams.vendor,
                type = gridDataParams.type;

            return PointOfSaleSystemCategoriesService.getTypeDetailsForSystemCategoryAndVendor(
                    pointOfSaleSystemCategoryContentController.activeSystemCategoryName, vendor, type,
                    pageSize, pageNumber, sort, searchInput);
        };

        pointOfSaleSystemCategoryContentController.getGridOptions = function () {
            return angular.copy(defineGridOptions());
        };

        function defineGridOptions() {
            return {
                paginationPageSizes: [25, 50, 75],
                paginationPageSize: 25, // pagination out of box
                virtualizationThreshold: 25,
                useExternalPagination: true,
                useExternalFiltering: true,
                enableFiltering: true, //step1 to enable all grid columns filtering
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                modifierKeysToMultiSelect: false,
                noUnselect: true,
                showColumnFooter: false,
                treeRowHeaderAlwaysVisible: false,
                enableGridMenu: true, //true will display grid menu on top-right
                enableSorting: true,
                columnDefs: [
                    {
                        field: 'deleteButton',
                        displayName: "Delete",
                        headerCellTemplate: '<div class="ui-grid-cell-contents">Delete</div>',
                        cellTemplate: '<div><i class="fa fa-trash-o"></i></div>',
                        enableFiltering: false,
                        enableSorting: false,
                        enableColumnMenu: false,
                        enableHiding: false,
                        width: 50,
                        cellClass: "view-cell",
                        pinnedLeft: true
                    },
                    {
                        field: 'vendor_category_item_code',
                        displayName: 'ID',
                        filter: {
                            placeholder: ''
                        }
                    },
                    {
                        field: 'name',
                        displayName: 'Name',
                        filter: {
                            placeholder: ''
                        }
                    },
                    {
                        field: 'description',
                        displayName: 'Description',
                        filter: {
                            placeholder: ''
                        }
                    }
                ]
            };
        }

        initialize();
    }]);
})();