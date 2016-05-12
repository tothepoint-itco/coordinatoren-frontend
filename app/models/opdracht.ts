'use strict';

angular.module("coordinatorentoolModels").factory("OpdrachtResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/planning/opdrachten/:id", {id: '@id'}, {

    });
}]);
