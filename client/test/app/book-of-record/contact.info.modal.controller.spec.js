
'use strict';

describe('ContactInfoModalController', function() {
    var Ctrl,
        Ctrl2,
        $scope,
        $state,
        CompassToastr,
        adamsConstants,
        mockModalDialogService,
        action,
        vendorData,
        ContactInfoService,
        $rootScope,
        $httpBackend,
        $q,
        $uibModal,
        mockContactInfoService = {},
        mockContactInfoService2 = {},
        mockContactInfoGridPromise,
        $filter,
        mockModal,
        mockUtils = {},
        action,
        vendorSearchData,
        compassToastr,
        contactInfoRowData,
        sampleSvcObj,
        templateHtml,
        formElem,
        form,
        $uibModalInstance,
        $utils,
        $state,
        $compile,
        $timeout,
        callWith,
        delcont,
        gridApi,
        gridOptions,
        modalOptions,
        actualModalOptions,
        urlSpace;

    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.contact.info.service'));
    beforeEach(module('adams.contact.info.modal.controller'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));


    beforeEach(function() {
        module(function ($provide) {
            $provide.value('ContactInfoService', mockContactInfoService);
            $provide.value('ContactInfoService', mockContactInfoService2);
            $provide.value('Utils', mockUtils);
            $provide.value('contactInfoGridPromise', mockContactInfoGridPromise);
        });
    });

    beforeEach(inject(function($controller, $state, _$compile_, _$rootScope_, _$httpBackend_, _$uibModal_, _$filter_, $timeout, ContactInfoService, _$q_, ADAMS_URL_SPACE, ADAMS_CONSTANTS, CompassToastr, Utils){

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        sampleSvcObj = ContactInfoService;
        $q = _$q_;
        compassToastr = CompassToastr;
        adamsConstants = ADAMS_CONSTANTS;
        urlSpace  = ADAMS_URL_SPACE;
        $utils = Utils;
        $uibModal = _$uibModal_;
        $filter = _$filter_;
        $timeout = $timeout;
        $state = $state;
        $compile = _$compile_;
        $scope.vendorDetailsController = {};
        vendorSearchData = {
            "vendor_number": "10016011",
            "vendor_name_1": "VSA OF OHIO",
            "vendor_name_2": "",
            "vendor_name_3": "",
            "address": "9300 DUTTON DRIVE",
            "city": "TWINSBURG",
            "state": "OH",
            "zipcode": "44087",
            "country": "US ",
            "telephone_number_1": "",
            "telephone_number_2": "",
            "fax_number": "",
            "category_code": "6909",
            "category_description": "Inactive Suppliers",
            "model_market_classification": "Inactive",
            "extraneous": null,
            "excluded": 0,
            "diversity_code": "",
            "district": "",
            "train_station": "",
            "industry_key": "",
            "parent_record_created_date": "10-27-1998 05:00",
            "parent_record_created_by": "HORIZON",
            "child_record_created_date": null,
            "child_record_created_by": null,
            "account_group": "0006",
            "account_number_alt_payee": "",
            "master_record_delete_flag": " ",
            "tax_1": "",
            "tax_2": "",
            "one_time_account_ind": "",
            "training_partner_id": "",
            "business_type": "",
            "telebox": "",
            "personnel_number": null,
            "group_key": "",
            "central_posting_block": true,
            "imposed_purchase_block": true,
            "payment_block": true,
            "company_code_posting_block": false,
            "tax_jurisdiction": "",
            "company_code": null,
            "customer_number": "",
            "terms_payment_key": null,
            "account_number": null,
            "clerk": null,
            "consolidation_code": null,
            "consolidation_description": null,
            "nominated_code": "X",
            "nominated_description": "Extraneous",
            "source_system_id": 1001,
            "created_by": "BATCHADM",
            "created_date": "09-20-2016 20:49",
            "modified_by": null,
            "modified_date": null
        };

        $state.params ={"vendor_number":"10016000","source_system_id":"1001","vendorSearchData":{"vendor_number":"10016000","vendor_name_1":"VSA MIDATLANTIC","vendor_name_2":"","vendor_name_3":"                                   ","address":"1226 FOREST PKWY","city":"PAULSBORO","state":"NJ","zipcode":"08066-0000","country":"US ","telephone_number_1":"                ","telephone_number_2":"                ","fax_number":"                               ","category_code":"6909","category_description":"Inactive Suppliers                 ","model_market_classification":"Inactive","extraneous":null,"excluded":0,"diversity_code":"          ","district":"                                   ","train_station":"                         ","industry_key":"    ","parent_record_created_date":"10-27-1998 05:00","parent_record_created_by":"HORIZON     ","child_record_created_date":null,"child_record_created_by":null,"account_group":"0006","account_number_alt_payee":"          ","master_record_delete_flag":" ","tax_1":"                ","tax_2":"           ","one_time_account_ind":" ","training_partner_id":"      ","business_type":"                              ","telebox":"               ","personnel_number":null,"group_key":"          ","central_posting_block":true,"imposed_purchase_block":true,"payment_block":true,"company_code_posting_block":false,"tax_jurisdiction":"               ","company_code":null,"customer_number":"          ","terms_payment_key":null,"account_number":null,"clerk":null,"consolidation_code":null,"consolidation_description":null,"nominated_code":"X                             ","nominated_description":"Extraneous                    ","source_system_id":1001,"created_by":"BATCHADM","created_date":"10-26-2016 20:55","modified_by":"BATCHADM","modified_date":"10-31-2016 13:31"},"contactInfoData":null};

        vendorData = {"vendorNumber":"10016000","vendorSourceSystemId":"1001"};
        contactInfoRowData = {"vendor_contact_id":1010,"vendor_name_1":"VSA MIDATLANTIC","vendor_number":"10016000","first_name":"sdfsdf","last_name":"sdfsdf","telephone_1":"5678901234","telephone_2":"5678901235","fax":"3455467687","email":"asdasd@dfdsf.dfg","notify_for_openings_closings":true,"description":"asdasd","source_system_id":1001,"CREATED_BY":"ChouhR01","CREATED_DATE":"12-15-2016","MODIFIED_BY":null,"MODIFIED_DATE":null,"$$hashKey":"uiGrid-00QR"};
        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
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
            }
        };

        gridOptions = {
            data: [
                { col1: 'col1', col2: 'col2' }
            ],
            onRegisterApi: function( api ){
                gridApi = api;
            },
            totalItems: 0
        };

        gridApi = {
            grid: {
                appScope: {
                    deleteContactInfo: jasmine.createSpy('gridApi.grid.appScope.deleteContactInfo'),
                    editContactInfo: jasmine.createSpy('gridApi.grid.appScope.editContactInfo')
                }
            }
        };

        function mockModal(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.resolve('true');
            this.result = this.resultDeferred.promise;
        }
        mockModal.prototype.open = function(options){ return this;  };
        mockModal.prototype.close = function (item) {
            this.resultDeferred.resolve(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };
        mockModal.prototype.dismiss = function (item) {
            this.resultDeferred.reject(item);
            $rootScope.$apply(); // Propagate promise resolution to 'then' functions using $apply().
        };

        mockModal = new mockModal();
        mockContactInfoGridPromise = {
            abort: function() {}
        };

        mockModalDialogService = {
            result: {
                then: function(confirmCallback, cancelCallback) {
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function( result ) {
                this.result.confirmCallBack( result );
            },
            dismiss: function( type ) {
                this.result.cancelCallback( type );
            }
        };

        modalOptions = {
            templateUrl: 'vendors/details/contact-info/add-or-edit-contact-info-mapping.tpl.html',
            controller: 'AddOrEditContactInfoMappingController as addOrEditContactInfoMappingController',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                contactInfoRowData: function () {
                    return contactInfoRowData;
                },
                action: function () {
                    return 'edit';
                },
                vendorData: {
                    'vendorNumber': '123',
                    'vendorSourceSystemId': '1001'
                }
            }
        };

        $state = {
            go: function () {
                return;
            },
            current: {
                data: {
                    pageTitle: ''
                }
            },
            params: {
                vendorSearchData: vendorSearchData
            }
        };

        spyOn($uibModal, 'open').and.callFake(function(options){
            actualModalOptions = options;

            return mockModal;
        });

        mockContactInfoService.getContactInfoDataWithError = function(limit, page, sort, vendorNumber, marketName, teamName) {
            var deferred = $q.defer();
            deferred.resolve("error");
            // deferred.resolve({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"3"},"data":[{"vendor_contact_id":1003,"vendor_name_1":"VSA MIDATLANTIC","vendor_number":"10016000","first_name":"test1","last_name":"test2","telephone_1":"2222222222","telephone_2":"3333333333","fax":"2342342342","email":"test@a.com","notify_for_openings_closings":true,"description":"string","source_system_id":1001,"CREATED_BY":null,"CREATED_DATE":null,"MODIFIED_BY":"ChouhR01","MODIFIED_DATE":"01-04-2017"},{"vendor_contact_id":1004,"vendor_name_1":"VSA MIDATLANTIC","vendor_number":"10016000","first_name":"C1","last_name":"C2","telephone_1":"1212121212","telephone_2":"3434343434","fax":"1111111111","email":"c1@c2.com","notify_for_openings_closings":true,"description":"ac","source_system_id":1001,"CREATED_BY":"a2aUser","CREATED_DATE":"12-09-2016","MODIFIED_BY":null,"MODIFIED_DATE":null},{"vendor_contact_id":1010,"vendor_name_1":"VSA MIDATLANTIC","vendor_number":"10016000","first_name":"sdfsdf","last_name":"sdfsdf","telephone_1":"5678901234","telephone_2":"5678901235","fax":"3455467687","email":"asdasd@dfdsf.dfg","notify_for_openings_closings":true,"description":"asdasd","source_system_id":1001,"CREATED_BY":"ChouhR01","CREATED_DATE":"12-15-2016","MODIFIED_BY":null,"MODIFIED_DATE":null}],"error":"{}"});
            return deferred.promise;
        };

        mockContactInfoService.getContactInfoData = function(limit, page, sort, vendorNumber, marketName, teamName) {
            var deferred = $q.defer();
            deferred.resolve({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"3"},"data":[{"vendor_contact_id":1003,"vendor_name_1":"VSA MIDATLANTIC","vendor_number":"10016000","first_name":"test1","last_name":"test2","telephone_1":"2222222222","telephone_2":"3333333333","fax":"2342342342","email":"test@a.com","notify_for_openings_closings":true,"description":"string","source_system_id":1001,"CREATED_BY":null,"CREATED_DATE":null,"MODIFIED_BY":"ChouhR01","MODIFIED_DATE":"01-04-2017"},{"vendor_contact_id":1004,"vendor_name_1":"VSA MIDATLANTIC","vendor_number":"10016000","first_name":"C1","last_name":"C2","telephone_1":"1212121212","telephone_2":"3434343434","fax":"1111111111","email":"c1@c2.com","notify_for_openings_closings":true,"description":"ac","source_system_id":1001,"CREATED_BY":"a2aUser","CREATED_DATE":"12-09-2016","MODIFIED_BY":null,"MODIFIED_DATE":null},{"vendor_contact_id":1010,"vendor_name_1":"VSA MIDATLANTIC","vendor_number":"10016000","first_name":"sdfsdf","last_name":"sdfsdf","telephone_1":"5678901234","telephone_2":"5678901235","fax":"3455467687","email":"asdasd@dfdsf.dfg","notify_for_openings_closings":true,"description":"asdasd","source_system_id":1001,"CREATED_BY":"ChouhR01","CREATED_DATE":"12-15-2016","MODIFIED_BY":null,"MODIFIED_DATE":null}],"error":"{}"});
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockContactInfoService.deleteContactInfo = function(){
            var deferred = $q.defer();
            deferred.resolve([{"message": "Success"}]);
            // deferred.resolve({"data":{"metadata":{"version":"1.0","status":"success!","http_status_code":"200","resultCount":"0"},"data":["Success"],"error":"{}"},"status":200,"config":{"method":"DELETE","transformRequest":[null],"transformResponse":[null],"url":"/ui/api/vendors/10016000/contacts/1010?vendorSourceSystemId=1001","headers":{"Accept":"application/json, text/plain, */*","Authorization":"Bearer TGT-110-qO0nmcvTNuPcRzz9Q6eeaodcBO9gnMf6xKNMGlOCjEhBc4gW7r-cgldwas0184"}},"statusText":"OK"});
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockContactInfoService2.getContactInfoData = function(limit, page, sort, vendorNumber, marketName, teamName) {
            var deferred = $q.defer();
            deferred.resolve({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"3"},"data":[{"vendor_contact_id":1003,"vendor_name_1":"VSA MIDATLANTIC","vendor_number":"10016000","first_name":"test1","last_name":"test2","telephone_1":"2222222222","telephone_2":"3333333333","fax":"2342342342","email":"test@a.com","notify_for_openings_closings":true,"description":"string","source_system_id":1001,"CREATED_BY":null,"CREATED_DATE":null,"MODIFIED_BY":"ChouhR01","MODIFIED_DATE":"01-04-2017"},{"vendor_contact_id":1004,"vendor_name_1":"VSA MIDATLANTIC","vendor_number":"10016000","first_name":"C1","last_name":"C2","telephone_1":"1212121212","telephone_2":"3434343434","fax":"1111111111","email":"c1@c2.com","notify_for_openings_closings":true,"description":"ac","source_system_id":1001,"CREATED_BY":"a2aUser","CREATED_DATE":"12-09-2016","MODIFIED_BY":null,"MODIFIED_DATE":null},{"vendor_contact_id":1010,"vendor_name_1":"VSA MIDATLANTIC","vendor_number":"10016000","first_name":"sdfsdf","last_name":"sdfsdf","telephone_1":"5678901234","telephone_2":"5678901235","fax":"3455467687","email":"asdasd@dfdsf.dfg","notify_for_openings_closings":true,"description":"asdasd","source_system_id":1001,"CREATED_BY":"ChouhR01","CREATED_DATE":"12-15-2016","MODIFIED_BY":null,"MODIFIED_DATE":null}],"error":"{}"});
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockContactInfoService2.deleteContactInfo = function(){
            var deferred = $q.defer();
            deferred.resolve("error");
            deferred.promise.abort = function(){};
            // deferred.resolve({"data":{"metadata":{"version":"1.0","status":"success!","http_status_code":"200","resultCount":"0"},"data":["Success"],"error":"{}"},"status":200,"config":{"method":"DELETE","transformRequest":[null],"transformResponse":[null],"url":"/ui/api/vendors/10016000/contacts/1010?vendorSourceSystemId=1001","headers":{"Accept":"application/json, text/plain, */*","Authorization":"Bearer TGT-110-qO0nmcvTNuPcRzz9Q6eeaodcBO9gnMf6xKNMGlOCjEhBc4gW7r-cgldwas0184"}},"statusText":"OK"});
            return deferred.promise;
        };

        mockModalDialogService.confirm = function(){
            var deferred = $q.defer();
            deferred.resolve({});
            deferred.promise.abort = function(){};
            //$scope.$apply();
            return deferred.promise;
        };

        Ctrl = $controller('ContactInfoModalController', { $scope: $scope, $state: $state, $timeout:$timeout, ContactInfoService: mockContactInfoService, ModalDialogService: mockModalDialogService, compassToastr: CompassToastr, $uibModalInstance: $uibModalInstance, $uibModal: mockModal,  ADAMS_CONSTANTS: adamsConstants, Utils: mockUtils, contactInfoGridPromise: mockContactInfoGridPromise, vendorData: vendorData});
        // Ctrl2 = $controller('ContactInfoController', { $scope: $scope, $state: $state, $timeout:$timeout, ContactInfoService: mockContactInfoService2, ModalDialogService: mockModalDialogService, compassToastr: CompassToastr, $uibModalInstance: $uibModalInstance, $uibModal: mockModal,  ADAMS_CONSTANTS: adamsConstants, Utils: mockUtils, contactInfoGridPromise: mockContactInfoGridPromise, vendorData: vendorData});
    }));

    it('should initialize the ContactInfoController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should dismiss the modal with result "dismiss" when dismissed', function () {
        Ctrl.close($uibModalInstance.dismiss('cancel'));
        expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
        //expect(typeof(Ctrl.deleteContactInfoFunction)).toEqual(typeof(gridApi.grid.appScope.deleteContactInfo));
        //expect(typeof(Ctrl.editContactInfoFunction)).toEqual(typeof(gridApi.grid.appScope.editContactInfo));
    });

    /*it('should call deleteContactInfoFunction if block ', function() {
        Ctrl.gridOptions.totalItems = 1;
        spyOn(Ctrl, 'deleteContactInfoFunction').and.callThrough();
        //mockModal.open({});
        Ctrl.deleteContactInfoFunction(contactInfoRowData);
        $scope.$apply();
        // expect(mockModal.open).toHaveBeenCalled();
        expect(Ctrl.deleteContactInfoFunction).toHaveBeenCalled();
    });

    it('should call deleteContactInfoFunction else block', function() {
        spyOn(Ctrl, 'deleteContactInfoFunction').and.callThrough();
        Ctrl.deleteContactInfoFunction(contactInfoRowData);
        $scope.$apply();
        expect(Ctrl.deleteContactInfoFunction).toHaveBeenCalled();
    });

    it('should call deleteContactInfoFunction else block with response error', inject(function($timeout) {
        spyOn(Ctrl2, 'deleteContactInfoFunction').and.callThrough();
        Ctrl2.deleteContactInfoFunction(contactInfoRowData);
        // flush timeout(s) for all code under test.
        $timeout.flush();
        $timeout.flush(500);
        // this will throw an exception if there are any pending timeouts.
        $timeout.verifyNoPendingTasks();
        $scope.$apply();
        expect(Ctrl2.deleteContactInfoFunction).toHaveBeenCalled();
    }));

    it('should call editContactInfoFunction ', function() {
        spyOn(Ctrl, 'editContactInfoFunction').and.callThrough();
        //mockModal.open({});
        Ctrl.vendorNumber = '123';
        Ctrl.editContactInfoFunction(contactInfoRowData);
        $scope.$apply();
        //expect(mockModal.open).toHaveBeenCalledWith(modalOptions);
        expect(Ctrl.editContactInfoFunction).toHaveBeenCalled();
    });*/

    it('should call uiGridSelectedRows', function() {
        $rootScope.$broadcast('uiGridSelectedRows');
    });

    it('should call getGridData ', function() {
        Ctrl.getGridData();
    });


    // it('should verify the Grid Option Pagination Page Size', function () {
    //     expect(Ctrl.gridOptions.paginationPageSize).toEqual(25);
    // });

    /*it('should be equal to totalItems ', function () {
        expect(Ctrl.gridOptions.totalItems).toEqual(40000);
    });

    it('should be equal to paginationPageSize ', function () {
        expect(Ctrl.gridOptions.paginationPageSize).toEqual(25);
    });

    it('should have 3 paginationPageSizes ', function () {
        expect(Ctrl.gridOptions.paginationPageSizes.length).toEqual(3);
    });*/

    /*it('should open the modal with result "{}" when opened', function () {
        mockModal.open({});
        expect(mockModal.open).toHaveBeenCalled();
    });*/

    /*it('should call errorHandling', function () {
         spyOn(Ctrl, "errorHandling").and.callThrough();
         Ctrl.errorHandling('error');
         $scope.$apply();
         expect(Ctrl.errorHandling).toHaveBeenCalledWith('error');
     });*/

    /*it('should call errorHandling', function () {
        // spyOn(Ctrl, 'errorHandling');
        Ctrl.errorHandling('error');
        // expect(Ctrl.errorHandling).toHaveBeenCalled();
    });*/

    /*it('should call delete for total items = 1', function () {
        // spyOn(Ctrl, 'errorHandling');
        Ctrl.gridOptions.totalItems = 1;
        delcont.deleteContactInfo(contactInfoRowData);

        //$scope.deleteContactInfo(contactInfoRowData);
        mockModal.open({});
        $scope.$apply();
        expect(mockModal.open).toHaveBeenCalled();
        // expect(Ctrl.errorHandling).toHaveBeenCalled();
    });*/

    /*it('should call delete total items greater than 1', inject(function ($timeout) {
        Ctrl.gridOptions.totalItems = -1;

        delcont.deleteContactInfo(contactInfoRowData);

        //$scope.deleteContactInfo (contactInfoRowData);
        // spyOn(Ctrl, 'getGridData').and.callThrough();
        $scope.$apply();
        // expect(Ctrl.getGridData).toHaveBeenCalled();
    }));*/


    /*it('should call delete for total items = 1', function () {
        // spyOn(Ctrl, 'errorHandling');
        Ctrl2.gridOptions.totalItems = 1;

        delcont.deleteContactInfo(contactInfoRowData);

        //$scope.deleteContactInfo(contactInfoRowData);
        mockModal.open({});
        $scope.$apply();
        expect(mockModal.open).toHaveBeenCalled();
        // expect(Ctrl.errorHandling).toHaveBeenCalled();
    });*/

    /*it('(2) - should call delete total items greater than 1', inject(function ($timeout) {
        Ctrl2.gridOptions.totalItems = -1;
        $scope.deleteContactInfo (contactInfoRowData);
        // flush timeout(s) for all code under test.
        spyOn(Ctrl2, 'getGridData').and.callThrough();
        $timeout.flush();
        $scope.$apply();
        //$timeout.flush(500);
        // this will throw an exception if there are any pending timeouts.
        //$timeout.verifyNoPendingTasks();
        expect(Ctrl2.getGridData).toHaveBeenCalled();
    }));*/

    /*it('should call editContactInfo', function () {
        //$scope.editContactInfo(contactInfoRowData);

        delcont.editContactInfo(contactInfoRowData);

        mockModal.open({
            resolve: {
                contactInfoRowData: function () {
                    return contactInfoRowData;
                },
                action: function () {
                    return 'edit';
                }
            }
        });
        $scope.$apply();
        expect(mockModal.open).toHaveBeenCalled();
    });*/

    /*it('should call openAddContactInfo ', function () {
        Ctrl.openAddContactInfo();
        //mockModal.open({});
        $scope.$apply();
        //expect(mockModal.open).toHaveBeenCalled();
        // expect(Ctrl.openAddContactInfo).toHaveBeenCalled();
    });*/

    /*it('should notify boolean ', function () {
        var value = true, result;
        result = $filter('notifyFilter')(value);
        expect(result).toEqual('Yes');
    });*/

    /*it('should getContactInfoData with Error ', function () {
        var contactResponse;
        mockContactInfoService.getContactInfoDataWithError().then(function (response) {
            if (response === "error") {
                contactResponse = [];
            } else {
                contactResponse = response.data;
            }
            Ctrl.gridOptions.data = contactResponse;
        }, function(error) {
            mockUtils.stopBlockUI();
        });

        $scope.$apply();
        expect(Ctrl.gridOptions.data).toEqual(contactResponse);
    });

    it('should getContactInfoData', function () {
        var contactResponse;
        mockContactInfoService.getContactInfoData().then(function (response) {
            if (response === "error") {
                contactResponse = [];
            } else {
                contactResponse = response.data;
            }
        }, function(error) {
            mockUtils.stopBlockUI();
        });

        Ctrl.gridOptions.data = contactResponse;
        $scope.$apply();
        expect(Ctrl.gridOptions.data).toEqual(contactResponse);
    });*/

    /*it('should registerGridApi ', function () {
        var gridContainer = "< div ui-grid='myGridOptions' ui-grid-pagination></div>";

        var grid = $compile(gridContainer)($scope); // I've declared scope before as scope = $rootScope.$new();

        $scope.$digest();
        Ctrl.gridOptions.onRegisterApi(grid);
    });*/
});
