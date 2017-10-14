/**
 * Created by RegonS01 on 9/1/2016.
 */
'use strict';

describe('vendor.details', function() {
    var $ocLazyLoadMock,
        $state,
        $rootScope,
        $scope,
        $injector,
        $ocLazyLoad,
        state = 'vendordetails',
        vendorSearchData = '[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.vendor.details.controller');
        module('adams.vendor.account.details.controller');
        module('adams.market.mapping.controller');
        module('adams.add.market.mapping.controller');
        module('adams.vendor.search');
        module('adams.vendor.search.controller');
        module('adams.vendor.details.service');

        module('adams.vendor.details', function ($provide) {
            //$provide.value('$ocLazyLoad', $ocLazyLoadMock = {});
        });

        inject(function (_$state_, $templateCache, _$rootScope_, _$injector_, $controller, _$ocLazyLoad_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $injector = _$injector_;
            $ocLazyLoad = _$ocLazyLoad_;
            $ocLazyLoad.load({
                name:'vendorDetails',
                    files:['css/vendor-details.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });

            $templateCache.put('vendors/details/vendor.details.tpl.html', '');
        });
    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/vendors//');
    });

    it('vendordetails', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('vendordetails').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
    }));

    it('vendordetails.accountmapping', inject(function($state, $stateParams, $injector, $httpBackend) {
        $injector.invoke($state.get('vendordetails.accountmapping').resolve['vendorSearchData'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
    }));

    it('vendordetails.accountmapping if block', inject(function($state, $stateParams, $injector, $httpBackend) {
        $stateParams.vendorSearchData = vendorSearchData;
        $injector.invoke($state.get('vendordetails.accountmapping').resolve['vendorSearchData']);
    }));

    it('vendordetails.marketmapping', inject(function($state, $stateParams, $injector, $httpBackend) {
        $stateParams.vendorSearchData = null;
        $injector.invoke($state.get('vendordetails.marketmapping').resolve['vendorSearchData'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
    }));

    it('vendordetails.marketmapping if block', inject(function($state, $stateParams, $injector, $httpBackend) {
        $stateParams.vendorSearchData = vendorSearchData;
        $injector.invoke($state.get('vendordetails.marketmapping').resolve['vendorSearchData']);
    }));

    it('vendordetails.costCentermapping', inject(function($state, $stateParams, $injector, $httpBackend) {
        $stateParams.vendorSearchData = null;
        $injector.invoke($state.get('vendordetails.costCentermapping').resolve['vendorSearchData'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
    }));

    it('vendordetails.costCentermapping if block', inject(function($state, $stateParams, $injector, $httpBackend) {
        $stateParams.vendorSearchData = vendorSearchData;
        $injector.invoke($state.get('vendordetails.costCentermapping').resolve['vendorSearchData']);
    }));

    it('vendordetails.contactInfo', inject(function($state, $stateParams, $injector, $httpBackend) {
        $stateParams.vendorSearchData = null;
        $injector.invoke($state.get('vendordetails.contactInfo').resolve['vendorSearchData'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
    }));

    it('vendordetails.contactInfo if block', inject(function($state, $stateParams, $injector, $httpBackend) {
        $stateParams.vendorSearchData = vendorSearchData;
        $injector.invoke($state.get('vendordetails.contactInfo').resolve['vendorSearchData']);
    }));

    it('vendordetails.comments', inject(function($state, $stateParams, $injector, $httpBackend) {
        $stateParams.vendorSearchData = null;
        $injector.invoke($state.get('vendordetails.comments').resolve['vendorSearchData'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
    }));

    it('vendordetails.comments if block', inject(function($state, $stateParams, $injector, $httpBackend) {
        $stateParams.vendorSearchData = vendorSearchData;
        $injector.invoke($state.get('vendordetails.comments').resolve['vendorSearchData']);
    }));

});