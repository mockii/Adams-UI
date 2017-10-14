'use strict';

angular.module('adams.vendor.markets', ['common.directives.treeview', 'common.modules.logging'])
    .config(['ivhTreeviewOptionsProvider',
        function(ivhTreeviewOptionsProvider) {
            ivhTreeviewOptionsProvider.set(
                {
                    idAttribute: 'market_name',
                    labelAttribute: 'market_display_name',
                    childrenAttribute: 'children',
                    selectedAttribute: 'selected',
                    defaultSelectedState: false,
                    validate: false,
                    twistieCollapsedTpl: '<span class="fa fa-angle-right"></span>',
                    twistieExpandedTpl: '<span class="fa fa-caret-down"></span>',
                    twistieLeafTpl: ''
                }
            );
        }
    ])

    .controller('MarketHierarchyTreeController', ['$rootScope', '$scope', 'ivhTreeviewMgr', 'ivhTreeviewBfs', 'ivhTreeviewOptions', 'UtilsService', 'MarketHierarchyTreeService', '$log',
        function ($rootScope, $scope, ivhTreeviewMgr, ivhTreeviewBfs, ivhTreeviewOptions, UtilsService, MarketHierarchyTreeService, $log) {
            var hirTreeCtrl = this,
                treeOpts = ivhTreeviewOptions();

            function initialize() {

                //setup default values
                $scope.refId = ($scope.refId) ? $scope.refId : 'treeview-'+Date.now();
                $scope.fetchChildrenEveryTime = $scope.fetchChildrenEveryTime ? UtilsService.convertToBoolean($scope.fetchChildrenEveryTime) : false;
                $scope.enableMultiSelect = $scope.enableMultiSelect ? UtilsService.convertToBoolean($scope.enableMultiSelect) : false;
                $scope.broadcastEmptySelection = $scope.broadcastEmptySelection ? UtilsService.convertToBoolean($scope.broadcastEmptySelection) : false;
                $scope.blockChildrenOnParentSelect = $scope.blockChildrenOnParentSelect ? UtilsService.convertToBoolean($scope.blockChildrenOnParentSelect) : true;

                $scope.disableTreeToggle = $scope.disableTreeToggle ? UtilsService.convertToBoolean($scope.disableTreeToggle) : false;
                if ($scope.disableTreeToggle === true) {
                    $scope.treeviewOptions = {
                        twistieCollapsedTpl: '<span></span>',
                        twistieExpandedTpl: '<span></span>',
                        twistieLeafTpl: '<span></span>',
                        expandToDepth: $scope.expandToDepth
                    };
                }

                //set scope items onto controller
                hirTreeCtrl.refId = $scope.refId;
                hirTreeCtrl.fetchChildrenEveryTime = $scope.fetchChildrenEveryTime;
                hirTreeCtrl.enableMultiSelect = $scope.enableMultiSelect;
                hirTreeCtrl.broadcastEmptySelection = $scope.broadcastEmptySelection;
                hirTreeCtrl.blockChildrenOnParentSelect = $scope.blockChildrenOnParentSelect;
                hirTreeCtrl.disableTreeToggle = $scope.disableTreeToggle;
                hirTreeCtrl.treeviewOptions = $scope.treeviewOptions;
                hirTreeCtrl.expandToDepth = $scope.expandToDepth;

                MarketHierarchyTreeService.getCurrentMarkets().then(
                    function(data){
                        hirTreeCtrl.treeData = data;
                        if(hirTreeCtrl.expandToDepth) {
                            hirTreeCtrl.expand(hirTreeCtrl.treeData[0], hirTreeCtrl.expandToDepth);
                        }
                    },
                    function(error) {
                        //TODO: use logger to log this error.
                        $log.error('Error while retrieving Market Root Data: '+ error);
                    }
                );
            }


            /**
             *
             * @param node
             * @param isExpanded
             * @returns {*}
             */
            hirTreeCtrl.treeviewOnToggle = function(node, isExpanded) {
                if (isExpanded) {
                    return MarketHierarchyTreeService.getChildrenForNode($scope, node).then(
                        function(childMarkets){
                            node[treeOpts.childrenAttribute] = childMarkets;
                        },
                        function(error){
                            $log.error('An error' + error + ' occurred while fetching child markets for ' + node.market_name);
                        });
                }
            };

            /**
             * Recursively Gets children of the parent node to a given depth level.
             *
             * @param node
             * @param depthlevel
             * @returns {*}
             */
            hirTreeCtrl.expand = function(node, depthLevel) {
                if(depthLevel !== 0) {
                   MarketHierarchyTreeService.getChildrenForNode($scope, node).then(
                        function(childMarkets){
                            node[treeOpts.childrenAttribute] = childMarkets;
                            angular.forEach(childMarkets, function (child) {
                                if(depthLevel === 0){
                                    return;
                                }
                                hirTreeCtrl.expand(child, depthLevel);
                            });
                        },
                        function(error){
                            $log.error('An error' + error + ' occurred while fetching child markets for ' + node.market_name);
                        });
                   depthLevel--;
                }
            };


            /**
             *
             * @param node
             * @param isSelected
             * @param tree
             */
            hirTreeCtrl.treeviewSelectionChange = function(node, isSelected, tree) {
                //set selection for the current node
                ivhTreeviewMgr.select(tree, node, treeOpts, isSelected);
                if (isSelected) {
                    ivhTreeviewMgr.validateSelectionChange(tree, node, treeOpts, $scope.enableMultiSelect);
                }

                if ($scope.blockChildrenOnParentSelect === true || $scope.blockChildrenOnParentSelect === "true") {
                    hirTreeCtrl.blockChildrenForSelect(tree, node, isSelected);
                }

                $scope.$emit('hierarchyTreeTeamSelectionChange', $scope.refId, isSelected, node);
            };


            hirTreeCtrl.blockChildrenForSelect = function(tree, node, blocked) {
                //traverse child nodes and block/unblock children as needed
                ivhTreeviewBfs(node, treeOpts, function(n){
                    //check to ensure we are not evaluating the top level node
                    if (n[treeOpts.idAttribute] !== node[treeOpts.idAttribute]) {
                        n.isBlocked=blocked;
                    }
                });
            };


            hirTreeCtrl.getSelectedMarkets = function() {
                var selectedMarkets = [];

                //traverse the entire tree and find all selected nodes
                ivhTreeviewBfs(hirTreeCtrl.treeData, treeOpts, function(node){
                    if (node[treeOpts.selectedAttribute] === true) {
                        selectedMarkets.push(node);
                    }
                });

                return selectedMarkets;
            };

            initialize();
        }])

    .factory('MarketHierarchyTreeService', ['$q', '$http', '$filter', 'ivhTreeviewOptions', 'SERVER_URL_SPACE','ADAMS_URL_SPACE',
        function ($q, $http, $filter, ivhTreeviewOptions, SERVER_URL_SPACE, ADAMS_URL_SPACE) {

        var treeOpts = ivhTreeviewOptions();

        function getCurrentMarkets() {
            var deferred = $q.defer(),
                marketMappingRootURL = ADAMS_URL_SPACE.urls.local.marketMappingRoot;

            $http.get(marketMappingRootURL)
                .then(function(response){
                    var markets = angular.copy(formatMarketDataForHierarchyTree(response.data.data));
                    deferred.resolve(markets);
                }, function(error){
                    deferred.reject('Error finding Markets ' + error);
                });
            return deferred.promise;
        }

        function getChildrenForNode($scope, node) {
            var deferred = $q.defer(),
                fetchChildrenEveryTime = $scope.fetchChildrenEveryTime,
                marketName = node.market_name,
                marketMappingChildrenURL = ADAMS_URL_SPACE.urls.local.marketMappingChildren.replace('{marketName}', marketName);

            //if the node doesn't current have any children the call API to load them
            if (fetchChildrenEveryTime === true || node[treeOpts.childrenAttribute].length === 0) {
                //check to see if custom function was provided for getting child markets
                if ($scope.useCustomGetChildMarketsFunction) {
                    $scope.getChildMarketsFn($scope, node).then(function (customChildren) {
                        deferred.resolve(customChildren);
                    }, function () {
                        deferred.reject('An error occurred getting child markets for market ' + marketName);
                    });
                } else {
                    $http.get(marketMappingChildrenURL).then(function (response) {
                        var childMarkets = formatMarketDataForHierarchyTree(response.data.data);
                        deferred.resolve(childMarkets);
                    }, function () {
                        deferred.reject('An error occurred getting child markets for market ' + marketName);
                    });
                }
            } else {
                //children already exist so I will just return the existing children
                deferred.resolve(node[treeOpts.childrenAttribute]);
            }

            return deferred.promise;
        }

        function formatMarketDataForHierarchyTree(marketsData) {
            var orderedMarkets;
            if (marketsData) {
                for (var i=0; i < marketsData.length; i++) {
                    var market = marketsData[i];
                    market[treeOpts.labelAttribute] = market.market_name + ' - ' + market.market_description;
                    market[treeOpts.childrenAttribute] = [];

                    //sync id
                    if (market.hasOwnProperty('adams_id')) {
                        market[treeOpts.idAttribute] = market.adams_id;
                    }

                    market.leaf = !market.has_children;
                }

                //order markets by market name
                orderedMarkets = $filter('orderBy')(marketsData, 'market_name');
            }

            return orderedMarkets;
        }

        return {
            getCurrentMarkets : getCurrentMarkets,
            getChildrenForNode : getChildrenForNode
        };
    }])

    .directive('marketHierarchyTree', function() {
        return {
            restrict: 'EA',
            scope: {
                refId: "=",
                fetchChildrenEveryTime: "=",
                enableMultiSelect: "=",
                broadcastEmptySelection: "=",
                blockChildrenOnParentSelect: "=",
                disableTreeToggle: "=",
                getChildMarketsFn: "&",
                treeviewOptions: "=",
                expandToDepth: "="
            },
            templateUrl: 'vendors/markets/marketHierarchyTree.tpl.html',
            controller: 'MarketHierarchyTreeController as hirTreeCtrl',
            link: function($scope, $element, $attrs, $ctrl, $transclude) {
                $scope.getChildMarketsFn = $scope.getChildMarketsFn();
                $scope.useCustomGetChildMarketsFunction = $scope.getChildMarketsFn ? true : false;

                if($ctrl) {
                    $ctrl.treeData = $scope.treeData;
                    $scope.$ctrl = $ctrl;
                }
            }
        };
    });
