(function () {
    angular.module('adams.products.product.details.controller', [])
        .controller('ProductDetailsController', ['$state', '$scope', '$location', 'MULTIMEDIA_CONSTANTS', 'multimediaData',
            function ($state, $scope, $location, MULTIMEDIA_CONSTANTS, multimediaData) {
                var productDetailsController = this;

                productDetailsController.productSearchData = $scope.productsDetailsController.productSearchData;
                $state.current.data.pageTitle = productDetailsController.productSearchData.description + " (" + productDetailsController.productSearchData.gtin + ")";

                function initialize() {
                    productDetailsController.productImages = [];
                    productDetailsController.id = 0;
                    var data = multimediaData || [];
                    buildGalleryObjects(data);
                    productDetailsController.hasProductImages = productDetailsController.productImages.length > 0;
                }

                function buildGalleryObjects(multimediaData) {
                    /*Currently Supporting Images only*/
                    multimediaData.forEach(function(object){
                        if(MULTIMEDIA_CONSTANTS.PRODUCT_IMAGE === object.multimedia_type.trim() ||
                            MULTIMEDIA_CONSTANTS.PRODUCT_LABEL_IMAGE === object.multimedia_type.trim()){
                            var productImage = {};
                            productImage.id = productDetailsController.id++;
                            productImage.title = '';
                            productImage.alt = object.alt || '';
                            productImage.url = object.uri || '';
                            productImage.thumbUrl = object.uri || '';
                            productImage.bubbleUrl = object.bubbleUri || '';
                            productImage.extUrl = object.extUri || '';
                            productImage.desc = object.desc || '';
                            productImage.deletable = object.deleteable || false;
                            productDetailsController.productImages.push(productImage);
                        }
                    });
                }


                // Gallery callbacks
                productDetailsController.opened = function(){
                    console.info('Gallery opened!');
                };

                productDetailsController.closed = function(){
                    console.warn('Gallery closed!');
                };

                // gallery methods
                $scope.methods = {};

                // so you will bind openGallery method to a button on page
                // to open this gallery like ng-click="openGallery();"
                $scope.openGallery = function(){
                    $scope.methods.open();

                    // You can also open gallery model with visible image index
                    // Image at that index will be shown when gallery modal opens
                    //scope.methods.open(index);
                };

                // Similar to above function
                $scope.closeGallery = function(){
                    $scope.methods.close();
                };

                $scope.nextImg = function(){
                    $scope.methods.next();
                };

                $scope.prevImg = function(){
                    $scope.methods.prev();
                };

                initialize();
            }
    ]);
})();