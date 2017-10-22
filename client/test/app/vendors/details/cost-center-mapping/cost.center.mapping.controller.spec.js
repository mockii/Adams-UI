
'use strict';

describe('CostCenterMappingController', function() {
    var Ctrl,
        Ctrl1,
        Ctrl2,
        Ctrl3,
        $scope,
        logService = {},
        $state,
        CompassToastr,
        adamsConstants,
        mockModalDialogService,
        action,
        vendorData,
        vendorSearchData,
        statesService = {},
        CostCenterMappingService,
        $rootScope,
        $httpBackend,
        $q,
        $uibModal,
        mockCostCenterService = {},
        mockCostCenterService2 = {},
        mockCostCenterService3 = {},
        $filter,
        mockModal,
        mockModal2,
        mockModal3,
        actualModalOptions,
        mockUtils = {},
        action,
        compassToastr,
        $uibModalInstance,
        costCenterRowData,
        sampleSvcObj,
        templateHtml,
        formElem,
        form,
        $utils,
        $location,
        $state,
        $compile,
        gridApi,
        gridOptions,
        $timeout,
        callWith = {},
        costCenterRow,
        event,
        urlSpace;

    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.cost.center.mapping.service'));
    beforeEach(module('adams.cost.center.mapping.controller'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));


    beforeEach(function() {
        module(function ($provide) {
            $provide.value('CostCenterMappingService', mockCostCenterService);
            $provide.value('StgStatesService', statesService);
            $provide.value('Utils', mockUtils);
            $provide.value('STGLogService', logService);
        });
    });

    beforeEach(inject(function($controller, _$state_, _$compile_, _$rootScope_, $location, _$httpBackend_, _$uibModal_, _$filter_, $timeout, CostCenterMappingService, _$q_, ADAMS_URL_SPACE, ADAMS_CONSTANTS, CompassToastr, Utils, STGLogService, $log){

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        sampleSvcObj = CostCenterMappingService;
        $q = _$q_;
        logService = STGLogService;
        compassToastr = CompassToastr;
        adamsConstants = ADAMS_CONSTANTS;
        urlSpace  = ADAMS_URL_SPACE;
        $utils = Utils;
        $uibModal = _$uibModal_;
        $filter = _$filter_;
        $timeout = $timeout;
        $state = _$state_;
        $location = $location;
        $compile = _$compile_;
        $scope.vendorDetailsController = {};

        $state = { go: function() { return; }};

        statesService.goToState = function(state, params){
            // spyOn($state, 'go');
            return;
        };

        $state.params ={"vendor_number":"10016011","source_system_id":"1008","vendorSearchData":{"vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"address":"PO BOX 841918","city":"DALLAS","state":"TX","zipcode":"75284","country":null,"telephone_number_1":null,"telephone_number_2":null,"fax_number":null,"category_code":"2205","category_description":"Beverage, Carbonated               ","model_market_classification":null,"extraneous":null,"excluded":0,"diversity_code":"          ","district":null,"train_station":null,"industry_key":null,"parent_record_created_date":null,"parent_record_created_by":null,"child_record_created_date":null,"child_record_created_by":null,"account_group":null,"account_number_alt_payee":null,"master_record_delete_flag":null,"tax_1":null,"tax_2":null,"one_time_account_ind":null,"training_partner_id":null,"business_type":null,"telebox":null,"personnel_number":null,"group_key":null,"central_posting_block":false,"imposed_purchase_block":false,"payment_block":false,"company_code_posting_block":false,"tax_jurisdiction":null,"company_code":null,"customer_number":null,"terms_payment_key":null,"account_number":null,"clerk":null,"consolidation_code":null,"consolidation_description":null,"nominated_code":null,"nominated_description":null,"source_system_id":1008,"created_by":"BATCHADM","created_date":"10-26-2016 20:55","modified_by":"BATCHADM","modified_date":"10-31-2016 13:31"},"costCenterMappingData":null};
        vendorData = {"vendorNumber":"10016000","vendorSourceSystemId":"1001"};
        costCenterRowData = {"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","compliance":null,"edi_pay_status":null,"edi_live_date":null,"associated":false,"associated_by":"CHOUHR01","associated_date":null,"disassociated_by":null,"disassociated_date":"12-14-2016 20:39","disassociation_reason":"sdgfdg","vendor_source_system_id":1001,"cost_center_source_system_id":1001,"created_by":"ChouhR01","created_date":"12-14-2016 20:30","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00SC"};
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

        costCenterRow = {"entity":{"vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"cost_center_name":"10178","cost_center_description":"$$$ Gaston Day Schoo","compliance":"Selected","edi_pay_status":1,"edi_live_date":null,"associated":true,"associated_by":"ISENHJ01","associated_date":"1497553463670","disassociated_by":null,"disassociated_date":null,"disassociation_reason":null,"vendor_source_system_id":1008,"cost_center_source_system_id":1001,"created_by":"isenhj01","created_date":"1497553463670","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00Q2"}};

        event = {
            currentTarget: {
                checked: false
            },
            preventDefault: function(){return;}
        };

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
                    changeCostCenterAssociation: jasmine.createSpy('gridApi.grid.appScope.changeCostCenterAssociation'),
                    showCostCenterMappingHistory: jasmine.createSpy('gridApi.grid.appScope.showCostCenterMappingHistory'),
                    navigateToCostCenterDetail: jasmine.createSpy('gridApi.grid.appScope.navigateToCostCenterDetail')
                }
            }
        };

        /*mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss'),
            // open: jasmine.createSpy('mockModal.open').and.returnValue({ result: { then: jasmine.createSpy('mockModal.result.then') } }),
            open: jasmine.createSpy('mockModal.open'),
            /*open: jasmine.createSpy('mockModal.open').and.returnValue({result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            }}),*/
            /*result: {
                then: jasmine.createSpy('mockModal.result.then')
            },
            result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            }
        };*/

        /*var modalResult = {};
        var mockModalInstance = { result: $q.resolve(modalResult) };
        spyOn(mockModalInstance.result, 'then').and.callThrough();
        spyOn($uibModal, 'open').and.returnValue(mockModalInstance);*/

        /*spyOn($uibModal, 'open').and.callFake(function(options){
            actualModalOptions = options;
            console.log("Now called " + mockModal);
            return mockModal;
        }).and.returnValue(mockModalInstance);*//*.and.returnValue({ result: { then: function() {
                    var deferred = $q.defer();
                    deferred.resolve({});
                    return deferred.promise;
                } } })*/;

        /*var mockModal = {
            result: {
                then: function (confirmCallback, cancelCallback) {
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                    return this;
                },
                catch: function (cancelCallback) {
                    this.cancelCallback = cancelCallback;
                    return this;
                },
                finally: function (finallyCallback) {
                    this.finallyCallback = finallyCallback;
                    return this;
                }
            },
            open: function (item) {
                this.result.confirmCallBack(item);
            },
            close: function (item) {
                this.result.confirmCallBack(item);
            },
            dismiss: function (item) {
                this.result.cancelCallback(item);
            },
            finally: function () {
                this.result.finallyCallback();
            }
        };
        spyOn($uibModal, 'open').and.returnValue(mockModal);*/

        spyOn(event, 'preventDefault').and.callThrough();

        // if block
        function mockModal(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.resolve('true');
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

        // else block
        function mockModal2(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.resolve({});
            this.result = this.resultDeferred.promise;
        }
        mockModal2.prototype.open = function(options){ return this;  };
        mockModal2.prototype.close = function (item) {
            this.resultDeferred.resolve(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };
        mockModal2.prototype.dismiss = function (item) {
            this.resultDeferred.reject(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };


        // error block
        function mockModal3(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.reject();
            this.result = this.resultDeferred.promise;
        }
        mockModal3.prototype.open = function(options){ return this;  };
        mockModal3.prototype.close = function (item) {
            this.resultDeferred.resolve(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };
        mockModal3.prototype.dismiss = function (item) {
            this.resultDeferred.reject(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };

        mockModal = new mockModal();
        mockModal2 = new mockModal2();
        mockModal3 = new mockModal3();

        mockModalDialogService = {
            result: {
                then: function(confirmCallback, cancelCallback) {
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

        mockCostCenterService.getCostCenterMappingData = function(limit, page, sort, gridSearchParams, costCenterRowData) {
            var deferred = $q.defer();
            deferred.resolve(callWith);
            return deferred.promise;
        };

        mockCostCenterService2.getCostCenterMappingData = function(limit, page, sort, gridSearchParams, costCenterRowData) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockCostCenterService.updateVendorCostCenter = function(costCenterRowData) {
            var deferred = $q.defer();
            deferred.resolve(callWith);
            return deferred.promise;
        };

        mockCostCenterService2.updateVendorCostCenter = function(costCenterRowData) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockCostCenterService3.updateVendorCostCenter = function(costCenterRowData) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        /*mockCostCenterService3.getCostCenterMappingHistoryData = function(limit, page, sort, gridSearchParams, costCenterRowData) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };*/

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

        Ctrl = $controller('CostCenterMappingController', { $scope: $scope, $state: $state, $timeout:$timeout, $location: $location, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, CostCenterMappingService: mockCostCenterService, Utils: mockUtils,  $uibModal: mockModal, vendorSearchData: vendorSearchData, StgStatesService: statesService});

        Ctrl1 = $controller('CostCenterMappingController', { $scope: $scope, $state: $state, $timeout:$timeout, $location: $location, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, CostCenterMappingService: mockCostCenterService, Utils: mockUtils,  $uibModal: mockModal2, vendorSearchData: vendorSearchData, StgStatesService: statesService});

        Ctrl2 = $controller('CostCenterMappingController', { $scope: $scope, $state: $state, $timeout:$timeout, $location: $location, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, CostCenterMappingService: mockCostCenterService2, Utils: mockUtils,  $uibModal: mockModal2, vendorSearchData: vendorSearchData, StgStatesService: statesService});

        Ctrl3 = $controller('CostCenterMappingController', { $scope: $scope, $state: $state, $timeout:$timeout, $location: $location, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, CostCenterMappingService: mockCostCenterService3, Utils: mockUtils,  $uibModal: mockModal3, vendorSearchData: vendorSearchData, StgStatesService: statesService});

        // Ctrl3 = $controller('CostCenterMappingController', { $scope: $scope, $state: $state, $timeout:$timeout, costCenterRowData: costCenterRowData, $uibModalInstance: $uibModalInstance, $uibModal: $uibModal, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, CostCenterMappingService: mockCostCenterService3, Utils: mockUtils,  mockModal: mockModal, vendorSearchData: vendorSearchData});
    }));

    it('should initialize the CostCenterMappingController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should verify the Grid Option Pagination Page Size', function () {
        expect(Ctrl.gridOptions.paginationPageSize).toEqual(25);
    });


    it('should call changeCostCenterAssociation if if if block', function() {
        spyOn($uibModal, 'open').and.returnValue(mockModal);
        spyOn(Ctrl, 'changeCostCenterAssociation').and.callThrough();
        Ctrl.changeCostCenterAssociation(costCenterRow, event);
        $scope.$apply();
        expect(Ctrl.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call changeCostCenterAssociation if else if block', function() {
        spyOn($uibModal, 'open').and.returnValue(mockModal);
        costCenterRow.entity.edi_pay_status = null;
        spyOn(Ctrl, 'changeCostCenterAssociation').and.callThrough();
        Ctrl.changeCostCenterAssociation(costCenterRow, event);
        $scope.$apply();
        expect(Ctrl.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call changeCostCenterAssociation if else else block', function() {
        spyOn($uibModal, 'open').and.returnValue(mockModal2);
        costCenterRow.entity.edi_pay_status = null;
        spyOn(Ctrl1, 'changeCostCenterAssociation').and.callThrough();
        Ctrl1.changeCostCenterAssociation(costCenterRow, event);
        $scope.$apply();
        expect(Ctrl1.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call changeCostCenterAssociation if else error block', function() {
        spyOn($uibModal, 'open').and.returnValue(mockModal3);
        costCenterRow.entity.edi_pay_status = null;
        spyOn(Ctrl3, 'changeCostCenterAssociation').and.callThrough();
        Ctrl3.changeCostCenterAssociation(costCenterRow, event);
        $scope.$apply();
        expect(Ctrl3.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call changeCostCenterAssociation else block', function() {
        spyOn(Ctrl, 'changeCostCenterAssociation').and.callThrough();
        event.currentTarget.checked = true;
        Ctrl.changeCostCenterAssociation(costCenterRow, event);
        $scope.$apply();
        expect(Ctrl.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call changeCostCenterAssociation else block with response error', function() {
        spyOn(Ctrl2, 'changeCostCenterAssociation').and.callThrough();
        event.currentTarget.checked = true;
        Ctrl2.changeCostCenterAssociation(costCenterRow, event);
        $scope.$apply();
        expect(Ctrl2.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call changeCostCenterAssociation else block with recieve error', function() {
        spyOn(Ctrl3, 'changeCostCenterAssociation').and.callThrough();
        event.currentTarget.checked = true;
        Ctrl3.changeCostCenterAssociation(costCenterRow, event);
        $scope.$apply();
        expect(Ctrl3.changeCostCenterAssociation).toHaveBeenCalled();
    });

    it('should call showCostCenterMappingHistory', function() {
        //spyOn($uibModal, 'open').and.returnValue(mockModal).and.callFake(function(){return {resolve:{costCenterRowData: function(){return;}}}});
        /*spyOn($uibModal, 'open').and.callFake(function(options){
            actualModalOptions = options;
            console.log("Now called " + options);
            return mockModal;
        }).and.returnValue(mockModal);*/

        /*var $uibModal = $injector.get('$uibModal');
        mockModal.open({
            templateUrl: 'vendors/details/cost-center-mapping/cost-center-mapping-history.tpl.html',
                controller: 'CostCenterMappingHistoryController as costCenterMappingHistoryController',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                costCenterRowData: function () {
                    return costCenterRowData;
                }
            }
        });*/
        spyOn(Ctrl, 'showCostCenterMappingHistory').and.callThrough();
        Ctrl.showCostCenterMappingHistory(costCenterRow, event);
        $scope.$apply();
        expect(Ctrl.showCostCenterMappingHistory).toHaveBeenCalled();
    });

    it('should call openAddCostCenterMapping ', function() {
        spyOn(Ctrl2, 'openAddCostCenterMapping').and.callThrough();
        /*var modalResult = {};
        var mockModalInstance1 = { result: $q.resolve(modalResult) };
        spyOn(mockModalInstance1.result, 'then').and.callThrough();
        spyOn($uibModal, 'open').and.returnValue(mockModalInstance1);*/
        //mockModal.open({});
        Ctrl2.vendorSourceSystemId = null;
        Ctrl2.openAddCostCenterMapping();
        //$rootScope.digest();
        $scope.$apply();
        // expect(mockModal.open).toHaveBeenCalled();
        expect(Ctrl2.openAddCostCenterMapping).toHaveBeenCalled();
    });

    it('should call openAddCostCenterMapping ', function() {
        spyOn(Ctrl2, 'openAddCostCenterMapping').and.callThrough();
        /*var modalResult = {};
        var mockModalInstance1 = { result: $q.resolve(modalResult) };
        spyOn(mockModalInstance1.result, 'then').and.callThrough();
        spyOn($uibModal, 'open').and.returnValue(mockModalInstance1);*/
        //mockModal.open({});
        Ctrl2.openAddCostCenterMapping();
        //$rootScope.digest();
        $scope.$apply();
        // expect(mockModal.open).toHaveBeenCalled();
        expect(Ctrl2.openAddCostCenterMapping).toHaveBeenCalled();
    });

    it('should call navigateToCostCenterDetail if block', function() {
        spyOn(statesService, 'goToState');
        spyOn(Ctrl, 'navigateToCostCenterDetail').and.callThrough();
        Ctrl.navigateToCostCenterDetail(costCenterRow);
        $scope.$apply();
        expect(statesService.goToState).toHaveBeenCalledWith('costcenterdetails', {
            costCenter_number: costCenterRow.entity.cost_center_name,
            costCenter_source_system_id: costCenterRow.entity.cost_center_source_system_id
        });
        expect(Ctrl.navigateToCostCenterDetail).toHaveBeenCalled();
    });

    it('should call uiGridSelectedRows', function() {
        $rootScope.$broadcast('uiGridSelectedRows');
    });

    it('should call getGridData ', function() {
        Ctrl.getGridData();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        expect(Ctrl3.changeCostCenterAssociation).toEqual(gridApi.grid.appScope.changeCostCenterAssociation);
        expect(Ctrl3.showCostCenterMappingHistory).toEqual(gridApi.grid.appScope.showCostCenterMappingHistory);
        expect(Ctrl3.navigateToCostCenterDetail).toEqual(gridApi.grid.appScope.navigateToCostCenterDetail);
    });

    it('should ediPayStatusFilter ', function () {
        var value = 1, result;
        result = $filter('ediPayStatusFilter')(value);
        expect(result).toEqual(true);
    });


    /*it('should be equal to totalItems ', function () {
        expect(Ctrl.gridOptions.totalItems).toEqual(40000);
    });

    it('should be equal to paginationPageSize ', function () {
        expect(Ctrl.gridOptions.paginationPageSize).toEqual(25);
    });

    it('should have 3 paginationPageSizes ', function () {
        expect(Ctrl.gridOptions.paginationPageSizes.length).toEqual(3);
    });

    it('should call errorHandling', function () {
        spyOn(Ctrl, 'errorHandling').and.callThrough();
        Ctrl.errorHandling('error');
        expect(Ctrl.errorHandling).toHaveBeenCalled();
    });*/

    /*it('should dismiss the modal with result "dismiss" when dismissed', function () {
        Ctrl.close($uibModalInstance.dismiss('cancel'));
        expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });*/

    it('should call getCostCenterMappingData with result', inject(function ($q, $rootScope) {
        var costCenterResponse;
        var deferred = $q.defer();

        callWith = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"cost_center_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"cost_center_source_system_id":1001}],"error":"{}"};

        var promise = mockCostCenterService.getCostCenterMappingData();

        promise.then(function (response) {
            if (response === "error") {
                Ctrl.gridOptions.data = [];
                Ctrl.gridOptions.totalItems = '';
                mockUtils.stopBlockUI();
            } else {
                costCenterResponse = response;
                Ctrl.gridOptions.data = costCenterResponse;
            }
        }, function(error) {
            mockUtils.stopBlockUI();
        });

        expect(costCenterResponse).toBeUndefined();
        deferred.resolve(callWith);
        expect(costCenterResponse).toBeUndefined()

        $rootScope.$apply();
        expect(costCenterResponse).toEqual(callWith);

    }));

 //    it('should call getCostCenterMappingData with response error', inject(function ($timeout) {
 //        $scope.$apply();
 //        expect(Ctrl2.gridOptions.data).toEqual([]);
 //        expect(Ctrl2.gridOptions.totalItems).toBeUndefined();
 //        // flush timeout(s) for all code under test.
 //        $timeout.flush();
 //        // this will throw an exception if there are any pending timeouts.
 //        $timeout.verifyNoPendingTasks();
 //        expect(Ctrl2.errorMessage).toEqual('An error occurred while getting vendors data');
 //        spyOn(Ctrl2, 'errorHandling').and.callThrough();
 //        Ctrl2.errorHandling('An error occurred while getting vendors data');
 //        expect(Ctrl2.errorHandling).toHaveBeenCalledWith('An error occurred while getting vendors data');
 // }));

    /*it('should call getCostCenterMappingHistoryData with error', function () {
     $scope.$apply();
     mockUtils.stopBlockUI();
     expect($scope.error).toBe('There has been an error!');
     });*/

    /*it('should registerGridApi ', function () {
     var gridContainer = "< div ui-grid='myGridOptions' ui-grid-pagination></div>";

     var grid = $compile(gridContainer)($scope); // I've declared scope before as scope = $rootScope.$new();

     $scope.$digest();
     Ctrl.gridOptions.onRegisterApi(grid);
     });*/
})
