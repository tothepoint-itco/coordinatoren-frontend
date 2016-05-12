'use strict'

angular.module('coordinatorentoolControllers').controller("CreateAkkoordController",
['$uibModalInstance', "ConsultantResource","OpdrachtResource",
function($uibModalInstance, Consultant, Opdracht){
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
      }
  );
  Opdracht.query(
      (opdrachten) => {
          this.opdrachten = opdrachten;
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


  this.akkoord = {
    projectCode: undefined,
    opdrachtId: undefined,
    consultantId: undefined,
    informeelStartDatum: undefined,
    informeelEindDatum: undefined
  };
  this.ok=() => {
    $uibModalInstance.close(this.akkoord)
  };
}]);
