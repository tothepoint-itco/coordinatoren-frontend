'use strict';

angular.module("coordinatorentoolModels").factory("ConsultantResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/planning/consultants/:id", {id: '@id'}, {

    });
}]);
