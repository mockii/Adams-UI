(function () {
    angular.module('adams.vendor.comments.controller',[])
        .controller('VendorCommentsController',[
            '$state', '$scope','$location', 'Utils', 'CompassToastr', 'VendorDetailsService', 'vendorSearchData',
            function($state, $scope, $location, Utils, CompassToastr, VendorDetailsService, vendorSearchData) {
                var vendorCommentsController = this,
                    originalComment;


                function initialize() {
                    $state.current.data.pageTitle = vendorSearchData.vendor_name_1 + ' (' + vendorSearchData.vendor_number + ')';
                    vendorCommentsController.vendorSearchData = vendorSearchData || {};
                    originalComment = vendorSearchData.comment;
                }


                vendorCommentsController.cancel = function() {
                    vendorCommentsController.vendorSearchData.comment = originalComment;
                };

                vendorCommentsController.save = function() {
                    Utils.startBlockUI("vendor-comments");
                    VendorDetailsService.updateVendorComment(
                        vendorCommentsController.vendorSearchData.vendor_number,
                        vendorCommentsController.vendorSearchData.source_system_id,
                        vendorCommentsController.vendorSearchData.comment)
                        .then(
                            function(response){
                                Utils.stopBlockUI("vendor-comments");
                                originalComment = vendorSearchData.comment;
                                CompassToastr.success('Vendor comments have been saved.');
                            },
                            function(error){
                                Utils.stopBlockUI("vendor-comments");
                                CompassToastr.warning('An error occurred while saving vendor comments.');
                            });
                };


                initialize();
            }
    ]);
})();