var mockData = (function() {

    return {

        adams: {
            constants: {
                applicationName: 'Application1',
                costCenterName: '15657',
                costCenterSourceSystemId: '1001',
                gtin: '1234567890',
                locationCode: 'L1234567',
                marketName: 'MARKET1',
                personnelNumber: '12345678',
                roleName: 'Role1',
                stationCode: 'S123456',
                teamName: '15657',
                teamSourceSystemId: '1001',
                username: 'USER1',
                vendorNumber: '123456',
                vendorSourceSystemId: '1001',
                vendorContactId: 1
            },
            api: {
                genericSuccess: {"http_status": 200},
                genericFailure: {"http_status": 500},

                vendorApiData: {
                    "metadata":{"version":"1.0","status":"OK","http_status_code":"200","result_count": 3},
                    "data":[
                        {},
                        {},
                        {}
                    ],
                    "error": null}
            }
        },

        stgAuth: {
            getTokenFromHeader: function(){return 'TGT-123-abcdefg-localhost';}
        }
    };

})();

module.exports = mockData;