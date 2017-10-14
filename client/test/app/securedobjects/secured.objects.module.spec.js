
'use strict';

describe('adams.secured.objects', function() {
    var $state,
        $rootScope,
        $scope,
        $injector,
        $ocLazyLoad,
        state = 'securedObjects';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.secured.objects.controller');

        module('adams.secured.objects', function ($provide) {
            //$provide.value('$ocLazyLoad', $ocLazyLoadMock = {});
        });

        inject(function (_$state_, $templateCache, _$rootScope_, _$injector_, $controller, _$ocLazyLoad_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $injector = _$injector_;
            $ocLazyLoad = _$ocLazyLoad_;
            $ocLazyLoad.load({
                name:'securedObjects',
                    files:['css/securedobjects.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });

            $templateCache.put('securedobjects/secured.objects.tpl.html', '');
        });
    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/securedobjects');
    });

    it('securedObjects resolve deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('securedObjects').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('securedObjects').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('securedObjects').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('securedObjects resolve application', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams) {

        $stateParams.application_name = '';
        $injector.invoke($state.get('securedObjects').resolve['application']);
        expect($state.get('securedObjects').resolve['application']($stateParams)).toEqual($stateParams.application_name);
    }));

    it('securedObjects resolve role', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams) {

        $stateParams.role_name = '';
        $injector.invoke($state.get('securedObjects').resolve['role']);
        expect($state.get('securedObjects').resolve['role']($stateParams)).toEqual($stateParams.role_name);
    }));
});