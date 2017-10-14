/**
 * Created by RegonS01 on 10/18/2016.
 */

'use strict';

describe('ContactInfoService', function(){
    var scope,
        sampleSvcObj,
        $q,
        $httpBackend,
        urlSpace,
        mockHttp,
        promise,
        contactInfoData = '[{"vendor_name_1": "Nancy Gallas","description": "this is a dummy text","telephone_1": "111-222-3333","telephone_2": "222-333-4444","fax": "333-444-5555","email": "don@compass-usa.com","notify_for_openings_closings": "yes"}]';

    beforeEach(module('adams.common.url'));
    beforeEach(module('adams.contact.info.service'));

    beforeEach(inject(function($rootScope, _$httpBackend_, ContactInfoService, _$q_, ADAMS_URL_SPACE){
        scope = $rootScope;
        $httpBackend = _$httpBackend_;
        sampleSvcObj = ContactInfoService;
        $q = _$q_;
        urlSpace  = ADAMS_URL_SPACE;

        promise = {
            abort: jasmine.createSpyObj('promise', ['abort'])
        }
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get Contact Info', function(){
        console.log('should get Contact Info');
        var limit = 25,
            page = 1,
            appName = '',
            roleName = '',
            vendorNumber='123',
            vendorSourceSystemId='21',
            sort='',
            contactSearchInput='',
            url = urlSpace.urls.local.vendorContacts.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId + '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&contactSearchInput=' +
                JSON.stringify(contactSearchInput);

        spyOn(promise, 'abort').and.callThrough();
        contactInfoData = JSON.parse(contactInfoData);
        $httpBackend.expectGET(url).respond(contactInfoData);
        sampleSvcObj.getContactInfoData(limit,page,sort, vendorNumber,vendorSourceSystemId,contactSearchInput).then(function(data) {
            expect(data[0]).toEqual(contactInfoData[0]);
        });
        $httpBackend.flush();
    });

    it('should abort get Contact Info promise', function(){
        console.log('should abort get Contact Info promise');
        var limit = 25,
            page = 1,
            appName = '',
            roleName = '',
            vendorNumber='123',
            vendorSourceSystemId='21',
            sort='',
            contactSearchInput='',
            url = urlSpace.urls.local.vendorContacts.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId +
                '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&contactSearchInput=' + JSON.stringify(contactSearchInput);

        $httpBackend.expectGET(url).respond(contactInfoData);
        sampleSvcObj.getContactInfoData(limit,page,sort, vendorNumber,vendorSourceSystemId,contactSearchInput).abort();
        //expect(sampleSvcObj.getContactInfoData(limit,page,sort, vendorNumber,vendorSourceSystemId,contactSearchInput)).toThrow(new Error());
    });

    it('should throw Contact Info', function(){
        console.log('should throw Contact Info');
        var limit = 25,
            page = 1,
            appName = '',
            roleName = '',
            vendorNumber='123',
            vendorSourceSystemId='21',
            sort='',
            contactSearchInput='',
            url = urlSpace.urls.local.vendorContacts.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId +
                '&limit=' + limit + '&page=' + page + '&sorts=' + sort + '&contactSearchInput=' + JSON.stringify(contactSearchInput);

        spyOn(promise, 'abort').and.callThrough();
        $httpBackend.expectGET(url).respond(400, {});
        sampleSvcObj.getContactInfoData(limit,page,sort, vendorNumber,vendorSourceSystemId,contactSearchInput).then(function(data) {
            expect(data).toEqual([]);
        });
        $httpBackend.flush();
        scope.$digest();
        // expect(sampleSvcObj.getContactInfoData(limit,page,sort, vendorNumber,vendorSourceSystemId,contactSearchInput)).toThrow(new Error());
    });

    it('should delete Contact Info', function(){
        var vendorNumber = "10016000",
            vendorContactId = "1003",
            vendorSourceSystemId = "1001",
            message = "Success",
            url= urlSpace.urls.local.deleteVendorContact.replace('{vendorNumber}', vendorNumber).replace('{vendorContactId}', vendorContactId) + '?vendorSourceSystemId=' + vendorSourceSystemId;
        $httpBackend.expectDELETE(url).respond(message);
        sampleSvcObj.deleteContactInfo(vendorNumber, vendorContactId, vendorSourceSystemId).then(function(response) {
            expect(response).toEqual(message);
        });
        $httpBackend.flush();
    });

    it('should throw error delete by Contact Info', function(){
        var vendorNumber = "10016000",
            vendorContactId = "1003",
            vendorSourceSystemId = "1001",
            message = "Success",
            url= urlSpace.urls.local.deleteVendorContact.replace('{vendorNumber}', vendorNumber).replace('{vendorContactId}', vendorContactId) + '?vendorSourceSystemId=' + vendorSourceSystemId;

        $httpBackend.expectDELETE(url).respond(400, {});

        sampleSvcObj.deleteContactInfo(vendorNumber, vendorContactId, vendorSourceSystemId).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should add Contact Info', function(){
        var vendorContactData = {"vendorContacts":[{"first_name":"asd","last_name":"asd","email":"asdasd@dfdsf.com","fax":"2342342342","source_system_id":"1001","telephone_1":"3423423422","telephone_2":"2342342234","description":"adsasd","notify_for_openings_closings":true,"vendor_number":"10016000"}]},
            vendorNumber = "10016000",
            vendorSourceSystemId = "1001",
            message = "Success",
            url= urlSpace.urls.local.addContactInfo.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId;

        $httpBackend.expectPOST(url).respond(message);
        sampleSvcObj.addContactInfo(vendorNumber, vendorSourceSystemId, vendorContactData).then(function(response) {
            expect(response).toEqual(message);

        });
        $httpBackend.flush();
    });

    it('should throw error add by contact info', function(){
        var vendorContactData = {"vendorContacts":[{"first_name":"asd","last_name":"asd","email":"asdasd@dfdsf.com","fax":"2342342342","source_system_id":"1001","telephone_1":"3423423422","telephone_2":"2342342234","description":"adsasd","notify_for_openings_closings":true,"vendor_number":"10016000"}]},
            vendorNumber = "10016000",
            vendorSourceSystemId = "1001",
            message = "Success",
            url= urlSpace.urls.local.addContactInfo.replace('{vendorNumber}', vendorNumber) + '?vendorSourceSystemId=' + vendorSourceSystemId;

        $httpBackend.expectPOST(url).respond(400, {});

        sampleSvcObj.addContactInfo(vendorNumber, vendorSourceSystemId, vendorContactData).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
    });

    it('should update Contact Info', function(){
        var vendorNumber = "10016000",
            vendorContactId = "1003",
            vendorSourceSystemId = "1001",
            message = "Success",
            url= urlSpace.urls.local.updateContactInfo.replace('{vendorNumber}', vendorNumber).replace('{vendorContactId}', vendorContactId) + '?vendorSourceSystemId=' + vendorSourceSystemId,
            vendorContactData = {"first_name":"test1","last_name":"test2","email":"test@a.com","fax":"2342342342","source_system_id":"1001","telephone_1":"2222222222","telephone_2":"3333333333","description":"string","notify_for_openings_closings":true,"vendor_number":"10016000"};

        $httpBackend.expectPUT(url).respond(message);
        sampleSvcObj.updateContactInfo(vendorNumber, vendorContactId, vendorSourceSystemId, vendorContactData).then(function(response) {
            expect(response).toEqual("Success");
        });
        $httpBackend.flush();
    });

    it('should error update contact Info', function(){
        var vendorNumber = "10016000",
            vendorContactId = "1003",
            vendorSourceSystemId = "1001",
            message = "Success",
            url= urlSpace.urls.local.updateContactInfo.replace('{vendorNumber}', vendorNumber).replace('{vendorContactId}', vendorContactId) + '?vendorSourceSystemId=' + vendorSourceSystemId,
            vendorContactData = {"first_name":"test1","last_name":"test2","email":"test@a.com","fax":"2342342342","source_system_id":"1001","telephone_1":"2222222222","telephone_2":"3333333333","description":"string","notify_for_openings_closings":true,"vendor_number":"10016000"};

        $httpBackend.expectPUT(url).respond(400, {});

        sampleSvcObj.updateContactInfo(vendorNumber, vendorContactId, vendorSourceSystemId, vendorContactData).then(function(response) {
            expect(response).toEqual('error');
        });
        $httpBackend.flush();
    });

    /*describe('Mocked HTTP Requests', function() {

        var $httpBackend;
        var name = 'Josh Bavari';
        var email = 'jbavari@gmail.com';

        beforeEach(inject(function($injector) {
            // Set up the mock http service responses
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('POST', '/ui/api/vendors/api/vendors/10016000/contacts')
                .respond(200, {});
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        it('should have sent a POST request to the checkuser API', function() {
            var result = Auth.checkUser(name, email, 1, '4408064001', null);
            $httpBackend.expectPOST('http://raisemore.dev/api/v1/user/checkuser');
            $httpBackend.flush();
        });

    });*/
});
