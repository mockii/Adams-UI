/**
 * Created by ChouhR01 on 1/17/2017.
 */

'use strict';

describe('ContactInfoDeleteController', function () {
    var Ctrl,
        mockModalDialogService,
        $rootScope,
        $scope,
        $uibModalInstance;

    beforeEach(module('adams.contact.info.delete.controller'));

    beforeEach(inject(function ($controller, $rootScope) {

        $rootScope = $rootScope;
        $scope = $rootScope.$new();

        mockModalDialogService = {
            result: {
                then: function (confirmCallback, cancelCallback) {
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }
            },
            close: function (result) {
                this.result.confirmCallBack(result);
            },
            dismiss: function (type) {
                this.result.cancelCallback(type);
            },
            confirm: function (errorMessage) {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            }
        };

        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
        Ctrl = $controller('ContactInfoDeleteController', {
            $scope: $scope,
            $uibModalInstance: $uibModalInstance,
            ModalDialogService: mockModalDialogService
        });
    }));

    it('should initialize the ContactInfoDeleteController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should dismiss the modal with result "dismiss" when dismissed', function () {
        Ctrl.close($uibModalInstance.dismiss('cancel'));
        expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
    });

})
