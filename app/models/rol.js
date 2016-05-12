'use strict';

angular.module("coordinatorentoolModels").factory("RolResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
  return $resource($env.api + "/beheer/rollen/:id", {id: '@id'},{

  });
}]);
