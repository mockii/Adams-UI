

'use strict';

describe('AddOrEditStationsMappingController', function() {
    var Ctrl,
        Ctrl2,
        Ctrl3,
        Ctrl4,
        Ctrl5,
        Ctrl6,
        $scope,
        $state,
        CompassToastr,
        stationsData,
        stationsData1,
        stationRowData,
        adamsConstants,
        logService = {},
        mockModalDialogService,
        addEligibleCostCenterData,
        costCenters,
        addCostCenterMappingPromiseReponse,
        action,
        vendorData,
        mockLocationsCostCenterMappingService = {},
        mockLocationsStationsMappingService = {},
        mockLocationsStationsMappingService2 = {},
        mockLocationsStationsMappingService3 = {},
        mockLocationsStationsMappingService4 = {},
        mockLocationsStationsMappingService5 = {},
        mockLocationsStationsMappingService6 = {},
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
    beforeEach(module('adams.locations.add.stations.mapping.controller'));
    beforeEach(module('adams.locations.stations.service'));
    beforeEach(module('adams.locations.costcenters.service'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.utils'));

    beforeEach(function() {
        module(function ($provide) {
            $provide.value('LocationsStationsMappingService', mockLocationsStationsMappingService);
            $provide.value('LocationsStationsMappingService', mockLocationsStationsMappingService2);
            $provide.value('LocationsStationsMappingService', mockLocationsStationsMappingService3);
            $provide.value('LocationsCostCenterMappingService', mockLocationsCostCenterMappingService);
              /*$provide.value('LocationsStationsMappingService', mockLocationsStationsMappingService4);
            $provide.value('LocationsStationsMappingService', mockLocationsStationsMappingService5);
            $provide.value('LocationsStationsMappingService', mockLocationsStationsMappingService6);*/
            $provide.value('STGLogService', logService);
            $provide.value('Utils', mockUtils);
        });
    });


    beforeEach(inject(function($controller, _$rootScope_, _$httpBackend_, _$timeout_, LocationsStationsMappingService, _$q_, ADAMS_URL_SPACE, ADAMS_CONSTANTS, CompassToastr, Utils, STGLogService, $log){
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
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
                getSelectedRows: function(){return {length: 0}}
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

        mockLocationsCostCenterMappingService.getCostCentersByLocationCode = function(limit, page, sort, search) {
            var deferred = $q.defer();
            deferred.resolve({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"cost_center_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"cost_center_source_system_id":1001}],"error":"{}"});
            return deferred.promise;
        };

        mockLocationsStationsMappingService.getStations = function(limit, page, sort, search) {
            var deferred = $q.defer();
            deferred.resolve({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"cost_center_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"cost_center_source_system_id":1001}],"error":"{}"});
            return deferred.promise;
        };

        mockLocationsStationsMappingService2.getStations = function(limit, page, sort, vendorNumber, vendorSourceSystemId) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockLocationsStationsMappingService3.getStations = function(limit, page, sort, vendorNumber, vendorSourceSystemId) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockLocationsStationsMappingService.addStationsByLocationCode = function(locationCode, costCentersData) {
            var deferred = $q.defer();
            deferred.resolve({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"cost_center_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"cost_center_source_system_id":1001}],"error":"{}"});
            return deferred.promise;
        };

        mockLocationsStationsMappingService2.addStationsByLocationCode = function(locationCode, costCentersData) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockLocationsStationsMappingService3.addStationsByLocationCode = function(locationCode, costCentersData) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        stationsData = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"OK","resultCount":"1"},"stationsGridData":[{"station_code":"10000","station_name":"test1Station1","station_description":null,"cost_center_name":"0002501113","cost_center_description":"$$BOS EAST EURO BAR","source_system_id":1001,"location_cost_center_station_map_status":true,"created_by":null,"created_date":null,"modified_by":null,"modified_date":null}],"error":[]};
        stationsData1 = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"OK","resultCount":"1"},"stationsGridData":[{"station_code":"10000","station_name":"test1Station1","station_description":null,"cost_center_name":"0001001113","cost_center_description":"$$BOS EAST EURO BAR","source_system_id":1001,"location_cost_center_station_map_status":true,"created_by":null,"created_date":null,"modified_by":null,"modified_date":null}],"error":[]};

        stationRowData = {"station_code":"10000","station_name":"test1Station1","station_description":null,"cost_center_name":"0001001113","cost_center_description":"$$BOS EAST EURO BAR","source_system_id":1008,"location_cost_center_station_map_status":true,"created_by":null,"created_date":null,"modified_by":null,"modified_date":null};

        Ctrl = $controller('AddOrEditStationsMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, $timeout: _$timeout_, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, addEligibleCostCenterData: addEligibleCostCenterData, LocationsStationsMappingService: mockLocationsStationsMappingService, LocationsCostCenterMappingService: mockLocationsCostCenterMappingService, Utils: mockUtils, mockModal: mockModal, stationsData: stationsData});
        Ctrl2 = $controller('AddOrEditStationsMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, $timeout: _$timeout_, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, addEligibleCostCenterData: addEligibleCostCenterData, LocationsStationsMappingService: mockLocationsStationsMappingService2, LocationsCostCenterMappingService: mockLocationsCostCenterMappingService, Utils: mockUtils, mockModal: mockModal, stationsData: stationsData1});
        Ctrl3 = $controller('AddOrEditStationsMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, $timeout: _$timeout_, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService, addEligibleCostCenterData: addEligibleCostCenterData, LocationsStationsMappingService: mockLocationsStationsMappingService3, LocationsCostCenterMappingService: mockLocationsCostCenterMappingService, Utils: mockUtils, mockModal: mockModal, stationsData: stationsData});
    }));

    it('should initialize the AddOrEditStationsMappingController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

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

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
    });

    it('should call uiGridSelectedRows', function() {
        Ctrl.costCenters = [{"cost_center_name":"10117","cost_center_description":"$$$Northwest Misc Fo","compliance":"Selected","cost_center_source_system_id":"1001","vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"vendor_source_system_id":"1008","created_by":"batchadmin","created_date":"1382569567570","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00TI"}];
        Ctrl.stationRefId = "stationMappingSelection";
        Ctrl.costCenterRefId  = "costCenterMappingSelection";
        $rootScope.$broadcast('uiGridSelectedRows', mySelectedRows, {}, "stationMappingSelection");
    });

    it('should call uiGridSelectedRows', function() {
        Ctrl.costCenters = [{"cost_center_name":"10117","cost_center_description":"$$$Northwest Misc Fo","compliance":"Selected","cost_center_source_system_id":"1001","vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"vendor_source_system_id":"1008","created_by":"batchadmin","created_date":"1382569567570","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00TI"}];
        Ctrl.stationRefId = "";
        Ctrl.costCenterRefId  = "";
        $rootScope.$broadcast('uiGridSelectedRows', [null], {}, "stationMappingSelection");
    });

    it('should call uiGridSelectedRows', function() {
        Ctrl.costCenters = [{"cost_center_name":"10117","cost_center_description":"$$$Northwest Misc Fo","compliance":"Selected","cost_center_source_system_id":"1001","vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"vendor_source_system_id":"1008","created_by":"batchadmin","created_date":"1382569567570","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00TI"}];
        Ctrl.stationRefId = "";
        Ctrl.costCenterRefId  = "";
        $rootScope.$broadcast('uiGridSelectedRows', [null], {}, "costCenterMappingSelection");
    });

    it('should call uiGridSelectedRows', function() {
        Ctrl.costCenters = [{"cost_center_name":"10116","cost_center_description":"$$$Northwest Misc Fo","compliance":"Selected","cost_center_source_system_id":"1001","vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"vendor_source_system_id":"1008","created_by":"batchadmin","created_date":"1382569567570","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00TI"}];
        $rootScope.$broadcast('uiGridSelectedRows', mySelectedRows, null);
    });

    it('should call uiGridSelectedRows - if', function() {
        Ctrl.costCenters = [{"cost_center_name":"10116","cost_center_description":"$$$Northwest Misc Fo","compliance":"Selected","cost_center_source_system_id":"1001","vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"vendor_source_system_id":"1008","created_by":"batchadmin","created_date":"1382569567570","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00TI"}];
        Ctrl.lastSelectedStation = stationRowData;
        Ctrl.lastSelectedCostCenter = costCenters[0];
        Ctrl.stationRefId = "something";
        Ctrl.costCenterRefId  = "nothing";
        $rootScope.$broadcast('uiGridSelectedRows', mySelectedRows, null);
    });

    it('should call uiGridSelectedRows - else', function() {
        Ctrl2.costCenters = [{"cost_center_name":"10116","cost_center_description":"$$$Northwest Misc Fo","compliance":"Selected","cost_center_source_system_id":"1001","vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"vendor_source_system_id":"1008","created_by":"batchadmin","created_date":"1382569567570","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00TI"}];
        Ctrl2.lastSelectedStation = stationRowData;
        Ctrl2.lastSelectedCostCenter = costCenters[0];
        Ctrl2.stationRefId = "something";
        Ctrl2.costCenterRefId  = "nothing";
        $rootScope.$broadcast('uiGridSelectedRows', mySelectedRows, null);
    });

    it('should call uiGridSelectedRows with isSelected', function() {
        mySelectedRows = [{"isSelected": true, "cost_center_name":"10117","cost_center_description":"$$$Northwest Misc Fo","compliance":"Selected","cost_center_source_system_id":"1001","vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"vendor_source_system_id":"1008","created_by":"batchadmin","created_date":"1382569567570","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00TI"}];
        $rootScope.$broadcast('uiGridSelectedRows', mySelectedRows, null);
    });

    it('should call getStationsGridData ', function() {
        spyOn(Ctrl, "getStationsGridData").and.callThrough();
        Ctrl.getStationsGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getStationsGridData).toHaveBeenCalled();
    });

    it('should call getStationsGridData ', function() {
        spyOn(Ctrl, "getCostCentersGridData").and.callThrough();
        Ctrl.getCostCentersGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getCostCentersGridData).toHaveBeenCalled();
    });


    it('should call select with response', function () {
        Ctrl.selectedCostCenters = costCenters;
        spyOn(Ctrl, "select").and.callThrough();
        Ctrl.select();
        $scope.$apply();
        expect(Ctrl.select).toHaveBeenCalled();
    });

    it('should call select with response error', inject(function ($timeout) {
        Ctrl2.selectedCostCenters = costCenters;
        spyOn(Ctrl2, "select").and.callThrough();
        Ctrl2.select();
        $scope.$apply();
        expect(Ctrl2.select).toHaveBeenCalled();
    }));

    it('should call select and throw error', function () {
        spyOn(Ctrl3, "select").and.callThrough();
        Ctrl3.selectedCostCenters = costCenters;
        Ctrl3.select();
        $scope.$apply();
        expect(Ctrl3.select).toHaveBeenCalled();
    });
});
