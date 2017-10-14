/**
 * Created by RegonS01 on 10/18/2016.
 */

'use strict';

describe('VendorMappingService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        promise,
        urlSpace,
        vendorMappingData = '[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]';

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.vendor.mapping.service'));

    beforeEach(inject(function($rootScope, _$httpBackend_,VendorMappingService, ADAMS_URL_SPACE, _$q_){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = VendorMappingService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;

        promise = {
            abort: jasmine.createSpyObj('promise', ['abort'])
        }
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get Vendor Mapping Data', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            costCenterNumber='',
            sourceSystemId='',
            search=null,
            vendorSearchInput={},
            teamName = '',

            url = urlSpace.urls.local.costCenterVendors.replace('{costCenterNumber}', costCenterNumber) + '?sourceSystemId=' + sourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterNumber=' + costCenterNumber + '&vendorSearchInput=' + JSON.stringify(vendorSearchInput);
        spyOn(promise, 'abort').and.callThrough();
        vendorMappingData  = JSON.parse(vendorMappingData );
        $httpBackend.expectGET(url).respond(vendorMappingData );
        sampleSvcObj.getVendorMappingData(limit, page, sort, sourceSystemId, costCenterNumber, vendorSearchInput).then(function(data) {
            expect(data[0]).toEqual(vendorMappingData[0]);
        });
        $httpBackend.flush();
    });

    it('should abort Vendor Mapping Data promise', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            costCenterNumber='',
            sourceSystemId='',
            search=null,
            vendorSearchInput={},
            teamName = '',

            url = urlSpace.urls.local.costCenterVendors.replace('{costCenterNumber}', costCenterNumber) + '?sourceSystemId=' + sourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterNumber=' + costCenterNumber + '&vendorSearchInput=' + JSON.stringify(vendorSearchInput);
        $httpBackend.expectGET(url).respond(vendorMappingData );
        sampleSvcObj.getVendorMappingData(limit, page, sort, sourceSystemId, costCenterNumber, vendorSearchInput).abort();
    });

    it('should error app by get vendor Mapping Data', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            costCenterNumber='',
            sourceSystemId='',
            search=null,
            vendorSearchInput={},
            teamName = '',

            url = urlSpace.urls.local.costCenterVendors.replace('{costCenterNumber}', costCenterNumber) + '?sourceSystemId=' + sourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&costCenterNumber=' + costCenterNumber + '&vendorSearchInput=' + JSON.stringify(vendorSearchInput);
        spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getVendorMappingData(limit, page, sort, sourceSystemId, costCenterNumber, vendorSearchInput).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
    });

    it('should updateCostCenterVendor ', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            vendorRowData={
                vendor_number:80,
                cost_center_name:'',
                vendor_source_system_id:9,
                cost_center_source_system_id:65
            },
            message = "Success",
            sourceSystemId='',
            search=null,
            vendorMappingHistorySearchInput='',
            teamName = '',
            url = urlSpace.urls.local.updateCostCenterVendor.replace('{vendorNumber}', vendorRowData.vendor_number).replace('{costCenterNumber}',
                    vendorRowData.cost_center_name) + '?cost_center_vendor=' + vendorRowData.cost_center_name + '&vendor_number=' +
                    vendorRowData.vendor_number + '&cost_center_name=' + vendorRowData.cost_center_name + '&vendorSourceSystemId='
                    + vendorRowData.vendor_source_system_id + '&costCenterSourceSystemId=' + vendorRowData.cost_center_source_system_id;
        $httpBackend.expectPUT(url).respond(message);
        sampleSvcObj.updateCostCenterVendor(vendorRowData).then(function(response) {
            expect(response.data).toEqual("Success");
        });
        $httpBackend.flush();
    });

    it('should error app by updateCostCenterVendor', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            vendorRowData={
                vendor_number:80,
                cost_center_name:'123',
                vendor_source_system_id:9,
                cost_center_source_system_id:65
            },
            message = "Success",
            sourceSystemId='',
            search=null,
            vendorMappingHistorySearchInput='',
            teamName = '',

            url = urlSpace.urls.local.updateCostCenterVendor.replace('{vendorNumber}', vendorRowData.vendor_number).replace('{costCenterNumber}', vendorRowData.cost_center_name) + '?cost_center_vendor=' + vendorRowData.cost_center_name + '&vendor_number=' + vendorRowData.vendor_number + '&cost_center_name=' + vendorRowData.cost_center_name + '&vendorSourceSystemId=' + vendorRowData.vendor_source_system_id + '&costCenterSourceSystemId=' + vendorRowData.cost_center_source_system_id;

        $httpBackend.expectPUT(url).respond(400, {});
        sampleSvcObj.updateCostCenterVendor(vendorRowData).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();

    });

    it('should getVendorMappingHistoryData ', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            vendorRowData={
                vendor_number:80,
                cost_center_name:'',
                vendor_source_system_id:9,
                cost_center_source_system_id:65
            },
            message = "Success",
            sourceSystemId='',
            search=null,
            vendorMappingHistorySearchInput='',
            teamName = '',

            url = urlSpace.urls.local.costCenterVendorHistory.replace('{vendorNumber}', vendorRowData.vendor_number)
                    .replace('{costCenterNumber}', vendorRowData.cost_center_name) + '?vendorSourceSystemId=' + vendorRowData.vendor_source_system_id +
                '&costCenterSourceSystemId=' + vendorRowData.cost_center_source_system_id + '&limit=' + limit + '&page=' + page + '&sorts=' +
                sort + '&vendorMappingHistorySearchInput=' + JSON.stringify(vendorMappingHistorySearchInput),

        vendorMappingData = '[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]';


        spyOn(promise, 'abort').and.callThrough();
        vendorMappingData = JSON.parse(vendorMappingData);
        $httpBackend.expectGET(url).respond(vendorMappingData);
        sampleSvcObj.getVendorMappingHistoryData(limit, page, sort, vendorMappingHistorySearchInput, vendorRowData).then(function(data) {
            expect(data[0]).toEqual(vendorMappingData[0]);
        });
        $httpBackend.flush();
    });

    it('should abort getVendorMappingHistoryData promise', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            vendorRowData={
                vendor_number:80,
                cost_center_name:'',
                vendor_source_system_id:9,
                cost_center_source_system_id:65
            },
            message = "Success",
            sourceSystemId='',
            search=null,
            vendorMappingHistorySearchInput='',
            teamName = '',

            url = urlSpace.urls.local.costCenterVendorHistory.replace('{vendorNumber}', vendorRowData.vendor_number)
                    .replace('{costCenterNumber}', vendorRowData.cost_center_name) + '?vendorSourceSystemId=' + vendorRowData.vendor_source_system_id +
                '&costCenterSourceSystemId=' + vendorRowData.cost_center_source_system_id + '&limit=' + limit + '&page=' + page + '&sorts=' +
                sort + '&vendorMappingHistorySearchInput=' + JSON.stringify(vendorMappingHistorySearchInput),

            vendorMappingData = '[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]';


        $httpBackend.expectGET(url).respond(vendorMappingData);
        sampleSvcObj.getVendorMappingHistoryData(limit, page, sort, vendorMappingHistorySearchInput, vendorRowData).abort();
    });

    it('should error app by getVendorMappingHistoryData ', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            vendorRowData={
                vendor_number:80,
                cost_center_name:'',
                vendor_source_system_id:9,
                cost_center_source_system_id:65
            },
            message = "Success",
            sourceSystemId='',
            search=null,
            vendorMappingHistorySearchInput='',
            teamName = '',

            url = urlSpace.urls.local.costCenterVendorHistory.replace('{vendorNumber}', vendorRowData.vendor_number)
                    .replace('{costCenterNumber}', vendorRowData.cost_center_name) + '?vendorSourceSystemId=' + vendorRowData.vendor_source_system_id +
                '&costCenterSourceSystemId=' + vendorRowData.cost_center_source_system_id + '&limit=' + limit + '&page=' + page + '&sorts=' +
                sort + '&vendorMappingHistorySearchInput=' + JSON.stringify(vendorMappingHistorySearchInput),

            vendorMappingData = '[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]';

        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getVendorMappingHistoryData(limit, page, sort, vendorMappingHistorySearchInput, vendorRowData).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();

    });

    it('should getEligibleVendorData ', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            vendorRowData={
                vendor_number:80,
                cost_center_name:'',
                vendor_source_system_id:9,
                cost_center_source_system_id:65
            },
            message = "Success",
            sourceSystemId='',
            search=null,
            vendorMappingHistorySearchInput='',
            costCenterNumber=8,
            costCenterSourceSystemId=9,
            eligibleVendorSearchInput='',
            teamName = '',

            url = urlSpace.urls.local.eligibleCostCenterVendor.replace('{costCenterNumber}', costCenterNumber) +
                '?costCenterSourceSystemId=' + costCenterSourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts='
                + sort + '&eligibleVendorSearchInput=' + JSON.stringify(eligibleVendorSearchInput);
        vendorMappingData = '[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]';


        spyOn(promise, 'abort').and.callThrough();
        vendorMappingData = JSON.parse(vendorMappingData);
        $httpBackend.expectGET(url).respond(vendorMappingData);
        sampleSvcObj.getEligibleVendorData(limit, page, sort, eligibleVendorSearchInput, costCenterNumber, costCenterSourceSystemId).then(function(data) {
            expect(data[0]).toEqual(vendorMappingData[0]);
        });
        $httpBackend.flush();
    });

    it('should abort getEligibleVendorData promise', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            vendorRowData={
                vendor_number:80,
                cost_center_name:'',
                vendor_source_system_id:9,
                cost_center_source_system_id:65
            },
            message = "Success",
            sourceSystemId='',
            search=null,
            vendorMappingHistorySearchInput='',
            costCenterNumber=8,
            costCenterSourceSystemId=9,
            eligibleVendorSearchInput='',
            teamName = '',

            url = urlSpace.urls.local.eligibleCostCenterVendor.replace('{costCenterNumber}', costCenterNumber) +
                '?costCenterSourceSystemId=' + costCenterSourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts='
                + sort + '&eligibleVendorSearchInput=' + JSON.stringify(eligibleVendorSearchInput);
        vendorMappingData = '[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]';
        $httpBackend.expectGET(url).respond(vendorMappingData);
        sampleSvcObj.getEligibleVendorData(limit, page, sort, eligibleVendorSearchInput, costCenterNumber, costCenterSourceSystemId).abort();
    });

    it('should error app by getEligibleVendorData ', function(){
        var limit = 25,
            page = 1,
            sort = '',
            vendorNumber = '123',
            marketName = '',
            vendorRowData={
                vendor_number:80,
                cost_center_name:'',
                vendor_source_system_id:9,
                cost_center_source_system_id:65
            },
            message = "Success",
            sourceSystemId='',
            search=null,
            vendorMappingHistorySearchInput='',
            costCenterNumber=8,
            costCenterSourceSystemId=9,
            eligibleVendorSearchInput='',
            teamName = '',

            url = urlSpace.urls.local.eligibleCostCenterVendor.replace('{costCenterNumber}', costCenterNumber) +
                '?costCenterSourceSystemId=' + costCenterSourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts='
                + sort + '&eligibleVendorSearchInput=' + JSON.stringify(eligibleVendorSearchInput);
        vendorMappingData = '[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]';
        spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(400, {});
            sampleSvcObj.getEligibleVendorData(limit, page, sort, eligibleVendorSearchInput, costCenterNumber, costCenterSourceSystemId).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();

    });

    it('should add Vendor Mapping Info', function(){
        var costCenterNumber = "10016000",
            costCenterSourceSystemId = "1003",
            vendors = "1001",
            teamName = 'sfd',
            marketName='sdfsd',
            teamSourceSystemId='2122',
            message = "Success",
            url= urlSpace.urls.local.addEligibleVendors.replace('{costCenterNumber}', costCenterNumber) + '?costCenterSourceSystemId=' + costCenterSourceSystemId;
        console.log(url);
        $httpBackend.expectPOST(url).respond(message);
        sampleSvcObj.addVendorMapping(costCenterNumber, costCenterSourceSystemId, vendors)
            .then(function(response) {
                expect(response.data).toEqual(message);
            });
        $httpBackend.flush();
    });

    it('should error app by add vendor Mapping Data', function(){
        var costCenterNumber = "10016000",
            costCenterSourceSystemId = "1003",
            vendors = "1001",
            teamName = 'sfd',
            marketName='sdfsd',
            teamSourceSystemId='2122',
            message = "Success",

            url= urlSpace.urls.local.addEligibleVendors.replace('{costCenterNumber}', costCenterNumber) + '?costCenterSourceSystemId=' + costCenterSourceSystemId;
        //spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectPOST(url).respond(400, {});
        sampleSvcObj.addVendorMapping(costCenterNumber, costCenterSourceSystemId, vendors).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });

});