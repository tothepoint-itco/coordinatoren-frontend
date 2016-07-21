'use strict';

angular.module('coordinatorentoolControllers').controller("AkkoordController",
["AkkoordResource", "ConsultantResource", "OpdrachtResource", "alertService", "$uibModal", "$scope",
function(Akkoord, Consultant, Opdracht, alertService, $uibModal, $scope) {

    $scope.propertyName = 'voorNaam';
    this.sortBy = (propertyName) =>{
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    }
    Akkoord.query(
        (success) => {
            this.akkoorden = success;
            this.akkoorden.map((akkoord) => {
                aggregateAkkoord(akkoord);
            });
        },
        (error) => {
            alertService.addAlert({
                type: "danger",
                timeout: "3000",
                title: "HTTP error",
                body: "De akkoorden konden niet opgehaald worden"
            })
        }
    );

    this.dateSort = (akkoord) => {
        return new Date(moment(akkoord.informeelStartDatum));
    }

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
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "Het akkoord is verwijderd."
                        });
                    },
                    (errorResult) => {
                        alertService.addAlert({
                            type: "danger",
                            timeout: "3000",
                            title: "HTTP Error",
                            body: "Het akkoord kon niet verwijderd worden."
                        });
                    }
                );
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
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "Het akkoord is aangemaakt."
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

                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "Het akkoord is bijgewerkt."
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
