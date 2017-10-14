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
        .constant('MAPPED_ALLERGEN_CODES', {
            AC: 'Shellfish - Crustacean',
            AE: 'Eggs',
            AF: 'Fish',
            AM: 'Milk',
            AN: 'Tree Nuts',
            AP: 'Peanuts',
            AS: 'Sesame seeds',
            AU: 'Sulphites',
            AW: 'Gluten',
            AY: 'Soybeans',
            BC: 'Celery',
            BM: 'Mustard',
            NC: 'Cocoa',
            NK: 'Coriander',
            NL: 'Lupine',
            NM: 'Corn',
            NP: 'Pod fruits',
            NR: 'Rye',
            NW: 'Carrot',
            UM: 'Shellfish - Crustacean',
            UW: 'Wheat'
        })
        .constant('OTHER_ALLERGENS', {
            AS: 'Sesame seeds',
            AU: 'Sulphites',
            AW: 'Gluten',
            BC: 'Celery',
            BM: 'Mustard',
            NC: 'Cocoa',
            NK: 'Coriander',
            NL: 'Lupine',
            NM: 'Corn',
            NP: 'Pod fruits',
            NR: 'Rye',
            NW: 'Carrot'
        })
        .constant('BIG_EIGHT_ALLERGENS', {
            AE: 'Eggs',
            AF: 'Fish',
            AM: 'Milk',
            AP: 'Peanuts',
            UM: 'Shellfish - Crustacean',
            AY: 'Soybeans',
            AN: 'Tree Nuts',
            UW: 'Wheat'
        })
        .constant('UNMAPPED_ALLERGEN_CODES', ['AA','AD','AH','AI','AL','AX','BA','BB','BE','BI','BR','BS','CA','CL','CN','CO','CT','DA','EG','EP','EV','FA','GB','GE','GK','GL','GO','GS','HC','HP','HX','HY','MH','ML','MO','NE','ON','PS','SA','SC','SH','SM','SO','SP','SQ','SR','ST','SW','TN','UN','X99']);
})();