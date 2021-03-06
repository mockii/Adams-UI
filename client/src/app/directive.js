'use strict';

/***
 Global Directives
 ***/

(function () {

    // Handle global LINK click
    angular.module('adams')
        .directive('a', function() {
            return {
                restrict: 'E',
                link: function(scope, elem, attrs) {
                    if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                        elem.on('click', function(e) {
                            // prevent link click for above criteria
                            e.preventDefault();
                        });
                    }
                }
            };
    });

    // Handle Dropdown Hover Plugin Integration
    angular.module('adams')
        .directive('dropdownMenuHover', function () {
            return {
                link: function (scope, elem) {
                    elem.dropdownHover();
                }
            };
    });


})();
