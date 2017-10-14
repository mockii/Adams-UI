
'use strict';

describe("App Service", function () {
    var $q, scope, state ,ADAMS_CONSTANTS, urlSpace, $httpBackend, appService;

    beforeEach(module('adams.service'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('common.url'));
    beforeEach(module('common.modules.logging'));
    beforeEach(module('adams.common.url'));

    beforeEach(inject(function($rootScope, _$httpBackend_, AppService, _$q_, ADAMS_URL_SPACE) {
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        urlSpace = ADAMS_URL_SPACE;
        appService = AppService;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should call nothing ', function(){
    });

});
