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

        var items = new vis.DataSet([
            {id: 1, content: 'item 1', start: '2013-04-20'},
            {id: 2, content: 'item 2', start: '2013-04-14'},
            {id: 3, content: 'item 3', start: '2013-04-18'},
            {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
            {id: 5, content: 'item 5', start: '2013-04-25'},
            {id: 6, content: 'item 6', start: '2013-04-27'}
        ]);

        var options = {};

        var timeline = new vis.Timeline(container, items, options);
    }


}]);
