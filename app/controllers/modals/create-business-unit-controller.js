'use strict';


angular.module('coordinatorentoolControllers').controller("CreateBusinessUnitController", ["$uibModalInstance",
function($uibModalInstance) {
    this.cancel = () => {
        $uibModalInstance.dismiss();
    };


    this.businessUnit = {
        naam: undefined
    };

    this.ok = () => {
        $uibModalInstance.close(this.businessUnit);
    };
}]);
