describe("adams", function(){
    
    var $scope, $compile, element1, element2, element3;

    beforeEach(module("adams"));
    beforeEach(module('templates.app'));
    beforeEach(module('common.templates.app'));
    beforeEach(inject(function ($rootScope, _$compile_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;

        element1 = $compile('<a href=""></a>')($scope);
        element2 = $compile('<a href="/get"></a>')($scope);

        element3 = $compile('<div dropdown-menu-hover></div>')($scope);
        $scope.$digest();
    }));

    
    describe("adams",function () {

        it("should have attribute href",function () {
            element1.triggerHandler('click');
            expect(element1.find("href")).toBeDefined();
        });

        it("should call else block",function () {
            expect(element2.find("href")).toBeDefined();
        });

        it("element3 to have been called with dropdownHover function",function () {
            spyOn(element3, 'dropdownHover').and.callThrough();
            element3.dropdownHover();
            expect(element3.dropdownHover).toHaveBeenCalled();
        });
        
    });
});