'use strict';

(function () {

    angular.module('adams.controller', [])
    .controller('AppController', ['$location', 'ADAMS_CONSTANTS',
        function($location, ADAMS_CONSTANTS) {

            var appController = this;

            function initialize() {
                appController.logo = ADAMS_CONSTANTS.ADAMS_LOGO;
                appController.logoState = 'home';
                appController.logoClasses = 'col-md-4 col-sm-7 col-xs-6';
                appController.topNavigationClasses = 'col-md-4 col-md-push-4 col-sm-5 col-xs-6';

                appController.showPoweredByAdams = appController.isHeaderHidden();

                appController.menuItems = [
                    {
                        state: "home",
                        pageName: "Adams Home"
                    },
                    {
                        state: "vendors",
                        pageName: "Vendor"
                    },
                    {
                        state: "costcenters",
                        pageName: "Cost Center"
                    },
                    {
                        state: "bookofrecord",
                        pageName: "Book of Record"
                    },
                    {
                        state: "userAdministration",
                        pageName: "User Administration"
                    },
                    {
                        state: "tempAssociates",
                        pageName: "Temp Associates"
                    },
                    {
                        state: "securedObjects",
                        pageName: "Secured Objects"
                    },
                    {
                        state: "products",
                        pageName: "Products"
                    },
                    {
                        state: "locations",
                        pageName: "Locations"
                    },
                    {
                        state: "pointOfSale",
                        pageName: "POS"
                    },
                    {
                        state: "accessControl",
                        pageName: "Access Control"
                    },
                    {
                        state: "teams",
                        pageName: "Teams"
                    },
                    {
                        state: "commPreferences",
                        pageName: "Comm Preferences"
                    }
                ];
            }

            appController.isHeaderHidden = function() {
                var qs = $location.search();
                return qs.menu === 'false';
            };

            initialize();
        }]);

})();
