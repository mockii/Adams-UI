(function () {
    angular.module('adams.locations.details.service', [])
        .factory('LocationsDetailsService', ['$http', 'ADAMS_URL_SPACE',
            function ($http, ADAMS_URL_SPACE) {
                var locationsDetailsService = {};

                locationsDetailsService.addLocation = function(location){
                    var url = ADAMS_URL_SPACE.urls.local.addLocation;

                    return $http.post(url, location)
                        .then(function (response) {
                            return response.data.data[0];
                        }, function (error) {
                            console.error("An error occurred while adding location.", error.data);
                            return 'error';
                        });
                };

                locationsDetailsService.getLocationDetailsByLocationCode = function(locationCode){
                    var url = ADAMS_URL_SPACE.urls.local.getLocationDetailsByLocationCode.replace('{locationCode}', locationCode);

                    return $http.get(url)
                        .then(function (response) {
                            return response.data.data[0];
                        }, function (error) {
                            console.error('An error occurred while fetching location details by location code ', error.data);
                            return 'error';
                        });
                };

                locationsDetailsService.updateLocationDetailsByLocationCode = function(locationsRowData){
                    var locationCode = locationsRowData.location_code,
                        url = ADAMS_URL_SPACE.urls.local.updateLocationDetailsByLocationCode.replace('{locationCode}', locationCode)+'?locationCode='+locationCode;

                    return $http.put(url, locationsRowData)
                        .then(function (response) {
                            return response.data.data[0];
                        }, function (error) {
                            console.error('An error occurred while updating locations ', error.data);
                            return 'error';
                        });
                };

                return locationsDetailsService;
            }]);
})();
