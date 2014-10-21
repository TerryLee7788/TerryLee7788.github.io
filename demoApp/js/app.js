var demoApp = angular.module('demoApp', ['ngRoute']);

demoApp.config(function ($routeProvider) {
    $routeProvider
        .when('/customers',
            {
                controller: 'terryController',
                templateUrl: './template/customers.html'
            })
        .otherwise({ redirectTo: '/customers' });
});