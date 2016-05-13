angular.module("coordinatorentoolModels").factory("UserResource", ["$resource", ($resource) => {
    return $resource("http://192.168.99.100:8765/users:id", {id: '@id'}, {

    });
}]);
