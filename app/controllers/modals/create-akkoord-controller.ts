'use strict'

angular.module('coordinatorentoolControllers').controller("CreateAkkoordController",
['$uibModalInstance', "updateMode", "akkoord", "ConsultantResource","OpdrachtResource",
function($uibModalInstance, updateMode, akkoord, Consultant, Opdracht){

    if ((akkoord != null || akkoord != undefined) && updateMode == true) {
        this.akkoord = akkoord;
    } else {
        this.akkoord = {
            projectCode: undefined,
            opdrachtId: undefined,
            consultantId: undefined,
            bezettingsGraad: undefined,
            informeelStartDatum: undefined,
            informeelEindDatum: undefined
        };
    }

    this.updateMode = updateMode;

    this.cancel=() => {
        $uibModalInstance.dismiss();
    };
    this.consultants = [];
    this.opdrachten = [];
    this.selectedConsultant = undefined;
    this.selectedOpdracht = undefined;
    this.selectedConsultantLabel = undefined;
    this.selectedOpdrachtLabel = undefined;

    Consultant.query(
        (consultants) => {
            this.consultants = consultants;
            if (this.updateMode == true && this.akkoord.consultantId != undefined) {
                consultants.map((consultant) => {
                    if (this.akkoord.consultantId == consultant.id) {
                        this.selectConsultant(consultant);
                    }
                });
            }
        }
    );
    Opdracht.query(
        (opdrachten) => {
            this.opdrachten = opdrachten;
            if (this.updateMode == true && this.akkoord.opdrachtId != undefined) {
                opdrachten.map((opdracht) => {
                    if (this.akkoord.opdrachtId == opdracht.id) {
                        this.selectOpdracht(opdracht);
                    }
                });
            }
        }
    );

    this.selectConsultant = (consultant) => {
        if (consultant != undefined) {
            this.selectedConsultant = consultant;
            this.selectedConsultantLabel = consultant.voorNaam + " " + consultant.familieNaam;
            this.akkoord.consultantId = consultant.id;
        }
    }

    this.selectOpdracht = (opdracht) => {
        if (opdracht != undefined) {
            this.selectedOpdracht = opdracht;
            this.selectedOpdrachtLabel = opdracht.locatie + " "+ opdracht.klant;
            this.akkoord.opdrachtId = opdracht.id;
        }
    }

    this.ok=() => {
        $uibModalInstance.close(this.akkoord)
    };
}]);
