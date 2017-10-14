'use strict';

(function () {

    angular.module('adams.associates.temp.search.service', [])
        .factory('AssociatesSearchService', ['$rootScope', '$state', '$http', 'ADAMS_URL_SPACE', '$q', 'blockUI', 'CompassToastr', '$timeout',
            function($rootScope, $state, $http, ADAMS_URL_SPACE, $q, blockUI, CompassToastr, $timeout) {
            var associatesSearchService = {};

            associatesSearchService.getTempAssociates = function(limit, page, sort, searchInput) {
                var associatesSearchDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.tempAssociates + '?limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: associatesSearchDeferred.promise
                });

                var promise = request.then(
                    function( response ) {
                        return( response.data );
                    },
                    function(error) {
                        return error;
                    }
                );

                promise.abort = function() {
                    associatesSearchDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        associatesSearchDeferred = request = promise = null;
                    }
                );


                return( promise );
            };

            associatesSearchService.getTempAssociateInfo = function(personnelNumber) {
                var url = ADAMS_URL_SPACE.urls.local.modifyTempAssociate.replace('{personnel_number}', personnelNumber);
                
                return $http.get(url)
                    .then(function(response) {
                        return response.data;
                    }, function(error) {
                        console.error('An error occurred adding Temp Associates', error.data);
                        return 'error';
                    });
            };

            associatesSearchService.addTempAssociate = function(tempAssociateRequest) {
                var url = ADAMS_URL_SPACE.urls.local.tempAssociates;

                return $http.post(url, tempAssociateRequest)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        console.error('An error occurred adding Temp Associates', error.data);
                        return 'error';
                    });
            };

            associatesSearchService.changeTempAssociate = function(associateInfo, personnelNumber) {
                var url = ADAMS_URL_SPACE.urls.local.modifyTempAssociate.replace('{personnel_number}', personnelNumber);

                return $http.put(url, associateInfo)
                    .then(function(response) {
                        return response;
                    }, function(error) {
                        console.error('An error occurred modifying Temp Associate info', error.data);
                        return 'error';
                    });
            };

            associatesSearchService.getTempAssociateEngagements = function(personnelNumber, limit, page, sort, searchInput) {
                var associatesSearchDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.tempAssociatesEngagements.replace('{personnel_number}', personnelNumber) + '?limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);
                
                var request = $http({
                    method: "get",
                    url: url,
                    timeout: associatesSearchDeferred.promise
                });
            
                var promise = request.then(
                    function( response ) {
                        return( response.data );
                    },
                    function(error) {
                        return error;
                    }
                );
            
                promise.abort = function() {
                    associatesSearchDeferred.resolve();
                };
            
                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        associatesSearchDeferred = request = promise = null;
                    }
                );
            
            
                return( promise );
            };

            associatesSearchService.getTimeTrackingSystems = function() {
                var url = ADAMS_URL_SPACE.urls.local.timeTrackingSystems;

                return $http.get(url)
                    .then(function(response) {
                        return response.data;
                    }, function(error) {
                        console.error('An error occurred getting Time Tracking Systems', error.data);
                        return 'error';
                    });
            };

            associatesSearchService.getAllJobs = function(sourceSystemId, fields, limit, page, sort, searchInput) {
                var jobsSearchDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.jobs + '?source_system_id=' + sourceSystemId + '&fields=' + fields + '&limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);
                
                var request = $http({
                    method: "get",
                    url: url,
                    timeout: jobsSearchDeferred.promise
                });

                var promise = request.then(
                    function( response ) {
                        return( response.data );
                    },
                    function(error) {
                        return error;
                    }
                );

                promise.abort = function() {
                    jobsSearchDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        jobsSearchDeferred = request = promise = null;
                    }
                );


                return( promise );
            };

            associatesSearchService.getVendorDetails = function(fields) {
                var url = ADAMS_URL_SPACE.urls.local.vendors + '?fields=' + fields;
                
                return $http.get(url)
                    .then(function(response) {
                        return response.data;
                    }, function(error) {
                        console.error('An error occurred getting Vendor Details', error.data);
                        return 'error';
                    });
            };

            associatesSearchService.getCostCenterDetails = function(limit, page, sort, costCenterSearchInput, fields) {
                var costCenterSearchDeferred = $q.defer(),
                    url = ADAMS_URL_SPACE.urls.local.costCenters + '?fields=' + fields + '&limit=' + limit + '&page=' + page + '&sort=' + sort + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput);

                var request = $http({
                    method: "get",
                    url: url,
                    timeout: costCenterSearchDeferred.promise
                });

                var promise = request.then(
                    function( response ) {
                        return( response.data );
                    },
                    function(error) {
                        return error;
                    }
                );

                promise.abort = function() {
                    costCenterSearchDeferred.resolve();
                };

                promise.finally(
                    function() {
                        promise.abort = angular.noop;
                        costCenterSearchDeferred = request = promise = null;
                    }
                );


                return( promise );
            };

            associatesSearchService.saveAssociateInfo = function(personnelNumber, associatesInfo, path, timeTrackingSystem) {
                blockTempAssociatePortlets();
                if (!personnelNumber) {
                    var tempAssociateRequest = {'associates': associatesInfo};

                    associatesSearchService.addTempAssociate(JSON.stringify(tempAssociateRequest)).then(
                        function(response){
                            unblockTempAssociatePortlets();
                            if(response === 'error') {
                                CompassToastr.warning('An error occurred while adding Associate info');
                            }
                            else {
                                CompassToastr.success('Temporary Associate Info Saved');
                                
                                var associateData = response.data.data[0];

                                if (path) {
                                    $state.go(path, { time_tracking_system: timeTrackingSystem });
                                }
                                else {
                                    $state.go('addTempAssociates', { personnel_number: associateData.personnel_number, time_tracking_system: timeTrackingSystem });
                                }
                            }
                        });
                }
                else {
                    associatesSearchService.changeTempAssociate(associatesInfo, personnelNumber).then(
                        function(response){
                            unblockTempAssociatePortlets();
                            if(response === 'error') {
                                CompassToastr.warning('An error occurred while updating Associate info');
                            }
                            else {
                                CompassToastr.success('Temporary Associate Info Saved');

                                if (path) {
                                    $state.go(path, { time_tracking_system: timeTrackingSystem });
                                }
                                else {
                                    $state.go('addTempAssociates', { associateSearchData: null, personnel_number: personnelNumber, time_tracking_system: timeTrackingSystem }, {reload: true});
                                }
                            }
                        });
                }
            };

            /** PRIVATE FUNCTIONS **/
            function blockTempAssociatePortlets() {
                blockUI.instances.get("add-temp-associate").start();
            }

            function unblockTempAssociatePortlets() {
                //added a slight buffer here to allow the UI to finish executing the repeaters for roles and teams before we unblock the UI
                $timeout(function(){
                    blockUI.instances.get("add-temp-associate").stop();
                },500);
            }

            return associatesSearchService;
            
        }]);
})();
