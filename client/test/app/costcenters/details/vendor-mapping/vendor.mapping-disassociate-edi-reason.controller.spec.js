/**
 * Created by ChouhR01 on 1/17/2017.
 */

'use strict';

describe('VendorMappingDisAssociateEdiReasonController', function () {
    var Ctrl,
        mockModalDialogService,
        $rootScope,
        $scope,
        $state,
        adamsConstants,
        $uibModalInstance;

    beforeEach(module('adams.vendor.mapping.disassociate.edi.reason.controller'));
    beforeEach(module('adams.common.constants'));

    beforeEach(inject(function ($controller, $rootScope, ADAMS_CONSTANTS) {

        $rootScope = $rootScope;
        $scope = $rootScope.$new();
        adamsConstants = ADAMS_CONSTANTS;

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
        Ctrl = $controller('VendorMappingDisAssociateEdiReasonController', {
            $scope: $scope,
            $state: $state,
            $uibModalInstance: $uibModalInstance,
            ModalDialogService: mockModalDialogService,
            ADAMS_CONSTANTS: adamsConstants
        });
    }));

    it('should initialize the VendorMappingDisAssociateEdiReasonController properly', function () {
        expect(Ctrl).not.toBeUndefined();
    });

    it('should close the modal with result "true" when cancelled', function () {
        Ctrl.cancel($uibModalInstance.close('true'));
        expect($uibModalInstance.close).toHaveBeenCalledWith('true');
    });
})
