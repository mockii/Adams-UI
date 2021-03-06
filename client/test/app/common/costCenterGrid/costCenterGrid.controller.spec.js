/**
 * Created by kandun01 on 1/25/2017.
 */

'use strict';

describe("adams.common.cost.center.grid.controller", function () {
    var mockedAssociatesSearchService = {}, $timeout, mockModalDialogService, $timeout, $q, scope, rootScope, $rootScope,
        controller, controller1, controller2, state, ADAMS_CONSTANTS, AssociatesSearchService, mockUtils = {},
        gridApi,
        $uibModalInstance,
        gridOptions,
        promise, mySelectedRows = [];


    beforeEach(module('adams.common.cost.center.grid.controller'));
    beforeEach(module('adams.associates.temp.search.service'));
    beforeEach(module('adams.common.constants'));

    beforeEach(function() {

        module(function($provide) {
            $provide.value('Utils', mockUtils);
            $provide.value('AssociatesSearchService', mockedAssociatesSearchService);
        });

    });


    beforeEach(inject(function($controller,  _$rootScope_, _$q_, _ADAMS_CONSTANTS_, _AssociatesSearchService_, _$timeout_, Utils) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $timeout = _$timeout_;
        state={
            go: function(state, args){}
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
            },
            checkIfSearchObjectPresent: function(property, searchItems){
                return true;
            },
            getSearchIndex: function(){
                return -1;
            }
        };

        promise = {
            abort: jasmine.createSpyObj('promise', ['abort'])
        };

        ADAMS_CONSTANTS = _ADAMS_CONSTANTS_;
        AssociatesSearchService = _AssociatesSearchService_;

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

        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

        mockedAssociatesSearchService.getCostCenterDetails = function(pageSize, pageNumber, sort, search, fields) {
            var deferred = $q.defer();
            deferred.resolve({});
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        controller = $controller('CostCenterGridController',
            {$rootScope : rootScope,
                $state : state,
                $scope: scope,
                ADAMS_CONSTANTS : ADAMS_CONSTANTS,
                AssociatesSearchService : mockedAssociatesSearchService,
                // $uibModalInstance : mockModal,
                $uibModalInstance: $uibModalInstance,
                timeTrackingSystem : ADAMS_CONSTANTS.TIME_TRACKING_SYSTEM_MYSTAFF,
                ModalDialogService: mockModalDialogService,
                Utils: mockUtils
            });

    }));

    describe("Controller : AssociatesSearchService", function () {

        /*it('should call errorHandling', function () {
            spyOn(controller, "errorHandling").and.callThrough();
            controller.errorHandling('error');
            scope.$apply();
            expect(controller.errorHandling).toHaveBeenCalledWith('error');
        });*/



        it('should call uiGridLoadDetails', function() {
            $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
            // expect(function(){}).toEqual(gridApi.grid.appScope.confirmDeleteMarketMapping)
        });

        it('should exist', function() {
            expect(controller).toBeDefined();
        });

        it('should call uiGridSelectedRows', function() {
            $rootScope.$broadcast('uiGridSelectedRows');
        });

        it('should dismiss the modal with result "dismiss" when dismissed', function () {
            controller.close($uibModalInstance.dismiss('cancel'));
            expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should submit the modal with result "close"', function () {
            controller.mySlectedRows = mySelectedRows;
            controller.submit($uibModalInstance.close(mySelectedRows));
            expect($uibModalInstance.close).toHaveBeenCalledWith(mySelectedRows);
        });

        it('should call getGridData ', function() {
            spyOn(controller, "getGridData").and.callThrough();
            controller.getGridData(25,1,'',{search: [
                    {
                        "property": "market_name",
                        "value": "something",
                        "operator": ""
                    }
                ]}
            );
            scope.$apply();
            expect(controller.getGridData).toHaveBeenCalled();
        });

        it('should call getGridData without search input', function() {
            spyOn(controller, "getGridData").and.callThrough();
            controller.getGridData(25,1,'',{search: null});
            scope.$apply();
            expect(controller.getGridData).toHaveBeenCalled();
        });

        it('should call getGridData without search input', function() {
            spyOn(controller, "getGridData").and.callThrough();
            controller.searchPropertyValue = false;
            controller.getGridData(25,1,'',{search: null});
            scope.$apply();
            expect(controller.getGridData).toHaveBeenCalled();
        });

        /*it('should call getApplicationData - if', function() {
            spyOn(controller2, 'getApplicationData').and.callThrough();
            controller2.getApplicationData();
            scope.$apply();
            expect(controller2).toBeDefined();
        });


        it('should call getApplicationData - error', function() {
            spyOn(controller3, 'getApplicationData').and.callThrough();
            controller3.getApplicationData();
            scope.$apply();
            expect(controller3).toBeDefined();
        });

        it('should call getApplicationData else if ', inject(function ($timeout) {
            spyOn(controller3, 'getApplicationData').and.callThrough();
            controller3.getApplicationData();
            $timeout.flush(500);
            $timeout.verifyNoPendingTasks();
            scope.$apply();
            expect(controller3).toBeDefined();
        }));

        it('should call uiGridSelectedRows', function() {
            $rootScope.$broadcast('uiGridSelectedRows', mySelectedRows);
        });

        it('should exist and role is undefined - else if', function() {
            expect(controller1).toBeDefined();
            expect(controller1.role).toEqual({});
        });

        it('should call applicationChange ', function() {
            spyOn(controller, 'applicationChange').and.callThrough();
            controller.applicationChange();
            scope.$apply();
            expect(controller.applicationChange).toHaveBeenCalled();
        });

        it('should call getRoleGridData ', function() {
            spyOn(controller, 'getRoleGridData').and.callThrough();
            spyOn(promise, 'abort').and.callThrough();
            controller.application = '';
            controller.getRoleGridData();
            scope.$apply();
            expect(controller.getRoleGridData).toHaveBeenCalled();
        });

        it('should call getRoleGridData ', function() {
            spyOn(controller, 'getRoleGridData').and.callThrough();
            spyOn(promise, 'abort').and.callThrough();
            controller.getRoleGridData();
            scope.$apply();
            expect(controller.getRoleGridData).toHaveBeenCalled();
        });

        it('should call getPermissionGridData ', function() {
            spyOn(controller, 'getPermissionGridData').and.callThrough();
            spyOn(promise, 'abort').and.callThrough();
            controller.application = '';
            controller.getPermissionGridData();
            scope.$apply();
            expect(controller.getPermissionGridData).toHaveBeenCalled();
        });

        it('should call getPermissionGridData ', function() {
            spyOn(controller, 'getPermissionGridData').and.callThrough();
            spyOn(promise, 'abort').and.callThrough();
            controller.getPermissionGridData();
            scope.$apply();
            expect(controller.getPermissionGridData).toHaveBeenCalled();
        });*/
    });
});