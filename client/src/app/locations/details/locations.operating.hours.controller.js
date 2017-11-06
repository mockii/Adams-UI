'use strict';

(function () {
    angular.module('adams.locations.operating.hours.controller', [])
        .controller('LocationsOperatingHoursController', ['$uibModalInstance', 'locationsSearchData', 'locationsHourData', 'actionStatus', '$filter', 'CompassToastr', 'filterFilter', 'LocationsDetailsService', 'ModalDialogService',
        function ($uibModalInstance, locationsSearchData, locationsHourData, actionStatus, $filter, CompassToastr, filterFilter, LocationsDetailsService, ModalDialogService) {
            var locationsOperatingHoursController = this;

            function initialize() {

                var locationCode = actionStatus === 'edit' ? " - " + locationsSearchData.location_code : '';
                locationsOperatingHoursController.title = "Location Operating Hours" + locationCode;
                locationsOperatingHoursController.actionStatus = actionStatus;

                locationsOperatingHoursController.weekDaysData = [
                    {day: 'MONDAY', id: 0, selected: false},
                    {day: 'TUESDAY', id: 1, selected: false},
                    {day: 'WEDNESDAY', id: 2, selected: false},
                    {day: 'THURSDAY', id: 3, selected: false},
                    {day: 'FRIDAY', id: 4, selected: false},
                    {day: 'SATURDAY', id: 5, selected: false},
                    {day: 'SUNDAY', id: 6, selected: false}];

                locationsOperatingHoursController.selectedWeekDays = [];

                LocationsDetailsService.getLocationDetailsByLocationCode(locationsSearchData.location_code)
                    .then(function (response) {
                        locationsOperatingHoursController.locationsSearchDetailsData = response;
                        locationsOperatingHoursController.allLocationHours = response.location_hours;
                        if(actionStatus === 'edit' && response && locationsHourData){
                            locationsOperatingHoursController.locationsHourData = locationsHourData;
                            locationsOperatingHoursController.locationHourName =  locationsHourData.name;
                            locationsOperatingHoursController.previousLocationHourName = '';

                            var times = locationsHourData.times.split('-'),
                                openTime = locationsOperatingHoursController.getCorrectedTime(times[0].trim()),
                                closeTime = locationsOperatingHoursController.getCorrectedTime(times[1].trim()),
                                daysOfWeek = locationsHourData.days_of_week.split(',').map(function(item) { return item.trim(); });

                            locationsOperatingHoursController.actualOpenHour = times[0].trim();
                            locationsOperatingHoursController.actualCloseHour = times[1].trim();

                            locationsOperatingHoursController.locationOpenTimeHour = locationsOperatingHoursController.convertToDate(openTime);
                            locationsOperatingHoursController.locationCloseTimeHour = locationsOperatingHoursController.convertToDate(closeTime);

                            daysOfWeek.forEach(function(day){
                                locationsOperatingHoursController.weekDaysData.forEach(function (weekDayObject) {
                                    if(weekDayObject.day === day){
                                        weekDayObject.selected = true;
                                    }
                                });
                            });
                        } else {
                            locationsOperatingHoursController.locationHourName = '';
                            locationsOperatingHoursController.locationOpenTimeHour = '';
                            locationsOperatingHoursController.locationCloseTimeHour = '';
                        }
                    }, function (error) {
                        locationsOperatingHoursController.errorHandling(error);
                    });
            }

            locationsOperatingHoursController.errorHandling = function (errorMessage) {
                ModalDialogService.confirm({
                    bodyText: errorMessage,
                    title: 'Error Message',
                    okText: 'Ok'
                });
            };

            locationsOperatingHoursController.convertToDate = function(time){
                var dateInt = Date.parse(new Date().toDateString() + " " + time);
                return new Date(dateInt);
            };

            locationsOperatingHoursController.cancel = function () {
                $uibModalInstance.close('true');
            };

            locationsOperatingHoursController.getCorrectedTime = function(time){
                if(!time) { return ''; }
                var hourAndSeconds = time.split(' ')[0];
                var hour = hourAndSeconds.indexOf(':') > -1 ? hourAndSeconds.split(':')[0] : hourAndSeconds;
                hour = hour.length === 1 ? '0' + hour : hour;

                var seconds = hourAndSeconds.indexOf(':') > -1 ? hourAndSeconds.split(':')[1] : '';
                seconds = seconds === '' ? seconds + ':00' : ":"+seconds;

                var updatedHourWithSeconds = hour + seconds;

                return updatedHourWithSeconds + " " + time.split(' ')[1];
            };

            locationsOperatingHoursController.saveLocationsOperatingHours = function(){

                locationsOperatingHoursController.locationOpenTimeHour = $filter('date')(locationsOperatingHoursController.locationOpenTimeHour, 'shortTime');
                locationsOperatingHoursController.locationCloseTimeHour = $filter('date')(locationsOperatingHoursController.locationCloseTimeHour, 'shortTime');

                var newLocationsSearchData = locationsOperatingHoursController.locationsSearchDetailsData,
                    openTime = locationsOperatingHoursController.locationOpenTimeHour,
                    closeTime = locationsOperatingHoursController.locationCloseTimeHour,
                    name = locationsOperatingHoursController.locationHourName;

                locationsOperatingHoursController.selectedWeekDays = filterFilter(locationsOperatingHoursController.weekDaysData, { selected: true })
                    .map(function(weekDay){
                        return weekDay.day;
                    });
                locationsOperatingHoursController.unSelectedWeekDays = filterFilter(locationsOperatingHoursController.weekDaysData, { selected: false })
                    .map(function (weekDay){
                        return weekDay.day;
                    });

                // Get rid of all modified/updated week days object that already exists for edit action.
                if(actionStatus === 'edit'){
                    locationsOperatingHoursController.unSelectedWeekDays.forEach(function (weekDay) {
                        var newName = (locationsOperatingHoursController.previousLocationHourName &&
                            locationsOperatingHoursController.previousLocationHourName.length > 0) ? locationsOperatingHoursController.previousLocationHourName : name,
                            indexToSplice = getIndexToSplice(newName, newLocationsSearchData.location_hours, weekDay, locationsOperatingHoursController.actualOpenHour, locationsOperatingHoursController.actualCloseHour);
                        if(indexToSplice > -1){
                            newLocationsSearchData.location_hours.splice(indexToSplice, 1);
                        }
                    });
                }
                //Check if the added value already exist. No check for editing
                if(actionStatus === 'add' && locationsOperatingHoursController.containsMatchingWeekDayHourForAnyDay(newLocationsSearchData.location_hours)){
                    CompassToastr.error("The selected location operating hour already exist, please modify your selection.");
                    return;
                } else {
                    if(actionStatus === 'add'){
                        locationsOperatingHoursController.selectedWeekDays.forEach(function(day){
                            newLocationsSearchData.location_hours.push({name: name, day: day, open_hour: openTime, close_hour: closeTime});
                        });
                    } else {
                        locationsOperatingHoursController.selectedWeekDays.forEach(function(day){
                            var newName = (locationsOperatingHoursController.previousLocationHourName &&
                                    locationsOperatingHoursController.previousLocationHourName.length > 0) ? locationsOperatingHoursController.previousLocationHourName : name,
                                indexToSplice = getIndexToSplice(newName, newLocationsSearchData.location_hours, day, locationsOperatingHoursController.actualOpenHour, locationsOperatingHoursController.actualCloseHour);
                            if(indexToSplice > -1){
                                newLocationsSearchData.location_hours
                                    .splice(indexToSplice, 1, {name: name, day: day, open_hour: openTime, close_hour: closeTime});
                            } else {
                                newLocationsSearchData.location_hours.push({name: name, day: day, open_hour: openTime, close_hour: closeTime});
                            }
                        });
                    }
                    $uibModalInstance.close(newLocationsSearchData);
                }
            };

            function getIndexToSplice(name, locationHours, day, openHour, closeHour){
                for(var i = 0; i < locationHours.length; i++){
                    if(locationHours[i].name === name &&
                        locationHours[i].day === day &&
                        locationsOperatingHoursController.getCorrectedTime(locationHours[i].open_hour) === openHour &&
                        locationsOperatingHoursController.getCorrectedTime(locationHours[i].close_hour) === closeHour){
                        return i;
                    }
                }
                return -1;
            }

            locationsOperatingHoursController.containsMatchingWeekDayHourForAnyDay = function(locationHours){
                var selectedName = locationsOperatingHoursController.locationHourName,
                    selectedOpenTime = locationsOperatingHoursController.getCorrectedTime(locationsOperatingHoursController.locationOpenTimeHour),
                    selectedCloseTime = locationsOperatingHoursController.getCorrectedTime(locationsOperatingHoursController.locationCloseTimeHour);

                for(var i=0; i < locationsOperatingHoursController.selectedWeekDays.length; i++){
                    var selectedDay = locationsOperatingHoursController.selectedWeekDays[i];
                    if(locationsOperatingHoursController.containsMatchingWeekDayHourAndName(selectedName, selectedDay, selectedOpenTime, selectedCloseTime, locationHours)){
                        return true;
                    }
                }
                return false;
            };

            locationsOperatingHoursController.containsMatchingWeekDayHourAndName = function(selectedName, selectedDay, selectedOpenTime, selectedCloseTime, locationHours){
                for(var j=0; j < locationHours.length; j++){
                    var day = locationHours[j].day,
                        name = locationHours[j].name,
                        openHour = locationsOperatingHoursController.getCorrectedTime(locationHours[j].open_hour),
                        closeHour = locationsOperatingHoursController.getCorrectedTime(locationHours[j].close_hour);
                    if(selectedDay === day &&
                        selectedOpenTime === openHour &&
                        selectedCloseTime === closeHour &&
                        selectedName === name){
                        return true;
                    }
                }
                return false;
            };

            initialize();
        }
    ]);
})();