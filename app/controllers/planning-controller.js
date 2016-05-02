'use strict';


angular.module('coordinatorentoolControllers').controller("PlanningController", ["BusinessUnitResource", "ContractResource", "ConsultantAggregatedResource",
function(BusinessUnit, Contract, ConsultantAggregated) {

    ConsultantAggregated.query(
        (success) => {
            this.contract = {};
            this.aggregatedConsultants = success;
            console.log("aggregatedConsultants %o",success);
            this.aggregatedConsultants.map((aggregatedConsultant)=>
                Contract.query(
                    {consultantId: aggregatedConsultant.consultant.id},
                    (contract)=> {
                        console.log("contract %o", contract[0].startDatum)
                        this.aggregatedConsultant.startDatum = contract[0].startDatum;
                        this.aggregatedConsultant.eindDatum  = contract[0].eindDatum;
                        BusinessUnit.query(
                            {id:this.contract.businessUnitId},
                            (businessUnit) =>{
                                this.contract.businessUnit = businessUnit[0].naam;
                                console.log("contract %o",this.contract.businessUnit)
                            }
                        )
                    }
                )

            )

        },
        (error) => {
            console.log("Call failed, result was %o", error);
        }
    );

}]);
