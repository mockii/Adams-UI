/**
 * Created by RegonS01 on 10/5/2016.
 */
'use strict';

describe('MarketMappingController', function() {
    var Ctrl,
        Ctrl2,
        marketMappingService,
        $rootScope,
        $scope,
        $window,
        $interval,
        $uibModal,
        userName,
        appName,
        roleName,
        logService = {},
        sourceSystemId,
        limit,
        page,
        searchUserName,
        searchLastName,
        searchFirstName,
        searchCostCenter,
        sort,
        vendorNumber,
        marketName,
        teamName,
        index,
        adamsConstants,
        mockMarketMappingService = {},
        mockMarketMappingService2 = {},
        mockUtils = {},
        $q,
        $httpBackend,
        compassToastr,
        mockModalDialogService,
        mockModal,
        $timeout,
        vendorSearchData,
        $utils,
        gridApi,
        gridOptions,
        $state;

    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('common.services.CompassToastr'));
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
            $provide.value('MarketMappingService', mockMarketMappingService);
            $provide.value('MarketMappingService', mockMarketMappingService2);
            $provide.value('Utils', mockUtils);
            $provide.value('STGLogService', logService);
        });
    });

    beforeEach(inject(function ($controller, _$rootScope_, _$window_, _$interval_, $location, MarketMappingService, ADAMS_CONSTANTS, _$q_, _$httpBackend_, CompassToastr, _$uibModal_, _$timeout_, _$state_, Utils, STGLogService, $log) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;
        $uibModal = _$uibModal_;
        $timeout = _$timeout_;
        $state = _$state_;
        userName = 'VASIRU01';
        logService = STGLogService;
        compassToastr = CompassToastr;
        adamsConstants = ADAMS_CONSTANTS;
        marketMappingService = MarketMappingService;
        $scope.vendorDetailsController = {};
        $location = $location;
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
        vendorNumber = '';
        marketName = '';
        teamName = '';
        $utils = Utils;
        index = 0;
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

        spyOn($location, 'search').and.returnValue({ source_system_id: '1001' })

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
                    confirmDeleteMarketMapping: jasmine.createSpy('gridApi.grid.appScope.confirmDeleteMarketMapping')
                }
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
            },
            confirm: function( errorMessage ) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        /*mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss'),
            open: jasmine.createSpy('mockModal.open'),
            result: {
                then: jasmine.createSpy('mockModal.result.then')
            }

        };*/

        function mockModal(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.resolve({});
            this.result = this.resultDeferred.promise;
        }
        mockModal.prototype.open = function(options){ return this;  };
        mockModal.prototype.close = function (item) {
            this.resultDeferred.resolve(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };
        mockModal.prototype.dismiss = function (item) {
            this.resultDeferred.reject(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };

        mockModal = new mockModal();

        mockMarketMappingService.getMarketMappingData = function(limit, page, sort, vendorNumber, marketName, teamName) {
            var deferred = $q.defer();
            deferred.resolve({"metadata": [{"version": "1.0.0", "status": "Success", "http_status_code": "200","resultCount": "267217"}], "data": [{ "vendor_number": "10016000",                    "vendor_name_1": "VSA MIDATLANTIC",                    "vendor_name_2": "",                    "vendor_name_3": "                                   ",                    "address": "1226 FOREST PKWY",                    "city": "PAULSBORO",                    "state": "NJ",                    "zipcode": "08066-0000",                    "country": "US ",                    "telephone_number_1": "                ",                    "telephone_number_2": "                ",                    "fax_number": "                               ",                    "category_code": "6909",                    "category_description": "Inactive Suppliers                 ",                    "model_market_classification": "Inactive",                    "extraneous": null,                    "excluded": 0,                    "diversity_code": "          ",                    "district": "                                   ",                    "train_station": "                         ",                    "industry_key": "    ",                    "parent_record_created_date": null,                    "parent_record_created_by": "HORIZON     ",                    "child_record_created_date": null,                    "child_record_created_by": null,                    "account_group": "0006",                    "account_number_alt_payee": "          ",                    "master_record_delete_flag": " ",                    "tax_1": "                ",                    "tax_2": "           ",                    "one_time_account_ind": " ",                    "training_partner_id": "      ",                    "business_type": "                              ",                    "telebox": "               ",                    "personnel_number": null,                    "group_key": "          ",                    "central_posting_block": true,                    "imposed_purchase_block": true,                    "payment_block": true,                    "company_code_posting_block": false,                    "tax_jurisdiction": "               ",                    "company_code": null,                    "customer_number": "          ",                    "terms_payment_key": null,                    "account_number": null,                    "clerk": null,                    "consolidation_code": null,                    "consolidation_description": null,                    "nominated_code": "X                             ",                    "nominated_description": "Extraneous                    ",                    "source_system_id": 1001,                    "created_by": "BATCHADM",                    "created_date": "09-20-2016 20:49",                    "modified_by": null,                    "modified_date": null}]});
            return deferred.promise;
        };

        mockMarketMappingService.deleteMarketMapping = function(){
            var deferred = $q.defer();
            deferred.resolve({"message": "Success"});
            return deferred.promise;
        };

        mockMarketMappingService2.getMarketMappingData = function(limit, page, sort, vendorNumber, marketName, teamName) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        mockMarketMappingService2.deleteMarketMapping = function(){
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        $state = {
            go: function () {
                return;
            },
            current: {
                data: {
                    pageTitle: ''
                }
            },
            params: {
                vendorSearchData: vendorSearchData
            }
        };

        Ctrl = $controller('MarketMappingController', {$scope: $scope, MarketMappingService: mockMarketMappingService,  ModalDialogService: mockModalDialogService, compassToastr: CompassToastr,  $uibModal: mockModal, ADAMS_CONSTANTS: adamsConstants, $timeout:$timeout, $state:$state, Utils: mockUtils, $location: $location, vendorSearchData: vendorSearchData });
        Ctrl2 = $controller('MarketMappingController', {$scope: $scope, MarketMappingService: mockMarketMappingService2,  ModalDialogService: mockModalDialogService, compassToastr: CompassToastr,  $uibModal: mockModal, ADAMS_CONSTANTS: adamsConstants, $timeout:$timeout, $state:$state, Utils: mockUtils, $location: $location, vendorSearchData: vendorSearchData });
    }));

    it('should initialize the MarketMappingController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    /*it('should verify the Grid Option Pagination Page Size', function () {
        expect(Ctrl.gridOptions.paginationPageSize).toEqual(25);
    });

    it('should dismiss the modal with result "dismiss" when dismissed', function () {
        mockModal.dismiss('dismiss');
        expect(mockModal.dismiss).toHaveBeenCalledWith('dismiss');
    });

    it('should open the modal with result "{}" when opened', function () {
        mockModal.open({});
        expect(mockModal.open).toHaveBeenCalled();
    });

    it('should close the modal with result "cancel" when rejected', function () {
        mockModal.close('cancel');
        expect(mockModal.close).toHaveBeenCalledWith('cancel');
    });*/

    it('should call uiGridSelectedRows', function() {
        $rootScope.$broadcast('uiGridSelectedRows');
    });

    it('should call getGridData ', function() {
        Ctrl.getGridData(25,1,'',{search: [
                {
                    "property": "market_name",
                    "value": "something",
                    "operator": ""
                }
            ]}
        );
    });

    it('should call getGridData ', function() {
        Ctrl.getGridData(25,1,'',{search: [
                {
                    "property": "market_name",
                    "value": "something",
                    "operator": ""
                }
            ]}
        );
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        // expect(function(){}).toEqual(gridApi.grid.appScope.confirmDeleteMarketMapping)
    });


    // mockMarketMappingService tests
    it('should getMarketMappingData', function () {
        var marketMappingDataResponse;
        mockMarketMappingService.getMarketMappingData().then(function (response) {
           marketMappingDataResponse = response.data;
        });

        Ctrl.gridOptions.data = marketMappingDataResponse;
        //$scope.$apply();
        expect(Ctrl.gridOptions.data).toEqual(marketMappingDataResponse);
    });

    it('should deleteMarketMappingData', function () {
        var marketMappingDeleteResponse;
        mockMarketMappingService.deleteMarketMapping().then(function (response) {
            marketMappingDeleteResponse = response;
        });

        var rowData = {
            market_name: "MGM",
            team_name: "Charlotte"
        };
        Ctrl.deleteMarketMapping(rowData);
        $scope.$apply();
        expect(marketMappingDeleteResponse['message']).toEqual('Success');
    });

    it('should confirmDeleteMarketMapping', function () {
        spyOn(Ctrl, 'confirmDeleteMarketMapping').and.callThrough();
        var rowData = {
            market_name: "MGM",
            team_name: "Charlotte"
        };
        Ctrl.confirmDeleteMarketMapping(rowData);
        $scope.$apply();
        expect(Ctrl.confirmDeleteMarketMapping).toHaveBeenCalled();
    });

    it('should openAddUserMapping ', function () {
        spyOn($uibModal, 'open').and.returnValue(mockModal);
        spyOn(Ctrl, 'openAddUserMapping').and.callThrough();
        Ctrl.vendorSearchData = vendorSearchData;
        Ctrl.openAddUserMapping();
        $scope.$apply();
        expect(Ctrl.openAddUserMapping).toHaveBeenCalled();
    });

    it('should openAddUserMapping ', function () {
        spyOn($uibModal, 'open').and.returnValue(mockModal);
        spyOn(Ctrl, 'openAddUserMapping').and.callThrough();
        Ctrl.vendorSearchData = null;
        Ctrl.openAddUserMapping();
        $scope.$apply();
        expect(Ctrl.openAddUserMapping).toHaveBeenCalled();
    });

    it('should deleteMarketMappingData and throw error', function () {
        spyOn(Ctrl2, 'deleteMarketMapping').and.callThrough();
        var rowData = {
            market_name: "MGM",
            team_name: "Charlotte"
        };
        Ctrl2.deleteMarketMapping(rowData);
        $scope.$apply();
        expect(Ctrl2.deleteMarketMapping).toHaveBeenCalled();
    });
});