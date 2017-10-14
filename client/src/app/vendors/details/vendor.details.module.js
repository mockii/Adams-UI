(function () {

    angular.module('adams.vendor.details', [
        'adams.vendor.details.controller',
        'adams.vendor.account.details.controller',
        'adams.vendor.comments.controller',
        'adams.vendor.details.service',
        'adams.market.mapping.controller',
        'adams.market.mapping.service',
        'adams.add.market.mapping.controller',
        'adams.cost.center.mapping.controller',
        'adams.cost.center.mapping.service',
        'adams.contact.info.controller',
        'adams.contact.info.delete.controller',
        'adams.contact.info.service',
        'adams.add.cost.center.mapping.controller',
        'adams.cost.center.mapping.history.controller',
        'adams.add.or.edit.contact.info.controller',
        'adams.cost.center.mapping.disassociate.controller',
        'adams.cost.center.mapping.disassociate.edi.reason.controller'
    ])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('vendordetails', {
                    url: "/vendors/{vendor_number}/?{source_system_id}",
                    templateUrl: "vendors/details/vendor.details.tpl.html",
                    controller: "VendorDetailsController as vendorDetailsController",
                    redirectTo: 'vendordetails.accountmapping',
                    params: {
                        vendorSearchData: null
                    },
                    data: {
                        pageTitle: "Vendor Details",
                        backState: 'vendors'
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'vendorDetails',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/vendor-details.css'
                                ]
                            });
                        }]
                    }
                }).
            state('vendordetails.accountmapping', {
                url: "details",
                templateUrl: "vendors/details/account-details/account-details-tab-content.tpl.html",
                controller: "VendorAccountDetailsController as vendorAccountDetailsController",
                params: {
                    vendorSearchData: null
                },
                data: {
                    pageTitle: "Account Details",
                    backState: 'vendors'
                },
                resolve: {
                    vendorSearchData: function ($stateParams, $location, VendorDetailsService) {
                        if($stateParams.vendorSearchData) {
                            return $stateParams.vendorSearchData;
                        } else {
                            var sourceSystemId = $stateParams.source_system_id || $location.search().source_system_id,
                                vendorNumber = $stateParams.vendor_number || $location.path().split('/')[2];
                            return VendorDetailsService.getVendorDetails(vendorNumber, sourceSystemId);
                        }
                    }
                }
            }).
            state('vendordetails.marketmapping', {
                url: "marketmapping",
                templateUrl: "vendors/details/market-mapping/market-mapping-tab-content.tpl.html",
                controller: "MarketMappingController as marketMappingController",
                params: {
                    vendorSearchData: null,
                    marketMappingData:null
                },
                data: {
                    pageTitle: "Market Mapping",
                    backState: 'vendors'
                },
                resolve: {
                    vendorSearchData: function ($stateParams, $location, VendorDetailsService) {
                        if($stateParams.vendorSearchData) {
                            return $stateParams.vendorSearchData;
                        } else {
                            var sourceSystemId = $stateParams.source_system_id || $location.search().source_system_id,
                                vendorNumber = $stateParams.vendor_number || $location.path().split('/')[2];
                            return VendorDetailsService.getVendorDetails(vendorNumber, sourceSystemId);
                        }
                    }
                }
            }).
            state('vendordetails.costCentermapping', {
                url: "costcentermapping",
                templateUrl: "vendors/details/cost-center-mapping/cost-center-mapping-tab-content.tpl.html",
                controller: "CostCenterMappingController as costCenterMappingController",
                params: {
                    costCenterMappingData: null,
                    vendorSearchData: null
                },
                data: {
                    pageTitle: "Cost Center Mapping",
                    backState: 'vendors'
                },
                resolve: {
                    vendorSearchData: function ($stateParams, $location, VendorDetailsService) {
                        if($stateParams.vendorSearchData) {
                            return $stateParams.vendorSearchData;
                        } else {
                            var sourceSystemId = $stateParams.source_system_id || $location.search().source_system_id,
                                vendorNumber = $stateParams.vendor_number || $location.path().split('/')[2];
                            return VendorDetailsService.getVendorDetails(vendorNumber, sourceSystemId);
                        }
                    }
                }
            }).
            state('vendordetails.contactInfo', {
                url: "contacts",
                templateUrl: "vendors/details/contact-info/contact-info-tab-content.tpl.html",
                controller: "ContactInfoController as contactInfoController",
                params: {
                    contactInfoData: null
                },
                data: {
                    pageTitle: "Contact Info",
                    backState: 'vendors'
                },
                resolve: {
                    vendorSearchData: function ($stateParams, $location, VendorDetailsService) {
                        if($stateParams.vendorSearchData) {
                            return $stateParams.vendorSearchData;
                        } else {
                            var sourceSystemId = $stateParams.source_system_id || $location.search().source_system_id,
                                vendorNumber = $stateParams.vendor_number || $location.path().split('/')[2];
                            return VendorDetailsService.getVendorDetails(vendorNumber, sourceSystemId);
                        }
                    }
                }
            }).
            state('vendordetails.comments', {
                url: "comments",
                templateUrl: "vendors/details/comments/comments-tab-content.tpl.html",
                controller: "VendorCommentsController as vendorCommentsController",
                params: {
                    costCenterMappingData: null,
                    vendorSearchData: null
                },
                data: {
                    pageTitle: "Comments",
                    backState: 'vendors'
                },
                resolve: {
                    vendorSearchData: function ($stateParams, $location, VendorDetailsService) {
                        if($stateParams.vendorSearchData) {
                            return $stateParams.vendorSearchData;
                        } else {
                            var sourceSystemId = $stateParams.source_system_id || $location.search().source_system_id,
                                vendorNumber = $stateParams.vendor_number || $location.path().split('/')[2];
                            return VendorDetailsService.getVendorDetails(vendorNumber, sourceSystemId);
                        }
                    }
                }
            });
        }]);
})();