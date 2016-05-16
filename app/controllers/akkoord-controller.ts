'use strict';


angular.module('coordinatorentoolControllers').controller("AkkoordController",
["AkkoordResource", "ConsultantResource", "OpdrachtResource", "$uibModal",
function(Akkoord, Consultant, Opdracht, $uibModal) {
    Akkoord.query(
        (success) => {
            this.akkoorden = success;

            this.akkoorden.map((akkoord) => {
                aggregateAkkoord(akkoord);

            });
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

    this.createAkkoordModal = (updateMode, akkoord) => {
        return {
            templateUrl: "partials/modals/create-akkoord.html",
            controller: "CreateAkkoordController",
            controllerAs: "cakkCtrl",
            keyboard: false,
            resolve: {
                updateMode: () => updateMode,
                akkoord: () => akkoord
            }
        }
    }


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
        $uibModal.open(this.createAkkoordModal(false, null)).result.then(
            (akkoord) => {
                Akkoord.save(
                    akkoord,
                    (successResult) => {
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

    this.editAkkoord = (akkoord) => {
        $uibModal.open(this.createAkkoordModal(true, akkoord)).result.then(
            (akkoord) => {
                Akkoord.UPDATE({id: akkoord.id},
                    akkoord,
                    (successResult) => {
                        aggregateAkkoord(successResult);
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
