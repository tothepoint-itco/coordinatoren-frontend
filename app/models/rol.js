'use strict';

angular.module("coordinatorentoolModels").factory("RolResource", ["$resource",($resource)=>{
  return $resource("http://192.168.99.100:8765/beheer/rollen/:id", {id: '@id'},{

  });
}]);
