'use strict';

describe("Adams Controller", function () {
    var adamsConstants, controller, scope, $rootScope;


    beforeEach(module('adams.controller'));
    beforeEach(module('adams.common.constants'));

    beforeEach(inject(function($controller,  ADAMS_CONSTANTS, _$rootScope_) {
        $rootScope = _$rootScope_;
        adamsConstants = ADAMS_CONSTANTS;
        scope = $rootScope.$new();

        controller = $controller('AppController',
            {
                ADAMS_CONSTANTS : ADAMS_CONSTANTS
            });

    }));

    describe("Controller : AppController", function () {

        it('should exist', function() {
            expect(controller).toBeDefined();
            expect(controller.menuItems.length).toEqual(9);
        });
    });
});