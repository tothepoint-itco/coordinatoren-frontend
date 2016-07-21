'use strict';


angular.module('coordinatorentoolControllers').controller("ContractController",
["ContractResource", "ContractAggregatedResource", "BediendeResource", "BusinessUnitResource", "alertService", "$uibModal","$scope",
function(Contract, ContractAggregated, Bediende, BusinessUnit, alertService, $uibModal, $scope) {
    $scope.propertyName = 'voorNaam';
    this.sortBy = (propertyName) =>{
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    }
    ContractAggregated.query(
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
        },
        (error) => {
            alertService.addAlert({
                type: "danger",
                timeout: "3000",
                title: "HTTP Error",
                body: "De contracten konden niet opgehaald worden."
            });
        }
    );

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
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "Het contract is verwijderd."
                        });
                    },
                    (errorResult) => {
                        alertService.addAlert({
                            type: "danger",
                            timeout: "3000",
                            title: "HTTP Error",
                            body: "Het contract kon niet verwijderd worden."
                        });
                    }
                );
            }
        )
    }

    this.createNewContract = () => {
        $uibModal.open(this.createContractModal(false, null)).result.then(
            (contract) => {

                Contract.save(
                    contract,
                    (successResult) => {
                        var newAggregatedContract = {
                            contract: successResult,
                            bediende: undefined
                        };
                        aggregateContract(newAggregatedContract);

                        this.aggregatedContracts.push(newAggregatedContract);
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "Het contract is aangemaakt."
                        });
                    },
                    (errorResult: IErrorResponse) => {
                        console.log("DATA IS: %o" , errorResult.data);
                        var body = "";

                        if (Object.prototype.toString.call( errorResult.data ) === '[object Array]') {
                            errorResult.data.map((errorMessage: IErrorMessage) => {
                                body += errorMessage.message;
                            });
                        }

                        alertService.addAlert({
                            type: "danger",
                            timeout: "8000",
                            title: "HTTP Error",
                            body: body
                        });
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

                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "Het contract is bijgewerkt."
                        });
                    },
                    (errorResult: IErrorResponse) => {
                        var body = "";
                        if (Object.prototype.toString.call( errorResult.data ) === '[object Array]') {
                            errorResult.data.map((errorMessage: IErrorMessage) => {
                                body += errorMessage.message;
                            });
                        }

                        alertService.addAlert({
                            type: "danger",
                            timeout: "8000",
                            title: "HTTP Error",
                            body: body
                        });
                    }
                );
            }
        );
    };

}]);
