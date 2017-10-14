'use strict';

describe('tempAssociates', function() {

    var Ctrl,
        $ocLazyLoad,
        $state,
        $rootScope,
        $scope,
        $q,
        $injector,
        state = 'tempAssociates';
           
    beforeEach(function() {
        module('ui.router');
        module('oc.lazyLoad');
        module('common.url');
        module('adams.common.url');
        module('adams.associates.temp.search.controller');
        
        module('adams.associates.temp.search', function ($provide) {
            // $provide.value('$ocLazyLoad', $ocLazyLoadMock = {});
        });

        inject(function (_$state_, $templateCache, _$rootScope_, _$injector_, $controller, _$ocLazyLoad_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $injector = _$injector_;
            $ocLazyLoad = _$ocLazyLoad_;
            $templateCache.put('associates/temporary/associates.search.tpl.html', '');

            /*$ocLazyLoadMock = function() {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise.$$state;
            };*/

            $ocLazyLoad.load({
                name:'associates',
                files:['css/associates.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });
        });
    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/associates/temporary/search');
    });


    /*it('should respond to URL', function () {
        expect($state.href(state, { personnel_number: '51020' })).toEqual('#/associates/temporary/associatesinfo?personnel_number=51020');
    });*/

    it('should resolve deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('tempAssociates').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('tempAssociates').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('tempAssociates').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('should resolve deps', inject(function($state, $injector) {

            $injector.invoke($state.get('tempAssociates').resolve['timeTrackingSystem']);
        // expect($state.get('tempAssociates').resolve['timeTrackingSystem']).toEqual('');
        expect($state.get('tempAssociates').resolve['timeTrackingSystem']).toBeDefined();
    }));
});