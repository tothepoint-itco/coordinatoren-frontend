'use strict',

angular.module('coordinatorentoolControllers').controller('BestelbonController', ["BestelbonResource", "alertService", "$uibModal","AkkoordAggregatedResource",
function(Bestelbon, alertService, $uibModal, AkkoordAggregated) {
    Bestelbon.query(
        (success) => {
            this.bestelbonnen = success;
            this.bestelbonnen.map((bestelbon =>{
                aggregateBestelbon(bestelbon);
            }))
        },
        (error) => {
            alertService.addAlert({
                type: "danger",
                timeout: "3000",
                title: "HTTP Error",
                body: "De bestelbonnen konden niet opgehaald worden."
            });
        }
    );

    this.createBestelbonModal = (updateMode, bestelbon) => {
        return {
            templateUrl: "partials/modals/create-bestelbon.html",
            controller: "CreateBestelbonController",
            controllerAs: "cbonCtrl",
            keyboard: false,
            resolve: {
                updateMode: () => updateMode,
                bestelbon: () => angular.copy(bestelbon)
            }
        }
    }
    var aggregateBestelbon = (bestelbon) =>{
        AkkoordAggregated.get(
            {id:bestelbon.akkoordId},
            (akkoordAggregated) => {
                bestelbon.opdracht = akkoordAggregated.opdracht;
                bestelbon.akkoord = akkoordAggregated.akkoord;
            }
        )
    }

    this.createConfirmModal = (title, body) => {
        return {
            templateUrl: "partials/modals/confirm.html",
            controller:   "ConfirmModalController",
            controllerAs: "cmCtrl",
            keyboard: false,
            resolve: {
                title:() => title,
                body: () => body
            }
        }
    }
    this.deleteBestelbon = (bestelbonId)=> {
        console.log("deleting bestelbon with id %o", bestelbonId);
        var index = undefined;
        var bestelbonToDelete = this.bestelbonnen.filter((bestelbon, i)=>{
            if(bestelbon.id == bestelbonId) {index = i}
            return bestelbon.id == bestelbonId;
        });
        $uibModal.open(this.createConfirmModal("Bestelbon verwijderen","Ben je zeker dat je bestelbon"+ bestelbonToDelete[0].projectCode+ "wilt verwijderen?")).result.then(
            (success) => {
                Bestelbon.delete(
                    {id: bestelbonToDelete[0].id},
                    (successResult) => {
                        this.bestelbonnen.splice(index,1)
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De bestelbon is verwijderd."
                        });
                    },
                    (errorResult) =>{
                        alertService.addAlert({
                            type: "danger",
                            timeout: "3000",
                            title: "HTTP Error",
                            body: "De bestelbon kon niet verwijderd worden."
                        });
                    }
                );
            }
        )
    }
    this.createNewBestelbon = () =>{
        $uibModal.open(this.createBestelbonModal(false, null)).result.then(
            (bestelbon)=> {
                Bestelbon.save(
                    bestelbon,
                    (successResult)=> {
                        console.log("Bestelbon was saved! Result is %o", successResult);
                        aggregateBestelbon(successResult);
                        this.bestelbonnen.push(successResult);
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De bestelbon is succesvol aangemaakt."
                        });
                    },
                    (errorResult: IErrorResponse) => {
                        var body = "";
                        if (Object.prototype.toString.call( errorResult.data ) === '[object Array]') {
                            errorResult.data.map((errorMessage: IErrorMessage) => {
                                body += errorMessage.message;
                            });
                        }

                        alertService.addAlert({
                            type: "danger",
                            timeout: "8000",
                            title: "HTTP Error",
                            body: body
                        });
                    }
                );
            }
        );
    };
    this.editBestelbon = (originalBestelbon) => {
        $uibModal.open(this.createBestelbonModal(true, originalBestelbon)).result.then(
            (bestelbon)=> {
                Bestelbon.UPDATE({id: originalBestelbon.id},
                    bestelbon,
                    (successResult)=> {
                        this.bestelbonnen.filter((bestlb, i) => {
                            if (bestlb.id == originalBestelbon.id) {
                                this.bestelbonnen[i] = successResult;
                            }
                            return bestlb.id == originalBestelbon.id;
                        });
                        aggregateBestelbon(successResult);
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De bestelbon is succesvol bijgewerkt."
                        });
                    },
                    (errorResult: IErrorResponse) => {
                        var body = "";
                        if (Object.prototype.toString.call( errorResult.data ) === '[object Array]') {
                            errorResult.data.map((errorMessage: IErrorMessage) => {
                                body += errorMessage.message;
                            });
                        }

                        alertService.addAlert({
                            type: "danger",
                            timeout: "8000",
                            title: "HTTP Error",
                            body: body
                        });
                    }
                );
            }
        );
    };
}]);
