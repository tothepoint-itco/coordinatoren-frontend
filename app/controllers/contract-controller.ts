'use strict';


angular.module('coordinatorentoolControllers').controller("ContractController",
["ContractResource", "BediendeResource","ContractAggregatedResource", "BusinessUnitResource", "$uibModal","$scope",
function(Contract, Bediende, ContractAggregatedResource, BusinessUnit, $uibModal, $scope) {
    $scope.propertyName = 'voorNaam';
    this.sortBy = (propertyName, secondPropertyName) =>{
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
        $scope.secondPropertyName = secondPropertyName;
        //this.opdrachten = orderBy(this.opdrachten, propertyName)
    }
    Contract.query(
        (success) => {
            this.aggregatedContracts = success;

            this.aggregatedContracts.map((aggregatedContract) => {
                BusinessUnit.get(
                    {id: aggregatedContract.contract.businessUnitId},
                    (businessUnit) => {
                        aggregatedContract.contract.businessUnit = businessUnit;
                    }
                )
            });
        }
    );

    // Contract.query(
    //     (success) => {
    //         this.contracts = success;
    //         this.aggregatedContracts = this.contracts;
    //
    //         this.aggregatedContracts.map((contract) => {
    //
    //             Bediende.get(
    //                 {id: contract.bediendeId},
    //                 (bediende) => {
    //                     contract.bediende = bediende;
    //                 }
    //             );
    //
    //             BusinessUnit.get(
    //                 {id: contract.businessUnitId},
    //                 (businessUnit) => {
    //                     contract.businessUnit = businessUnit;
    //                 }
    //             );
    //
    //         })
    //     }
    // );

    var aggregateContract = (aggregatedContract) => {
        Bediende.get(
            {id: aggregatedContract.contract.bediendeId},
            (bediende) => {
                aggregatedContract.bediende = bediende;
            }
        );

        BusinessUnit.get(
            {id: aggregatedContract.contract.businessUnitId},
            (businessUnit) => {
                aggregatedContract.contract.businessUnit = businessUnit;
            }
        );
    }

    this.aggregatedContracts = [];

    this.createContractModal = (updateMode, contract) => {
        return {
            templateUrl: "partials/modals/create-contract.html",
            controller: "CreateContractController",
            controllerAs: "ccCtrl",
            keyboard: false,
            resolve: {
                updateMode: () => updateMode,
                contract: () => angular.copy(contract)
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

    this.deleteContract = (contractId) => {
        var index = undefined;
        var contractToDelete = this.aggregatedContracts.filter((aggregatedContract, i) => {
            if (aggregatedContract.contract.id == contractId) { index = i}
            return aggregatedContract.contract.id == contractId;
        });

        $uibModal.open(this.createConfirmModal("Contract verwijderen", "Ben je zeker dat je het contract tussen "+contractToDelete[0].bediende.voorNaam+" "+contractToDelete[0].bediende.familieNaam+" en "+contractToDelete[0].contract.businessUnit.naam+" wil verwijderen?")).result.then(
            (success) => {
                Contract.delete(
                    {id: contractToDelete[0].contract.id},
                    (successResult) => {
                        this.aggregatedContracts.splice(index, 1);
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
        $uibModal.open(this.createContractModal(false, null)).result.then(
            (contract) => {

                Contract.save(
                    contract,
                    (successResult) => {
                        console.log("Contract was saved! Result is %o", successResult);

                        var newAggregatedContract = {
                            contract: successResult,
                            bediende: undefined
                        };
                        aggregateContract(newAggregatedContract);

                        this.aggregatedContracts.push(newAggregatedContract);
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

    this.editContract = (originalContract) => {
        $uibModal.open(this.createContractModal(true, originalContract)).result.then(
            (contract) => {
                Contract.UPDATE({id: originalContract.id},
                    contract,
                    (successResult) => {
                        console.log("Contract was edited! Result is %o", successResult);

                        var newAggregatedContract = {
                            contract: successResult,
                            bediende: undefined
                        };

                        aggregateContract(newAggregatedContract);

                        this.aggregatedContracts.filter((aggrContr, i) => {
                            if (aggrContr.contract.id == originalContract.id) {
                                this.aggregatedContracts[i] = newAggregatedContract;
                            }
                            return aggrContr.contract.id == originalContract.id;
                        });
                    },
                    (errorResult) => {
                        console.log("Editing Contract failed! Result was %o", errorResult);
                    }
                );
            },
            () => {
                console.log("modal closed!");
            }
        );
    };

}]);
