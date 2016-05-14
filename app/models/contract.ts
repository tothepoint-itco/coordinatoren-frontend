'use strict';

angular.module("coordinatorentoolModels").factory("ContractResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/contracts/:id", {id: '@id'}, {
        UPDATE: {
            method: 'PUT'
        }
    });
}]);
