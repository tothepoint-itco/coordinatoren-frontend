'use strict';


angular.module('coordinatorentoolControllers').controller("PlanningController", ["BusinessUnitResource", "ContractResource", "ConsultantAggregatedResource",
function(BusinessUnit, Contract, ConsultantAggregated) {

    ConsultantAggregated.query(
        (success) => {
            this.contract = {};
            this.aggregatedConsultants = success;
            console.log("aggregatedConsultants %o",success);
            this.aggregatedConsultants.map((aggregatedConsultant)=> {
                Contract.query(
                    {bediendeId: aggregatedConsultant.consultant.id},
                    (contract)=> {
                        aggregatedConsultant.contract = contract[0];
                         BusinessUnit.query(
                            {id:  contract.businessUnitId},
                            (businessUnit) =>{
                                 aggregatedConsultant.businessUnit = businessUnit[0];

                            }
                        )
                    }
                )
            })
        },
        (error) => {
            console.log("Call failed, result was %o", error);
        }
    );

}]);
