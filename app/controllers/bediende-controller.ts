'use strict';


angular.module('coordinatorentoolControllers').controller("BediendeController", ["BediendeResource", "$uibModal", "ContractResource",
function(Bediende, $uibModal, Contract) {
    Bediende.query(
        (success) => {
            console.log("Bediende query %o", success);
            this.bediendes = success;
        }
    );

    var createBediendeModal = {
        templateUrl: "partials/modals/create-bediende.html",
        controller: "CreateBediendeController",
        controllerAs: "cbedCtrl",
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

    this.deleteBediende = (bediendeId) => {
        var index = undefined;
        var bediendeToDelete = this.bediendes.filter((bediende, i) => {
            if (bediende.id == bediendeId) { index = i}
            return bediende.id == bediendeId;
        });

        $uibModal.open(this.createConfirmModal("Bediende verwijderen", "Ben je zeker dat je bediende "+bediendeToDelete[0].voorNaam+" "+bediendeToDelete[0].familieNaam+" wil verwijderen?")).result.then(
            (success) => {
                Bediende.delete(
                    {id: bediendeToDelete[0].id},
                    (successResult) => {
                        this.bediendes.splice(index, 1);
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

    this.createNewBediende = () => {
        $uibModal.open(createBediendeModal).result.then(
            (body) => {
                console.log("lalalala %o", body);
                Bediende.save(
                    body.bediende,
                    (successResult) => {
                        console.log("Bediende was saved! Result is %o", successResult);
                        this.bediendes.push(successResult);
                        body.contract.bediendeId = successResult.id;
                        console.log("Diede %o",body.contract)
                        Contract.save(
                            body.contract,
                            (successResult) => {
                                console.log("Contract was saved! Result is %o", successResult);

                                //aggregateContract(successResult);
                                //this.aggregatedContracts.push(successResult);
                            },
                            (errorResult) => {
                                console.log("Saving Contract failed! Result was %o", errorResult);
                            }
                        );
                    },
                    (errorResult) => {
                        console.log("Saving Bediende failed! Result was %o", errorResult);
                    }
                );

            },
            () => {
                console.log("modal closed!");
            }
        );
    };

}]);
