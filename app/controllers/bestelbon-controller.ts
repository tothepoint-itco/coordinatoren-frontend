'use strict',

angular.module('coordinatorentoolControllers').controller('BestelbonController', ["BestelbonResource", "$uibModal",
function(Bestelbon, $uibModal) {
Bestelbon.query(
  (success) => {
    this.bestelbonnen = success;
  });
  var createBestelBonModal = {
    templateUrl: "partials/modals/create-bestelbon.html",
    controller:"CreateBestelbonController",
    controllerAs:"cbonCtrl",
    keyboard: false
  };
  var editBestelBonModal = {
    templateUrl: "partials/modals/edit-bestelbon.html",
    controller:"CreateBestelbonController",
    controllerAs:"cbonCtrl",
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
    this.deletebestelBon = (bestelbonId)=> {
      var index = undefined;
      var bestelbonToDelete = this.bestelbonnen.filter((bestelbon, i)=>{
        if(bestelbon.id == bestelbonId) {index = i}
        return bestelbon.id == bestelbonId;
      });
      $uibModal.open(this.createConfirmModal("Bestelbon verwijderen","Ben je zeker dat je bestelbon"+ bestelbonToDelete[0].projectCode+ "wilt verwijderen?")).result.then(
        (success) => {
          Bestelbon.delete(
            {id: bestelbonToDelete[0].id},
            (successResult) => {
              this.bestelbonnen.splice(index,1)
            },
            (errorResult) =>{

            }
          );
        },
        (error) => {
          console.log("Bestelbon verwijderen werd niet uigevoert!")
        }
      )
    }
    this.createNewBestelbon = () =>{
      $uibModal.open(createBestelBonModal).result.then(
        (bestelbon)=> {
          Bestelbon.save(
            bestelbon,
            (successResult)=> {
              console.log("Bestelbon was saved! Result is %o", successResult);
              this.bestelbonnen.push(successResult);
            },
            (errorResult) => {
              console.log("Saving Bestelbon failed! Result was %o", errorResult);
            }
          );
        },
        ()=>{
          console.log("modal closed!")
        }
      );
    };
    this.editBestelbon = (bestelbonId) =>{
        var index = undefined;
        var bestelbonToEdit = this.bestelbonnen.filter((bestelbon, i)=>{
          if(bestelbon.id == bestelbonId) {index = i}
          return bestelbon.id == bestelbonId;
        });
      $uibModal.open(editBestelBonModal).result.then(
        (bestelbon)=> {
          Bestelbon.UPDATE({id: bestelbonId},
            bestelbon,
            (successResult)=> {
              console.log("Bestelbon was saved! Result is %o", successResult);
              this.bestelbonnen.splice(index,1)
              this.bestelbonnen.push(successResult);
            },
            (errorResult) => {
              console.log("Saving Bestelbon failed! Result was %o", errorResult);
            }
          );
        },
        ()=>{
          console.log("modal closed!")
        }
      );
    };
}]);
