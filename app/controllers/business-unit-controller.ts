'use strict';


angular.module('coordinatorentoolControllers').controller("BusinessUnitController", ["BusinessUnitResource", "$uibModal",
function(BusinessUnit, $uibModal) {
    BusinessUnit.query(
        (success) => {
            this.businessUnits = success;
        }
    );

    var createBusinessUnitModal = {
        templateUrl: "partials/modals/create-business-unit.html",
        controller: "CreateBusinessUnitController",
        controllerAs: "cbuCtrl",
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

    this.deleteBusinessUnit = (businessUnitId) => {
        var index = undefined;
        var businessUnitToDelete = this.businessUnits.filter((businessUnit, i) => {
            if (businessUnit.id == businessUnitId) { index = i}
            return businessUnit.id == businessUnitId;
        });

        $uibModal.open(this.createConfirmModal("Business unit verwijderen", "Ben je zeker dat je Business Unit "+businessUnitToDelete[0].naam+" wil verwijderen?")).result.then(
            (success) => {
                BusinessUnit.delete(
                    {id: businessUnitToDelete[0].id},
                    (successResult) => {
                        this.businessUnits.splice(index, 1);
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

    this.createNewBusinessUnit = () => {
        $uibModal.open(createBusinessUnitModal).result.then(
            (businessUnit) => {

                BusinessUnit.save(
                    businessUnit,
                    (successResult) => {
                        console.log("BusinessUnit was saved! Result is %o", successResult);
                        this.businessUnits.push(successResult);
                    },
                    (errorResult) => {
                        console.log("Saving BusinessUnit failed! Result was %o", errorResult);
                    }
                );
            },
            () => {
                console.log("modal closed!");
            }
        );
    };

}]);
