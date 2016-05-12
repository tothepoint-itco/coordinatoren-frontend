'use strict';

angular.module("coordinatorentoolModels").factory("BediendeResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/bediendes/:id", {id: '@id'}, {

    });
}]);
