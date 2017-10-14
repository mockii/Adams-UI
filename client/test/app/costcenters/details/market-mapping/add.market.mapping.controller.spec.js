/**
 * Created by chouhan's on 7/18/2017.
 */
'use strict';

describe('CostCenterAddMarketMappingController', function() {
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
        costCenterSourceSystemId,
        roleName,
        sourceSystemId,
        logService = {},
        limit,
        page,
        searchUserName,
        searchLastName,
        searchFirstName,
        searchCostCenter,
        sort,
        event,
        costCenterNumber,
        marketName,
        teamName,
        index,
        $uibModalInstance,
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
        vendorSearchData,
        $utils,
        gridApi,
        gridOptions,
        selectedMarketNode,
        addMarketMappingData,
        addMarketMappingData1,
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
    beforeEach(module('adams.costcenter.add.market.mapping.controller'));
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

    beforeEach(inject(function ($controller, _$rootScope_, _$window_, _$interval_, $location, MarketMappingService, ADAMS_CONSTANTS, _$q_, _$httpBackend_, CompassToastr, _$uibModal_, _$timeout_, _$state_, Utils, $log, STGLogService) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;
        $uibModal = _$uibModal_;
        $timeout = _$timeout_;
        $state = _$state_;
        $log = $log;
        userName = 'VASIRU01';
        compassToastr = CompassToastr;
        adamsConstants = ADAMS_CONSTANTS;
        CostCenterMarketMappingService = CostCenterMarketMappingService;
        $scope.vendorDetailsController = {};
        $location = $location;
        logService = STGLogService;
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
        costCenterNumber = '';
        costCenterSourceSystemId='',
        marketName = '';
        teamName = '';
        $utils = Utils;
        index = 0;
        addMarketMappingData = '{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}';
        addMarketMappingData1 = '{ "vendor_number": "1001600","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}';
        selectedMarketNode = {"market_name":"MGNET0","market_description":"Territories","market_display_path":null,"has_children":true,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNET0 - Territories","children":[],"leaf":false,"$$hashKey":"object:4787","__ivhTreeviewExpanded":false,"selected":true,"__ivhTreeviewIndeterminate":false};
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

        event = {
            currentTarget: {
                checked: false
            },
            preventDefault: function(){return;}
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

        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

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

        mockCostCenterMarketMappingService.addMarketMapping = function(costCenterNumber, marketMappingData,costCenterSourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockCostCenterMarketMappingService2.addMarketMapping = function(costCenterNumber, marketMappingData,costCenterSourceSystemId) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        mockCostCenterMarketMappingService.deleteMarketMapping = function(){
            var deferred = $q.defer();
            deferred.resolve({"message": "Success"});
            return deferred.promise;
        };

        mockCostCenterMarketMappingService2.getMarketMappingData = function(limit, page, sort, costCenterNumber, marketName, teamName) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        mockCostCenterMarketMappingService2.deleteMarketMapping = function(){
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        mockCostCenterMarketMappingService.addCostCenterMarketMapping = function(costCenterNumber, marketMappingData, costCenterSourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve("error")
            return deferred.promise;
        };




        mockCostCenterMarketMappingService2.addCostCenterMarketMapping = function(){
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        Ctrl = $controller('CostCenterAddMarketMappingController', {$scope: $scope, CostCenterMarketMappingService: mockCostCenterMarketMappingService,  ModalDialogService: mockModalDialogService, compassToastr: CompassToastr,  $uibModal: mockModal, ADAMS_CONSTANTS: adamsConstants, $timeout:$timeout, $state:$state, Utils: mockUtils, vendorSearchData: vendorSearchData, $location: $location, addMarketMappingData: addMarketMappingData, $uibModalInstance: $uibModalInstance, $log: $log });
        Ctrl2 = $controller('CostCenterAddMarketMappingController', {$scope: $scope, CostCenterMarketMappingService: mockCostCenterMarketMappingService2,  ModalDialogService: mockModalDialogService, compassToastr: CompassToastr,  $uibModal: mockModal, ADAMS_CONSTANTS: adamsConstants, $timeout:$timeout, $state:$state, Utils: mockUtils, vendorSearchData: vendorSearchData, $location: $location, addMarketMappingData: addMarketMappingData, $uibModalInstance: $uibModalInstance, $log: $log });
    }));

    it('should initialize the AddMarketMappingController properly', function () {
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

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        // expect(function(){}).toEqual(gridApi.grid.appScope.confirmDeleteMarketMapping)
    });

    it('should call hierarchyTreeTeamSelectionChange', function() {
        addMarketMappingData = JSON.parse(addMarketMappingData);
        $rootScope.$broadcast('hierarchyTreeTeamSelectionChange', "marketRefId", true, addMarketMappingData);
        expect("marketRefId").toEqual(Ctrl.marketMappingRefId);
    });

    it('should call hierarchyTreeTeamSelectionChange else if block', function() {
        addMarketMappingData = JSON.parse(addMarketMappingData);
        Ctrl.selectedMarkets = [];
        Ctrl.selectedMarkets.push(addMarketMappingData);
        $rootScope.$broadcast('hierarchyTreeTeamSelectionChange', "marketRefId1", false, addMarketMappingData);
        expect("marketRefId1").not.toEqual(Ctrl.marketMappingRefId);
    });

    // it('should call hierarchyTreeTeamSelectionChange else else block', function() {
    //     addMarketMappingData = JSON.parse(addMarketMappingData);
    //     Ctrl.selectedTeams = [];
    //     Ctrl.selectedTeams.push(addMarketMappingData);
    //     $rootScope.$broadcast('hierarchyTreeTeamSelectionChange', "marketRefId1", false, addMarketMappingData);
    //     expect("marketRefId1").not.toEqual(Ctrl.marketMappingRefId);
    // });

    it('should call cancel', function () {
        spyOn(Ctrl, "cancel").and.callThrough();
        Ctrl.cancel('error');
       // $scope.$apply();
        expect(Ctrl.cancel).toHaveBeenCalled();
    });

    it('should call select', function () {
        addMarketMappingData1 = JSON.parse(addMarketMappingData1);
        Ctrl.selectedMarketNode = selectedMarketNode;
        spyOn(Ctrl, "select").and.callThrough();
        Ctrl.selectedMarkets = [];
        Ctrl.selectedMarkets.push(addMarketMappingData1);
        Ctrl.select(addMarketMappingData1.costCenterNumber, Ctrl.selectedMarketNode.market_name, addMarketMappingData1.vendorSourceSystemId, {});
        $scope.$apply();
        expect(Ctrl.select).toHaveBeenCalled();
    });

    it('should call select and throw error', function () {
        addMarketMappingData1 = JSON.parse(addMarketMappingData1);
        Ctrl2.selectedMarketNode = selectedMarketNode;
        spyOn(Ctrl2, "select").and.callThrough();
        Ctrl2.selectedMarkets = [];
        Ctrl2.selectedMarkets.push(addMarketMappingData1);
        Ctrl2.select(addMarketMappingData1.costCenterNumber, Ctrl2.selectedMarketNode.market_name, addMarketMappingData1.vendorSourceSystemId, {});
        $scope.$apply();
        expect(Ctrl2.select).toHaveBeenCalled();
    });

    it('should call errorHandling', function () {
        spyOn(Ctrl, "errorHandling").and.callThrough();
        Ctrl.errorHandling('error');
       // $scope.$apply();
        expect(Ctrl.errorHandling).toHaveBeenCalledWith('error');
    });


    // mockMarketMappingService tests
    /*it('should getMarketMappingData', function () {
     var marketMappingDataResponse;
     mockMarketMappingService.getMarketMappingData().then(function (response) {
     marketMappingDataResponse = response.data;
     });

     Ctrl.gridOptions.data = marketMappingDataResponse;
     //$scope.$apply();
     expect(Ctrl.gridOptions.data).toEqual(marketMappingDataResponse);
     });*/

    /*it('should deleteMarketMappingData', function () {
     var marketMappingDeleteResponse;
     mockMarketMappingService.deleteMarketMapping().then(function (response) {
     marketMappingDeleteResponse = response;
     });

     var rowData = {
     market_name: "MGM",
     team_name: "Charlotte"
     }
     Ctrl.deleteMarketMapping(rowData);
     $scope.$apply();
     expect(marketMappingDeleteResponse['message']).toEqual('Success');
     });*/

    /*it('should confirmDeleteMarketMapping', function () {
     spyOn(Ctrl, 'confirmDeleteMarketMapping').and.callThrough();
     var rowData = {
     market_name: "MGM",
     team_name: "Charlotte"
     }
     Ctrl.confirmDeleteMarketMapping(rowData);
     $scope.$apply();
     expect(Ctrl.confirmDeleteMarketMapping).toHaveBeenCalled();
     });*/

    /*it('should openAddUserMapping ', function () {
     spyOn($uibModal, 'open').and.returnValue(mockModal);
     spyOn(Ctrl, 'openAddUserMapping').and.callThrough();
     Ctrl.vendorSearchData = vendorSearchData;
     Ctrl.openAddUserMapping();
     $scope.$apply();
     expect(Ctrl.openAddUserMapping).toHaveBeenCalled();
     });*/

    /*it('should deleteMarketMappingData and throw error', function () {
     var marketMappingDeleteResponse;
     var responseFunction = function (response) {
     marketMappingDeleteResponse = response;
     };
     mockMarketMappingService2.deleteMarketMapping().then(responseFunction);

     var rowData = {
     market_name: "MGM",
     team_name: "Charlotte"
     }
     Ctrl2.deleteMarketMapping(rowData);
     $scope.$apply();
     expect(responseFunction).toThrow("An error occurred while Deleting Market Mapping");
     /!*var object = {
     doSomething: function(something) {
     throw new Error("Unexpected error!")
     }
     };
     expect(object.doSomething.bind(null, "hello")).toThrow(new Error("Unexpected error!"));*!/
     });*/
});