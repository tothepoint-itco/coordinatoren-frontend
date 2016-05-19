'use strict'

angular.module('coordinatorentoolControllers').controller("CreateOpdrachtController",['$uibModalInstance', "updateMode", "opdracht",
function($uibModalInstance, updateMode, opdracht){

    if ((opdracht != null || opdracht != undefined) && updateMode == true) {
        this.opdracht = opdracht;
    } else {
        this.opdracht = {
            locatie: undefined,
            tarief: undefined,
            accountManager: undefined,
            strartDatum: undefined,
            klant: undefined,
            deadline: undefined,
            info: undefined
        };
    }

    this.updateMode = updateMode;

    this.cancel=() => {
        $uibModalInstance.dismiss();
    };

    this.ok=() => {
        $uibModalInstance.close(this.opdracht)
    };
}]);
