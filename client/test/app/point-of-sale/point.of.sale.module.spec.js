'use strict';

describe('adams.point.of.sale', function() {
    var $state,
        $rootScope,
        $scope,
        $injector,
        $ocLazyLoad,
        basestate = 'pointOfSale',
        itemsearch = 'pointOfSale.itemSearch',
        revenuecategories = 'pointOfSale.revenueCategories',
        itemcategories = 'pointOfSale.itemCategories',
        itemclasses = 'pointOfSale.itemClasses',
        systemcategories = 'pointOfSale.systemCategories',
        systemcategorydefault = 'pointOfSale.systemCategoryDefaults';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.point.of.sale');


        inject(function (_$state_, $templateCache, _$rootScope_, _$injector_, $controller, _$ocLazyLoad_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $injector = _$injector_;
            $ocLazyLoad = _$ocLazyLoad_;
            $ocLazyLoad.load({
                name:'pointOfSale',
                files:['css/point-of-sale.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });

        });
    });

    it('should respond to URL', function () {
        expect($state.href(basestate)).toEqual('#/pointofsale');
        expect($state.href(itemsearch)).toEqual('#/pointofsale/item/search');
        expect($state.href(revenuecategories)).toEqual('#/pointofsale/revenuecategories');
        expect($state.href(itemcategories)).toEqual('#/pointofsale/itemcategories');
        expect($state.href(itemclasses)).toEqual('#/pointofsale/itemclasses');
        expect($state.href(systemcategories)).toEqual('#/pointofsale/systemcategories');
        expect($state.href(systemcategorydefault)).toEqual('#/pointofsale/systemcategorydefaults');
    });

    it('should resolve pos base deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get(basestate).resolve['deps'])
            .then(function (res) {
                console.log(' *res ', res.data);
            })
            .catch(function (err) {
                console.log(' *err ', err);
            });
        expect($state.get(basestate).resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get(basestate).resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('should resolve pos item search deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get(itemsearch).resolve['deps'])
            .then(function (res) {
                console.log(' *res ', res.data);
            })
            .catch(function (err) {
                console.log(' *err ', err);
            });
        expect($state.get(itemsearch).resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get(itemsearch).resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('should resolve pos revenue categories deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get(revenuecategories).resolve['deps'])
            .then(function (res) {
                console.log(' *res ', res.data);
            })
            .catch(function (err) {
                console.log(' *err ', err);
            });
        expect($state.get(revenuecategories).resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get(revenuecategories).resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('should resolve pos item categories deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get(itemcategories).resolve['deps'])
            .then(function (res) {
                console.log(' *res ', res.data);
            })
            .catch(function (err) {
                console.log(' *err ', err);
            });
        expect($state.get(itemcategories).resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get(itemcategories).resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('should resolve pos item classes deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get(itemclasses).resolve['deps'])
            .then(function (res) {
                console.log(' *res ', res.data);
            })
            .catch(function (err) {
                console.log(' *err ', err);
            });
        expect($state.get(itemclasses).resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get(itemclasses).resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('should resolve pos system categories deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get(systemcategories).resolve['deps'])
            .then(function (res) {
                console.log(' *res ', res.data);
            })
            .catch(function (err) {
                console.log(' *err ', err);
            });
        expect($state.get(systemcategories).resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get(systemcategories).resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));

    it('should resolve pos system category default deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

        $injector.invoke($state.get(systemcategorydefault).resolve['deps'])
            .then(function (res) {
                console.log(' *res ', res.data);
            })
            .catch(function (err) {
                console.log(' *err ', err);
            });
        expect($state.get(systemcategorydefault).resolve['deps'][0]).toEqual('$ocLazyLoad');
        expect($state.get(systemcategorydefault).resolve['deps'][1]($ocLazyLoad)).toBeDefined();
    }));
});