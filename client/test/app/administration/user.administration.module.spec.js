'use strict';

describe('userAdministrationNew', function() {

    var Ctrl,
        $ocLazyLoadMock,
        $state,
        $rootScope,
        $scope,
        $q,
        $injector,
        mockRBACService = {},
        mockUserAdministrationService = {},
        stateparams,
        $ocLazyLoad,
        state = 'userAdministration';
           
    beforeEach(function() {
        module('ui.router');
        module('oc.lazyLoad');
        module('adams.common.url');
        module('adams.user.administration.controller');
        module('adams.user.administration.service');
        module('common.services.RBAC', function($provide) {
            $provide.value('RBACService', mockRBACService);
        });
        module(function ($provide) {
           
        });
        module('adams.user.administration', function ($provide) {
            $provide.value('UserAdministrationService', mockUserAdministrationService);
            // $provide.value('$ocLazyLoad', $ocLazyLoadMock = {});
            // $provide.value('userData', userDataMock = {});
        });

        inject(function (_$state_, $templateCache, _$rootScope_, _$injector_, $controller, _$ocLazyLoad_, _$q_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $injector = _$injector_;
            $q = _$q_;
            stateparams = { appName: 'ADAMS', roleName: 'Admin' };
            $state.params = stateparams;
            $templateCache.put('administration/user.administration.tpl.html', '');
            $ocLazyLoad = _$ocLazyLoad_;
            $ocLazyLoad.load({
                name:'userAdministration',
                files:['css/user-administration.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });

            mockRBACService.getCurrentProfile = function() {
                var deferred = $q.defer();
                deferred.resolve({user_name: "VASIRU01"});
                return deferred.promise.$$state.value;
            };
            mockRBACService.getCurrentRoleName = function() {
                var deferred = $q.defer();
                deferred.resolve({role_name: "Admin"});
                return deferred.promise.$$state.value.role_name;
            };

            mockUserAdministrationService.getApplicationsByLoginUser = function () {
                var deferred = $q.defer();
                console.log("This is called");
                deferred.resolve(["Admin"]);
                return deferred.promise;
            };

            mockUserAdministrationService.getApplicationsByLoginUser = function () {
                var deferred = $q.defer();
                deferred.reject({});
                return deferred.promise;
            };

            mockUserAdministrationService.getSelectApplicationOptions = function (ab1) {
                var deferred = $q.defer();
                deferred.resolve(["Adams"]);
                return deferred.promise;
            };

            mockUserAdministrationService.getSelectRoleOptions = function (a, b, c) {
                var deferred = $q.defer();
                deferred.resolve(["Admin"]);
                return deferred.promise;
            };

            $ocLazyLoadMock = function() {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise.$$state;
            };
        });
    });

    /*it('should getApplicationsByLoginUser  ', function(){
        var userName;
        userName = 'VASIRU01';

        var url = urlSpace.urls.local.applicationsByUser.replace('{userName}', userName);

        $httpBackend.expectGET(url).respond({});

        sampleSvcObj.getApplicationsByLoginUser ().then(function(data) {
            expect(data).toEqual({ user: 'VASIRU01', userApplications: undefined });
        });
        $httpBackend.flush();
    });*/

    it('should respond to URL', function () {
        expect($state.href(state, { appName: 'ADAMS', roleName: 'Admin' })).toEqual('#/useradministration?appName=ADAMS&roleName=Admin');
    });

    it('userAdministration resolve deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('userAdministration').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('userAdministration').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('userAdministration').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('userAdministration resolve userData', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        var promise  = $injector.invoke($state.get('userAdministration').resolve['userData']);
            promise.then(function(res) {console.log(' *res ', res);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('userAdministration').resolve['userData'][0]).toEqual('UserAdministrationService');
    }));

    it('userAdministration resolve selectApplicationOptions', inject(function($state, $injector) {

        $injector.invoke($state.get('userAdministration').resolve['selectApplicationOptions']);
        expect($state.get('userAdministration').resolve['selectApplicationOptions'][0]).toEqual('UserAdministrationService');
        expect($state.get('userAdministration').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('userAdministration resolve selectRoleOptions', inject(function($state, $injector) {

        $injector.invoke($state.get('userAdministration').resolve['selectRoleOptions']);
        expect($state.get('userAdministration').resolve['selectRoleOptions'][0]).toEqual('UserAdministrationService');
    }));

    it('should get appName from state params', function () {
        $state = $state.get(state);
        expect($state.name).toBe(state);
        // console.log('appName', $state.resolve.appName(stateparams));
        expect($state.resolve.appName(stateparams)).toEqual('ADAMS');
    });

    it('should get appName from state params', function () {
        $state = $state.get(state);
        // console.log('appName', $state.resolve.roleName(stateparams));
        expect($state.resolve.roleName(stateparams)).toEqual('Admin');
    });
});