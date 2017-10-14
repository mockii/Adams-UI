
'use strict';

describe('adams.locations.details', function() {
    var $state,
        $rootScope,
        $scope,
        $injector,
        $ocLazyLoad,
        state = 'locationsdetails';

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
        expect($state.href(state)).toEqual('#/locations/');
    });

    it('locationsdetails', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get('locationsdetails').resolve['deps'])
            .then(function(res) {console.log(' *res ', res.data);})
            .catch(function(err) {console.log(' *err ', err);});
        expect($state.get('locationsdetails').resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get('locationsdetails').resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('locationsdetails', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'create';
        $location.replace().path('/locations/create');
        $injector.invoke($state.get('locationsdetails').resolve['action']);
        expect($state.get('locationsdetails').resolve['action']($stateParams, $location)).toBeDefined();
    }));

    it('locationsdetails', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'edit';
        $stateParams.action = null;
        $location.replace().path('/locations/new');
        $injector.invoke($state.get('locationsdetails').resolve['action']);
        expect($state.get('locationsdetails').resolve['action']($stateParams, $location)).toBeDefined();
    }));

    it('locationsdetails.costcenters', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'create';
        $location.replace().path('/locations/create');
        $injector.invoke($state.get('locationsdetails.costcenters').resolve['action']);
        expect($state.get('locationsdetails.costcenters').resolve['action']($stateParams, $location)).toBeDefined();
    }));

    it('locationsdetails.costcenters', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'edit';
        $stateParams.action = null;
        $location.replace().path('/locations/new');
        $injector.invoke($state.get('locationsdetails.costcenters').resolve['action']);
        expect($state.get('locationsdetails.costcenters').resolve['action']($stateParams, $location)).toBeDefined();
    }));

    it('locationsdetails.stations', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'create';
        $location.replace().path('/locations/create');
        $injector.invoke($state.get('locationsdetails.stations').resolve['action']);
        expect($state.get('locationsdetails.stations').resolve['action']($stateParams, $location)).toBeDefined();
    }));

    it('locationsdetails.stations', inject(function($state, $injector, $httpBackend, $ocLazyLoad, $stateParams, $location) {
        $stateParams.locationCode = 'edit';
        $stateParams.action = null;
        $location.replace().path('/locations/new');
        $injector.invoke($state.get('locationsdetails.stations').resolve['action']);
        expect($state.get('locationsdetails.stations').resolve['action']($stateParams, $location)).toBeDefined();
    }));
});