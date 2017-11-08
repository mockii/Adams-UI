describe("adams.common.directives.selectPicker", function(){
    
    var $scope, $compile, element, $timeout;

    beforeEach(module("adams.common.directives.selectPicker"));
    beforeEach(module("adams.common.constants"));
    beforeEach(inject(function ($rootScope, _$compile_, STATUS_CONSTANT, _$timeout_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
        $timeout = _$timeout_;

        $scope.constants = [{name:'All' }, {name: 'Active'}, {name: 'Inactive'}];

        element = $compile('<select load-select-picker ng-model="status"' +
            ' ng-options="status.name for status in constants track by status.name"></select>')($scope);


        $scope.$digest();
    }));

    
    describe("select picker",function () {

        it("should add class selectpicker",function () {
            $timeout.flush();
            expect(element.hasClass("selectpicker")).toBe(true);
        });

        it("should not change selection after options are updated",function () {
            $timeout.flush();
            expect(element.hasClass("selectpicker")).toBe(true);

            var dropdownOptions = element[0].options;

            expect(dropdownOptions.length).toBe(4);
            expect(dropdownOptions[element[0].selectedIndex].text).toBe('');

            dropdownOptions[1].selected = true;
            expect(dropdownOptions[element[0].selectedIndex].text).toBe('All');

            $scope.constants.push({name:'Suspended'});
            element.scope().$digest();
            expect(dropdownOptions.length).toBe(5);
            //expect(dropdownOptions[element[0].selectedIndex].text).toBe('All');

        });
        
    });
});