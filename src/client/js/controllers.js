// Initializating controllers without app variable  



angular.module('myApp')
  .controller('detailsCtrl', detailsCtrl)
  .controller('chargesCtrl', chargesCtrl)
  .controller('earningsCtrl', earningsCtrl);


// ** detailsCtrl ** //

// Dependency Injection for Details Controller 
detailsCtrl.$inject = ['$scope', 'mealService'];

// Details Controller declaration
function detailsCtrl($scope, mealService) {
  // The $scope.currentMeal variable is the value of the meal id that 
  // would be assigned if the user clicks Add Meal on the details page.
  // The number is prominently displayed as X in the header "Enter details for Meal # 1"
  // on the details page.
  // The $scope.currentMeal variable receives its value by calling the mealService 
  // getCurrentMealID function and storing its return value.  
  
  $scope.currentMeal = mealService.getCurrentMealID() 
  //The $scope.getMeal function calculates the tip and tax totals for the meal entered on
  // the details page.  It does this by doing the following:
  // 1. Using ng-submit in charges.html to receive the request body in the form of the parameter
  // meal.
  // 2. Sending mealService.getMealTotal() the meal request body mentioned above.  
  // mealService.getMealTotal() performs all of the necessary measures to calculate the
  // tax, subtotal, tip and total of the meal and the output is stored in calculatedMeal
  // a la var calculatedMeal = mealService.getMealTotal(meal);.
  // 3. Then the calculated meal is added to the meal list by invoking the mealService
  // add meal function, a la mealService.addMeal(calculatedMeal);
  // 4. Then the currentMeal value is incremented so that Enter details for Meal # X
  // will display a number for the next meal to be entered.
  // 5. Finally this.meal = {}; clears the form on the details page but I am not exactly
  // sure why.  I modelled this from an example


 
  $scope.getMeal = function(meal){
    var calculatedMeal = mealService.getMealTotal(meal);
    mealService.addMeal(calculatedMeal);
    $scope.currentMeal = mealService.getCurrentMealID()
    this.meal = {};
  };
}


// ** chargesCtrl ** //

// Dependency Injection for changes conroller injecting $scope and mealService.
chargesCtrl.$inject = ['$scope', 'mealService'];

// Changes Controller declaration
function chargesCtrl($scope, mealService) {
  // $scope.currentMeal uses the mealService.getCurrentMeal() function
  // to grab the latest computed meal object added to the list. This is
  // used so the user can review the computed amounts for the details he/she
  // just entered.
  $scope.currentMeal = mealService.getCurrentMeal();
}


// ** earningsCtrl ** //
// Dependency Injection for earnings conroller injecting $scope and mealService.
earningsCtrl.$inject = ['$scope', 'mealService'];

// Earnings Controller Declaration
function earningsCtrl($scope, mealService) {
  // The $scope.mealList variable invokes the mealService.getMealList() function
  // to grab all the computed meals that have been added tot he meal list.  Here
  // it seems the data updates automatically
  $scope.mealList = mealService.getMealList();
  // The $scope.resetMeals function invokes the mealService.resetMealList() function
  // to reset the meals object and completely reset the app.  However, I was only able
  // to do this by reassigning the $scope.mealList to the now empty mealService meals 
  // object a la $scope.mealList = mealService.getMealList();.  I am still not sure
  // why I need to do this.
  $scope.resetMeals = function(){
    mealService.resetMealList();
    $scope.mealList = mealService.getMealList();
  };
}
