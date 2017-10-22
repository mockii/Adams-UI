'use strict';

describe('Access Control service testing', function () {
    var roles, overrides, applicationName, securedObjectName, accessControlService, $q, scope, urlSpace, $httpBackend;

    beforeEach(module('adams.access.control.service'));
    beforeEach(module('common.url'));
    beforeEach(module('adams.common.url'));

    beforeEach(function() {

        roles = JSON.parse('[{"role_name": "User","access_type": "Read"},{"role_name": "Application Owner","access_type": "Read" }]');
        overrides = JSON.parse('[{"criteria": "If this happens then that should happen","access_type": "Read"}]');
        securedObjectName = 'Dashboard';
        applicationName = 'OMS';

    });

    beforeEach(inject(function($rootScope, _$httpBackend_, AccessControlService, _$q_, ADAMS_URL_SPACE) {
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        urlSpace = ADAMS_URL_SPACE;
        accessControlService = AccessControlService;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getRolesForSecuredObject Testing', function () {

        it('should get roles for secured object', function () {
            var limit = 25,
                page = 1,
                url = urlSpace.urls.local.rolesForSecuredObject.replace('{applicationName}', applicationName).replace('{securedObjectName}', securedObjectName) + '?limit=' + limit + '&page=' + page;

            $httpBackend.expectGET(url).respond(roles);
            accessControlService.getRolesForSecuredObject(limit, page, applicationName, securedObjectName).then(function(response) {
                expect(response).toEqual(roles);
            });
            $httpBackend.flush();
        });

        it('should throw error getRolesForSecuredObject', function(){
            var limit = 25,
                page = 1,
                url = urlSpace.urls.local.rolesForSecuredObject.replace('{applicationName}', applicationName).replace('{securedObjectName}', securedObjectName) + '?limit=' + limit + '&page=' + page;
            $httpBackend.expectGET(url).respond(400, {});
            accessControlService.getRolesForSecuredObject(limit, page, applicationName, securedObjectName).then(function(response) {
                expect(response).toEqual([]);
            });
            $httpBackend.flush();
            scope.$digest();
        });

        it('should abort promise getRolesForSecuredObject', function(){
            var limit = 25,
                page = 1,
                url = urlSpace.urls.local.rolesForSecuredObject.replace('{applicationName}', applicationName).replace('{securedObjectName}', securedObjectName) + '?limit=' + limit + '&page=' + page;
            $httpBackend.expectGET(url).respond(roles);
            accessControlService.getRolesForSecuredObject(limit, page, applicationName, securedObjectName).abort();
        });
    });

    describe('getOverridesForSecuredObject Testing', function () {
        it('should get overrides for secured object', function () {
            var limit = 25,
                page = 1,
                url = urlSpace.urls.local.overridesForSecuredObject.replace('{applicationName}', applicationName).replace('{securedObjectName}', securedObjectName) + '?limit=' + limit + '&page=' + page;

            $httpBackend.expectGET(url).respond(overrides);
            accessControlService.getOverridesForSecuredObject(limit, page, applicationName, securedObjectName).then(function(response) {
                expect(response).toEqual(overrides);
            });
            $httpBackend.flush();
        });

        it('should throw error getOverridesForSecuredObject', function(){
            var limit = 25,
                page = 1,
                url = urlSpace.urls.local.overridesForSecuredObject.replace('{applicationName}', applicationName).replace('{securedObjectName}', securedObjectName) + '?limit=' + limit + '&page=' + page;
            $httpBackend.expectGET(url).respond(400, {});
            accessControlService.getOverridesForSecuredObject(limit, page, applicationName, securedObjectName).then(function(response) {
                expect(response).toEqual([]);
            });
            $httpBackend.flush();
            scope.$digest();
        });

        it('should abort promise getOverridesForSecuredObject', function(){
            var limit = 25,
                page = 1,
                url = urlSpace.urls.local.overridesForSecuredObject.replace('{applicationName}', applicationName).replace('{securedObjectName}', securedObjectName) + '?limit=' + limit + '&page=' + page;
            $httpBackend.expectGET(url).respond(overrides);
            accessControlService.getOverridesForSecuredObject(limit, page, applicationName, securedObjectName).abort();
        });
    });

});