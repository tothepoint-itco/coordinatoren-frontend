'use strict';

angular.module("coordinatorentoolModels").factory("ConsultantResource", ["$resource", ($resource) => {
    return $resource("http://192.168.99.100:8765/planning/consultants/:id", {id: '@id'}, {

    });
}]);
