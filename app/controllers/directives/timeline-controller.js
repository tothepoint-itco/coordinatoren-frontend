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
                title: "Loopt informeel van: \n" + moment(akkoordAggregated.akkoord.informeelStartDatum).format("D MMM") + " tot " + moment(akkoordAggregated.akkoord.informeelEindDatum).format("D MMM")
            });

            akkoordAggregated.bestelbonnen.map((bestelbon) => {
                var entry = {
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
