describe("toolTip", function(){
    
    var $scope, $compile, element, element1, $timeout;

    beforeEach(module("adams.common.directives.toolTip"));
    beforeEach(inject(function ($rootScope, _$compile_, _$timeout_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
        $timeout = _$timeout_;

        element = $compile('<a href="" ng-show="allergen.hasMultipleLevels" data-toggle="popover" data-html="true" title="Multiple Allergen Levels" data-content="something" data-trigger="focus">hi</a>')($scope);
        element1 = $compile('<a href="" ng-show="allergen.hasMultipleLevels" data-toggle="tooltip" data-html="true" title="Multiple Allergen Levels" data-content="something" data-trigger="focus">hi</a>')($scope);

        $scope.$digest();
    }));

    
    describe("toolTip",function () {

        it("should have attribute data-toggle",function () {
            expect(element[0]).toBeDefined();
        });
        
    });
});