'use strict';

angular.module("coordinatorentoolModels").factory("AkkoordResource", ["$resource",($resource)=>{
  return $resource("http://192.168.99.100:8765/planning/akkoorden/:id", {id: '@id'},{

  });
}]);
