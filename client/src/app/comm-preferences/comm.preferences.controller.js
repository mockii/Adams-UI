'use strict';

(function () {

    angular.module('adams.communication.preferences.controller', [])
        .controller('CommPreferencesController',  ['RBACService', '$state', 'getCommPreferences', 'CommPreferencesService', 'CompassToastr', 'ADAMS_CONSTANTS', '$log', 'blockUI',
            function (RBACService, $state, getCommPreferences, CommPreferencesService, CompassToastr, ADAMS_CONSTANTS, $log, blockUI) {
                var commPreferencesController = this;

                function initialize() {

                    if ($state.params.userName) {
                        commPreferencesController.userName = $state.params.userName;
                    }
                    else {
                        commPreferencesController.userName = RBACService.getCurrentProfile().user_name;
                    }

                    commPreferencesController.commPreferences = {};

                    if (getCommPreferences && getCommPreferences.length > 0) {
                        commPreferencesController.commPreferences.communication_medium = getCommPreferences[0].communication_medium;
                        commPreferencesController.commPreferences.communication_medium_type = getCommPreferences[0].communication_medium_type;
                        commPreferencesController.commPreferences.receive_text = getCommPreferences[0].receive_text;
                        commPreferencesController.communication_preference_code = getCommPreferences[0].communication_preference_code;
                    }
                    else {
                        commPreferencesController.commPreferences.communication_medium = commPreferencesController.phone_number || null;
                        commPreferencesController.commPreferences.communication_medium_type = ADAMS_CONSTANTS.COMM_MEDIUM_TYPE;
                        commPreferencesController.commPreferences.receive_text = false;
                        commPreferencesController.phone_number = '';
                    }
                }

                commPreferencesController.updateUser = function() {
                    blockUserPortlets();
                    if (commPreferencesController.communication_preference_code) {
                        CommPreferencesService.updateCommPreferences(commPreferencesController.userName, commPreferencesController.commPreferences, commPreferencesController.communication_preference_code).then(
                            function(response){
                                unblockUserPortlets();
                                if (response.metadata.http_status_code === '200') {
                                    CompassToastr.success("You have successfully updated your communication preferences.");
                                }
                                else {
                                    CompassToastr.error("A error occurred while updating your communication preferences.");
                                }
                            },
                            function(error){
                                unblockUserPortlets();
                                CompassToastr.error("A error occurred while updating your communication preferences.");
                                $log.error("An error occurred while getting associate data");
                            });
                    }
                    else {
                        CommPreferencesService.addCommPreferences(commPreferencesController.userName, commPreferencesController.commPreferences).then(
                            function(response){
                                unblockUserPortlets();
                                if (response.metadata.http_status_code === '200' && response.data[0]) {
                                    commPreferencesController.commPreferences.communication_medium = response.data[0].communication_medium;
                                    commPreferencesController.commPreferences.communication_medium_type = response.data[0].communication_medium_type;
                                    commPreferencesController.commPreferences.receive_text = response.data[0].receive_text;
                                    commPreferencesController.communication_preference_code = response.data[0].communication_preference_code;
                                    CompassToastr.success("You have successfully added your communication preferences.");
                                }
                                else {
                                    CompassToastr.error("A error occurred while adding your communication preferences.");
                                }
                            },
                            function(error){
                                unblockUserPortlets();
                                CompassToastr.error("A error occurred while adding your communication preferences.");
                                $log.error("An error occurred while getting associate data");
                            });
                    }
                };


                commPreferencesController.cancel = function() {
                    $state.reload();
                };

                function blockUserPortlets() {
                    blockUI.instances.get("user-info").start();
                }

                function unblockUserPortlets() {
                    blockUI.instances.get("user-info").stop();
                }


                initialize();
            }
        ]);
})();
