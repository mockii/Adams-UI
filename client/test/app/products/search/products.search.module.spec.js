
'use strict';

describe('adams.products.search', function() {

    var $state,
        $rootScope,
        $injector,
        $ocLazyLoad,
        state = 'products';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.products.search.controller');
        module('adams.products.search.service');


        module('adams.products.search', function ($provide) {
            //$provide.value('$ocLazyLoad', $ocLazyLoadMock = {});
        });

        inject(function (_$state_, $templateCache, _$injector_, _$rootScope_, _$ocLazyLoad_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $injector = _$injector_;
            $ocLazyLoad = _$ocLazyLoad_;
            $ocLazyLoad.load({
                name:'productsSearch',
                files:['css/products-search.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });
            $templateCache.put('products/search/products.search.tpl.html', '');
        });

    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/products');
    });

    it('products resolve deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('products').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('products').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('products').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));
});