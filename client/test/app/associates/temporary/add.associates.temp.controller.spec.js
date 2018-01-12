'use strict';

describe('AddAssociatesController', function () {

    var Ctrl,
        Ctrl2,
        Ctrl3,
        Ctrl4,
        Ctrl5,
        Ctrl6,
        $rootScope,
        $scope,
        $window,
        $interval,
        $timeout,
        $state,
        $state2,
        $state3,
        mockDocument,
        index,
        adamsConstants,
        mockBlockUI = {},
        mockUtils = {},
        logService = {},
        $q,
        $httpBackend,
        userData,
        associatesSearchService,
        personnelNumber,
        timeTrackingSystem,
        personnelNo,
        mockModalDialogService,
        mockModalDialogService1,
        mockAssociatesSearchService = {},
        mockAssociatesSearchService2 = {},
        mockAssociatesSearchService3 = {},
        mockUserAdministrationService = {},
        mockUserAdministrationService2 = {},
        mockApplicationConfigurationService ={},
        CompassToastr,
        // mockCompassToastr = {},
        mockModal,
        mockModal1,
        selectedRow,
        limit,
        page,
        sort,
        searchInput,
        tempAssociateRequest,
        associateInfo,
        associateInfo1,
        timeTrackingSystems,
        agencies,
        path,
        appName, roleName, searchUserName, searchLastName, searchFirstName, searchCostCenter, searchStatus;

    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.add.associates.temp.controller'));
    beforeEach(module('adams.associates.temp.search.service'));
    beforeEach(module('adams.common.user.grid.controller'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.user.administration.service'));
    beforeEach(module('common.services.CompassToastr'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('AssociatesSearchService', mockAssociatesSearchService);
            $provide.value('AssociatesSearchService', mockAssociatesSearchService2);
            $provide.value('AssociatesSearchService', mockAssociatesSearchService3);
            $provide.value('UserAdministrationService', mockUserAdministrationService);
            $provide.value('UserAdministrationService', mockUserAdministrationService2);
            $provide.value('ApplicationConfigurationService', mockApplicationConfigurationService);
            $provide.value('BlockUI', mockBlockUI);
            $provide.value('Utils', mockUtils);
            $provide.value('STGLogService', logService);
            // $provide.value('ModalDialogService', mockModalDialogService);
        });
    });

    beforeEach(inject(function ($controller, _$rootScope_, _$window_, $document, _$interval_, ADAMS_CONSTANTS, _$q_, _$httpBackend_, _$timeout_, AssociatesSearchService, UserAdministrationService, CompassToastr, STGLogService) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;
        adamsConstants = ADAMS_CONSTANTS;
        associatesSearchService = AssociatesSearchService;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        CompassToastr = CompassToastr;
        $timeout = _$timeout_;
        logService = STGLogService;
        index = 0;
        personnelNumber = '50002';
        timeTrackingSystem = 'MyStaff';
        path = '/tempAssociates';
        personnelNo = '1000';
        limit = 1;
        page = 25;
        sort = '';
        searchInput = {};
        userData = {
            "personnel_number": "1801619",
            "username": "vasiru01",
            "first_name": "Udaykiran",
            "middle_name": "J",
            "last_name": "Vasireddy",
            "birthdate": 562890600000,
            "last_four_ssn": "4545",
            "email": "udaykiran.vasireddy@compass-usa.com",
            "phone_number": "614-787-9876",
            "time_tracking_system": "MyStaff",
            "cost_center_name": "12345",
            "cost_center_description": "Compass-USA",
            "cost_center_source_system_id": "1008",
            "start_date": 1462890600000,
            "end_date": 2462890600000,
            "termination_date": "",
            "vendor_number": "12124545",
            "vendor_name_1": "Food Buy",
            "vendor_source_system_id": "1001",
            "base_rate": "200.00",
            "agency": "Agency",
            "job_name": "Chef",
            "job_description": "Cook food",
            "job_source_system_id": "010",
            "comments": "Testing 123",
            "active_engagement": true
        };
        tempAssociateRequest = {
            "associates": {
                "username": "",
                "first_name": "kiran",
                "middle_name": "",
                "last_name": "vasireddy",
                "birthdate": 981262800000,
                "last_four_ssn": "1236",
                "email": "udaykiranvasireddy@gmail.com",
                "phone_number": "6147875331",
                "time_tracking_system": "MySTAFF",
                "cost_center_name": "17578",
                "cost_center_source_system_id": 1001,
                "start_date": 1480309200000,
                "end_date": 1482123600000,
                "termination_date": 0,
                "vendor_number": "14012935",
                "vendor_source_system_id": 1001,
                "base_rate": "1111",
                "job_name": "10710-CANADA",
                "job_source_system_id": 2010,
                "comments": ""
            }
        };
        associateInfo = {
            "personnel_number": "50002",
            "username": "",
            "first_name": "kiran",
            "middle_name": "",
            "last_name": "vasireddy",
            "birthdate": 981262800000,
            "last_four_ssn": "1236",
            "email": "udaykiranvasireddy@gmail.com",
            "phone_number": "6147875331",
            "time_tracking_system": "MySTAFF",
            "cost_center_name": "17578",
            "cost_center_source_system_id": 1001,
            "created_date": 1480309200000,
            "modified_date": 1480309200000,
            "start_date": 1480309200000,
            "end_date": 1482123600000,
            "termination_date": 0,
            "vendor_number": "969088",
            "vendor_name_1": "DATAEDGE",
            "vendor_source_system_id": 1001,
            "base_rate": "1111",
            "job_name": "10710-CANADA",
            "job_source_system_id": 2010,
            "comments": "Testing 123",
            "active_engagement": true,
            data: [{
                "personnel_number": "50002",
                "username": "",
                "first_name": "kiran",
                "middle_name": "",
                "last_name": "vasireddy",
                "birthdate": 981262800000,
                "last_four_ssn": "1236",
                "email": "udaykiranvasireddy@gmail.com",
                "phone_number": "6147875331",
                "time_tracking_system": "MySTAFF",
                "cost_center_name": "17578",
                "cost_center_source_system_id": 1001,
                "start_date": 1480309200000,
                "end_date": 1482123600000,
                "termination_date": 0,
                "vendor_number": "969088",
                "vendor_name_1": "DATAEDGE",
                "vendor_source_system_id": 1001,
                "base_rate": "1111",
                "job_name": "10710-CANADA",
                "job_source_system_id": 2010,
                "comments": "Testing 123",
                "active_engagement": true
            }]
        };

        associateInfo1 = {
            "personnel_number": "50002",
            "username": "",
            "first_name": "kiran",
            "middle_name": "",
            "last_name": "vasireddy",
            "birthdate": 981262800000,
            "last_four_ssn": "1236",
            "email": "udaykiranvasireddy@gmail.com",
            "phone_number": "6147875331",
            "time_tracking_system": "MySTAFF",
            "cost_center_name": "17578",
            "cost_center_source_system_id": 1001,
            "created_date": 1480309200000,
            "modified_date": 1480309200000,
            "start_date": 1480309200000,
            "end_date": 1482123600000,
            "termination_date": 0,
            "vendor_number": "969088",
            "vendor_name_1": "DATAEDGE",
            "vendor_source_system_id": 1001,
            "base_rate": "1111",
            "job_name": "10710-CANADA",
            "job_source_system_id": 2010,
            "comments": "Testing 123",
            "active_engagement": false,
            data: [{
                "personnel_number": "50002",
                "username": "",
                "first_name": "kiran",
                "middle_name": "",
                "last_name": "vasireddy",
                "birthdate": 981262800000,
                "last_four_ssn": "1236",
                "email": "udaykiranvasireddy@gmail.com",
                "phone_number": "6147875331",
                "time_tracking_system": "MySTAFF",
                "cost_center_name": "17578",
                "cost_center_source_system_id": 1001,
                "start_date": 1480309200000,
                "end_date": 1482123600000,
                "termination_date": 0,
                "vendor_number": "969088",
                "vendor_name_1": "DATAEDGE",
                "vendor_source_system_id": 1001,
                "base_rate": "1111",
                "job_name": "10710-CANADA",
                "job_source_system_id": 2010,
                "comments": "Testing 123",
                "active_engagement": false
            }]
        };
        timeTrackingSystems = {data: [{'time_tracking_system': 'Mystaff'}, {'time_tracking_system': 'Other'}]};
        agencies = [{
            "vendor_number": "10016000",
            "vendor_name_1": "VSA MIDATLANTIC",
            "address": "1226 FOREST PKWY",
            "source_system_id": 1001
        }];

        selectedRow = [{
            "user_name": "VASIRU01",
            "first_name": "udaykiran",
            "middle_name": "",
            "last_name": "vasireddy",
            "mobile_phone": "",
            "email_address": "udaykiran.vasireddy@compass-usa.com"
        }];
        // selectedRow = JSON.parse(selectedRow);

        appName = 'Adams';
        roleName = 'Admin';
        searchUserName = '';
        searchLastName = '';
        searchFirstName = '';
        searchCostCenter = '';
        searchStatus = '';

        mockUtils = {
            blockUI: {
                instances: {
                    get: function () {
                        return {
                            start : function(){
                                return;
                            },
                            stop : function(){
                                return;
                            }
                        }
                    }
                }
            },

            startBlockUI: function() {
                return {}
            },

            stopBlockUI: function() {
                return {}
            },

            initializeSearchFields: function () {
                return {}
            },

            getGridSorts: function () {
                return {'sorts': []};
            },
            checkIfSearchObjectPresent: function(property, searchItems){
                return true;
            },
            getSearchIndex: function(){
                return -1;
            }
        };

        mockModalDialogService = {
            result: {
                then: function (confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function (result) {
                //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
                this.result.confirmCallBack(result);
            },
            dismiss: function (type) {
                //The user clicked cancel on the modal dialog, call the stored cancel callback
                this.result.cancelCallback(type);
            }
        };

        mockModalDialogService1 = {
            result: {
                then: function (confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function (result) {
                //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
                this.result.confirmCallBack(result);
            },
            dismiss: function (type) {
                //The user clicked cancel on the modal dialog, call the stored cancel callback
                this.result.cancelCallback(type);
            }
        };

        // mockModal = {
        //     open: jasmine.createSpy('mockModal.open'),
        //     close: jasmine.createSpy('mockModal.close'),
        //     dismiss: jasmine.createSpy('mockModal.dismiss'),
        //     result: {
        //         then: jasmine.createSpy('mockModal.result.then')
        //     }
        // };

        // mockModal = jasmine.createSpyObj('mockModal', ['open', 'close', 'dismiss', 'result.then']);

        /*mockModal = {
            open: function () {
                return {
                    result: {
                        then: function (selectedRow) {
                            return selectedRow;
                        }
                    }
                }
            },
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss')
        };*/

        function mockModal(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.resolve([
                {
                    user_name: 'ADD',
                    first_name: "",
                    middle_name: 'something',
                    last_name: 'something',
                    mobile_phone: 'something',
                    email_address: 'something',
                    job_name: "asd",
                    job_description: "cvx",
                    source_system_id: 1000,
                    cost_center: "2000",
                    cost_center_description: "345435"
                }]);
            this.result = this.resultDeferred.promise;
            // console.log(this.open();
        }
        mockModal.prototype.open = function(options){
            if(options && options.resolve) {
                options.resolve.timeTrackingSystem ? options.resolve.timeTrackingSystem() : '';
            }
            return this;
        };
        mockModal.prototype.close = function (item) {
            this.resultDeferred.resolve(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };
        mockModal.prototype.dismiss = function (item) {
            this.resultDeferred.reject(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };

        mockModal = new mockModal();

        function mockModal1(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.reject();
            this.result = this.resultDeferred.promise;
            // console.log(this.open();
        }
        mockModal1.prototype.open = function(options){
            return this;
        };
        mockModal1.prototype.close = function (item) {
            this.resultDeferred.resolve(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };
        mockModal1.prototype.dismiss = function (item) {
            this.resultDeferred.reject(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };

        mockModal1 = new mockModal1();

        mockBlockUI = {
            instances: {
                get: function () {
                    return {
                        start: function () {
                            return;
                        },
                        stop: function () {
                            return;
                        }
                    }
                }
            }
        };

        mockModalDialogService.confirm = function () {
            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
        };

        mockModalDialogService1.confirm = function () {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };

        var element = {
            selectpicker: function () {},
            val: function() {},
            data: function() {}
        };

        spyOn(angular, 'element').and.returnValue(element);
        spyOn(element, 'val');
        spyOn(element, 'selectpicker');

        mockAssociatesSearchService.saveAssociateInfo = function (personnelNumber, associateInfo, path, timeTrackingSystem) {
            var deferred = $q.defer();
            deferred.resolve({
                "data": {
                    "metadata": {
                        "version": "1.0",
                        "status": "success!",
                        "http_status_code": "200",
                        "resultCount": "0"
                    },
                    "data": [{
                        "username": "ISENHJ01",
                        "first_name": "JUSTIN",
                        "middle_name": "B",
                        "last_name": "ISENHOUR",
                        "birthdate": 315550800000,
                        "last_four_ssn": "1452",
                        "email": "DO_NOT_REPLY_JUSTIN.ISENHOUR@COMPASS-USA.COM",
                        "phone_number": "6147875325",
                        "time_tracking_system": "MySTAFF",
                        "cost_center_name": "10001",
                        "cost_center_source_system_id": "1001",
                        "start_date": 1483246800000,
                        "end_date": 1501819200000,
                        "vendor_number": "958305",
                        "vendor_source_system_id": "1001",
                        "base_rate": "1441",
                        "job_name": "3432-CANADA",
                        "job_source_system_id": "2010",
                        "comments": "",
                        "termination_date": 0,
                        "active_engagement": null,
                        "personnel_number": "200000005"
                    }],
                    "error": "{}"
                }
            });
            return deferred.promise;
        };

        mockAssociatesSearchService2.saveAssociateInfo = function (personnelNumber, associateInfo, path, timeTrackingSystem) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockAssociatesSearchService.getTempAssociates = function (limit, page, sort, searchInput) {
            var deferred = $q.defer();
            deferred.resolve({
                "metadata": {"resultCount": "25"},
                "data": [{
                    "personnel_number": "1801619",
                    "username": "vasiru01",
                    "first_name": "Udaykiran",
                    "middle_name": "J",
                    "last_name": "Vasireddy",
                    "birthdate": 562890600000,
                    "last_four_ssn": "4545",
                    "email": "udaykiran.vasireddy@compass-usa.com",
                    "phone_number": "614-787-9876",
                    "time_tracking_system": "MyStaff",
                    "cost_center_name": "12345",
                    "cost_center_description": "Compass-USA",
                    "cost_center_source_system_id": "1008",
                    "start_date": 1462890600000,
                    "end_date": 2462890600000,
                    "termination_date": "",
                    "vendor_number": "12124545",
                    "vendor_name_1": "Food Buy",
                    "vendor_source_system_id": "1001",
                    "base_rate": "200.00",
                    "agency": "Agency",
                    "job_name": "Chef",
                    "job_description": "Cook food",
                    "job_source_system_id": "010",
                    "comments": "Testing 123",
                    "active_engagement": true
                }]
            });
            return deferred.promise;
        };

        mockAssociatesSearchService2.getTempAssociates = function (limit, page, sort, searchInput) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockAssociatesSearchService.getTempAssociateInfo = function (limit, page, sort, searchInput) {
            var deferred = $q.defer();
            deferred.resolve({
                "metadata": {"resultCount": "25"},
                "data": [{
                    "personnel_number": "1801619",
                    "username": "vasiru01",
                    "first_name": "Udaykiran",
                    "middle_name": "J",
                    "last_name": "Vasireddy",
                    "birthdate": 562890600000,
                    "last_four_ssn": "4545",
                    "email": "udaykiran.vasireddy@compass-usa.com",
                    "phone_number": "614-787-9876",
                    "time_tracking_system": "MyStaff",
                    "cost_center_name": "12345",
                    "cost_center_description": "Compass-USA",
                    "cost_center_source_system_id": "1008",
                    "start_date": 1462890600000,
                    "end_date": 2462890600000,
                    "termination_date": "",
                    "vendor_number": "12124545",
                    "vendor_name_1": "Food Buy",
                    "vendor_source_system_id": "1001",
                    "base_rate": "200.00",
                    "agency": "Agency",
                    "job_name": "Chef",
                    "job_description": "Cook food",
                    "job_source_system_id": "010",
                    "comments": "Testing 123",
                    "active_engagement": true
                }]
            });
            return deferred.promise;
        };

        mockAssociatesSearchService3.getTempAssociateInfo = function (limit, page, sort, searchInput) {
            var deferred = $q.defer();
            deferred.resolve({
                "metadata": {"resultCount": "25"},
                "data": {}
            });
            return deferred.promise;
        };

        mockAssociatesSearchService2.getTempAssociateInfo = function (limit, page, sort, searchInput) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockAssociatesSearchService.getTempAssociateEngagements = function (personnelNumber, limit, page, sort, searchInput) {
            var deferred = $q.defer();
            deferred.resolve({
                "metadata": {"resultCount": "1"},
                "data": [{
                    "personnel_number": "50002",
                    "cost_center_name": "17578",
                    "cost_center_description": "ESS-JAVA - CORE",
                    "cost_center_source_system_id": 1001,
                    "vendor_number": "14012935",
                    "vendor_name_1": "PALM COAST DATA",
                    "start_date": 562890600,
                    "end_date": 562890600,
                    "termination_date": 0,
                    "vendor_source_system_id": 1001,
                    "base_rate": "20",
                    "job_name": "10710-CANADA",
                    "job_description": "ACTING FACILITIES MANAGER",
                    "job_source_system_id": 2010,
                    "comments": "Comment testing",
                    "active_engagement": true
                }]
            });
            return deferred.promise;
        };

        mockAssociatesSearchService2.getTempAssociateEngagements = function (personnelNumber, limit, page, sort, searchInput) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockAssociatesSearchService2.getTempAssociateEngagements = function (personnelNumber, limit, page, sort, searchInput) {
            var deferred = $q.defer();
            deferred.resolve({
                "metadata": {"resultCount": "1"},
                "data": [{
                    "personnel_number": "50002",
                    "cost_center_name": "17578",
                    "cost_center_description": "ESS-JAVA - CORE",
                    "cost_center_source_system_id": 1001,
                    "vendor_number": "14012935",
                    "vendor_name_1": "PALM COAST DATA",
                    "start_date": 562890600,
                    "end_date": 562890600,
                    "termination_date": 0,
                    "vendor_source_system_id": 1001,
                    "base_rate": "20",
                    "job_name": "10710-CANADA",
                    "job_description": "ACTING FACILITIES MANAGER",
                    "job_source_system_id": 2010,
                    "comments": "Comment testing",
                    "active_engagement": true
                }]
            });
            return deferred.promise;
        };

        mockAssociatesSearchService2.getTempAssociateEngagements = function (personnelNumber, limit, page, sort, searchInput) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockAssociatesSearchService.addTempAssociate = function (tempAssociateRequest) {
            var deferred = $q.defer();
            deferred.resolve({
                "data": {
                    "metadata": {
                        "version": "1.0",
                        "status": "success!",
                        "http_status_code": "200",
                        "resultCount": "0"
                    },
                    "data": [{
                        "username": "ISENHJ01",
                        "first_name": "JUSTIN",
                        "middle_name": "B",
                        "last_name": "ISENHOUR",
                        "birthdate": 315550800000,
                        "last_four_ssn": "1452",
                        "email": "DO_NOT_REPLY_JUSTIN.ISENHOUR@COMPASS-USA.COM",
                        "phone_number": "6147875325",
                        "time_tracking_system": "MySTAFF",
                        "cost_center_name": "10001",
                        "cost_center_source_system_id": "1001",
                        "start_date": 1483246800000,
                        "end_date": 1501819200000,
                        "vendor_number": "958305",
                        "vendor_source_system_id": "1001",
                        "base_rate": "1441",
                        "job_name": "3432-CANADA",
                        "job_source_system_id": "2010",
                        "comments": "",
                        "termination_date": 0,
                        "active_engagement": null,
                        "personnel_number": "200000005"
                    }],
                    "error": "{}"
                }
            });
            return deferred.promise;
        };

        mockAssociatesSearchService2.addTempAssociate = function (tempAssociateRequest) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockAssociatesSearchService.changeTempAssociate = function (associateInfo, personnelNumber) {
            var deferred = $q.defer();
            deferred.resolve([{"message": "Success"}]);
            return deferred.promise;
        };

        mockAssociatesSearchService2.changeTempAssociate = function (associateInfo, personnelNumber) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockUserAdministrationService.getUserDetails = function (limit, page, appName, roleName, searchUserName, searchLastName, searchFirstName, searchCostCenter, sort, searchStatus) {
            var deferred = $q.defer();
            // deferred.resolve([{}]);
            deferred.resolve({
                "metadata": {"resultCount": "600359"},
                "data": [{
                    "gender": "Female",
                    "active": true,
                    "sector": null,
                    "division": null,
                    "user_name": "ZZAARONP01",
                    "first_name": "PAULA",
                    "middle_name": "J",
                    "last_name": "AARON",
                    "cost_center_name": "5076",
                    "cost_center_description": "Little Rock Vending",
                    "cost_center_display_name": "5076 Little Rock Vending",
                    "work_phone": "870-863-7454",
                    "mobile_phone": "5015620111",
                    "email_address": "DO_NOT_REPLY_PAULA.AARON@COMPASS-USA.COM"
                }]
            });
            return deferred.promise;
        };

        mockUserAdministrationService2.getUserDetails = function (limit, page, appName, roleName, searchUserName, searchLastName, searchFirstName, searchCostCenter, sort, searchStatus) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockUserAdministrationService.getRoleName = function () {
            var deferred = $q.defer();
            deferred.resolve(["Admin"]);
            return deferred.promise;
        };

        mockUserAdministrationService2.getRoleName = function () {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockApplicationConfigurationService.getApplicationName = function () {
            return 'ADAMS';
        };

        /*$state = {
            go: function () {
                return;
            },
            current: {
                data: {
                    pageTitle: ''
                }
            },
            params: {
                source_system_id: '1008'
            }
        };*/

        $state = {
            current: {
                data: {
                    pageTitle: ''
                }
            },
            params: {
                associateSearchData: userData
            },
            go: function () {
                return;
            }
        };
        $state2 = {
            current: {
                data: {
                    pageTitle: ''
                }
            },
            params: {
                associateSearchData: userData
            },
            go: function () {
                return;
            }
        };
        $state3 = {
            current: {
                data: {
                    pageTitle: ''
                }
            },
            params: {
                associateSearchData: null
            },
            go: function () {
                return;
            }
        };

        $rootScope = {applicationConfiguration: {application: {name: 'ADAMS'}}};

        Ctrl = $controller('AddAssociatesController', {
            $rootScope: $rootScope,
            $scope: $scope,
            $state: $state,
            CompassToastr: CompassToastr,
            ADAMS_CONSTANTS: adamsConstants,
            $timeout: $timeout,
            $uibModal: mockModal,
            AssociatesSearchService: mockAssociatesSearchService,
            ModalDialogService: mockModalDialogService,
            personnelNumber: personnelNo,
            associateData: associateInfo,
            timeTrackingSystems: timeTrackingSystems,
            agencies: agencies,
            UserAdministrationService: mockUserAdministrationService,
            blockUI: mockBlockUI,
            timeTrackingSystem: timeTrackingSystem,
            $document: $document,
            Utils: mockUtils,
            ApplicationConfigurationService : mockApplicationConfigurationService
        });
        Ctrl2 = $controller('AddAssociatesController', {
            $rootScope: $rootScope,
            $scope: $scope,
            $state: $state3,
            CompassToastr: CompassToastr,
            ADAMS_CONSTANTS: adamsConstants,
            $timeout: $timeout,
            $uibModal: mockModal,
            AssociatesSearchService: mockAssociatesSearchService2,
            ModalDialogService: mockModalDialogService,
            personnelNumber: personnelNumber,
            associateData: associateInfo1,
            timeTrackingSystems: timeTrackingSystems,
            agencies: agencies,
            UserAdministrationService: mockUserAdministrationService2,
            blockUI: mockBlockUI,
            timeTrackingSystem: timeTrackingSystem,
            $document: $document,
            ApplicationConfigurationService : mockApplicationConfigurationService
        });
        Ctrl3 = $controller('AddAssociatesController', {
            $rootScope: $rootScope,
            $scope: $scope,
            $state: $state3,
            CompassToastr: CompassToastr,
            ADAMS_CONSTANTS: adamsConstants,
            $timeout: $timeout,
            $uibModal: mockModal,
            AssociatesSearchService: mockAssociatesSearchService3,
            ModalDialogService: mockModalDialogService,
            personnelNumber: personnelNumber,
            associateData: associateInfo,
            timeTrackingSystems: timeTrackingSystems,
            agencies: agencies,
            UserAdministrationService: mockUserAdministrationService,
            blockUI: mockBlockUI,
            timeTrackingSystem: timeTrackingSystem,
            $document: $document,
            ApplicationConfigurationService : mockApplicationConfigurationService
        });
        Ctrl4 = $controller('AddAssociatesController', {
            $rootScope: $rootScope,
            $scope: $scope,
            $state: $state3,
            CompassToastr: CompassToastr,
            ADAMS_CONSTANTS: adamsConstants,
            $timeout: $timeout,
            $uibModal: mockModal,
            AssociatesSearchService: mockAssociatesSearchService3,
            ModalDialogService: mockModalDialogService,
            personnelNumber: null,
            associateData: null,
            timeTrackingSystems: timeTrackingSystems,
            agencies: agencies,
            UserAdministrationService: mockUserAdministrationService,
            blockUI: mockBlockUI,
            timeTrackingSystem: timeTrackingSystem,
            $document: $document,
            ApplicationConfigurationService : mockApplicationConfigurationService
        });
        Ctrl5 = $controller('AddAssociatesController', {
            $rootScope: $rootScope,
            $scope: $scope,
            $state: $state3,
            CompassToastr: CompassToastr,
            ADAMS_CONSTANTS: adamsConstants,
            $timeout: $timeout,
            $uibModal: mockModal,
            AssociatesSearchService: mockAssociatesSearchService3,
            ModalDialogService: mockModalDialogService,
            personnelNumber: null,
            associateData: null,
            timeTrackingSystems: timeTrackingSystems,
            agencies: agencies,
            UserAdministrationService: mockUserAdministrationService,
            blockUI: mockBlockUI,
            timeTrackingSystem: '',
            $document: $document,
            ApplicationConfigurationService : mockApplicationConfigurationService
        });
        Ctrl6 = $controller('AddAssociatesController', {
            $rootScope: $rootScope,
            $scope: $scope,
            $state: $state3,
            CompassToastr: CompassToastr,
            ADAMS_CONSTANTS: adamsConstants,
            $timeout: $timeout,
            $uibModal: mockModal1,
            AssociatesSearchService: mockAssociatesSearchService3,
            ModalDialogService: mockModalDialogService1,
            personnelNumber: personnelNumber,
            associateData: associateInfo,
            timeTrackingSystems: timeTrackingSystems,
            agencies: agencies,
            UserAdministrationService: mockUserAdministrationService,
            blockUI: mockBlockUI,
            timeTrackingSystem: '',
            $document: $document,
            ApplicationConfigurationService : mockApplicationConfigurationService
        });
    }));

    it('should initialize the controller properly', function () {
        spyOn(Ctrl2, 'submit').and.callThrough();

        // var timeTracking = timeTrackingSystems.data[0];
        Ctrl2.timeTracking = ' ';
        Ctrl2.timeTrackingSystem = 'MyStaff';
        Ctrl2.agency = {vendor_number: userData.vendor_number};
        console.log(Ctrl2.timeTracking);
        Ctrl2.submit({});
        $scope.$apply();
        expect(Ctrl2.submit).toHaveBeenCalledWith({});
        expect(Ctrl2).not.toBeUndefined();
        expect(Ctrl2.associateInfo.comments).toEqual('Testing 123');
    });

    it('should initialize the controller properly', inject(function ($timeout) {
        spyOn(Ctrl2, 'getUserInfo').and.callThrough();
        Ctrl2.getUserInfo();
        $timeout.flush(500);
        $timeout.verifyNoPendingTasks();
        $scope.$apply();
        expect(Ctrl2.getUserInfo).toHaveBeenCalledWith();
    }));

    it('should call getAssociateData', function () {
        spyOn(Ctrl2, 'getAssociateData').and.callThrough();
        Ctrl2.getAssociateData();
        $timeout.flush(500);
        $timeout.verifyNoPendingTasks();
        $scope.$apply();
        expect(Ctrl2.getAssociateData).toHaveBeenCalledWith();
    });

    it('should initialize the controller properly', inject(function ($timeout) {
        Ctrl3.associateSearchData = associateInfo.data;
        $timeout.flush(5);
        $timeout.verifyNoPendingTasks();
        $scope.$apply();
        expect(Ctrl3).not.toBeUndefined();
        // expect(Ctrl3.associateInfo.comments).toEqual('Testing 123');
    }));

    it('should call getAssociateData with response data {}', inject(function ($timeout) {

        mockAssociatesSearchService3.getTempAssociateInfo = function (limit, page, sort, searchInput) {
            var deferred = $q.defer();
            deferred.resolve({data: "{}"});
            return deferred.promise;
        };
        spyOn(Ctrl3, 'getAssociateData').and.callThrough();
        Ctrl3.getAssociateData();
        $timeout.flush(500);
        $timeout.verifyNoPendingTasks();
        $scope.$apply();
        expect(Ctrl3.getAssociateData).toHaveBeenCalledWith();
    }));

    it('should save temp associate info', function () {
        expect(Ctrl).not.toBeUndefined();
        Ctrl.loadDetails(tempAssociateRequest.associates);
        Ctrl.personalNo = '';
        $scope.$apply();
        Ctrl.saveAssociateData('/tempAssociates');
        $scope.$apply();
        expect(Ctrl.associateInfo.first_name).toEqual('kiran');
    });

    it('should update temp associate info', function () {
        expect(Ctrl).not.toBeUndefined();
        Ctrl.loadDetails(null);
        $scope.$apply();
        Ctrl.saveAssociateData();
        $scope.$apply();
        expect(Ctrl.associateInfo.personnel_number).toEqual(undefined);
    });

    it('should open birthdate popup', function () {
        Ctrl.openBirthDatePopup();
        $scope.$apply();
        expect(Ctrl.birthDatePopup.opened).toEqual(true);
    });

    it('should open startdate popup', function () {
        Ctrl.openStartDatePopup();
        $scope.$apply();
        expect(Ctrl.startDatePopup.opened).toEqual(true);
    });

    it('should open enddate popup', function () {
        Ctrl.openEndDatePopup();
        $scope.$apply();
        expect(Ctrl.endDatePopup.opened).toEqual(true);
    });

    it('should history info enddate popup', function () {
        Ctrl.showHistoryInfo = true;
        Ctrl.showHistory();
        $scope.$apply();
        expect(Ctrl.showHistoryInfo).toEqual(false);
    });

    it('should end engagement', function () {
        Ctrl.loadDetails(associateInfo);
        $scope.$apply();
        Ctrl.endEngagement();
        $scope.$apply();
        expect(Ctrl.associateInfo.personnel_number).toEqual('50002');
    });

    it('should end engagement - throw error', function () {
        Ctrl6.loadDetails(associateInfo);
        $scope.$apply();
        Ctrl6.endEngagement();
        $scope.$apply();
        expect(Ctrl6.associateInfo.personnel_number).toEqual('50002');
    });

    // it('should end engagement', function () {
    //     Ctrl.errorHandling('Error Message');
    //     $scope.$apply();
    //     expect(mockModalDialogService.confirm).toHaveBeenCalled();
    // });

    it('should call state go', function () {
        spyOn($state, 'go');
        Ctrl.go('tempAssociates');
        $scope.$apply();
        expect($state.go).toHaveBeenCalled();
    });

    it('should call submit', function () {
        spyOn(Ctrl, 'submit');
        Ctrl.submit('tempAssociates');
        $scope.$apply();
        expect(Ctrl.submit).toHaveBeenCalled();
    });

    it('should get getAssociateData', function () {
        spyOn(Ctrl, 'getAssociateData').and.callThrough();
        Ctrl.getAssociateData();
        $timeout.flush(500);
        $timeout.verifyNoPendingTasks();
        $scope.$apply();
        expect(Ctrl.associateInfo.personnel_number).toEqual('1801619');
    });

    it('should call openUserInfo', function () {
        Ctrl.openUserInfo('ZZAARONP01');
        $scope.$apply();
        expect(Ctrl.selectedUser).toEqual('ZZAARONP01');
        expect(Ctrl.selectedUserName).toEqual('ZZAARONP01');
    });

    it('should call openEngagementsInfo', function () {
        Ctrl.openEngagementsInfo('ZZAARONP01');
        $scope.$apply();
        expect(Ctrl.selectedUser).toEqual('ZZAARONP01');
        expect(Ctrl.selectedUserName).toEqual('ZZAARONP01');
    });

    it('should call engagementHistory info', function () {
        Ctrl.showEngagementHistoryInfo = true;
        Ctrl.showEngagementHistory();
        $scope.$apply();
        expect(Ctrl.showEngagementHistoryInfo).toEqual(false);
        expect(Ctrl.engagementDetails).toEqual(false);
    });

    it('should call clearPersonalInfo', function () {
        Ctrl.clearPersonalInfo();
        $scope.$apply();
        expect(Ctrl.associateInfo.last_four_ssn).toEqual('');
    });

    it('should call clearEngagement', function () {
        Ctrl.clearEngagement();
        $scope.$apply();
        expect(Ctrl.associateInfo.comments).toEqual('');
    });

    it('should call clearEngagement - null', function () {
        Ctrl.timeTrackingDefault = null;
        Ctrl.clearEngagement();
        $scope.$apply();
        expect(Ctrl.associateInfo.comments).toEqual('');
    });

    it('should call getGridData ', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.searchObject = {
            "property": "market_name",
            "value": "something",
            "operator": ""
        };
        Ctrl.getGridData(25,1,'',{search: [
                {
                    "property": "market_name",
                    "value": "something",
                    "operator": ""
                }
            ]}
        );
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input- searchPropertyValue false', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.searchPropertyValue = false;
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call getGridData without search input - searchPropertyValue null', function() {
        spyOn(Ctrl, "getGridData").and.callThrough();
        Ctrl.searchObject = {
            "property": null,
            "value": "something",
            "operator": ""
        };
        Ctrl.searchPropertyValue = null;
        Ctrl.getGridData(25,1,'',{search: null});
        $scope.$apply();
        expect(Ctrl.getGridData).toHaveBeenCalled();
    });

    it('should call openGrid ', function() {
        spyOn(Ctrl, "openGrid").and.callThrough();
        Ctrl.openGrid();
        $scope.$apply();
        expect(Ctrl.openGrid).toHaveBeenCalled();
    });

    it('should call openGrid  - error', function() {
        spyOn(Ctrl6, "openGrid").and.callThrough();
        Ctrl6.openGrid();
        $scope.$apply();
        expect(Ctrl6.openGrid).toHaveBeenCalled();
    });

    it('should call openJobsGrid ', function() {
        spyOn(Ctrl, "openJobsGrid").and.callThrough();
        Ctrl.openJobsGrid();
        $scope.$apply();
        expect(Ctrl.openJobsGrid).toHaveBeenCalled();
    });

    it('should call openJobsGrid  - error', function() {
        spyOn(Ctrl6, "openJobsGrid").and.callThrough();
        Ctrl6.openJobsGrid();
        $scope.$apply();
        expect(Ctrl6.openJobsGrid).toHaveBeenCalled();
    });

    it('should call openCostCenterGrid ', function() {
        spyOn(Ctrl, "openCostCenterGrid").and.callThrough();
        Ctrl.openCostCenterGrid();
        $scope.$apply();
        expect(Ctrl.openCostCenterGrid).toHaveBeenCalled();
    });

    it('should call openCostCenterGrid  - error', function() {
        spyOn(Ctrl6, "openCostCenterGrid").and.callThrough();
        Ctrl6.openCostCenterGrid();
        $scope.$apply();
        expect(Ctrl6.openCostCenterGrid).toHaveBeenCalled();
    });
});