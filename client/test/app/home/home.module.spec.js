'use strict';

describe('home', function() {
    
    var $state,
        $rootScope,
        $injector,
        state = 'home';

    beforeEach(function() {
        module('ui.router');
        module('adams.home');
        
        inject(function (_$state_, $templateCache, _$rootScope_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $templateCache.put('home/home.tpl.html', '');
        });

    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/home');
    });

});