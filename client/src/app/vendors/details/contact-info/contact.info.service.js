(function () {
    angular.module('adams.contact.info.service', [])
        .factory('ContactInfoService', ['$rootScope', '$http', 'ADAMS_URL_SPACE','$q', '$log', function($rootScope, $http, ADAMS_URL_SPACE, $q, $log) {

            var contactInfoService = {};

            contactInfoService.getContactInfoData = function(limit, page, sort, vendorNumber, vendorSourceSystemId, contactSearchInput) {

                var contactInfoDataDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.vendorContacts.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&contactSearchInput=' + JSON.stringify(contactSearchInput);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: contactInfoDataDeferred.promise
                });
                var promise = request.then(
                    function( response ) {
                        return( response.data );
                    },
                    function(error) {
                        $log.error(error);
                        return $q.reject(error);
                    }
                );

                promise.abort = function() {
                    contactInfoDataDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        contactInfoDataDeferred = request = promise = null;
                    }
                );
                return( promise );
            };

            contactInfoService.deleteContactInfo = function(vendorNumber, vendorContactId, vendorSourceSystemId) {

                var url = ADAMS_URL_SPACE.urls.local.deleteVendorContact.replace('{vendorNumber}', vendorNumber).replace('{vendorContactId}', vendorContactId) + '?vendorSourceSystemId=' + vendorSourceSystemId;

                return $http.delete(url)
                    .then(function (response) {
                        return response.data;
                    }, function (error) {
                        console.error('An error occurred while deleting contact info data', error.data);
                        return 'error';
                    });
            };

            contactInfoService.addContactInfo = function(vendorNumber, vendorSourceSystemId, vendorContactData) {

                var url = ADAMS_URL_SPACE.urls.local.addContactInfo.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId;

                return $http.post(url, vendorContactData)
                    .then(function (response) {
                        return response.data;
                    }, function (error) {
                        console.error('An error occurred while deleting contact info data', error.data);
                        return 'error';
                    });
            };

            contactInfoService.updateContactInfo = function(vendorNumber, vendorContactId, vendorSourceSystemId, vendorContactData) {

                var url = ADAMS_URL_SPACE.urls.local.updateContactInfo.replace('{vendorNumber}', vendorNumber).replace('{vendorContactId}', vendorContactId) + '?vendorSourceSystemId=' + vendorSourceSystemId;

                return $http.put(url, vendorContactData)
                    .then(function (response) {
                        return response.data;
                    }, function (error) {
                        console.error('An error occurred while updating contact info data', error.data);
                        return 'error';
                    });
            };

            return contactInfoService;
        }]);
})();