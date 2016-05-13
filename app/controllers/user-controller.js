
'use strict';


angular.module('coordinatorentoolControllers').controller("UserController", ["UserResource", "$uibModal", "$cookies",
function(User, $uibModal, $cookies) {
  User.query(
      (success) => {
          this.users = success;
      }
  );

    //
    // this.deleteBeheerder = (beheerderId) => {
    //     var index = undefined;
    //     var beheerderToDelete = this.beheerders.filter((beheerder, i) => {
    //         if (beheerder.id == beheerderId) { index = i}
    //         return beheerder.id == beheerderId;
    //     });
    //
    //     $uibModal.open(this.createConfirmModal("Beheerder verwijderen", "Ben je zeker dat je beheerder "+beheerderToDelete[0].voorNaam+" "+beheerderToDelete[0].familieNaam+" wil verwijderen?")).result.then(
    //         (success) => {
    //             Beheerder.delete(
    //                 {id: beheerderToDelete[0].id},
    //                 (successResult) => {
    //                     this.beheerders.splice(index, 1);
    //                 },
    //                 (errorResult) => {
    //                 }
    //             );
    //         },
    //         (error) => {
    //             console.log("Nee!");
    //         }
    //     )
    // }
    //
    var createUserModal = {
      templateUrl: "partials/modals/create-user.html",
      controller:"CreateUserController",
      controllerAs:"cusCtrl",
      keyboard: false
    };

    this.createNewUser = () => {
        $uibModal.open(createUserModal).result.then(
            (user) => {
                console.log("Diede %",user.user)
                User.save( user.user,
                    (successResult) => {
                        console.log("User was saved! Result is %o", successResult);
                        this.users.push(successResult);
                    },
                    (errorResult) => {
                        console.log("Saving User failed! Result was %o", errorResult);
                    }
                );
            },
            () => {
                console.log("modal closed!");
            }
        );
    };

}]);
