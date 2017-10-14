'use strict';
describe('vendor.search', function() {

    var $state,
        $rootScope,
        $ocLazyLoad,
        state = 'vendors';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.vendor.search');
        module('adams.vendor.search.controller');
        module('adams.vendor.search.service');

        inject(function (_$state_, $templateCache, _$rootScope_, _$ocLazyLoad_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $ocLazyLoad = _$ocLazyLoad_;
            $templateCache.put('vendors/search/vendor.search.tpl.html', '');

            $ocLazyLoad.load({
                name:'vendorSearch',
                files:['css/vendor-search.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });
        });

    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/vendors/search');
    });

    it('vendors', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('vendors').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('vendors').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('vendors').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));
});