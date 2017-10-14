describe('Constants', function() {

    var should = require('chai').should(),
        constants = require('../src/constants');


    it('verify constants were initialized properly', function(){
        should.exist(constants.httpStatusCode);
    });

});