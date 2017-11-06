'use strict';

(function () {

    angular.module('adams.common.directives.toolTip', [])
        .directive('toggle', [function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs){
                    if (attrs.toggle === "tooltip"){
                        $(element).tooltip();
                    }
                    if (attrs.toggle === "popover"){
                        $(element).popover();
                    }
                }
            };
        }]);
})();