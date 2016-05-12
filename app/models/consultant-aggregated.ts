'use strict';

angular.module("coordinatorentoolModels").factory("ConsultantAggregatedResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/planning/consultants/aggregated/:id", {id: '@id'}, {

    });
}]);
