'use strict'

angular.module('coordinatorentoolControllers').controller("CreateBestelbonController",['$uibModalInstance', "updateMode", "bestelbon","AkkoordResource",
function($uibModalInstance, updateMode, bestelbon, Akkoord){
    this.akkoorden = [];
    this.selectedAkkoord = undefined;
    this.selectedAkkoordLabel = undefined;
    if ((bestelbon != null || bestelbon != undefined) && updateMode == true) {
        this.bestelbon = bestelbon;
    } else {
        this.bestelbon = {
            projectCode: undefined,
            startDatum: undefined,
            eindDatum: undefined
        };
    }
    Akkoord.query(
        (akkoorden) => {
            this.akkoorden = akkoorden;
            if (this.updateMode == true && this.bestelbon.akkoordId != undefined) {
                akkoorden.map((akkoord) => {
                    if (this.bestelbon.akkoordId == akkoord.id) {
                        this.selectAkkoord(akkoord);
                    }
                });
            }
        }
    );
    this.selectAkkoord = (akkoord) => {
        if (akkoord != undefined) {
            this.selectedAkkoord = akkoord;
            this.selectedAkkoordLabel = akkoord.projectCode;
            this.bestelbon.akkoordId = akkoord.id;
            console.log(this.selectedAkkoordLabel)
        }
    }

    this.updateMode = updateMode;

    this.cancel=() => {
        $uibModalInstance.dismiss();
    };

    this.ok=() => {
        $uibModalInstance.close(this.bestelbon)
    };
}]);
