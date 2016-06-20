'use strict';
angular.module("coordinatorentoolServices").service("alertService", function() {
    this.alerts = [];

    this.addAlert = (alert) => {
        var errorInList : boolean;
        if(this.alerts != undefined) {
            errorInList= this.alerts
                .map(function (currentAlert:IAlert) {
                    return (currentAlert.body == alert.body) && (currentAlert.title == alert.title);
                })
                .reduce(function(prev, current) {
                return prev || current}, false);
        } else{
            errorInList = false;
        }

        if(!errorInList) this.alerts.push(alert);
    }

    this.getAlerts = () => {
        return this.alerts;
    }

    this.closeAlert = (index) => {
        this.alerts.splice(index, 1);
    }
});
