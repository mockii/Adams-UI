describe('UrlSpace', function() {

    var should = require('chai').should(),
        urlSpace = require('../src/url-space');


    it('verify url-space was initialized properly', function(){
        should.exist(urlSpace.urls);
        should.exist(urlSpace.urls.local);
        should.exist(urlSpace.urls.adams);
    });

});