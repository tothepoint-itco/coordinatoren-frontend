'use strict'

angular.module('coordinatorentoolControllers').controller("CreateBestelbonController",['$uibModalInstance', "updateMode", "bestelbon","AkkoordAggregatedResource","ConsultantResource",
function($uibModalInstance, updateMode, bestelbon, AkkoordAggregated, Consultant){
    this.akkoorden = [];
    this.selectedAkkoord = undefined;
    this.selectedAkkoordLabel = undefined;
    this.akkoord = undefined;
    if ((bestelbon != null || bestelbon != undefined) && updateMode == true) {
        this.bestelbon = bestelbon;
    } else {
        this.bestelbon = {
            akkoordId: undefined,
            startDatum: undefined,
            eindDatum: undefined
        };
    }
    // AkkoordAggregated.query(
    //     (akkoorden) => {
    //         this.akkoorden = akkoorden;
    //         this.akkoorden.map((akkoord) =>{
    //             aggregateConsultant(akkoord);
    //             if(this.updateLode == true && this.bestelbon.akkoordId != undefined && this.bestelbon.akkoordId == akkoord.akkoord.id){
    //                 this.selectAkkoord(akkoord);
    //             }
    //         });
    //     //     if (this.updateMode == true && this.bestelbon.akkoordId != undefined ) {
    //     //         this.akkoorden.map((akkoord) => {
    //     //             if (this.bestelbon.akkoordId == akkoord.akkoord.id) {
    //     //                 this.selectAkkoord(akkoord);
    //     //             }
    //     //         });
    //     //     }else{
    //     //     akkoorden.map((akkoord) =>{ aggregateConsultant(akkoord);})
    //     // }
    // });
    AkkoordAggregated.query(
        (akkoorden) => {
            this.akkoorden = akkoorden;
            akkoorden.map((akkoord) => {
                this.akkoord = akkoord;
                aggregateConsultant(this.akkoord);
                console.log("this.akkoord", this.akkoord);
                if (this.updateMode == true && this.bestelbon.akkoordId != undefined && this.bestelbon.akkoordId == akkoord.akkoord.id) {
                    this.selectAkkoord(akkoord);
                }
            });

        }
    );
    var aggregateConsultant= (akkoord) => {
        Consultant.get(
            {id: akkoord.akkoord.consultantId},
            (consultant) => {
                akkoord.consultant = consultant;
            }
        );
    }
    this.selectAkkoord = (akkoord) => {
        if (akkoord != undefined) {
            console.log(akkoord);
            this.selectedAkkoord = akkoord;
            this.selectedAkkoordLabel = akkoord.opdracht.klant + " ( " + akkoord.akkoord.consultantId+" - "+akkoord.akkoord.bezettingsGraad+ "% @ " + akkoord.opdracht.info +" , "+ akkoord.akkoord.informeelStartDatum+ " - "+akkoord.akkoord.informeelStartDatum+")";
            this.bestelbon.akkoordId = akkoord.akkoord.id;
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
