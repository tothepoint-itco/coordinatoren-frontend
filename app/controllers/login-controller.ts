angular.module('coordinatorentoolControllers').controller("LoginController",
["LoginResource","$uibModal","$cookies",
function(Login, $uibModal, $cookies) {
    this.credentials = {};
    this.authenticationRequest ={};
    this.token = {};

    this.ok = () => {
        Login.save(this.credentials,
            (success)=>{
                console.log("Token %", success.token)
                $cookies.putObject('Authorization', success.token);
                console.log("Success %o", $cookies.getObject('Authorization'));
                location.href = "#/planning";
            },
            (error) => {
                alertService.addAlert({
                    type: "danger",
                    timeout: "3000",
                    title: "HTTP Error",
                    body: "Het is niet gelukt om in te loggen."
                });
            }
        )

    };
}]);
