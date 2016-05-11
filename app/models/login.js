angular.module("coordinatorentoolModels").factory("LoginResource", ["$resource", ($resource) => {
    return $resource("http://192.168.99.100:8765/beheer/auth/", {}, {
        save: {
            method: "POST",
            header: {
                "Content-Type":"application/json"
            }
        }
    });
}]);
