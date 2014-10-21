demoApp.controller('terryController', function ($scope, terryCustomersService) {
    $scope.customers = terryCustomersService.all();
});