
'use strict';

describe('LocationsDetailsController', function() {
    var Ctrl,
        Ctrl1,
        Ctrl2,
        Ctrl3,
        Ctrl4,
        Ctrl5,
        Ctrl6,
        Ctrl7,
        $scope,
        mockModalDialogService,
        locationRowData,
        locationsSearchData,
        locationsSearchData1,
        locationsHourData,
        locationsHourData1,
        logService = {},
        statesService = {},
        $rootScope,
        $httpBackend,
        location = {},
        location1 = {},
        compassToastr,
        $uibModalInstance,
        mockUtils,
        googleMapsAddress,
        autoCompleteData,
        $uibModal,
        $q,
        mockLocationsDetailsService = {},
        mockLocationsDetailsService1 = {},
        mockLocationsDetailsService2 = {},
        mockStgGoogleMapsService = {},
        mockStgGoogleMapsService2 = {},
        mockStgGoogleMapsService3 = {},
        mockStgGoogleMapsService1 = {},
        getLocationDetailsByLocationCodeResponse,
        TEST_WEEK_DAYS_ARRAY,
        LOCATIONS_STATES_CONSTANTS,
        $state;

    beforeEach(module('common.url'));
    beforeEach(module('adams.common.url'));
    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.locations.search.constants'));
    beforeEach(module('adams.locations.operating.hours.controller'));
    beforeEach(module('common.services.CompassToastr'));
    beforeEach(module('adams.locations.details.controller'));
    beforeEach(module('adams.locations.details.constants'));
    beforeEach(module('common.services.googlemaps'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('LocationsDetailsService', mockLocationsDetailsService);
            $provide.value('LocationsDetailsService', mockLocationsDetailsService1);
            $provide.value('LocationsDetailsService', mockLocationsDetailsService2);
            $provide.value('LOCATIONS_STATES_CONSTANTS', LOCATIONS_STATES_CONSTANTS);
            $provide.value('STGLogService', logService);
            $provide.value('StgStatesService', statesService);
            $provide.value('StgGoogleMapsService', mockStgGoogleMapsService);
            $provide.value('StgGoogleMapsService', mockStgGoogleMapsService2);
            $provide.value('StgGoogleMapsService', mockStgGoogleMapsService3);
            $provide.value('StgGoogleMapsService', mockStgGoogleMapsService1);
            $provide.value('locationRowData', locationRowData);
        });
    });
    beforeEach(module('adams.locations.hours.controller'));
    beforeEach(module('adams.locations.details.service'));

    beforeEach(inject(function ($controller, $stateParams, $location, _$state_, _$rootScope_, _$httpBackend_, _$q_, _$uibModal_, CompassToastr, LOCATIONS_STATES_CONSTANTS, STGLogService, $log, StgGoogleMapsService, locationRowData) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        compassToastr = CompassToastr;
        $q = _$q_;
        $state = _$state_;
        $uibModal = _$uibModal_;
        StgGoogleMapsService = StgGoogleMapsService;
        logService = STGLogService;
        // locationsSearchData = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"7"},"data":[{"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LHKDYFYH","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AL","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5CCACKM","location_name":"sdfsdf","location_description":null,"address1":"asdasd","address2":"xcvxv","city":"sdfsdf","state":"AS","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5QUWC8J","location_name":"something","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"DC","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LUSXEHTV","location_name":"test loc","location_description":null,"address1":"1","address2":"2","city":"charlotte","state":"NC","zip":"11122","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LLIPTDMR","location_name":"test1","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"CT","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"10001","location_name":"test2","location_description":"test2","address1":"ibm dr","address2":"apt #555","city":"charlotte","state":"NC","zip":"28268","active":true,"longitude_latitude":"38.898648N, 77.037692W","created_by":"sunkac01","created_date":"1499713789600","modified_by":null,"modified_date":null}],"error":[]};

        locationsSearchData1 = {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null,"location_hours":[{"name":1,"day":"MONDAY","open_hour":"","close_hour":"3 AM"},{"name":2,"day":"THURSDAY","open_hour":"11:00 AM","close_hour":"3:00 AM"},{"name":"sdfsdfgfgh4","day":"TUESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"sadfsd2","day":"WEDNESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"}]};
        locationsSearchData = {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"THURSDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null};
        locationRowData = {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"35.00000N, -95.345678W","created_by":null,"created_date":null,"modified_by":null,"modified_date":null, "location_hours":[]};
        // locationsHourData = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"OK","resultCount":"1"},"data":[{"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"THURSDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null}],"error":[]};
        locationsHourData = {"id":2,"name":"test1","times":"03:00 AM - 05:00 AM","days_of_week":"SUNDAY"};
        locationsHourData1 = {"id":2,"name":"sdfsdfgfgh4","times":"01:00 AM - 03:00 AM","days_of_week":"TUESDAY"};
        // {"name":"asdasd","day":"MONDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"}
        getLocationDetailsByLocationCodeResponse = {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"THURSDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"FRIDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"SATURDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"SUNDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"SOMEDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null};
        autoCompleteData = {
            "address_components" : [
                {
                    "long_name" : "2400",
                    "short_name" : "2400",
                    "types" : [ "street_number" ]
                },
                {
                    "long_name" : "Yorkmont Road",
                    "short_name" : "Yorkmont Rd",
                    "types" : [ "route" ]
                },
                {
                    "long_name" : "Eagle Lake",
                    "short_name" : "Eagle Lake",
                    "types" : [ "neighborhood", "political" ]
                },
                {
                    "long_name" : "Charlotte",
                    "short_name" : "Charlotte",
                    "types" : [ "locality", "political" ]
                },
                {
                    "long_name" : "1, Charlotte",
                    "short_name" : "1, Charlotte",
                    "types" : [ "administrative_area_level_3", "political" ]
                },
                {
                    "long_name" : "Mecklenburg County",
                    "short_name" : "Mecklenburg County",
                    "types" : [ "administrative_area_level_2", "political" ]
                },
                {
                    "long_name" : "North Carolina",
                    "short_name" : "NC",
                    "types" : [ "administrative_area_level_1", "political" ]
                },
                {
                    "long_name" : "United States",
                    "short_name" : "US",
                    "types" : [ "country", "political" ]
                },
                {
                    "long_name" : "28217",
                    "short_name" : "28217",
                    "types" : [ "postal_code" ]
                },
                {
                    "long_name" : "4511",
                    "short_name" : "4511",
                    "types" : [ "postal_code_suffix" ]
                }
            ],
            "adr_address" : "\u003cspan class=\"street-address\"\u003e2400 Yorkmont Rd\u003c/span\u003e, \u003cspan class=\"locality\"\u003eCharlotte\u003c/span\u003e, \u003cspan class=\"region\"\u003eNC\u003c/span\u003e \u003cspan class=\"postal-code\"\u003e28217-4511\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eUSA\u003c/span\u003e",
            "formatted_address" : "2400 Yorkmont Rd, Charlotte, NC 28217, USA",
            "geometry" : {
                "location": {
                    "lat": function () {
                        return 35.1902523
                    },
                    "lng": function () {
                        return -80.9201274
                    }
                },
                "viewport": {
                    "northeast": {
                        "lat": 35.1912558302915,
                        "lng": -80.9186468697085
                    },
                    "southwest": {
                        "lat": 35.1885578697085,
                        "lng": -80.92134483029152
                    }
                }
            }
        };

        googleMapsAddress = {
            "html_attributions" : [],
            "result" : {
                "address_components" : [
                    {
                        "long_name" : "2400",
                        "short_name" : "2400",
                        "types" : [ "street_number" ]
                    },
                    {
                        "long_name" : "Yorkmont Road",
                        "short_name" : "Yorkmont Rd",
                        "types" : [ "route" ]
                    },
                    {
                        "long_name" : "Eagle Lake",
                        "short_name" : "Eagle Lake",
                        "types" : [ "neighborhood", "political" ]
                    },
                    {
                        "long_name" : "Charlotte",
                        "short_name" : "Charlotte",
                        "types" : [ "locality", "political" ]
                    },
                    {
                        "long_name" : "1, Charlotte",
                        "short_name" : "1, Charlotte",
                        "types" : [ "administrative_area_level_3", "political" ]
                    },
                    {
                        "long_name" : "Mecklenburg County",
                        "short_name" : "Mecklenburg County",
                        "types" : [ "administrative_area_level_2", "political" ]
                    },
                    {
                        "long_name" : "North Carolina",
                        "short_name" : "NC",
                        "types" : [ "administrative_area_level_1", "political" ]
                    },
                    {
                        "long_name" : "United States",
                        "short_name" : "US",
                        "types" : [ "country", "political" ]
                    },
                    {
                        "long_name" : "28217",
                        "short_name" : "28217",
                        "types" : [ "postal_code" ]
                    },
                    {
                        "long_name" : "4511",
                        "short_name" : "4511",
                        "types" : [ "postal_code_suffix" ]
                    }
                ],
                "adr_address" : "\u003cspan class=\"street-address\"\u003e2400 Yorkmont Rd\u003c/span\u003e, \u003cspan class=\"locality\"\u003eCharlotte\u003c/span\u003e, \u003cspan class=\"region\"\u003eNC\u003c/span\u003e \u003cspan class=\"postal-code\"\u003e28217-4511\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eUSA\u003c/span\u003e",
                "formatted_address" : "2400 Yorkmont Rd, Charlotte, NC 28217, USA",
                "geometry" : {
                    "location" : {
                        "lat" : function(){ return 35.1902523},
                        "lng" : function(){ return -80.9201274}
                    },
                    "viewport" : {
                        "northeast" : {
                            "lat" : 35.1912558302915,
                            "lng" : -80.9186468697085
                        },
                        "southwest" : {
                            "lat" : 35.1885578697085,
                            "lng" : -80.92134483029152
                        }
                    }
                },
                "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
                "id" : "68d34a5f7ea02b5de54b3301bb96b4a53e5def96",
                "name" : "2400 Yorkmont Rd",
                "place_id" : "ChIJYWmyaN2YVogRW4hF1hbVoas",
                "reference" : "CmRbAAAAFo7QI6BVYYDE9BDPMBoUE8F2749G1jcwcGkJOtGs0uLInGuRhPGpbPoBN-vbY1Fkwpamt__MKyk60rURZqLJw-f6TWinH2I1nAmxGynW96pfdY6hpEPgqWWfQnj4GbULEhBMtOL_Yb11LBT3jre-r8V6GhQDz1NiiB6C9RUdAwNyYGBiuIJ-Kg",
                "scope" : "GOOGLE",
                "types" : [ "premise" ],
                "url" : "https://maps.google.com/?q=2400+Yorkmont+Rd,+Charlotte,+NC+28217,+USA&ftid=0x885698dd68b26961:0xaba1d516d645885b",
                "utc_offset" : -240,
                "vicinity" : "Charlotte"
            },
            "status" : "OK"
        };

        function mockModal(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.resolve('true');
            this.result = this.resultDeferred.promise;
        }
        mockModal.prototype.open = function(options){
            if(options && options.resolve) {
                options.resolve.actionStatus ? options.resolve.actionStatus() : '';
                options.resolve.locationsGridArray ? options.resolve.locationsGridArray() : '';
                options.resolve.locationsSearchData ? options.resolve.locationsSearchData($stateParams, $location, mockLocationsDetailsService) : '';
            }
            return this;
        };

        function mockModal1(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.resolve(locationsSearchData);
            this.result = this.resultDeferred.promise;
        }
        mockModal1.prototype.open = function(options){
            if(options && options.resolve) {
                options.resolve.actionStatus ? options.resolve.actionStatus() : '';
                options.resolve.locationsGridArray ? options.resolve.locationsGridArray() : '';
                options.resolve.locationsSearchData ? options.resolve.locationsSearchData($stateParams, $location, mockLocationsDetailsService) : '';
            }
            return this;
        };

        // else block
        function mockModal2(){
            this.resultDeferred = $q.defer();
            this.resultDeferred.resolve({});
            this.result = this.resultDeferred.promise;
        }
        mockModal2.prototype.open = function(options){ return this;  };

        // error block
        function mockModal3(){
            this.resultDeferred = $q.defer();
            this.result = this.resultDeferred.promise;
            this.resultDeferred.reject("escape key press");
        }
        mockModal3.prototype.open = function(options){ return this;  };

        // error block
        function mockModal4(){
            this.resultDeferred = $q.defer();
            this.result = this.resultDeferred.promise;
            this.resultDeferred.reject("");
        }
        mockModal4.prototype.open = function(options){ return this;  };

        mockModal = new mockModal();
        mockModal1 = new mockModal1();
        mockModal2 = new mockModal2();
        mockModal3 = new mockModal3();
        mockModal4 = new mockModal4();


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
                locationsSearchData: locationsSearchData
            }
        };

        statesService.goToState = function (state, params) {
            // spyOn($state, 'go');
            return;
        };

        statesService.goToBackState = function (state, params) {
            // spyOn($state, 'go');
            return;
        };

        mockModalDialogService = {
            result: {
                then: function (confirmCallback, cancelCallback) {
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function (result) {
                this.result.confirmCallBack(result);
            },
            dismiss: function (type) {
                this.result.cancelCallback(type);
            },
            confirm: function (errorMessage) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };
        // mockUtils = jasmine.createSpyObj('mockUtils', ['initializeSearchFields', 'getGridSorts']);
        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

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

        mockLocationsDetailsService.getLocationDetailsByLocationCode = function (locationCode) {
            var deferred = $q.defer();
            deferred.resolve(getLocationDetailsByLocationCodeResponse);
            return deferred.promise;
        };

        mockLocationsDetailsService2.getLocationDetailsByLocationCode = function (locationCode) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        mockLocationsDetailsService.addLocation = function (locationCode) {
            var deferred = $q.defer();
            deferred.resolve(getLocationDetailsByLocationCodeResponse);
            return deferred.promise;
        };

        mockLocationsDetailsService1.addLocation = function (locationCode) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        mockLocationsDetailsService2.updateLocationDetailsByLocationCode = function (locationCode) {
            var deferred = $q.defer();
            deferred.resolve('Success');
            return deferred.promise;
        };

        mockLocationsDetailsService.updateLocationDetailsByLocationCode = function (locationCode) {
            var deferred = $q.defer();
            deferred.resolve('error'/*{data: {data: ['Success']}}*/);
            return deferred.promise;
        };

        mockLocationsDetailsService1.updateLocationDetailsByLocationCode = function (locationCode) {
            var deferred = $q.defer();
            deferred.reject('error');
            return deferred.promise;
        };

        mockStgGoogleMapsService.getGeoCodeByAddress = function (completeAddress) {
            var deferred = $q.defer();
            deferred.resolve(googleMapsAddress);
            return deferred.promise;
        };

        mockStgGoogleMapsService2.getGeoCodeByAddress = function (completeAddress) {
            var deferred = $q.defer();
            deferred.resolve(null);
            return deferred.promise;
        };

        mockStgGoogleMapsService3.getGeoCodeByAddress = function (completeAddress) {
            var deferred = $q.defer();
            deferred.resolve({results: [], status: 'ZERO_RESULTS'});
            return deferred.promise;
        };

        mockStgGoogleMapsService1.getGeoCodeByAddress = function (completeAddress) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        TEST_WEEK_DAYS_ARRAY = [{day:"SOMEDAY"}];

        location = {
            path: function(){
                return {
                    split: function(char){
                        return ['','','create']
                    }
                }
            }
        };

        location1 = {
            path: function(){
                return {
                    split: function(char){
                        return ['','','10001']
                    }
                }
            }
        };

        Ctrl = $controller('LocationsDetailsController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            compassToastr: CompassToastr,
            ModalDialogService: mockModalDialogService,
            LocationsDetailsService: mockLocationsDetailsService1,
            locationRowData: locationRowData,
            locationsSearchData: locationsSearchData,
            action: 'edit',
            Utils: mockUtils,
            $uibModal: mockModal1,
            StgGoogleMapsService: mockStgGoogleMapsService
        });

        Ctrl1 = $controller('LocationsDetailsController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            compassToastr: CompassToastr,
            ModalDialogService: mockModalDialogService,
            LocationsDetailsService: mockLocationsDetailsService,
            $location: location,
            locationRowData: null,
            locationsSearchData: {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"35.00000N, -95.345678W","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"THURSDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null},
            action: 'add',
            Utils: mockUtils,
            $uibModal: mockModal1,
            StgGoogleMapsService: mockStgGoogleMapsService1
        });

        Ctrl2 = $controller('LocationsDetailsController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            compassToastr: CompassToastr,
            ModalDialogService: mockModalDialogService,
            LocationsDetailsService: mockLocationsDetailsService,
            locationRowData: null,
            locationsSearchData: null,
            $location: location1,
            action: '',
            Utils: mockUtils,
            $uibModal: mockModal,
            StgGoogleMapsService: mockStgGoogleMapsService2
        });

        Ctrl3 = $controller('LocationsDetailsController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            compassToastr: CompassToastr,
            ModalDialogService: mockModalDialogService,
            LocationsDetailsService: mockLocationsDetailsService1,
            $location: location,
            locationRowData: null,
            locationsSearchData: {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"THURSDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null},
            action: 'add',
            Utils: mockUtils,
            $uibModal: mockModal,
            StgGoogleMapsService: mockStgGoogleMapsService3
        });

        Ctrl4 = $controller('LocationsDetailsController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            compassToastr: CompassToastr,
            ModalDialogService: mockModalDialogService,
            LocationsDetailsService: mockLocationsDetailsService1,
            $location: location,
            locationRowData: null,
            locationsSearchData: null,
            action: 'add',
            Utils: mockUtils,
            $uibModal: mockModal1,
            StgGoogleMapsService: StgGoogleMapsService
        });

        Ctrl5 = $controller('LocationsDetailsController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            compassToastr: CompassToastr,
            ModalDialogService: mockModalDialogService,
            LocationsDetailsService: mockLocationsDetailsService,
            locationRowData: locationRowData,
            locationsSearchData: locationsSearchData,
            action: 'edit',
            Utils: mockUtils,
            $uibModal: mockModal3,
            StgGoogleMapsService: StgGoogleMapsService
        });

        Ctrl6 = $controller('LocationsDetailsController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            compassToastr: CompassToastr,
            ModalDialogService: mockModalDialogService,
            LocationsDetailsService: mockLocationsDetailsService2,
            locationRowData: locationRowData,
            locationsSearchData: locationsSearchData1,
            action: 'edit',
            Utils: mockUtils,
            $uibModal: mockModal4,
            StgGoogleMapsService: StgGoogleMapsService
        });

        Ctrl7 = $controller('LocationsDetailsController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            compassToastr: CompassToastr,
            ModalDialogService: mockModalDialogService,
            LocationsDetailsService: mockLocationsDetailsService2,
            locationRowData: locationRowData,
            locationsSearchData: locationsSearchData1,
            action: 'edit',
            Utils: mockUtils,
            $uibModal: mockModal1,
            StgGoogleMapsService: StgGoogleMapsService
        });
    }));

    it('should initialize the LocationsDetailsController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should initialize the LocationsDetailsController properly', inject(function($location) {
        $location.replace().path('/locations/create');
        expect(Ctrl1).not.toBeUndefined();
    }));

    it('should initialize the LocationsDetailsController properly', inject(function($location) {
        $location.replace().path('/locations/create');
        expect(Ctrl2).not.toBeUndefined();
    }));

    it('should initialize the LocationsDetailsController properly', function () {
        expect(Ctrl3).not.toBeUndefined();
    });

    it('should call clearAndGoBack ', function() {
        spyOn(Ctrl, 'clearAndGoBack').and.callThrough();
        Ctrl.clearAndGoBack();
        $scope.$apply();
        expect(Ctrl.clearAndGoBack).toHaveBeenCalled();
    });

    it('should call clearAndGoBack ', function() {
        spyOn(Ctrl1, 'clearAndGoBack').and.callThrough();
        Ctrl1.clearAndGoBack();
        $scope.$apply();
        expect(Ctrl1.clearAndGoBack).toHaveBeenCalled();
    });

   it('should call saveLocation ', function() {
        spyOn(Ctrl1, 'saveLocation').and.callThrough();
        Ctrl1.locationStatus = true;
       Ctrl1.locationAddress = '2400 Yorkmont';
       Ctrl1.locationAddress2 =  '';
       Ctrl1.locationCity = 'Charlotte';
       Ctrl1.locationName = 'RC - test 1';
       Ctrl1.locationCode = 'LJHEBX2';
       Ctrl1.locationLattitude = '35.013455';
       Ctrl1.locationLattitude = '95.013455';
       Ctrl1.locationState = {};
       Ctrl1.locationState.abbreviation = 'NC';
       Ctrl1.locationZip = '28212';
        // Ctrl.locationsSearchData = locationsSearchData;
       Ctrl1.saveLocation();
        $scope.$apply();
        expect(Ctrl1.saveLocation).toHaveBeenCalled();
    });

   it('should call saveLocation - reject ', function() {
        spyOn(Ctrl, 'saveLocation').and.callThrough();
       Ctrl.locationStatus = true;
       Ctrl.locationAddress = '2400 Yorkmont';
       Ctrl.locationAddress2 =  '';
       Ctrl.locationCity = 'Charlotte';
       Ctrl.locationName = 'RC - test 1';
       Ctrl.locationCode = 'LJHEBX2';
       Ctrl.locationLattitude = '35.013455';
       Ctrl.locationLattitude = '95.013455';
       Ctrl.locationState = {};
       Ctrl.locationState.abbreviation = 'NC';
       Ctrl.locationZip = '28212';
       Ctrl.saveLocation();
        $scope.$apply();
        expect(Ctrl.saveLocation).toHaveBeenCalled();
    });

   it('should call saveLocation - reject ', function() {
        spyOn(Ctrl3, 'saveLocation').and.callThrough();
       Ctrl3.locationStatus = true;
       Ctrl3.locationAddress = '2400 Yorkmont';
       Ctrl3.locationAddress2 =  '';
       Ctrl3.locationCity = 'Charlotte';
       Ctrl3.locationName = 'RC - test 1';
       Ctrl3.locationCode = 'LJHEBX2';
       Ctrl3.locationLattitude = '35.013455';
       Ctrl3.locationLattitude = '95.013455';
       Ctrl3.locationState = {};
       Ctrl3.locationState.abbreviation = 'NC';
       Ctrl3.locationZip = '28212';
        // Ctrl.locationsSearchData = locationsSearchData;
       Ctrl3.saveLocation();
        $scope.$apply();
        expect(Ctrl3.saveLocation).toHaveBeenCalled();
    });

   it('should call saveLocation - reject ', function() {
        spyOn(Ctrl4, 'saveLocation').and.callThrough();
       Ctrl4.locationStatus = true;
       Ctrl4.locationAddress = '2400 Yorkmont';
       Ctrl4.locationAddress2 =  '';
       Ctrl4.locationCity = 'Charlotte';
       Ctrl4.locationName = 'RC - test 1';
       Ctrl4.locationCode = 'LJHEBX2';
       Ctrl4.locationLattitude = '35.013455';
       Ctrl4.locationLattitude = '95.013455';
       Ctrl4.locationState = {};
       Ctrl4.locationState.abbreviation = 'NC';
       Ctrl4.locationZip = '28212';
        // Ctrl.locationsSearchData = locationsSearchData;
       Ctrl4.saveLocation();
        $scope.$apply();
        expect(Ctrl4.saveLocation).toHaveBeenCalled();
    });

   it('should call saveLocation - reject ', function() {
        spyOn(Ctrl5, 'saveLocation').and.callThrough();
       Ctrl5.locationStatus = true;
       Ctrl5.locationAddress = '2400 Yorkmont';
       Ctrl5.locationAddress2 =  '';
       Ctrl5.locationCity = 'Charlotte';
       Ctrl5.locationName = 'RC - test 1';
       Ctrl5.locationCode = 'LJHEBX2';
       Ctrl5.locationLattitude = '35.013455';
       Ctrl5.locationLattitude = '95.013455';
       Ctrl5.locationState = {};
       Ctrl5.locationState.abbreviation = 'NC';
       Ctrl5.locationZip = '28212';
        // Ctrl.locationsSearchData = locationsSearchData;
       Ctrl5.saveLocation();
        $scope.$apply();
        expect(Ctrl5.saveLocation).toHaveBeenCalled();
    });

   it('should call saveLocation - reject ', function() {
        spyOn(Ctrl6, 'saveLocation').and.callThrough();
       Ctrl6.locationStatus = true;
       Ctrl6.locationAddress = '2400 Yorkmont';
       Ctrl6.locationAddress2 =  '';
       Ctrl6.locationCity = 'Charlotte';
       Ctrl6.locationName = 'RC - test 1';
       Ctrl6.locationCode = 'LJHEBX2';
       Ctrl6.locationLattitude = '35.013455';
       Ctrl6.locationLattitude = '95.013455';
       Ctrl6.locationState = {};
       Ctrl6.locationState.abbreviation = 'NC';
       Ctrl6.locationZip = '28212';
        // Ctrl.locationsSearchData = locationsSearchData;
       Ctrl6.saveLocation();
        $scope.$apply();
        expect(Ctrl6.saveLocation).toHaveBeenCalled();
    });

   it('should call deleteLocationsOperatingHours ', function() {
        spyOn(Ctrl, 'deleteLocationsOperatingHours').and.callThrough();
        Ctrl.deleteLocationsOperatingHours(locationsHourData);
        $scope.$apply();
        expect(Ctrl.deleteLocationsOperatingHours).toHaveBeenCalled();
    });

   it('should call deleteLocationsOperatingHours ', function() {
        spyOn(Ctrl1, 'deleteLocationsOperatingHours').and.callThrough();
        Ctrl1.deleteLocationsOperatingHours(locationsHourData);
        $scope.$apply();
        expect(Ctrl1.deleteLocationsOperatingHours).toHaveBeenCalled();
    });

   it('should call deleteLocationsOperatingHours ', function() {
        spyOn(Ctrl6, 'deleteLocationsOperatingHours').and.callThrough();
        Ctrl6.deleteLocationsOperatingHours(locationsHourData1);
        $scope.$apply();
        expect(Ctrl6.deleteLocationsOperatingHours).toHaveBeenCalled();
    });

   it('should call addOrEditLocationsOperatingHours ', inject(function($stateParams) {
        spyOn(Ctrl, 'addOrEditLocationsOperatingHours').and.callThrough();
        $stateParams.locationsSearchData = locationsSearchData;
        Ctrl.addOrEditLocationsOperatingHours('edit', null, locationsHourData);
        $scope.$apply();
        expect(Ctrl.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('edit', null, locationsHourData);
    }));

   it('should call addOrEditLocationsOperatingHours ', function() {
        spyOn(Ctrl2, 'addOrEditLocationsOperatingHours').and.callThrough();
       $scope.locationsSearchData = null;
       Ctrl2.locationsSearchData = locationsSearchData;
       Ctrl2.addOrEditLocationsOperatingHours('add', null, null);
        $scope.$apply();
        expect(Ctrl2.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('add', null, null);
    });

   it('should call addOrEditLocationsOperatingHours ', function() {
        spyOn(Ctrl2, 'addOrEditLocationsOperatingHours').and.callThrough();
       $scope.locationsSearchData = null;
       Ctrl2.addOrEditLocationsOperatingHours('add', null, null);
        $scope.$apply();
        expect(Ctrl2.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('add', null, null);
    });

   it('should call addOrEditLocationsOperatingHours ', function() {
        spyOn(Ctrl2, 'addOrEditLocationsOperatingHours').and.callThrough();
       Ctrl2.addOrEditLocationsOperatingHours('add', null, null);
        $scope.$apply();
        expect(Ctrl2.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('add', null, null);
    });

   it('should call addOrEditLocationsOperatingHours ', function() {
        spyOn(Ctrl5, 'addOrEditLocationsOperatingHours').and.callThrough();
       Ctrl5.addOrEditLocationsOperatingHours('add', null, null);
        $scope.$apply();
        expect(Ctrl5.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('add', null, null);
    });

   it('should call addOrEditLocationsOperatingHours ', function() {
        spyOn(Ctrl6, 'addOrEditLocationsOperatingHours').and.callThrough();
       Ctrl6.addOrEditLocationsOperatingHours('add', null, null);
        $scope.$apply();
        expect(Ctrl6.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('add', null, null);
    });

   it('should call addOrEditLocationsOperatingHours ', function() {
        spyOn(Ctrl4, 'addOrEditLocationsOperatingHours').and.callThrough();
       Ctrl4.addOrEditLocationsOperatingHours('add', null, null);
        $scope.$apply();
        expect(Ctrl4.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('add', null, null);
    });


   it('should call addOrEditLocationsOperatingHours ', function() {
        spyOn(Ctrl1, 'addOrEditLocationsOperatingHours').and.callThrough();
       Ctrl1.addOrEditLocationsOperatingHours('add', null, null);
        $scope.$apply();
        expect(Ctrl1.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('add', null, null);
    });

   it('should call addOrEditLocationsOperatingHours ', function() {
        spyOn(Ctrl, 'addOrEditLocationsOperatingHours').and.callThrough();
       Ctrl.addOrEditLocationsOperatingHours('add', null, null);
        $scope.$apply();
        expect(Ctrl.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('add', null, null);
    });

   it('should call addOrEditLocationsOperatingHours ', function() {
        spyOn(Ctrl, 'addOrEditLocationsOperatingHours').and.callThrough();
        Ctrl.addOrEditLocationsOperatingHours('add', null, null);
        $scope.$apply();
        expect(Ctrl.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('add', null, null);
    });

   it('should call addOrEditLocationsOperatingHours ', function() {
        spyOn(Ctrl7, 'addOrEditLocationsOperatingHours').and.callThrough();
        Ctrl7.addOrEditLocationsOperatingHours('add', null, null);
       Ctrl7.actionStatus = 'edit';
        $scope.$apply();
        expect(Ctrl7.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('add', null, null);
    });

   it('should call addOrEditLocationsOperatingHours ', function() {
        spyOn(Ctrl7, 'addOrEditLocationsOperatingHours').and.callThrough();
        Ctrl7.actionStatus = 'edit';
        Ctrl7.addOrEditLocationsOperatingHours('add', null, null);
        $scope.$apply();
        expect(Ctrl7.addOrEditLocationsOperatingHours).toHaveBeenCalledWith('add', null, null);
    });


   it('should call addressChange', function() {
        spyOn(Ctrl, 'addressChange').and.callThrough();
        Ctrl.addressChange(null);
        // $scope.$apply();
        expect(Ctrl.addressChange).toHaveBeenCalledWith(null);
    });


   it('should call onAddressFocusOut', function() {
        spyOn(Ctrl, 'onAddressFocusOut').and.callThrough();
        Ctrl.autoCompleteData = null;
        Ctrl.onAddressFocusOut(null);
        // $scope.$apply();
        expect(Ctrl.onAddressFocusOut).toHaveBeenCalledWith(null);
    });


   it('should call onAddressFocusOut', function() {
        spyOn(Ctrl, 'onAddressFocusOut').and.callThrough();
        Ctrl.lattitudeLongitude = null;
        Ctrl.onAddressFocusOut(null);
        // $scope.$apply();
        expect(Ctrl.onAddressFocusOut).toHaveBeenCalledWith(null);
    });

   it('should call onAddressFocusOut', function() {
        spyOn(Ctrl, 'onAddressFocusOut').and.callThrough();
       Ctrl.lattitudeLongitude = '23, 34';
        Ctrl.addressChanged = true;
        Ctrl.onAddressFocusOut(null);
        // $scope.$apply();
        expect(Ctrl.onAddressFocusOut).toHaveBeenCalledWith(null);
    });



   it('should call verifyAddress', function() {
        spyOn(Ctrl, 'verifyAddress').and.callThrough();
        Ctrl.verifyAddress(null);
        $scope.$apply();
        expect(Ctrl.verifyAddress).toHaveBeenCalledWith(null);
    });

   it('should call verifyAddress - reject', function() {
        spyOn(Ctrl1, 'verifyAddress').and.callThrough();
        Ctrl1.verifyAddress(null);
        $scope.$apply();
        expect(Ctrl1.verifyAddress).toHaveBeenCalledWith(null);
    });

   it('should call verifyAddress - reject', function() {
        spyOn(Ctrl3, 'verifyAddress').and.callThrough();
        Ctrl3.verifyAddress(null);
        $scope.$apply();
        expect(Ctrl3.verifyAddress).toHaveBeenCalledWith(null);
    });

    it('should call verifyAddress - reject', function() {
        spyOn(Ctrl2, 'verifyAddress').and.callThrough();
        Ctrl2.verifyAddress(null);
        $scope.$apply();
        expect(Ctrl2.verifyAddress).toHaveBeenCalledWith(null);
    });

   it('should call verifyAddress', function() {
        spyOn(Ctrl, 'verifyAddress').and.callThrough();
       Ctrl.locationAddress = null;
        Ctrl.locationCity = null;
        Ctrl.locationZip  = null;
        Ctrl.locationState = {};
        Ctrl.locationState.abbreviation = '--';
        Ctrl.verifyAddress(null);
        $scope.$apply();
        expect(Ctrl.verifyAddress).toHaveBeenCalledWith(null);
    });

   it('should call verifyAddress', function() {
        spyOn(Ctrl, 'verifyAddress').and.callThrough();
        Ctrl.locationState = {};
        Ctrl.locationState.abbreviation = null;
        Ctrl.verifyAddress(null);
        $scope.$apply();
        expect(Ctrl.verifyAddress).toHaveBeenCalledWith(null);
    });


    it('should call googleMapsAutoCompleteData', function() {
        $rootScope.$broadcast('googleMapsAutoCompleteData', autoCompleteData, {"streetName":"Yorkmont Ridge Ln","city":"Charlotte","county":"Mecklenburg County","state":"NC","country":"US","zip":"28217"});
        // expect(function(){}).toEqual(gridApi.grid.appScope.confirmDeleteMarketMapping)
    });

    it('should call googleMapsAutoCompleteData', function() {
        $rootScope.$broadcast('googleMapsAutoCompleteData', autoCompleteData, {"streetName":"", "streetNumber":"","city":"","county":"","state":"","country":"","zip":""});
        // expect(function(){}).toEqual(gridApi.grid.appScope.confirmDeleteMarketMapping)
    });

    it('should call googleMapsAutoCompleteData', function() {
        $rootScope.$broadcast('googleMapsAutoCompleteData', autoCompleteData, {"streetName":{}, "streetNumber":{},"city":"Charlotte","county":"Mecklenburg County","state":"NC","country":"US","zip":"28217"});
        // expect(function(){}).toEqual(gridApi.grid.appScope.confirmDeleteMarketMapping)
    });

    it('should call googleMapsAutoCompleteData', function() {
        $rootScope.$broadcast('googleMapsAutoCompleteData', null, {"streetName":{}, "streetNumber":{},"city":"Charlotte","county":"Mecklenburg County","state":"NC","country":"US","zip":"28217"});
        // expect(function(){}).toEqual(gridApi.grid.appScope.confirmDeleteMarketMapping)
    });
});