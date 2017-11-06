'use strict';

describe('POS item details module', function() {
    var $state,
        $rootScope,
        $scope,
        $injector,
        $ocLazyLoad,
        $q,
        pointOfSaleItemDetailsService={},
        addItem = 'additem',
        editItem = 'edititem';

    beforeEach(function() {
        module('common.url');
        module('adams.common.url');
        module('oc.lazyLoad');
        module('ui.router');
        module('adams.point.of.sale.item.details', function ($provide) {
            $provide.value('PointOfSaleItemDetailsService', pointOfSaleItemDetailsService);
        });

        inject(function (_$state_, $templateCache, _$rootScope_, _$injector_, $controller, _$ocLazyLoad_, _$q_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = _$rootScope_.$new();
            $injector = _$injector_;
            $ocLazyLoad = _$ocLazyLoad_;
            $q = _$q_;
            $ocLazyLoad.load({
                name:'pointOfSale',
                files:['css/point-of-sale.css']
            }).then(function(){
                dump("Loaded!");
                done();
            }, function(error){
                dump(error);
            });

            pointOfSaleItemDetailsService.getPosItem = function (posId) {
                var deferred = $q.defer();
                deferred.resolve({});
                deferred.promise.abort = function () {};
                return deferred.promise;
            };

        });
    });

    it('should respond to URL', function () {
        expect($state.href(addItem)).toEqual('#/pointofsale/item/add');
        expect($state.href(editItem)).toEqual('#/pointofsale/item//details');
    });

    describe('add item', function () {

        it('should resolve add item deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {
            $injector.invoke($state.get(addItem).resolve['deps'])
                .then(function (res) {
                    console.log(' *res ', res.data);
                })
                .catch(function (err) {
                    console.log(' *err ', err);
                });
            expect($state.get(addItem).resolve['deps'][0]).toEqual('$ocLazyLoad');
            expect($state.get(addItem).resolve['deps'][1]($ocLazyLoad)).toBeDefined();
        }));

        it('should resolve add item pos id', inject(function($state, $injector) {
            $injector.invoke($state.get(addItem).resolve['pos_item']);
        }));

    });

    describe('edit item', function () {
        it('should resolve edit deps', inject(function($state, $injector, $httpBackend, $ocLazyLoad) {

            $injector.invoke($state.get(editItem).resolve['deps'])
                .then(function (res) {
                    console.log(' *res ', res.data);
                })
                .catch(function (err) {
                    console.log(' *err ', err);
                });
            expect($state.get(editItem).resolve['deps'][0]).toEqual('$ocLazyLoad');
            expect($state.get(editItem).resolve['deps'][1]($ocLazyLoad)).toBeDefined();
        }));

        it('should resolve edit item pos id', inject(function($state, $injector) {
            $injector.invoke($state.get(editItem).resolve['pos_item']);
        }));
    });


});