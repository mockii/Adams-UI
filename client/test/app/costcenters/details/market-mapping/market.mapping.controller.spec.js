/**
 * Created by chouhan's on 7/17/2017.
 */
'use strict';

describe('CostCenterMarketMappingController', function() {
    var Ctrl,
        Ctrl2,
        CostCenterMarketMappingService,
        $rootScope,
        $scope,
        $window,
        $interval,
        $uibModal,
        userName,
        appName,
        logService = {},
        defaultMarket = {},
        roleName,
        sourceSystemId,
        searchInput,
        limit,
        page,
        mySelectedRows,
        searchUserName,
        searchLastName,
        searchFirstName,
        searchCostCenter,
        sort,
        costCenterNumber,
        marketName,
        teamName,
        index,
        adamsConstants,
        mockCostCenterMarketMappingService = {},
        mockCostCenterMarketMappingService2 = {},
        mockUtils = {},
        $q,
        $httpBackend,
        compassToastr,
        mockModalDialogService,
        mockModal,
        $timeout,
        costCenterSearchData,
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
    beforeEach(module('adams.costcenter.search.service'));
    beforeEach(module('adams.costcenter.search.controller'));
    beforeEach(module('adams.costcenter.details.controller'));
    beforeEach(module('adams.costcenter.account.details.controller'));
    beforeEach(module('adams.costcenter.details.service'));
    beforeEach(module('adams.costcenter.market.mapping.controller'));
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
            $provide.value('CostCenterMarketMappingService', mockCostCenterMarketMappingService);
            $provide.value('CostCenterMarketMappingService', mockCostCenterMarketMappingService2);
            $provide.value('STGLogService', logService);
            $provide.value('Utils', mockUtils);
        });
    });

    beforeEach(inject(function ($controller, _$rootScope_, _$window_, _$interval_, $location, CostCenterMarketMappingService,
                                ADAMS_CONSTANTS, _$q_, _$httpBackend_, CompassToastr, _$uibModal_, _$timeout_, _$state_, Utils, $log, STGLogService) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;
        $uibModal = _$uibModal_;
        $timeout = _$timeout_;
        $state = _$state_;
        userName = 'VASIRU01';
        compassToastr = CompassToastr;
        adamsConstants = ADAMS_CONSTANTS;
        CostCenterMarketMappingService = CostCenterMarketMappingService;
        $scope.costCenterDetailsController = {};
        $location = $location;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        appName = 'ADAMS';
        roleName = 'Admin';
        logService = STGLogService;
        teamName = 100007;
        sourceSystemId = 1002;
        searchInput=1221;
        limit = 25;
        page = 1;
        searchUserName = '';
        searchLastName = '';
        searchFirstName = '';
        searchCostCenter = '';
        sort = '';
        costCenterNumber = '';
        marketName = '';
        teamName = '';
        $utils = Utils;
        index = 0;
        mySelectedRows = [{"market_name":"MGNMU018","market_description":"Minneapolis-St. Paul, MN-WI","market_display_path":null,"default_market":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","$$hashKey":"uiGrid-00NC"}];
        costCenterSearchData = {
            "costcenter_number": "10016011",
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

        spyOn($location, 'search').and.returnValue({ source_system_id: '1001' });

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
                source_system_id: '1008'
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

        mockCostCenterMarketMappingService.getMarketMappingData = function(limit, page, sort, costCenterNumber, sourceSystemId, searchInput) {
            var deferred = $q.defer();
            deferred.resolve({"metadata": [{"version": "1.0.0", "status": "Success", "http_status_code": "200","resultCount": "267217"}], "data": [{ "costcenter_number": "10016000",                    "vendor_name_1": "VSA MIDATLANTIC",                    "vendor_name_2": "",                    "vendor_name_3": "                                   ",                    "address": "1226 FOREST PKWY",                    "city": "PAULSBORO",                    "state": "NJ",                    "zipcode": "08066-0000",                    "country": "US ",                    "telephone_number_1": "                ",                    "telephone_number_2": "                ",                    "fax_number": "                               ",                    "category_code": "6909",                    "category_description": "Inactive Suppliers                 ",                    "model_market_classification": "Inactive",                    "extraneous": null,                    "excluded": 0,                    "diversity_code": "          ",                    "district": "                                   ",                    "train_station": "                         ",                    "industry_key": "    ",                    "parent_record_created_date": null,                    "parent_record_created_by": "HORIZON     ",                    "child_record_created_date": null,                    "child_record_created_by": null,                    "account_group": "0006",                    "account_number_alt_payee": "          ",                    "master_record_delete_flag": " ",                    "tax_1": "                ",                    "tax_2": "           ",                    "one_time_account_ind": " ",                    "training_partner_id": "      ",                    "business_type": "                              ",                    "telebox": "               ",                    "personnel_number": null,                    "group_key": "          ",                    "central_posting_block": true,                    "imposed_purchase_block": true,                    "payment_block": true,                    "company_code_posting_block": false,                    "tax_jurisdiction": "               ",                    "company_code": null,                    "customer_number": "          ",                    "terms_payment_key": null,                    "account_number": null,                    "clerk": null,                    "consolidation_code": null,                    "consolidation_description": null,                    "nominated_code": "X                             ",                    "nominated_description": "Extraneous                    ",                    "source_system_id": 1001,                    "created_by": "BATCHADM",                    "created_date": "09-20-2016 20:49",                    "modified_by": null,                    "modified_date": null}]});
            return deferred.promise;
        };

        mockCostCenterMarketMappingService.deleteCostCentersMarket = function(){
            var deferred = $q.defer();
            deferred.resolve({"message": "Success"});
            return deferred.promise;
        };

        mockCostCenterMarketMappingService2.getMarketMappingData = function(limit, page, sort, costCenterNumber, sourceSystemId, searchInput) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        mockCostCenterMarketMappingService2.deleteCostCentersMarket = function(){
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        $state.params.costCenterSearchData = costCenterSearchData;
        var location = {
          search: function () {
              return { source_system_id: null};
          }
        };

        Ctrl = $controller('CostCenterMarketMappingController', {$scope: $scope, CostCenterMarketMappingService: mockCostCenterMarketMappingService,  ModalDialogService: mockModalDialogService,
            compassToastr: CompassToastr,  $uibModal: mockModal, ADAMS_CONSTANTS: adamsConstants, $timeout:$timeout, $state:$state, Utils: mockUtils,
            costCenterSearchData: costCenterSearchData, $location: $location, defaultMarket: defaultMarket, $log: $log });
        Ctrl2 = $controller('CostCenterMarketMappingController', {$scope: $scope, CostCenterMarketMappingService: mockCostCenterMarketMappingService2,
            ModalDialogService: mockModalDialogService, compassToastr: CompassToastr,  $uibModal: mockModal, ADAMS_CONSTANTS: adamsConstants, $timeout:$timeout, $state:$state,
            Utils: mockUtils, costCenterSearchData: costCenterSearchData, $location: location, defaultMarket: null, $log: $log });
    }));

    it('should initialize the CostCenterMarketMappingController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call uiGridSelectedRows', function() {
        $rootScope.$broadcast('uiGridSelectedRows', mySelectedRows);
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
        Ctrl.getGridData(25,1,'',{search: null});
    });

    it('should call uiGridLoadDetails else block', function() {
        Ctrl.gridOptions = gridOptions;
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi, '', {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"OK","resultCount":"4"},"data":[{"market_name":"MGNIH01","market_description":"Honolulu","market_display_path":"Global~NA Global/MGN000~North America/MGNI00~Incorporated Territories/MGNIH0~Hawaii/MGNIH01~Honolulu/","default_market":false,"created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"market_name":"MGNMC011","market_description":"San Diego","market_display_path":"Global~NA Global/MGN000~North America/MGNM00~Mainland US/MGNMC0~California/MGNMC011~San Diego/","default_market":false,"created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"market_name":"MGNMC116","market_description":"Sumter","market_display_path":"Global~NA Global/MGN000~North America/MGNM00~Mainland US/MGNMC1~Carolinas/MGNMC116~Sumter/","default_market":false,"created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"market_name":"MGNMU018","market_description":"Minneapolis-St. Paul, MN-WI","market_display_path":"Global~NA Global/MGN000~North America/MGNM00~Mainland US/MGNMU0~Upper Midwest/MGNMU018~Minneapolis-St. Paul, MN-WI/","default_market":true,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723"}],"error":[]});
        // expect(function(){}).toEqual(gridApi.grid.appScope.confirmDeleteMarketMapping)
    });

    it('should call uiGridLoadDetails', function() {
        Ctrl.gridOptions.data = [];
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi, '', {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"OK","resultCount":"4"},"data":[],"error":[]});
        // expect(function(){}).toEqual(gridApi.grid.appScope.confirmDeleteMarketMapping)
    });


    // mockCostCenterMarketMappingService tests
    it('should getCostCenterMarketMappingData', function () {
        var CostCenterMarketMappingDataResponse;
        mockCostCenterMarketMappingService.getMarketMappingData().then(function (response) {
            CostCenterMarketMappingDataResponse = response.data;
        });

        Ctrl.gridOptions.data = CostCenterMarketMappingDataResponse;
        //$scope.$apply();
        expect(Ctrl.gridOptions.data).toEqual(CostCenterMarketMappingDataResponse);
    });

    it('should call deleteCostCentersMarket', function () {
        var CostCenterMarketMappingDataResponse;
        mockCostCenterMarketMappingService.deleteCostCentersMarket().then(function (response) {
            CostCenterMarketMappingDataResponse = response;
        });

        var rowData = {
            market_name: "MGM",
            team_name: "Charlotte"
        };
        Ctrl.deleteCostCentersMarket(rowData);
        $scope.$apply();
        expect(CostCenterMarketMappingDataResponse['message']).toEqual('Success');
    });

    it('should call error on deleteCostCentersMarket', function () {
        spyOn(Ctrl2, 'deleteCostCentersMarket').and.callThrough();
        var rowData = {
            market_name: "MGM",
            team_name: "Charlotte"
        };
        Ctrl2.deleteCostCentersMarket(rowData);
        $scope.$apply();
        expect(Ctrl2.deleteCostCentersMarket).toHaveBeenCalled();
    });

    it('should confirm  CostCenterMarketMapping', function () {
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
        Ctrl.costCenterSearchData = costCenterSearchData;
        Ctrl.openAddUserMapping();
        $scope.$apply();
        expect(Ctrl.openAddUserMapping).toHaveBeenCalled();
    });

    it('should openAddUserMapping ', function () {
        spyOn($uibModal, 'open').and.returnValue(mockModal);
        spyOn(Ctrl, 'openAddUserMapping').and.callThrough();
        Ctrl.costCenterSearchData = null;
        Ctrl.openAddUserMapping();
        $scope.$apply();
        expect(Ctrl.openAddUserMapping).toHaveBeenCalled();
    });


});