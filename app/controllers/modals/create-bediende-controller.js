'use strict';


angular.module('coordinatorentoolControllers').controller("CreateBediendeController", ["$uibModalInstance",
function($uibModalInstance) {
    this.cancel = () => {
        $uibModalInstance.dismiss();
    };


    this.bediende = {
        voorNaam: undefined,
        familieNaam: undefined,
        geboorteDatum: undefined
    };

    this.ok = () => {
        $uibModalInstance.close(this.bediende);
    };
}]);
