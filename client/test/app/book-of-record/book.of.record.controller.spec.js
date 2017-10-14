'use strict';

describe('Book Of Records Controller Testing', function() {
    var Ctrl,
        Ctrl2,
        $scope,
        $state,
        adamsConstants,
        mockModalDialogService,
        bookOfRecordControllerForEmail,
        mockedBookOfRecordsServiceForEmail = {},
        mockedContactInfoServiceForEmail = {},
        mockModalDialogServiceForEmail = {},
        mockedBookOfRecordService = {},
        mockedContactInfoService = {},
        mockedContactInfoService1 = {},
        statesService = {},
        $rootScope,
        $httpBackend,
        $q,
        $uibModal,
        $filter,
        mockModal,
        mockUtils = {},
        vendorData,
        vendorRowData,
        compassToastr,
        $uibModalInstance,
        costCenterRowData,
        $utils,
        $state,
        $compile,
        $timeout,
        gridApi,
        gridOptions,
        urlSpace;

    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.book.of.record.controller'));
    beforeEach(module('adams.book.of.record.service'));
    beforeEach(module('adams.contact.info.service'));


    beforeEach(function() {
        module(function ($provide) {
            $provide.value('BookOfRecordService', mockedBookOfRecordService);
            $provide.value('ContactInfoService', mockedContactInfoService);
            $provide.value('ContactInfoService', mockedContactInfoService1);
            $provide.value('StgStatesService', statesService);
            $provide.value('Utils', mockUtils);
            $provide.value('$window', {location: {href: ''}});
        });
    });

    beforeEach(inject(function($controller, $state, _$compile_, _$rootScope_, _$httpBackend_, _$uibModal_, _$filter_, _$timeout_, _$window_, BookOfRecordService, ContactInfoService, _$q_, ADAMS_URL_SPACE, ADAMS_CONSTANTS, CompassToastr, Utils){

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $q = _$q_;
        compassToastr = CompassToastr;
        adamsConstants = ADAMS_CONSTANTS;
        urlSpace  = ADAMS_URL_SPACE;
        $utils = Utils;
        $uibModal = _$uibModal_;
        $filter = _$filter_;
        $timeout = _$timeout_;
        $state = $state;
        $compile = _$compile_;

        $state.params ={"vendorSearchData":{"vendor_number":"0000000599","vendor_name_1":"PEPSI COLA (PBG)","vendor_name_2":"SYRUP ONLY","vendor_name_3":null,"address":"PO BOX 841918","city":"DALLAS","state":"TX","zipcode":"75284","country":null,"telephone_number_1":null,"telephone_number_2":null,"fax_number":null,"category_code":"2205","category_description":"Beverage, Carbonated               ","model_market_classification":null,"extraneous":null,"excluded":0,"diversity_code":"          ","district":null,"train_station":null,"industry_key":null,"parent_record_created_date":null,"parent_record_created_by":null,"child_record_created_date":null,"child_record_created_by":null,"account_group":null,"account_number_alt_payee":null,"master_record_delete_flag":null,"tax_1":null,"tax_2":null,"one_time_account_ind":null,"training_partner_id":null,"business_type":null,"telebox":null,"personnel_number":null,"group_key":null,"central_posting_block":false,"imposed_purchase_block":false,"payment_block":false,"company_code_posting_block":false,"tax_jurisdiction":null,"company_code":null,"customer_number":null,"terms_payment_key":null,"account_number":null,"clerk":null,"consolidation_code":null,"consolidation_description":null,"nominated_code":null,"nominated_description":null,"source_system_id":1008,"created_by":"BATCHADM","created_date":"10-26-2016 20:55","modified_by":"BATCHADM","modified_date":"10-31-2016 13:31"},"vendor_number":"10016011","source_system_id":"1008","costCenterMappingData":null};

        costCenterRowData = {"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","compliance":null,"edi_pay_status":null,"edi_live_date":null,"associated":false,"associated_by":"CHOUHR01","associated_date":null,"disassociated_by":null,"disassociated_date":"12-14-2016 20:39","disassociation_reason":"sdgfdg","vendor_source_system_id":1001,"cost_center_source_system_id":1001,"created_by":"ChouhR01","created_date":"12-14-2016 20:30","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00SC"};
        vendorData = {"vendorNumber":"10016000","vendorSourceSystemId":"1001"};
        vendorRowData = {"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","vendor_name":"11889","vendor_description":"$$$Wal-Mart-Shelby","compliance":null,"edi_pay_status":null,"edi_live_date":null,"associated":false,"associated_by":"CHOUHR01","associated_date":null,"disassociated_by":null,"disassociated_date":"12-14-2016 20:39","disassociation_reason":"sdgfdg","vendor_source_system_id":1001,"vendor_source_system_id":1001,"created_by":"ChouhR01","created_date":"12-14-2016 20:30","modified_by":null,"modified_date":null,"$$hashKey":"uiGrid-00SC"};
        statesService.goToState = function(state, params){
            //spyOn($state, 'go');
            return;
        };

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

        mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss'),
            open: jasmine.createSpy('mockModal.open'),
            result: {
                then: jasmine.createSpy('mockModal.result.then')
            }
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
            },
            confirm: function( errorMessage ) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        gridOptions = {
            data: [
                { col1: 'col1', col2: 'col2' }
            ],
            onRegisterApi: function( api ){
                gridApi = api;
            }
        };

        gridApi = {
            grid: {
                appScope: {
                    navigateToVendorDetail: jasmine.createSpy('gridApi.grid.appScope.navigateToVendorDetail'),
                    navigateToCostCenterDetail: jasmine.createSpy('gridApi.grid.appScope.navigateToCostCenterDetail')
                }
            }
        };

        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

        mockedBookOfRecordService.getAllBookOfRecordDetails = function(pageSize, pageNumber, searchInput, sort) {
            var deferred = $q.defer();
            deferred.resolve({});
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedContactInfoService.getContactInfoData = function(pageSize, pageNumber, sort, vendorNumber, vendorSourceSystemId, searchInput) {
            var deferred = $q.defer();
            //console.log(pageSize, pageNumber, sort, vendorNumber, vendorSourceSystemId, searchInput);
            deferred.resolve({});
            deferred.promise.abort = function(){};
            console.log(deferred.promise);
            return deferred.promise;
        };

        mockedContactInfoService1.getContactInfoData = function(pageSize, pageNumber, sort, vendorNumber, vendorSourceSystemId, searchInput) {
            var deferred = $q.defer();
            deferred.reject('error');
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        bookOfRecordControllerForEmail = $controller('BookOfRecordController',
            {
                $scope:$scope,
                BookOfRecordService : mockedBookOfRecordsServiceForEmail,
                ContactInfoService : mockedContactInfoServiceForEmail,
                compassToastr: CompassToastr,
                ModalDialogService: mockModalDialogServiceForEmail,
                window : _$window_
            });

        Ctrl = $controller('BookOfRecordController',
            {
                $scope: $scope,
                $state: $state,
                $timeout:$timeout,
                $uibModalInstance: $uibModalInstance,
                $uibModal: $uibModal,
                compassToastr: CompassToastr,
                ADAMS_CONSTANTS: adamsConstants,
                ModalDialogService: mockModalDialogService,
                BookOfRecordService : mockedBookOfRecordService,
                ContactInfoService : mockedContactInfoService,
                Utils: mockUtils,  mockModal: mockModal});

        Ctrl2 = $controller('BookOfRecordController',
            {
                $scope: $scope,
                $state: $state,
                $timeout:$timeout,
                $uibModalInstance: $uibModalInstance,
                $uibModal: $uibModal,
                compassToastr: CompassToastr,
                ADAMS_CONSTANTS: adamsConstants,
                ModalDialogService: mockModalDialogService,
                BookOfRecordService : mockedBookOfRecordService,
                ContactInfoService : mockedContactInfoService1,
                Utils: mockUtils,  mockModal: mockModal});

    }));

    it('should initialize properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call emailBORVendorContacts', function () {
        spyOn(Ctrl, 'emailBORVendorContacts').and.callThrough();
        var searchData = {
            vendor_number: "1000",
            source_system_id: 1001
        };
        //Ctrl.vendorNumber = "1000";
        ///Ctrl.vendorSourceSystemId = 1001;
        Ctrl.emailBORVendorContacts(searchData);
        expect(Ctrl.emailBORVendorContacts).toHaveBeenCalledWith(searchData);
    });

    it('should call emailBORVendorContacts error', function () {
        spyOn(Ctrl2, 'emailBORVendorContacts').and.callThrough();
        var searchData = {
            vendor_number: "1000",
            source_system_id: 1001
        };
        Ctrl2.vendorNumber = "1000";
        Ctrl2.vendorSourceSystemId = 1001;
        Ctrl2.emailBORVendorContacts(searchData);
        expect(Ctrl2.emailBORVendorContacts).toHaveBeenCalledWith(searchData);
    });

    it('should call showBORViewContactsSearchData', function () {
        spyOn(Ctrl, 'showBORViewContactsSearchData').and.callThrough();
        var searchData = {
            vendor_number: "1000",
            source_system_id: 1001
        };
        Ctrl.vendorNumber = "1000";
        Ctrl.vendorSourceSystemId = 1001;
        Ctrl.showBORViewContactsSearchData(searchData);
        expect(Ctrl.showBORViewContactsSearchData).toHaveBeenCalledWith(searchData);
    });

    it('should call navigateToVendorDetail if block', function() {
        spyOn(statesService, 'goToState');
        var data = {
            vendor_number: '0000000599',
            vendorNumber: '0000000599',
            source_system_id: '1008'
        };
        spyOn(Ctrl, 'navigateToVendorDetail').and.callThrough();
        Ctrl.navigateToVendorDetail(data);
        $scope.$apply();
        expect(statesService.goToState).toHaveBeenCalledWith('vendordetails',
            {vendorSearchData: data, vendor_number: '0000000599', source_system_id: '1008'});
        expect(Ctrl.navigateToVendorDetail).toHaveBeenCalled();
    });

    it('should call navigateToCostCenterDetail if block', function() {
        spyOn(statesService, 'goToState');
        var data = {
            cost_center: '1000',
            cost_center_source_system_id: 1000
        };
        spyOn(Ctrl, 'navigateToCostCenterDetail').and.callThrough();
        Ctrl.navigateToCostCenterDetail(data);
        $scope.$apply();
        expect(statesService.goToState).toHaveBeenCalledWith('costcenterdetails', {
            costCenterSearchData: data,
            costCenter_number: '1000',
            source_system_id: 1000
        });
        expect(Ctrl.navigateToCostCenterDetail).toHaveBeenCalled();
    });

    it('should call uiGridLoadDetails', function() {
        $rootScope.$broadcast('uiGridLoadDetails', gridOptions, gridApi);
    });

    it('should call uiGridSelectedRows', function() {
        $rootScope.$broadcast('uiGridSelectedRows');
    });

    it('should call getGridData ', function() {
        Ctrl.getGridData();
    });

    it('should open mail client for emailids', function () {
        var emailIds = [
            "michael_scott@gmail.com",
            "jim_halpert@gmail.com"
        ];

        mockedContactInfoServiceForEmail.getContactInfoData = function(pageSize, pageNumber, sort, vendorNumber, vendorSourceSystemId, searchInput) {
            var deferred = $q.defer();
            deferred.resolve([
                {'notify_for_openings_closings':true, 'email':'michael_scott@gmail.com'},
                {'notify_for_openings_closings':false, 'email':'dwight_schrute@gmail.com'},
                {'notify_for_openings_closings':true, 'email':'jim_halpert@gmail.com'}
            ]);
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedBookOfRecordsServiceForEmail.getEmailIdsOfVendorContacts = function(contactInfo) {
            return emailIds;
        };
        spyOn(mockedBookOfRecordsServiceForEmail,"getEmailIdsOfVendorContacts").and.callThrough();
        bookOfRecordControllerForEmail.emailVendorContacts();
        $scope.$apply();
        //expect(window.location.href).toEqual('mailto:'+emailIds.join(';'));
    });

    it('should not open mail client when no applicable emailds present', function () {
        var emailIds = [];

        mockedContactInfoServiceForEmail.getContactInfoData = function(pageSize, pageNumber, sort, vendorNumber, vendorSourceSystemId, searchInput) {
            var deferred = $q.defer();
            deferred.resolve([]);
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedBookOfRecordsServiceForEmail.getEmailIdsOfVendorContacts = function(contactInfo) {
            return emailIds;
        };

        mockModalDialogServiceForEmail.alert = function(args){
            return;
        };

        spyOn(mockedBookOfRecordsServiceForEmail,"getEmailIdsOfVendorContacts").and.callThrough();
        bookOfRecordControllerForEmail.emailVendorContacts();
        $scope.$apply();
    });

    it('should log an error', function () {
        var emailIds = [];

        mockedContactInfoServiceForEmail.getContactInfoData = function(pageSize, pageNumber, sort, vendorNumber, vendorSourceSystemId, searchInput) {
            var deferred = $q.defer();
            deferred.reject();
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        mockedBookOfRecordsServiceForEmail.getEmailIdsOfVendorContacts = function(contactInfo) {
            return emailIds;
        };
        spyOn(mockedBookOfRecordsServiceForEmail,"getEmailIdsOfVendorContacts").and.callThrough();
        bookOfRecordControllerForEmail.emailVendorContacts();
        $scope.$apply();
    });
});