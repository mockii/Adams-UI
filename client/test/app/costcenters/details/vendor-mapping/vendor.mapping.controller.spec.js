
'use strict';

describe('VendorMappingController', function() {
    var Ctrl,
        Ctrl1,
        Ctrl2,
        Ctrl3,
        $scope,
        $state,
        CompassToastr,
        logService = {},
        adamsConstants,
        mockModalDialogService,
        action,
        vendorData,
        costCenterSearchData,
        VendorMappingService,
        $rootScope,
        $httpBackend,
        $q,
        $uibModal,
        mockVendorService = {},
        mockVendorService2 = {},
        mockVendorService3 = {},
        $filter,
        mockModal,
        mockModal2,
        mockModal3,
        statesService = {},
        actualModalOptions,
        mockUtils = {},
        action,
        compassToastr,
        $uibModalInstance,
        vendorRowData,
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
        vendorRow,
        event,
        urlSpace;

    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.vendor.mapping.service'));
    beforeEach(module('adams.vendor.mapping.controller'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));


    beforeEach(function() {
        module(function ($provide) {
            $provide.value('VendorMappingService', mockVendorService);
            $provide.value('StgStatesService', statesService);
            $provide.value('Utils', mockUtils);
            $provide.value('STGLogService', logService);
        });
    });

    beforeEach(inject(function($controller, _$state_, _$compile_, _$rootScope_, $location, _$httpBackend_, _$uibModal_, _$filter_, $timeout, VendorMappingService, _$q_, ADAMS_URL_SPACE, ADAMS_CONSTANTS, CompassToastr, Utils, STGLogService, $log){
        logService = STGLogService;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        sampleSvcObj = VendorMappingService;
        $q = _$q_;
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
        $scope.costCenterDetailsController = {};

        $state = { go: function() { return; }};

        $state.params ={"vendor_number":"10016011","source_system_id":"1008","costCenterSearchData":{"vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"address":"PO BOX 841918","city":"DALLAS","state":"TX","zipcode":"75284","country":null,"telephone_number_1":null,"telephone_number_2":null,"fax_number":null,"category_code":"2205","category_description":"Beverage, Carbonated               ","model_market_classification":null,"extraneous":null,"excluded":0,"diversity_code":"          ","district":null,"train_station":null,"industry_key":null,"parent_record_created_date":null,"parent_record_created_by":null,"child_record_created_date":null,"child_record_created_by":null,"account_group":null,"account_number_alt_payee":null,"master_record_delete_flag":null,"tax_1":null,"tax_2":null,"one_time_account_ind":null,"training_partner_id":null,"business_type":null,"telebox":null,"personnel_number":null,"group_key":null,"central_posting_block":false,"imposed_purchase_block":false,"payment_block":false,"company_code_posting_block":false,"tax_jurisdiction":null,"company_code":null,"customer_number":null,"terms_payment_key":null,"account_number":null,"clerk":null,"consolidation_code":null,"consolidation_description":null,"nominated_code":null,"nominated_description":null,"source_system_id":1008,"created_by":"BATCHADM","created_date":"10-26-2016 20:55","modified_by":"BATCHADM","modified_date":"10-31-2016 13:31"},"vendorMappingData":null};
        vendorData = {"vendorNumber":"10016000","vendorSourceSystemId":"1001"};
        vendorRowData = {"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","vendor_name":"11889","vendor_description":"$$$Wal-Mart-Shelby","compliance":null,"edi_pay_status":null,"edi_live_date":null,"associated":false,"associated_by":"CHOUHR01","associated_date":null,"disassociated_by":null,"disassociated_date":"12-14-2016 20:39","disassociation_reason":"sdgfdg","vendor_source_system_id":1001,"vendor_source_system_id":1001,"created_by":"ChouhR01","created_date":"12-14-2016 20:30","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00SC"};
        costCenterSearchData = {
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

        vendorRow = {"entity":{"vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"vendor_name":"10178","vendor_description":"$$$ Gaston Day Schoo","compliance":"Selected","edi_pay_status":1,"edi_live_date":null,"associated":true,"associated_by":"ISENHJ01","associated_date":"1497553463670","disassociated_by":null,"disassociated_date":null,"disassociation_reason":null,"vendor_source_system_id":1008,"vendor_source_system_id":1001,"created_by":"isenhj01","created_date":"1497553463670","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00Q2"}};

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

        statesService.goToState = function(state, params){
            //spyOn($state, 'go');
            return;
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
                    changeVendorAssociation: jasmine.createSpy('gridApi.grid.appScope.changeVendorAssociation'),
                    showVendorMappingHistory: jasmine.createSpy('gridApi.grid.appScope.showVendorMappingHistory'),
                    navigateToVendorDetail: jasmine.createSpy('gridApi.grid.appScope.navigateToVendorDetail')
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

        mockVendorService.getVendorMappingData = function(limit, page, sort, gridSearchParams, vendorRowData) {
            var deferred = $q.defer();
            deferred.resolve(callWith);
            return deferred.promise;
        };

        mockVendorService2.getVendorMappingData = function(limit, page, sort, gridSearchParams, vendorRowData) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockVendorService.updateCostCenterVendor = function(vendorRowData) {
            var deferred = $q.defer();
            deferred.resolve(callWith);
            return deferred.promise;
        };

        mockVendorService2.updateCostCenterVendor = function(vendorRowData) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockVendorService3.updateCostCenterVendor = function(vendorRowData) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        /*mockVendorService3.getVendorMappingHistoryData = function(limit, page, sort, gridSearchParams, vendorRowData) {
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
                source_system_id: '1008'
            }
        };

        Ctrl = $controller('VendorMappingController', { $scope: $scope, $state: $state, $timeout:$timeout, $location: $location, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, VendorMappingService: mockVendorService, Utils: mockUtils,  $uibModal: mockModal, costCenterSearchData: costCenterSearchData, StgStatesService: statesService});

        Ctrl1 = $controller('VendorMappingController', { $scope: $scope, $state: $state, $timeout:$timeout, $location: $location, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, VendorMappingService: mockVendorService, Utils: mockUtils,  $uibModal: mockModal2, costCenterSearchData: costCenterSearchData, StgStatesService: statesService});

        Ctrl2 = $controller('VendorMappingController', { $scope: $scope, $state: $state, $timeout:$timeout, $location: $location, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, VendorMappingService: mockVendorService2, Utils: mockUtils,  $uibModal: mockModal2, costCenterSearchData: costCenterSearchData, StgStatesService: statesService});

        Ctrl3 = $controller('VendorMappingController', { $scope: $scope, $state: $state, $timeout:$timeout, $location: $location, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, VendorMappingService: mockVendorService3, Utils: mockUtils,  $uibModal: mockModal3, costCenterSearchData: costCenterSearchData, StgStatesService: statesService});

        // Ctrl3 = $controller('VendorMappingController', { $scope: $scope, $state: $state, $timeout:$timeout, vendorRowData: vendorRowData, $uibModalInstance: $uibModalInstance, $uibModal: $uibModal, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, VendorMappingService: mockVendorService3, Utils: mockUtils,  mockModal: mockModal, costCenterSearchData: costCenterSearchData});
    }));

    it('should initialize the VendorMappingController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should verify the Grid Option Pagination Page Size', function () {
        expect(Ctrl.gridOptions.paginationPageSize).toEqual(25);
    });


    it('should call changeVendorAssociation if if if block', function() {
        spyOn($uibModal, 'open').and.returnValue(mockModal);
        spyOn(Ctrl, 'changeVendorAssociation').and.callThrough();
        Ctrl.changeVendorAssociation(vendorRow, event);
        $scope.$apply();
        expect(Ctrl.changeVendorAssociation).toHaveBeenCalled();
    });

    it('should call changeVendorAssociation if else if block', function() {
        spyOn($uibModal, 'open').and.returnValue(mockModal);
        vendorRow.entity.edi_pay_status = null;
        spyOn(Ctrl, 'changeVendorAssociation').and.callThrough();
        Ctrl.changeVendorAssociation(vendorRow, event);
        $scope.$apply();
        expect(Ctrl.changeVendorAssociation).toHaveBeenCalled();
    });

    it('should call changeVendorAssociation if else else block', function() {
        spyOn($uibModal, 'open').and.returnValue(mockModal2);
        vendorRow.entity.edi_pay_status = null;
        spyOn(Ctrl1, 'changeVendorAssociation').and.callThrough();
        Ctrl1.changeVendorAssociation(vendorRow, event);
        $scope.$apply();
        expect(Ctrl1.changeVendorAssociation).toHaveBeenCalled();
    });

    it('should call changeVendorAssociation if else error block', function() {
        spyOn($uibModal, 'open').and.returnValue(mockModal3);
        vendorRow.entity.edi_pay_status = null;
        spyOn(Ctrl3, 'changeVendorAssociation').and.callThrough();
        Ctrl3.changeVendorAssociation(vendorRow, event);
        $scope.$apply();
        expect(Ctrl3.changeVendorAssociation).toHaveBeenCalled();
    });

    it('should call changeVendorAssociation else block', function() {
        spyOn(Ctrl, 'changeVendorAssociation').and.callThrough();
        event.currentTarget.checked = true;
        Ctrl.changeVendorAssociation(vendorRow, event);
        $scope.$apply();
        expect(Ctrl.changeVendorAssociation).toHaveBeenCalled();
    });

    it('should call changeVendorAssociation else block - with service throw error', function() {
        spyOn(Ctrl3, 'changeVendorAssociation').and.callThrough();
        event.currentTarget.checked = true;
        Ctrl3.changeVendorAssociation(vendorRow, event);
        $scope.$apply();
        expect(Ctrl3.changeVendorAssociation).toHaveBeenCalled();
    });

    it('should call changeVendorAssociation else block with response error', function() {
        spyOn(Ctrl2, 'changeVendorAssociation').and.callThrough();
        event.currentTarget.checked = true;
        Ctrl2.changeVendorAssociation(vendorRow, event);
        $scope.$apply();
        expect(Ctrl2.changeVendorAssociation).toHaveBeenCalled();
    });

    /*it('should call changeVendorAssociation else block with recieve error', function() {
        spyOn(Ctrl3, 'changeVendorAssociation').and.callThrough();
        event.currentTarget.checked = true;
        Ctrl3.changeVendorAssociation(vendorRow, event);
        $scope.$apply();
        expect(Ctrl3.changeVendorAssociation).toHaveBeenCalled();
    });*/

    it('should call showVendorMappingHistory', function() {
        //spyOn($uibModal, 'open').and.returnValue(mockModal).and.callFake(function(){return {resolve:{vendorRowData: function(){return;}}}});
        /*spyOn($uibModal, 'open').and.callFake(function(options){
            actualModalOptions = options;
            console.log("Now called " + options);
            return mockModal;
        }).and.returnValue(mockModal);*/

        /*var $uibModal = $injector.get('$uibModal');
        mockModal.open({
            templateUrl: 'vendors/details/cost-center-mapping/cost-center-mapping-history.tpl.html',
                controller: 'VendorMappingHistoryController as vendorMappingHistoryController',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                vendorRowData: function () {
                    return vendorRowData;
                }
            }
        });*/
        spyOn(Ctrl, 'showVendorMappingHistory').and.callThrough();
        Ctrl.showVendorMappingHistory(vendorRow, event);
        $scope.$apply();
        expect(Ctrl.showVendorMappingHistory).toHaveBeenCalled();
    });

    it('should call openAddVendorMapping ', function() {
        spyOn(Ctrl2, 'openAddVendorMapping').and.callThrough();
        /*var modalResult = {};
        var mockModalInstance1 = { result: $q.resolve(modalResult) };
        spyOn(mockModalInstance1.result, 'then').and.callThrough();
        spyOn($uibModal, 'open').and.returnValue(mockModalInstance1);*/
        //mockModal.open({});
        Ctrl2.openAddVendorMapping();
        //$rootScope.digest();
        $scope.$apply();
        // expect(mockModal.open).toHaveBeenCalled();
        expect(Ctrl2.openAddVendorMapping).toHaveBeenCalled();
    });

    it('should call openAddVendorMapping ', function() {
        spyOn(Ctrl2, 'openAddVendorMapping').and.callThrough();
        Ctrl2.costCenterSourceSystemId = null;
        Ctrl2.openAddVendorMapping();
        $scope.$apply();
        expect(Ctrl2.openAddVendorMapping).toHaveBeenCalled();
    });

    it('should call navigateToVendorDetail if block', function() {
        spyOn(statesService, 'goToState');
        spyOn(Ctrl, 'navigateToVendorDetail').and.callThrough();
        Ctrl.navigateToVendorDetail(vendorRow);
        $scope.$apply();
        expect(statesService.goToState).toHaveBeenCalledWith('vendordetails', {
            vendor_number: '0000000599',
            vendor_source_system_id: 1001
        });
        expect(Ctrl.navigateToVendorDetail).toHaveBeenCalled();
    });

    it('should call uiGridSelectedRows', function() {
        $rootScope.$broadcast('uiGridSelectedRows');
    });

    it('should call getGridData ', function() {
        Ctrl.getGridData();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        expect(Ctrl3.changeVendorAssociation).toEqual(gridApi.grid.appScope.changeVendorAssociation);
        expect(Ctrl3.showVendorMappingHistory).toEqual(gridApi.grid.appScope.showVendorMappingHistory);
        expect(Ctrl3.navigateToVendorDetail).toEqual(gridApi.grid.appScope.navigateToVendorDetail);
    });

    it('should ediPayStatusFilter with 1', function () {
        var value = 1, result;
        result = $filter('ediPayStatusFilter')(value);
        expect(result).toEqual(true);
    });

    it('should ediPayStatusFilter with 0', function () {
        var value = 0, result;
        result = $filter('ediPayStatusFilter')(value);
        expect(result).toEqual(false);
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

    it('should call getVendorMappingData with result', inject(function ($q, $rootScope) {
        var vendorResponse;
        var deferred = $q.defer();

        callWith = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","vendor_name":"11889","vendor_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"vendor_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","vendor_name":"11889","vendor_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"vendor_source_system_id":1001}],"error":"{}"};

        var promise = mockVendorService.getVendorMappingData();

        promise.then(function (response) {
            if (response === "error") {
                Ctrl.gridOptions.data = [];
                Ctrl.gridOptions.totalItems = '';
                mockUtils.stopBlockUI();
            } else {
                vendorResponse = response;
                Ctrl.gridOptions.data = vendorResponse;
            }
        }, function(error) {
            mockUtils.stopBlockUI();
        });

        expect(vendorResponse).toBeUndefined();
        deferred.resolve(callWith);
        expect(vendorResponse).toBeUndefined()

        $rootScope.$apply();
        expect(vendorResponse).toEqual(callWith);

    }));

 //    it('should call getVendorMappingData with response error', inject(function ($timeout) {
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

    /*it('should call getVendorMappingHistoryData with error', function () {
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
