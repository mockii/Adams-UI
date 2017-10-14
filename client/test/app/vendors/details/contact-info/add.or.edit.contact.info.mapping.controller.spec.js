/**
 * Created by ChouhR01 on 1/5/2017.
 */
'use strict';

describe('AddOrEditContactInfoMappingController', function() {
    var Ctrl,
        Ctrl2,
        Ctrl3,
        Ctrl4,
        Ctrl5,
        Ctrl6,
        $scope,
        $state,
        logService = {},
        CompassToastr,
        adamsConstants,
        mockModalDialogService,
        contactInfoRowData,
        action,
        action2,
        vendorData,
        ContactInfoService,
        mockContactInfoService = {},
        mockContactInfoService2 = {},
        mockContactInfoService3 = {},
        mockContactInfoService4 = {},
        mockContactInfoService5 = {},
        mockContactInfoService6 = {},
        callWith = {},
        $rootScope,
        mockUtils = {},
        $httpBackend,
        $q,
        $uibModalInstance,
        mockModal,
        compassToastr,
        sampleSvcObj,
        templateHtml,
        formElem,
        form,
        urlSpace;

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.contact.info.service'));
    beforeEach(module('adams.add.or.edit.contact.info.controller'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.contact.info.controller'));
    beforeEach(module('HTMLTemplates'));

    beforeEach(function() {
        module(function ($provide) {
            $provide.value('ContactInfoService', mockContactInfoService);
            $provide.value('ContactInfoService', mockContactInfoService2);
            $provide.value('ContactInfoService', mockContactInfoService3);
            $provide.value('ContactInfoService', mockContactInfoService4);
            $provide.value('ContactInfoService', mockContactInfoService5);
            $provide.value('ContactInfoService', mockContactInfoService6);
            $provide.value('STGLogService', logService);
            $provide.value('Utils', mockUtils);
        });
    });

    beforeEach(inject(function($controller, $rootScope, _$httpBackend_, ContactInfoService, _$q_, ADAMS_URL_SPACE, ADAMS_CONSTANTS, CompassToastr, $templateCache, $compile, $http, STGLogService, $log){
        $rootScope = $rootScope;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        sampleSvcObj = ContactInfoService;
        $q = _$q_;
        compassToastr = CompassToastr;
        adamsConstants = ADAMS_CONSTANTS;
        urlSpace  = ADAMS_URL_SPACE;
        logService = STGLogService;

        action = "edit";
        action2 = "add";
        vendorData = {"vendorNumber":"10016000","vendorSourceSystemId":"1001"};

        contactInfoRowData = {"vendor_contact_id":1010,"vendor_name_1":"VSA MIDATLANTIC","vendor_number":"10016000","first_name":"sdfsdf","last_name":"sdfsdf","telephone_1":"5678901234","telephone_2":"5678901235","fax":"3455467687","email":"asdasd@dfdsf.dfg","notify_for_openings_closings":true,"description":"asdasd","source_system_id":1001,"CREATED_BY":"ChouhR01","CREATED_DATE":"12-15-2016","MODIFIED_BY":null,"MODIFIED_DATE":null,"$$hashKey":"uiGrid-00QR"};

        mockModalDialogService = {
            result: {
                then: function(confirmCallback, cancelCallback) {
                    //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
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


        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);


        mockModal = {
            close: jasmine.createSpy('mockModal.close'),
            dismiss: jasmine.createSpy('mockModal.dismiss'),
            open: jasmine.createSpy('mockModal.open'),
            result: {
                then: jasmine.createSpy('mockModal.result.then')
            }

        };

        mockContactInfoService.updateContactInfo = function(vendorNumber, vendor_contact_id, vendorSourceSystemId, contactInfoRowData) {
            var deferred = $q.defer();
            deferred.resolve({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"cost_center_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"cost_center_source_system_id":1001}],"error":"{}"});
            return deferred.promise;
        };

        mockContactInfoService2.updateContactInfo = function(vendorNumber, vendor_contact_id, vendorSourceSystemId, contactInfoRowData) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockContactInfoService6.updateContactInfo = function(vendorNumber, vendor_contact_id, vendorSourceSystemId, contactInfoRowData) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        mockContactInfoService3.addContactInfo = function(vendorNumber, vendorSourceSystemId, contactInfoRowData) {
            var deferred = $q.defer();
            deferred.resolve({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"cost_center_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"cost_center_source_system_id":1001}],"error":"{}"});
            return deferred.promise;
        };

        mockContactInfoService4.addContactInfo = function(vendorNumber, vendorSourceSystemId, contactInfoRowData) {
            var deferred = $q.defer();
            deferred.resolve('error');
            return deferred.promise;
        };

        mockContactInfoService5.addContactInfo = function(vendorNumber, vendorSourceSystemId, contactInfoRowData) {
            var deferred = $q.defer();
            deferred.reject({});
            return deferred.promise;
        };

        Ctrl = $controller('AddOrEditContactInfoMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService,  contactInfoRowData: contactInfoRowData, action:action, vendorData:vendorData, ContactInfoService: mockContactInfoService, Utils: mockUtils});
        Ctrl2 = $controller('AddOrEditContactInfoMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService,  contactInfoRowData: contactInfoRowData, action:action, vendorData:vendorData, ContactInfoService: mockContactInfoService2, Utils: mockUtils});
        Ctrl3 = $controller('AddOrEditContactInfoMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService,  contactInfoRowData: contactInfoRowData, action:action2, vendorData:vendorData, ContactInfoService: mockContactInfoService3, Utils: mockUtils});
        Ctrl4 = $controller('AddOrEditContactInfoMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService,  contactInfoRowData: contactInfoRowData, action:action2, vendorData:vendorData, ContactInfoService: mockContactInfoService4, Utils: mockUtils});
        Ctrl5 = $controller('AddOrEditContactInfoMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService,  contactInfoRowData: contactInfoRowData, action:action2, vendorData:vendorData, ContactInfoService: mockContactInfoService5, Utils: mockUtils});
        Ctrl6 = $controller('AddOrEditContactInfoMappingController', { $scope: $scope, $state: $state, $uibModalInstance: $uibModalInstance, compassToastr: CompassToastr, ADAMS_CONSTANTS: adamsConstants,  ModalDialogService: mockModalDialogService,  contactInfoRowData: contactInfoRowData, action:action, vendorData:vendorData, ContactInfoService: mockContactInfoService6, Utils: mockUtils});

    }));

    it("should exists", function() {
        expect(sampleSvcObj).toBeDefined();
    });

    it('should initialize the AddOrEditContactInfoMappingController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should be true', function () {
        $scope.$apply();
        expect(Ctrl.notifyForOpeningsOrClosings ).toBe(true);
    });

    it('should be empty', function () {
        contactInfoRowData = {"first_name":"","last_name":"","telephone_1":"","telephone_2":"","fax":"","email":"","notify_for_openings_closings":false,"description":""};
        expect(action2).toEqual("add");
        Ctrl2.firstName = "";
        expect( contactInfoRowData.first_name ).toEqual(Ctrl2.firstName);
    });

    it('should dismiss the modal with result "dismiss" when dismissed', function () {
        Ctrl.close($uibModalInstance.dismiss('cancel'));
        expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

    it('should call errorHandling', function () {
        Ctrl.errorHandling('error');
    });

    it('should call dirtyCheck ', function () {
        Ctrl.dirtyCheck(1,2);
        expect(Ctrl.isFormActuallyDirty).toBe(true);
    });

    it('should call save with valid form with edit action and call else block ', inject(function ($q, $rootScope) {
        var contactInfoResponse;
        var deferred = $q.defer();
        var contactForm = {
            $valid: true
        };
        $scope.$apply();
        spyOn(Ctrl, 'save').and.callThrough();
        Ctrl.save(contactForm);
        expect(Ctrl.save).toHaveBeenCalled();

        var updateContactInfoMappingPromise = mockContactInfoService.updateContactInfo(vendorData.vendorNumber, contactInfoRowData.vendor_contact_id, vendorData.vendorSourceSystemId, contactInfoRowData);

        updateContactInfoMappingPromise.then(function(response) {
            if (response === 'error') {
                spyOn(Ctrl, 'errorHandling').and.callThrough();
                Ctrl.errorHandling('An error occurred while getting vendors data');
                expect(Ctrl.errorHandling).toHaveBeenCalledWith('An error occurred while getting vendors data');
                $uibModalInstance.close('refresh');
                expect($uibModalInstance.close).toHaveBeenCalledWith('refresh');
            } else {
                contactInfoResponse = response;
                $uibModalInstance.close('refresh');
                expect($uibModalInstance.close).toHaveBeenCalledWith('refresh');
            }
        }, function(error) {
            expect(function(){ throw errorMessage}).toThrow(errorMessage);
        });

        expect(contactInfoResponse).toBeUndefined();
        deferred.resolve({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"cost_center_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"cost_center_source_system_id":1001}],"error":"{}"});
        expect(contactInfoResponse).toBeUndefined()

        $rootScope.$apply();
        expect(contactInfoResponse).toEqual({"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"2"},"data":[{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"ASSOCIATED","message":"Initial Creation","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:30","vendor_source_system_id":1001,"cost_center_source_system_id":1001},{"vendor_number":"10016011","vendor_name_1":"VSA OF OHIO","cost_center_name":"11889","cost_center_description":"$$$Wal-Mart-Shelby","action":"UPDATED","message":"UPDATED","user_name":"CHOUHR01","first_name":"RAKESH","last_name":"CHOUHAN","email":"DO_NOT_REPLY_RAKESH.CHOUHAN@COMPASS-USA.COM","phone_number":null,"action_date":"12-14-2016 20:39","vendor_source_system_id":1001,"cost_center_source_system_id":1001}],"error":"{}"});
    }));

    it('should call save with valid form with edit action and call response error ', inject(function ($q, $rootScope) {
        var contactInfoResponse;
        var deferred = $q.defer();
        var contactForm = {
            $valid: true
        };
        $scope.$apply();
        spyOn(Ctrl2, 'save').and.callThrough();
        Ctrl2.save(contactForm);
        expect(Ctrl2.save).toHaveBeenCalled();

        var errorMessage = 'An error occurred while updating vendor contact info data';

        var updateContactInfoMappingPromise = mockContactInfoService2.updateContactInfo(vendorData.vendorNumber, contactInfoRowData.vendor_contact_id, vendorData.vendorSourceSystemId, contactInfoRowData);
        updateContactInfoMappingPromise.then(function(response) {
            if (response === 'error') {
                spyOn(Ctrl2, 'errorHandling').and.callThrough();
                Ctrl2.errorHandling('An error occurred while getting vendors data');
                expect(Ctrl2.errorHandling).toHaveBeenCalledWith('An error occurred while getting vendors data');
                $uibModalInstance.close('refresh');
                expect($uibModalInstance.close).toHaveBeenCalledWith('refresh');
            } else {
                contactInfoResponse = response;
                $uibModalInstance.close('refresh');
                expect($uibModalInstance.close).toHaveBeenCalledWith('refresh');
            }
        }, function(error) {
            expect(function(){ throw errorMessage}).toThrow(errorMessage);
        });

        expect(contactInfoResponse).toBeUndefined();
        deferred.resolve(callWith);
        expect(contactInfoResponse).toBeUndefined();

        $rootScope.$apply();
        expect(contactInfoResponse).toBeUndefined();
    }));

    it('should call save with invalid form ', function () {
        var contactForm = {
            $valid: false
        };
        $scope.$apply();
        spyOn(Ctrl2, 'save').and.callThrough();
        Ctrl2.save(contactForm);
        expect(Ctrl2.save).toHaveBeenCalledWith(contactForm);
    });

    it('should call save with valid form with add action, and call else block', inject(function ($q, $rootScope) {
        var contactInfoResponse;
        var deferred = $q.defer();
        var contactForm = {
            $valid: true
        };
        $scope.$apply();
        spyOn(Ctrl3, 'save').and.callThrough();
        Ctrl3.save(contactForm);
        expect(Ctrl3.save).toHaveBeenCalled();

        var errorMessage = 'An error occurred while adding contact info data';

        var addContactInfoMappingPromise = mockContactInfoService3.addContactInfo(vendorData.vendorNumber, vendorData.vendorSourceSystemId, contactInfoRowData);

        addContactInfoMappingPromise.then(function(response) {
            if (response === 'error') {
                spyOn(Ctrl3, 'errorHandling').and.callThrough();
                Ctrl3.errorHandling('An error occurred while getting vendors data');
                expect(Ctrl3.errorHandling).toHaveBeenCalledWith('An error occurred while getting vendors data');
                $uibModalInstance.close('refresh');
                expect($uibModalInstance.close).toHaveBeenCalledWith('refresh');
            } else {
                contactInfoResponse = response;
                $uibModalInstance.close('refresh');
                expect($uibModalInstance.close).toHaveBeenCalledWith('refresh');
            }
        }, function(error) {
            expect(function(){ throw errorMessage}).toThrow(errorMessage);
        });

        expect(contactInfoResponse).toBeUndefined();
        deferred.resolve(callWith);
        expect(contactInfoResponse).toBeUndefined();

        $rootScope.$apply();
        // expect(contactInfoResponse).toEqual(callWith);
    }));

    it('should call save with valid form with edit action and receive error ', inject(function ($q, $rootScope) {
        var contactForm = {
            $valid: true
        };
        spyOn(Ctrl6, 'save').and.callThrough();
        Ctrl6.save(contactForm);
        $scope.$apply();
        expect(Ctrl6.save).toHaveBeenCalled();
    }));

    it('should call save with valid form with add action, and get response error ', inject(function ($q, $rootScope) {
        var contactInfoResponse;
        var deferred = $q.defer();
        var contactForm = {
            $valid: true
        };
        $scope.$apply();
        spyOn(Ctrl4, 'save').and.callThrough();
        Ctrl4.save(contactForm);
        expect(Ctrl4.save).toHaveBeenCalled();

        var errorMessage = 'An error occurred while adding contact info data';

        var addContactInfoMappingPromise = mockContactInfoService4.addContactInfo(vendorData.vendorNumber, vendorData.vendorSourceSystemId, contactInfoRowData);

        addContactInfoMappingPromise.then(function(response) {
            if (response === 'error') {
                spyOn(Ctrl4, 'errorHandling').and.callThrough();
                Ctrl4.errorHandling('An error occurred while adding contact info data');
                expect(Ctrl4.errorHandling).toHaveBeenCalledWith('An error occurred while adding contact info data');
                $uibModalInstance.close('refresh');
                expect($uibModalInstance.close).toHaveBeenCalledWith('refresh');
            } else {
                contactInfoResponse = response;
                $uibModalInstance.close('refresh');
                expect($uibModalInstance.close).toHaveBeenCalledWith('refresh');
            }
        }, function(error) {
            expect(function(){ throw errorMessage}).toThrow(errorMessage);
        });

        expect(contactInfoResponse).toBeUndefined();
        deferred.resolve(callWith);
        expect(contactInfoResponse).toBeUndefined();

        $rootScope.$apply();
        // expect(contactInfoResponse).toEqual(callWith);
        expect(contactInfoResponse).toBeUndefined();
    }));

    it('should call save with valid form with add action, and receive error ', inject(function ($q, $rootScope) {
        var contactForm = {
            $valid: true
        };
        spyOn(Ctrl5, 'save').and.callThrough();
        Ctrl5.save(contactForm);
        $scope.$apply();
        expect(Ctrl5.save).toHaveBeenCalled();
    }));
})
