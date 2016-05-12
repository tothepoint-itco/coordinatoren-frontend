'use strict';


angular.module('coordinatorentoolControllers').controller("ContractController",
["ContractResource", "BediendeResource", "BusinessUnitResource", "$uibModal",
function(Contract, Bediende, BusinessUnit, $uibModal) {
    Contract.query(
        (success) => {
            this.contracts = success;
            this.aggregatedContracts = this.contracts;

            this.aggregatedContracts.map((contract) => {

                Bediende.get(
                    {id: contract.bediendeId},
                    (bediende) => {
                        contract.bediende = bediende;
                    }
                );

                BusinessUnit.get(
                    {id: contract.businessUnitId},
                    (businessUnit) => {
                        contract.businessUnit = businessUnit;
                    }
                );

            })
        }
    );

    var aggregateContract = (contract) => {
        Bediende.get(
            {id: contract.bediendeId},
            (bediende) => {
                contract.bediende = bediende;
            }
        );

        BusinessUnit.get(
            {id: contract.businessUnitId},
            (businessUnit) => {
                contract.businessUnit = businessUnit;
            }
        );
    }

    this.aggregatedContracts = [];

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
        var contractToDelete = this.aggregatedContracts.filter((contract, i) => {
            if (contract.id == contractId) { index = i}
            return contract.id == contractId;
        });

        $uibModal.open(this.createConfirmModal("Contract verwijderen", "Ben je zeker dat je het contract tussen "+contractToDelete[0].bediende.voorNaam+" "+contractToDelete[0].bediende.familieNaam+" en "+contractToDelete[0].businessUnit.naam+" wil verwijderen?")).result.then(
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

                        aggregateContract(successResult);
                        this.aggregatedContracts.push(successResult);
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
