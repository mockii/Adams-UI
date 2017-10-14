
'use strict';

describe("App Service", function () {
    var $q, $scope, $compile, utils, blockUI, $timeout, element;

    beforeEach(module('adams.utils'));
    beforeEach(module('STGWebUtils'));
    beforeEach(module('adams.common.url'));

    beforeEach(inject(function($rootScope, Utils, _$q_, ADAMS_URL_SPACE, blockUI, $timeout, _$compile_) {
        $scope = $rootScope;
        $q = _$q_;
        blockUI = blockUI;
        utils = Utils;
        $compile = _$compile_;

        element = $compile('<div dropdown-menu-hover></div>')($scope);
        $scope.$digest();
    }));

    it('should call startBlockUi ', function(){
        spyOn(utils, 'startBlockUI').and.callThrough();
        utils.startBlockUI(element, {});
        expect(utils.startBlockUI).toHaveBeenCalledWith(element, {});
    });

    it('should call startBlockUI without properties ', function(){
        spyOn(utils, 'startBlockUI').and.callThrough();
        utils.startBlockUI(element);
        expect(utils.startBlockUI).toHaveBeenCalledWith(element);
    });

    it('should call startBlockUI without element ', function(){
        spyOn(utils, 'startBlockUI').and.callThrough();
        utils.startBlockUI();
        expect(utils.startBlockUI).toHaveBeenCalled();
    });

    it('should call stopBlockUI ', inject(function ($timeout) {
        spyOn(utils, 'stopBlockUI').and.callThrough();
        utils.stopBlockUI(element, 10);
        $timeout.flush(10);
        $timeout.verifyNoPendingTasks();
        // scope.$apply();
        expect(utils.stopBlockUI).toHaveBeenCalledWith(element, 10);
    }));

    it('should call stopBlockUI without delay ', inject(function ($timeout) {
        spyOn(utils, 'stopBlockUI').and.callThrough();
        utils.stopBlockUI(element);
        $timeout.flush(0);
        $timeout.verifyNoPendingTasks();
        expect(utils.stopBlockUI).toHaveBeenCalledWith(element);
    }));

    it('should call stopBlockUI without element ', function(){
        spyOn(utils, 'stopBlockUI').and.callThrough();
        utils.stopBlockUI();
        expect(utils.stopBlockUI).toHaveBeenCalled();
    });

    it('should call initializeSearchFields with grid', function(){
        var grid = {
            columns: [{
                name: 'something',
                filters: [{
                    term: 'someterm'
                }]
            }]
        };
        spyOn(utils, 'initializeSearchFields').and.callThrough();
        utils.initializeSearchFields(grid);
        expect(utils.initializeSearchFields).toHaveBeenCalledWith(grid);
    });

    it('should call initializeSearchFields with grid and without filters', function(){
        var grid = {
            columns: [{
                name: 'something',
                filters: [{
                    term: undefined
                }]
            }]
        };
        spyOn(utils, 'initializeSearchFields').and.callThrough();
        utils.initializeSearchFields(grid);
        expect(utils.initializeSearchFields).toHaveBeenCalledWith(grid);
    });

    it('should call initializeSearchFields without grid', function(){
        spyOn(utils, 'initializeSearchFields').and.callThrough();
        utils.initializeSearchFields();
        expect(utils.initializeSearchFields).toHaveBeenCalled();
    });

    it('should call getGridSorts with sortColumns', function(){
        var sortColumns = [{
           sort: {
               direction: 'asc'
           },
            name: 'something'
        }];
        spyOn(utils, 'getGridSorts').and.callThrough();
        utils.getGridSorts(sortColumns);
        expect(utils.getGridSorts).toHaveBeenCalledWith(sortColumns);
    });

    it('should call getSearchIndex', function(){
        spyOn(utils, 'getSearchIndex').and.callThrough();
        utils.getSearchIndex({}, 0);
        expect(utils.getSearchIndex).toHaveBeenCalledWith({}, 0);
    });

    it('should call checkIfSearchObjectPresent with Search items', function(){
        var property = 'something',
            searchItems = [{
                property: 'something'
            }];
        spyOn(utils, 'checkIfSearchObjectPresent').and.callThrough();
        utils.checkIfSearchObjectPresent(property, searchItems);
        expect(utils.checkIfSearchObjectPresent).toHaveBeenCalledWith(property, searchItems);
    });

    it('should call checkIfSearchObjectPresent with Search items and not equal to search property', function(){
        var property = 'something',
            searchItems = [{
                property: 'nothing'
            }];
        spyOn(utils, 'checkIfSearchObjectPresent').and.callThrough();
        utils.checkIfSearchObjectPresent(property, searchItems);
        expect(utils.checkIfSearchObjectPresent).toHaveBeenCalledWith(property, searchItems);
    });

    it('should call checkIfSearchObjectPresent without Search items', function(){
        var property = 'something',
            searchItems = [];
        spyOn(utils, 'checkIfSearchObjectPresent').and.callThrough();
        utils.checkIfSearchObjectPresent(property, searchItems);
        expect(utils.checkIfSearchObjectPresent).toHaveBeenCalledWith(property, searchItems);
    });

});