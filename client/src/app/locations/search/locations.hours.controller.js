'use strict';

(function () {
    angular.module('adams.locations.hours.controller', [])
        .controller('LocationsHoursController', ['$scope', '$state', '$uibModalInstance', 'locationsSearchData', 'WEEK_DAYS_OBJECT', 'WEEK_DAYS_ARRAY', 'LocationsDetailsService', 'ModalDialogService',
        function ($scope, $state, $uibModalInstance, locationsSearchData, WEEK_DAYS_OBJECT, WEEK_DAYS_ARRAY, LocationsDetailsService, ModalDialogService) {
            var locationsHoursController = this;

            function initialize() {
                locationsHoursController.title = "Hours for " + locationsSearchData.location_name;
                LocationsDetailsService.getLocationDetailsByLocationCode(locationsSearchData.location_code)
                    .then(function (response) {
                        locationsHoursController.allLocationHours = response.location_hours;
                        locationsHoursController.mondayLocationHours = [];
                        locationsHoursController.tuesdayLocationHours = [];
                        locationsHoursController.wednesdayLocationHours = [];
                        locationsHoursController.thursdayLocationHours = [];
                        locationsHoursController.fridayLocationHours = [];
                        locationsHoursController.saturdayLocationHours = [];
                        locationsHoursController.sundayLocationHours = [];

                        locationsHoursController.allLocationHours.forEach(function(data){
                            switch (data.day){
                                case WEEK_DAYS_OBJECT.MONDAY:
                                    locationsHoursController.mondayLocationHours.push(data);
                                    break;
                                case WEEK_DAYS_OBJECT.TUESDAY:
                                    locationsHoursController.tuesdayLocationHours.push(data);
                                    break;
                                case WEEK_DAYS_OBJECT.WEDNESDAY:
                                    locationsHoursController.wednesdayLocationHours.push(data);
                                    break;
                                case WEEK_DAYS_OBJECT.THURSDAY:
                                    locationsHoursController.thursdayLocationHours.push(data);
                                    break;
                                case WEEK_DAYS_OBJECT.FRIDAY:
                                    locationsHoursController.fridayLocationHours.push(data);
                                    break;
                                case WEEK_DAYS_OBJECT.SATURDAY:
                                    locationsHoursController.saturdayLocationHours.push(data);
                                    break;
                                case WEEK_DAYS_OBJECT.SUNDAY:
                                    locationsHoursController.sundayLocationHours.push(data);
                                    break;
                                default:
                                    break;
                            }
                        });

                        locationsHoursController.allWeekHours = locationsHoursController.getAllWeekHours();
                        console.log(locationsHoursController.allWeekHours);
                    }, function (error) {
                        locationsHoursController.errorHandling(error);
                    });

            }

            locationsHoursController.errorHandling = function (errorMessage) {
                ModalDialogService.confirm({
                    bodyText: errorMessage,
                    title: 'Error Message',
                    okText: 'Ok'
                });
            };

            locationsHoursController.getAllWeekHours = function(){
                var hoursData = [];
                WEEK_DAYS_ARRAY.forEach(function(day){
                    switch (day){
                        case WEEK_DAYS_OBJECT.MONDAY:
                            hoursData.push({day: day, hours: locationsHoursController.mondayLocationHours});
                            break;
                        case WEEK_DAYS_OBJECT.TUESDAY:
                            hoursData.push({day: day, hours: locationsHoursController.tuesdayLocationHours});
                            break;
                        case WEEK_DAYS_OBJECT.WEDNESDAY:
                            hoursData.push({day: day, hours: locationsHoursController.wednesdayLocationHours});
                            break;
                        case WEEK_DAYS_OBJECT.THURSDAY:
                            hoursData.push({day: day, hours: locationsHoursController.thursdayLocationHours});
                            break;
                        case WEEK_DAYS_OBJECT.FRIDAY:
                            hoursData.push({day: day, hours: locationsHoursController.fridayLocationHours});
                            break;
                        case WEEK_DAYS_OBJECT.SATURDAY:
                            hoursData.push({day: day, hours: locationsHoursController.saturdayLocationHours});
                            break;
                        case WEEK_DAYS_OBJECT.SUNDAY:
                            hoursData.push({day: day, hours: locationsHoursController.sundayLocationHours});
                            break;
                        default:
                            break;
                    }
                });

                return hoursData;
            };

            locationsHoursController.cancel = function () {
                $uibModalInstance.close('true');
            };

            initialize();
        }
    ]);
})();