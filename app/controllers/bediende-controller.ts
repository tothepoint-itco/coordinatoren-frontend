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


    var editBediendeModal = {
        templateUrl: "partials/modals/edit-bediende.html",
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
                Bediende.save(
                    body.bediende,
                    (successResult) => {
                        console.log("Bediende was saved! Result is %o", successResult);
                        this.bediendes.push(successResult);
                        body.contract.bediendeId = successResult.id;
                        //console.log("Bedie %o",body.contract)
                        Contract.save(
                            body.contract,
                            (successResult) => {
                                console.log("Contract was saved! Result is %o", successResult);

                                //aggregateContract(successResult);

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

    this.editBediende = (bediendeId) => {
        var index = undefined;
        var bediendeToEdit = this.bediendes.filter((bediende, i) => {
            if (bediende.id == bediendeId) { index = i}
            return bediende.id == bediendeId;
        });
        $uibModal.open(editBediendeModal).result.then(
            (body) => {
                Bediende.UPDATE({id: bediendeToEdit[0].id},
                    body.bediende,
                    (successResult) => {
                        console.log("Bediende was edited! Result is %o", successResult);
                        body.contract.bediendeId = successResult.id;
                        this.bediendes.splice(index, 1);
                        this.bediendes.push(successResult);
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
