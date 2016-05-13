'use strict';

angular.module("coordinatorentoolModels").factory("BusinessUnitResource", ["$resource", ($resource) => {
    return $resource("http://192.168.99.100:8765/business-units/:id", {id: '@id'}, {
        UPDATE: {
            method: 'PUT', url: 'http://192.168.99.100:8765/business-units/:id' }

    });
}]);
