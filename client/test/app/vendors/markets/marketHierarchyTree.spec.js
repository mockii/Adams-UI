/**
 * Created by ChouhR01 on 7/12/2017.
 */
describe('ivhTreeviewOptionsProvider', function() {
    'use strict';
    var scope,
        sampleSvcObj,
        $q,
        $log,
        $httpBackend,
        urlSpace,
        Fact,
        ivhTreeviewOptionsProvider = {},
        mockHttp;

    beforeEach(function() {
        module('adams.vendor.markets');
        module('common.directives.treeview');
        module(function(_ivhTreeviewOptionsProvider_) {
            // this is a .config function
            ivhTreeviewOptionsProvider = _ivhTreeviewOptionsProvider_;
        });
        inject();
    });

    it('configures ivhTreeviewOptionsProvider', function() {
        expect(ivhTreeviewOptionsProvider).toBeDefined();
    });
});

describe('marketHierarchyTree', function() {

    var $scope, $compile, urlSpace, mockMarketHierarchyTreeService = {},
        element, $httpBackend, mockUtilsService = {}, logService = {},
        node = [{"market_name":"MGNET0","market_description":"Territories","market_display_path":null,"has_children":true,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNET0 - Territories","children":[],"leaf":false,"$$hashKey":"object:4787","__ivhTreeviewExpanded":false,"selected":true,"__ivhTreeviewIndeterminate":false}];
        childMarkets = [{"market_name":"MGNME01","market_description":"Allentown-Bethlehem-Easton","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME01 - Allentown-Bethlehem-Easton","children":[],"leaf":true},{"market_name":"MGNME02","market_description":"Harrisburg-Lebanon-Carlisle","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME02 - Harrisburg-Lebanon-Carlisle","children":[],"leaf":true},{"market_name":"MGNME03","market_description":"Lancaster","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME03 - Lancaster","children":[],"leaf":true},{"market_name":"MGNME04","market_description":"Philadelphia-Wilmington-Atlantic City, PA-NJ-DE-MD","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME04 - Philadelphia-Wilmington-Atlantic City, PA-NJ-DE-MD","children":[],"leaf":true},{"market_name":"MGNME05","market_description":"Reading","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME05 - Reading","children":[],"leaf":true},{"market_name":"MGNME06","market_description":"State College","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME06 - State College","children":[],"leaf":true},{"market_name":"MGNME07","market_description":"Williamsport","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME07 - Williamsport","children":[],"leaf":true},{"market_name":"MGNME08","market_description":"York","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME08 - York","children":[],"leaf":true}];

    mockUtilsService = {
        convertToBoolean: function(data){
            return data;
        }
    };

    beforeEach(function() {
        module('adams.vendor.markets');
        module('common.directives.treeview');
        module('common.services.Utils');
    });

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('MarketHierarchyTreeService', mockMarketHierarchyTreeService);
            $provide.value('UtilsService', mockUtilsService);
            $provide.value('STGLogService', logService);
        });
    });

    beforeEach(inject(function($rootScope, _$compile_, _$q_, _$httpBackend_, MarketHierarchyTreeService,  UtilsService, $log, STGLogService) {

        $scope = $rootScope.$new();
        $compile = _$compile_;
        $q = _$q_;
        $log = $log;
        logService = STGLogService;
        $httpBackend = _$httpBackend_;
        $scope.disableTreeToggle = true;
        //UtilsService = mockUtilsService;
        // urlSpace  = ADAMS_URL_SPACE;

        mockMarketHierarchyTreeService.getCurrentMarkets = function() {
            var deferred = $q.defer();
            deferred.resolve(node);
            //deferred.resolve({"metadata": [{"version": "1.0.0", "status": "Success", "http_status_code": "200","resultCount": "267217"}], "data": [{ "vendor_number": "10016000",                    "vendor_name_1": "VSA MIDATLANTIC",                    "vendor_name_2": "",                    "vendor_name_3": "                                   ",                    "address": "1226 FOREST PKWY",                    "city": "PAULSBORO",                    "state": "NJ",                    "zipcode": "08066-0000",                    "country": "US ",                    "telephone_number_1": "                ",                    "telephone_number_2": "                ",                    "fax_number": "                               ",                    "category_code": "6909",                    "category_description": "Inactive Suppliers                 ",                    "model_market_classification": "Inactive",                    "extraneous": null,                    "excluded": 0,                    "diversity_code": "          ",                    "district": "                                   ",                    "train_station": "                         ",                    "industry_key": "    ",                    "parent_record_created_date": null,                    "parent_record_created_by": "HORIZON     ",                    "child_record_created_date": null,                    "child_record_created_by": null,                    "account_group": "0006",                    "account_number_alt_payee": "          ",                    "master_record_delete_flag": " ",                    "tax_1": "                ",                    "tax_2": "           ",                    "one_time_account_ind": " ",                    "training_partner_id": "      ",                    "business_type": "                              ",                    "telebox": "               ",                    "personnel_number": null,                    "group_key": "          ",                    "central_posting_block": true,                    "imposed_purchase_block": true,                    "payment_block": true,                    "company_code_posting_block": false,                    "tax_jurisdiction": "               ",                    "company_code": null,                    "customer_number": "          ",                    "terms_payment_key": null,                    "account_number": null,                    "clerk": null,                    "consolidation_code": null,                    "consolidation_description": null,                    "nominated_code": "X                             ",                    "nominated_description": "Extraneous                    ",                    "source_system_id": 1001,                    "created_by": "BATCHADM",                    "created_date": "09-20-2016 20:49",                    "modified_by": null,                    "modified_date": null}]});
            return deferred.promise;
        };

        mockMarketHierarchyTreeService.getChildrenForNode = function() {
            var deferred = $q.defer();
            deferred.resolve(childMarkets);
            //deferred.resolve({"metadata": [{"version": "1.0.0", "status": "Success", "http_status_code": "200","resultCount": "267217"}], "data": [{ "vendor_number": "10016000",                    "vendor_name_1": "VSA MIDATLANTIC",                    "vendor_name_2": "",                    "vendor_name_3": "                                   ",                    "address": "1226 FOREST PKWY",                    "city": "PAULSBORO",                    "state": "NJ",                    "zipcode": "08066-0000",                    "country": "US ",                    "telephone_number_1": "                ",                    "telephone_number_2": "                ",                    "fax_number": "                               ",                    "category_code": "6909",                    "category_description": "Inactive Suppliers                 ",                    "model_market_classification": "Inactive",                    "extraneous": null,                    "excluded": 0,                    "diversity_code": "          ",                    "district": "                                   ",                    "train_station": "                         ",                    "industry_key": "    ",                    "parent_record_created_date": null,                    "parent_record_created_by": "HORIZON     ",                    "child_record_created_date": null,                    "child_record_created_by": null,                    "account_group": "0006",                    "account_number_alt_payee": "          ",                    "master_record_delete_flag": " ",                    "tax_1": "                ",                    "tax_2": "           ",                    "one_time_account_ind": " ",                    "training_partner_id": "      ",                    "business_type": "                              ",                    "telebox": "               ",                    "personnel_number": null,                    "group_key": "          ",                    "central_posting_block": true,                    "imposed_purchase_block": true,                    "payment_block": true,                    "company_code_posting_block": false,                    "tax_jurisdiction": "               ",                    "company_code": null,                    "customer_number": "          ",                    "terms_payment_key": null,                    "account_number": null,                    "clerk": null,                    "consolidation_code": null,                    "consolidation_description": null,                    "nominated_code": "X                             ",                    "nominated_description": "Extraneous                    ",                    "source_system_id": 1001,                    "created_by": "BATCHADM",                    "created_date": "09-20-2016 20:49",                    "modified_by": null,                    "modified_date": null}]});
            return deferred.promise;
        };

        element = $compile('<market-hierarchy-tree disable-tree-toggle="true" block-children-on-parent-select="true" ref-id="addMarketMappingController.marketMappingRefId" fetch-children-every-time="false" enable-multi-select="false" highlight-selected-node="true" broadcast-empty-selection="true" sync-global-market-selection-on-close="false" onscroll="true" expand-to-depth="3" treeview-options="something" />')($scope);

        $httpBackend.expectGET('vendors/markets/marketHierarchyTree.tpl.html').respond(200, '');
        $scope.$digest()
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('link directive', function() {

        it('should add class', function() {

            console.log(element);
            // check attribute values using isolateScope
            //expect(element.isolateScope().someValue).toEqual(5);

            // check the value right after directive attribute
            expect(element.attr('ref-id')).toEqual('addMarketMappingController.marketMappingRefId');
            // expect(element.hasAttribute('ref-id')).toBe(true);
            $httpBackend.flush();

            //test to make sure value changed which tests the updateButton Function
        });
    });
});

describe('MarketHierarchyTreeController', function() {
    "use strict";

    var Ctrl,Ctrl1,
        ivhTreeviewMgr,
        ivhTreeviewBfs,
        ivhTreeviewOptions,
        utilsService,
        marketHierarchyTreeService,
        mockMarketHierarchyTreeService = {},
        mockMarketHierarchyTreeService1 = {},
        mockUtilsService = {},
        logService = {},
        $rootScope,
        scope,
        $window,
        $q,
        $httpBackend,
        $interval,
        node,
        childMarkets,
        $uibModal;

    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.utils'));
    beforeEach(module('adams.common.constants'));
    beforeEach(module('adams.vendor.markets'));
    beforeEach(module('common.directives.treeview'));
    beforeEach(module('common.services.Utils'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('MarketHierarchyTreeService', mockMarketHierarchyTreeService);
            $provide.value('UtilsService', mockUtilsService);
            $provide.value('STGLogService', logService);
        });
    });

    beforeEach(inject(function ($controller, $compile, _$document_, _$rootScope_, _$window_, _$interval_, MarketHierarchyTreeService, ADAMS_CONSTANTS, _$q_, _$httpBackend_, STGLogService) {
        $rootScope = _$rootScope_;
        scope = _$rootScope_.$new();
        $window = _$window_;
        $interval = _$interval_;
        $q = _$q_;
        logService = STGLogService;
        ivhTreeviewOptions = {"idAttribute":"market_name","labelAttribute":"market_display_name","childrenAttribute":"children","selectedAttribute":"selected","blockedAttribute":"blocked","leafAttribute":"leaf","expandToDepth":0,"useCheckboxes":true,"validate":false,"indeterminateAttribute":"__ivhTreeviewIndeterminate","expandedAttribute":"__ivhTreeviewExpanded","defaultSelectedState":false,"twistieExpandedTpl":"<span class=\"fa fa-caret-down\"></span>","twistieCollapsedTpl":"<span class=\"fa fa-angle-right\"></span>","twistieLeafTpl":"","nodeTpl":"<div class=\"ivh-treeview-node-content\" title=\"{{trvw.label(node)}}\" >\n<div ng-class=\"{'highlight-nodelabel': trvw.isSelected(node) && trvw.useHighlightSelected()}\"  class=\"nodeview\">\n<span class=\"twistie\" ivh-treeview-toggle>\n<span class=\"ivh-treeview-twistie-wrapper\" ivh-treeview-twistie></span>\n</span>\n<span class=\"ivh-treeview-checkbox-wrapper\" ng-if=\"trvw.useCheckboxes()\"\nivh-treeview-checkbox>\n</span>\n<span class=\"ivh-treeview-node-label\" ivh-treeview-toggle>\n{{trvw.label(node)}}\n</span>\n</div>\n<div ivh-treeview-children></div>\n</div>"}
        $httpBackend = _$httpBackend_;
        scope.disableTreeToggle = true;
        scope.blockChildrenOnParentSelect = "true";
        node = [{"market_name":"MGNET0","market_description":"Territories","market_display_path":null,"has_children":true,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNET0 - Territories","children":[],"leaf":false,"$$hashKey":"object:4787","__ivhTreeviewExpanded":false,"selected":true,"__ivhTreeviewIndeterminate":false}];
        childMarkets = [{"market_name":"MGNME01","market_description":"Allentown-Bethlehem-Easton","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME01 - Allentown-Bethlehem-Easton","children":[],"leaf":true},{"market_name":"MGNME02","market_description":"Harrisburg-Lebanon-Carlisle","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME02 - Harrisburg-Lebanon-Carlisle","children":[],"leaf":true},{"market_name":"MGNME03","market_description":"Lancaster","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME03 - Lancaster","children":[],"leaf":true},{"market_name":"MGNME04","market_description":"Philadelphia-Wilmington-Atlantic City, PA-NJ-DE-MD","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME04 - Philadelphia-Wilmington-Atlantic City, PA-NJ-DE-MD","children":[],"leaf":true},{"market_name":"MGNME05","market_description":"Reading","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME05 - Reading","children":[],"leaf":true},{"market_name":"MGNME06","market_description":"State College","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME06 - State College","children":[],"leaf":true},{"market_name":"MGNME07","market_description":"Williamsport","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME07 - Williamsport","children":[],"leaf":true},{"market_name":"MGNME08","market_description":"York","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME08 - York","children":[],"leaf":true}];
        mockUtilsService = {
            convertToBoolean: function(data){
                return data;
            }
        };

        mockMarketHierarchyTreeService.getCurrentMarkets = function() {
            var deferred = $q.defer();
            deferred.resolve(node);
            //deferred.resolve({"metadata": [{"version": "1.0.0", "status": "Success", "http_status_code": "200","resultCount": "267217"}], "data": [{ "vendor_number": "10016000",                    "vendor_name_1": "VSA MIDATLANTIC",                    "vendor_name_2": "",                    "vendor_name_3": "                                   ",                    "address": "1226 FOREST PKWY",                    "city": "PAULSBORO",                    "state": "NJ",                    "zipcode": "08066-0000",                    "country": "US ",                    "telephone_number_1": "                ",                    "telephone_number_2": "                ",                    "fax_number": "                               ",                    "category_code": "6909",                    "category_description": "Inactive Suppliers                 ",                    "model_market_classification": "Inactive",                    "extraneous": null,                    "excluded": 0,                    "diversity_code": "          ",                    "district": "                                   ",                    "train_station": "                         ",                    "industry_key": "    ",                    "parent_record_created_date": null,                    "parent_record_created_by": "HORIZON     ",                    "child_record_created_date": null,                    "child_record_created_by": null,                    "account_group": "0006",                    "account_number_alt_payee": "          ",                    "master_record_delete_flag": " ",                    "tax_1": "                ",                    "tax_2": "           ",                    "one_time_account_ind": " ",                    "training_partner_id": "      ",                    "business_type": "                              ",                    "telebox": "               ",                    "personnel_number": null,                    "group_key": "          ",                    "central_posting_block": true,                    "imposed_purchase_block": true,                    "payment_block": true,                    "company_code_posting_block": false,                    "tax_jurisdiction": "               ",                    "company_code": null,                    "customer_number": "          ",                    "terms_payment_key": null,                    "account_number": null,                    "clerk": null,                    "consolidation_code": null,                    "consolidation_description": null,                    "nominated_code": "X                             ",                    "nominated_description": "Extraneous                    ",                    "source_system_id": 1001,                    "created_by": "BATCHADM",                    "created_date": "09-20-2016 20:49",                    "modified_by": null,                    "modified_date": null}]});
            return deferred.promise;
        };

        mockMarketHierarchyTreeService1.getCurrentMarkets = function() {
            var deferred = $q.defer();
            deferred.reject();
            //deferred.resolve({"metadata": [{"version": "1.0.0", "status": "Success", "http_status_code": "200","resultCount": "267217"}], "data": [{ "vendor_number": "10016000",                    "vendor_name_1": "VSA MIDATLANTIC",                    "vendor_name_2": "",                    "vendor_name_3": "                                   ",                    "address": "1226 FOREST PKWY",                    "city": "PAULSBORO",                    "state": "NJ",                    "zipcode": "08066-0000",                    "country": "US ",                    "telephone_number_1": "                ",                    "telephone_number_2": "                ",                    "fax_number": "                               ",                    "category_code": "6909",                    "category_description": "Inactive Suppliers                 ",                    "model_market_classification": "Inactive",                    "extraneous": null,                    "excluded": 0,                    "diversity_code": "          ",                    "district": "                                   ",                    "train_station": "                         ",                    "industry_key": "    ",                    "parent_record_created_date": null,                    "parent_record_created_by": "HORIZON     ",                    "child_record_created_date": null,                    "child_record_created_by": null,                    "account_group": "0006",                    "account_number_alt_payee": "          ",                    "master_record_delete_flag": " ",                    "tax_1": "                ",                    "tax_2": "           ",                    "one_time_account_ind": " ",                    "training_partner_id": "      ",                    "business_type": "                              ",                    "telebox": "               ",                    "personnel_number": null,                    "group_key": "          ",                    "central_posting_block": true,                    "imposed_purchase_block": true,                    "payment_block": true,                    "company_code_posting_block": false,                    "tax_jurisdiction": "               ",                    "company_code": null,                    "customer_number": "          ",                    "terms_payment_key": null,                    "account_number": null,                    "clerk": null,                    "consolidation_code": null,                    "consolidation_description": null,                    "nominated_code": "X                             ",                    "nominated_description": "Extraneous                    ",                    "source_system_id": 1001,                    "created_by": "BATCHADM",                    "created_date": "09-20-2016 20:49",                    "modified_by": null,                    "modified_date": null}]});
            return deferred.promise;
        };


        mockMarketHierarchyTreeService.getChildrenForNode = function(scope, node) {
            var deferred = $q.defer();
            deferred.resolve(childMarkets);
            //deferred.resolve({"metadata": [{"version": "1.0.0", "status": "Success", "http_status_code": "200","resultCount": "267217"}], "data": [{ "vendor_number": "10016000",                    "vendor_name_1": "VSA MIDATLANTIC",                    "vendor_name_2": "",                    "vendor_name_3": "                                   ",                    "address": "1226 FOREST PKWY",                    "city": "PAULSBORO",                    "state": "NJ",                    "zipcode": "08066-0000",                    "country": "US ",                    "telephone_number_1": "                ",                    "telephone_number_2": "                ",                    "fax_number": "                               ",                    "category_code": "6909",                    "category_description": "Inactive Suppliers                 ",                    "model_market_classification": "Inactive",                    "extraneous": null,                    "excluded": 0,                    "diversity_code": "          ",                    "district": "                                   ",                    "train_station": "                         ",                    "industry_key": "    ",                    "parent_record_created_date": null,                    "parent_record_created_by": "HORIZON     ",                    "child_record_created_date": null,                    "child_record_created_by": null,                    "account_group": "0006",                    "account_number_alt_payee": "          ",                    "master_record_delete_flag": " ",                    "tax_1": "                ",                    "tax_2": "           ",                    "one_time_account_ind": " ",                    "training_partner_id": "      ",                    "business_type": "                              ",                    "telebox": "               ",                    "personnel_number": null,                    "group_key": "          ",                    "central_posting_block": true,                    "imposed_purchase_block": true,                    "payment_block": true,                    "company_code_posting_block": false,                    "tax_jurisdiction": "               ",                    "company_code": null,                    "customer_number": "          ",                    "terms_payment_key": null,                    "account_number": null,                    "clerk": null,                    "consolidation_code": null,                    "consolidation_description": null,                    "nominated_code": "X                             ",                    "nominated_description": "Extraneous                    ",                    "source_system_id": 1001,                    "created_by": "BATCHADM",                    "created_date": "09-20-2016 20:49",                    "modified_by": null,                    "modified_date": null}]});
            return deferred.promise;
        };

        mockMarketHierarchyTreeService1.getChildrenForNode = function(scope, node) {
            var deferred = $q.defer();
            deferred.reject();
            //deferred.resolve({"metadata": [{"version": "1.0.0", "status": "Success", "http_status_code": "200","resultCount": "267217"}], "data": [{ "vendor_number": "10016000",                    "vendor_name_1": "VSA MIDATLANTIC",                    "vendor_name_2": "",                    "vendor_name_3": "                                   ",                    "address": "1226 FOREST PKWY",                    "city": "PAULSBORO",                    "state": "NJ",                    "zipcode": "08066-0000",                    "country": "US ",                    "telephone_number_1": "                ",                    "telephone_number_2": "                ",                    "fax_number": "                               ",                    "category_code": "6909",                    "category_description": "Inactive Suppliers                 ",                    "model_market_classification": "Inactive",                    "extraneous": null,                    "excluded": 0,                    "diversity_code": "          ",                    "district": "                                   ",                    "train_station": "                         ",                    "industry_key": "    ",                    "parent_record_created_date": null,                    "parent_record_created_by": "HORIZON     ",                    "child_record_created_date": null,                    "child_record_created_by": null,                    "account_group": "0006",                    "account_number_alt_payee": "          ",                    "master_record_delete_flag": " ",                    "tax_1": "                ",                    "tax_2": "           ",                    "one_time_account_ind": " ",                    "training_partner_id": "      ",                    "business_type": "                              ",                    "telebox": "               ",                    "personnel_number": null,                    "group_key": "          ",                    "central_posting_block": true,                    "imposed_purchase_block": true,                    "payment_block": true,                    "company_code_posting_block": false,                    "tax_jurisdiction": "               ",                    "company_code": null,                    "customer_number": "          ",                    "terms_payment_key": null,                    "account_number": null,                    "clerk": null,                    "consolidation_code": null,                    "consolidation_description": null,                    "nominated_code": "X                             ",                    "nominated_description": "Extraneous                    ",                    "source_system_id": 1001,                    "created_by": "BATCHADM",                    "created_date": "09-20-2016 20:49",                    "modified_by": null,                    "modified_date": null}]});
            return deferred.promise;
        };

        Ctrl = $controller('MarketHierarchyTreeController', {$rootScope: $rootScope, $scope: scope, MarketHierarchyTreeService: mockMarketHierarchyTreeService, UtilsService: mockUtilsService});
        Ctrl1 = $controller('MarketHierarchyTreeController', {$rootScope: $rootScope, $scope: scope, MarketHierarchyTreeService: mockMarketHierarchyTreeService1, UtilsService: mockUtilsService});
    }));

    it('should initialize the MarketHierarchyTreeController properly', function () {
        Ctrl.expandToDepth =1;
        var getCurrentMarketsResponse;
        mockMarketHierarchyTreeService.getCurrentMarkets().then(function (response) {
            getCurrentMarketsResponse = response;
        });
        scope.$apply();
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call error MarketHierarchyTreeController properly', function () {
        Ctrl.expandToDepth =1;
        var getCurrentMarketsResponse;
        mockMarketHierarchyTreeService.getCurrentMarkets().then(function (response) {
            getCurrentMarketsResponse = response;
        });
        scope.$apply();
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call error on treeviewOnToggle ', function () {
        spyOn(Ctrl1, 'treeviewOnToggle').and.callThrough();
        Ctrl1.treeviewOnToggle(node, true);
        scope.$apply();
        expect(Ctrl1.treeviewOnToggle).toHaveBeenCalled();
    });

    it('should call treeviewOnToggle ', function () {
        spyOn(Ctrl, 'treeviewOnToggle').and.callThrough();
        Ctrl.treeviewOnToggle(node, true);
        scope.$apply();
        expect(Ctrl).not.toBeUndefined();
        expect(Ctrl.treeviewOnToggle).toHaveBeenCalledWith(node, true);
    });

    it('should call expand ', function () {
        spyOn(Ctrl, 'expand').and.callThrough();
        Ctrl.expand(node, 2);
        scope.$apply();
        expect(Ctrl).not.toBeUndefined();
        expect(Ctrl.expand).toHaveBeenCalledWith(node, 2);
    });

    it('should call error on expand ', function () {
        spyOn(Ctrl1, 'expand').and.callThrough();
        Ctrl1.expand(node, 2);
        scope.$apply();
        expect(Ctrl1).not.toBeUndefined();
        expect(Ctrl1.expand).toHaveBeenCalledWith(node, 2);
    });

    it('should call treeviewSelectionChange ', function () {
        scope.fetchChildrenEveryTime = true;
        spyOn(Ctrl, 'treeviewSelectionChange').and.callThrough();
        Ctrl.treeviewSelectionChange(node, true, ivhTreeviewOptions);
        scope.$apply();
        expect(Ctrl).not.toBeUndefined();
        expect(Ctrl.treeviewSelectionChange).toHaveBeenCalledWith(node, true, ivhTreeviewOptions);
    });

    it('should call getSelectedMarkets', function () {
        spyOn(Ctrl, 'getSelectedMarkets').and.callThrough();
        Ctrl.treeData = node;
        Ctrl.getSelectedMarkets();
        scope.$apply();
        expect(Ctrl).not.toBeUndefined();
        expect(Ctrl.getSelectedMarkets).toHaveBeenCalled();
    });
});

describe('MarketHierarchyTreeService', function() {
    'use strict';
    var scope,
        sampleSvcObj,
        $q,
        $log,
        $httpBackend,
        urlSpace,
        Fact,
        node,
        childMarkets,
        childMarkets1,
        ivhTreeviewOptions,
        ivhTreeviewOptionsProvider = {},
        mockHttp;

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('adams.vendor.markets');
        module('common.directives.treeview');
    });

    beforeEach(inject(function($rootScope, _$httpBackend_, MarketHierarchyTreeService, _$q_, ADAMS_URL_SPACE, $log){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = MarketHierarchyTreeService;
        $q = _$q_;
        $log = $log;
        urlSpace  = ADAMS_URL_SPACE;
        ivhTreeviewOptions = {"idAttribute":"market_name","labelAttribute":"market_display_name","childrenAttribute":"children","selectedAttribute":"selected","blockedAttribute":"blocked","leafAttribute":"leaf","expandToDepth":0,"useCheckboxes":true,"validate":false,"indeterminateAttribute":"__ivhTreeviewIndeterminate","expandedAttribute":"__ivhTreeviewExpanded","defaultSelectedState":false,"twistieExpandedTpl":"<span class=\"fa fa-caret-down\"></span>","twistieCollapsedTpl":"<span class=\"fa fa-angle-right\"></span>","twistieLeafTpl":"","nodeTpl":"<div class=\"ivh-treeview-node-content\" title=\"{{trvw.label(node)}}\" >\n<div ng-class=\"{'highlight-nodelabel': trvw.isSelected(node) && trvw.useHighlightSelected()}\"  class=\"nodeview\">\n<span class=\"twistie\" ivh-treeview-toggle>\n<span class=\"ivh-treeview-twistie-wrapper\" ivh-treeview-twistie></span>\n</span>\n<span class=\"ivh-treeview-checkbox-wrapper\" ng-if=\"trvw.useCheckboxes()\"\nivh-treeview-checkbox>\n</span>\n<span class=\"ivh-treeview-node-label\" ivh-treeview-toggle>\n{{trvw.label(node)}}\n</span>\n</div>\n<div ivh-treeview-children></div>\n</div>"};
        node = [{"market_name":"MGNET0","market_description":"Territories","market_display_path":null,"has_children":true,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNET0 - Territories","children":[{"something": {}}],"leaf":false,"$$hashKey":"object:4787","__ivhTreeviewExpanded":false,"selected":true,"__ivhTreeviewIndeterminate":false}];
        childMarkets = [{"market_name":"MGNME01","market_description":"Allentown-Bethlehem-Easton","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME01 - Allentown-Bethlehem-Easton","children":[],"leaf":true},{"market_name":"MGNME02","market_description":"Harrisburg-Lebanon-Carlisle","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME02 - Harrisburg-Lebanon-Carlisle","children":[],"leaf":true},{"market_name":"MGNME03","market_description":"Lancaster","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME03 - Lancaster","children":[],"leaf":true},{"market_name":"MGNME04","market_description":"Philadelphia-Wilmington-Atlantic City, PA-NJ-DE-MD","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME04 - Philadelphia-Wilmington-Atlantic City, PA-NJ-DE-MD","children":[],"leaf":true},{"market_name":"MGNME05","market_description":"Reading","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME05 - Reading","children":[],"leaf":true},{"market_name":"MGNME06","market_description":"State College","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME06 - State College","children":[],"leaf":true},{"market_name":"MGNME07","market_description":"Williamsport","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME07 - Williamsport","children":[],"leaf":true},{"market_name":"MGNME08","market_description":"York","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME08 - York","children":[],"leaf":true}];
        childMarkets1 = {"data": [{"adams_id": "1", "market_name":"MGNME01","market_description":"Allentown-Bethlehem-Easton","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME01 - Allentown-Bethlehem-Easton","children":[],"leaf":true},{"market_name":"MGNME02","market_description":"Harrisburg-Lebanon-Carlisle","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME02 - Harrisburg-Lebanon-Carlisle","children":[],"leaf":true},{"market_name":"MGNME03","market_description":"Lancaster","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME03 - Lancaster","children":[],"leaf":true},{"market_name":"MGNME04","market_description":"Philadelphia-Wilmington-Atlantic City, PA-NJ-DE-MD","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME04 - Philadelphia-Wilmington-Atlantic City, PA-NJ-DE-MD","children":[],"leaf":true},{"market_name":"MGNME05","market_description":"Reading","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME05 - Reading","children":[],"leaf":true},{"market_name":"MGNME06","market_description":"State College","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME06 - State College","children":[],"leaf":true},{"market_name":"MGNME07","market_description":"Williamsport","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME07 - Williamsport","children":[],"leaf":true},{"market_name":"MGNME08","market_description":"York","market_display_path":null,"has_children":false,"created_by":"MAJUMS01","created_date":"1473439545723","modified_by":"MAJUMS01","modified_date":"1473439545723","market_display_name":"MGNME08 - York","children":[],"leaf":true}]};
        scope.fetchChildrenEveryTime = true;
        scope.useCustomGetChildMarketsFunction = function(){return;};
        scope.getChildMarketsFn = function(scope, node){
            var deferred = $q.defer();
            deferred.resolve(childMarkets);
            return deferred.promise;
        }
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should getCurrentMarkets', function(){
        var url = urlSpace.urls.local.marketMappingRoot;

        //spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(childMarkets);
        sampleSvcObj.getCurrentMarkets().then(function(data) {
            //expect(data[0]).toEqual(vendorSearchData[0]);
        });
        $httpBackend.flush();
    });

    it('should error on getCurrentMarkets', function(){
        var url = urlSpace.urls.local.marketMappingRoot;

        //spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getCurrentMarkets().then(function(data) {
            //expect(data[0]).toEqual(vendorSearchData[0]);
        });
        $httpBackend.flush();
    });

    it('should getChildrenForNode if if', function(){
        var marketName = "MGNET0",
            url = urlSpace.urls.local.marketMappingChildren.replace('{marketName}', marketName);

        //spyOn(promise, 'abort').and.callThrough();
        //$httpBackend.expectGET(url).respond(childMarkets);
        sampleSvcObj.getChildrenForNode(scope, node[0]).then(function(data) {
            console.log(data);
            //expect(data[0]).toEqual(vendorSearchData[0]);
        });
        //$httpBackend.flush();
    });

    it('should error on getChildrenForNode if if', function(){
        var marketName = "MGNET0",
            url = urlSpace.urls.local.marketMappingChildren.replace('{marketName}', marketName);

        //spyOn(promise, 'abort').and.callThrough();
        //$httpBackend.expectGET(url).respond(400, {});
        scope.getChildMarketsFn = function(scope, node){
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        }
        sampleSvcObj.getChildrenForNode(scope, node[0]).then(function(data) {

            //expect(data[0]).toEqual(vendorSearchData[0]);
        });
        //$httpBackend.flush();
    });



    it('should getChildrenForNode if else', function(){
        var marketName = "MGNET0",
            url = urlSpace.urls.local.marketMappingChildren.replace('{marketName}', marketName);
        scope.useCustomGetChildMarketsFunction = null;
        //spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(childMarkets1);
        sampleSvcObj.getChildrenForNode(scope, node[0]).then(function(data) {
            console.log(data);
            //expect(data[0]).toEqual(vendorSearchData[0]);
        });
        $httpBackend.flush();
    });

    it('should error on getChildrenForNode if else', function(){
        var marketName = "MGNET0",
            url = urlSpace.urls.local.marketMappingChildren.replace('{marketName}', marketName);
        scope.useCustomGetChildMarketsFunction = null;
        //spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(400, {});
        scope.getChildMarketsFn = function(scope, node){
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        }
        sampleSvcObj.getChildrenForNode(scope, node[0]).then(function(data) {
            console.log(data);
            //expect(data[0]).toEqual(vendorSearchData[0]);
        });
        $httpBackend.flush();
    });

    it('should error on getChildrenForNode else', function(){
        var marketName = "MGNET0",
            url = urlSpace.urls.local.marketMappingChildren.replace('{marketName}', marketName);
        scope.useCustomGetChildMarketsFunction = null;
        scope.fetchChildrenEveryTime = false;
        //spyOn(promise, 'abort').and.callThrough();
        //$httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getChildrenForNode(scope, node[0]).then(function(data) {
            console.log(data);
            //expect(data[0]).toEqual(vendorSearchData[0]);
        });
        //$httpBackend.flush();
    });




    /*it('should call formatMarketDataForHierarchyTree', function(){

        //spyOn(promise, 'abort').and.callThrough();
        //$httpBackend.expectGET(url).respond(400, {});

        console.log("sampleSvcobj", sampleSvcObj);
        console.log("childMarkets ", childMarkets);
        sampleSvcObj.formatMarketDataForHierarchyTree(childMarkets).then(function(data) {
            console.log(data);
            //expect(data[0]).toEqual(vendorSearchData[0]);
        });
        //$httpBackend.flush();
    });*/
});