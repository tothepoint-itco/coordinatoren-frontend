'use strict',

angular.module('coordinatorentoolControllers').controller('OpdrachtController', ["OpdrachtResource", "alertService", "$uibModal","$scope",
function(Opdracht, alertService, $uibModal, $scope) {
    $scope.propertyName = 'klant';
    Opdracht.query(
        (success) => {
            this.opdrachten = success;
        },
        (error) => {
            alertService.addAlert({
                type: "danger",
                timeout: "3000",
                title: "HTTP Error",
                body: "De opdrachten konden niet opgehaald worden."
            });
        }
    );

    this.createOpdrachtModal = (updateMode, opdracht) => {
        return {
            templateUrl: "partials/modals/create-opdracht.html",
            controller: "CreateOpdrachtController",
            controllerAs: "copdCtrl",
            keyboard: false,
            resolve: {
                updateMode: () => updateMode,
                opdracht: () => angular.copy(opdracht)
            }
        }
    }
    this.sortBy = (propertyName) =>{
        console.log("foobar");
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
        //this.opdrachten = orderBy(this.opdrachten, propertyName)
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
    this.deleteOpdracht = (opdrachtId)=> {
        var index = undefined;
        var opdrachtToDelete = this.opdrachten.filter((opdracht, i)=>{
            if(opdracht.id == opdrachtId) {index = i}
            return opdracht.id == opdrachtId;
        });
        $uibModal.open(this.createConfirmModal("Opdracht verwijderen","Ben je zeker dat je de opdracht bij "+ opdrachtToDelete[0].klant+ " wil verwijderen?")).result.then(
            (success) => {
                Opdracht.delete(
                    {id: opdrachtToDelete[0].id},
                    (successResult) => {
                        this.opdrachten.splice(index,1)
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De opdracht is verwijderd."
                        });
                    },
                    (errorResult) =>{
                        alertService.addAlert({
                            type: "danger",
                            timeout: "3000",
                            title: "HTTP Error",
                            body: "De opdracht kon niet verwijderd worden."
                        });
                    }
                );
            },
            (error) => {
                console.log("Opdracht verwijderen werd niet uigevoert!")
            }
        )
    }
    this.createNewOpdracht = () =>{
        $uibModal.open(this.createOpdrachtModal(false, null)).result.then(
            (opdracht)=> {
                Opdracht.save(
                    opdracht,
                    (successResult)=> {
                        this.opdrachten.push(successResult);
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De opdracht is aangemaakt."
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
    this.editOpdracht = (originalOpdracht) =>{
        $uibModal.open(this.createOpdrachtModal(true, originalOpdracht)).result.then(
            (opdracht)=> {
                Opdracht.UPDATE({id: originalOpdracht.id},
                    opdracht,
                    (successResult)=> {
                        this.opdrachten.filter((opdr, i) => {
                            if (opdr.id == originalOpdracht.id) {
                                this.opdrachten[i] = successResult;
                            }
                            return opdr.id == originalOpdracht.id;
                        });
                        alertService.addAlert({
                            type: "success",
                            timeout: "3000",
                            title: "Success",
                            body: "De opdracht is bijgewerkt."
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
