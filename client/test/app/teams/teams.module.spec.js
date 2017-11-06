
'use strict';

describe('adams.teams', function() {
    var $state,
        $rootScope,
        $scope,
        $injector,
        $ocLazyLoad,
        $q,
        mockRBACService = {},
        state = 'teams';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.teams.controller');
        module('adams.user.administration.service');

        module('adams.teams', function ($provide) {
            //$provide.value('$ocLazyLoad', $ocLazyLoadMock = {});
            $provide.value('RBACService', mockRBACService);
            // $provide.value('UserAdministrationService', mockUserAdministrationService);
        });

        inject(function (_$state_, $templateCache, _$rootScope_, _$injector_, $controller, _$ocLazyLoad_, $q) {
            $state = _$state_;
            $q = $q;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $injector = _$injector_;
            $ocLazyLoad = _$ocLazyLoad_;
            $ocLazyLoad.load({
                name:'teams',
                    files:['css/teams.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });

            $templateCache.put('teams/teams.tpl.html', '');

            mockRBACService.getRBACAppName = function() {
                var deferred = $q.defer();
                deferred.resolve('Adams');
                return deferred.promise;
            };

            mockRBACService.getCurrentRoleName = function() {
                var deferred = $q.defer();
                deferred.resolve("Admin");
                return deferred.promise;
            };
        });
    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/teams');
    });

    it('teams resolve deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('teams').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('teams').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('teams').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('teams resolve application', inject(function($state, $injector) {
        $injector.invoke($state.get('teams').resolve['userAppName'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        // expect($state.get('teams').resolve['userAppName'](UserAdministrationService)).toEqual('Adams');
    }));

    it('teams resolve role', inject(function($state, $injector) {
        $injector.invoke($state.get('teams').resolve['userRoleName'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        // expect($state.get('teams').resolve['userRoleName'](UserAdministrationService)).toEqual('Admin');
    }));
});