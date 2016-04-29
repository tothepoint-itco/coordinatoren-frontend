'use strict';


angular.module('coordinatorentoolControllers').controller("TimelineController", ["$rootScope",
function($rootScope) {

    $rootScope.$watch(
        () => this.data, (newVal, oldVal) => {
            if ((newVal != undefined) && (newVal != oldVal)) {
                this.drawTimeline(newVal);
            }
        },
        true
    );


    this.drawTimeline = (data) => {
        var container = document.getElementById("visualization-"+data.consultant.id);

        var dataSetArray = [];

        var groups = [];

        data.akkoorden.map((akkoordAggregated) => {
            groups.push({id: akkoordAggregated.opdracht.id, content: akkoordAggregated.opdracht.klant});

            dataSetArray.push({
                group: akkoordAggregated.opdracht.id,
                //content: akkoordAggregated.opdracht.klant,
                start: akkoordAggregated.akkoord.informeelStartDatum,
                end: akkoordAggregated.akkoord.informeelEindDatum,
                style: "background-color: #d5ddf7",
                title: "Loopt informeel van: \n" + akkoordAggregated.akkoord.informeelStartDatum + " tot " + akkoordAggregated.akkoord.informeelEindDatum
            });

            akkoordAggregated.bestelbonnen.map((bestelbon) => {
                var entry = {
                    group: akkoordAggregated.opdracht.id,
                    //content: akkoordAggregated.opdracht.klant,
                    start: bestelbon.startDatum,
                    end: bestelbon.eindDatum,
                    style: "background-color: #20bd00",
                    title: "Bestelbon loopt van: \n" + bestelbon.startDatum + " tot " + bestelbon.eindDatum
                };
                dataSetArray.push(entry);
            })


        });

        var items = new vis.DataSet(dataSetArray);


        var options = {
            stack: false,
            selectable: false
        };

        var timeline = new vis.Timeline(container, items, groups, options);
    }


}]);
