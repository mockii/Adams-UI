'use strict';

(function () {

    angular.module('adams.add.associates.temp.controller', ['adams.common.user.grid.controller', 'adams.common.jobs.grid.controller', 'adams.associates.temp.search.service', 'adams.common.cost.center.grid.controller', 'common.modules.logging'])
        .controller('AddAssociatesController', ['$rootScope', '$scope', '$state', '$timeout', '$uibModal', 'CompassToastr', 'ModalDialogService', 'ADAMS_CONSTANTS', 'AssociatesSearchService', 'personnelNumber', 'associateData', 'timeTrackingSystems', 'agencies', 'UserAdministrationService', 'blockUI', 'timeTrackingSystem', '$document', '$log', 'Utils',
                    function($rootScope, $scope, $state, $timeout, $uibModal, CompassToastr, ModalDialogService, ADAMS_CONSTANTS, AssociatesSearchService, personnelNumber, associateData, timeTrackingSystems, agencies, UserAdministrationService, blockUI, timeTrackingSystem, $document, $log, Utils) {
                        var addAssociatesController = this;
                        var searchProperty = "active_engagement";

                function initialize() {
                    addAssociatesController.associateInfo = [];
                    addAssociatesController.vendorFields = '';
                    addAssociatesController.vendorSearchInput = '';
                    addAssociatesController.isCollapsed = false;
                    addAssociatesController.showLoading = false;
                    addAssociatesController.showHistoryInfo = false;
                    addAssociatesController.showEngagementHistoryInfo = false;                    
                    addAssociatesController.activeEngagement = false;
                    addAssociatesController.priorEngagements = false;
                    addAssociatesController.timeTrackingSystems = timeTrackingSystems.data;
                    addAssociatesController.agencies = agencies.data;
                    addAssociatesController.jobSourceSystemId = '';
                    addAssociatesController.costCenterSourceSystemId = '';
                    
                    addAssociatesController.appName = $rootScope.applicationConfiguration.application.name;
                    addAssociatesController.loginRoleName = UserAdministrationService.getRoleName();
                    
                    if ($state.params.associateSearchData) {
                        addAssociatesController.associateSearchData = $state.params.associateSearchData;
                        addAssociatesController.associateSearchDataLength = Object.keys(addAssociatesController.associateSearchData).length;
                        $state.current.data.pageTitle = addAssociatesController.associateSearchData.last_name + ', ' + addAssociatesController.associateSearchData.first_name;
                    }
                    else if (associateData) {
                        addAssociatesController.associateSearchData = associateData.data[0];
                        addAssociatesController.associateSearchDataLength = Object.keys(addAssociatesController.associateSearchData).length;
                        $state.current.data.pageTitle = addAssociatesController.associateSearchData.last_name + ', ' + addAssociatesController.associateSearchData.first_name;
                    }
                    else {
                        addAssociatesController.associateSearchData = null;
                        addAssociatesController.associateSearchDataLength = 0;
                        $state.current.data.pageTitle = 'Create Temp Associate';
                    }

                    if (!addAssociatesController.associateSearchData && !personnelNumber) {
                        addAssociatesController.associateInfo = [];
                        if (timeTrackingSystem) {
                            addAssociatesController.timeTracking =  {"time_tracking_system": timeTrackingSystem};
                            addAssociatesController.timeTrackingDefault = true;
                        }
                        else {
                            addAssociatesController.timeTracking = ' ';
                            addAssociatesController.timeTrackingDefault = false;
                        }
                    }
                    else if (addAssociatesController.associateSearchDataLength > 0) {
                        addAssociatesController.loadDetails(addAssociatesController.associateSearchData);
                        if (addAssociatesController.timeTracking === ' ' && timeTrackingSystem) {
                            addAssociatesController.timeTracking =  {"time_tracking_system": timeTrackingSystem};
                            addAssociatesController.timeTrackingDefault = true;
                        }
                    }
                    
                    addAssociatesController.searchInput = {};
                   
                    addAssociatesController.gridOptions = definePriorEngagementGridOptions();
                    
                    $timeout(function() {
                        addAssociatesController.isCollapsed = true;
                    }, 5);
                    
                    addAssociatesController.birthDatePopup = {
                        opened: false
                    };
                    
                    addAssociatesController.startDatePopup = {
                        opened: false
                    };
                    
                    addAssociatesController.endDatePopup = {
                        opened: false
                    };
                }

                addAssociatesController.go = function(path) {
                    $state.go(path,{ time_tracking_system: timeTrackingSystem });
                };

                addAssociatesController.submit = function(path) {
                    addAssociatesController.saveAssociateData(path);
                };

                addAssociatesController.getAssociateData = function() {
                    AssociatesSearchService.getTempAssociateInfo(addAssociatesController.associateInfo.personnel_number).then(
                        function(response){

                            if (response.data === '{}') {
                                $timeout(function() {
                                    addAssociatesController.errorMessage = 'An error occurred while getting associate data';
                                    addAssociatesController.errorHandling(addAssociatesController.errorMessage);
                                }, 500);
                            }
                            else {
                                addAssociatesController.loadDetails(response.data[0]);
                                $timeout(function() {
                                    $('.agency-selector').selectpicker('refresh');                                 
                                }, 500);
                            }
                        },
                        function(error){
                            $log.error("An error occurred while getting associate data");
                        });
                };

                addAssociatesController.saveAssociateData = function(path) {
                    var birthDate = new Date(addAssociatesController.associateInfo.birthdate),
                        startDate = new Date(addAssociatesController.associateInfo.start_date),
                        endDate;

                    if (addAssociatesController.associateInfo.end_date) {
                        endDate = new Date(addAssociatesController.associateInfo.end_date);
                        endDate = endDate.getTime();
                    }
                    else {
                        endDate = addAssociatesController.associateInfo.end_date;
                    }

                    birthDate = birthDate.getTime();
                    startDate = startDate.getTime();

                    var associatesInfo = {
                        'username': addAssociatesController.associateInfo.user_name || '',
                        'first_name':  addAssociatesController.associateInfo.first_name,
                        'middle_name': addAssociatesController.associateInfo.middle_name || '',
                        'last_name': addAssociatesController.associateInfo.last_name,
                        'birthdate': birthDate,
                        'last_four_ssn': addAssociatesController.associateInfo.last_four_ssn,
                        'email': addAssociatesController.associateInfo.email,
                        'phone_number': addAssociatesController.associateInfo.phone_number,
                        'time_tracking_system': addAssociatesController.timeTracking.time_tracking_system,
                        'cost_center_name': addAssociatesController.associateInfo.cost_center_name,
                        'cost_center_source_system_id': addAssociatesController.associateInfo.cost_center_source_system_id,
                        'start_date': startDate,
                        'end_date': endDate,
                        'termination_date': addAssociatesController.associateInfo.termination_date || null,
                        'vendor_number': addAssociatesController.agency.vendor_number,
                        'vendor_source_system_id': addAssociatesController.agency.source_system_id || addAssociatesController.associateInfo.vendor_source_system_id,
                        'base_rate': addAssociatesController.associateInfo.base_rate,
                        'job_name': addAssociatesController.associateInfo.job_name,
                        'job_source_system_id': addAssociatesController.associateInfo.job_source_system_id,
                        'comments': addAssociatesController.associateInfo.comments
                    };

                    AssociatesSearchService.saveAssociateInfo(addAssociatesController.associateInfo.personnel_number, associatesInfo, path, timeTrackingSystem);
                };

                addAssociatesController.loadDetails = function(associateData) {

                    addAssociatesController.associateInfo = associateData || [];
                    
                    addAssociatesController.priorEngagements = true;

                    if(addAssociatesController.associateInfo.active_engagement) {
                        addAssociatesController.costCenterFullName = addAssociatesController.associateInfo.cost_center_name + ' - ' + addAssociatesController.associateInfo.cost_center_description;
                        addAssociatesController.timeTracking = {"time_tracking_system": addAssociatesController.associateInfo.time_tracking_system};
                        addAssociatesController.agency = {"vendor_number": addAssociatesController.associateInfo.vendor_number,  "vendor_name_1": addAssociatesController.associateInfo.vendor_name_1};
                        addAssociatesController.jobFullName = addAssociatesController.associateInfo.job_name + ' - ' + addAssociatesController.associateInfo.job_description;
                        addAssociatesController.timeTrackingDefault = true;
                    }
                    else {
                        addAssociatesController.startDate = '';
                        addAssociatesController.endDate = '';
                        addAssociatesController.termination_date = '';
                        addAssociatesController.costCenterFullName = '';
                        addAssociatesController.timeTracking = ' ';
                        addAssociatesController.agency = ' ';
                        addAssociatesController.jobFullName = '';
                        addAssociatesController.timeTrackingDefault = false;
                    }

                    addAssociatesController.associateInfo.createdDate = associateData ? new Date(associateData.created_date) : new Date();
                    addAssociatesController.associateInfo.modifiedDate = associateData ? new Date(associateData.modified_date) : new Date();
                    addAssociatesController.associateInfo.engagementCreatedDate = associateData ? new Date(associateData.engagement_created_date) : new Date();
                    addAssociatesController.associateInfo.engagementModifiedDate = associateData ? new Date(associateData.engagement_modified_date) : new Date();

                    addAssociatesController.associateInfo.createdDate = addAssociatesController.associateInfo.createdDate.toLocaleString();
                    addAssociatesController.associateInfo.modifiedDate = addAssociatesController.associateInfo.modifiedDate.toLocaleString();
                    addAssociatesController.associateInfo.engagementCreatedDate = addAssociatesController.associateInfo.engagementCreatedDate.toLocaleString();
                    addAssociatesController.associateInfo.engagementModifiedDate = addAssociatesController.associateInfo.engagementModifiedDate.toLocaleString();
                };

                addAssociatesController.openUserInfo = function(selectedUser) {
                    blockUserPortlets();
                    addAssociatesController.userInfo = !addAssociatesController.userInfo;
                    addAssociatesController.userDetails = !addAssociatesController.userDetails;
                    addAssociatesController.selectedUser = selectedUser.toUpperCase();

                    addAssociatesController.getUserInfo();
                };

                addAssociatesController.openEngagementsInfo = function(selectedUser) {
                    blockEngagementPortlets();
                    addAssociatesController.engagementInfo = !addAssociatesController.engagementInfo;
                    addAssociatesController.engagementDetails = !addAssociatesController.engagementDetails;
                    addAssociatesController.selectedUser = selectedUser.toUpperCase();
                    
                    addAssociatesController.getUserInfo();    
                };

                addAssociatesController.getUserInfo = function(){
                    var limit = 1,
                        page = 1,
                        sort = '',
                        searchInput = {};

                    searchInput.user_name = addAssociatesController.selectedUser;

                    UserAdministrationService.getUserDetails(limit, page, sort, searchInput, addAssociatesController.appName, addAssociatesController.loginRoleName).then(
                        function(response) {
                            addAssociatesController.selectedUserDetails = response.data[0];
                            
                            if (Object.keys(addAssociatesController.selectedUserDetails).length > 0) {
                                addAssociatesController.selectedUserName = addAssociatesController.selectedUserDetails.user_name;
                                addAssociatesController.selectedFirstName = addAssociatesController.selectedUserDetails.first_name;
                                addAssociatesController.selectedLastName = addAssociatesController.selectedUserDetails.last_name;
                                addAssociatesController.selectedEmail = addAssociatesController.selectedUserDetails.email_address;
                                addAssociatesController.selectedWorkPhone = addAssociatesController.selectedUserDetails.work_phone;
                                addAssociatesController.selectedCostCenter = addAssociatesController.selectedUserDetails.cost_center_name + ' - ' + addAssociatesController.selectedUserDetails.cost_center_description ;
                            }
                        },
                        function(error){
                            $log.error("An error occurred while getting user data");
                        }
                    );

                    unblockUserPortlets();
                    unblockEngagementPortlets();
                };

                addAssociatesController.openBirthDatePopup = function() {
                    addAssociatesController.birthDatePopup.opened = true;
                };

                addAssociatesController.openStartDatePopup = function() {
                    addAssociatesController.startDatePopup.opened = true;
                };

                addAssociatesController.openEndDatePopup = function() {
                    addAssociatesController.endDatePopup.opened = true;
                };

                addAssociatesController.showHistory = function() {
                    addAssociatesController.showHistoryInfo = !addAssociatesController.showHistoryInfo;
                    addAssociatesController.userInfo = true;
                    addAssociatesController.userDetails = false;
                };

                addAssociatesController.showEngagementHistory = function() {
                    addAssociatesController.showEngagementHistoryInfo = !addAssociatesController.showEngagementHistoryInfo;
                    addAssociatesController.engagementInfo = true;
                    addAssociatesController.engagementDetails = false;
                };

                addAssociatesController.getGridData = function(pageSize, pageNumber, sort, searchInput) {
                    if (addAssociatesController.priorEngagements) {
                        if (!searchInput.search) {
                            searchInput.search = [];
                        }
                        // delete if exist
                        if(Utils.checkIfSearchObjectPresent(searchProperty, searchInput.search)){
                            var index = searchInput.search.findIndex(Utils.getSearchIndex, searchProperty);
                            searchInput.search.splice(index,1);
                        }
                        searchInput.search.push({
                            "property": searchProperty,
                            "value": false,
                            "operator": ""
                        });
                        //addAssociatesController.searchInput.active_engagement = false;
                        //addAssociatesController.search = angular.extend({}, addAssociatesController.searchInput, searchInput);
                        addAssociatesController.search = searchInput;
                        return AssociatesSearchService.getTempAssociateEngagements(addAssociatesController.associateInfo.personnel_number, pageSize, pageNumber, sort, addAssociatesController.search);
                    }
                };

                addAssociatesController.endEngagement = function() {
                    addAssociatesController.associateInfo.termination_date = new Date();
                    addAssociatesController.associateInfo.termination_date = addAssociatesController.associateInfo.termination_date.getTime();
                    
                    ModalDialogService.confirm({
                        bodyText: 'Are you sure want to end the Current Engagement?',
                        title: 'Confirmation',
                        okText: 'Ok'
                    }).then(function() {
                        addAssociatesController.saveAssociateData();
                    },
                        function(){
                            $log.error("An error occurred while saving Temp Associate info for " + addAssociatesController.userName);
                        });
                };

                addAssociatesController.openGrid = function() {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'common/userGrid/userGrid.tpl.html',
                        controller: 'UserGridController as userGridController',
                        size: 'md',
                        backdrop: 'static'
                    });

                    modalInstance.result.then(function (selectedRows) {
                        addAssociatesController.associateInfo.user_name = selectedRows[0].user_name;
                        addAssociatesController.associateInfo.first_name = selectedRows[0].first_name;
                        addAssociatesController.associateInfo.middle_name = selectedRows[0].middle_name;
                        addAssociatesController.associateInfo.last_name = selectedRows[0].last_name;
                        addAssociatesController.associateInfo.phone_number = selectedRows[0].mobile_phone;
                        addAssociatesController.associateInfo.email = selectedRows[0].email_address;
                    }, function () {
                        $log.log('Modal dismissed at: ' + new Date());

                    });
                };

                addAssociatesController.openJobsGrid = function() {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'common/jobs/jobsGrid.tpl.html',
                        controller: 'JobsGridController as jobsGridController',
                        size: 'md',
                        backdrop: 'static',
                        resolve: {
                            timeTrackingSystem: function() {
                                return addAssociatesController.timeTracking.time_tracking_system;
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedRows) {
                        addAssociatesController.associateInfo.job_name = selectedRows[0].job_name;
                        addAssociatesController.associateInfo.job_description = selectedRows[0].job_description;
                        addAssociatesController.jobFullName = selectedRows[0].job_name + ' - ' + selectedRows[0].job_description;
                        addAssociatesController.associateInfo.job_source_system_id = selectedRows[0].source_system_id;
                    }, function () {
                        $log.log('Modal dismissed at: ' + new Date());
                    });
                };

                addAssociatesController.openCostCenterGrid = function() {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'common/costCenterGrid/costCenterGrid.tpl.html',
                        controller: 'CostCenterGridController as costCenterGridController',
                        size: 'md',
                        backdrop: 'static',
                        resolve: {
                            timeTrackingSystem: function() {
                                return addAssociatesController.timeTracking.time_tracking_system;
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedRows) {
                        addAssociatesController.associateInfo.cost_center_name = selectedRows[0].cost_center;
                        addAssociatesController.associateInfo.cost_center_description = selectedRows[0].cost_center_description;
                        addAssociatesController.costCenterFullName = selectedRows[0].cost_center + ' - ' + selectedRows[0].cost_center_description;
                        addAssociatesController.associateInfo.cost_center_source_system_id = selectedRows[0].source_system_id;
                    }, function () {
                        $log.log('Modal dismissed at: ' + new Date());
                    });
                };
                
                addAssociatesController.errorHandling = function(errorMessage) {
                    ModalDialogService.confirm({
                        bodyText: errorMessage,
                        title: 'Error Message',
                        okText: 'Ok'
                    });
                };

                addAssociatesController.clearPersonalInfo = function() {
                    addAssociatesController.associateInfo.user_name = '';
                    addAssociatesController.associateInfo.first_name = '';
                    addAssociatesController.associateInfo.middle_name = '';
                    addAssociatesController.associateInfo.last_name = '';
                    addAssociatesController.associateInfo.personnel_number = '';
                    addAssociatesController.associateInfo.birthdate = '';
                    addAssociatesController.associateInfo.email = '';
                    addAssociatesController.associateInfo.phone_number = '';
                    addAssociatesController.associateInfo.last_four_ssn = '';
                };

                addAssociatesController.clearEngagement = function() {
                    addAssociatesController.associateInfo.start_date = '';
                    addAssociatesController.associateInfo.end_date = '';
                    addAssociatesController.associateInfo.cost_center_name = '';
                    addAssociatesController.associateInfo.cost_center_description = '';
                    addAssociatesController.associateInfo.agency = ' ';
                    if(!addAssociatesController.timeTrackingDefault) {
                        var elem = $document.find('.time-tracking');
                        elem = angular.element(elem);
                        elem.val(' ');
                        elem.selectpicker('refresh');
                    }
                    var agencyElem = $document.find('.agency-selector');
                    agencyElem = angular.element(agencyElem);
                    agencyElem.val(' ');
                    agencyElem.selectpicker('refresh');


                    addAssociatesController.associateInfo.base_rate = '';
                    addAssociatesController.associateInfo.job_name = '';
                    addAssociatesController.associateInfo.job_description = '';
                    addAssociatesController.associateInfo.comments = '';
                    addAssociatesController.jobFullName = '';
                    addAssociatesController.costCenterFullName = '';
                };

                /** PRIVATE FUNCTIONS **/
                function definePriorEngagementGridOptions() {
                    return {
                        paginationPageSizes: [25, 50, 75],
                        paginationPageSize: 25, // pagination out of box
                        virtualizationThreshold: 25,
                        useExternalPagination: true,
                        useExternalFiltering: true,
                        enableFiltering: true, //step1 to enable all grid columns filtering
                        enableRowSelection: true,
                        enableRowHeaderSelection: false,
                        multiSelect: false,
                        modifierKeysToMultiSelect: false,
                        noUnselect: true,
                        showColumnFooter: false,
                        enableGridMenu: true, //true will display grid menu on top-right
                        enableSorting: true,
                        columnDefs: [
                            {   field: 'start_date',
                                displayName: "Start Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy\'',
                                minWidth: 100,
                                enableFiltering: false
                            },
                            {   field: 'end_date',
                                displayName: "End Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy\'',
                                minWidth: 100,
                                enableFiltering: false
                            },
                            {   field: 'termination_date',
                                displayName: "Termination Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy\'',
                                minWidth: 10,
                                enableFiltering: false
                            },
                            {   field: 'cost_center_name',
                                displayName: "Cost Center",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }

                            },
                            {   field: 'vendor_name_1',
                                displayName: "Agency",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'base_rate',
                                displayName: "Bill Rate",
                                cellFilter: 'currency',
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'comments',
                                displayName: "Comments",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'engagement_created_by',
                                displayName: "Created By",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'engagement_created_date',
                                displayName: "Created Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy\'',
                                minWidth: 100,
                                enableFiltering: false
                            },
                            {   field: 'engagement_modified_by',
                                displayName: "Modified By",
                                minWidth: 100,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {   field: 'engagement_modified_date',
                                displayName: "Modified Date",
                                type: 'date',
                                cellFilter: 'date:\'MM/dd/yyyy\'',
                                minWidth: 100,
                                enableFiltering: false
                            }
                        ]
                    };
                }
                
                function blockUserPortlets() {
                    blockUI.instances.get("blockui_user_details_container").start();
                }

                function unblockUserPortlets() {
                    //added a slight buffer here to allow the UI to finish executing the repeaters for roles and teams before we unblock the UI
                    $timeout(function(){
                        blockUI.instances.get("blockui_user_details_container").stop();
                    },500);
                }

                function blockEngagementPortlets() {
                    blockUI.instances.get("blockui_engagement_details_container").start();
                }

                function unblockEngagementPortlets() {
                    //added a slight buffer here to allow the UI to finish executing the repeaters for roles and teams before we unblock the UI
                    $timeout(function(){
                        blockUI.instances.get("blockui_engagement_details_container").stop();
                    },500);
                }


                initialize();
            }
        ]);
})();