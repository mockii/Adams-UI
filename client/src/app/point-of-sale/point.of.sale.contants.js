(function () {
    angular.module('adams.point.of.sale.constants', [])
        .constant('SYSTEM_CATEGORY_TYPE_CONSTANTS', {
            REVENUE_CATEGORY: 'R',
            ITEM_CATEGORY: 'I'
        })
        .constant('SYSTEM_CATEGORY_TYPE_NAME_CONSTANTS', {
            REVENUE_CATEGORIES: 'Revenue Categories',
            ITEM_CATEGORY: 'Item Category',
            PRODUCT_CLASSES: 'Product Classes',
            MAJOR_GROUPS: 'Major Groups',
            FAMILY_GROUPS: 'Family Groups'
        })
        .constant('SYSTEM_CATEGORY_NAME_CONSTANTS', {
            DEFAULT_SYSTEM_CATEGORY_NAME: 'Default',
            EUREST_SYSTEM_CATEGORY_NAME: 'Eurest',
            MORRISON_SYSTEM_CATEGORY_NAME: 'Morrison'
        })
        .constant('SYSTEM_CATEGORY_VENDOR_CONSTANTS', {
            INFOGENESIS_VENDOR_NAME: 'Infogenesis',
            SYMPHONY_VENDOR_NAME: 'Symphony'
        });
})();