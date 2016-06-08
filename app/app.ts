'use strict';

// Declare app level module which depends on views, and components
var coordinatorentool = angular.module('coordinatorentool', [
    'coordinatorentoolConfigs',
    'coordinatorentoolControllers',
    'coordinatorentoolServices',
    'coordinatorentoolModels',
    'ngCookies',
    'angular-jwt',
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker'
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

coordinatorentool.directive("timelineOverview", function() {
    return {
        restrict: "E",
        controller: "TimelineOverviewController",
        controllerAs: "timeOCtrl",
        scope: {
            data: '='
        },
        templateUrl: "partials/timeline-overview-directive.html"
    };
});

coordinatorentool.config(['$routeProvider','$httpProvider','jwtInterceptorProvider', function($routeProvider, $httpProvider, jwtInterceptorProvider) {
    $routeProvider
    .when('/business-units', {
        templateUrl: "partials/business-units.html",
        controller: "BusinessUnitController",
        controllerAs: "businessCtrl",
        requiresLogin: true
    })
    .when('/planning', {
        templateUrl: "partials/planning.html",
        controller: "PlanningController",
        controllerAs: "planningCtrl",
        requiresLogin: true
    })
    .when('/bestelbonnen', {
        templateUrl: "partials/bestelbonnen.html",
        controller: "BestelbonController",
        controllerAs: "bestelbonCtrl",
        requiresLogin: true
    })
    .when('/rollen', {
        templateUrl: "partials/rollen.html",
        controller: "RolController",
        controllerAs: "rolCtrl",
        requiresLogin: true

    })
    .when('/login', {
        templateUrl: "partials/login.html",
        controller: "LoginController",
        controllerAs: "loginCtrl",
        requiresLogin: false
    })
    .when('/opdrachten', {
        templateUrl: "partials/opdrachten.html",
        controller: "OpdrachtController",
        controllerAs: "opdrachtCtrl",
        requiresLogin: true
    })
    .when('/akkoorden', {
        templateUrl: "partials/akkoorden.html",
        controller: "AkkoordController",
        controllerAs: "akkoordCtrl",
        requiresLogin: true
    })
    .when('/beheerders', {
        templateUrl: "partials/beheerders.html",
        controller: "UserController",
        controllerAs: "userCtrl",
        requiresLogin: true
    })

    .when('/bediendes/:bediendeId', {
        templateUrl: "partials/bediende-details.html",
        controller: "BediendeDetailsController",
        controllerAs: "bediendeDetailsCtrl",
        requiresLogin: true
    })
    .when('/bediendes', {
        templateUrl: "partials/bediendes.html",
        controller: "BediendeController",
        controllerAs: "bediendeCtrl",
        requiresLogin: true
    })
    .when('/contracts', {
        templateUrl: "partials/contracts.html",
        controller: "ContractController",
        controllerAs: "contractCtrl",
        requiresLogin: true
    })
    .otherwise({redirectTo: '/business-units'});

    jwtInterceptorProvider.tokenGetter = ['$cookies', function($cookies) {
        //console.log("app.js %o", $cookies.get('Authorization'));
        return $cookies.get('Authorization');
    }];
    $httpProvider.interceptors.push('jwtInterceptor');
}])
.run(['$rootScope', '$location', '$cookies',
    function($rootScope, $location, $cookies) {

    $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.$$route != undefined && next.$$route.requiresLogin) {
                if ($cookies.get('Authorization') == null) {
                    event.preventDefault();
                    $location.path('/login');
                }
            }
    })
}]);
