angular.module("coordinatorentoolModels").factory("UserResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/users:id", {id: '@id'}, {

    });
}]);
