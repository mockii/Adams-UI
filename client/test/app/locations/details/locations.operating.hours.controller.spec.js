
'use strict';

describe('LocationsOperatingHoursController', function() {
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
        compassToastr,
        $uibModalInstance,
        $q,
        mockLocationsDetailsService = {},
        mockLocationsDetailsService1 = {},
        getLocationDetailsByLocationCodeResponse,
        TEST_WEEK_DAYS_ARRAY,
        $state;


    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('adams.locations.search.constants'));
    beforeEach(module('adams.locations.operating.hours.controller'));
    beforeEach(module('common.services.CompassToastr'));

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('LocationsDetailsService', mockLocationsDetailsService);
            $provide.value('LocationsDetailsService', mockLocationsDetailsService1);
        });
    });
    beforeEach(module('adams.locations.hours.controller'));
    beforeEach(module('adams.locations.details.service'));

    beforeEach(inject(function ($controller, _$state_, _$rootScope_, _$httpBackend_, _$q_, CompassToastr) {

        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        compassToastr = CompassToastr;
        $q = _$q_;
        $state = _$state_;
        // locationsSearchData = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"200","resultCount":"7"},"data":[{"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LHKDYFYH","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AL","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5CCACKM","location_name":"sdfsdf","location_description":null,"address1":"asdasd","address2":"xcvxv","city":"sdfsdf","state":"AS","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"L5QUWC8J","location_name":"something","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"DC","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LUSXEHTV","location_name":"test loc","location_description":null,"address1":"1","address2":"2","city":"charlotte","state":"NC","zip":"11122","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"LLIPTDMR","location_name":"test1","location_description":null,"address1":"asdasd","address2":"suite 120","city":"sdfsdf","state":"CT","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null},{"location_code":"10001","location_name":"test2","location_description":"test2","address1":"ibm dr","address2":"apt #555","city":"charlotte","state":"NC","zip":"28268","active":true,"longitude_latitude":"38.898648N, 77.037692W","created_by":"sunkac01","created_date":"1499713789600","modified_by":null,"modified_date":null}],"error":[]};

        locationsSearchData = {"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","created_by":null,"created_date":null,"modified_by":null,"modified_date":null};

        // locationsHourData = {"metadata":{"version":"1.0.0","status":"Success","http_status_code":"OK","resultCount":"1"},"data":[{"location_code":"LBFNWCU4","location_name":"sdfsdf","location_description":null,"address1":"asd","address2":"xcvxv","city":"sdfsdf","state":"AZ","zip":"00000","active":true,"longitude_latitude":"","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"THURSDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"1:00 AM","close_hour":"3:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null}],"error":[]};
        locationsHourData = {"id":2,"name":"test1","times":"03:00 AM - 05:00 AM","days_of_week":"SUNDAY"};
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
            return deferred.promise;
        };

        mockLocationsDetailsService1.getLocationDetailsByLocationCode = function (locationCode) {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        };
        TEST_WEEK_DAYS_ARRAY = [{day:"SOMEDAY"}];

        Ctrl = $controller('LocationsOperatingHoursController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            locationsSearchData: locationsSearchData,
            compassToastr: CompassToastr,
            locationsHourData: locationsHourData,
            actionStatus: 'edit',
            LocationsDetailsService: mockLocationsDetailsService,
            ModalDialogService: mockModalDialogService
        });

        Ctrl1 = $controller('LocationsOperatingHoursController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            ModalDialogService: mockModalDialogService,
            compassToastr: CompassToastr,
            LocationsDetailsService: mockLocationsDetailsService1,
            locationsSearchData: locationsSearchData,
            locationsHourData: locationsHourData,
            actionStatus: 'add'
        });

        Ctrl2 = $controller('LocationsOperatingHoursController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            compassToastr: CompassToastr,
            ModalDialogService: mockModalDialogService,
            LocationsDetailsService: mockLocationsDetailsService,
            locationsSearchData: locationsSearchData,
            locationsHourData: locationsHourData,
            actionStatus: ''
        });
    }));

    it('should initialize the LocationsOperatingHoursController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should call cancel ', function() {
        spyOn(Ctrl, 'cancel').and.callThrough();
        Ctrl.cancel();
        $scope.$apply();
        expect(Ctrl.cancel).toHaveBeenCalled();
    });

    it('should call saveLocationsOperatingHours ', function() {
        spyOn(Ctrl, 'saveLocationsOperatingHours').and.callThrough();
        Ctrl.locationsSearchDetailsData = {"location_code":"10001","location_name":"test2","location_description":"","address1":"IBM Dr","address2":"","city":"Charlotte","state":"NC","zip":"28262","active":true,"longitude_latitude":"35.3057512,-80.77477250000004","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"MONDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"test1","day":"SUNDAY","open_hour":"3:00 AM","close_hour":"5:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"TUESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"WEDNESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null};
        Ctrl.weekDaysData = [{"day":"MONDAY","id":0,"selected":true,"$$hashKey":"object:809"},{"day":"TUESDAY","id":1,"selected":true,"$$hashKey":"object:810"},{"day":"WEDNESDAY","id":2,"selected":true,"$$hashKey":"object:811"},{"day":"THURSDAY","id":3,"selected":false,"$$hashKey":"object:812"},{"day":"FRIDAY","id":4,"selected":false,"$$hashKey":"object:813"},{"day":"SATURDAY","id":5,"selected":false,"$$hashKey":"object:814"},{"day":"SUNDAY","id":6,"selected":true,"$$hashKey":"object:815"}];
        Ctrl.saveLocationsOperatingHours();
        $scope.$apply();
        expect(Ctrl.saveLocationsOperatingHours).toHaveBeenCalled();
    });

    it('should call saveLocationsOperatingHours ', function() {
        spyOn(Ctrl, 'saveLocationsOperatingHours').and.callThrough();
        Ctrl.actualOpenHour = '03:00 AM';
        Ctrl.actualCloseHour = '05:00 AM';
        Ctrl.previousLocationHourName =  'test1';
        Ctrl.locationsSearchDetailsData = {"location_code":"10001","location_name":"test2","location_description":"","address1":"IBM Dr","address2":"","city":"Charlotte","state":"NC","zip":"28262","active":true,"longitude_latitude":"35.3057512,-80.77477250000004","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"MONDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"test1","day":"SUNDAY","open_hour":"3:00 AM","close_hour":"5:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"TUESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"WEDNESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null};
        Ctrl.weekDaysData = [{"day":"MONDAY","id":0,"selected":true,"$$hashKey":"object:809"},{"day":"TUESDAY","id":1,"selected":true,"$$hashKey":"object:810"},{"day":"WEDNESDAY","id":2,"selected":true,"$$hashKey":"object:811"},{"day":"THURSDAY","id":3,"selected":false,"$$hashKey":"object:812"},{"day":"FRIDAY","id":4,"selected":false,"$$hashKey":"object:813"},{"day":"SATURDAY","id":5,"selected":false,"$$hashKey":"object:814"},{"day":"SUNDAY","id":6,"selected":true,"$$hashKey":"object:815"}];
        Ctrl.saveLocationsOperatingHours();
        $scope.$apply();
        expect(Ctrl.saveLocationsOperatingHours).toHaveBeenCalled();
    });

    it('should call saveLocationsOperatingHours ', function() {
        spyOn(Ctrl, 'saveLocationsOperatingHours').and.callThrough();
        Ctrl.actualOpenHour = '08:00 AM';
        Ctrl.actualCloseHour = '09:00 AM';
        Ctrl.previousLocationHourName =  'SSSS';
        Ctrl.locationsSearchDetailsData = {"location_code":"10001","location_name":"test2","location_description":"","address1":"IBM Dr","address2":"","city":"Charlotte","state":"NC","zip":"28262","active":true,"longitude_latitude":"35.3057512,-80.77477250000004","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"MONDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"test1","day":"SUNDAY","open_hour":"3:00 AM","close_hour":"5:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"TUESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"WEDNESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null};
        Ctrl.weekDaysData = [{"day":"MONDAY","id":0,"selected":true,"$$hashKey":"object:809"},{"day":"TUESDAY","id":1,"selected":true,"$$hashKey":"object:810"},{"day":"WEDNESDAY","id":2,"selected":false,"$$hashKey":"object:811"},{"day":"THURSDAY","id":3,"selected":false,"$$hashKey":"object:812"},{"day":"FRIDAY","id":4,"selected":false,"$$hashKey":"object:813"},{"day":"SATURDAY","id":5,"selected":false,"$$hashKey":"object:814"},{"day":"SUNDAY","id":6,"selected":true,"$$hashKey":"object:815"}];
        Ctrl.saveLocationsOperatingHours();
        $scope.$apply();
        expect(Ctrl.saveLocationsOperatingHours).toHaveBeenCalled();
    });




    it('should call saveLocationsOperatingHours ', function() {
        spyOn(Ctrl1, 'saveLocationsOperatingHours').and.callThrough();
        Ctrl1.actionStatus = 'add';
        Ctrl1.locationHourName = 'test1';
        Ctrl1.actualOpenHour = '08:00 AM';
        Ctrl1.actualCloseHour = '09:00 AM';
        Ctrl1.locationOpenTimeHour = '08 AM';
        Ctrl1.locationCloseTimeHour = '09:00 AM';
        Ctrl1.previousLocationHourName =  'SSSS';
        Ctrl1.locationsSearchDetailsData = {"location_code":"10001","location_name":"test2","location_description":"","address1":"IBM Dr","address2":"","city":"Charlotte","state":"NC","zip":"28262","active":true,"longitude_latitude":"35.3057512,-80.77477250000004","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"MONDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"test1","day":"SUNDAY","open_hour":"3:00 AM","close_hour":"5:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"TUESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"WEDNESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null};
        Ctrl1.weekDaysData = [{"day":"MONDAY","id":0,"selected":true,"$$hashKey":"object:809"},{"day":"TUESDAY","id":1,"selected":true,"$$hashKey":"object:810"},{"day":"WEDNESDAY","id":2,"selected":false,"$$hashKey":"object:811"},{"day":"THURSDAY","id":3,"selected":false,"$$hashKey":"object:812"},{"day":"FRIDAY","id":4,"selected":false,"$$hashKey":"object:813"},{"day":"SATURDAY","id":5,"selected":false,"$$hashKey":"object:814"},{"day":"SUNDAY","id":6,"selected":true,"$$hashKey":"object:815"}];
        Ctrl1.saveLocationsOperatingHours();
        $scope.$apply();
        expect(Ctrl1.saveLocationsOperatingHours).toHaveBeenCalled();
    });

    it('should call saveLocationsOperatingHours ', function() {
        spyOn(Ctrl1, 'saveLocationsOperatingHours').and.callThrough();
        Ctrl1.actionStatus = 'add';
        Ctrl1.locationHourName = 'SSSS';
        Ctrl1.locationOpenTimeHour = '08 AM';
        Ctrl1.locationCloseTimeHour = '09:00 AM';
        Ctrl1.previousLocationHourName =  'SSSS';
        Ctrl1.locationsSearchDetailsData = {"location_code":"10001","location_name":"test2","location_description":"","address1":"IBM Dr","address2":"","city":"Charlotte","state":"NC","zip":"28262","active":true,"longitude_latitude":"35.3057512,-80.77477250000004","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"MONDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"test1","day":"SUNDAY","open_hour":"3:00 AM","close_hour":"5:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"TUESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"WEDNESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null};
        Ctrl1.weekDaysData = [{"day":"MONDAY","id":0,"selected":true,"$$hashKey":"object:809"},{"day":"TUESDAY","id":1,"selected":true,"$$hashKey":"object:810"},{"day":"WEDNESDAY","id":2,"selected":false,"$$hashKey":"object:811"},{"day":"THURSDAY","id":3,"selected":false,"$$hashKey":"object:812"},{"day":"FRIDAY","id":4,"selected":false,"$$hashKey":"object:813"},{"day":"SATURDAY","id":5,"selected":false,"$$hashKey":"object:814"},{"day":"SUNDAY","id":6,"selected":true,"$$hashKey":"object:815"}];
        Ctrl1.saveLocationsOperatingHours();
        $scope.$apply();
        expect(Ctrl1.saveLocationsOperatingHours).toHaveBeenCalled();
    });

    it('should call saveLocationsOperatingHours ', function() {
        spyOn(Ctrl1, 'saveLocationsOperatingHours').and.callThrough();
        Ctrl1.actionStatus = 'add';
        Ctrl1.locationHourName = 'SSSS';
        Ctrl1.locationOpenTimeHour = null;
        Ctrl1.locationCloseTimeHour = '09:00 AM';
        Ctrl1.previousLocationHourName =  'SSSS';
        Ctrl1.locationsSearchDetailsData = {"location_code":"10001","location_name":"test2","location_description":"","address1":"IBM Dr","address2":"","city":"Charlotte","state":"NC","zip":"28262","active":true,"longitude_latitude":"35.3057512,-80.77477250000004","location_hours":[{"name":"asdasd","day":"MONDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"MONDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"test1","day":"SUNDAY","open_hour":"3:00 AM","close_hour":"5:00 AM"},{"name":"asdasd","day":"TUESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"TUESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"},{"name":"asdasd","day":"WEDNESDAY","open_hour":"2:00 AM","close_hour":"3:00 AM"},{"name":"SSSS","day":"WEDNESDAY","open_hour":"8:00 AM","close_hour":"9:00 AM"}],"created_by":null,"created_date":null,"modified_by":null,"modified_date":null};
        Ctrl1.weekDaysData = [{"day":"MONDAY","id":0,"selected":true,"$$hashKey":"object:809"},{"day":"TUESDAY","id":1,"selected":true,"$$hashKey":"object:810"},{"day":"WEDNESDAY","id":2,"selected":false,"$$hashKey":"object:811"},{"day":"THURSDAY","id":3,"selected":false,"$$hashKey":"object:812"},{"day":"FRIDAY","id":4,"selected":false,"$$hashKey":"object:813"},{"day":"SATURDAY","id":5,"selected":false,"$$hashKey":"object:814"},{"day":"SUNDAY","id":6,"selected":true,"$$hashKey":"object:815"}];
        Ctrl1.saveLocationsOperatingHours();
        $scope.$apply();
        expect(Ctrl1.saveLocationsOperatingHours).toHaveBeenCalled();
    });

});