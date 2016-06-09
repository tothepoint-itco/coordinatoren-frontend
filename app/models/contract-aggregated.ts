'use strict';

angular.module("coordinatorentoolModels").factory("ContractAggregatedResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/contracts/aggregated/:id", {id: '@id'}, {

    });
}]);
