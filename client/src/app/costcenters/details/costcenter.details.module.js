(function () {
    angular.module('adams.costcenter.details', [
        'adams.costcenter.details.controller',
        'adams.costcenter.account.details.controller',
        'adams.costcenter.details.service',
        'adams.costcenter.market.mapping.controller',
        'adams.costcenter.market.mapping.service',
        'adams.costcenter.add.market.mapping.controller',
        'adams.vendor.mapping.controller',
        'adams.vendor.mapping.service',
        'adams.add.vendor.mapping.controller',
        'adams.vendor.mapping.history.controller',
        'adams.add.or.edit.contact.info.controller',
        'adams.vendor.mapping.disassociate.controller',
        'adams.vendor.mapping.disassociate.edi.reason.controller',
        'adams.vendors.mass.vendor.contact.modal.controller'
    ])
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('costcenterdetails', {
                    url: "/costcenters/{costCenter_number}/?{costCenter_source_system_id}",
                    templateUrl: "costcenters/details/costcenter.details.tpl.html",
                    controller: "CostCenterDetailsController as costCenterDetailsController",
                    redirectTo: 'costcenterdetails.accountmapping',
                    params: {
                        costCenterSearchData: null
                    },
                    data: {
                        pageTitle: "Cost Center Details",
                        backState: 'costcenters'
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'costCenterDetails',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/costcenter-details.css'
                                ]
                            });
                        }]
                    }
                }).
            state('costcenterdetails.accountmapping', {
                url: "details",
                templateUrl: "costcenters/details/account-details/account-details-tab-content.tpl.html",
                controller: "CostCenterAccountDetailsController as costCenterAccountDetailsController",
                params: {
                    costCenterSearchData: null
                },
                data: {
                    pageTitle: "Account Details",
                    backState: 'costcenters'
                },
                resolve: {
                    costCenterSearchData: function ($stateParams, $location, CostCenterDetailsService) {
                        if($stateParams.costCenterSearchData) {
                            return $stateParams.costCenterSearchData;
                        } else {
                            var sourceSystemId = $stateParams.costCenter_source_system_id || $location.search().costCenter_source_system_id,
                                costCenterNumber = $stateParams.costCenter_number || $location.path().split('/')[2];
                            return CostCenterDetailsService.getCostCenterDetails(costCenterNumber, sourceSystemId);
                        }
                    }
                }
            }).
            state('costcenterdetails.marketmapping', {
                url: "marketmapping",
                templateUrl: "costcenters/details/market-mapping/market-mapping-tab-content.tpl.html",
                controller: "CostCenterMarketMappingController as costCenterMarketMappingController",
                params: {
                    costCenterSearchData: null,
                    marketMappingData: null
                },
                data: {
                    pageTitle: "Market Mapping",
                    backState: 'costcenters'
                },
                resolve: {
                    costCenterSearchData: function ($stateParams, $location, CostCenterDetailsService) {
                        if($stateParams.costCenterSearchData) {
                            return $stateParams.costCenterSearchData;
                        } else {
                            var sourceSystemId = $stateParams.costCenter_source_system_id || $location.search().costCenter_source_system_id,
                                costCenterNumber = $stateParams.costCenter_number || $location.path().split('/')[2];
                            return CostCenterDetailsService.getCostCenterDetails(costCenterNumber, sourceSystemId);
                        }
                    },
                    defaultMarket: function($stateParams, $location, CostCenterMarketMappingService) {
                        var sourceSystemId = $stateParams.costCenter_source_system_id || $location.search().costCenter_source_system_id,
                            costCenterNumber = $stateParams.costCenter_number || $location.path().split('/')[2],
                            searchInput = {"search":[{"property":"default_market","value":true,"operator":""}]};

                        return CostCenterMarketMappingService.getDefaultMarket(costCenterNumber, sourceSystemId, searchInput);
                    }
                }
            }).
            state('costcenterdetails.vendormapping', {
                url: "vendormapping",
                templateUrl: "costcenters/details/vendor-mapping/vendor-mapping-tab-content.tpl.html",
                controller: "VendorMappingController as vendorMappingController",
                params: {
                    costCenterMappingData: null,
                    costCenterSearchData: null
                },
                data: {
                    pageTitle: "Vendor Mapping",
                    backState: 'costcenters'
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'bookOfRecord',
                            insertBefore: '#ng_load_plugins_after',
                            files: [
                                'css/mass-vendor-contact.css'
                            ]
                        });
                    }],
                    costCenterSearchData: function ($stateParams, $location, CostCenterDetailsService) {
                        if($stateParams.costCenterSearchData) {
                            return $stateParams.costCenterSearchData;
                        } else {
                            var sourceSystemId = $stateParams.costCenter_source_system_id || $location.search().costCenter_source_system_id,
                                costCenterNumber = $stateParams.costCenter_number || $location.path().split('/')[2];
                            return CostCenterDetailsService.getCostCenterDetails(costCenterNumber, sourceSystemId);
                        }
                    }
                }
            });
        }]);
})();