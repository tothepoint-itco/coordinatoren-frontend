'use strict'

angular.module('coordinatorentoolControllers').controller("CreateBestelbonController",['$uibModalInstance', "updateMode", "bestelbon",
function($uibModalInstance, updateMode, bestelbon){
    if ((bestelbon != null || bestelbon != undefined) && updateMode == true) {
        this.bestelbon = bestelbon;
    } else {
        this.bestelbon = {
            projectCode: undefined,
            startDatum: undefined,
            eindDatum: undefined
        };
    }

    this.updateMode = updateMode;

    this.cancel=() => {
        $uibModalInstance.dismiss();
    };

    this.ok=() => {
        $uibModalInstance.close(this.bestelbon)
    };
}]);
