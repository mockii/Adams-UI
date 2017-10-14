(function () {
    angular.module('adams.locations.search.constants', [])
        .constant('LOCATIONS_SEARCH_CONSTANTS', {
        })
        .constant('WEEK_DAYS_OBJECT', {
            MONDAY: 'MONDAY',
            TUESDAY: 'TUESDAY',
            WEDNESDAY: 'WEDNESDAY',
            THURSDAY: 'THURSDAY',
            FRIDAY: 'FRIDAY',
            SATURDAY: 'SATURDAY',
            SUNDAY: 'SUNDAY'
        })
        .constant('WEEK_DAYS_ARRAY', ['MONDAY','TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']);
})();