'use strict';

angular.module('adams.common.filters', [])
    .filter('statusFilter', function () {
        return function (value) {
            if (angular.isUndefined((value))) {
                return null;
            }


            if (typeof value !== "boolean") {
                return null;
            }

            if (value === true) {
                return 'Active';
            } else {
                return 'Inactive';
            }
        };
    });