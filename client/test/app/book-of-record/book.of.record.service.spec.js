
'use strict';

describe("BookOfRecordService Service Testing", function () {
    var bookOfRecords, mockedBookOfRecordService, $q, scope, urlSpace, $httpBackend, roleName, appName, userName, mockedRBACService=[];

    beforeEach(module('adams.book.of.record.service'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('common.url'));
    beforeEach(module('common.modules.logging'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('common.services.RBAC'));
    beforeEach(module('common.settings.oauth'));
    beforeEach(module('ui.router'));
    beforeEach(module('common.constants'));

    beforeEach(function() {

        bookOfRecords = JSON.parse('[{"name":"ADAMS"},{"name":"MyAdmin"},{"name":"Tip Tracker"},{"name":"OMS"}]');
        roleName = 'Admin';
        appName = 'ADAMS';
        userName = 'TALEKO01';

    });

    beforeEach(function() {
        module(function ($provide) {
            $provide.value('RBACService', mockedRBACService);
        });
    });

    beforeEach(inject(function($rootScope, _$httpBackend_, BookOfRecordService, _$q_, ADAMS_URL_SPACE) {
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        mockedBookOfRecordService = BookOfRecordService,
        urlSpace = ADAMS_URL_SPACE;
    }));

    mockedRBACService.getCurrentRoleName = function () {
        return roleName;
    };

    mockedRBACService.getUsername = function () {
        return userName;
    };

    mockedRBACService.getRBACAppName = function () {
        return appName;
    };


    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should getAllBookOfRecordDetails ', function(){
        var limit = 25,
            page = 1,
            search = {},
            sort = '',
            url = urlSpace.urls.local.bookOfRecords + '?userName=' + userName + '&appName=' + appName + '&roleName=' + roleName + '&limit=' + limit + '&page=' + page  + '&search=' + JSON.stringify(search) + '&sorts=' + sort;

        console.log(mockedRBACService);

        $httpBackend.expectGET(url).respond(bookOfRecords);
        mockedBookOfRecordService.getAllBookOfRecordDetails(limit, page, search, sort).then(function(response) {
            expect(response).toEqual(bookOfRecords);
        });
        $httpBackend.flush();
    });

    it('should throw error getAllBookOfRecordDetails', function(){
        var limit = 25,
            page = 1,
            search = {},
            sort = '',
            url = urlSpace.urls.local.bookOfRecords + '?userName=' + userName + '&appName=' + appName + '&roleName=' + roleName + '&limit=' + limit + '&page=' + page  + '&search=' + JSON.stringify(search) + '&sorts=' + sort;
        $httpBackend.expectGET(url).respond(400, {});
        mockedBookOfRecordService.getAllBookOfRecordDetails(limit, page, search, sort).then(function(response) {
            expect(response).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should abort promise ', function(){
        var limit = 25,
            page = 1,
            search = {},
            sort = '',
            url = urlSpace.urls.local.bookOfRecords + '?userName=' + userName + '&appName=' + appName + '&roleName=' + roleName + '&limit=' + limit + '&page=' + page  + '&search=' + JSON.stringify(search) + '&sorts=' + sort;
        $httpBackend.expectGET(url).respond(bookOfRecords);
        mockedBookOfRecordService.getAllBookOfRecordDetails(limit, page, search, sort).abort();
    });
    
    it("should get emailids from vendor contacts who have opted for notifications", function () {
        var contactInfo = [
                            {'notify_for_openings_closings':true, 'email':'michael_scott@gmail.com'},
                            {'notify_for_openings_closings':false, 'email':'dwight_schrute@gmail.com'},
                            {'notify_for_openings_closings':true, 'email':'jim_halpert@gmail.com'}
                            ];

        var actualEmailIds = mockedBookOfRecordService.getEmailIdsOfVendorContacts(contactInfo);

        expect(actualEmailIds).toBeDefined();
        expect(actualEmailIds).toContain('michael_scott@gmail.com');
        expect(actualEmailIds).toContain('jim_halpert@gmail.com');

    });
});
