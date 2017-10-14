'use strict';

describe('adams.add.associates.temp', function() {

    var Ctrl,
        // $ocLazyLoadMock,
        $ocLazyLoad,
        $state,
        $rootScope,
        $scope,
        $q,
        $injector,
        stateparams,
        state = 'addTempAssociates',
        mockAssociatesSearchService,
        associateData,
        timeTrackingSystems,
        agencies;
           
    beforeEach(function() {
        module('ui.router');
        module('oc.lazyLoad');
        module('common.url');
        module('adams.common.url');
        module('adams.add.associates.temp.controller');
        module('adams.associates.temp.search.service');
        
        module('adams.add.associates.temp', function ($provide) {
            // $provide.value('$ocLazyLoad', $ocLazyLoadMock = {});
            $provide.value('AssociatesSearchService', mockAssociatesSearchService = {});
        });

        inject(function (_$state_, $templateCache, _$rootScope_, _$injector_, $controller, _$ocLazyLoad_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $injector = _$injector_;
            $ocLazyLoad = _$ocLazyLoad_;
            $ocLazyLoad.load({
                name:'associates',
                files:['css/associates.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });
            stateparams = { personnel_number: '51020', time_tracking_system: 'MyStaff' };
            $state.params = stateparams;
            $templateCache.put('associates/temporary/add.associates.tpl.html', '');

            timeTrackingSystems = [{'time_tracking_system': 'Mystaff'}, {'time_tracking_system': 'Other'}];

            associateData = {"metadata": {"resultCount": "25"}, "data": [{ "personnel_number": "1801619", "username": "vasiru01", "first_name": "Udaykiran", "middle_name": "J", "last_name": "Vasireddy", "birthdate": 562890600000, "last_four_ssn": "4545", "email": "udaykiran.vasireddy@compass-usa.com", "phone_number": "614-787-9876", "time_tracking_system": "MyStaff", "cost_center_name": "12345", "cost_center_description": "Compass-USA", "cost_center_source_system_id": "1008", "start_date": 1462890600000, "end_date": 2462890600000, "termination_date": "", "vendor_number": "12124545", "vendor_name_1": "Food Buy", "vendor_source_system_id": "1001", "base_rate": "200.00", "agency": "Agency", "job_name": "Chef", "job_description": "Cook food", "job_source_system_id": "010", "comments": "Testing 123", "active_engagement": true}]};

            agencies = [{"vendor_number": "10016000", "vendor_name_1": "VSA MIDATLANTIC", "address": "1226 FOREST PKWY", "source_system_id": 1001}];

            mockAssociatesSearchService.getTempAssociateInfo = function(limit, page, sort, searchInput) {
                return associateData;
            };

            mockAssociatesSearchService.getTimeTrackingSystems = function() {
                return timeTrackingSystems;
            };

            mockAssociatesSearchService.getVendorDetails = function(fields) {
                return agencies;
            };

            /*$ocLazyLoadMock = function() {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise.$$state;
            };*/

        });
    });

    it('should respond to URL', function () {
        expect($state.href(state, { personnel_number: '51020' })).toEqual('#/associates/temporary/associatesinfo?personnel_number=51020');
    });

    it('should resolve deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('addTempAssociates').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('addTempAssociates').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('addTempAssociates').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('should get personnelNumber from state params', function () {
        $state = $state.get(state);
        expect($state.name).toBe(state);
        // console.log('personnel_number', $state.resolve.personnelNumber(stateparams));
        expect($state.resolve.personnelNumber(stateparams)).toEqual('51020');
    });

    it('should get timeTrackingSystem from state params', function () {
        $state = $state.get(state);
        expect($state.name).toBe(state);
        expect($state.resolve.timeTrackingSystem(stateparams)).toEqual('MyStaff');
    });

    it('should get associate Data', function () {
        $state = $state.get(state);
        expect($state.name).toBe(state);
        expect($state.resolve.associateData(stateparams, mockAssociatesSearchService)).toEqual(associateData);
    });

    it('should get associate Data - else block', inject(function ($stateParams) {
        $state = $state.get(state);
        $stateParams.personnel_number = '1000';
        $stateParams.personnel_number = null;
        expect($state.name).toBe(state);
        expect($state.resolve.associateData($stateParams, mockAssociatesSearchService)).toEqual(undefined);
    }));

    it('should get time tracking systems', function () {
        $state = $state.get(state);
        expect($state.name).toBe(state);
        expect($state.resolve.timeTrackingSystems(mockAssociatesSearchService)).toEqual(timeTrackingSystems);
    });

    it('should get agencies', function () {
        $state = $state.get(state);
        expect($state.name).toBe(state);
        expect($state.resolve.agencies(mockAssociatesSearchService)).toEqual(agencies);
    });
});