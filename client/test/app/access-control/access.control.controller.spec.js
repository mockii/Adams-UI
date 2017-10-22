'uer strict';

describe('Access Control controller testing', function () {

    var controllerFor200,
        controllerFor404,
        controllerFor304,
        controllerForErrorCallback,
        promise,
        scope,
        $timeout,
        $q,
        gridOptions,
        gridApi,
        $rootScope,
        $interval,
        $intervalSpy,
        $log,
        ADAMS_CONSTANTS,
        application_name,
        secured_object_name,
        applications,
        securedObjects,
        roles,
        overrides,
        mockedSecuredObjectsServiceFor200 = {},
        mockedSecuredObjectsServiceFor404 = {},
        mockedSecuredObjectsServiceFor304 = {},
        mockedSecuredObjectsServiceForErrorCallback = {},
        mockModalDialogService = {},
        mockedAccessControlService = {},
        mySelectedRows = [];

    beforeEach(module('adams.access.control.controller'));
    beforeEach(module('adams.common.constants'));

    module(function($provide) {

        $provide.value('SecuredObjectsService', mockedSecuredObjectsServiceFor200);
        $provide.value('SecuredObjectsService', mockedSecuredObjectsServiceFor404);
        $provide.value('SecuredObjectsService', mockedSecuredObjectsServiceFor304);
        $provide.value('application_name', application_name);
        $provide.value('secured_object_name', secured_object_name);
    });

    beforeEach(inject(function ($controller,  _$rootScope_, _$q_, _$interval_,
                                _ADAMS_CONSTANTS_, _$timeout_, _$log_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $timeout = _$timeout_;
        $log = _$log_;
        ADAMS_CONSTANTS = _ADAMS_CONSTANTS_;
        $interval = _$interval_;
        $intervalSpy = jasmine.createSpy('$interval', $interval);

        applications = JSON.parse('{"data":[{"name":"OMS"},{"name":"ADAMS"},{"name":"MyAdmin"},{"name":"Tip Tracker"},{"name":"MyAdmin"}]}');
        securedObjects = JSON.parse('{"data":[{"name":"Applications"},{"name":"Dashboard"}]}');
        roles = JSON.parse('{"data":[{"role_name": "User","access_type": "Read"},{"role_name": "Application Owner","access_type": "Read" }]}');
        overrides = JSON.parse('{"data":[{"criteria": "If this happens then that should happen","access_type": "Read"}]}');

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
                    showProductsSearchData: jasmine.createSpy('gridApi.grid.appScope.showProductsSearchData')
                },
                columns: [{
                    name: 'something',
                    filters: [{
                        term: 'someterm'
                    }]
                },{
                    name: 'something',
                    filters: [{
                        term: 'someterm'
                    }]
                },{
                    name: 'something',
                    filters: [{
                        term: 'someterm'
                    }]
                },{
                    name: 'something',
                    filters: [{
                        term: 'someterm'
                    }]
                },{
                    name: 'something',
                    filters: [{
                        term: 'someterm'
                    }]
                }]
            },
            selection: {
                selectRow: function(){
                    return '';
                },
                unSelectRow: function(){
                    return '';
                }
            }
        };

        promise = {
            abort: jasmine.createSpyObj('promise', ['abort'])
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

        mockedSecuredObjectsServiceFor200.getApplications = function() {
            var deferred = $q.defer();
            deferred.resolve(applications);
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedSecuredObjectsServiceFor200.getSecuredObjectsForApplication = function() {
            var deferred = $q.defer();
            deferred.resolve(securedObjects);
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedAccessControlService.getRolesForSecuredObject = function() {
            var deferred = $q.defer();
            deferred.resolve(applications);
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedAccessControlService.getOverridesForSecuredObject = function() {
            var deferred = $q.defer();
            deferred.resolve(applications);
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedSecuredObjectsServiceFor404.getApplications = function() {
            var deferred = $q.defer();
            var response = {
                data: '{}',
                error: {
                    userErrorMessage: {
                        httpStatus: "404"
                    }
                }
            };
            deferred.resolve(response);
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedSecuredObjectsServiceFor304.getApplications = function() {
            var deferred = $q.defer();
            var response = {
                data: '{}',
                error: {
                    userErrorMessage: {
                        httpStatus: "304"
                    }
                }
            };
            deferred.resolve(response);
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedSecuredObjectsServiceForErrorCallback.getApplications = function() {
            var deferred = $q.defer();
            deferred.reject();
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        controllerFor200 = $controller('AccessControlController',
            {$rootScope : $rootScope,
                $scope: scope,
                $log: $log,
                $timeout: $timeout,
                $q: $q,
                SecuredObjectsService : mockedSecuredObjectsServiceFor200,
                ADAMS_CONSTANTS : ADAMS_CONSTANTS,
                ModalDialogService: mockModalDialogService,
                AccessControlService: mockedAccessControlService,
                application_name: 'OMS',
                secured_object_name: 'Dashboard'
            });


        controllerFor404 = $controller('AccessControlController',
            {$rootScope : $rootScope,
                $scope: scope,
                $log: $log,
                $timeout: $timeout,
                $q: $q,
                SecuredObjectsService : mockedSecuredObjectsServiceFor404,
                ADAMS_CONSTANTS : ADAMS_CONSTANTS,
                ModalDialogService: mockModalDialogService,
                AccessControlService: mockedAccessControlService,
                application_name: application_name,
                secured_object_name: secured_object_name
            });

        controllerFor304 = $controller('AccessControlController',
            {$rootScope : $rootScope,
                $scope: scope,
                $log: $log,
                $timeout: $timeout,
                $q: $q,
                SecuredObjectsService : mockedSecuredObjectsServiceFor304,
                ADAMS_CONSTANTS : ADAMS_CONSTANTS,
                ModalDialogService: mockModalDialogService,
                AccessControlService: mockedAccessControlService,
                application_name: application_name,
                secured_object_name: secured_object_name
            });

        controllerForErrorCallback = $controller('AccessControlController',
            {$rootScope : $rootScope,
                $scope: scope,
                $log: $log,
                $timeout: $timeout,
                $q: $q,
                SecuredObjectsService : mockedSecuredObjectsServiceForErrorCallback,
                ADAMS_CONSTANTS : ADAMS_CONSTANTS,
                ModalDialogService: mockModalDialogService,
                AccessControlService: mockedAccessControlService,
                application_name: 'OMS',
                secured_object_name: 'Dashboard'
            });
    }));

    describe('application data component', function () {
        it('should call errorHandling', function () {
            spyOn(controllerFor200, "errorHandling").and.callThrough();
            controllerFor200.errorHandling('error');
            scope.$apply();
            expect(controllerFor200.errorHandling).toHaveBeenCalledWith('error');
        });

        it('should exist', function() {
            expect(controllerFor200).toBeDefined();
        });

        it('should call getApplicationData - if', function() {
            spyOn(controllerFor404, 'getApplicationData').and.callThrough();
            controllerFor404.getApplicationData();
            scope.$apply();
            expect(controllerFor404).toBeDefined();
        });

        it('should call getApplicationData - error', function() {
            spyOn(controllerForErrorCallback, 'getApplicationData').and.callThrough();
            controllerForErrorCallback.getApplicationData();
            scope.$apply();
            expect(controllerForErrorCallback).toBeDefined();
        });

        it('should call getApplicationData else if ', inject(function ($timeout) {
            spyOn(controllerFor304, 'getApplicationData').and.callThrough();
            controllerFor304.getApplicationData();
            $timeout.flush(500);
            $timeout.verifyNoPendingTasks();
            scope.$apply();
            expect(controllerFor304).toBeDefined();
        }));

        it('should call uiGridSelectedRows', function() {
            $rootScope.$broadcast('uiGridSelectedRows', mySelectedRows);
        });

        it('should call applicationChange - no selection', function() {
            spyOn(controllerFor200, 'applicationChange').and.callThrough();
            controllerFor200.applicationChange();
            scope.$apply();
            expect(controllerFor200.applicationChange).toHaveBeenCalled();
        });

        it('should call applicationChange', function() {
            spyOn(controllerFor200, 'applicationChange').and.callThrough();
            controllerFor200.applicationChange({"name":"ADAMS"});
            scope.$apply();
            expect(controllerFor200.applicationChange).toHaveBeenCalled();
        });

        it('should load secured objects grid', function() {
            scope.$broadcast('uiGridLoadDetails', {"data":[{"object_name":"Applications"},{"object_name":"Dashboard"}]}, {}, 0);
            scope.$apply();
        });

        it('should load secured objects grid', inject(function($interval) {
            scope.$broadcast('uiGridLoadDetails', gridOptions, gridApi, 0);
            $interval.flush(0);
            scope.$apply();
        }));
    });

    describe('secured object grid', function () {
        it('should call getSecuredObjectsForApplication ', function() {
            spyOn(controllerFor200, 'getSecuredObjectsForApplication').and.callThrough();
            spyOn(promise, 'abort').and.callThrough();
            controllerFor200.application = {'name':'OMS'};
            controllerFor200.getSecuredObjectsForApplication();
            scope.$apply();
            expect(controllerFor200.getSecuredObjectsForApplication).toHaveBeenCalled();
        });

        it('should abort getSecuredObjectsForApplication promise', function() {
            spyOn(controllerFor200, 'getSecuredObjectsForApplication').and.callThrough();
            controllerFor200.application = {};
            controllerFor200.getSecuredObjectsForApplication().abort();
            scope.$apply();
            expect(controllerFor200.getSecuredObjectsForApplication).toHaveBeenCalled();
        });
    });

    describe('roles grid', function () {
        it('should call getRolesForSecuredObject ', function() {
            spyOn(controllerFor200, 'getRolesForSecuredObject').and.callThrough();
            spyOn(promise, 'abort').and.callThrough();
            controllerFor200.selectedSecuredObject = {'object_name':'Dashboard'};
            controllerFor200.getRolesForSecuredObject();
            scope.$apply();
            expect(controllerFor200.getRolesForSecuredObject).toHaveBeenCalled();
        });

        it('should abort getRolesForSecuredObject promise', function() {
            spyOn(controllerFor200, 'getRolesForSecuredObject').and.callThrough();
            controllerFor200.selectedSecuredObject = {};
            controllerFor200.getRolesForSecuredObject().abort();
            scope.$apply();
            expect(controllerFor200.getRolesForSecuredObject).toHaveBeenCalled();
        });
    });

    describe('overrides grid', function () {
        it('should call getOverridesForSecuredObject ', function() {
            spyOn(controllerFor200, 'getOverridesForSecuredObject').and.callThrough();
            spyOn(promise, 'abort').and.callThrough();
            controllerFor200.selectedSecuredObject = {'object_name':'Dashboard'};
            controllerFor200.getOverridesForSecuredObject();
            scope.$apply();
            expect(controllerFor200.getOverridesForSecuredObject).toHaveBeenCalled();
        });

        it('should abort getOverridesForSecuredObject promise', function() {
            spyOn(controllerFor200, 'getOverridesForSecuredObject').and.callThrough();
            controllerFor200.selectedSecuredObject = {};
            controllerFor200.getOverridesForSecuredObject().abort();
            scope.$apply();
            expect(controllerFor200.getOverridesForSecuredObject).toHaveBeenCalled();
        });
    });

});