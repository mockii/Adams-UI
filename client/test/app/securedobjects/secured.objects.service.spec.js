
'use strict';

describe("Secured Objects Service Testing", function () {
    var applications, roles, secPermissions, mockedSecuredObjectsService, $q, scope, state ,ADAMS_CONSTANTS, urlSpace, $httpBackend;

    beforeEach(module('adams.secured.objects.service'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('common.url'));
    beforeEach(module('common.modules.logging'));
    beforeEach(module('adams.common.url'));

    beforeEach(function() {

        applications = JSON.parse('[{"name":"ADAMS"},{"name":"MyAdmin"},{"name":"Tip Tracker"},{"name":"OMS"}]');

        roles = JSON.parse('[{"appname":"ADAMS","roles":[{"name":"ADMIN"},{"name":"GLOBAL ADMIN"},{"name":"User"}]},{"appname":"MyAdmin","roles":[{"name":"MY ADMIN"},{"name":"GLOBAL ADMIN"},{"name":"User"}]},{"appname":"Tip Tracker","roles":[{"name":"TIP ADMIN"},{"name":"GLOBAL ADMIN"},{"name":"User"}]},{"appname":"OMS","roles":[{"name":"OMS ADMIN"},{"name":"GLOBAL ADMIN"},{"name":"User"}]}]');

        secPermissions = JSON.parse('[{"name":"Admin","secobjects":[{"name":"ADMIN","desc":"ADMIN","type":"Menu","accesstype":"WRITE"},{"name":"ADMIN_USER","desc":"ADMIN USER","type":"Menu","accesstype":"WRITE"},{"name":"INGREDIENT","desc":"INGREDIENT E","type":"Menu","accesstype":"WRITE"}]},{"name":"Global Admin","secobjects":[{"name":"GLOBAL ADMIN","desc":"GLOBAL ADMIN","type":"Menu","accesstype":"WRITE"},{"name":"GLOBAL ADMIN_USER","desc":"GLOBAL DMIN USER","type":"Menu","accesstype":"WRITE"},{"name":"GLOBAL INGREDIENT","desc":"GLOBAL INGREDIENT E","type":"Menu","accesstype":"WRITE"}]},{"name":"NoAccess","secobjects":[{"name":"NO GLOBAL ADMIN","desc":"NO GLOBAL ADMIN","type":"Menu","accesstype":"WRITE"},{"name":"NO GLOBAL ADMIN_USER","desc":"NO GLOBAL DMIN USER","type":"Menu","accesstype":"WRITE"},{"name":"NO GLOBAL INGREDIENT","desc":"NO GLOBAL INGREDIENT E","type":"Menu","accesstype":"WRITE"}]},{"name":"User","secobjects":[{"name":"USER GLOBAL ADMIN","desc":"USER GLOBAL ADMIN","type":"Menu","accesstype":"WRITE"},{"name":"USER GLOBAL ADMIN_USER","desc":"USER GLOBAL DMIN USER","type":"Menu","accesstype":"WRITE"},{"name":"USER GLOBAL INGREDIENT","desc":"USER GLOBAL INGREDIENT E","type":"Menu","accesstype":"WRITE"}]}]');

    });

    beforeEach(inject(function($rootScope, _$httpBackend_, SecuredObjectsService, _$q_, ADAMS_URL_SPACE) {
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        mockedSecuredObjectsService = SecuredObjectsService,
        urlSpace = ADAMS_URL_SPACE;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should getApplications ', function(){
        var limit = 25,
            page = 1,
            url = urlSpace.urls.local.secApplication +'?limit=' + limit + '&page=' + page;
        $httpBackend.expectGET(url).respond(applications);
        mockedSecuredObjectsService.getApplications(limit, page).then(function(response) {
            expect(response).toEqual(applications);
        });
        $httpBackend.flush();
    });

    it('should abort getApplications promise', function(){
        var limit = 25,
            page = 1,
            url = urlSpace.urls.local.secApplication +'?limit=' + limit + '&page=' + page;
        $httpBackend.expectGET(url).respond(applications);
        mockedSecuredObjectsService.getApplications(limit, page).abort();
    });

    it('should throw error getApplications', function(){
        var limit = 25,
            page = 1,
            url = urlSpace.urls.local.secApplication +'?limit=' + limit + '&page=' + page;
        $httpBackend.expectGET(url).respond(400, {});
        mockedSecuredObjectsService.getApplications(limit, page).then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should getApplicationRoles  ', function(){
        var limit = 25,
            page = 1,
            search = '',
            url = urlSpace.urls.local.secRole + '?limit=' + limit + '&page=' + page +'&application_name='+search;
        $httpBackend.expectGET(url).respond(roles);
        mockedSecuredObjectsService.getApplicationRoles(limit, page, search).then(function(response) {
            expect(response).toEqual(roles);
        });
        $httpBackend.flush();
    });

    it('should abort getApplicationRoles promise', function(){
        var limit = 25,
            page = 1,
            search = '',
            url = urlSpace.urls.local.secRole + '?limit=' + limit + '&page=' + page +'&application_name='+search;
        $httpBackend.expectGET(url).respond(roles);
        mockedSecuredObjectsService.getApplicationRoles(limit, page, search).abort();
    });

    it('should throw error getApplicationRoles', function(){
        var limit = 25,
            page = 1,
            search = '',
            url = urlSpace.urls.local.secRole + '?limit=' + limit + '&page=' + page +'&application_name='+search;
        $httpBackend.expectGET(url).respond(400, {});
        mockedSecuredObjectsService.getApplicationRoles(limit, page, search).then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should getSecuredObjectsForRole   ', function(){
        var limit = 25,
            page = 1,
            application = '',
            role = '',
            url = urlSpace.urls.local.secObjects+ '?limit=' + limit + '&page=' + page+ '&application_name='+ application + '&role_name='+role;
        $httpBackend.expectGET(url).respond(roles);
        mockedSecuredObjectsService.getSecuredObjectsForRole (limit, page, application, role).then(function(response) {
            expect(response).toEqual(roles);
        });
        $httpBackend.flush();
    });

    it('should abort getSecuredObjectsForRole promise', function(){
        var limit = 25,
            page = 1,
            application = '',
            role = '',
            url = urlSpace.urls.local.secObjects+ '?limit=' + limit + '&page=' + page+ '&application_name='+ application + '&role_name='+role;
        $httpBackend.expectGET(url).respond(roles);
        mockedSecuredObjectsService.getSecuredObjectsForRole (limit, page, application, role).abort();
    });

    it('should throw error getSecuredObjectsForRole ', function(){
        var limit = 25,
            page = 1,
            application = '',
            role = '',
            url = urlSpace.urls.local.secObjects+ '?limit=' + limit + '&page=' + page+ '&application_name='+ application + '&role_name='+role;
        $httpBackend.expectGET(url).respond(400, {});
        mockedSecuredObjectsService.getSecuredObjectsForRole (limit, page, application, role).then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });
});
