/**
 * Created by kandun01 on 1/25/2017.
 */

'use strict';

describe("Secured Objects Controller Testing", function () {
    var applications, roles, secPermissions, mockedSecuredObjectsService = {}, $timeout, mockModalDialogService,
        mockedSecuredObjectsService1 = {}, mockedSecuredObjectsService2 = {}, mockedSecuredObjectsService3 = {}, $q, scope, rootScope, $rootScope,
        controller, controller1, controller2, controller3, controller4, state, ADAMS_CONSTANTS, SecuredObjectsService,
        securedApplicationsPromise, promise, mySelectedRows = [], logService = {};


    beforeEach(module('adams.secured.objects.controller'));
    beforeEach(module('adams.secured.objects.service'));
    beforeEach(module('adams.common.constants'));

    beforeEach(function() {

        applications = JSON.parse('[{"name":"ADAMS"},{"name":"MyAdmin"},{"name":"Tip Tracker"},{"name":"MyAdmin"}]');

        roles = JSON.parse('[{"appname":"ADAMS","roles":[{"name":"ADMIN"},{"name":"GLOBAL ADMIN"},{"name":"User"}]},{"appname":"MyAdmin","roles":[{"name":"MY ADMIN"},{"name":"GLOBAL ADMIN"},{"name":"User"}]},{"appname":"Tip Tracker","roles":[{"name":"TIP ADMIN"},{"name":"GLOBAL ADMIN"},{"name":"User"}]},{"appname":"MyAdmin","roles":[{"name":"MyAdmin ADMIN"},{"name":"GLOBAL ADMIN"},{"name":"User"}]}]');

        secPermissions = JSON.parse('[{"name":"Admin","secobjects":[{"name":"ADMIN","desc":"ADMIN","type":"Menu","accesstype":"WRITE"},{"name":"ADMIN_USER","desc":"ADMIN USER","type":"Menu","accesstype":"WRITE"},{"name":"INGREDIENT","desc":"INGREDIENT E","type":"Menu","accesstype":"WRITE"}]},{"name":"Global Admin","secobjects":[{"name":"GLOBAL ADMIN","desc":"GLOBAL ADMIN","type":"Menu","accesstype":"WRITE"},{"name":"GLOBAL ADMIN_USER","desc":"GLOBAL DMIN USER","type":"Menu","accesstype":"WRITE"},{"name":"GLOBAL INGREDIENT","desc":"GLOBAL INGREDIENT E","type":"Menu","accesstype":"WRITE"}]},{"name":"NoAccess","secobjects":[{"name":"NO GLOBAL ADMIN","desc":"NO GLOBAL ADMIN","type":"Menu","accesstype":"WRITE"},{"name":"NO GLOBAL ADMIN_USER","desc":"NO GLOBAL DMIN USER","type":"Menu","accesstype":"WRITE"},{"name":"NO GLOBAL INGREDIENT","desc":"NO GLOBAL INGREDIENT E","type":"Menu","accesstype":"WRITE"}]},{"name":"User","secobjects":[{"name":"USER GLOBAL ADMIN","desc":"USER GLOBAL ADMIN","type":"Menu","accesstype":"WRITE"},{"name":"USER GLOBAL ADMIN_USER","desc":"USER GLOBAL DMIN USER","type":"Menu","accesstype":"WRITE"},{"name":"USER GLOBAL INGREDIENT","desc":"USER GLOBAL INGREDIENT E","type":"Menu","accesstype":"WRITE"}]}]');

       /* mockedSecuredObjectsService = {
            getApplications: function (limit, page) {
                return {
                    then : function(success){
                        success(applications);
                    }
                }
            },
            getApplicationRoles: function (limit, page, search) {
                return {
                    then : function(success){
                        success(roles);
                    }
                }
            }
        };*/
    });

    beforeEach(function() {

        module(function($provide) {

            $provide.value('SecuredObjectsService', mockedSecuredObjectsService);
            $provide.value('SecuredObjectsService', mockedSecuredObjectsService1);
            $provide.value('SecuredObjectsService', mockedSecuredObjectsService2);
            $provide.value('SecuredObjectsService', mockedSecuredObjectsService3);
            $provide.value('STGLogService', logService);
        });

    });


    beforeEach(inject(function($controller,  _$rootScope_, _$q_, _ADAMS_CONSTANTS_, _SecuredObjectsService_, _$timeout_, $log, STGLogService) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $timeout = _$timeout_;
        logService = STGLogService;
        state={
            go: function(state, args){}
        };

        promise = {
            abort: jasmine.createSpyObj('promise', ['abort'])
        };

        ADAMS_CONSTANTS = _ADAMS_CONSTANTS_;
        SecuredObjectsService = _SecuredObjectsService_;

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

        mockedSecuredObjectsService.getApplications = function(limit, page) {
            var deferred = $q.defer();
            deferred.resolve(applications);
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedSecuredObjectsService1.getApplications = function(limit, page) {
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

        mockedSecuredObjectsService2.getApplications = function(limit, page) {
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

        mockedSecuredObjectsService3.getApplications = function(limit, page) {
            var deferred = $q.defer();
            deferred.reject({});
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedSecuredObjectsService.getApplicationRoles = function(limit, page, search) {
            var deferred = $q.defer();
            deferred.resolve(roles);
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedSecuredObjectsService.getSecuredObjectsForRole = function(limit, page, search) {
            var deferred = $q.defer();
            deferred.resolve(roles);
            deferred.promise.abort = function(){};
            return deferred.promise;
        };



        controller = $controller('SecuredObjectsController',
            {$rootScope : rootScope,
                $state : state,
                $scope: scope,
                ADAMS_CONSTANTS : ADAMS_CONSTANTS,
                SecuredObjectsService : mockedSecuredObjectsService,
                application : 'Adams',
                role : 'Admin',
                ModalDialogService: mockModalDialogService
            });


        controller1 = $controller('SecuredObjectsController',
            {$rootScope : rootScope,
                $state : state,
                $scope: scope,
                ADAMS_CONSTANTS : ADAMS_CONSTANTS,
                SecuredObjectsService : mockedSecuredObjectsService,
                application : 'Adams',
                role : undefined,
                $timeout: _$timeout_,
                ModalDialogService: mockModalDialogService
            });

        controller2 = $controller('SecuredObjectsController',
            {$rootScope : rootScope,
                $state : state,
                $scope: scope,
                ADAMS_CONSTANTS : ADAMS_CONSTANTS,
                SecuredObjectsService : mockedSecuredObjectsService1,
                application : 'Adams',
                role : 'Admin',
                $timeout: _$timeout_,
                ModalDialogService: mockModalDialogService
            });

        controller3 = $controller('SecuredObjectsController',
            {$rootScope : rootScope,
                $state : state,
                $scope: scope,
                ADAMS_CONSTANTS : ADAMS_CONSTANTS,
                SecuredObjectsService : mockedSecuredObjectsService2,
                $timeout: _$timeout_,
                application : 'Adams',
                role : 'Admin',
                ModalDialogService: mockModalDialogService
            });

        controller4 = $controller('SecuredObjectsController',
            {$rootScope : rootScope,
                $state : state,
                $scope: scope,
                ADAMS_CONSTANTS : ADAMS_CONSTANTS,
                SecuredObjectsService : mockedSecuredObjectsService3,
                $timeout: _$timeout_,
                application : 'Adams',
                role : 'Admin',
                ModalDialogService: mockModalDialogService
            });
    }));

    describe("Controller : SecuredObjectsController", function () {

        it('should call errorHandling', function () {
            spyOn(controller, "errorHandling").and.callThrough();
            controller.errorHandling('error');
            scope.$apply();
            expect(controller.errorHandling).toHaveBeenCalledWith('error');
        });

        it('should exist', function() {
            expect(controller).toBeDefined();
        });

        it('should call getApplicationData - if', function() {
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

        it('should abort getRoleGridData promise', function() {
            spyOn(controller, 'getRoleGridData').and.callThrough();
            controller.application = '';
            controller.getRoleGridData().abort();
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

        it('should abort call getPermissionGridData promise', function() {
            spyOn(controller, 'getPermissionGridData').and.callThrough();
            controller.application = '';
            controller.getPermissionGridData().abort();
            scope.$apply();
            expect(controller.getPermissionGridData).toHaveBeenCalled();
        });

        it('should call getPermissionGridData ', function() {
            spyOn(controller, 'getPermissionGridData').and.callThrough();
            spyOn(promise, 'abort').and.callThrough();
            controller.getPermissionGridData();
            scope.$apply();
            expect(controller.getPermissionGridData).toHaveBeenCalled();
        });
    });



});