'use sctrict';
describe('costcenters.search', function() {

    var $state,
        $rootScope,
        $ocLazyLoad,
        state = 'costcenters';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.costcenter.search');
        module('adams.costcenter.search.controller');
        module('adams.costcenter.search.service');

        inject(function (_$state_, $templateCache, _$rootScope_, _$ocLazyLoad_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $ocLazyLoad = _$ocLazyLoad_;

            $ocLazyLoad.load({
                name:'costCenterSearch',
                files:['css/cost-center-search.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });

            $templateCache.put('costcenters/search/costcenter.search.tpl.html', '');
        });

    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/costcenters/search');
    });

    it('should have pageTitle', function () {
        expect($state.get(state).data.pageTitle).toEqual('Cost Center Search');
    });

    it('costcenters', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('costcenters').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('costcenters').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('costcenters').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

});