'use strict';


angular.module('coordinatorentoolControllers').controller("CreateContractController", ["$uibModalInstance",
function($uibModalInstance) {
    this.cancel = () => {
        $uibModalInstance.dismiss();
    };


    this.contract = {
        bediendeId: undefined,
        businessUnitId: undefined,
        startDatum: undefined,
        eindDatum: undefined
    };

    this.ok = () => {
        $uibModalInstance.close(this.contract);
    };
}]);
