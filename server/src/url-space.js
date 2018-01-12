var urlSpace = (function () {

    return {

        urls: {
            local: {
                userDetails: '/api/users',
                clientLogger: '/api/client/logger',
                applicationsByUser: '/api/users/:userName/applications',
                rolesByLoginUser: '/api/users/applications/:application/roles',
                rolesByUser: '/api/users/:userName/applications/:application/roles',
                teamsByUser: '/api/users/:userName/applications/:application/roles/:role/teams',
                updateRole: '/api/users/:userName/applications/:application/updateRole',
                changeDefaultRole: '/api/users/:userName/applications/:application/defaultRoles/:role',
                changeDefaultTeam: '/api/users/:userName/applications/:application/roles/:role/defaultTeams/:team/sourcesystemid/:sourcesystemid',
                deleteApp: '/api/users/:userName/applications/:application',
                deleteRole: '/api/users/:userName/applications/:application/roles/:role',
                deleteTeam: '/api/users/:userName/applications/:application/roles/:role/teams/:team/sourcesystemid/:sourcesystemid',
                addTeam: '/api/users/userName/:userName/applications/:application/roles/:role/addTeams',
                vendorData: '/api/vendordata',
                costCenterByLoginUser: '/api/users/applications/:application/roles/:role/hierarchicalteams',
                vendorSearchData: '/api/vendors',
                vendorDetails: '/api/vendors/details',
                vendorAndListMarkets: '/api/vendors/details/marketmapping',
                deleteVendorsTeam: '/api/vendors/:vendorNumber/markets/:marketName/teams/:teamName/:vendorSourceSystemId/:teamSourceSystemId',
                vendorCostCenters: '/api/vendors/:vendorNumber/costcentermapping',
                updateVendorCostCenter: '/api/vendors/:vendorNumber/costCenters/:costCenterName',
                vendorCostCenterHistory: '/api/vendors/:vendorNumber/costCenters/:costCenterName/history',
                eligibleVendorCostCenter: '/api/vendors/:vendorNumber/eligibleCostCenters',
                addEligibleCostCenters: '/api/vendors/:vendorNumber/costCenters',
                addMarketMapping: '/api/vendors/:vendorNumber/markets/:marketName/teams',
                marketMappingRoot: '/api/vendors/markets/root',
                marketMappingChildren: '/api/vendors/markets/:marketName/children',
                vendorContacts: '/api/vendors/api/vendors/:vendorNumber/contacts',
                deleteVendorContact: '/api/vendors/:vendorNumber/contacts/:vendorContactId',
                addContactInfo: '/api/vendors/:vendorNumber/contacts',
                updateContactInfo: '/api/vendors/:vendorNumber/contacts/:vendorContactId',
                tempAssociates: '/api/associates/temporary',
                modifyTempAssociates: '/api/associates/temporary/:personnel_number',
                tempAssociatesEngagements: '/api/associates/temporary/:personnel_number/engagements',
                timeTrackingSystems: '/api/associates/temporary/time_tracking_systems',
                jobs: '/api/jobs',
                vendors: '/api/associates/temporary/vendors',
                secApplication: '/api/applications',
                secRole: '/api/roles',
                secObjects: '/api/secured_objects',
                userHistory: '/api/users/:userName/history',

                // access control
                secObjectsForApp: '/api/applications/:applicationName/secured_objects',
                rolesForSecuredObject: '/api/applications/:applicationName/secured_objects/:securedObjectName/roles',
                overridesForSecuredObject: '/api/applications/:applicationName/secured_objects/:securedObjectName/rules/permissions',


                // Cost Center UI
                costCenters: '/api/cost_centers',
                costCenterDetails: '/api/cost_centers/details',
                costCenterAndListMarkets: '/api/cost_centers/details/marketmapping',
                deleteCostCentersMarkets: '/api/cost_centers/:costCenterNumber/markets/:marketName',
                addCostCenterMarketMapping: '/api/cost_centers/:costCenterNumber/markets',
                costCenterVendors: '/api/cost_centers/:costCenterNumber/vendormapping',
                costCenterVendorHistory: '/api/cost_centers/:costCenterNumber/vendors/:vendorNumber/history',
                updateCostCenterVendor: '/api/cost_centers/:costCenterNumber/vendormapping/:vendorNumber',
                eligibleCostCenterVendor: '/api/cost_centers/:costCenterNumber/eligibleVendors',
                addEligibleVendors: '/api/cost_centers/:costCenterNumber/vendors',

                // Book of Record
                bookOfRecords: '/api/bookofrecords',

                // Products UI
                products: '/api/products',
                productDetails: '/api/products/:gtin',
                allergens: '/api/products/:gtin/allergens',
                dietTypes: '/api/products/:gtin/diet_types',
                marketing: '/api/products/:gtin/marketing',
                multimedia: '/api/products/:gtin/multimedia',
                nutrients: '/api/products/:gtin/nutrients',

                // Locations and Stations
                addLocation: '/api/locations',
                getLocationsByUser: '/api/users/locations',
                getLocationDetailsByLocationCode: '/api/locations/:location_code',
                updateLocationDetailsByLocationCode: '/api/locations/:location_code',
                getCostCentersByLocationCode: '/api/locations/:location_code/cost_centers',
                addCostCentersByLocationCode: '/api/locations/:location_code/cost_centers',
                getCostCentersByUserName: '/api/users/cost_centers',
                updateCostCentersByLocationAndCostCenterName: '/api/locations/:location_code/cost_centers/:cost_center_name',
                getStationsByLocationCode: '/api/locations/:location_code/stations',
                addStationsByLocationCode: '/api/locations/:location_code/stations',
                getStations: '/api/stations',
                stationsByLocationAndStationCode: '/api/locations/:location_code/stations/:station_code',
                getCostCentersByLocationAndStationCode: '/api/locations/:location_code/stations/:station_code/cost_centers',
                addCostCentersByLocationAndStationCode: '/api/locations/:location_code/stations/:station_code/cost_centers',
                updateStationsCostCenter: '/api/locations/:location_code/stations/:station_code/cost_centers/:cost_center_name',

                // POS
                getPosItems: '/api/pos/posItems',
                getPosItem: '/api/pos/posItems/:pos_id',
                addPosItem: '/api/pos/posItems',
                savePosItem: '/api/pos/posItems/:pos_id',
                getPosRevenueCategories: '/api/pos/revenue_categories',
                addPosRevenueCategory: '/api/pos/revenue_categories',
                updatePosRevenueCategory: '/api/pos/revenue_categories/:revenue_category_code',
                getPosItemCategories: '/api/pos/item_categories',
                addPosItemCategory: '/api/pos/item_categories',
                updatePosItemCategory: '/api/pos/item_categories/:item_category_code',
                getPosItemClasses: '/api/pos/item_classes',
                addPosItemClass: '/api/pos/item_classes',
                updatePosItemClass: '/api/pos/item_classes/:item_class_code',
                getTypeDetailsForSystemCategoryAndVendor: '/api/pos/system_categories/:system_category/vendors/:vendor_name/types/:type/items',
                addTypeDetailsForSystemCategoryAndVendor: '/api/pos/system_categories/:system_category/vendors/:vendor_name/types/:type/items',
                getSystemCategories : '/api/pos/system_categories',
                getVendors : '/api/pos/vendors',
                getTypesForVendor : '/api/pos/vendors/:vendor_name/types',
                getPosTags: '/api/pos/tags',
                getPosUnitsOfMeasure: '/api/pos/units',
                getTypeDetailsForSystemCategoryDefaultsAndVendor: '/api/pos/item_categories/:item_category_code/defaults',
                updateRevenueCategoryDefaults: '/api/pos/revenue_categories/:revenue_category_code/defaults/system_categories/:system_category_name/vendors/:vendor_name/types/:vendor_category_type_name',
                updateItemCategoryDefaults: '/api/pos/item_categories/:item_category_code/defaults/system_categories/:system_category_name/vendors/:vendor_name/types/:vendor_category_type_name',

                // Communication Preferences
                commPreferences:  '/api/users/:userName/communication_preferences',
                updateCommPreferences:  '/api/users/:userName/communication_preferences/:communicationPreferencesCode'
            },
            adams: {
                userDetails: '/api/users?limit={limit}&page={page}&sorts={sorts}&search={search}&appName={appName}&roleName={roleName}',
                applicationsByUser: '/api/users/{userName}/applications',
                rolesByLoginUser: '/api/users/applications/{application}/roles',
                rolesByUser: '/api/users/{userName}/applications/{application}/roles',
                teamsByUser: '/api/users/{userName}/applications/{application}/roles/{role}/teams',
                deleteApp: '/api/users/{userName}/applications/{application}',
                updateRole: '/api/users/{userName}/applications/{application}/roles',
                modifyRole: '/api/users/{userName}/applications/{application}/roles/{role}',
                modifyTeam: '/api/users/{userName}/applications/{application}/roles/{role}/teams/{teamname}?sourceSystemId={sourcesystemid}',
                addTeam: '/api/users/{userName}/applications/{application}/roles/{role}/teams',
                vendorData: '/api/vendordata',
                costCenterByLoginUser: '/api/users/applications/{application}/roles/{role}/hierarchicalteams?limit={limit}&page={page}&searchTeamName={searchTeamName}&searchTeamDescription={searchTeamDescription}&searchTeamType={searchTeamType}&sorts={sorts}',
                vendorSearchData: '/api/vendors?limit={limit}&page={page}&search={vendorSearchInput}&sorts={sorts}',
                vendorDetails: '/api/vendors/{vendor_number}?source_system_id={sourceSystemId}',
                vendorAndListMarkets: '/api/vendors/{vendor_number}/markets?limit={limit}&page={page}&market_name={marketName}&team_name={teamName}&sorts={sorts}',
                deleteVendorsTeam: '/api/vendors/{vendorNumber}/markets/{marketName}/teams/{teamName}?vendor_source_system_id={vendorSourceSystemId}&team_source_system_id={teamSourceSystemId}',
                //vendorCostCenters: '/api/vendors/{vendorNumber}/costcentermapping?limit={limit}&page={page}&costCenterSearchInput={costCenterSearchInput}&sorts={sorts}'
                //Also below url need to be fixed once replicated/api/vendors has taken care
                // vendorCostCenters: '/api/vendors/{vendorNumber}/cost_centers?limit={limit}&page={page}',
                vendorCostCenters: '/api/vendors/{vendorNumber}/cost_centers?limit={limit}&page={page}&search={costCenterSearchInput}&sorts={sorts}',
                updateVendorCostCenter: '/api/vendors/{vendor_number}/cost_centers/{cost_center_name}?vendor_source_system_id={vendorSourceSystemId}&cost_center_source_system_id={costCenterSourceSystemId}',
                vendorCostCenterHistory: '/api/vendors/{vendor_number}/cost_centers/{cost_center_name}/history?vendor_source_system_id={vendorSourceSystemId}&cost_center_source_system_id={costCenterSourceSystemId}&limit={limit}&page={page}&sorts={sorts}&cost_center_history_search={costCenterMappingHistorySearchInput}',
                addMarketMapping: '/api/vendors/{vendorNumber}/markets/{marketName}/teams?vendor_source_system_id={vendorSourceSystemId}',
                marketMappingRoot: '/api/vendors/markets/root',
                marketMappingChildren: '/api/vendors/markets/{marketName}/children',
                eligibleVendorCostCenter: '/api/vendors/{vendor_number}/eligible_cost_centers?vendor_source_system_id={vendorSourceSystemId}&limit={limit}&page={page}&sorts={sorts}&search={eligibleCostCenterSearchInput}',
                vendorContacts: '/api/vendors/{vendor_number}/contacts?source_system_id={vendorSourceSystemId}&limit={limit}&page={page}&sorts={sorts}&search={contactSearchInput}',
                deleteVendorContact: '/api/vendors/{vendorNumber}/contacts/{vendorContactId}?vendor_source_system_id={vendorSourceSystemId}',
                addContactInfo: '/api/vendors/{vendorNumber}/contacts?vendor_source_system_id={vendorSourceSystemId}',
                updateContactInfo: '/api/vendors/{vendorNumber}/contacts/{vendorContactId}?vendor_source_system_id={vendorSourceSystemId}',
                addEligibleCostCenters: '/api/vendors/{vendor_number}/cost_centers?vendor_source_system_id={vendorSourceSystemId}',
                tempAssociates: '/api/associates/temporary?limit={limit}&page={page}&sorts={sorts}&search={searchInput}',
                addTempAssociates: '/api/associates/temporary',
                tempAssociateByPersonalNo: '/api/associates/temporary/{personnel_number}',
                tempAssociatesEngagements: '/api/associates/temporary/{personnel_number}/engagements?limit={limit}&page={page}&sorts={sorts}&search={searchInput}',
                timeTrackingSystems: '/api/associates/temporary/time_tracking_systems',
                jobs: '/api/jobs?source_system_id={source_system_id}&fields={fields}&limit={limit}&page={page}&sorts={sorts}&search={jobSearchInput}',
                vendors: '/api/associates/temporary/vendors?fields={fields}',
                secApplication: '/api/applications?limit={limit}&page={page}',
                secRole_no_application: '/api/roles?limit={limit}&page={page}',
                secRole: '/api/roles?limit={limit}&page={page}&application_name={application_name}',
                secObjects: '/api/applications/{application_name}/roles/{role_name}/secured_objects?limit={limit}&page={page}',
                userHistory: '/api/users/{userName}/history?limit={limit}&page={page}&sorts={sorts}&fields={fields}&search={search}',

                // access control
                secObjectsForApp: '/api/applications/{application_name}/secured_objects?limit={limit}&page={page}',
                rolesForSecuredObject: '/api/applications/{application_name}/securedObjects/{securedObject_name}/roles?limit={limit}&page={page}',

                // Cost Center UI
                costCenters: '/api/cost_centers/?fields={fields}&limit={limit}&page={page}&sorts={sorts}&search={costCenterSearchInput}',
                costCenterDetails: '/api/cost_centers/{costCenterNumber}?sourceSystemId={sourceSystemId}',
                costCenterAndListMarkets: '/api/cost_centers/{costCenterNumber}/markets?limit={limit}&page={page}&source_system_id={sourceSystemId}&sorts={sorts}&search={search}',
                deleteCostCentersMarkets: '/api/cost_centers/{costCenterNumber}/markets/{marketName}?source_system_id={sourceSystemId}&cost_center={costCenterNumber}&market_name={marketName}',
                addCostCenterMarketMapping: '/api/cost_centers/{costCenterNumber}/markets?source_system_id={sourceSystemId}&cost_center={costCenterNumber}',
                costCenterVendors: '/api/cost_centers/{costCenterNumber}/vendors?source_system_id={sourceSystemId}&limit={limit}&page={page}&search={vendorSearchInput}&sorts={sorts}',
                costCenterVendorHistory: '/api/cost_centers/{costCenterNumber}/vendors/{vendorNumber}/history?cost_center_source_system_id={costCenterSourceSystemId}&vendor_source_system_id={vendorSourceSystemId}&limit={limit}&page={page}&sorts={sorts}&search={vendorMappingHistorySearchInput}',
                updateCostCenterVendor: '/api/cost_centers/{costCenterNumber}/vendors/{vendorNumber}?vendor_source_system_id={vendorSourceSystemId}&cost_center_source_system_id={costCenterSourceSystemId}',
                eligibleCostCenterVendor: '/api/cost_centers/{costCenterNumber}/eligible_vendors?source_system_id={costCenterSourceSystemId}&limit={limit}&page={page}&sorts={sorts}&search={eligibleVendorSearchInput}',
                addEligibleVendors: '/api/cost_centers/{costCenterNumber}/vendors?cost_center_source_system_id={costCenterSourceSystemId}',

                // Book of Record
                bookOfRecords: '/api/users/book_of_records?userName={userName}&appName={appName}&roleName={roleName}&limit={limit}&page={page}&sorts={sorts}&search={search}',

                // Products UI
                products: '/api/products?fields={fields}&limit={limit}&page={page}&sorts={sorts}&search={search}',
                productDetails: '/api/products/{gtin}',
                allergens: '/api/products/{gtin}/allergens',
                dietTypes: '/api/products/{gtin}/diet_types',
                marketing: '/api/products/{gtin}/marketing',
                multimedia: '/api/products/{gtin}/multimedia',
                nutrients: '/api/products/{gtin}/nutrients',

                // Locations and Stations
                //getLocations: '/api/locations?limit={limit}&page={page}&sorts={sorts}&search={search}',
                getLocationsByUser: '/api/users/locations?limit={limit}&page={page}&sorts={sorts}&search={search}&appName={appName}&roleName={roleName}',
                addLocation: '/api/locations',
                getLocationDetailsByLocationCode: '/api/locations/{locationCode}',
                updateLocationDetailsByLocationCode: '/api/locations/{locationCode}',
                getCostCentersByLocationCode: '/api/locations/{locationCode}/cost_centers?limit={limit}&page={page}&sorts={sorts}&search={search}',
                addCostCentersByLocationCode: '/api/locations/{locationCode}/cost_centers',
                getCostCentersByUserName: '/api/users/cost_centers?limit={limit}&page={page}&sorts={sorts}&search={search}&appName={appName}&roleName={roleName}',
                updateCostCentersByLocationAndCostCenterName: '/api/locations/{locationCode}/cost_centers/{costCenterName}/?source_system_id={sourceSystemId}',
                getStationsByLocationCode: '/api/locations/{locationCode}/stations?limit={limit}&page={page}&sorts={sorts}&search={search}',
                addStationsByLocationCode: '/api/locations/{locationCode}/stations',
                getStations: '/api/stations?limit={limit}&page={page}&sorts={sorts}&search={search}',
                stationsByLocationAndStationCode: '/api/locations/{locationCode}/stations/{stationCode}/?cost_center_name={costCenterName}&source_system_id={sourceSystemId}',
                getCostCentersByLocationAndStationCode: '/api/locations/{locationCode}/stations/{stationCode}/cost_centers?limit={limit}&page={page}&sorts={sorts}&search={search}',
                addCostCentersByLocationAndStationCode: '/api/locations/{locationCode}/stations/{stationCode}/cost_centers',
                updateStationsCostCenter: '/api/locations/{locationCode}/stations/{stationCode}/cost_centers/{costCenterName}/?source_system_id={sourceSystemId}',

                // POS
                getPosItem: '/api/pos/posItems/{pos_id}',
                getPosItems: '/api/pos/posItems?limit={limit}&page={page}&sorts={sorts}&search={search}',
                addPosItem: '/api/pos/posItems',
                savePosItem: '/api/pos/posItems/{pos_id}',
                getPosRevenueCategories: '/api/pos/revenue_categories?limit={limit}&page={page}&sorts={sorts}&search={search}',
                addPosRevenueCategory: '/api/pos/revenue_categories',
                updatePosRevenueCategory: '/api/pos/revenue_categories/{revenue_category_code}',
                getPosItemCategories: '/api/pos/item_categories?limit={limit}&page={page}&sorts={sorts}&search={search}',
                addPosItemCategory: '/api/pos/item_categories',
                updatePosItemCategory: '/api/pos/item_categories/{item_category_code}',
                getPosItemClasses: '/api/pos/item_classes?limit={limit}&page={page}&sorts={sorts}&search={search}',
                addPosItemClass: '/api/pos/item_classes',
                updatePosItemClass: '/api/pos/item_classes/{item_class_code}',
                getTypeDetailsForSystemCategoryAndVendor: '/api/pos/system_categories/{system_category_name}/vendors/{vendor_name}/types/{type_name}/items?limit={limit}&page={page}&sorts={sorts}&search={search}',
                addTypeDetailsForSystemCategoryAndVendor: '/api/pos/system_categories/{system_category_name}/vendors/{vendor_name}/types/{type_name}/items',
                getSystemCategories: '/api/pos/system_categories',
                getVendors : '/api/pos/vendors',
                getTypesForVendor : '/api/pos/vendors/{vendor_name}/types',
                getPosTags: '/api/pos/tags',
                getPosUnitsOfMeasure: '/api/pos/units',
                getTypeDetailsForSystemCategoryDefaultsAndVendor: '/api/pos/item_categories/{item_category_code}/defaults',
                updateRevenueCategoryDefaults: '/api/pos/revenue_categories/{revenue_category_code}/defaults/system_categories/{system_category_name}/vendors/{vendor_name}/types/{vendor_category_type_name}',
                updateItemCategoryDefaults: '/api/pos/item_categories/{item_category_code}/defaults/system_categories/{system_category_name}/vendors/{vendor_name}/types/{vendor_category_type_name}',

                // Communication Preferences
                commPreferences:  '/api/users/{userName}/communication_preferences',
                updateCommPreferences:  '/api/users/{userName}/communication_preferences/{communicationPreferencesCode}'
            }
        },
        headers: {
            adams: {
                accept: {
                    v1: 'application/vnd.adams-v1.0+json',
                    v2: 'application/vnd.adams-v2.0+json'
                }
            },
            contentType: {
                name: 'Content-Type',
                json: 'application/json',
                html: 'text/html'
            }
        }
    };

})();

module.exports = urlSpace;