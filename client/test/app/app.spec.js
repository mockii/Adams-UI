
'use strict';

describe("adams", function () {
    var $httpBackend, scope, httpProvider;

    beforeEach(module('common.templates.app'));
    beforeEach(module('adams'));
    beforeEach(module('STGWebUtils'));
    beforeEach(module('templates.app'));
    beforeEach(module('adams.controller'));
    beforeEach(module('adams.service'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.services'));
    beforeEach(module('adams.common.filters'));
    beforeEach(module('adams.common.directives'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.costcenter.search'));
    beforeEach(module('adams.costcenter.details'));
    beforeEach(module('adams.home'));
    beforeEach(module('adams.user.administration'));
    beforeEach(module('adams.vendor.search'));
    beforeEach(module('adams.vendor.details'));
    beforeEach(module('adams.vendor.markets'));
    beforeEach(module('adams.secured.objects'));
    beforeEach(module('adams.associates.temp.search'));
    beforeEach(module('adams.add.associates.temp'));
    beforeEach(module('adams.products.search'));
    beforeEach(module('adams.products.details'));
    beforeEach(module('adams.book.of.record'));
    beforeEach(module('adams.locations.search'));
    beforeEach(module('adams.locations.details'));

    beforeEach(inject(function($rootScope, _$httpBackend_){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should call run on module run', inject(function($rootScope, $httpBackend) {
        $httpBackend.expectGET("/ui/api/application/configuration").respond({});
        $httpBackend.flush();
    }));
});