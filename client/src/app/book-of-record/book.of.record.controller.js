/**
 * Created by BrownB11 on 6/19/2017.
 */
(function () {
    'use strict';

    angular.module('adams.book.of.record.controller', [])
        .controller('BookOfRecordController', ['$rootScope', '$scope', 'BookOfRecordService', 'ContactInfoService', '$uibModal', '$state',
                        '$timeout', '$sce', '$log', 'StgStatesService', '$window', 'CompassToastr', 'ModalDialogService',
            function ($rootScope, $scope, BookOfRecordService, ContactInfoService, $uibModal, $state, $timeout, $sce, $log, StgStatesService, $window, CompassToastr, ModalDialogService) {
                var bookOfRecordController = this;


                function initialize() {
                    bookOfRecordController.gridOptions = defineBookOfRecordGridOptions();
                }

                bookOfRecordController.getGridData = function (pageSize, pageNumber, sort, searchInput) {
                    return BookOfRecordService.getAllBookOfRecordDetails(pageSize, pageNumber, searchInput, sort);
                };

                $scope.$on('uiGridLoadDetails', function ($event, gridOptions, gridApi) {
                    // emitted gridOptions and gridApi from Directive controller
                    gridApi.grid.appScope.emailBORVendorContacts = bookOfRecordController.emailBORVendorContacts;
                    gridApi.grid.appScope.showBORViewContactsSearchData = bookOfRecordController.showBORViewContactsSearchData;
                    gridApi.grid.appScope.navigateToVendorDetail = bookOfRecordController.navigateToVendorDetail;
                    gridApi.grid.appScope.navigateToCostCenterDetail = bookOfRecordController.navigateToCostCenterDetail;
                });

                bookOfRecordController.emailBORVendorContacts = function (searchData) {
                    bookOfRecordController.vendorNumber = searchData.vendor_number;
                    bookOfRecordController.vendorName = searchData.vendor_name_1;
                    bookOfRecordController.vendorSourceSystemId = searchData.vendor_source_system_id;
                    bookOfRecordController.emailVendorContacts();
                };

                bookOfRecordController.showBORViewContactsSearchData = function (searchData) {
                    bookOfRecordController.vendorNumber = searchData.vendor_number;
                    bookOfRecordController.vendorSourceSystemId = searchData.vendor_source_system_id;
                    bookOfRecordController.openViewContactInfo();
                };

                bookOfRecordController.openMassVendorContactModal = function() {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'vendors/mass-vendor-contact/mass-vendor-contact-modal.tpl.html',
                        controller: 'MassVendorContactModalController as massVendorContactModalController',
                        size: 'lg',
                        backdrop: 'static',
                        windowClass: 'mass-vendor-contact-modal'
                    });

                    modalInstance.result.then(function (result) {
                        $window.location.href = "mailto:"+ result.selectedContacts.join(';');
                    });
                };

                bookOfRecordController.emailVendorContacts = function() {

                    var pageSize = '',
                        pageNumber = '',
                        sort = '',
                        searchInput = {};

                    ContactInfoService.getContactInfoData(pageSize, pageNumber, sort, bookOfRecordController.vendorNumber, bookOfRecordController.vendorSourceSystemId, searchInput)
                        .then(function(response) {
                            var emailIds = BookOfRecordService.getEmailIdsOfVendorContacts(response.data);

                            if (emailIds.length > 0) {
                                $window.location.href = "mailto:"+ emailIds.join(';');
                            }else{
                                ModalDialogService.alert({
                                    bodyHTML: 'No contacts found to notify ' + bookOfRecordController.vendorName,
                                    title: 'No contacts found',
                                    size: 'sm'
                                });
                            }

                        }, function(error){
                            CompassToastr.error('There was an error in getting vendor contact details. Please try again later!');
                        });
                };

                bookOfRecordController.openViewContactInfo = function() {
                    $uibModal.open({
                        templateUrl: 'book-of-record/contact-info-modal.tpl.html',
                        controller: 'ContactInfoModalController as contactInfoModalController',
                        size: 'lg',
                        backdrop: 'static',
                        resolve: {
                            vendorData: {
                                vendorNumber:  bookOfRecordController.vendorNumber,
                                vendorSourceSystemId: bookOfRecordController.vendorSourceSystemId
                            }
                        }
                    });
                };

                bookOfRecordController.navigateToVendorDetail = function(vendorSearchData) {
                    StgStatesService.goToState('vendordetails', {
                        vendor_number: vendorSearchData.vendor_number,
                        vendor_source_system_id: vendorSearchData.vendor_source_system_id});
                };

                bookOfRecordController.navigateToCostCenterDetail = function(costCenterSearchData) {
                    StgStatesService.goToState('costcenterdetails', {
                        costCenter_number: costCenterSearchData.cost_center_name,
                        costCenter_source_system_id: costCenterSearchData.cost_center_source_system_id
                    });
                };



                /** PRIVATE FUNCTIONS **/
                function defineBookOfRecordGridOptions() {
                    return {
                        paginationPageSizes: [25, 50, 75],
                        paginationPageSize: 25, // pagination out of box
                        virtualizationThreshold: 25,
                        useExternalPagination: true,
                        useExternalFiltering: true,
                        enableFiltering: true, //step1 to enable all grid columns filtering
                        enableRowSelection: true,
                        enableRowHeaderSelection: false,
                        multiSelect: false,
                        modifierKeysToMultiSelect: false,
                        noUnselect: true,
                        showColumnFooter: false,
                        treeRowHeaderAlwaysVisible: false,
                        enableGridMenu: true, //true will display grid menu on top-right
                        enableSorting: true,
                        columnDefs: [
                            {
                                field: 'name',
                                headerCellTemplate: '<div class="ui-grid-cell-contents">Email<br/> Contacts </div>',
                                cellTemplate:   '<div><i class="fa fa-files-o" ng-click="grid.appScope.emailBORVendorContacts(row.entity)"></i></div>',
                                enableFiltering: false,
                                enableSorting: false,
                                enableColumnMenu: false,
                                enableHiding: false,
                                width: 90,
                                cellClass: "view-cell",
                                pinnedLeft: true
                            },
                            {
                                field: 'name',
                                headerCellTemplate: '<div class="ui-grid-cell-contents">View<br/> Contacts</div>',
                                cellTemplate: '<div><i class="fa fa-folder-open-o" ng-click="grid.appScope.showBORViewContactsSearchData(row.entity)"></i></div>',
                                enableFiltering: false,
                                enableSorting: false,
                                enableColumnMenu: false,
                                enableHiding: false,
                                width: 90,
                                cellClass: "view-cell",
                                pinnedLeft: true
                            },
                            {
                                field: 'cost_center_name',
                                displayName: "Cost Center Number",
                                width: 175,
                                filter: {
                                    placeholder: ''
                                },
                                cellClass: 'hyperlink-cell',
                                cellTemplate: '<a href="#" ng-click="grid.appScope.navigateToCostCenterDetail(row.entity)">{{row.entity.cost_center_name}}</a>'
                            },
                            {
                                field: 'cost_center_source_system_id',
                                visible: false,
                                width: 160,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'cost_center_description',
                                displayName: "Cost Center Description",
                                width: 175,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'market_area',
                                displayName: "Market Area",
                                width: 175,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'market_state',
                                displayName: "State",
                                width: 175,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'market_zone',
                                displayName: "Zone",
                                width: 175,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'model_market',
                                displayName: "Model Market ",
                                width: 175,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'sub_metro_market',
                                displayName: "Sub Metro Market",
                                width: 175,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'model_market_classification',
                                displayName: "Model Market Category",
                                width: 175,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'vendor_number',
                                displayName: "Vendor Number",
                                width: 125,
                                filter: {
                                    placeholder: ''
                                },
                                cellClass: 'hyperlink-cell',
                                cellTemplate: '<a href="#" ng-click="grid.appScope.navigateToVendorDetail(row.entity)">{{row.entity.vendor_number}}</a>'
                            },
                            {
                                field: 'vendor_source_system_id',
                                visible: false,
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'vendor_name_1',
                                displayName: "Vendor Name 1",
                                width: 200,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'vendor_name_2',
                                displayName: "Vendor Name 2",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'vendor_name_3',
                                displayName: "Vendor Name 3",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'comment',
                                displayName: "Comments",
                                width: 150,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'category_code',
                                displayName: "AP Category Code",
                                width: 140,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'category_description',
                                displayName: "AP Category Description",
                                width: 180,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'diversity_code',
                                displayName: "MBE",
                                width: 75,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'address',
                                headerCellTemplate: '<div ng-class="{ \'sortable\': sortable }">' +
                                                    '<div class="ui-grid-vertical-bar">&nbsp;</div>' +
                                                    '<div class="ui-grid-cell-contents" col-index="renderIndex" title="Contracted &quot;remit to&quot; address,\n (not actual local address)."><span>Payment Address <i class="fa fa-info-circle"></i></span><span ui-grid-visible="col.sort.direction" ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }">&nbsp;</span></div>' +
                                                    '<div class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false" class="ui-grid-column-menu-button" ng-click="toggleMenu($event)"><i class="ui-grid-icon-angle-down">&nbsp;</i></div><div ng-if="filterable" class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><input type="text" class="ui-grid-filter-input" ng-model="colFilter.term" ng-click="$event.stopPropagation()" ng-attr-placeholder="{{colFilter.placeholder || \'\'}}" />' +
                                                    '<div class="ui-grid-filter-button" ng-click="colFilter.term = null"><i class="ui-grid-icon-cancel" ng-show="!!colFilter.term">&nbsp;</i> <!-- use !! because angular interprets \'f\' as false --></div>' +
                                                    '</div>' +
                                                    '</div>',
                                width: 225,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'city',
                                displayName: "Payment City",
                                width: 125,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'state',
                                displayName: "Payment State",
                                width: 125,
                                filter: {
                                    placeholder: ''
                                }
                            },
                            {
                                field: 'zipcode',
                                displayName: "Payment Zip",
                                width: 125,
                                filter: {
                                    placeholder: ''
                                }
                            }
                        ]
                    };
                }


                initialize();
            }]);
})();