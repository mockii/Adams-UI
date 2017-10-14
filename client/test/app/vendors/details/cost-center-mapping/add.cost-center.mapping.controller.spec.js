

'use strict';

describe('AddCostCenterMappingController', function() {
    var Ctrl,
        Ctrl2,
        Ctrl3,
        Ctrl4,
        Ctrl5,
        Ctrl6,
        $scope,
        $state,
        CompassToastr,
        adamsConstants,
        logService = {},
        mockModalDialogService,
        addEligibleCostCenterData,
        costCenters,
        addCostCenterMappingPromiseReponse,
        action,
        vendorData,
        costCenterMappingService,
        mockCostCenterMappingService = {},
        mockCostCenterMappingService2 = {},
        mockCostCenterMappingService3 = {},
        mockCostCenterMappingService4 = {},
        mockCostCenterMappingService5 = {},
        mockCostCenterMappingService6 = {},
        $rootScope,
        $httpBackend,
        $q,
        $uibModalInstance,
        mockModal,
        mockUtils = {},
        $utils,
        gridOptions,
        gridApi,
        gridApi1,
        mySelectedRows,
        lastSelectedRow,
        action,
        compassToastr,
        templateHtml,
        formElem,
        $timeout,
        form,
        urlSpace;

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.cost.center.mapping.service'));
    beforeEach(module('adams.add.cost.center.mapping.controller'));
    beforeEach(module('adams.cost.center.mapping.controller'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.utils'));

    beforeEach(function() {
        module(function ($provide) {
            $provide.value('CostCenterMappingService', mockCostCenterMappingService);
            $provide.value('CostCenterMappingService', mockCostCenterMappingService2);
            $provide.value('CostCenterMappingService', mockCostCenterMappingService3);
              /*$provide.value('CostCenterMappingService', mockCostCenterMappingService4);
            $provide.value('CostCenterMappingService', mockCostCenterMappingService5);
            $provide.value('CostCenterMappingService', mockCostCenterMappingService6);*/
            $provide.value('STGLogService', logService);
            $provide.value('Utils', mockUtils);
        });
    });


    beforeEach(inject(function($controller, _$rootScope_, _$httpBackend_, _$timeout_, CostCenterMappingService, _$q_, ADAMS_URL_SPACE, ADAMS_CONSTANTS, CompassToastr, Utils, STGLogService, $log){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        costCenterMappingService = CostCenterMappingService;
        logService = STGLogService;
        $q = _$q_;
        compassToastr = CompassToastr;
        adamsConstants = ADAMS_CONSTANTS;
        urlSpace  = ADAMS_URL_SPACE;
        $utils = Utils;
        $timeout = _$timeout_;

        vendorData = {"vendorNumber":"10016000","vendorSourceSystemId":"1001"};
        addEligibleCostCenterData = {"vendorNumber":"10016002","vendorSourceSystemId":"1001"};
        costCenters = [{"cost_center_name":"0002501113","cost_center_description":"COS TEQUILA RIA BAR","compliance":"Exception","source_system_id":1001,"vendor_market_team_name":"101638","vendor_market_team_description":"0002501113","created_by":"SYSTEM","created_date":"10-25-2016 19:17","modified_by":"BATCHADM","modified_date":"10-25-2016 19:17","$$hashKey":"uiGrid-00TY"}];
        addCostCenterMappingPromiseReponse = {"data":{"metadata":{"version":"1.0","status":"success!","http_status_code":"200","resultCount":"0"},"data":["Success"],"error":"{}"},"status":200,"config":{"method":"POST","transformRequest":[null],"transformResponse":[null],"url":"/ui/api/vendors/102198/costCenters?vendorSourceSystemId=1001","data":{"costCenters":[{"cost_center_name":"0002501113","source_system_id":1001}]},"headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8","Authorization":"Bearer TGT-144-30iwt2IpxbfmbYZejZeMFScP41cdkwlFumrjaqtnBLj3i3QtE1-cgldwas0184"}},"statusText":"OK"};
        mySelectedRows = [{"cost_center_name":"10117","cost_center_description":"$$$Northwest Misc Fo","compliance":"Selected","cost_center_source_system_id":"1001","vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"vendor_source_system_id":"1008","created_by":"batchadmin","created_date":"1382569567570","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00TI"}];

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
            },
            confirm: function( errorMessage ) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

        mockModal = {
             close: jasmine.createSpy('mockModal.close'),
             dismiss: jasmine.createSpy('mockModal.dismiss'),
             open: jasmine.createSpy('mockModal.open'),
             result: {
                then: jasmine.createSpy('mockModal.result.then')
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
            selection: {
                clearSelectedRows: function(){},
                getSelectedRows: function(){return []}
            }
        };

        gridApi1 = {
            selection: {
                clearSelectedRows: function(){},
                getSelectedRows: function(){return [{"cost_center_name":"0002501113","cost_center_description":"COS TEQUILA RIA BAR","compliance":"Exception","source_system_id":1001,"vendor_market_team_name":"101638","vendor_market_team_description":"0002501113","created_by":"SYSTEM","created_date":"10-25-2016 19:17","modified_by":"BATCHADM","modified_date":"10-25-2016 19:17","$$hashKey":"uiGrid-00TY"}]}
            }
        };

        lastSelectedRow = {
            isSelected: false
        };

        mockCostCenterMappingService.getEligibleCostCenterData = function(limit, page, sort, vendorNumber, vendorSourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"cost_center_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"cost_center_source_system_id":1001}],"error":"{}"});
            return deferred.promise;
        };

        mockCostCenterMappingService2.getEligibleCostCenterData = function(limit, page, sort, vendorNumber, vendorSourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockCostCenterMappingService3.getEligibleCostCenterData = function(limit, page, sort, vendorNumber, vendorSourceSystemId) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockCostCenterMappingService.addCostCenterMapping = function(vendorNumber, vendorSourceSystemId, costCentersData) {
            var deferred = $q.defer();
            deferred.resolve({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"cost_center_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"cost_center_source_system_id":1001}],"error":"{}"});
            return deferred.promise;
        };

        mockCostCenterMappingService2.addCostCenterMapping = function(vendorNumber, vendorSourceSystemId, costCentersData) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockCostCenterMappingService3.addCostCenterMapping = function(vendorNumber, vendorSourceSystemId, costCentersData) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };


        Ctrl = $controller('AddCostCenterMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, $timeout: _$timeout_, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, addEligibleCostCenterData: addEligibleCostCenterData, CostCenterMappingService: mockCostCenterMappingService, Utils: mockUtils, mockModal: mockModal});
        Ctrl2 = $controller('AddCostCenterMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, $timeout: _$timeout_, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, addEligibleCostCenterData: addEligibleCostCenterData, CostCenterMappingService: mockCostCenterMappingService2, Utils: mockUtils, mockModal: mockModal});
        Ctrl3 = $controller('AddCostCenterMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, $timeout: _$timeout_, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, addEligibleCostCenterData: addEligibleCostCenterData, CostCenterMappingService: mockCostCenterMappingService3, Utils: mockUtils, mockModal: mockModal});
    }));

    it('should initialize the AddCostCenterMappingController properly', function () {
        expect(Ctrl).not.toBeUndefined();
        //expect(function () {throw new Error("An error occurred while getting eligible cost center  data")}).toThrow("An error occurred while getting eligible cost center  data");
        // expect(Ctrl.select).toThrow(new Error("An error occurred while getting eligible cost center  data"));
        //expect(function() {Ctrl.select()}).toThrowError("An error occurred while getting eligible cost center  data");
        //expect(function() {mockCostCenterMappingService3.getEligibleCostCenterData()}).toThrowError("An error occurred while getting eligible cost center  data");
        //expect(function() {mockCostCenterMappingService3.addCostCenterMapping()}).toThrowError("An error occurred while adding eligible cost center mapping data");
    });

   it('should verify the Grid Option Pagination Page Size', function () {
        expect(Ctrl.gridOptions.paginationPageSize).toEqual(25);
    });

    /*it('should be equal to totalItems ', function () {
        expect(Ctrl.gridOptions.totalItems).toEqual(40000);
    });

    it('should be equal to paginationPageSize ', function () {
        expect(Ctrl.gridOptions.paginationPageSize).toEqual(25);
    });

    it('should have 3 paginationPageSizes ', function () {
        expect(Ctrl.gridOptions.paginationPageSizes.length).toEqual(3);
    });*/

    it('should call select with response', function () {
        Ctrl.costCenters = costCenters;
        spyOn(Ctrl, "select").and.callThrough();
        Ctrl.select();
        $scope.$apply();
        expect(Ctrl.select).toHaveBeenCalled();
        // expect(function() {mockCostCenterMappingService.getEligibleCostCenterData()}).toThrowError("An error occurred while getting eligible cost center  data");
    });

    it('should call select with response error', inject(function ($timeout) {
        spyOn(Ctrl2, "errorHandling").and.returnValue({});

        Ctrl2.costCenters = costCenters;
        spyOn(Ctrl2, "select").and.callThrough();
        // flush timeout(s) for all code under test.
        $timeout.flush(500);
        $timeout.flush(500);
        Ctrl2.select();
        $timeout.flush();
        mockUtils.stopBlockUI();

        // this will throw an exception if there are any pending timeouts.
        $timeout.verifyNoPendingTasks();
        $scope.$apply();
        expect(Ctrl2.select).toHaveBeenCalled();
    }));

     it('should call select and throw error', function () {
        Ctrl3.costCenters = costCenters;
        spyOn(Ctrl3, "select").and.callThrough();
        Ctrl3.select();
        mockUtils.stopBlockUI();
        $scope.$apply();
        expect(Ctrl3.select).toHaveBeenCalled();
        // expect(function(){ throw "An error occurred while adding eligible cost center mapping data"}).toThrow("An error occurred while adding eligible cost center mapping data");
        // expect(function(){ throw "An error occurred while getting eligible cost center  data"}).toThrow("An error occurred while getting eligible cost center  data");
    });

    /*it('should call select with response and throw error ', inject(function ($q, $rootScope, $controller) {
        mockCostCenterMappingService3.addCostCenterMapping = function(vendorNumber, vendorSourceSystemId, costCentersData) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        Ctrl3 = $controller('AddCostCenterMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, $timeout: $timeout, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, addEligibleCostCenterData: addEligibleCostCenterData, CostCenterMappingService: mockCostCenterMappingService3, Utils: mockUtils, mockModal: mockModal});
        var addCostCenterMappingResponse;
        var deferred = $q.defer();
        Ctrl3.costCenters = costCenters;
        spyOn(Ctrl3, 'select').and.callThrough();
        Ctrl3.select();
        mockUtils.stopBlockUI();
        $scope.$apply();
        expect(Ctrl3.select).toHaveBeenCalled();

        var addCostCenterMappingPromise = mockCostCenterMappingService.addCostCenterMapping(vendorData.vendorNumber, vendorData.vendorSourceSystemId, costCenters);

        addCostCenterMappingPromise.then(function(response) {

        }, function(error) {
            expect(function(){ throw "An error occurred while adding eligible cost center mapping data"}).toThrow("An error occurred while adding eligible cost center mapping data");
        });

        expect(addCostCenterMappingResponse).toBeUndefined();
        deferred.reject({});
        expect(addCostCenterMappingResponse).toBeUndefined();

        $rootScope.$apply();
        expect(addCostCenterMappingResponse).toBeUndefined();
    }));*/







    it('should dismiss the modal with result "dismiss" when dismissed', function () {
        Ctrl.close($uibModalInstance.dismiss('cancel'));
        expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

    it('should call errorHandling', function () {
        spyOn(Ctrl, "errorHandling").and.callThrough();
        Ctrl.errorHandling('error');
        $scope.$apply();
        expect(Ctrl.errorHandling).toHaveBeenCalledWith('error');
    });

    /*it('should call close', function () {
        spyOn(Ctrl, "close").and.callThrough();
        Ctrl.close();
        $scope.$apply();
        expect(Ctrl.close).toHaveBeenCalled();
    });*/

    it('should call costCenterIndex', function () {
        Ctrl.gridApi = gridApi;
        spyOn(Ctrl, "costCenterIndex").and.callThrough();
        Ctrl.costCenterIndex(0);
        $scope.$apply();
        expect(Ctrl.costCenterIndex).toHaveBeenCalledWith(0);
    });

    it('should call costCenterIndex and call lastSelectedRow ', function () {
        Ctrl.gridApi = gridApi1;
        Ctrl.costCenters = costCenters;
        Ctrl.lastSelectedRow = lastSelectedRow;
        spyOn(Ctrl, "costCenterIndex").and.callThrough();
        Ctrl.costCenterIndex(0);
        $scope.$apply();
        expect(Ctrl.costCenterIndex).toHaveBeenCalledWith(0);
        expect(Ctrl.lastSelectedRow.isSelected).toEqual(false);
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
    });

    it('should call uiGridSelectedRows', function() {
        Ctrl.costCenters = [{"cost_center_name":"10117","cost_center_description":"$$$Northwest Misc Fo","compliance":"Selected","cost_center_source_system_id":"1001","vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"vendor_source_system_id":"1008","created_by":"batchadmin","created_date":"1382569567570","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00TI"}];
        $rootScope.$broadcast('uiGridSelectedRows', mySelectedRows, null);
    });

    it('should call uiGridSelectedRows with isSelected', function() {
        mySelectedRows = [{"isSelected": true, "cost_center_name":"10117","cost_center_description":"$$$Northwest Misc Fo","compliance":"Selected","cost_center_source_system_id":"1001","vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"vendor_source_system_id":"1008","created_by":"batchadmin","created_date":"1382569567570","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00TI"}];
        $rootScope.$broadcast('uiGridSelectedRows', mySelectedRows, null);
    });

    it('should call getGridData ', function() {
        Ctrl.getGridData();
    });
})
