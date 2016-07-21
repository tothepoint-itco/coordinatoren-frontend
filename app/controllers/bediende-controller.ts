'use strict';


angular.module('coordinatorentoolControllers').controller("BediendeController", ["BediendeResource", "alertService", "$uibModal",
function(Bediende, alertService, $uibModal) {
    Bediende.query(
        (success) => {
            console.log("Bediende query %o", success);
            this.bediendes = success;
        },
        (error) => {
            alertService.addAlert({
                type: "danger",
                timeout: "3000",
                title: "HTTP Error",
                body: "De consultants konden niet opgehaald worden."
            });
        }
    );

    this.createBediendeModal = (updateMode, bediende) => {
        return {
            templateUrl: "partials/modals/create-bediende.html",
            controller: "CreateBediendeController",
            controllerAs: "cbedCtrl",
            keyboard: false,
            resolve: {
                updateMode: () => updateMode,
                bediende: () => angular.copy(bediende)
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
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De consultant is succesvol bijgewerkt."
                        });
                    },
                    (errorResult) => {
                        alertService.addAlert({
                            type: "danger",
                            timeout: "3000",
                            title: "HTTP error",
                            body: "Het is niet gelukt om de consultant te verwijderen."
                        })
                    }
                );
            },
            (error) => {

            }
        )
    }

    this.createNewBediende = () => {
        $uibModal.open(this.createBediendeModal(false, null)).result.then(
            (bediende) => {
                Bediende.save(
                    bediende,
                    (successResult) => {
                        console.log("Bediende was saved! Result is %o", successResult);
                        this.bediendes.push(successResult);
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De consultant is succesvol aangemaakt."
                        })
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

    this.editBediende = (originalBediende) => {
        $uibModal.open(this.createBediendeModal(true, originalBediende)).result.then(
            (bediende) => {
                Bediende.UPDATE({id: originalBediende.id},
                    bediende,
                    (successResult) => {
                        this.bediendes.filter((bedi, i) => {
                            if (bedi.id == originalBediende.id) {
                                this.bediendes[i] = successResult;
                            }
                            return bedi.id == originalBediende.id;
                        });
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De consultant is succesvol bijgewerkt."
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
