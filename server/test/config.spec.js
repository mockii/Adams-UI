describe('Config', function() {

    var expect = require('chai').expect,
        should = require('chai').should(),
        Config = require('../src/config');


    after(function(){
        process.env.NODE_ENV = 'test';
    });


    it('verify production config is initialized properly', function(){
        process.env.NODE_ENV = 'production';
        config = new Config();

        should.exist(config.application);
        expect(config.application.name).to.equal('ADAMS');
    });

    it('verify sbx config is initialized properly', function(){
        process.env.NODE_ENV = 'sbx';
        config = new Config();

        should.exist(config.application);
        expect(config.application.name).to.equal('ADAMS');
    });

    it('verify qas config is initialized properly', function(){
        process.env.NODE_ENV = 'qas';
        config = new Config();

        should.exist(config.application);
        expect(config.application.name).to.equal('ADAMS');
    });

    it('verify dev config is initialized properly', function(){
        process.env.NODE_ENV = 'development';
        config = new Config();

        should.exist(config.application);
        expect(config.application.name).to.equal('ADAMS');
    });

    it('verify ci config is initialized properly', function(){
        process.env.NODE_ENV = 'ci';
        config = new Config();

        should.exist(config.application);
        expect(config.application.name).to.equal('ADAMS');
    });

    it('verify default config is initialized properly', function(){
        process.env.NODE_ENV = '';
        config = new Config();

        should.exist(config.application);
        expect(config.application.name).to.equal('ADAMS');
    });

});