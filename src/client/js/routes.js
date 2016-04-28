// Initialzation of route configuration object
angular.module('myApp')
  .config(routeConfig);


// ** routeConfig ** //

// dependency of the route provider service
routeConfig.$inject = ['$routeProvider'];

// declaration of route config function that uses routeProvider service
// to define routes
function routeConfig($routeProvider) {
  $routeProvider
    .when('/details', {
      templateUrl: 'templates/details.html',
      controller: 'detailsCtrl'
    })
    .when('/charges', {
      templateUrl: 'templates/charges.html',
      controller: 'chargesCtrl'
    })
    .when('/earnings', {
      templateUrl: 'templates/earnings.html',
      controller: 'earningsCtrl'
    })
    .otherwise('/details');
}