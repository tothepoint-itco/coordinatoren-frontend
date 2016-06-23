'use strict',

angular.module('coordinatorentoolControllers').controller('OpdrachtController', ["OpdrachtResource", "$uibModal","$scope",
function(Opdracht, $uibModal, $scope) {
    $scope.propertyName = 'klant';
    Opdracht.query(
        (success) => {
            this.opdrachten = success;
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
                    },
                    (errorResult) =>{

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
                        console.log("Opdracht was saved! Result is %o", successResult);
                        this.opdrachten.push(successResult);
                    },
                    (errorResult) => {
                        console.log("Saving Opdracht failed! Result was %o", errorResult);
                    }
                );
            },
            ()=>{
                console.log("modal closed!")
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
                    },
                    (errorResult) => {
                        console.log("Saving Opdracht failed! Result was %o", errorResult);
                    }
                );
            },
            ()=>{
                console.log("modal closed!")
            }
        );
    };
}]);
