'use strict';


angular.module('coordinatorentoolControllers').controller("PlanningController", ["BusinessUnitResource", "ContractResource", "ConsultantAggregatedResource","$filter",
function(BusinessUnit, Contract, ConsultantAggregated, $filter) {

    var orderBy = $filter('orderBy');
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
  // 
  //   this.order = (predicate) => {
  //       console.log("foo")
  //     this.reverse = (this.predicate === predicate) ? !this.reverse : false;
  //     this.predicate = predicate;
  //     this.aggregatedConsultants = orderBy(this.aggregatedConsultants, predicate, this.reverse);
  // };
  //   };
  //   this.order('age',true)
  //

}]);
