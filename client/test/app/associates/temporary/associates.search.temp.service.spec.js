'use strict';

describe('AssociatesSearchService', function(){

    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        urlSpace,
        $state,
        CompassToastr,
        blockUI,
        $timeout,
        associatesData = '[{ "personnel_number": "1801619", "username": "vasiru01", "first_name": "Udaykiran", "middle_name": "J", "last_name": "Vasireddy", "birthdate": 562890600000, "last_four_ssn": "4545", "email": "udaykiran.vasireddy@compass-usa.com", "phone_number": "614-787-9876", "time_tracking_system": "MyStaff", "cost_center_name": "12345", "cost_center_description": "Compass-USA", "cost_center_source_system_id": "1008", "start_date": 1462890600000, "end_date": 2462890600000, "termination_date": "", "vendor_number": "12124545", "vendor_name_1": "Food Buy", "vendor_source_system_id": "1001", "base_rate": "200.00", "agency": "Agency", "job_name": "Chef", "job_description": "Cook food", "job_source_system_id": "010", "comments": "Testing 123", "active_engagement": true}]',
        timeTrackingSystems = [{'time_tracking_system': 'Mystaff'}, {'time_tracking_system': 'Other'}],
        engagements = '[{"user_name": null, "personnel_number": "50008", "first_name": "DINESH6", "last_name": "SHARMA6", "birthdate": 0, "phone_number": null, "cost_center_name": "17578", "cost_center_description": "ESS-JAVA - CORE", "cost_center_source_system_id": 1001, "vendor_number": "14012935", "vendor_name_1": "PALM COAST DATA", "start_date": 562890600, "end_date": 562890600, "termination_date": 0, "vendor_source_system_id": 1001, "base_rate": "20", "job_name": "3432-CANADA", "job_description": "ACTING FACILITIES MANAGER", "job_source_system_id": 2010, "comments": "Comment testing", "last_four_ssn": 1236, "time_tracking_system": "MySTAFF", "email": "dinesh.sharma6@compass-group.com", "active_engagement": true, "created_by": "a2aUser", "created_date": 1482259347111, "modified_by": "a2aUser", "modified_date": 1482259347111, "engagement_created_by": "a2aUser", "engagement_created_date": 1482259347590, "engagement_modified_by": "a2aUser", "engagement_modified_date": 1482259347590}]',
        jobs = '[{"job_family": "78-CANADA", "job_family_description": "OPERATIONS - MORRISON", "job_type": null, "job_name": "1-CANADA", "job_description": " SUPERVISOR", "start_date": null, "end_date": null, "job_sector": null, "short_description": null, "salaried_indicator": null, "pay_cycle_group": null, "source_system_id": null}]',
        vendors = '[{"vendor_number": "10016000", "vendor_name_1": "VSA MIDATLANTIC"}]',
        costCenterData = '[{"sector": "K00000", "division": "KN0000", "region": "KNB000", "district": "KNB07", "cost_center": "34365", "cost_center_description": "WCD SPECIALTY CONC", "source_system_id": "1001"}]';
    
    beforeEach(module('ui.router'));
    beforeEach(module('blockUI'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.associates.temp.search.service'));
    beforeEach(module('common.services.CompassToastr'));

    beforeEach(inject(function($rootScope, _$state_, _$httpBackend_, AssociatesSearchService, ADAMS_URL_SPACE, _$q_, CompassToastr, _$timeout_, blockUI){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = AssociatesSearchService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;
        $timeout = _$timeout_;
        $state = _$state_;
        blockUI = blockUI;
        CompassToastr = CompassToastr;

        spyOn($state, 'go');
    }));

    it('should get Temp Associates Info', function(){
        var limit = 25,
            page = 1,
            sort = '',
            searchInput = '',
            url = urlSpace.urls.local.tempAssociates + '?limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);
    
        associatesData = JSON.parse(associatesData);

        $httpBackend.expectGET(url).respond(associatesData);
    
        sampleSvcObj.getTempAssociates(limit, page, sort, searchInput).then(function(data) {
            expect(data[0]).toEqual(associatesData[0]);
        });
        $httpBackend.flush();
    });

    it('should abort get Temp Associates Info', function(){
        var limit = 25,
            page = 1,
            sort = '',
            searchInput = '',
            url = urlSpace.urls.local.tempAssociates + '?limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);

        $httpBackend.expectGET(url).respond(associatesData);

        sampleSvcObj.getTempAssociates(limit, page, sort, searchInput).abort();
    });

    it('should error out Associates Info', function(){
        var limit = 25,
            page = 1,
            sort = '',
            searchInput = '',
            url = urlSpace.urls.local.tempAssociates + '?limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getTempAssociates(limit, page, sort, searchInput).then(function(data) {
            expect(data.data).toEqual({});
        });
        $httpBackend.flush();
    });

    it('should get Temp Associate Info', function(){
        var personnelNumber = '1801619',
            url = urlSpace.urls.local.modifyTempAssociate.replace('{personnel_number}', personnelNumber);

        // associatesData = JSON.parse(associatesData);
        $httpBackend.expectGET(url).respond(associatesData);
    
        sampleSvcObj.getTempAssociateInfo(personnelNumber).then(function(data) {
            expect(data[0]).toEqual(associatesData[0]);
        });
        $httpBackend.flush();
    });

    it('should error out Temp Associate Info', function(){
        var personnelNumber = '1801619',
            url = urlSpace.urls.local.modifyTempAssociate.replace('{personnel_number}', personnelNumber);

        // associatesData = JSON.parse(associatesData);
        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getTempAssociateInfo(personnelNumber).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should add Temp Associate Info', function(){
        var tempAssociateRequest = '{"associates":{"username":"","first_name":"udaykiran","middle_name":"","last_name":"vasireddy","birthdate":1464580800000,"last_four_ssn":"7894","email":"udaykiranvasireddy@gmail.com","phone_number":"6147875331","time_tracking_system":"MyStaff","cost_center_name":"17578","cost_center_source_system_id":1001,"start_date":1480827600000,"end_date":1482123600000,"termination_date":0,"vendor_number":"14012935","vendor_source_system_id":1001,"base_rate":"200","job_name":"10710-CANADA","job_source_system_id":2010,"comments":""}}',
            message = "Success",
            url = urlSpace.urls.local.tempAssociates;

        $httpBackend.expectPOST(url).respond(400, {});

        sampleSvcObj.addTempAssociate(tempAssociateRequest).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should update Temp Associate Info', function(){
        var personnelNumber = '51020',
            associateInfo = '{"username":"","first_name":"DINESH0","middle_name":"","last_name":"SHARMA0","birthdate":0,"last_four_ssn":1230,"email":"dinesh.sharma0@compass-group.com","phone_number":"6147875331","cost_center_name":"17578","cost_center_source_system_id":1001,"start_date":562890600,"end_date":562890600,"termination_date":0,"vendor_number":"14012935","vendor_source_system_id":1001,"base_rate":"20","job_name":"10710-CANADA","job_source_system_id":2010,"comments":"Comment testing"}',
            message = "Success",
            url = urlSpace.urls.local.modifyTempAssociate.replace('{personnel_number}', personnelNumber);

        associateInfo = JSON.parse(associateInfo);
        $httpBackend.expectPUT(url).respond(message);

        sampleSvcObj.changeTempAssociate(associateInfo, personnelNumber).then(function(response) {
            expect(response.data).toEqual(message);
        });
        $httpBackend.flush();
    });

    it('should get Temp Associates engagements Info', function()    {
        var limit = 25,
            page = 1,
            sort = '',
            personnelNumber = '50008',
            searchInput = '',
            url = urlSpace.urls.local.tempAssociatesEngagements.replace('{personnel_number}', personnelNumber) +  '?limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);

        engagements = JSON.parse(engagements);
        
        $httpBackend.expectGET(url).respond(engagements);

        sampleSvcObj.getTempAssociateEngagements(personnelNumber, limit, page, sort, searchInput).then(function(data) {
            expect(data[0]).toEqual(engagements[0]);
        });
        $httpBackend.flush();
    });

    it('should abort get Temp Associates engagements Info', function()    {
        var limit = 25,
            page = 1,
            sort = '',
            personnelNumber = '50008',
            searchInput = '',
            url = urlSpace.urls.local.tempAssociatesEngagements.replace('{personnel_number}', personnelNumber) +  '?limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);

        $httpBackend.expectGET(url).respond(engagements);
        sampleSvcObj.getTempAssociateEngagements(personnelNumber, limit, page, sort, searchInput).abort();
    });

    it('should error out Temp Associates engagements Info', function()    {
        var limit = 25,
            page = 1,
            sort = '',
            personnelNumber = '50008',
            searchInput = '',
            url = urlSpace.urls.local.tempAssociatesEngagements.replace('{personnel_number}', personnelNumber) +  '?limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getTempAssociateEngagements(personnelNumber, limit, page, sort, searchInput).then(function(data) {
            expect(data.data).toEqual({});
        });
        $httpBackend.flush();
    });

    it('should get Time Tracking systems', function(){
        var url = urlSpace.urls.local.timeTrackingSystems;
        
        $httpBackend.expectGET(url).respond(timeTrackingSystems);

        sampleSvcObj.getTimeTrackingSystems().then(function(data) {
            expect(data[0]).toEqual(timeTrackingSystems[0]);
        });
        $httpBackend.flush();
    });


    it('should error out Time Tracking systems', function(){
        var url = urlSpace.urls.local.timeTrackingSystems;

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getTimeTrackingSystems().then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should get all jobs', function(){
        var limit = 25,
            page = 1,
            sort = '',
            sourceSystemId = '',
            fields = '',
            searchInput = '',
            url = urlSpace.urls.local.jobs +  '?source_system_id=' + sourceSystemId + '&fields=' + fields + '&limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);
        
        jobs = JSON.parse(jobs);
        $httpBackend.expectGET(url).respond(jobs);

        sampleSvcObj.getAllJobs(sourceSystemId, fields, limit, page, sort, searchInput).then(function(data) {
            expect(data[0]).toEqual(jobs[0]);
        });
        $httpBackend.flush();
    });

    it('should abort get all jobs', function(){
        var limit = 25,
            page = 1,
            sort = '',
            sourceSystemId = '',
            fields = '',
            searchInput = '',
            url = urlSpace.urls.local.jobs +  '?source_system_id=' + sourceSystemId + '&fields=' + fields + '&limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);

        $httpBackend.expectGET(url).respond(jobs);

        sampleSvcObj.getAllJobs(sourceSystemId, fields, limit, page, sort, searchInput).abort();
    });


    it('should error out all jobs', function(){
        var limit = 25,
            page = 1,
            sort = '',
            sourceSystemId = '',
            fields = '',
            searchInput = '',
            url = urlSpace.urls.local.jobs +  '?source_system_id=' + sourceSystemId + '&fields=' + fields + '&limit=' + limit + '&page=' + page + '&sort=' + sort + '&searchInput=' + JSON.stringify(searchInput);

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getAllJobs(sourceSystemId, fields, limit, page, sort, searchInput).then(function(data) {
            expect(data.data).toEqual({});
        });
        $httpBackend.flush();
    });

    it('should get vendor details', function(){
        var fields = '',
            url = urlSpace.urls.local.vendors +  '?fields=' + fields;

        vendors = JSON.parse(vendors);
        $httpBackend.expectGET(url).respond(vendors);

        sampleSvcObj.getVendorDetails(fields).then(function(data) {
            expect(data[0]).toEqual(vendors[0]);
        });
        $httpBackend.flush();
    });

    it('should error out vendor details', function(){
        var fields = '',
            url = urlSpace.urls.local.vendors +  '?fields=' + fields;

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getVendorDetails(fields).then(function(data) {
            expect(data).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should get cost center details', function(){
        var limit = 25,
            page = 1,
            sort = '',
            fields = '',
            costCenterSearchInput = '',
            url = urlSpace.urls.local.costCenters + '?fields=' + fields + '&limit=' + limit + '&page=' + page + '&sort=' + sort + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput);

        costCenterData = JSON.parse(costCenterData);
        $httpBackend.expectGET(url).respond(costCenterData);

        sampleSvcObj.getCostCenterDetails(limit, page, sort, costCenterSearchInput, fields).then(function(data) {
            expect(data[0]).toEqual(costCenterData[0]);
        });
        $httpBackend.flush();
    });

    it('should abort get cost center details', function(){
        var limit = 25,
            page = 1,
            sort = '',
            fields = '',
            costCenterSearchInput = '',
            url = urlSpace.urls.local.costCenters + '?fields=' + fields + '&limit=' + limit + '&page=' + page + '&sort=' + sort + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput);

        $httpBackend.expectGET(url).respond(costCenterData);

        sampleSvcObj.getCostCenterDetails(limit, page, sort, costCenterSearchInput, fields).abort();
    });

    it('should error out cost center details', function(){
        var limit = 25,
            page = 1,
            sort = '',
            fields = '',
            costCenterSearchInput = '',
            url = urlSpace.urls.local.costCenters + '?fields=' + fields + '&limit=' + limit + '&page=' + page + '&sort=' + sort + '&costCenterSearchInput=' + JSON.stringify(costCenterSearchInput);

        $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.getCostCenterDetails(limit, page, sort, costCenterSearchInput, fields).then(function(data) {
            expect(data.data).toEqual({});
        });
        $httpBackend.flush();
    });

    it('should saveAssociateInfo - else block', function(){
        var personnelNumber = '51020',
            associatesInfo = '{"username":"","first_name":"DINESH0","middle_name":"","last_name":"SHARMA0","birthdate":0,"last_four_ssn":1230,"email":"dinesh.sharma0@compass-group.com","phone_number":"6147875331","cost_center_name":"17578","cost_center_source_system_id":1001,"start_date":562890600,"end_date":562890600,"termination_date":0,"vendor_number":"14012935","vendor_source_system_id":1001,"base_rate":"20","job_name":"10710-CANADA","job_source_system_id":2010,"comments":"Comment testing"}',
            path = '',
            timeTrackingSystem = '',
            message = "Success",
            state="addTempAssociates",
            url = urlSpace.urls.local.modifyTempAssociate.replace('{personnel_number}', personnelNumber);



        associatesInfo = JSON.parse(associatesInfo);
        $httpBackend.expectPUT(url).respond(message);
        // $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.saveAssociateInfo(personnelNumber, associatesInfo, path, timeTrackingSystem);
        scope.$digest();
        // expect($state.href(state)).toEqual('#/addTempAssociates//');
        // expect($state.go).toHaveBeenCalledWith('addTempAssociates', { associateSearchData: null, personnel_number: personnelNumber, time_tracking_system: timeTrackingSystem }, {reload: true});
        $httpBackend.flush();
    });

    it('should saveAssociateInfo - else block with if path', function(){
        var personnelNumber = '51020',
            associatesInfo = '{"username":"","first_name":"DINESH0","middle_name":"","last_name":"SHARMA0","birthdate":0,"last_four_ssn":1230,"email":"dinesh.sharma0@compass-group.com","phone_number":"6147875331","cost_center_name":"17578","cost_center_source_system_id":1001,"start_date":562890600,"end_date":562890600,"termination_date":0,"vendor_number":"14012935","vendor_source_system_id":1001,"base_rate":"20","job_name":"10710-CANADA","job_source_system_id":2010,"comments":"Comment testing"}',
            path = 'somePath',
            timeTrackingSystem = '',
            message = "Success",
            url = urlSpace.urls.local.modifyTempAssociate.replace('{personnel_number}', personnelNumber);

        associatesInfo = JSON.parse(associatesInfo);
        $httpBackend.expectPUT(url).respond(message);
        // $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.saveAssociateInfo(personnelNumber, associatesInfo, path, timeTrackingSystem);
        $httpBackend.flush();
    });

    it('should saveAssociateInfo - else block with response error', function(){
        var personnelNumber = '51020',
            associatesInfo = '{"username":"","first_name":"DINESH0","middle_name":"","last_name":"SHARMA0","birthdate":0,"last_four_ssn":1230,"email":"dinesh.sharma0@compass-group.com","phone_number":"6147875331","cost_center_name":"17578","cost_center_source_system_id":1001,"start_date":562890600,"end_date":562890600,"termination_date":0,"vendor_number":"14012935","vendor_source_system_id":1001,"base_rate":"20","job_name":"10710-CANADA","job_source_system_id":2010,"comments":"Comment testing"}',
            path = '',
            timeTrackingSystem = '',
            message = "Success",
            url = urlSpace.urls.local.modifyTempAssociate.replace('{personnel_number}', personnelNumber);

        //associatesInfo = JSON.parse(associatesInfo);
        $httpBackend.expectPUT(url).respond(400, {});
        // $httpBackend.expectGET(url).respond(400, {});

        sampleSvcObj.saveAssociateInfo(personnelNumber, associatesInfo, path, timeTrackingSystem);
        $httpBackend.flush();
    });

    it('should saveAssociateInfo - if block', function(){
        var personnelNumber = '',
            associatesInfo = '{"username":"","first_name":"DINESH0","middle_name":"","last_name":"SHARMA0","birthdate":0,"last_four_ssn":1230,"email":"dinesh.sharma0@compass-group.com","phone_number":"6147875331","cost_center_name":"17578","cost_center_source_system_id":1001,"start_date":562890600,"end_date":562890600,"termination_date":0,"vendor_number":"14012935","vendor_source_system_id":1001,"base_rate":"20","job_name":"10710-CANADA","job_source_system_id":2010,"comments":"Comment testing"}',
            path = '',
            timeTrackingSystem = '',
            message = "Success",
            state="addTempAssociates",
            tempAssociateRequest = '{"data": [{"personnel_number":""}]}',
            url = urlSpace.urls.local.tempAssociates;

        tempAssociateRequest = JSON.parse(tempAssociateRequest);
        $httpBackend.expectPOST(url).respond(tempAssociateRequest);

        sampleSvcObj.saveAssociateInfo(personnelNumber, associatesInfo, path, timeTrackingSystem);
        // scope.$digest();
        // expect($state.href(state)).toEqual('#/addTempAssociates//');
        // expect($state.go).toHaveBeenCalledWith('addTempAssociates', { associateSearchData: null, personnel_number: personnelNumber, time_tracking_system: timeTrackingSystem }, {reload: true});
        $httpBackend.flush();
    });

    it('should saveAssociateInfo - if block with if path', function(){
        var personnelNumber = '',
            associatesInfo = '{"username":"","first_name":"DINESH0","middle_name":"","last_name":"SHARMA0","birthdate":0,"last_four_ssn":1230,"email":"dinesh.sharma0@compass-group.com","phone_number":"6147875331","cost_center_name":"17578","cost_center_source_system_id":1001,"start_date":562890600,"end_date":562890600,"termination_date":0,"vendor_number":"14012935","vendor_source_system_id":1001,"base_rate":"20","job_name":"10710-CANADA","job_source_system_id":2010,"comments":"Comment testing"}',
            path = 'somePath',
            timeTrackingSystem = '',
            message = "Success",
            tempAssociateRequest = '{"data": [{"personnel_number":""}]}',
            url = urlSpace.urls.local.tempAssociates;

        tempAssociateRequest = JSON.parse(tempAssociateRequest);
        $httpBackend.expectPOST(url).respond(tempAssociateRequest);

        sampleSvcObj.saveAssociateInfo(personnelNumber, associatesInfo, path, timeTrackingSystem);
        $httpBackend.flush();
    });

    it('should saveAssociateInfo - if block with if path', inject(function($timeout){
        var personnelNumber = '',
            associatesInfo = '{"username":"","first_name":"DINESH0","middle_name":"","last_name":"SHARMA0","birthdate":0,"last_four_ssn":1230,"email":"dinesh.sharma0@compass-group.com","phone_number":"6147875331","cost_center_name":"17578","cost_center_source_system_id":1001,"start_date":562890600,"end_date":562890600,"termination_date":0,"vendor_number":"14012935","vendor_source_system_id":1001,"base_rate":"20","job_name":"10710-CANADA","job_source_system_id":2010,"comments":"Comment testing"}',
            path = 'somePath',
            timeTrackingSystem = '',
            message = "Success",
            tempAssociateRequest = '{"data": [{"personnel_number":""}]}',
            url = urlSpace.urls.local.tempAssociates;

        tempAssociateRequest = JSON.parse(tempAssociateRequest);
        $httpBackend.expectPOST(url).respond(400, {});

        sampleSvcObj.saveAssociateInfo(personnelNumber, associatesInfo, path, timeTrackingSystem);
        $httpBackend.flush();
        $timeout.flush(500);
        $timeout.verifyNoPendingTasks();
    }));
});
