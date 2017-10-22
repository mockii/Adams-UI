(function () {
    angular.module('adams.locations.details.controller', [])
        .controller('LocationsDetailsController', ['$rootScope', '$scope', '$stateParams', '$location', 'action', 'LocationsDetailsService', 'Utils', 'CompassToastr', '$uibModal', 'WEEK_DAYS_ARRAY', 'ModalDialogService', 'LOCATIONS_STATES_CONSTANTS', 'StgStatesService', '$log', 'StgGoogleMapsService', 'GOOGLEMAPS_CONSTANTS', 'locationRowData', 'locationsSearchData',
            function ($rootScope, $scope, $stateParams, $location, action, LocationsDetailsService, Utils, CompassToastr, $uibModal, WEEK_DAYS_ARRAY, ModalDialogService, LOCATIONS_STATES_CONSTANTS, StgStatesService, $log, StgGoogleMapsService, GOOGLEMAPS_CONSTANTS, locationRowData, locationsSearchData) {
                var locationsDetailsController = this,
                    locationsOperatingHoursPromise;
                locationsDetailsController.action = action;
                locationsDetailsController.locationRowData = locationRowData;
                locationsDetailsController.locationsSearchData = locationsSearchData;
                locationsDetailsController.lattitudeLongitude = '';
                locationsDetailsController.addressChanged = false;

                if(locationsDetailsController.locationRowData){
                    locationsDetailsController.lattitudeLongitude = locationsDetailsController.locationRowData.longitude_latitude;
                    locationsDetailsController.locationLattitude = Number(locationRowData.longitude_latitude.split(',')[0].match(/[-+]?\d*(\.(?=\d))?\d+/g));
                    locationsDetailsController.locationLongitude = Number(locationRowData.longitude_latitude.split(',')[1].match(/[-+]?\d*(\.(?=\d))?\d+/g));
                } else if(locationsDetailsController.locationsSearchData){
                    locationsDetailsController.lattitudeLongitude = locationsDetailsController.locationsSearchData.longitude_latitude;
                    locationsDetailsController.locationLattitude = locationsDetailsController.lattitudeLongitude !== '' ?
                        Number(locationsDetailsController.lattitudeLongitude.split(',')[0].match(/[-+]?\d*(\.(?=\d))?\d+/g)) : NaN;
                    locationsDetailsController.locationLongitude = locationsDetailsController.lattitudeLongitude !== '' ?
                        Number(locationsDetailsController.lattitudeLongitude.split(',')[1].match(/[-+]?\d*(\.(?=\d))?\d+/g)) : NaN;
                }

                function initialize() {
                    var locationCode = $location.path().split('/')[2];
                    locationCode = locationCode === 'create' ? '' : locationCode;
                    $scope.locationCode = locationsDetailsController.locationCode = locationCode;
                    locationsDetailsController.hasLocationCode = $scope.locationCode ? true : false;
                    if (locationsDetailsController.action === 'edit'){
                        $scope.locationsSearchData = locationsDetailsController.locationsSearchData;
                        locationsDetailsController.gridArray = locationsDetailsController.buildOperatingHoursData();
                    } else if(locationsDetailsController.action === 'add'){
                            locationsDetailsController.autoCompleteData = null;
                            locationsDetailsController.stateFilterChanged(locationsDetailsController.locationState);
                        }
                    locationsDetailsController.initializeLocationForm();
                }

                locationsDetailsController.initializeLocationForm = function(){
                    locationsDetailsController.locationName = locationsDetailsController.locationsSearchData ? locationsDetailsController.locationsSearchData.location_name : '';
                    locationsDetailsController.locationAddress = locationsDetailsController.locationsSearchData ? locationsDetailsController.locationsSearchData.address1 : '';
                    locationsDetailsController.locationAddress2 = locationsDetailsController.locationsSearchData ? locationsDetailsController.locationsSearchData.address2 : '';
                    locationsDetailsController.locationCity = locationsDetailsController.locationsSearchData ? locationsDetailsController.locationsSearchData.city : '';
                    locationsDetailsController.locationZip = locationsDetailsController.locationsSearchData ? locationsDetailsController.locationsSearchData.zip : '';
                    locationsDetailsController.locationStatus = locationsDetailsController.locationsSearchData ? locationsDetailsController.locationsSearchData.active : true;

                    locationsDetailsController.locationStates = LOCATIONS_STATES_CONSTANTS;
                    locationsDetailsController.locationState = locationsDetailsController.locationsSearchData ?
                        LOCATIONS_STATES_CONSTANTS.find(function(state){return state.abbreviation === locationsDetailsController.locationsSearchData.state;}) :
                        locationsDetailsController.locationStates[0];
                    locationsDetailsController.lattitudeLongitude = locationsDetailsController.locationsSearchData ? locationsDetailsController.locationsSearchData.longitude_latitude : '';
                };

                locationsDetailsController.stateFilterChanged = function(state){
                    console.log(state);
                };

                locationsDetailsController.clearAndGoBack = function(){
                    if(locationsDetailsController.action === 'add'){
                        StgStatesService.goToBackState();
                    }
                };

                locationsDetailsController.errorHandling = function (errorMessage) {
                    ModalDialogService.confirm({
                        bodyText: errorMessage,
                        title: 'Error Message',
                        okText: 'Ok'
                    });
                };

                locationsDetailsController.saveLocation = function(){
                    //TODO : Restructure this properly
                  var locationData = {},
                      locations = [],
                      locationObject = {
                          "active": locationsDetailsController.locationStatus,
                          "address1": locationsDetailsController.locationAddress,
                          "address2": locationsDetailsController.locationAddress2,
                          "city": locationsDetailsController.locationCity,
                          "location_name": locationsDetailsController.locationName,
                          "longitude_latitude": locationsDetailsController.locationLattitude + "," + locationsDetailsController.locationLongitude,
                          "state": locationsDetailsController.locationState.abbreviation,
                          "zip": locationsDetailsController.locationZip,
                          "location_hours":locationsDetailsController.locationsSearchData ? locationsDetailsController.locationsSearchData.location_hours : []
                      };
                      locations.push(locationObject);
                      locationData.locations = locations;
                      locationsDetailsController.locationData = locationData;
                    LocationsDetailsService.addLocation(locationsDetailsController.locationData)
                        .then(function(response){
                            locationsDetailsController.locationsSearchData = response;
                            $stateParams.action = locationsDetailsController.action = 'edit';
                            StgStatesService.goToState('locationsdetails', {
                                'locationSearchData': locationsDetailsController.locationsSearchData,
                                'locationCode': locationsDetailsController.locationsSearchData.location_code,
                                'action': locationsDetailsController.action,
                                'backState': 'locations',
                                'locationRowData': null
                            });
                        }, function(error){
                            throw "An error occurred while adding locations " + error;
                        });
                };

                locationsDetailsController.buildOperatingHoursData = function() {
                    var gridArray = [],
                        matchedWeekDays = [],
                        unMatchedWeekDays = [],
                        id = 0;
                    locationsDetailsController.locationsSearchData.location_hours.forEach(function(locationHour){
                        if(locationsDetailsController.containsMatchingWeekDayHourAndName(locationHour.name, locationHour.open_hour, locationHour.close_hour)){
                            matchedWeekDays.push(locationHour);
                        } else {
                            unMatchedWeekDays.push(locationHour);
                        }
                    });

                    if(matchedWeekDays.length > 0){

                        var groupByNameWeekDays = groupByName(matchedWeekDays, 'name');
                        Object.keys(groupByNameWeekDays).forEach(function(key){

                            var valueArray = groupByNameWeekDays[key],
                                matchedLocationHourName = valueArray[0].name,
                                openHour = locationsDetailsController.getCorrectedTime(valueArray[0].open_hour),
                                closeHour = locationsDetailsController.getCorrectedTime(valueArray[0].close_hour),
                                matchedLocationHour = openHour + ' - ' + closeHour,
                                concatenatedDays = '',
                                concatDaysArray = [];

                            valueArray.forEach(function(locationHour){
                                concatDaysArray.push(locationHour.day);
                            });
                            concatenatedDays = concatDaysArray.sort(function sortByDay(a, b) {
                                return WEEK_DAYS_ARRAY.indexOf(a) > WEEK_DAYS_ARRAY.indexOf(b);
                            }).join(', ');

                            gridArray.push({id:id++, name: matchedLocationHourName, times: matchedLocationHour, days_of_week: concatenatedDays});
                        });
                    }

                    if(unMatchedWeekDays.length > 0){
                        unMatchedWeekDays.forEach(function(locationHour){
                            var totalTime = locationsDetailsController.getCorrectedTime(locationHour.open_hour) + ' - ' +
                                locationsDetailsController.getCorrectedTime(locationHour.close_hour);
                            gridArray.push({id: id++, name:locationHour.name, times: totalTime, days_of_week: locationHour.day});
                        });
                    }

                    return gridArray.sort(function(a, b) {
                        var x = a.name,
                            y = b.name;

                        if (typeof x === "string")
                        {
                            x = x.toLowerCase();
                        }
                        if (typeof y === "string")
                        {
                            y = y.toLowerCase();
                        }

                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                };

                locationsDetailsController.appendDefaultSeconds = function(timeString){
                    var time = locationsDetailsController.getHour(timeString.trim());
                    time = time.search(':') > -1 ?
                        (time.search(':00')  > -1 ? time : time+ ':00') : time + ':00';
                    return time + locationsDetailsController.getMeridian(time);
                };

                locationsDetailsController.getHour = function(time) {
                    var hour = time.indexOf(':') > -1 ? time.split(':')[0] : (time.match(/\d+/)[0]);
                    return hour.length === 1 ? '0' + hour : hour;
                };

                locationsDetailsController.getCorrectedTime = function(time){
                    if(!time) { return ''; }
                    var hourAndSeconds = time.split(' ')[0];
                    var hour = hourAndSeconds.indexOf(':') > -1 ? hourAndSeconds.split(':')[0] : hourAndSeconds;
                    hour = hour.length === 1 ? '0' + hour : hour;

                    var seconds = hourAndSeconds.indexOf(':') > -1 ? hourAndSeconds.split(':')[1] : '';
                    seconds = seconds === '' ? seconds + ':00' : ":"+seconds;

                    var updatedHourWithSeconds = hour + seconds;

                    return updatedHourWithSeconds + " " + time.split(' ')[1];
                };

                locationsDetailsController.getSeconds = function(time){
                    var seconds = time.split(':')[1] ? time.split(':')[1] : '00';
                    return seconds.length === 1 ? '0' + seconds : seconds;
                };

                locationsDetailsController.getMeridian = function(time){
                    return time.indexOf('AM') > -1 ? 'AM' : (time.indexOf('PM') > -1 ? 'PM' : '');
                };

                locationsDetailsController.containsMatchingWeekDayHourAndName = function(name, openHour, closeHour){

                    var count = 0,
                        locationHours = locationsDetailsController.locationsSearchData.location_hours;

                    for(var i = 0; i < locationHours.length; i++){
                        var correctedOpenHour = locationsDetailsController.getCorrectedTime(locationHours[i].open_hour),
                            correctedCloseHour = locationsDetailsController.getCorrectedTime(locationHours[i].close_hour);
                        if(locationHours[i].name === name &&
                            correctedOpenHour === locationsDetailsController.getCorrectedTime(openHour) &&
                            correctedCloseHour === locationsDetailsController.getCorrectedTime(closeHour)){
                            count++;
                            if(count > 1) { break; }  else { continue; }
                        }
                    }
                    return count > 1 ? true : false;
                };

                function groupByName(arrayToGroup, key){
                    return arrayToGroup.reduce(function(rv, x) {
                        (rv[x[key]] = rv[x[key]] || []).push(x);
                        return rv;
                    }, {});
                }

                locationsDetailsController.deleteLocationsOperatingHours = function (locationsRow, event) {
                    var times = locationsRow.times.split('-'),
                        openTime = times[0].trim(),
                        closeTime = times[1].trim(),
                        name = locationsRow.name,
                        daysOfWeek = locationsRow.days_of_week.split(',').map(function(item) { return item.trim(); });

                    daysOfWeek.forEach(function(day){
                        //Find the object related to day, and delete it
                        var indexToSplice = getIndexToSplice(locationsDetailsController.locationsSearchData.location_hours, name, day, openTime, closeTime);
                        locationsDetailsController.locationsSearchData.location_hours.splice(indexToSplice, 1);
                    });

                    Utils.startBlockUI("locations-operating-hours-grid");
                    LocationsDetailsService.updateLocationDetailsByLocationCode(locationsDetailsController.locationsSearchData, '')
                        .then(function(response){
                            if(response === 'Success'){
                                Utils.stopBlockUI("locations-operating-hours-grid");
                                CompassToastr.success("You have successfully deleted Locations operating hours for location "+ locationsRow.name);
                                //Refresh the table
                                initialize();
                            } else {
                                Utils.stopBlockUI("locations-operating-hours-grid");
                                CompassToastr.error("There occured an error while deleting Locations operating hours for location "+ locationsRow.name);
                            }
                        }, function(error){
                            Utils.stopBlockUI("locations-operating-hours-grid");
                            CompassToastr.error("There occurred an error while deleting Locations operating hours for location "+ locationsRow.name);
                            throw "An error occurred while deleting locations operating hours " + error;
                        });
                };

                function getIndexToSplice(locationHours, name, day, openHour, closeHour){
                    for(var i = 0; i < locationHours.length; i++){
                        if(locationHours[i].name === name &&
                            locationHours[i].day === day &&
                            locationsDetailsController.getCorrectedTime(locationHours[i].open_hour) === openHour &&
                            locationsDetailsController.getCorrectedTime(locationHours[i].close_hour) === closeHour){
                            return i;
                        }
                    }
                    return -1;
                }

                locationsDetailsController.addOrEditLocationsOperatingHours = function (action, event, locationHour) {
                    var locationsHourData = locationHour || {};
                    locationsDetailsController.actionStatus = action === 'edit' ? 'edit' : 'add';
                    $uibModal.open({
                        templateUrl: 'locations/details/locations-operating-hours.tpl.html',
                        controller: 'LocationsOperatingHoursController as locationsOperatingHoursController',
                        windowClass:'location-operating-hours-modal',
                        backdrop: 'static',
                        resolve: {
                            actionStatus: function(){
                                return locationsDetailsController.actionStatus;
                            },
                            locationsHourData: locationsHourData,
                            locationsGridArray: function() {
                                return locationsDetailsController.gridArray;
                            },
                            locationsSearchData: function($stateParams, $location, LocationsDetailsService){
                                // return $scope.locationsDetailsController.locationsSearchData || locationsDetailsController.locationsSearchData;
                                if($stateParams.locationsSearchData){
                                    return $stateParams.locationsSearchData;
                                } else if($scope.locationsSearchData || locationsDetailsController.locationsSearchData) {
                                    return $scope.locationsSearchData || locationsDetailsController.locationsSearchData;
                                } else {
                                    var locationCode = $stateParams.locationCode || $location.path().split('/')[2];
                                    return LocationsDetailsService.getLocationDetailsByLocationCode(locationCode);
                                }
                            }
                        }
                    }).result.then(function (response, error) {
                        if (response === 'true') {
                            // dialog cancelled deliberately. Do not save
                        } else {
                            Utils.startBlockUI("locations-operating-hours-grid");
                            addOrUpdateLocationsOperatingHours(response).then(function(){
                                Utils.stopBlockUI("locations-operating-hours-grid");
                            });
                        }
                    }, function(error){
                        if(error === "escape key press"){
                            return;
                        }
                        Utils.stopBlockUI("locations-operating-hours-grid");
                        throw Error("An Error occured while saving locations operating hours data " + error);
                    });
                };

                function addOrUpdateLocationsOperatingHours(data) {
                    var actionStatus = locationsDetailsController.actionStatus === 'add' ? 'adding' : 'updating',
                        locationName = data.location_name;
                    locationsOperatingHoursPromise = LocationsDetailsService.updateLocationDetailsByLocationCode(data, actionStatus);
                    locationsOperatingHoursPromise.then(
                        function (response) {
                            if (response === 'error') {
                                CompassToastr.error("A error occurred while " + actionStatus + " locations operating hours for location " + locationName + " with error" + response);
                            }
                            else {
                                var status = locationsDetailsController.actionStatus === 'add' ? 'added' : 'updated';
                                CompassToastr.success("The operating hours for location " + locationName + " has been successfully " + status);
                            }
                            // Refresh the Table
                            initialize();
                        },
                        function (error) {
                            CompassToastr.error("A error occurred while " + actionStatus + " locations operating hours for location " + locationName + " with error" + error);
                            throw "An error occurred while updating location status.";
                        });
                    return locationsOperatingHoursPromise;
                }

                locationsDetailsController.addressChange = function(event){
                    locationsDetailsController.addressChanged = true;
                };

                locationsDetailsController.onAddressFocusOut = function(event){
                    if((locationsDetailsController.autoCompleteData || locationsDetailsController.lattitudeLongitude) && locationsDetailsController.addressChanged){
                        locationsDetailsController.autoCompleteData = null;
                        locationsDetailsController.lattitudeLongitude = '';
                    }
                };

                $rootScope.$on('googleMapsAutoCompleteData', function ($event, autoCompleteData, formattedAddressData) {
                    locationsDetailsController.autoCompleteData = autoCompleteData;
                    if(locationsDetailsController.autoCompleteData && formattedAddressData){
                        locationsDetailsController.locationAddress = ((formattedAddressData.streetNumber || '') + " " + (formattedAddressData.streetName || '') || '').trimLeft();
                        locationsDetailsController.locationAddress2 = "";
                        locationsDetailsController.locationCity = formattedAddressData.city || '';
                        locationsDetailsController.locationCounty = formattedAddressData.county || '';
                        locationsDetailsController.locationState = LOCATIONS_STATES_CONSTANTS.find(function(state){return state.abbreviation === formattedAddressData.state;}) ||
                            locationsDetailsController.locationStates[0];
                        locationsDetailsController.country = formattedAddressData.country || '';
                        locationsDetailsController.locationZip = formattedAddressData.zip || '';
                        locationsDetailsController.locationLattitude = locationsDetailsController.autoCompleteData.geometry.location.lat();
                        locationsDetailsController.locationLongitude = locationsDetailsController.autoCompleteData.geometry.location.lng();
                        $scope.$apply();
                    }
                });

                locationsDetailsController.verifyAddress = function(locationForm){
                    var address = (locationsDetailsController.locationAddress || ''),
                        city = locationsDetailsController.locationCity || '',
                        state = locationsDetailsController.locationState.abbreviation === '--' ? '' :
                            (locationsDetailsController.locationState.abbreviation || ''),
                        zip = locationsDetailsController.locationZip || '',
                        completeAddress = [address, city, state, zip].join(" ");

                    StgGoogleMapsService.getGeoCodeByAddress(completeAddress)
                        .then(function(response){
                            if(response === null || (response.results && response.results.length === 0) || response.status === GOOGLEMAPS_CONSTANTS.ZERO_RESULTS) {
                                CompassToastr.warning("No addresses were found for the given address.");
                                locationsDetailsController.autoCompleteData = null;
                            } else {
                                CompassToastr.success("Address has been verified.");
                                locationsDetailsController.autoCompleteData = response;
                            }
                        }, function(error){
                            CompassToastr.error("An error occurred while verifying the provided address." + address);
                            $log.error("An error occurred while verifying the provided address.", address, error);
                        });
                };

                initialize();
            }
    ]);
})();