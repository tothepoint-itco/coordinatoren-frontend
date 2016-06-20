'use strict';
class AlertController {
    static $inject = [
        "alertService"
    ];

    constructor(
        private alertService: AlertService
    ) {
        
    }

    getAlerts() {
        return this.alertService.getAlerts();
    }
    close(index: number) {
        return this.alertService.closeAlert(index);
    }
}


angular.module('coordinatorentoolControllers').controller("AlertController", AlertController);
