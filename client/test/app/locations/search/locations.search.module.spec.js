
'use strict';

describe('adams.locations.search', function() {

    var $state,
        $rootScope,
        $injector,
        $ocLazyLoad,
        state = 'locations';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.locations.search.controller');
        module('adams.locations.search.service');


        module('adams.locations.search', function ($provide) {
            //$provide.value('$ocLazyLoad', $ocLazyLoadMock = {});
        });

        inject(function (_$state_, $templateCache, _$injector_, _$rootScope_, _$ocLazyLoad_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $injector = _$injector_;
            $ocLazyLoad = _$ocLazyLoad_;
            $ocLazyLoad.load({
                name:'locationsSearch',
                files:['css/locations-search.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });
            $templateCache.put('locations/search/locations.search.tpl.html', '');
        });

    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/locations/search');
    });

    it('locations resolve deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('locations').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('locations').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('locations').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));
});