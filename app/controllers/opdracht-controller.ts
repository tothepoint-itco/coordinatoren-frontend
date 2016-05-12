'use strict',

angular.module('coordinatorentoolControllers').controller('OpdrachtController', ["OpdrachtResource", "$uibModal",
function(Opdracht, $uibModal) {
Opdracht.query(
  (success) => {
    this.opdrachten = success;
  });
  var createOpdrachtModal = {
    templateUrl: "partials/modals/create-opdracht.html",
    controller:"CreateOpdrachtController",
    controllerAs:"copdCtrl",
    keyboard: false
  };
  this.createConfirmModal = (title, body) => {
      return {
        templateUrl: "partials/modals/confirm.html",
        controller:   "ConfirmModalController",
        controllerAs: "cmCtrl",
        keyboard: false,
        resolve: {
          title:() => title,
          body: () => body
        }
      }
    }
    this.deleteOpdracht = (opdrachtId)=> {
      var index = undefined;
      var opdrachtToDelete = this.opdrachten.filter((opdracht, i)=>{
        if(opdracht.id == opdrachtId) {index = i}
        return opdracht.id == opdrachtId;
      });
      $uibModal.open(this.createConfirmModal("Opdracht verwijderen","Ben je zeker dat je opdracht"+ opdrachtToDelete[0].projectCode+ "wilt verwijderen?")).result.then(
        (success) => {
          Opdracht.delete(
            {id: opdrachtToDelete[0].id},
            (successResult) => {
              this.opdrachten.splice(index,1)
            },
            (errorResult) =>{

            }
          );
        },
        (error) => {
          console.log("Opdracht verwijderen werd niet uigevoert!")
        }
      )
    }
    this.createNewOpdracht = () =>{
      $uibModal.open(createOpdrachtModal).result.then(
        (opdracht)=> {
          Opdracht.save(
            opdracht,
            (successResult)=> {
              console.log("Opdracht was saved! Result is %o", successResult);
              this.opdrachten.push(successResult);
            },
            (errorResult) => {
              console.log("Saving Opdracht failed! Result was %o", errorResult);
            }
          );
        },
        ()=>{
          console.log("modal closed!")
        }
      );
    };
}]);
