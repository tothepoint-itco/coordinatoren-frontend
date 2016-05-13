'use strict';

angular.module("coordinatorentoolModels").factory("BestelbonResource", ["$resource", ($resource) => {
    return $resource("http://192.168.99.100:8765/planning/bestelbonnen/:id", {id: '@id'}, {
        UPDATE: {
            method: 'PUT', url: 'http://192.168.99.100:8765/planning/bestelbonnen/:id' }

    });
}]);
