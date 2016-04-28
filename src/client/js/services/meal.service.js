// Declaration of Meal Service
angular.module('myApp')
  .service('mealService', mealService);


// ** mealService ** //

//Dependency Injection
mealService.$inject = ['crudService'];



// Declaration of the Meal Service Function 
function mealService(crudService) {

  // container for all meals and $$$ totals
  var meals = {
    list: [],
    count: 0,
    tipTotal: 0,
    total: 0,
    averageTipPerMeal: 0
  };
    //Meal Service function singleto`n return object 
  return {
    // The get getCurrentMealID function grabs the current meal ID 
    // for the details ControllerPage and is used so that the "Enter details for Meal # X"
    // header on the details page displays the proper meal number
    // that the end user is typing amounts for.
    getCurrentMealID: function() {
      // The function returns the current meal ID by returning the current meal count incremented by one
      return meals.count + 1;
    },
    // This function calculates tip and tax amounts for the meal submitted by the Details Controller.
    // The meal is represented by the object parameter named meal.
    getMealTotal: function(meal) {
      // 
      var calculatedMeal = {};
      calculatedMeal.price = meal.price;
      calculatedMeal.taxRate = meal.taxrate;
      calculatedMeal.tax = meal.taxrate / 100 * meal.price;
      calculatedMeal.subTotal = calculatedMeal.tax + meal.price;
      calculatedMeal.tipRate =meal.tiprate;
      calculatedMeal.tip = meal.price * meal.tiprate / 100;
      calculatedMeal.total = calculatedMeal.subTotal + calculatedMeal.tip;
      return calculatedMeal;
    },
    // The addMeal function adds the result of the calculated meal above 
    // to the meal list
    addMeal: function(calculatedMeal) {
      //The if statement assigns an id to each meal.
      //If there are no meals the first meal will be assigned an id of 1,
      // and each subsequent meal will have an id of the meal count incremented
      // by one, similar to current meal id above.
      if(meals.count === 0) {
        calculatedMeal.id = 1;
      } else{
        calculatedMeal.id = meals.count+1;
      }
      // The code below pushes the calculated meal object to the mealSerivce meals array,
      // meals.list  . Subsequently the listwide count, tipTotal, total, and averageTipPerMeal
      // amounts are updated
      crudService.addMeal(calculatedMeal);
      //meals.list.push(calculatedMeal);
      meals.count += 1;
      meals.tipTotal += calculatedMeal.tip;
      meals.total += calculatedMeal.total;
      meals.averageTipPerMeal = meals.tipTotal/meals.count;
      return meals;
    },
    getCurrentMeal: function() {
      // The getCurrentMeal function is utilized by the Charge Controller
      // to grab the most recent computed meal added to the meal list
      var currentMealIndex = meals.list.length-1;
      // I was trying to have No meals have been added! displayed on the Charges
      // page if no meals had been submitted by the user.  This could probably done
      // with an ng-show attribute on the charges page.
      if(meals.list.length===0) {
        return 'No Meals have been added!';
      } else {
        return meals.list[currentMealIndex];
      }
    },
    // The getMealList function is used by the Earings Controler to grab all computed
    // meals that have been added to the meal list
    getMealList: function() {
      meals = crudService.getMeals();
      return meals;
    },
    // The resetMealList function is used by the Earnings Controller to completely reset the
    // app.  I am not sure why it is necessary to return meals if there is 2 way data binding.
    resetMealList: function() {
      meals= {
        list: [],
        count: 0,
        tipTotal: 0,
        total: 0,
        averageTipPerMeal: 0
      };
     }
  };
}