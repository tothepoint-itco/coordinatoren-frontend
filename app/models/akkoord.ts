'use strict';

angular.module("coordinatorentoolModels").factory("AkkoordResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/planning/akkoorden/:id", {id: '@id'},{
      UPDATE: {
          method: 'PUT'
      }
    });
}]);
