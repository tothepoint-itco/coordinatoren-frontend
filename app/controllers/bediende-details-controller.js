'use strict';


angular.module('coordinatorentoolControllers').controller("BediendeDetailsController", ["BediendeResource", "ConsultantAggregatedResource", "$routeParams", "$uibModal",
function(Bediende, ConsultantAggregated, $routeParams, $uibModal) {
    var bediendeId = $routeParams["bediendeId"];

    Bediende.get(
        {id: bediendeId},
        (bediende) => {
            this.bediende = bediende;
            this.getAggregatedConsultant(bediende.id);
        },
        (errorResult) => {

        }
    );

    this.getAggregatedConsultant = (consultantId) => {
        console.log("getAggregatedConsultant(%o)", consultantId);
        ConsultantAggregated.get(
            {id: consultantId},
            (aggregatedConsultant) => {
                console.log("aggregated consultant is: %o", aggregatedConsultant);
                this.aggregatedConsultant = aggregatedConsultant;
            }
        );
    }



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
            (bediende) => {

                Bediende.save(
                    bediende,
                    (successResult) => {
                        console.log("Bediende was saved! Result is %o", successResult);
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
