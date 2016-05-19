'use strict';


angular.module('coordinatorentoolControllers').controller("CreateBusinessUnitController", ["$uibModalInstance", "updateMode", "businessUnit",
function($uibModalInstance, updateMode, businessUnit) {
    if (businessUnit != undefined && updateMode == true) {
        this.businessUnit = businessUnit;
    } else {
        this.businessUnit = {
            naam: undefined
        };
    }

    this.updateMode = updateMode;

    this.cancel = () => {
        $uibModalInstance.dismiss();
    };

    this.ok = () => {
        $uibModalInstance.close(this.businessUnit);
    };
}]);
