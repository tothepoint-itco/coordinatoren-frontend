'use strict'

angular.module('coordinatorentoolControllers').controller("CreateOpdrachtController",['$uibModalInstance',
function($uibModalInstance){
  this.cancel=() => {
    $uibModalInstance.dismiss();
  };
  this.opdracht = {
    locatie: undefined,
    tarief: undefined,
    accountManager: undefined,
    strartDatum: undefined,
    klant: undefined,
    deadline: undefined,
    info: undefined
  };
  this.ok=() => {
    $uibModalInstance.close(this.opdracht)
  };
}]);
