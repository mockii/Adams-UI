(function () {
    angular.module('adams.locations.details.controller', [])
        .controller('LocationsDetailsController', ['$rootScope', '$scope', '$stateParams', '$location', 'action', 'LocationsDetailsService', 'Utils', 'CompassToastr', '$uibModal', 'WEEK_DAYS_ARRAY', 'ModalDialogService', 'LOCATIONS_STATES_CONSTANTS', 'StgStatesService', '$log', 'StgGoogleMapsService', 'GOOGLEMAPS_CONSTANTS', 'locationRowData', 'locationsSearchData',
            function ($rootScope, $scope, $stateParams, $location, action, LocationsDetailsService, Utils, CompassToastr, $uibModal, WEEK_DAYS_ARRAY, ModalDialogService, LOCATIONS_STATES_CONSTANTS, StgStatesService, $log, StgGoogleMapsService, GOOGLEMAPS_CONSTANTS, locationRowData, locationsSearchData) {
                var locationsDetailsController = this,
                    locationsOperatingHoursPromise,
                    id = 0;

                locationsDetailsController.action = action;
                locationsDetailsController.locationRowData = locationRowData;
                locationsDetailsController.locationsSearchData = locationsSearchData;
                locationsDetailsController.lattitudeLongitude = '';
                locationsDetailsController.addressChanged = false;
                locationsDetailsController.gridArray = [];
                locationsDetailsController.newArray = [];

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
                } else {
                    // Do nothing
                }

                function initialize() {
                    var locationCode = $location.path().split('/')[2];
                    locationCode = locationCode === 'create' ? '' : locationCode;
                    $scope.locationCode = locationsDetailsController.locationCode = locationCode;
                    locationsDetailsController.hasLocationCode = $scope.locationCode ? true : false;
                    locationsDetailsController.locationStates = LOCATIONS_STATES_CONSTANTS;
                    if (locationsDetailsController.action === 'edit'){
                        $scope.locationsSearchData = locationsDetailsController.locationsSearchData;
                        locationsDetailsController.buildOperatingHoursData();
                    } else if(locationsDetailsController.action === 'add'){
                            locationsDetailsController.autoCompleteData = null;
                            locationsDetailsController.locationState = locationsDetailsController.locationStates[0];
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

                    locationsDetailsController.locationState = locationsDetailsController.locationsSearchData ?
                        LOCATIONS_STATES_CONSTANTS.find(function(state){return state.abbreviation === locationsDetailsController.locationsSearchData.state;}) :
                        locationsDetailsController.locationStates[0];
                    locationsDetailsController.lattitudeLongitude = locationsDetailsController.locationsSearchData ? locationsDetailsController.locationsSearchData.longitude_latitude : '';
                };

                locationsDetailsController.stateFilterChanged = function(state){
                    if(!state){
                        locationsDetailsController.locationState = locationsDetailsController.locationStates[0];
                    }
                    if(locationsDetailsController.autoCompleteData || locationsDetailsController.lattitudeLongitude){
                        locationsDetailsController.autoCompleteData = null;
                        locationsDetailsController.lattitudeLongitude = null;
                    }
                    $log.log(state);
                };

                locationsDetailsController.clearAndGoBack = function(){
                    if(locationsDetailsController.action === 'add'){
                        StgStatesService.goToBackState();
                    }
                };

                locationsDetailsController.saveLocation = function(){
                  var locationData = {},
                      locations = [],
                      locationObject = {
                          "active": locationsDetailsController.locationStatus,
                          "address1": locationsDetailsController.locationAddress,
                          "address2": locationsDetailsController.locationAddress2,
                          "city": locationsDetailsController.locationCity,
                          "location_name": locationsDetailsController.locationName,
                          "location_code": locationsDetailsController.locationCode,
                          "location_description": "",
                          "longitude_latitude": locationsDetailsController.locationLattitude + "," + locationsDetailsController.locationLongitude,
                          "state": locationsDetailsController.locationState.abbreviation,
                          "zip": locationsDetailsController.locationZip,
                          "location_hours":locationsDetailsController.locationsSearchData ? locationsDetailsController.locationsSearchData.location_hours : []
                      };
                      locations.push(locationObject);
                      locationData.locations = locations;
                      locationsDetailsController.locationData = locationData;
                      if(locationsDetailsController.action === 'add'){
                            LocationsDetailsService.addLocation(locationsDetailsController.locationData)
                                .then(function(response){
                                    onAddOrEditResponse(response);
                                }, function(error){
                                    $log.error("An error occurred while adding locations " + error);
                                });

                      } else {
                            LocationsDetailsService.updateLocationDetailsByLocationCode(locationsDetailsController.locationData.locations[0])
                                .then(function(response){
                                    onAddOrEditResponse(response);
                                }, function(error){
                                    $log.error("An error occurred while updating locations " + error);
                                });
                      }
                };

                function onAddOrEditResponse(response){
                    if(locationsDetailsController.action === 'add') {
                        locationsDetailsController.locationsSearchData = response;
                        $stateParams.action = locationsDetailsController.action = 'edit';
                        StgStatesService.goToState('locationsDetails', {
                            'locationSearchData': locationsDetailsController.locationsSearchData,
                            'locationCode': locationsDetailsController.locationsSearchData.location_code,
                            'action': locationsDetailsController.action,
                            'backState': 'locations',
                            'locationRowData': null
                        });
                    } else {
                        LocationsDetailsService.getLocationDetailsByLocationCode(locationsDetailsController.locationCode)
                            .then(function(response){
                                    locationsDetailsController.locationsSearchData = response;
                                    CompassToastr.success("Location has been updated.");
                                },
                                function(error){
                                    $log.error("An error occurred while fetching locations", error);
                            });
                    }
                }

                locationsDetailsController.buildOperatingHoursData = function() {
                    locationsDetailsController.newArray = [];
                    locationsDetailsController.gridArray = [];
                    locationsDetailsController.locationsSearchData.location_hours.forEach(function(locationHour){
                        addToNewArray(locationHour);
                    });
                    concatDays();
                    sortGridData();
                };

                function addToNewArray(locationHour) {
                    if (doesNewArrayHaveLocationHour(locationHour)) {
                        addDayToNewArrayItem(locationHour);
                    } else {
                        addNewArrayItemFromLocationHour(locationHour);
                    }
                }

                function doesNewArrayHaveLocationHour(locationHour) {
                    return getLocationHourFromNewArray(locationHour) ? true : false;
                }

                function addDayToNewArrayItem(locationHour) {
                    var item = getLocationHourFromNewArray(locationHour);
                    item.days.push(locationHour.day);
                }

                function addNewArrayItemFromLocationHour(locationHour) {
                    var newItem = {
                        name: locationHour.name,
                        open_hour: locationsDetailsController.getCorrectedTime(locationHour.open_hour),
                        close_hour: locationsDetailsController.getCorrectedTime(locationHour.close_hour),
                        days: []
                    };

                    newItem.days.push(locationHour.day);
                    locationsDetailsController.newArray.push(newItem);
                }

                function getLocationHourFromNewArray(locationHour) {
                    for(var i=0; i < locationsDetailsController.newArray.length; i++) {
                        if (locationHour.name === locationsDetailsController.newArray[i].name &&
                            locationsDetailsController.getCorrectedTime(locationHour.open_hour) === locationsDetailsController.newArray[i].open_hour &&
                            locationsDetailsController.getCorrectedTime(locationHour.close_hour) === locationsDetailsController.newArray[i].close_hour) {

                            return locationsDetailsController.newArray[i];
                        }
                    }
                    return null;
                }

                function concatDays(){
                    angular.forEach(locationsDetailsController.newArray, function(item){
                       var concatenatedDays = item.days.sort(function sortByDay(a, b) {
                           return WEEK_DAYS_ARRAY.indexOf(a) > WEEK_DAYS_ARRAY.indexOf(b);
                       }).join(', ');
                       var openHour = locationsDetailsController.getCorrectedTime(item.open_hour),
                           closeHour = locationsDetailsController.getCorrectedTime(item.close_hour),
                           locationHourTimes = openHour +  ' - ' + closeHour;
                        locationsDetailsController.gridArray.push({id:id++, name: item.name, times: locationHourTimes, days_of_week: concatenatedDays});
                    });
                }

                function sortGridData(){
                    locationsDetailsController.gridArray =  locationsDetailsController.gridArray.sort(function(a, b) {
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
                }

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

                /*function groupByName(arrayToGroup, key){
                    return arrayToGroup.reduce(function(rv, x) {
                        (rv[x[key]] = rv[x[key]] || []).push(x);
                        return rv;
                    }, {});
                }*/

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

                    var itemToSearch = {
                        name: name,
                        open_hour: openTime,
                        close_hour: closeTime,
                        days: daysOfWeek
                    };

                    var newArrayIndex = -1;
                    if(locationsDetailsController.newArray && locationsDetailsController.newArray.length > 0){
                        for (var i = 0; i < locationsDetailsController.newArray.length; i++) {
                            if(itemToSearch.name === locationsDetailsController.newArray[i].name &&
                                itemToSearch.open_hour === locationsDetailsController.newArray[i].open_hour &&
                                itemToSearch.close_hour === locationsDetailsController.newArray[i].close_hour){
                                newArrayIndex = i;
                                break;
                            }
                        }
                    }

                    locationsDetailsController.newArray.splice(newArrayIndex, 1);

                    var getGridArrayIndex = -1;
                    if(locationsDetailsController.gridArray && locationsDetailsController.gridArray.length > 0){
                        for (var j = 0; j < locationsDetailsController.gridArray.length; j++) {
                            if(locationsRow.id === locationsDetailsController.gridArray[j].id){
                                getGridArrayIndex = j;
                                break;
                            }
                        }
                    }

                    locationsDetailsController.gridArray.splice(getGridArrayIndex, 1);

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
                                CompassToastr.error("There occurred an error while deleting Locations operating hours for location "+ locationsRow.name);
                            }
                        }, function(error){
                            Utils.stopBlockUI("locations-operating-hours-grid");
                            CompassToastr.error("There occurred an error while deleting Locations operating hours for location "+ locationsRow.name);
                            $log.error("An error occurred while deleting locations operating hours " + error);
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
                    }).result.then(function (response) {
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
                        $log.error("An Error occured while saving locations operating hours data " + error);
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
                            // Get the updated data and Refresh the Table
                            LocationsDetailsService.getLocationDetailsByLocationCode(locationsDetailsController.locationCode)
                                .then(function(response) {
                                    locationsDetailsController.locationsSearchData = response;
                                    initialize();
                                }, function(error){
                                    CompassToastr.error("A error occurred while fetching location details by location code " + error);
                                    $log.error("A error occurred while fetching location details by location code ", error);
                                });
                        },
                        function (error) {
                            CompassToastr.error("A error occurred while " + actionStatus + " locations operating hours for location " + locationName + " with error" + error);
                            $log.error("An error occurred while updating location status.", error);
                        });
                    return locationsOperatingHoursPromise;
                }

                locationsDetailsController.addressChange = function(){
                    if($scope.locationForm) {
                        $scope.locationForm.$setPristine(false);
                    }
                    locationsDetailsController.addressChanged = hasAddressChanged();
                };

                function hasAddressChanged(){
                    if(!locationsSearchData){
                        return false;
                    }
                    if(locationsSearchData.address1 !== locationsDetailsController.locationAddress ||
                        locationsSearchData.address2 !== locationsDetailsController.locationAddress2 ||
                        locationsSearchData.city !== locationsDetailsController.locationCity ||
                        locationsSearchData.state !== locationsDetailsController.locationState.abbreviation ||
                        locationsSearchData.zip !== locationsDetailsController.locationZip){
                        return true;
                    }
                    return false;
                }

                locationsDetailsController.onAddressFocusOut = function(){
                    if((locationsDetailsController.autoCompleteData || locationsDetailsController.lattitudeLongitude) && locationsDetailsController.addressChanged){
                        locationsDetailsController.autoCompleteData = null;
                        locationsDetailsController.lattitudeLongitude = '';
                    }
                };

                $rootScope.$on('googleMapsAutoCompleteData', function ($event, autoCompleteData, formattedAddressData) {
                    if(!autoCompleteData && !formattedAddressData){
                        return;
                    }
                    locationsDetailsController.autoCompleteData = autoCompleteData;
                    setLocationModel(formattedAddressData);
                    if($scope.locationForm) {
                        $scope.locationForm.$setDirty();
                    }
                });

                function setLocationModel(formattedAddressData){
                    locationsDetailsController.locationAddress = ((formattedAddressData.streetNumber || '') + " " + (formattedAddressData.streetName || '')).trimLeft();
                    locationsDetailsController.locationAddress2 = "";
                    locationsDetailsController.locationCity = formattedAddressData.city || '';
                    locationsDetailsController.locationCounty = formattedAddressData.county || '';
                    locationsDetailsController.locationState = LOCATIONS_STATES_CONSTANTS.find(function(state){return state.abbreviation === formattedAddressData.state;}) ||
                        locationsDetailsController.locationStates[0];
                    locationsDetailsController.country = formattedAddressData.country || '';
                    locationsDetailsController.locationZip = formattedAddressData.zip || '';
                    locationsDetailsController.locationLattitude = formattedAddressData.lattitude || locationsDetailsController.autoCompleteData.geometry.location.lat();
                    locationsDetailsController.locationLongitude = formattedAddressData.longitude || locationsDetailsController.autoCompleteData.geometry.location.lng();
                    locationsDetailsController.lattitudeLongitude = locationsDetailsController.locationLattitude + ', ' + locationsDetailsController.locationLongitude;
                }

                function selectAddressModal(formattedAddresses){
                    $uibModal.open({
                        templateUrl: 'locations/details/select-address.tpl.html',
                        controller: 'SelectAddressController as selectAddressController',
                        size: 'md',
                        backdrop: 'static',
                        resolve: {
                            formattedAddresses: function(){
                                return formattedAddresses;
                            }
                        }
                    }).result.then(function (response) {
                        if (response === 'true') {
                            // dialog cancelled deliberately. Do not save
                        } else {
                            setLocationModel(response);
                            $rootScope.$broadcast('verifyAddressChange', getAddressComponentByPlaceId(response.placeId));
                        }
                    }, function(error){
                        if(error === "escape key press"){
                            return;
                        }
                    });
                }

                function getAddressComponentByPlaceId(placeId){
                    for(var i=0; locationsDetailsController.unFormattedAddresses.length > 0; i++){
                        if(locationsDetailsController.unFormattedAddresses[i].place_id  === placeId){
                            return locationsDetailsController.unFormattedAddresses[i];
                        }
                    }
                    return null;
                }

                locationsDetailsController.verifyAddress = function(){
                    var address = (locationsDetailsController.locationAddress || ''),
                        city = locationsDetailsController.locationCity || '',
                        state = locationsDetailsController.locationState.abbreviation || '',
                        zip = locationsDetailsController.locationZip || '',
                        completeAddress = [address, city, state, zip].join(" ");

                    StgGoogleMapsService.getGeoCodeByAddress(completeAddress)
                        .then(function(response){
                            if(response === null || (response.results && response.results.length === 0) || response.status === GOOGLEMAPS_CONSTANTS.ZERO_RESULTS) {
                                CompassToastr.warning("No addresses were found for the given address.");
                                locationsDetailsController.autoCompleteData = null;
                            } else if(response.results && response.results.length > 1){
                                // select a address from the list
                                locationsDetailsController.unFormattedAddresses = response.results;
                                locationsDetailsController.formattedAddresses = response.formattedAddresses;
                                selectAddressModal(locationsDetailsController.formattedAddresses);
                            }
                            else {
                                setLocationModel(response);
                                CompassToastr.success("Address has been verified.");
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