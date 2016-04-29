'use strict';


angular.module('coordinatorentoolControllers').controller("PlanningController", ["BusinessUnitResource", "ContractResource", "ConsultantAggregatedResource",
function(BusinessUnit, Contract, ConsultantAggregated) {

    ConsultantAggregated.query(
        (success) => {
            this.aggregatedConsultants = success;
        },
        (error) => {
            console.log("Call failed, result was %o", error);
        }
    );

}]);
