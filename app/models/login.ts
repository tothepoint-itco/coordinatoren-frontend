angular.module("coordinatorentoolModels").factory("LoginResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/auth/", {}, {
        
    });
}]);
