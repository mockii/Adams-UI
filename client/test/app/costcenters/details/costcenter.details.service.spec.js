/**
 * Created by RegonS01 on 10/18/2016.
 */

'use strict';

describe('CostcenterDetailsService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        urlSpace,
        mockHttp,
        promise,
        costcenterSearchData = '{"data":[{"total_count": 59988, "users": [{ "vendor_number": "10016000","vendor_name_1": "VSA MIDATLANTIC","vendor_name_2": "","vendor_name_3": "     ","address": "1226 FOREST PKWY","city": "PAULSBORO","state": "NJ","zipcode": "08066-0000","country": "US ","telephone_number_1": "    ","telephone_number_2": "    ","fax_number": " ","category_code": "6909","category_description": "Inactive Suppliers     ","model_market_classification": "Inactive","extraneous": null,"excluded": 0,"diversity_code": "    ","district": "     ","train_station": " ","industry_key": "    ","parent_record_created_date": null,"parent_record_created_by": "HORIZON     ","child_record_created_date": null,"child_record_created_by": null,"account_group": "0006","account_number_alt_payee": "    ","master_record_delete_flag": " ","tax_1": "    ","tax_2": "     ","one_time_account_ind": " ","training_partner_id": "","business_type": "","telebox": "   ","personnel_number": null,"group_key": "    ","central_posting_block": true,"imposed_purchase_block": true,"payment_block": true,"company_code_posting_block": false,"tax_jurisdiction": "   ","company_code": null,"customer_number": "    ","terms_payment_key": null,"account_number": null,"clerk": null,"consolidation_code": null,"consolidation_description": null,"nominated_code": "X     ","nominated_description": "Extraneous  ","source_system_id": 1001,"created_by": "BATCHADM","created_date": "09-20-2016 20:49","modified_by": null,"modified_date": null}]}]}';

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.costcenter.details.service'));

    beforeEach(inject(function($rootScope, _$httpBackend_, CostCenterDetailsService, _$q_, ADAMS_URL_SPACE){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = CostCenterDetailsService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get Vendor Detail Info', function(){
        var limit = 25,
            page = 1,
            sourceSystemId = '1',
            costCenterNumber = '2',
            url = urlSpace.urls.local.costCenterDetails+ '?sourceSystemId=' + sourceSystemId+ '&costCenterNumber=' + costCenterNumber;
        costcenterSearchData = JSON.parse(costcenterSearchData);
        $httpBackend.expectGET(url).respond(costcenterSearchData);
        sampleSvcObj.getCostCenterDetails(costCenterNumber, sourceSystemId).then(function(response) {
            expect(response).toEqual(costcenterSearchData.data[0]);
        });
        $httpBackend.flush();
    });

    it('should throw error costcenter Detail Info', function(){
        var limit = 25,
            page = 1,
            sourceSystemId = '1',
            costCenterNumber = '2',
            url = urlSpace.urls.local.costCenterDetails+ '?sourceSystemId=' + sourceSystemId+ '&costCenterNumber=' + costCenterNumber;
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getCostCenterDetails(costCenterNumber, sourceSystemId).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
        scope.$digest();
    });
});
