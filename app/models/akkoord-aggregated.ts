'use strict';

angular.module("coordinatorentoolModels").factory("AkkoordAggregatedResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/planning/akkoorden/aggregated/:id", {id: '@id'},{

    });
}]);
