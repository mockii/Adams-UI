'use strict';

angular.module('adams.common.url', [])
    .constant('ADAMS_URL_SPACE', {
        urls: {
            local: {
                userDetails: '/ui/api/users',
                applicationsByUser: '/ui/api/users/{userName}/applications',
                rolesByLoginUser: '/ui/api/users/applications/{application}/roles',
                rolesByUser: '/ui/api/users/{userName}/applications/{application}/roles',
                teamsByUser: '/ui/api/users/{userName}/applications/{application}/roles/{role}/teams',
                updateRole: '/ui/api/users/{userName}/applications/{application}/updateRole',
                changeDefaultRole: '/ui/api/users/{userName}/applications/{application}/defaultRoles/{role}',
                changeDefaultTeam: '/ui/api/users/{userName}/applications/{application}/roles/{role}/defaultTeams/{team}/sourcesystemid/{sourcesystemid}',
                deleteApp: '/ui/api/users/{userName}/applications/{application}',
                deleteRole: '/ui/api/users/{userName}/applications/{application}/roles/{role}',
                deleteTeam: '/ui/api/users/{userName}/applications/{application}/roles/{role}/teams/{team}/sourcesystemid/{sourcesystemid}',
                addTeam: '/ui/api/users/userName/{userName}/applications/{application}/roles/{role}/addTeams',
                costCenterByLoginUser: '/ui/api/users/applications/{application}/roles/{role}/hierarchicalteams',
                vendorData: '/ui/api/vendorData',
				vendorSearchData: '/ui/api/vendors',
                vendorDetails: '/ui/api/vendors/details',
                vendorAndListMarkets: '/ui/api/vendors/details/marketmapping',
                deleteVendorsTeam: '/ui/api/vendors/{vendorNumber}/markets/{marketName}/teams/{teamName}/{vendorSourceSystemId}/{teamSourceSystemId}',
                vendorCostCenters: '/ui/api/vendors/{vendorNumber}/costcentermapping',
                updateVendorCostCenter: '/ui/api/vendors/{vendorNumber}/costCenters/{costCenterName}',
                vendorCostCenterHistory: '/ui/api/vendors/{vendorNumber}/costCenters/{costCenterName}/history',
                eligibleVendorCostCenter: '/ui/api/vendors/{vendorNumber}/eligibleCostCenters',
                addEligibleCostCenters: '/ui/api/vendors/{vendorNumber}/costCenters',
                addMarketMapping: '/ui/api/vendors/{vendorNumber}/markets/{marketName}/teams',
                marketMappingRoot: '/ui/api/vendors/markets/root',
                marketMappingChildren: '/ui/api/vendors/markets/{marketName}/children',
                vendorContacts: '/ui/api/vendors/api/vendors/{vendorNumber}/contacts',
                deleteVendorContact: '/ui/api/vendors/{vendorNumber}/contacts/{vendorContactId}',
                addContactInfo: '/ui/api/vendors/{vendorNumber}/contacts',
                updateContactInfo: '/ui/api/vendors/{vendorNumber}/contacts/{vendorContactId}',

                tempAssociates: '/ui/api/associates/temporary',
                modifyTempAssociate: '/ui/api/associates/temporary/{personnel_number}',
                tempAssociatesEngagements: '/ui/api/associates/temporary/{personnel_number}/engagements',
                timeTrackingSystems: '/ui/api/associates/temporary/time_tracking_systems',
                jobs: '/ui/api/jobs',
                vendors: '/ui/api/associates/temporary/vendors',
                secApplication: '/ui/api/applications',
                secRole: '/ui/api/roles',
                secObjects: '/ui/api/secured_objects',
                userHistory: '/ui/api/users/{userName}/history',

                costCenters: '/ui/api/cost_centers',
                costCenterDetails: '/ui/api/cost_centers/details',
                costCenterAndListMarkets: '/ui/api/cost_centers/details/marketmapping',
                deleteCostCentersMarkets: '/ui/api/cost_centers/{costCenterNumber}/markets/{marketName}',
                addCostCenterMarketMapping: '/ui/api/cost_centers/{costCenterNumber}/markets',
                costCenterVendors: '/ui/api/cost_centers/{costCenterNumber}/vendormapping',
                costCenterVendorHistory: '/ui/api/cost_centers/{costCenterNumber}/vendors/{vendorNumber}/history',
                updateCostCenterVendor: '/ui/api/cost_centers/{costCenterNumber}/vendormapping/{vendorNumber}',
                eligibleCostCenterVendor: '/ui/api/cost_centers/{costCenterNumber}/eligibleVendors',
                addEligibleVendors: '/ui/api/cost_centers/{costCenterNumber}/vendors',

                bookOfRecords: '/ui/api/bookofrecords',

                // Products UI
                products: '/ui/api/products',
                productDetails: '/ui/api/products/{gtin}',
                allergens: '/ui/api/products/{gtin}/allergens',
                dietTypes: '/ui/api/products/{gtin}/diet_types',
                marketing: '/ui/api/products/{gtin}/marketing',
                multimedia: '/ui/api/products/{gtin}/multimedia',
                nutrients: '/ui/api/products/{gtin}/nutrients',

                // Locations and Stations

                // Locations and Stations
                addLocation: '/ui/api/locations',
                getLocationsByUser: '/ui/api/users/locations',
                getLocationDetailsByLocationCode: '/ui/api/locations/{locationCode}',
                updateLocationDetailsByLocationCode: '/ui/api/locations/{locationCode}',
                getCostCentersByLocationCode: '/ui/api/locations/{locationCode}/cost_centers',
                addCostCentersByLocationCode: '/ui/api/locations/{locationCode}/cost_centers',
                getCostCentersByUserName: '/ui/api/users/cost_centers',
                updateCostCentersByLocationAndCostCenterName: '/ui/api/locations/{locationCode}/cost_centers/{costCenterName}',
                getStationsByLocationCode: '/ui/api/locations/{locationCode}/stations',
                addStationsByLocationCode: '/ui/api/locations/{locationCode}/stations',
                getStations: '/ui/api/stations',
                stationsByLocationAndStationCode: '/ui/api/locations/{locationCode}/stations/{stationCode}',
                getCostCentersByLocationAndStationCode: '/ui/api/locations/{locationCode}/stations/{stationCode}/cost_centers',
                addCostCentersByLocationAndStationCode: '/ui/api/locations/{locationCode}/stations/{stationCode}/cost_centers',
                updateStationsCostCenter: '/ui/api/locations/{locationCode}/stations/{stationCode}/cost_centers/{costCenterName}'

            }
        }
    });