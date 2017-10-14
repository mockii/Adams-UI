
'use strict';

describe('LocationsHoursController', function() {
        var Ctrl,
            Ctrl1,
            Ctrl2,
            $scope,
            mockModalDialogService,
            locationsSearchData,
            locationsHourData,
            statesService = {},
            $rootScope,
            $httpBackend,
            $uibModalInstance,
            $q,
            mockLocationsDetailsService = {},
            mockLocationsDetailsService1 = {},
            getLocationDetailsByLocationCodeResponse,
            locationsRowData,
            WEEK_DAYS_OBJECT,
            WEEK_DAYS_ARRAY,
            TEST_WEEK_DAYS_ARRAY,
            $state;


        beforeEach(module('ui.router'));
        beforeEach(module('ui.bootstrap'));
        beforeEach(module('adams.locations.search.constants'));


        beforeEach(function () {
            module(function ($provide) {
                $provide.value('LocationsDetailsService', mockLocationsDetailsService);
                $provide.value('LocationsDetailsService', mockLocationsDetailsService1);
                $provide.value('WEEK_DAYS_OBJECT', WEEK_DAYS_OBJECT);
                $provide.value('WEEK_DAYS_ARRAY', WEEK_DAYS_ARRAY);
            });
        });
        beforeEach(module('adams.locations.hours.controller'));
        beforeEach(module('adams.locations.details.service'));

        beforeEach(inject(function ($controller, _$state_, _$rootScope_, _$httpBackend_, _$q_, WEEK_DAYS_OBJECT, WEEK_DAYS_ARRAY) {

            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $q = _$q_;
            $state = _$state_;
            // locationsSearchData = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"7"},"data":[{"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LHKDYFYH","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AL","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5CCACKM","location_name":"sdfsdf","location_description":null,"address1":"asdasd","address2":"xcvxv","city":"sdfsdf","state":"AS","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5QUWC8J","location_name":"something","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"DC","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LUSXEHTV","location_name":"test loc","location_description":null,"address1":"1","address2":"2","city":"charlotte","state":"NC","zip":"11122","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LLIPTDMR","location_name":"test1","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"CT","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"10001","location_name":"test2","location_description":"test2","address1":"ibm dr","address2":"apt #555","city":"charlotte","state":"NC","zip":"28268","active":true,"longitude_latitude":"38.898648N, 77.037692W","created_by":"sunkac01","created_date":"1499713789600","modified_by":null,"modified_date":null}],"error":[]};

            locationsSearchData = {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null};

            locationsHourData = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"OK","resultCount":"1"},"data":[{"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"THURSDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null}],"error":[]};
            getLocationDetailsByLocationCodeResponse = {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"THURSDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"FRIDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"SATURDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"SUNDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"SOMEDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null};

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

            $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);

            mockLocationsDetailsService.getLocationDetailsByLocationCode = function (locationCode) {
                var deferred = $q.defer();
                deferred.resolve(getLocationDetailsByLocationCodeResponse);
                console.log("Here now?", deferred.promise);
                return deferred.promise;
            };

            mockLocationsDetailsService1.getLocationDetailsByLocationCode = function (locationCode) {
                var deferred = $q.defer();
                deferred.reject();
                return deferred.promise;
            };
            TEST_WEEK_DAYS_ARRAY = [{day:"SOMEDAY"}];

            Ctrl = $controller('LocationsHoursController', {
                $scope: $scope,
                $state: $state,
                $uibModalInstance: $uibModalInstance,
                locationsSearchData: locationsSearchData,
                WEEK_DAYS_OBJECT: WEEK_DAYS_OBJECT,
                WEEK_DAYS_ARRAY: WEEK_DAYS_ARRAY,
                LocationsDetailsService: mockLocationsDetailsService,
                ModalDialogService: mockModalDialogService
            });

            Ctrl1 = $controller('LocationsHoursController', {
                $scope: $scope,
                $state: $state,
                $uibModalInstance: $uibModalInstance,
                ModalDialogService: mockModalDialogService,
                LocationsDetailsService: mockLocationsDetailsService1,
                locationsSearchData: locationsSearchData,
                WEEK_DAYS_OBJECT: WEEK_DAYS_OBJECT,
                WEEK_DAYS_ARRAY: WEEK_DAYS_ARRAY
            });

            Ctrl2 = $controller('LocationsHoursController', {
                $scope: $scope,
                $state: $state,
                $uibModalInstance: $uibModalInstance,
                ModalDialogService: mockModalDialogService,
                LocationsDetailsService: mockLocationsDetailsService,
                locationsSearchData: locationsSearchData,
                WEEK_DAYS_OBJECT: WEEK_DAYS_OBJECT,
                WEEK_DAYS_ARRAY: TEST_WEEK_DAYS_ARRAY
            });
    }));

    it('should initialize the LocationsHoursController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call cancel ', function() {
        spyOn(Ctrl, 'cancel').and.callThrough();
        Ctrl.cancel();
        $scope.$apply();
        expect(Ctrl.cancel).toHaveBeenCalled();
    });

});