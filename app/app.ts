'use strict';

// Declare app level module which depends on views, and components
var coordinatorentool = angular.module('coordinatorentool', [
    'coordinatorentoolConfigs',
    'coordinatorentoolControllers',
    'coordinatorentoolServices',
    'coordinatorentoolModels',
    'ngRoute',
    'ngResource',
    'ui.bootstrap'
]);

angular.module('coordinatorentoolControllers', []);
angular.module('coordinatorentoolServices', []);
angular.module('coordinatorentoolModels', []);

coordinatorentool.directive("timeline", function() {
    return {
        restrict: "E",
        controller: "TimelineController",
        controllerAs: "timeCtrl",
        scope: {
            data: '='
        },
        templateUrl: "partials/timeline-directive.html"
    };
});


coordinatorentool.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/business-units', {
        templateUrl: "partials/business-units.html",
        controller: "BusinessUnitController",
        controllerAs: "businessCtrl"
    })
    .when('/planning', {
        templateUrl: "partials/planning.html",
        controller: "PlanningController",
        controllerAs: "planningCtrl"
    })
    .when('/bestelbonnen', {
        templateUrl: "partials/bestelbonnen.html",
        controller: "BestelbonController",
        controllerAs: "bestelbonCtrl"
    })
    .when('/rollen', {
        templateUrl: "partials/rollen.html",
        controller: "RolController",
        controllerAs: "rolCtrl"
    })
    .when('/login', {
        templateUrl: "partials/login.html",
        controller: "LoginController",
        controllerAs: "loginCtrl"
    })
    .when('/opdrachten', {
        templateUrl: "partials/opdrachten.html",
        controller: "OpdrachtController",
        controllerAs: "opdrachtCtrl"
    })
    .when('/akkoorden', {
        templateUrl: "partials/akkoorden.html",
        controller: "AkkoordController",
        controllerAs: "akkoordCtrl"
    })
    .when('/beheerders', {
        templateUrl: "partials/beheerders.html",
        controller: "BeheerderController",
        controllerAs: "beheerderCtrl"
    })

    .when('/bediendes/:bediendeId', {
        templateUrl: "partials/bediende-details.html",
        controller: "BediendeDetailsController",
        controllerAs: "bediendeDetailsCtrl"
    })
    .when('/bediendes', {
        templateUrl: "partials/bediendes.html",
        controller: "BediendeController",
        controllerAs: "bediendeCtrl"
    })
    .when('/contracts', {
        templateUrl: "partials/contracts.html",
        controller: "ContractController",
        controllerAs: "contractCtrl"
    })
    .otherwise({redirectTo: '/business-units'});
}]);
