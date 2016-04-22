'use strict';


angular.module('coordinatorentoolControllers').controller("AkkoordController",
["AkkoordResource", "ConsultantAggregatedResource", "OpdrachtResource", "$uibModal",
function(Akkoord, Consultant, Opdracht, $uibModal) {
    Akkoord.query(
        (success) => {
            this.akkoorden = success;
            this.aggregatedAkkoorden = this.akkoorden;

            this.aggregatedAkkoorden.map((akkoord) => {

                Consultant.get(
                    {id: akkoord.consultantId},
                    (consultant) => {
                        akkoord.consultant = consultant;
                    }
                );

                Opdracht.get(
                    {id: akkoord.opdrachtId},
                    (opdracht) => {
                        akkoord.opdracht = opdracht;
                    }
                );

            })
        }
    );

    var aggregateAkkoord = (akkoord) => {
        Consultant.get(
            {id: akkoord.consultantId},
            (consultant) => {
                akkoord.consultant = consultant;
            }
        );

        Opdracht.get(
            {id: akkoord.opdrachtId},
            (opdracht) => {
                akkoord.opdracht = opdracht;
            }
        );
    }

    this.aggregatedAkkoorden = [];

    var createAkkoordModal = {
        templateUrl: "partials/modals/create-akkoord.html",
        controller: "CreateAkkoordController",
        controllerAs: "cakkCtrl",
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

    this.deleteAkkoord = (akkoordId) => {
        var index = undefined;
        var akkoordToDelete = this.aggregatedAkkoorden.filter((akkoord, i) => {
            if (akkoord.id == akkoordId) { index = i}
            return akkoord.id == akkoordId;
        });

        $uibModal.open(this.createConfirmModal("Akkoord verwijderen", "Ben je zeker dat je het akkoord tussen "+akkoordToDelete[0].consultant.voorNaam+" "+akkoordToDelete[0].consultant.familieNaam+" en "+akkoordToDelete[0].opdracht.locatie+" wil verwijderen?")).result.then(
            (success) => {
                Akkoord.delete(
                    {id: akkoordToDelete[0].id},
                    (successResult) => {
                        this.akkoorden.splice(index, 1);
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

    this.createNewAkkoord = () => {
        $uibModal.open(createAkkoordModal).result.then(
            (akkoord) => {
              console.log("Akkoord voor saving: %o", akkoord);
                Akkoord.save(
                    akkoord,
                    (successResult) => {
                        console.log("Akkoord was saved! Result is %o", successResult);

                        aggregateAkkoord(successResult);
                        this.aggregatedAkkoorden.push(successResult);
                    },
                    (errorResult) => {
                        console.log("Saving akkoord failed! Result was %o", errorResult);
                    }
                );
            },
            () => {
                console.log("modal closed!");
            }
        );
    };

}]);
