/**
 * Created by RegonS01 on 10/5/2016.
 */
'use strict';

describe('VendorSearchController', function() {
    var Ctrl,
        vendorSearchService,
        $rootScope,
        $scope,
        $window,
        $interval,
        statesService = {},
        $uibModal,
        userName,
        appName,
        roleName,
        teamName,
        sourceSystemId,
        limit,
        page,
        searchUserName,
        searchLastName,
        searchFirstName,
        searchCostCenter,
        sort,
        index,
        vendorSearchData,
        adamsConstants,
        mockVendorSearchService = {},
        mockUtils = {},
        $q,
        $httpBackend,
        mockModalDialogService,
        mockModal,
        $timeout,
        $utils,
        gridApi,
        gridOptions,
        $state;

    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.vendor.search.service'));
    beforeEach(module('adams.vendor.search.controller'));
    beforeEach(module('adams.vendor.details.controller'));
    beforeEach(module('adams.vendor.account.details.controller'));
    beforeEach(module('adams.vendor.details.service'));
    beforeEach(module('adams.market.mapping.controller'));
    beforeEach(module('adams.market.mapping.service'));
    beforeEach(module('adams.add.market.mapping.controller'));
    beforeEach(module('adams.cost.center.mapping.controller'));
    beforeEach(module('adams.contact.info.controller'));
    beforeEach(module('adams.contact.info.service'));
    beforeEach(module('adams.add.cost.center.mapping.controller'));
    beforeEach(module('adams.cost.center.mapping.history.controller'));
    beforeEach(module('adams.add.or.edit.contact.info.controller'));
    beforeEach(module('adams.cost.center.mapping.disassociate.controller'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('VendorSearchService', mockVendorSearchService);
            $provide.value('StgStatesService', statesService);
            $provide.value('Utils', mockUtils);
        });
    });

    beforeEach(inject(function ($controller, $compile, _$document_, _$rootScope_, _$timeout_, _$window_, _$interval_, VendorSearchService, ADAMS_CONSTANTS, _$q_, _$httpBackend_, Utils) {
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;
        userName = 'VASIRU01';

        adamsConstants = ADAMS_CONSTANTS;
        vendorSearchService = VendorSearchService;

        $q = _$q_;
        $httpBackend = _$httpBackend_;
        appName = 'ADAMS';
        roleName = 'Admin';
        teamName = 100007;
        sourceSystemId = 1002;
        limit = 25;
        page = 1;
        searchUserName = '';
        searchLastName = '';
        searchFirstName = '';
        searchCostCenter = '';
        sort = '';
        index = 0;
        $utils = Utils;
        vendorSearchData = {
            "vendor_number": "10016011",
            "vendor_name_1": "VSA OF OHIO",
            "vendor_name_2": "",
            "vendor_name_3": "",
            "address": "9300 DUTTON DRIVE",
            "city": "TWINSBURG",
            "state": "OH",
            "zipcode": "44087",
            "country": "US ",
            "telephone_number_1": "",
            "telephone_number_2": "",
            "fax_number": "",
            "category_code": "6909",
            "category_description": "Inactive Suppliers",
            "model_market_classification": "Inactive",
            "extraneous": null,
            "excluded": 0,
            "diversity_code": "",
            "district": "",
            "train_station": "",
            "industry_key": "",
            "parent_record_created_date": "10-27-1998 05:00",
            "parent_record_created_by": "HORIZON",
            "child_record_created_date": null,
            "child_record_created_by": null,
            "account_group": "0006",
            "account_number_alt_payee": "",
            "master_record_delete_flag": " ",
            "tax_1": "",
            "tax_2": "",
            "one_time_account_ind": "",
            "training_partner_id": "",
            "business_type": "",
            "telebox": "",
            "personnel_number": null,
            "group_key": "",
            "central_posting_block": true,
            "imposed_purchase_block": true,
            "payment_block": true,
            "company_code_posting_block": false,
            "tax_jurisdiction": "",
            "company_code": null,
            "customer_number": "",
            "terms_payment_key": null,
            "account_number": null,
            "clerk": null,
            "consolidation_code": null,
            "consolidation_description": null,
            "nominated_code": "X",
            "nominated_description": "Extraneous",
            "source_system_id": 1001,
            "created_by": "BATCHADM",
            "created_date": "09-20-2016 20:49",
            "modified_by": null,
            "modified_date": null
        };

        gridOptions = {
            data: [
                { col1: 'col1', col2: 'col2' }
            ],
            onRegisterApi: function( api ){
                gridApi = api;
            }
        };

        gridApi = {
            grid: {
                appScope: {
                    showVendorSearchData: jasmine.createSpy('gridApi.grid.appScope.showVendorSearchData')
                }
            }
        };

        statesService.goToState = function(state, params){
            // spyOn($state, 'go');
            return;
        };

        $state = { go: function() { return; }};

        mockUtils = {
            blockUI: {
                instances: {
                    get: function () {
                        return {
                            start : function(){
                                return;
                            },
                            stop : function(){
                                return;
                            }
                        }
                    }
                }
            },

            startBlockUI: function() {
                return {}
            },

            stopBlockUI: function() {
                return {}
            },

            initializeSearchFields: function () {
                return {}
            },

            getGridSorts: function () {
                return {'sorts': []};
            }
        };

        mockModalDialogService = {
            result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function( result ) {
                this.result.confirmCallBack( result );
            },
            dismiss: function( type ) {
                this.result.cancelCallback( type );
            }
        };

        mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss')
        };

        mockVendorSearchService.getAllVendorSearchDetails = function(limit, page, appName, sort, sourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve({"metadata": [{"version": "1.0.0", "status": "Success", "http_status_code": "200","resultCount": "267217"}], "data": [{ "vendor_number": "10016000",                    "vendor_name_1": "VSA MIDATLANTIC",                    "vendor_name_2": "",                    "vendor_name_3": "                                   ",                    "address": "1226 FOREST PKWY",                    "city": "PAULSBORO",                    "state": "NJ",                    "zipcode": "08066-0000",                    "country": "US ",                    "telephone_number_1": "                ",                    "telephone_number_2": "                ",                    "fax_number": "                               ",                    "category_code": "6909",                    "category_description": "Inactive Suppliers                 ",                    "model_market_classification": "Inactive",                    "extraneous": null,                    "excluded": 0,                    "diversity_code": "          ",                    "district": "                                   ",                    "train_station": "                         ",                    "industry_key": "    ",                    "parent_record_created_date": null,                    "parent_record_created_by": "HORIZON     ",                    "child_record_created_date": null,                    "child_record_created_by": null,                    "account_group": "0006",                    "account_number_alt_payee": "          ",                    "master_record_delete_flag": " ",                    "tax_1": "                ",                    "tax_2": "           ",                    "one_time_account_ind": " ",                    "training_partner_id": "      ",                    "business_type": "                              ",                    "telebox": "               ",                    "personnel_number": null,                    "group_key": "          ",                    "central_posting_block": true,                    "imposed_purchase_block": true,                    "payment_block": true,                    "company_code_posting_block": false,                    "tax_jurisdiction": "               ",                    "company_code": null,                    "customer_number": "          ",                    "terms_payment_key": null,                    "account_number": null,                    "clerk": null,                    "consolidation_code": null,                    "consolidation_description": null,                    "nominated_code": "X                             ",                    "nominated_description": "Extraneous                    ",                    "source_system_id": 1001,                    "created_by": "BATCHADM",                    "created_date": "09-20-2016 20:49",                    "modified_by": null,                    "modified_date": null}]});
            return deferred.promise;
        };

        Ctrl = $controller('VendorSearchController', {$scope: $scope, $state: $state, VendorSearchService: vendorSearchService, StgStatesService: statesService});
    }));

    it('should initialize the VendorSearchController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        expect(Ctrl.showVendorSearchData).toEqual(gridApi.grid.appScope.showVendorSearchData);
    });

    it('should call showVendorSearchData', function() {
        //spyOn($state, 'go');
        spyOn(statesService, 'goToState');
        spyOn(Ctrl, 'showVendorSearchData').and.callThrough();
        Ctrl.showVendorSearchData(vendorSearchData);
        $scope.$apply();
        expect(statesService.goToState).toHaveBeenCalledWith('vendordetails', {
            vendorSearchData: vendorSearchData,
            vendor_number: vendorSearchData.vendor_number,
            vendor_source_system_id: vendorSearchData.source_system_id
        });
        expect(Ctrl.showVendorSearchData).toHaveBeenCalled();
    });

    it('should call uiGridSelectedRows', function() {
        $rootScope.$broadcast('uiGridSelectedRows');
    });

    it('should call getGridData ', function() {
        Ctrl.getGridData();
    });
});