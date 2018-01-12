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

        it('should exist and call isHeaderHidden ', function() {
            spyOn(controller, "isHeaderHidden").and.callThrough();
            controller.isHeaderHidden();
            expect(controller).toBeDefined();
            expect(controller.menuItems.length).toEqual(13);
            expect(controller.isHeaderHidden).toHaveBeenCalled();
        });

        /*it('should call errorHandling', function () {
            spyOn(controller, "errorHandling").and.callThrough();
            controller.errorHandling('error');
            scope.$apply();
            expect(controller.errorHandling).toHaveBeenCalledWith('error');
        });*/
    });
});