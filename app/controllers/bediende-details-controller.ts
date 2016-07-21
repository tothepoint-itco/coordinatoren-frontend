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
            alertService.addAlert({
                type: "danger",
                timeout: "3000",
                title: "HTTP Error",
                body: "De consultant kon niet opgehaald worden."
            });
        }
    );

    this.getAggregatedConsultant = (consultantId) => {
        ConsultantAggregated.get(
            {id: consultantId},
            (aggregatedConsultant) => {
                this.aggregatedConsultant = aggregatedConsultant;
            }
        );
    }

}]);
