/**
 * Created by BrownB11 on 6/19/2017.
 */
(function() {
    'use strict';

    angular.module('adams.book.of.record.service', [])
        .factory('BookOfRecordService', ['$rootScope', '$http', 'ADAMS_URL_SPACE', '$q', '$log', 'RBACService', function($rootScope, $http, ADAMS_URL_SPACE, $q, $log, RBACService) {
            $log.debug('Inside factory service');

            var bookOfRecordService = {};
            var roleName = RBACService.getCurrentRoleName();
            var appName = RBACService.getRBACAppName();
            var userName = RBACService.getUsername();

            bookOfRecordService.getAllBookOfRecordDetails = function(limit, page, search, sort) {
                var bookOfRecordDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.bookOfRecords + '?userName=' + userName + '&appName=' + appName + '&roleName=' + roleName + '&limit=' + limit + '&page=' + page  + '&search=' + JSON.stringify(search) + '&sorts=' + sort;
                var request = $http({
                    method: "get",
                    url: url,
                    timeout: bookOfRecordDeferred.promise
                });
                var promise = request.then(
                    function( response ) {
                        $log.info('bookOfRecordDeferred : Show me something here');
                        return( response.data );
                    },
                    function(error) {
                        return [];
                    }
                );
                promise.abort = function() {
                    bookOfRecordDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        bookOfRecordDeferred = request = promise = null;
                    }
                );
                return( promise );
            };

            bookOfRecordService.getEmailIdsOfVendorContacts = function (contactInfo) {
                var emailIds = [];
                for(var index = 0; index < contactInfo.length; index++){
                    var contact = contactInfo[index];
                    if(contact.notify_for_openings_closings){
                        emailIds.push(contact.email);
                    }
                }
                return emailIds;
            };

            return bookOfRecordService;

        }]);

})();
