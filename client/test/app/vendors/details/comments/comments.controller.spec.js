
'use strict';

describe('adams.vendor.comments.controller', function() {
    var Ctrl,
        Ctrl2,
        $scope,
        adamsConstants,
        vendorData,
        $rootScope,
        $httpBackend,
        $q,
        $uibModal,
        $filter,
        vendorSearchData,
        compassToastr,
        mockUtils = {},
        sampleSvcObj = {},
        sampleSvcObj1 = {},
        $utils,
        $compile,
        urlSpace;

    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.vendor.comments.controller'));
    beforeEach(module('adams.vendor.details.service'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.common.constants'));

    beforeEach(function() {
        module(function ($provide) {
            $provide.value('VendorDetailsService', sampleSvcObj);
            $provide.value('VendorDetailsService', sampleSvcObj1);
            $provide.value('Utils', mockUtils);
        });
    });

    beforeEach(inject(function($controller, $state, _$compile_, _$rootScope_, _$httpBackend_, _$uibModal_, _$filter_, $timeout, VendorDetailsService, _$q_, ADAMS_URL_SPACE, ADAMS_CONSTANTS, CompassToastr, Utils){

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
        $compile = _$compile_;
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
            "modified_date": null,
            "comment":''
        };

        $state.params ={"vendor_number":"10016000","source_system_id":"1001","vendorSearchData":{"vendor_number":"10016000","vendor_name_1":"VSA MIDATLANTIC","vendor_name_2":"","vendor_name_3":"                                   ","address":"1226 FOREST PKWY","city":"PAULSBORO","state":"NJ","zipcode":"08066-0000","country":"US ","telephone_number_1":"                ","telephone_number_2":"                ","fax_number":"                               ","category_code":"6909","category_description":"Inactive Suppliers                 ","model_market_classification":"Inactive","extraneous":null,"excluded":0,"diversity_code":"          ","district":"                                   ","train_station":"                         ","industry_key":"    ","parent_record_created_date":"10-27-1998 05:00","parent_record_created_by":"HORIZON     ","child_record_created_date":null,"child_record_created_by":null,"account_group":"0006","account_number_alt_payee":"          ","master_record_delete_flag":" ","tax_1":"                ","tax_2":"           ","one_time_account_ind":" ","training_partner_id":"      ","business_type":"                              ","telebox":"               ","personnel_number":null,"group_key":"          ","central_posting_block":true,"imposed_purchase_block":true,"payment_block":true,"company_code_posting_block":false,"tax_jurisdiction":"               ","company_code":null,"customer_number":"          ","terms_payment_key":null,"account_number":null,"clerk":null,"consolidation_code":null,"consolidation_description":null,"nominated_code":"X                             ","nominated_description":"Extraneous                    ","source_system_id":1001,"created_by":"BATCHADM","created_date":"10-26-2016 20:55","modified_by":"BATCHADM","modified_date":"10-31-2016 13:31"},"contactInfoData":null};

        vendorData = {"vendorNumber":"10016000","vendorSourceSystemId":"1001"};

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

        sampleSvcObj.updateVendorComment = function(vendorNumber, sourceSystemId, comment) {
            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
        };

        sampleSvcObj1.updateVendorComment = function(vendorNumber, sourceSystemId, comment) {
            var deferred = $q.defer();
            deferred.reject({});
            deferred.promise.abort = function(){};
            return deferred.promise;
        };

        Ctrl = $controller('VendorCommentsController', { $scope: $scope, $state: $state, VendorDetailsService: sampleSvcObj, compassToastr: CompassToastr, vendorSearchData: vendorSearchData, Utils: mockUtils});
        Ctrl2 = $controller('VendorCommentsController', { $scope: $scope, $state: $state, VendorDetailsService: sampleSvcObj1, compassToastr: CompassToastr, vendorSearchData: vendorSearchData, Utils: mockUtils});
    }));

    it('should initialize the CommentsController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call cancel ', function() {
        spyOn(Ctrl, 'cancel').and.callThrough();
        Ctrl.cancel();
        $scope.$apply();
        expect(Ctrl.cancel).toHaveBeenCalled();
    });

    it('should call save', function() {
        spyOn(Ctrl, 'save').and.callThrough();
        Ctrl.vendorSearchData= vendorSearchData;
        Ctrl.save();
        $scope.$apply();
        expect(Ctrl.save).toHaveBeenCalled();
    });

    it('should call save error', function() {
        spyOn(Ctrl2, 'save').and.callThrough();
        Ctrl2.vendorSearchData= vendorSearchData;
        Ctrl2.save();
        $scope.$apply();
        expect(Ctrl2.save).toHaveBeenCalled();
    });
});