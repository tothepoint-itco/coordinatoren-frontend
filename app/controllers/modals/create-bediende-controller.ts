'use strict';


angular.module('coordinatorentoolControllers').controller("CreateBediendeController", ["$uibModalInstance", "updateMode", "bediende",
function($uibModalInstance, updateMode, bediende) {
    if (bediende != undefined && updateMode == true) {
        this.bediende = bediende;
    } else {
        this.bediende = {
            voorNaam: undefined,
            familieNaam: undefined,
            geboorteDatum: undefined,
            telefoonNummer: undefined
        };
    }

    this.updateMode = updateMode;

    this.cancel = () => {
        $uibModalInstance.dismiss();
    };
    this.ok = () => {
        $uibModalInstance.close(this.bediende);
    };
}]);
