'use strict';


angular.module('coordinatorentoolControllers').controller("TimelineOverviewController", ["$rootScope", "AkkoordResource", "AkkoordAggregatedResource", "BestelbonResource", "ContractResource", "$uibModal",
function($rootScope, Akkoord, AkkoordAggregated, Bestelbon, Contract, $uibModal) {
    $rootScope.$watch(
        () => this.data, (newVal, oldVal) => {
            if (((oldVal == undefined) || (oldVal.length == 0)) && (newVal != undefined && newVal.length > 0)) {
                console.log("NEWVAL IS %o", newVal);
                this.setUp(newVal);
            }
        },
        true
    );

    this.akkoordModal = (title, body) => {
        return {
            templateUrl: "partials/modals/akkoord.html",
            controller: "AkkoordModalController",
            controllerAs: "gmCtrl",
            keyboard: false,
            resolve: {
                title: () => title,
                body: () => body
            }
        }
    }
    this.bestelbonModal = (title, body) => {
        return {
            templateUrl: "partials/modals/bestelbon.html",
            controller: "BestelbonModalController",
            controllerAs: "gmCtrl",
            keyboard: false,
            resolve: {
                title: () => title,
                body: () => body
            }
        }
    }

    this.drawActualTimeline = (data) => {
        var container = document.getElementById("visualization-overview");

        var dataSetArray = [];

        var groups = [];
        var subGroups = [];

        data.map((aggregatedConsultant) => {
            groups.push({id: aggregatedConsultant.consultant.id, content: aggregatedConsultant.consultant.voorNaam + " " + aggregatedConsultant.consultant.familieNaam});

            aggregatedConsultant.akkoorden.map((akkoordAggregated) => {

                dataSetArray.push({
                    id: "A" + akkoordAggregated.akkoord.id,
                    group: aggregatedConsultant.consultant.id,
                    content: akkoordAggregated.opdracht.klant + (akkoordAggregated.akkoord.bezettingsGraad != undefined ? " (" + akkoordAggregated.akkoord.bezettingsGraad + "%)" : "") ,
                    subgroup: akkoordAggregated.opdracht.id + "-" + aggregatedConsultant.consultant.id,
                    start: moment(akkoordAggregated.akkoord.informeelStartDatum, "DD/MM/YYYY"),
                    end: moment(akkoordAggregated.akkoord.informeelEindDatum, "DD/MM/YYYY"),
                    style: "background-color: #d5ddf7",
                    title: "Akkoord voor: "+ akkoordAggregated.opdracht.klant +"\nLoopt informeel van: " + moment(akkoordAggregated.akkoord.informeelStartDatum, "DD/MM/YYYY").format("D MMM") + " tot " + moment(akkoordAggregated.akkoord.informeelEindDatum, "DD/MM/YYYY").format("D MMM")
                });

                akkoordAggregated.bestelbonnen.map((bestelbon) => {
                    dataSetArray.push({
                        id: "B" + bestelbon.id,
                        group: aggregatedConsultant.consultant.id,
                        subgroup: akkoordAggregated.opdracht.id + "-" + aggregatedConsultant.consultant.id,
                        start: moment(bestelbon.startDatum, "DD/MM/YYYY"),
                        end: moment(bestelbon.eindDatum, "DD/MM/YYYY"),
                        content: "<p></p>",
                        style: "background-color: #20bd00; opacity: 0.3",
                        title: "Bestelbon voor: "+ akkoordAggregated.opdracht.klant +"\nLoopt van: " + moment(bestelbon.startDatum, "DD/MM/YYYY").format("D MMM") + " tot " + moment(bestelbon.eindDatum, "DD/MM/YYYY").format("D MMM")
                    });
                });

            });

            aggregatedConsultant.contracts.map((contract) => {
                if ((contract.startDatum != null) && (contract.eindDatum != null)) {
                    dataSetArray.push({
                        id: "C" + contract.id,
                        group: aggregatedConsultant.consultant.id,
                        subgroup: "contract-"+aggregatedConsultant.consultant.id,
                        start: moment(contract.startDatum, "DD/MM/YYYY"),
                        end: moment(contract.eindDatum, "DD/MM/YYYY"),
                        //type: "background",
                        style: "background-color: #d5ddf7; height: 8px; opacity: 0.4",
                        title: "Contract voor: "+ aggregatedConsultant.consultant.voorNaam +"\nLoopt van: " + moment(contract.startDatum, "DD/MM/YYYY").format("D MMM") + " tot " + moment(contract.eindDatum, "DD/MM/YYYY").format("D MMM")
                    });
                }
            })

        });

        document.getElementById("visualization-overview").onclick = ((event) => {
            var props = timeline.getEventProperties(event)
            this.timeLineId = props.item;

            if(this.timeLineId != undefined && this.timeLineId.substring(0,1)=='A'){
                Akkoord.get(
                    {id:this.timeLineId.substring(1)},
                    (success) =>{
                        $uibModal.open(this.akkoordModal("Akkoord met project code : "+success.projectCode, success));
                    }
                );
            }
            else if(this.timeLineId != undefined && this.timeLineId.substring(0,1)=='B'){
                Bestelbon.get(
                    {id:this.timeLineId.substring(1)},
                    (success) =>{
                        AkkoordAggregated.get(
                            {id: success.akkoordId},
                            (akkAggr) => {
                                $uibModal.open(this.bestelbonModal("Bestelbon met project code : "+akkAggr.akkoord.projectCode, success));
                            }
                        )
                    }
                );
            }
        });

        var items = new vis.DataSet(dataSetArray);

        var options = {
            stack: false,
            selectable: false,
            locale: 'nl',
            start: new Date().setMonth(new Date().getMonth()-1),
            end: new Date().setMonth(new Date().getMonth()+3)
        };

        var timeline = new vis.Timeline(container, items, groups, options);
    }

    this.fetchContracts = (data, contracts) => {
        data.map((aggregatedConsultant) => {
            aggregatedConsultant.contracts = contracts.filter((c) => {
                return c.bediendeId == aggregatedConsultant.consultant.id;
            });
        });
        this.drawActualTimeline(data);
    }


    this.setUp = (data) => {
        var newData = angular.copy(data);

        Contract.query(
            (contracts) => {
                this.fetchContracts(newData, contracts);
            },
            (error) => {
                this.drawActualTimeline(newData);
            }
        );
    }

}]);
