'use strict';

describe('CommPreferencesService', function() {
  
    var scope,
        sampleSvcObj,
        urlSpace,
        userName,
        communication_preference_code,
        $q,
        getCommPreferences,
        addCommPreferences,
        updateCommPreferences,
        $httpBackend;

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.communication.preferences.service'));
    beforeEach(module('mockedObjectsData'));

    beforeEach(function () {
        module(function ($provide) {

        });
    });

    beforeEach(inject(function($rootScope, _$httpBackend_, CommPreferencesService, _$q_, ADAMS_URL_SPACE, defaultObjects){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = CommPreferencesService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;
        userName = 'vasiru01';
        communication_preference_code = '0C3GAZQ';
        getCommPreferences = defaultObjects.getCommPreferences;
        addCommPreferences = defaultObjects.addCommPreferences;
        updateCommPreferences = defaultObjects.updateCommPreferences;
    }));

    it('should get CommPreferences Info by user', function(){
        var url = urlSpace.urls.local.commPreferences.replace('{userName}', userName);
      
        $httpBackend.expectGET(url).respond(getCommPreferences);

        sampleSvcObj.getCommPreferences(userName).then(function(data) {
            expect(data).toEqual(getCommPreferences);
        });
        $httpBackend.flush();
    });

    it('should error out CommPreferences Info by user', function(){
        var url = urlSpace.urls.local.commPreferences.replace('{userName}', userName);

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getCommPreferences(userName).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should add CommPreferences Info by user', function(){
        var url = urlSpace.urls.local.commPreferences.replace('{userName}', userName);

        $httpBackend.expectPOST(url).respond(addCommPreferences);

        sampleSvcObj.addCommPreferences(userName, getCommPreferences).then(function(data) {
            expect(data).toEqual(addCommPreferences);
        });
        $httpBackend.flush();
    });

    it('should error out CommPreferences Info by user', function(){
        var url = urlSpace.urls.local.commPreferences.replace('{userName}', userName);

        $httpBackend.expectPOST(url).respond(400, {});

        sampleSvcObj.addCommPreferences(userName, getCommPreferences).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should update CommPreferences Info by user', function(){
        var url = urlSpace.urls.local.updateCommPreferences.replace('{userName}', userName).replace('{communicationPreferencesCode}', communication_preference_code);

        $httpBackend.expectPUT(url).respond(updateCommPreferences);

        sampleSvcObj.updateCommPreferences(userName, getCommPreferences, communication_preference_code).then(function(data) {
            expect(data).toEqual(updateCommPreferences);
        });
        $httpBackend.flush();
    });

    it('should error out CommPreferences Info by user', function(){
        var url = urlSpace.urls.local.updateCommPreferences.replace('{userName}', userName).replace('{communicationPreferencesCode}', communication_preference_code);

        $httpBackend.expectPUT(url).respond(400, {});

        sampleSvcObj.updateCommPreferences(userName, getCommPreferences,communication_preference_code).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
    });

});