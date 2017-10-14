(function () {
    angular.module('adams.utils', [])
        .factory('Utils', ['blockUI', '$timeout', function(blockUI, $timeout) {
            var appUtils = {};

            /*
            *  @property
            *
            *  Default property for delay on blockUI set to 0ms
            * */
            appUtils.BLOCKUI_DEFAULT_DELAY = 0;

            /*
            * blockUI - Blocks the UI for the given element with the defined properties
            *
            * @param
            *
            * element - is the element to block
            * properties - custom properties (a object) to start the blockUI.
            *
            * */
            appUtils.startBlockUI = function (element, properties) {
                if(!element) {
                    return;
                }
                properties = properties || {};
                blockUI.instances.get(element).start(properties);
            };

            /*
             * unBlockUI - UnBlocks the UI for the given element
             *
             * @param
             *
             * element - is the element to block
             * delay - a given delay to unBlockUI.
             *
             * */

            appUtils.stopBlockUI = function (element, delay) {
                if(!element) {
                    return;
                }
                delay = delay || appUtils.BLOCKUI_DEFAULT_DELAY;
                $timeout(function(){
                    blockUI.instances.get(element).stop();
                }, delay);
            };

            /*
            * @initializeSearchFields
            *
            * Setting the Search fields of a given grid.
            *
            * @param
            *
            * grid - The grid that needs to be passed in.
            *
            * @return
            *
            * searchParams - Returns the search input from of the given grid.
            *
            * */
            appUtils.initializeSearchFields = function (grid) {
                var searchParams = {};
                if (undefined !== grid && undefined !== grid.columns) {
                    var gridColumnsLength = grid.columns.length;
                    for (var i = 0; i < gridColumnsLength; i++) {
                        if (undefined !== grid.columns[i].filters[0].term && null !== grid.columns[i].filters[0].term) {
                            searchParams[grid.columns[i].name] = grid.columns[i].filters[0].term;
                        }
                    }
                }
                return searchParams;
            };

            /*
            * @gridSorts
            *
            * A array of sort properties for the given sortColumns.
            *
            * @param
            *
            * sortColumns - The grid's sortColumns that needs to be passed in.
            *
            * @return
            *
            * gridSorts - Returns the sorts object, which is an array of sortColumns of a given grid.
            *
            * */
            appUtils.getGridSorts = function (sortColumns) {
                var gridSorts = {'sorts': []};
                for (var j = 0; j < sortColumns.length; j++) {
                    gridSorts.sorts.push({
                        direction: sortColumns[j].sort.direction,
                        property: sortColumns[j].name
                    });
                }
                return JSON.stringify(gridSorts);
            };

            appUtils.getSearchIndex = function(obj, index){
                return obj.property === this;
            };

            appUtils.checkIfSearchObjectPresent = function(property, searchItems) {

                var isObjectPresent = false;
                if(searchItems && searchItems.length > 0){
                    for (var i = 0; i < searchItems.length; i++) {
                        if(property === searchItems[i].property){
                            isObjectPresent = true;
                            break;
                        }
                    }
                }
                return isObjectPresent;
            };

            return appUtils;
        }]);

})();
