'use strict';


angular.module('coordinatorentoolControllers').controller("PlanningController", ["BusinessUnitResource","ContractResource",'OpdrachtResource', "AkkoordResource","ConsultantResource", "$uibModal",
function(BusinessUnit, Contract, Opdracht, Akkoord, Consultant, $uibModal) {
    Consultant.query(
        (success) => {
            this.consultants = success;
            this.aggregatedConsultants = this.consultants;
            console.log("foo");
            this.aggregatedConsultants.map((consultant) => {
                Akkoord.query(
                    {consultantId: consultant.id},
                    (akkoorden) => {
                        console.log("Akkoorden in akkoord querry %o", akkoorden);
                        consultant.akkoorden= akkoorden;
                        this.aggregatedAkkoorden = consultant.akkoorden;
                        this.aggregatedAkkoorden.map((akkoord) =>{
                            Opdracht.get({id: akkoord.opdrachtId},
                                (opdracht)=> {
                                    console.log(consultant.id);

                                    this.drawTimeLine(consultant.id);
                                    akkoord.opdracht = opdracht;
                                });
                            }
                        );

                    }
                );


                Contract.query(
                    {bediendeId: consultant.id},
                    (contracts) => {
                        this.aggregatedContracts = contracts;
                        this.aggregatedContracts.map((contract) => {
                            consultant.contract = contract;
                            BusinessUnit.get(
                                {id: contract.businessUnitId},
                                (businessUnit) => {
                                    consultant.businessUnit = businessUnit;
                                }
                            );
                        });
                    }
                );




        });
    }
);


this.drawTimeLine = (consultantId) => {
    var container = document.getElementById(consultantId);

    var options = {
    }
    var items = new vis.DataSet([
        {id: 1, content: 'item 1', start: '2015-04-14', end:'2015-05-14'},
        {id: 2, content: 'item 2', start: '2015-04-14'},
    ]);

    var timeline = new vis.Timeline(container, items, options);
    var items = new vis.DataSet([
        {
            start: new Date(2015,1, 1),
            end: new Date(2016, 1, 2),  // end is optional
            content: 'Trajectory A',
            height: '5px'
            // Optional: fields 'id', 'type', 'group', 'className', 'style'
        }]);
    }


    this.testContainer = () => {
        var container = document.getElementById('57176ff5e4b0fed8a530797d');
        var options = {
        }
        var items = new vis.DataSet([
            {id: 1, content: 'item 1', start: '2015-04-14', end:'2015-05-14'},
            {id: 2, content: 'item 2', start: '2015-04-14'},

        ]);
        var timeline = new vis.Timeline(container, items, options);
        var items = new vis.DataSet([
            {
                start: new Date(2015,1, 1),
                end: new Date(2016, 1, 2),  // end is optional
                content: 'Trajectory A',
                height: '5px'
                // Optional: fields 'id', 'type', 'group', 'className', 'style'
            }]);
        }



    }]);
