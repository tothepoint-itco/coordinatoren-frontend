'use strict';

angular.module("coordinatorentoolModels").factory("BeheerderResource", ["$resource", "EnvironmentConfig", ($resource, $env) => {
    return $resource($env.api + "/beheer/beheerders/:id", {id: '@id'},{

    });
}]);
