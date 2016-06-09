'use strict';


angular.module('coordinatorentoolControllers').controller("AkkoordController",
["AkkoordResource", "ConsultantResource", "OpdrachtResource", "$uibModal", "$scope",
function(Akkoord, Consultant, Opdracht, $uibModal, $scope) {

    $scope.propertyName = 'voorNaam';
    this.sortBy = (propertyName) =>{
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
        //$scope.comparator = comparator;
        console.log(propertyName);
        //this.opdrachten = orderBy(this.opdrachten, propertyName)
    }
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
                akkoord: () => angular.copy(akkoord)
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
        var akkoordToDelete = this.akkoorden.filter((akkoord, i) => {
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
                        this.akkoorden.push(successResult);
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

    this.editAkkoord = (originalAkkoord) => {
        $uibModal.open(this.createAkkoordModal(true, originalAkkoord)).result.then(
            (akkoord) => {
                Akkoord.UPDATE({id: akkoord.id},
                    akkoord,
                    (successResult) => {
                        this.akkoorden.filter((akk, i) => {
                            if (akk.id == originalAkkoord.id) {
                                this.akkoorden[i] = successResult;
                            }
                            return akk.id == originalAkkoord.id;
                        });

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
