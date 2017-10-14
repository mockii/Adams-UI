'use strict';
(function () {
    angular.module('adams.contact.info.delete.controller',[]).controller('ContactInfoDeleteController',[ '$scope', '$uibModalInstance',
    function($scope, $uibModalInstance){
        var contactInfoDeleteController = this;
        contactInfoDeleteController.close = function() {
        $uibModalInstance.dismiss('cancel');
    };
    }
    ]);
})();