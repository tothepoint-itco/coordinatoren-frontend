
'use strict';


angular.module('coordinatorentoolControllers').controller("BeheerderController", ["BeheerderResource", "RolResource","BusinessUnitResource", "$uibModal",
function(Beheerder, Rol, BusinessUnit, $uibModal) {
  Beheerder.query(
      (success) => {
          this.beheerders = success;
      }
  );
    var createBeheerderModal = {
        templateUrl: "partials/modals/create-beheerder.html",
        controller: "CreateBeheerderController",
        controllerAs: "cbehCtrl",
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

    this.deleteBeheerder = (beheerderId) => {
        var index = undefined;
        var beheerderToDelete = this.beheerders.filter((beheerder, i) => {
            if (beheerder.id == beheerderId) { index = i}
            return beheerder.id == beheerderId;
        });

        $uibModal.open(this.createConfirmModal("Beheerder verwijderen", "Ben je zeker dat je beheerder "+beheerderToDelete[0].voorNaam+" "+beheerderToDelete[0].familieNaam+" wil verwijderen?")).result.then(
            (success) => {
                Beheerder.delete(
                    {id: beheerderToDelete[0].id},
                    (successResult) => {
                        this.beheerders.splice(index, 1);
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

    this.createNewBeheerder = () => {
        $uibModal.open(createBeheerderModal).result.then(
            (beheerder) => {

                Beheerder.save(
                    beheerder,
                    (successResult) => {
                        console.log("Beheerder was saved! Result is %o", successResult);
                        this.beheerders.push(successResult);
                    },
                    (errorResult) => {
                        console.log("Saving Beheerder failed! Result was %o", errorResult);
                    }
                );
            },
            () => {
                console.log("modal closed!");
            }
        );
    };

}]);
