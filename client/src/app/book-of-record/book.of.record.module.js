/**
 * Created by BrownB11 on 6/19/2017.
 */

(function () {
    'use strict';

    angular.module('adams.book.of.record', ['adams.book.of.record.controller', 'adams.book.of.record.service', 'adams.contact.info.modal.controller'])
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('bookofrecord', {
                    url: "/bookofrecord",
                    templateUrl: "book-of-record/book.of.record.tpl.html",
                    controller: "BookOfRecordController as bookOfRecordController",
                    data: {
                        pageTitle: "Book Of Record"
                    },
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'bookOfRecord',
                                insertBefore: '#ng_load_plugins_after',
                                files: [
                                    'css/bookofrecord.css'
                                ]
                            });
                        }]
                    }
                });
            }
        ]);
})();
