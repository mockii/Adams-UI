
'use strict';

describe('CostCenterMappingHistoryController', function() {
    var Ctrl,
        Ctrl2,
        // Ctrl3,
        $scope,
        $state,
        CompassToastr,
        adamsConstants,
        mockModalDialogService,
        action,
        vendorData,
        CostCenterMappingService,
        $rootScope,
        $httpBackend,
        $q,
        $uibModal,
        mockCostCenterService = {},
        mockCostCenterService2 = {},
        // mockCostCenterService3 = {},
        $filter,
        mockModal,
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
        $state,
        $compile,
        $timeout,
        callWith = {},
        gridApi,
        gridOptions,
        urlSpace;

    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.cost.center.mapping.service'));
    beforeEach(module('adams.cost.center.mapping.history.controller'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));


    beforeEach(function() {
        module(function ($provide) {
            $provide.value('CostCenterMappingService', mockCostCenterService);
            $provide.value('Utils', mockUtils);
        });
    });

    beforeEach(inject(function($controller, $state, _$compile_, _$rootScope_, _$httpBackend_, _$uibModal_, _$filter_, _$timeout_, CostCenterMappingService, _$q_, ADAMS_URL_SPACE, ADAMS_CONSTANTS, CompassToastr, Utils){

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        sampleSvcObj = CostCenterMappingService;
        $q = _$q_;
        compassToastr = CompassToastr;
        adamsConstants = ADAMS_CONSTANTS;
        urlSpace  = ADAMS_URL_SPACE;
        $utils = Utils;
        $uibModal = _$uibModal_;
        $filter = _$filter_;
        $timeout = _$timeout_;
        $state = $state;
        $compile = _$compile_;

        $state.params ={"vendor_number":"10016011","source_system_id":"1008","vendorSearchData":{"vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"address":"PO BOX 841918","city":"DALLAS","state":"TX","zipcode":"75284","country":null,"telephone_number_1":null,"telephone_number_2":null,"fax_number":null,"category_code":"2205","category_description":"Beverage, Carbonated               ","model_market_classification":null,"extraneous":null,"excluded":0,"diversity_code":"          ","district":null,"train_station":null,"industry_key":null,"parent_record_created_date":null,"parent_record_created_by":null,"child_record_created_date":null,"child_record_created_by":null,"account_group":null,"account_number_alt_payee":null,"master_record_delete_flag":null,"tax_1":null,"tax_2":null,"one_time_account_ind":null,"training_partner_id":null,"business_type":null,"telebox":null,"personnel_number":null,"group_key":null,"central_posting_block":false,"imposed_purchase_block":false,"payment_block":false,"company_code_posting_block":false,"tax_jurisdiction":null,"company_code":null,"customer_number":null,"terms_payment_key":null,"account_number":null,"clerk":null,"consolidation_code":null,"consolidation_description":null,"nominated_code":null,"nominated_description":null,"source_system_id":1008,"created_by":"BATCHADM","created_date":"10-26-2016 20:55","modified_by":"BATCHADM","modified_date":"10-31-2016 13:31"},"costCenterMappingData":null};

        costCenterRowData = {"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","compliance":null,"edi_pay_status":null,"edi_live_date":null,"associated":false,"associated_by":"CHOUHR01","associated_date":null,"disassociated_by":null,"disassociated_date":"12-14-2016 20:39","disassociation_reason":"sdgfdg","vendor_source_system_id":1001,"cost_center_source_system_id":1001,"created_by":"ChouhR01","created_date":"12-14-2016 20:30","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00SC"};

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

        mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss'),
            open: jasmine.createSpy('mockModal.open'),
            result: {
                then: jasmine.createSpy('mockModal.result.then')
            }
        };

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
                }
            }
        };

        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

        mockCostCenterService.getCostCenterMappingHistoryData = function(limit, page, sort, gridSearchParams, costCenterRowData) {
            var deferred = $q.defer();
            deferred.resolve(callWith);
            return deferred.promise;
        };

        mockCostCenterService2.getCostCenterMappingHistoryData = function(limit, page, sort, gridSearchParams, costCenterRowData) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        /*mockCostCenterService3.getCostCenterMappingHistoryData = function(limit, page, sort, gridSearchParams, costCenterRowData) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };*/

        Ctrl = $controller('CostCenterMappingHistoryController', { $scope: $scope, $state: $state, $timeout:$timeout, costCenterRowData: costCenterRowData, $uibModalInstance: $uibModalInstance, $uibModal: $uibModal, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, CostCenterMappingService: mockCostCenterService, Utils: mockUtils,  mockModal: mockModal});

        Ctrl2 = $controller('CostCenterMappingHistoryController', { $scope: $scope, $state: $state, $timeout:$timeout, costCenterRowData: costCenterRowData, $uibModalInstance: $uibModalInstance, $uibModal: $uibModal, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, CostCenterMappingService: mockCostCenterService2, Utils: mockUtils,  mockModal: mockModal});

        // Ctrl3 = $controller('CostCenterMappingHistoryController', { $scope: $scope, $state: $state, $timeout:$timeout, costCenterRowData: costCenterRowData, $uibModalInstance: $uibModalInstance, $uibModal: $uibModal, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, CostCenterMappingService: mockCostCenterService3, Utils: mockUtils,  mockModal: mockModal});
    }));

    it('should initialize the CostCenterMappingHistoryController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    /*it('should verify the Grid Option Pagination Page Size', function () {
        expect(Ctrl.gridOptions.paginationPageSize).toEqual(25);
    });

    it('should be equal to totalItems ', function () {
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

    it('should dismiss the modal with result "dismiss" when dismissed', function () {
        Ctrl.close($uibModalInstance.dismiss('cancel'));
        expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });


    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
    });

    it('should call uiGridSelectedRows', function() {
        $rootScope.$broadcast('uiGridSelectedRows');
    });

    it('should call getGridData ', function() {
        Ctrl.getGridData();
    });

    /*it('should call getCostCenterMappingHistoryData with result', inject(function () {
        var costCenterResponse;
        var deferred = $q.defer();

        callWith = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"cost_center_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"cost_center_source_system_id":1001}],"error":"{}"};

        var promise = mockCostCenterService.getCostCenterMappingHistoryData();

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
        //expect(costCenterResponse).toBeUndefined()

        $scope.$apply();
        expect(Ctrl.gridOptions.data).toEqual(callWith);

    }));*/

    /*it('should call getCostCenterMappingHistoryData with response error', function () {
        //$scope.$apply();
        expect(Ctrl2.gridOptions.data).toEqual([]);
        expect(Ctrl2.gridOptions.totalItems).toEqual(40000);

        // flush timeout(s) for all code under test.

        $timeout.flush();
        $timeout.flush(500);

        // this will throw an exception if there are any pending timeouts.
        $timeout.verifyNoPendingTasks();
        expect(Ctrl2.errorMessage).toEqual('An error occurred while getting cost center history mapping data');
        spyOn(Ctrl2, 'errorHandling').and.callThrough();
        Ctrl2.errorHandling('An error occurred while getting cost center history mapping data');
        expect(Ctrl2.errorHandling).toHaveBeenCalledWith('An error occurred while getting cost center history mapping data');
        // expect(Ctrl2.errorHandling).toHaveBeenCalledWith('An error occurred while getting cost center history mapping data');
    });*/

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
