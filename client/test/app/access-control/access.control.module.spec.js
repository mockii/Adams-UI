'use strict';

describe('adams.access.control', function() {
    var $state,
        $rootScope,
        $scope,
        $injector,
        $ocLazyLoad,
        state = 'accessControl';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.access.control');


        inject(function (_$state_, $templateCache, _$rootScope_, _$injector_, $controller, _$ocLazyLoad_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $injector = _$injector_;
            $ocLazyLoad = _$ocLazyLoad_;
            $ocLazyLoad.load({
                name:'accessControl',
                files:['css/access-control.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });

            $templateCache.put('access-control/access.control.tpl.html', '');
        });
    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/accesscontrol');
    });

    it('should resolve accesscontrol deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get(state).resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get(state).resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get(state).resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('should resolve application', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams) {
        $stateParams.application_name = '';
        $injector.invoke($state.get(state).resolve['application_name']);
        expect($state.get(state).resolve['application_name']($stateParams)).toEqual($stateParams.application_name);
    }));

    it('should resolve secured object', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams) {
        $stateParams.secured_object_name = '';
        $injector.invoke($state.get(state).resolve['secured_object_name']);
        expect($state.get(state).resolve['secured_object_name']($stateParams)).toEqual($stateParams.secured_object_name);
    }));
});