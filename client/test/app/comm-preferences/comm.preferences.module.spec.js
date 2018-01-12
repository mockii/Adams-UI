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
        getCommPreferences,
        mockCommPreferencesService = {},
        stateparams,
        $ocLazyLoad,
        state = 'commPreferences';
           
    beforeEach(function() {
        module('ui.router');
        module('oc.lazyLoad');
        module('adams.common.url');
        module('adams.communication.preferences.controller');
        module('adams.communication.preferences.service');
        module('mockedObjectsData');
        module('common.services.RBAC', function($provide) {
            $provide.value('RBACService', mockRBACService);
        });
        module(function ($provide) {
           
        });
        module('adams.communication.preferences', function ($provide) {
            $provide.value('CommPreferencesService', mockCommPreferencesService);
            // $provide.value('$ocLazyLoad', $ocLazyLoadMock = {});
            // $provide.value('userData', userDataMock = {});
        });

        inject(function (_$state_, $templateCache, _$rootScope_, _$injector_, $controller, _$ocLazyLoad_, _$q_, defaultObjects) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $injector = _$injector_;
            $q = _$q_;
            stateparams = { userName: 'vasiru01' };
            $templateCache.put('comm-preferences/comm-preferences.tpl.html', '');
            getCommPreferences = defaultObjects.getCommPreferences;
            $ocLazyLoad = _$ocLazyLoad_;
            $ocLazyLoad.load({
                name:'commPreferences',
                files:['css/comm-preferences.css']
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

            mockCommPreferencesService.getCommPreferences = function(userName) {
                var deferred = $q.defer();
                deferred.resolve(getCommPreferences);
                return deferred.promise;
            };

            $ocLazyLoadMock = function() {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise.$$state;
            };
        });
    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/communicationpreferences');
    });

    it('communicationpreferences resolve deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('commPreferences').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('commPreferences').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('commPreferences').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('communicationpreferences resolve getCommPreferences', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        var promise  = $injector.invoke($state.get('commPreferences').resolve['getCommPreferences']);
            promise.then(function(res) {console.log(' *res ', res);})
            .catch(function(err) {console.log(' *err ', err);});
    }));
});