
'use strict';

describe('adams.locations.details', function() {
    var $state,
        $rootScope,
        $scope,
        $injector,
        $ocLazyLoad,
        state = 'locationsDetails';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.locations.details');
        module('adams.locations.details.constants');
        module('adams.locations.details.controller');
        module('adams.locations.details.service');
        module('adams.locations.costcenters.controller');
        module('adams.locations.costcenters.service');
        module('adams.locations.operating.hours.controller');
        module('adams.locations.costcenters.status.change.controller');
        module('adams.locations.add.cost.center.mapping.controller');
        module('adams.locations.stations.controller');
        module('adams.locations.stations.service');
        module('adams.locations.stations.status.change.controller');
        module('adams.locations.add.stations.mapping.controller');

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
                name:'locationsDetails',
                    files:['css/locations-details.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });

            $templateCache.put('locations/details/vendor.details.tpl.html', '');
        });
    });

    it('should respond to URL', function () {
        expect($state.href(state)).toEqual('#/locations//details');
    });

    it('locationsDetails', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('locationsDetails').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('locationsDetails').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('locationsDetails').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('locationsDetails', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'edit';
        $stateParams.action = null;
        $location.replace().path('/locations/new');
        $injector.invoke($state.get('locationsDetails').resolve['action']);
        expect($state.get('locationsDetails').resolve['action']($stateParams, $location)).toBeDefined();
    }));

    it('locationsDetails', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationRowData = {};
        $stateParams.locationCode = 'LBFNWCU4';
        $injector.invoke($state.get('locationsDetails').resolve['locationRowData']);
        expect($state.get('locationsDetails').resolve['locationRowData']($location, $stateParams)).toEqual({});
    }));

    it('locationsDetails', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationRowData = {};
        $stateParams.locationRowData.location_code = null;
        $stateParams.locationRowData = {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"35.00000N, -95.345678W","created_by":null,"created_date":null,"modified_by":null,"modified_date":null, "location_hours":[]};
        $location.replace().path('/locations/LBFNWCU4/details/costcenters');
        $stateParams.locationCode = 'LBFNWCU4';
        $injector.invoke($state.get('locationsDetails').resolve['locationRowData']);
        expect($state.get('locationsDetails').resolve['locationRowData']($location, $stateParams)).toEqual(null);
    }));

    it('locationsDetails', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams) {
        $stateParams.locationRowData = {};
        $stateParams.action = 'edit';
        $stateParams.locationCode = '100';
        $injector.invoke($state.get('locationsDetails').resolve['locationsSearchData'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('locationsDetails').resolve['locationsSearchData']).toBeDefined();
    }));

    it('locationsDetails', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationRowData = {};
        $stateParams.action = null;
        $location.replace().path('/locations/LBFNWCU4/details/costcenters');
        $stateParams.locationCode = '100';
        $injector.invoke($state.get('locationsDetails').resolve['locationsSearchData']);
        expect($state.get('locationsDetails').resolve['locationsSearchData']).toBeDefined();
    }));




    it('addLocation', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('addLocation').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('addLocation').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('addLocation').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('addLocation', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'add';
        $stateParams.action = null;
        $location.replace().path('/locations/new');
        $injector.invoke($state.get('addLocation').resolve['action']);
        expect($state.get('addLocation').resolve['action']($stateParams, $location)).toBeDefined();
    }));

    it('addLocation', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationRowData = {};
        $injector.invoke($state.get('addLocation').resolve['locationRowData']);
        expect($state.get('addLocation').resolve['locationRowData']($stateParams, $location)).toEqual($stateParams.locationRowData);
    }));

    it('addLocation', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams) {
        $stateParams.locationRowData = {};
        $stateParams.action = 'add';
        $stateParams.locationCode = '100';
        $injector.invoke($state.get('addLocation').resolve['locationsSearchData']);
        expect($state.get('addLocation').resolve['locationsSearchData']).toBeDefined();
    }));

    it('addLocation', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams) {
        $stateParams.locationRowData = {};
        $stateParams.action = null;
        $stateParams.locationCode = '100';
        $injector.invoke($state.get('addLocation').resolve['locationsSearchData']);
        expect($state.get('addLocation').resolve['locationsSearchData']).toBeDefined();
    }));







    it('locationsDetails.costCenters', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'create';
        $location.replace().path('/locations/create');
        $injector.invoke($state.get('locationsDetails.costCenters').resolve['action']);
        expect($state.get('locationsDetails.costCenters').resolve['action']($stateParams, $location)).toBeDefined();
    }));

    it('locationsDetails.costCenters', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'edit';
        $stateParams.action = null;
        $location.replace().path('/locations/new');
        $injector.invoke($state.get('locationsDetails.costCenters').resolve['action']);
        expect($state.get('locationsDetails.costCenters').resolve['action']($stateParams, $location)).toBeDefined();
    }));

    it('locationsDetails.stations', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'create';
        $location.replace().path('/locations/create');
        $injector.invoke($state.get('locationsDetails.stations').resolve['action']);
        expect($state.get('locationsDetails.stations').resolve['action']($stateParams, $location)).toBeDefined();
    }));

    it('locationsDetails.stations', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'edit';
        $stateParams.action = null;
        $location.replace().path('/locations/new');
        $injector.invoke($state.get('locationsDetails.stations').resolve['action']);
        expect($state.get('locationsDetails.stations').resolve['action']($stateParams, $location)).toBeDefined();
    }));


    it('addLocation.costCenters', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'edit';
        $stateParams.action = null;
        $injector.invoke($state.get('addLocation.costCenters').resolve['action']);
        expect($state.get('addLocation.costCenters').resolve['action']($stateParams, $location)).toBeDefined();
    }));


    it('addLocation.stations', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'edit';
        $stateParams.action = null;
        $injector.invoke($state.get('addLocation.stations').resolve['action']);
        expect($state.get('addLocation.costCenters').resolve['action']($stateParams, $location)).toBeDefined();
    }));

    it('addLocation.stations', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'edit';
        $stateParams.action = {};
        $injector.invoke($state.get('addLocation.stations').resolve['action']);
        expect($state.get('addLocation.costCenters').resolve['action']($stateParams, $location)).toBeDefined();
    }));
});