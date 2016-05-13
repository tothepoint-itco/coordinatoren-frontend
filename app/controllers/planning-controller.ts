'use strict';


angular.module('coordinatorentoolControllers').controller("PlanningController", ["BusinessUnitResource", "ContractResource", "ConsultantAggregatedResource","$filter", "$scope",
function(BusinessUnit, Contract, ConsultantAggregated, $filter, $scope) {
    this.aggregatedConsultants = [];

    var orderBy = $filter('orderBy');
    ConsultantAggregated.query(
        (success) => {
            this.contract = {};
            this.aggregatedConsultants = success;
            console.log("aggregatedConsultants %o",success);
            this.aggregatedConsultants.map((aggregatedConsultant)=> {
                    aggregatedConsultant.akkoorden.map((akkoord)=>{
                        //console.log("Akkoord", akkoord.akkoord.bezettingsGraad);
                        if(akkoord.akkoord.bezettingsGraad != undefined){
                            console.log("parseInt")
                            aggregatedConsultant.consultant.som =+ parseInt(akkoord.akkoord.bezettingsGraad);
                        }
                    });
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

    $scope.order = (predicate) => {
       this.reverse = (this.predicate === predicate) ? !this.reverse : false;
       this.predicate = predicate;
       this.aggregatedConsultants = orderBy(this.aggregatedConsultants, predicate, this.reverse);
  };
  $scope.orderTimeline = (predicate) => {
     console.log("foo%o",this.aggregatedConsultants)
     this.reverse = (this.predicate === predicate) ? !this.reverse : false;
     this.predicate = predicate;
     this.aggregatedConsultants = orderBy(this.aggregatedConsultants, predicate, this.reverse);
};

    // this.order('age',true)


}]);
