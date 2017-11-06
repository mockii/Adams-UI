(function () {
    angular.module('adams.products.constants', [])
        .constant('MULTIMEDIA_CONSTANTS', {
            AUDIO: 'AUDIO',
            CHILD_NUTRITION_LABEL: 'CHILD_NUTRITION_LABEL',
            CONSUMER_HANDLING_AND_STORAGE: 'CONSUMER_HANDLING_AND_STORAGE',
            DOCUMENT: 'DOCUMENT',
            LOGO: 'LOGO',
            MARKETING_INFORMATION: 'MARKETING_INFORMATION',
            MOBILE_DEVICE_IMAGE: 'MOBILE_DEVICE_IMAGE',
            MSDS_SHEET: 'MSDS_SHEET',
            OTHER_EXTERNAL_INFORMATION: 'OTHER_EXTERNAL_INFORMATION',
            OUT_OF_PACKAGE_IMAGE: 'OUT_OF_PACKAGE_IMAGE',
            PLANOGRAM: 'PLANOGRAM',
            PRODUCT_FORMULATION_STATEMENT: 'PRODUCT_FORMULATION_STATEMENT',
            PRODUCT_IMAGE: 'PRODUCT_IMAGE',
            PRODUCT_LABEL_IMAGE: 'PRODUCT_LABEL_IMAGE',
            PRODUCT_WEBSITE: 'PRODUCT_WEBSITE',
            RECIPE_WEBSITE: 'RECIPE_WEBSITE',
            SAFETY_DATA_SHEET: 'SAFETY_DATA_SHEET',
            VIDEO: 'VIDEO',
            WEBSITE: 'WEBSITE'
        })
        .constant('ALLERGEN_LEVELS', {
            CONTAINS: 'Contains',
            FREE_FROM: 'Free From',
            MAY_CONTAIN: 'May Contain',
            DERIVED_FROM: 'Derived From',
            NOT_DERIVED_FROM: 'Not Derived From',
            NOT_INTENTIONALLY_NOR_INHERENTLY_INCLUDED: 'Not intentionally nor inherently included',
            UNDECLARED: 'Undeclared'
        })
        .constant('BIG_EIGHT_ALLERGENS', {
            AC: 'Crustaceans',
            AE: 'Eggs',
            AF: 'Fish',
            AM: 'Milk',
            AN: 'Nuts',
            AP: 'Peanuts',
            AW: 'Gluten',
            AX: 'Gluten',
            AY: 'Soybeans',
            GK: 'Kamut',
            ML: 'Lactose',
            SA: 'Almond',
            SC: 'Cashew',
            SH: 'Hazelnut',
            SM: 'Macadamia Nut',
            SP: 'Pecan Nut',
            SQ: 'Queenslan Nut',
            SR: 'Brazil Nut',
            ST: 'Pistachio',
            SW: 'Walnut',
            TN: 'Tree Nut',
            UM: 'Molluscs',
            UW: 'Wheat'
        });
})();