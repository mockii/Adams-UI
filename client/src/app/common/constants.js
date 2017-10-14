'use strict';

angular.module('adams.common.constants', [])
    .constant('ADAMS_CONSTANTS', {
        APPLICATION_NAME: 'ADAMS',
        ADAMS_LOGO: 'images/adams-logo.png',
        TIME_TRACKING_SYSTEM_MYSTAFF: 'MySTAFF',
        MYSTAFF_SOURCE_SYSTEM_ID: 1001,
        USER_ADMIN_GRID_PAGE_NO: '1',
        USER_ADMIN_GRID_LIMIT: '25',
        JOBS_GRID_PAGE_NO: '1', 
        JOBS_GRID_LIMIT: '10',
        COST_CENTER_GRID_PAGE_NO: '1',
        COST_CENTER_GRID_LIMIT: '10',
        MODAL_ACTION_ADD: 'ADD',
        UI_GRID_PAGE_NO: '1',
        UI_GRID_LIMIT: '25',
        SEC_APPLICATION_COUNT: '100',
        PAGE_NO: '1',
        TEMP_ASSOCIATE_RESOURCES: ['All Resources', 'Engaged Resources', 'Available Resources']
    });