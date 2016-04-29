'use strict';

angular.module("coordinatorentoolModels").factory("BeheerderResource", ["$resource",($resource)=>{
  return $resource("http://192.168.99.100:8765/beheer/beheerders/:id", {id: '@id'},{

  });
}]);
