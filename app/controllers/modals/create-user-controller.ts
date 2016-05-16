'use strict';


angular.module('coordinatorentoolControllers').controller("CreateUserController", ["$uibModalInstance","BusinessUnitResource",
function($uibModalInstance, BusinessUnit) {
    this.cancel = () => {
        $uibModalInstance.dismiss();
    };
    this.user = {
        user: undefined,
        password: undefined,
        lastPasswordReset: null,
        email: undefined,
        authorities: "USER"
    };
    this.ok = () => {
        $uibModalInstance.close({user: this.user});
    };
}]);
