angular.module('coordinatorentoolControllers').controller("LoginController",
["LoginResource","$uibModal","$cookies",
function(Login, $uibModal, $cookies) {
    this.credentials = {};
    this.authenticationRequest ={};


    this.ok = () => {
        Login.save(this.credentials,
            (success)=>{
                $cookies.putObject('auth_token',success);
                console.log("Success %o", $cookies.getObject('auth_token'));
            }
        )
    };
}]);
