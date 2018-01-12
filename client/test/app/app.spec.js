
'use strict';

describe("adams", function () {
    var $httpBackend, scope, httpProvider ={};

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

    beforeEach(inject(function($rootScope, _$httpBackend_, $location){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        $location = $location;
        httpProvider = {"transformResponse":[null],"transformRequest":[null],"headers":{"common":{"Accept":"application/json, text/plain, */*"},"post":{"Content-Type":"application/json;charset=utf-8"},"put":{"Content-Type":"application/json;charset=utf-8"},"patch":{"Content-Type":"application/json;charset=utf-8"},"get":{"If-Modified-Since":"0"}},"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","cache":false};
    }));

    beforeEach(
        inject( function (_$httpBackend_, $controller, $rootScope, $http) {
            $httpBackend = _$httpBackend_;
            /*$httpBackend.expectGET('/ui/api/application/configuration')
                .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);*/

            scope = $rootScope.$new();
        }),
        module(function ($provide, $urlRouterProvider) {
            $urlRouterProvider.otherwise( function(){ return false; });
            $urlRouterProvider.deferIntercept();
            $provide.provider('$http', httpProvider);
        })
    );

    afterEach(function () {
        //$httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should call run on module run', inject(function($rootScope, $httpBackend) {
        $httpBackend.expectGET("/ui/api/pos/system_categories").respond({'data':{}});
        $httpBackend.expectGET("/ui/api/application/configuration").respond({});
        $httpBackend.flush();
    }));

    it('redirects to otherwise page after locationChangeSuccess', inject(function($rootScope, $location, $http) {
        $location.path('/nonExistentPath');
        $rootScope.$emit("$locationChangeSuccess");
        expect($location.path()).toBe("/");
    }));
});