'use strict';

// Declare app level module which depends on views, and components
var coordinatorentool = angular.module('coordinatorentool', [
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



coordinatorentool.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/business-units', {
        templateUrl: "partials/business-units.html",
        controller: "BusinessUnitController",
        controllerAs: "businessCtrl"
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
