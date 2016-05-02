'use strict';


angular.module('coordinatorentoolControllers').controller("TimelineController", ["$rootScope", "AkkoordResource","BestelbonResource","$uibModal",
function($rootScope, Akkoord, Bestelbon, $uibModal) {

    $rootScope.$watch(
        () => this.data, (newVal, oldVal) => {
            if ((newVal != undefined) && (newVal != oldVal)) {
                this.drawTimeline(newVal);
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


    this.drawTimeline = (data) => {
        var container = document.getElementById("visualization-"+data.consultant.id);

        var dataSetArray = [];

        var groups = [];

        document.getElementById(data.consultant.id).onclick =  (event) => {
        var props = timeline.getEventProperties(event)
        this.timeLineId= props.item

        if(this.timeLineId != undefined && this.timeLineId.substring(0,1)=='A'){
            console.log(this.timeLineId.substring(1))
            Akkoord.get(
                {id:this.timeLineId.substring(1)},
                (success) =>{
                    console.log("Akkoord get method %o",success)
                    $uibModal.open(this.akkoordModal("Akkoord met project code : "+success.projectCode, success)).result.then(
                        (success) => {
                        console.log("JA!");
                        },
                        (error) => {
                            console.log("Nee!");
                        }
                    )
                }
            );

        }
        else if(this.timeLineId != undefined && this.timeLineId.substring(0,1)=='B'){
            Bestelbon.get(
                {id:this.timeLineId.substring(1)},
                (success) =>{
                    console.log("Bestelbon get method %o",success)
                    $uibModal.open(this.bestelbonModal("Bestelbon met project code : "+success.projectCode, success)).result.then(
                        (success) => {
                        console.log("JA!");
                        },
                        (error) => {
                            console.log("Nee!");
                        }
                    )
                }
            );
            console.log("DIEDE")

        }
        else{
            console.log("Nothing selected!")
        }
        //console.log(props);
        //console.log(this.foo);
        }

        data.akkoorden.map((akkoordAggregated) => {
            groups.push({id: akkoordAggregated.opdracht.id, content: akkoordAggregated.opdracht.klant});
            dataSetArray.push({
                id: "A"+akkoordAggregated.akkoord.id,
                group: akkoordAggregated.opdracht.id,
                //content: akkoordAggregated.opdracht.klant,
                start: akkoordAggregated.akkoord.informeelStartDatum,
                end: akkoordAggregated.akkoord.informeelEindDatum,
                style: "background-color: #d5ddf7",
                title: "Loopt informeel van: \n" + moment(akkoordAggregated.akkoord.informeelStartDatum).format("D MMM") + " tot " + moment(akkoordAggregated.akkoord.informeelEindDatum).format("D MMM")
            });

            akkoordAggregated.bestelbonnen.map((bestelbon) => {
                var entry = {
                    id: "B"+bestelbon.id,
                    group: akkoordAggregated.opdracht.id,
                    //content: akkoordAggregated.opdracht.klant,
                    start: bestelbon.startDatum,
                    end: bestelbon.eindDatum,
                    style: "background-color: #20bd00",
                    title: "Bestelbon loopt van: \n" + moment(bestelbon.startDatum).format("D MMM") + " tot " + moment(bestelbon.eindDatum).format("D MMM")
                };
                dataSetArray.push(entry);
            })


        });

        var items = new vis.DataSet(dataSetArray);


        var options = {
            stack: false,
            selectable: false,
            locale: 'nl'

        };

        var timeline = new vis.Timeline(container, items, groups, options);
    }




}]);
