angular.module('coordinatorentoolControllers').controller("MainController",
["$scope","$cookies",
function($scope, $cookies) {


    $scope.logout = () => {
                //$cookies.get('Authorization');

                $cookies.remove('Authorization');
                console.log("Logged out");
            }
    $scope.isAuthorized = () =>{
        if($cookies.get('Authorization') != null){
            return true;
        }
        else{
            return false;
        }
}
}]);
