'use strict';

(function () {
    angular.module('adams.add.associates.temp', ['adams.add.associates.temp.controller', 'adams.associates.temp.search.service'])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('addTempAssociates', {
                    url: "/associates/temporary/associatesinfo?{personnel_number}&{time_tracking_system}",
                    templateUrl: "associates/temporary/add-associates.temp.tpl.html",
                    controller: "AddAssociatesController as addAssociatesController",
                    params: {
                        associateSearchData: null
                    },
                    data: {
                        pageTitle: "Associate Information",
                        backState: 'tempAssociates'
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'associates',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/associates.css'
                                ]
                            });
                        }],
                        personnelNumber : function($stateParams){
                            return $stateParams.personnel_number;
                        },
                        timeTrackingSystem: function($stateParams) {
                            return $stateParams.time_tracking_system;
                        },
                        associateData : function($stateParams, AssociatesSearchService){
                            var personnelNumber = $stateParams.personnel_number,
                                associateSearchData = $stateParams.associateSearchData;
                            if (personnelNumber && !associateSearchData){
                                return AssociatesSearchService.getTempAssociateInfo(personnelNumber);
                            }
                        },
                        timeTrackingSystems: function(AssociatesSearchService) {
                            return AssociatesSearchService.getTimeTrackingSystems();
                        },
                        agencies: function(AssociatesSearchService) {
                            var fields;
                            fields = "vendor_number, vendor_name_1, source_system_id";
                            
                            return AssociatesSearchService.getVendorDetails(fields);
                        }
                    }
                    // reload:true
                })
            ;
        }])
    ;
})();