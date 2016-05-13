'use strict';

angular.module("coordinatorentoolModels").factory("BusinessUnitResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/business-units/:id", {id: '@id'}, {
        UPDATE: {
            method: 'PUT'
        }
    });
}]);
