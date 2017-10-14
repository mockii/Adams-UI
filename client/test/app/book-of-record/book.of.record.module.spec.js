
'use strict';

describe('adams.book.of.record', function() {
    var $ocLazyLoadMock,
        $state,
        $rootScope,
        $scope,
        $injector,
        $ocLazyLoad,
        state = 'bookofrecord';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.book.of.record.controller');
        module('adams.book.of.record.service');
        module('adams.contact.info.modal.controller');

        module('adams.book.of.record', function ($provide) {
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
                    files:['css/bookofrecord.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });

            $templateCache.put('book-of-record/book.of.record.tpl.html', '');
        });
    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/bookofrecord');
    });

    it('bookofrecord resolve deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('bookofrecord').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('bookofrecord').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('bookofrecord').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));
});