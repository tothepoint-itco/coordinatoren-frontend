'use strict';


angular.module('coordinatorentoolControllers').controller("ContractController", ["ContractResource", "$uibModal",
function(Contract, $uibModal) {
    Contract.query(
        (success) => {
            this.contracts = success;
        }
    );

    var createContractModal = {
        templateUrl: "partials/modals/create-contract.html",
        controller: "CreateContractController",
        controllerAs: "ccCtrl",
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

    this.deleteContract = (contractId) => {
        var index = undefined;
        var contractToDelete = this.contracts.filter((contract, i) => {
            if (contract.id == contractId) { index = i}
            return contract.id == contractId;
        });

        $uibModal.open(this.createConfirmModal("Contract verwijderen", "Ben je zeker dat je het contract tussen "+contractToDelete[0].bediendeId+" en "+contractToDelete[0].businessUnitId+" wil verwijderen?")).result.then(
            (success) => {
                Contract.delete(
                    {id: contractToDelete[0].id},
                    (successResult) => {
                        this.contracts.splice(index, 1);
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

    this.createNewContract = () => {
        $uibModal.open(createContractModal).result.then(
            (contract) => {

                Contract.save(
                    contract,
                    (successResult) => {
                        console.log("Contract was saved! Result is %o", successResult);
                        this.contracts.push(successResult);
                    },
                    (errorResult) => {
                        console.log("Saving Contract failed! Result was %o", errorResult);
                    }
                );
            },
            () => {
                console.log("modal closed!");
            }
        );
    };

}]);
