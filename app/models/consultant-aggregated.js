'use strict';

angular.module("coordinatorentoolModels").factory("ConsultantAggregatedResource", ["$resource", ($resource) => {
    return $resource("http://192.168.99.100:8765/planning/consultants/aggregated/:id", {id: '@id'}, {

    });
}]);
