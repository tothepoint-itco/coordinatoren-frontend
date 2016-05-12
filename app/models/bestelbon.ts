'use strict';

angular.module("coordinatorentoolModels").factory("BestelbonResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/planning/bestelbonnen/:id", {id: '@id'}, {

    });
}]);
