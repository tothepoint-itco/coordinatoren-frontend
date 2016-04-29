'use strict';


angular.module('coordinatorentoolControllers').controller("RolController", ["RolResource",'BeheerderResource', "BusinessUnitResource", "$uibModal",
function(Rol, Beheerder, BusinessUnit, $uibModal) {
  Rol.query(
      (success) => {
          this.rollen = success;
          this.aggregatedRollen = this.rollen;

          this.aggregatedRollen.map((rol) => {

              Beheerder.get(
                  {id: rol.beheerderId},
                  (beheerder) => {
                      rol.beheerder = beheerder;
                  }
              );
              BusinessUnit.get(
                  {id: rol.businessUnitId},
                  (businessUnit) => {
                      rol.businessUnit = businessUnit;
                  }
              );

          })
      }
  );

  var aggregateContract = (rol) => {
      Beheerder.get(
          {id: rol.beheerderId},
          (beheerder) => {
              rol.beheerder = beheerder;
          }
      );

      BusinessUnit.get(
          {id: rol.businessUnitId},
          (businessUnit) => {
              rol.businessUnit = businessUnit;
          }
      );
  }

  this.aggregatedRollen = [];

    var createRolModal = {
        templateUrl: "partials/modals/create-rol.html",
        controller: "CreateRolController",
        controllerAs: "crolCtrl",
        keyboard: false
    };

    this.createConfirmModal = (title, body) => {
        return {
            templateUrl: "partials/modals/confirm.html",
            controller: "ConfirmModalController",
            controllerAs: "cmCtrl",
            keyboard: false,
            resolve: {
                title: () => title,
                body: () => body
            }
        }
    }

    this.deleteRol = (rolId) => {
        var index = undefined;
        var rolToDelete = this.rols.filter((rol, i) => {
            if (rol.id == rolId) { index = i}
            return rol.id == rolId;
        });

        $uibModal.open(this.createConfirmModal("Rol verwijderen", "Ben je zeker dat je rol "+rolToDelete[0].voorNaam+" "+rolToDelete[0].familieNaam+" wil verwijderen?")).result.then(
            (success) => {
                Rol.delete(
                    {id: rolToDelete[0].id},
                    (successResult) => {
                        this.rols.splice(index, 1);
                    },
                    (errorResult) => {
                    }
                );
            },
            (error) => {
                console.log("Nee!");
            }
        )
    }

    this.createNewRol = () => {
        $uibModal.open(createRolModal).result.then(
            (rol) => {

                Rol.save(
                    rol,
                    (successResult) => {
                        console.log("Rol was saved! Result is %o", successResult);
                        this.rols.push(successResult);
                    },
                    (errorResult) => {
                        console.log("Saving Rol failed! Result was %o", errorResult);
                    }
                );
            },
            () => {
                console.log("modal closed!");
            }
        );
    };

}]);
