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
                        if(contract[0] != undefined){
                        aggregatedConsultant.contract = contract[0];
                        console.log("contract %o", contract[0])
                            BusinessUnit.get(
                                {id: contract[0].businessUnitId},
                                (businessUnit) =>{
                                    console.log("Aggregated Consultant businessUnit %o with first element of businessUnit",aggregatedConsultant.businessUnit, businessUnit[0])
                                    aggregatedConsultant.businessUnit = businessUnit;
                                }
                            )
                        }
                        else{
                        }
                    }
                )
            })
        },
        (error) => {
            console.log("Call failed, result was %o", error);
        }
    );

}]);
