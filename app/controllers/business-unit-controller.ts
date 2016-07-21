'use strict';


angular.module('coordinatorentoolControllers').controller("BusinessUnitController", ["BusinessUnitResource", "alertService", "$uibModal",
function(BusinessUnit, alertService, $uibModal) {
    BusinessUnit.query(
        (success) => {
            this.businessUnits = success;
        },
        (error) => {
            alertService.addAlert({
                type: "danger",
                timeout: "3000",
                title: "HTTP Error",
                body: "De business units konden niet opgehaald worden."
            });
        }
    );

    this.createBusinessUnitModal = (updateMode, businessUnit) => {
        return {
            templateUrl: "partials/modals/create-business-unit.html",
            controller: "CreateBusinessUnitController",
            controllerAs: "cbuCtrl",
            keyboard: false,
            resolve: {
                updateMode: () => updateMode,
                businessUnit: () => angular.copy(businessUnit)
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
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De business unit is succesvol verwijderd."
                        });
                    },
                    (errorResult) => {
                        alertService.addAlert({
                            type: "danger",
                            timeout: "3000",
                            title: "HTTP Error",
                            body: "De business unit kon niet verwijderd worden."
                        });
                    }
                );
            }
        )
    }

    this.createNewBusinessUnit = () => {
        $uibModal.open(this.createBusinessUnitModal(false, null)).result.then(
            (businessUnit) => {
                BusinessUnit.save(
                    businessUnit,
                    (successResult) => {
                        console.log("BusinessUnit was saved! Result is %o", successResult);
                        this.businessUnits.push(successResult);
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De business unit is succesvol aangemaakt."
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
            },
            () => {
                console.log("modal closed!");
            }
        );
    };

     this.editBusinessUnit = (originalBusinessUnit) => {
        $uibModal.open(this.createBusinessUnitModal(true, originalBusinessUnit)).result.then(
            (businessUnit) => {
                BusinessUnit.UPDATE(
                    {id: originalBusinessUnit.id},
                    businessUnit,
                    (successResult) => {
                        this.businessUnits.filter((akk, i) => {
                            if (akk.id == originalBusinessUnit.id) {
                                this.businessUnits[i] = successResult;
                            }
                            return akk.id == originalBusinessUnit.id;
                        });

                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De business unit is succesvol bijgewerkt."
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
