/**
 * Created by RegonS01 on 10/5/2016.
 */
'use strict';

describe('CostCenterSearchController', function() {
    var Ctrl,
        Ctrl2,
        Ctrl3,
        costCenterSearchService,
        $rootScope,
        $scope,
        $window,
        $interval,
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
        costCenterSearchData,
        adamsConstants,
        mockCostCenterSearchService = {},
        mockCostCenterSearchService2 = {},
        mockCostCenterSearchService3 = {},
        mockUtils = {},
        $q,
        $httpBackend,
        mockModalDialogService,
        mockModal,
        $timeout,
        $utils,
        statesService = {},
        gridApi,
        gridOptions,
        $state;

    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.costcenter.search.service'));
    beforeEach(module('adams.costcenter.search.controller'));
    beforeEach(module('adams.costcenter.details.controller'));
    beforeEach(module('adams.costcenter.account.details.controller'));
    beforeEach(module('adams.costcenter.details.service'));
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
            $provide.value('CostCenterSearchService', mockCostCenterSearchService);
            $provide.value('CostCenterSearchService', mockCostCenterSearchService2);
            $provide.value('CostCenterSearchService', mockCostCenterSearchService3);
            $provide.value('StgStatesService', statesService);
            $provide.value('Utils', mockUtils);
        });
    });

    beforeEach(inject(function ($controller, _$rootScope_, _$window_, _$interval_, $timeout, CostCenterSearchService, ADAMS_CONSTANTS, _$q_, _$httpBackend_, Utils) {
               $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;

        $timeout = $timeout;
        userName = 'VASIRU01';

        adamsConstants = ADAMS_CONSTANTS;
        costCenterSearchService = CostCenterSearchService;

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
        costCenterSearchData = {
            "metadata": {
                "version": "1.0.0",
                "status": "Success",
                "http_status_code": "OK",
                "resultCount": "41320"
            },
            "data": [{
                "sector": "G00000",
                "division": "GF0000",
                "region": "GF9000",
                "complex": "C-100",
                "cost_center": "100",
                "cost_center_description": "C&S Vending",
                "source_system_id": "1001"
            }, {
                "sector": "L00000",
                "division": "LK0000",
                "region": "LK9000",
                "complex": "C-1000",
                "cost_center": "1000",
                "cost_center_description": "$$$3M Company         *",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FA0000",
                "region": "FAT000",
                "complex": "C-10000",
                "cost_center": "10000",
                "cost_center_description": "$$Camp Cherokee",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FT0000",
                "region": "FTP000",
                "complex": "C-10001",
                "cost_center": "10001",
                "cost_center_description": "$$$IMFT",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKB000",
                "complex": "C-10002",
                "cost_center": "10002",
                "cost_center_description": "Carlisle *",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKS000",
                "complex": "C-10003",
                "cost_center": "10003",
                "cost_center_description": "$$Camp Constantin *",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKS000",
                "complex": "C-10003",
                "cost_center": "10003",
                "cost_center_description": "$$Camp Constantin *",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKS000",
                "complex": "C-10004",
                "cost_center": "10004",
                "cost_center_description": "$$Camp James Ray *",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKS000",
                "complex": "C-10004",
                "cost_center": "10004",
                "cost_center_description": "$$Camp James Ray *",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FW0000",
                "region": "FWT000",
                "complex": "C-10005",
                "cost_center": "10005",
                "cost_center_description": "$$ACT *",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "F90000",
                "region": "F99000",
                "complex": "C-10006",
                "cost_center": "10006",
                "cost_center_description": "$$$Toyota Financial S",
                "source_system_id": "1001"
            }, {
                "sector": "E00000",
                "division": "ED0000",
                "region": "EDJ000",
                "complex": "C-10007",
                "cost_center": "10007",
                "cost_center_description": "Fay J Lindner *",
                "source_system_id": "1001"
            }, {
                "sector": "C00000",
                "division": "CK0000",
                "region": "CKN000",
                "complex": "C-10008",
                "cost_center": "10008",
                "cost_center_description": "$$Holyoke Public Schools",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FT0000",
                "region": "FTT000",
                "complex": "C-10009",
                "cost_center": "10009",
                "cost_center_description": "$$$Dell Comps Eastgate",
                "source_system_id": "1001"
            }, {
                "sector": "L00000",
                "division": "L90000",
                "region": "L99000",
                "complex": "C-1001",
                "cost_center": "1001",
                "cost_center_description": "$$$ AC Nielsen*",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FT0000",
                "region": "FTT000",
                "complex": "C-10010",
                "cost_center": "10010",
                "cost_center_description": "$$Dell Computers AM1",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "FT0000",
                "region": "FTT000",
                "complex": "C-10011",
                "cost_center": "10011",
                "cost_center_description": "Dell Computers AO1",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "F90000",
                "region": "F99000",
                "complex": "C-10012",
                "cost_center": "10012",
                "cost_center_description": "$$$SBB&T",
                "source_system_id": "1001"
            }, {
                "sector": "L00000",
                "division": "L90000",
                "region": "L99000",
                "complex": "C-10013",
                "cost_center": "10013",
                "cost_center_description": "$$$MBNA NJ Daycar",
                "source_system_id": "1001"
            }, {
                "sector": "L00000",
                "division": "LK0000",
                "region": "LKK000",
                "complex": "C-2672",
                "cost_center": "10014",
                "cost_center_description": "Phila Eagles Catering *",
                "source_system_id": "1001"
            }, {
                "sector": "L00000",
                "division": "L90000",
                "region": "L99000",
                "complex": "C-10015",
                "cost_center": "10015",
                "cost_center_description": "$$$ Putnam Po Sq Coff",
                "source_system_id": "1001"
            }, {
                "sector": "F00000",
                "division": "F90000",
                "region": "F99000",
                "complex": "C-10016",
                "cost_center": "10016",
                "cost_center_description": "$$$IBM Burlington B6",
                "source_system_id": "1001"
            }, {
                "sector": "H00000",
                "division": "HC0000",
                "region": "HCS000",
                "complex": "C-10017",
                "cost_center": "10017",
                "cost_center_description": "$$$Cape Girardeau Commissary",
                "source_system_id": "1001"
            }, {
                "sector": "H00000",
                "division": "HC0000",
                "region": "HCE000",
                "complex": "C-10018",
                "cost_center": "10018",
                "cost_center_description": "$$$CSC Colo Co Juveni",
                "source_system_id": "1001"
            }, {
                "sector": "H00000",
                "division": "HC0000",
                "region": "HCE000",
                "complex": "C-10019",
                "cost_center": "10019",
                "cost_center_description": "$$$Virginia DJJ RDC *",
                "source_system_id": "1001"
            }],
            "error": "{}"
        };

        statesService.goToState = function(state, params){
            spyOn($state, 'go');
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

        mockModalDialogService.confirm = function(){
            var deferred = $q.defer();
            deferred.resolve({});
            deferred.promise.abort = function(){};
            //$scope.$apply();
            return deferred.promise;
        };

        mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss')
        };

        mockCostCenterSearchService.getAllCostCenterSearchDetails = function() {
            var deferred = $q.defer();
            deferred.resolve(costCenterSearchData);
            return deferred.promise;
        };

        mockCostCenterSearchService2.getAllCostCenterSearchDetails = function() {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockCostCenterSearchService3.getAllCostCenterSearchDetails = function() {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
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

        $state = { go: function() { return; }};

        Ctrl = $controller('CostCenterSearchController', {$scope: $scope, $state:$state, CostCenterSearchService: mockCostCenterSearchService, ADAMS_CONSTANTS: adamsConstants, $timeout:$timeout, ModalDialogService: mockModalDialogService, Utils: mockUtils, costCenterSearchData: costCenterSearchData, StgStatesService: statesService});
        //Ctrl2 = $controller('CostCenterSearchController', {$scope: $scope, $state:$state, CostCenterSearchService: mockCostCenterSearchService2, ADAMS_CONSTANTS: adamsConstants, $timeout:$timeout, ModalDialogService: mockModalDialogService, Utils: mockUtils, costCenterSearchData: costCenterSearchData});
        //Ctrl3 = $controller('CostCenterSearchController', {$scope: $scope, $state:$state, CostCenterSearchService: mockCostCenterSearchService3, ADAMS_CONSTANTS: adamsConstants, $timeout:$timeout, ModalDialogService: mockModalDialogService, Utils: mockUtils, costCenterSearchData: costCenterSearchData});
    }));

    it('should initialize the CostCenterSearchController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        expect(Ctrl.showCostCenterSearchData).toEqual(gridApi.grid.appScope.showCostCenterSearchData)
    });

    it('should call showCostCenterSearchData', function() {
        spyOn(statesService, 'goToState');
        spyOn(Ctrl, 'showCostCenterSearchData').and.callThrough();
        Ctrl.showCostCenterSearchData(costCenterSearchData);
        $scope.$apply();
        expect(statesService.goToState).toHaveBeenCalledWith('costcenterdetails', {
            costCenterSearchData: costCenterSearchData,
            costCenter_number: costCenterSearchData.cost_center,
            source_system_id: costCenterSearchData.source_system_id
        });
        expect(Ctrl.showCostCenterSearchData).toHaveBeenCalled();
    });

    it('should call uiGridSelectedRows', function() {
        $rootScope.$broadcast('uiGridSelectedRows');
    });

    it('should call getGridData ', function() {
        Ctrl.getGridData();
    });

    /*it('should verify the Grid Option Pagination Page Size', function () {
        expect(Ctrl.gridOptions.paginationPageSize).toEqual(25);
    });

    it('should call errorHandling', function () {
        spyOn(Ctrl, 'errorHandling');
        Ctrl.errorHandling('error');
        expect(Ctrl.errorHandling).toHaveBeenCalled();
    });*/

    /*it('should call showCostCenterSearchData ', inject(function () {
        // spyOn($scope, 'showCostCenterSearchData ').and.callThrough();
        // spyOn($state, 'go').and.callFake(function(state, params) {});
        $scope.showCostCenterSearchData();
        $scope.$apply();
        expect($state.go).toHaveBeenCalledWith('costcenterdetails', {});
        expect($scope.showCostCenterSearchData).toHaveBeenCalled();
    }));*/

    /*it('should call getAllCostCenterSearchDetails with result', inject(function ($q, $rootScope, $timeout) {
        var costCenterResponse;
        var deferred = $q.defer();

        var promise = mockCostCenterSearchService.getAllCostCenterSearchDetails();

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
        deferred.resolve(costCenterSearchData);
        expect(costCenterResponse).toBeUndefined()

        // flush timeout(s) for all code under test.
        $timeout.flush(500);
        // this will throw an exception if there are any pending timeouts.
        $timeout.verifyNoPendingTasks();
        $rootScope.$apply();
        expect(costCenterResponse).toEqual(costCenterSearchData);

    }));*/

    /*it('should call getAllCostCenterSearchDetails with response error', inject(function ($q, $rootScope, $timeout) {
        var costCenterResponse;
        var deferred = $q.defer();

        var promise = mockCostCenterSearchService2.getAllCostCenterSearchDetails();

        promise.then(function (response) {
            if (response === "error") {
                Ctrl2.gridOptions.data = [];
                Ctrl2.gridOptions.totalItems = '';
                mockUtils.stopBlockUI();
            } else {
                costCenterResponse = response;
                Ctrl2.gridOptions.data = costCenterResponse;
            }
        }, function(error) {
            mockUtils.stopBlockUI();
        });


        expect(costCenterResponse).toBeUndefined();
        deferred.resolve(costCenterSearchData);
        expect(costCenterResponse).toBeUndefined()

        // flush timeout(s) for all code under test.
        $timeout.flush(500);
        // this will throw an exception if there are any pending timeouts.
        $timeout.verifyNoPendingTasks();
        $rootScope.$apply();
        expect(costCenterResponse).toEqual(costCenterSearchData);

    }));*/

    /*it('should call getAllCostCenterSearchDetails with function error', inject(function ($timeout) {
        $scope.$apply();
        expect(Ctrl3.gridOptions.data).toEqual([]);
        expect(Ctrl2.gridOptions.totalItems).toBeUndefined();
        // flush timeout(s) for all code under test.
        $timeout.flush();
        // this will throw an exception if there are any pending timeouts.
        $timeout.verifyNoPendingTasks();
        expect(Ctrl3.errorMessage).toEqual('An error occurred while getting costcenters data');
        spyOn(Ctrl3, 'errorHandling').and.callThrough();
        Ctrl3.errorHandling('An error occurred while getting costcenters data');
        expect(Ctrl3.errorHandling).toHaveBeenCalledWith('An error occurred while getting costcenters data');
    }));*/
});