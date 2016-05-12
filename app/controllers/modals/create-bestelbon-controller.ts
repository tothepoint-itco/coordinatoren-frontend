'use strict'

angular.module('coordinatorentoolControllers').controller("CreateBestelbonController",['$uibModalInstance',
function($uibModalInstance){
  this.cancel=() => {
    $uibModalInstance.dismiss();
  };
  this.bestelbon = {
    projectCode: undefined,
    startDatum: undefined,
    eindDatum: undefined
  };
  this.ok=() => {
    $uibModalInstance.close(this.bestelbon)
  };
}]);
