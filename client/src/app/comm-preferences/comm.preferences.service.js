'use strict';

(function () {

    angular.module('adams.communication.preferences.service', [])
        .factory('CommPreferencesService', ['$http', 'ADAMS_URL_SPACE', '$q', function($http, ADAMS_URL_SPACE, $q) {
            var commPreferencesService = {};

            commPreferencesService.getCommPreferences = function(userName) {
                var url = ADAMS_URL_SPACE.urls.local.commPreferences.replace('{userName}', userName);

                return $http.get(url)
                    .then(function(response) {
                        return response.data;
                    }, function(error) {
                        console.error('An error occurred getting comm preferences details data', error);
                        return 'error';
                    });
            };

            commPreferencesService.addCommPreferences = function(userName, communicationDetails) {
                var body,
                    url = ADAMS_URL_SPACE.urls.local.commPreferences.replace('{userName}', userName);

                body = communicationDetails;

                return $http.post(url, body)
                    .then(function(response) {
                        return response.data;
                    }, function(error) {
                        console.error('An error occurred getting comm preferences details data', error);
                        return 'error';
                    });
            };

            commPreferencesService.updateCommPreferences = function(userName, communicationDetails, communication_preference_code) {
                var body,
                    url = ADAMS_URL_SPACE.urls.local.updateCommPreferences.replace('{userName}', userName).replace('{communicationPreferencesCode}', communication_preference_code);

                body = communicationDetails;

                return $http.put(url, body)
                    .then(function(response) {
                        return response.data;
                    }, function(error) {
                        console.error('An error occurred getting comm preferences details data', error);
                        return 'error';
                    });
            };

            return commPreferencesService;

        }]);
})();

