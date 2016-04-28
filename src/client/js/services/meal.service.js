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
    //Meal Service function singleton return object 
  function init() {
    meals = {
      list: [],
      count: 0,
      tipTotal: 0,
      total: 0,
      averageTipPerMeal: 0
    };
  }
  return {
    getMeals: function(){
      init();
      return crudService.getMeals()
        .then(function(list){
          meals.list=list.data.data;
          var id =1;
          meals.list.forEach(function(meal) {
            meal.base_price=parseFloat(meal.base_price);
            meal.tax_rate=parseFloat(meal.tax_rate);
            meal.tip_rate=parseFloat(meal.tip_rate);
            meal.id = id;
            id++;
            meal.tax = meal.tax_rate/100 * meal.base_price;
            meal.subTotal = meal.tax + meal.base_price;
            meal.tip = meal.base_price * meal.tip_rate/100;
            meal.total = meal.subTotal + meal.tip;
          });
          meals.count = meals.list.length;
          meals.list.forEach(function(meal){
            meals.tipTotal+=meal.tip;
            meals.total+=meal.total;
          });
          meals.averageTipPerMeal = meals.tipTotal / meals.count; 
          return meals;
          })
        .catch(function(err){
          console.log(err);
        })
    },


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

    addMeal: function(meal) {
    return crudService.addMeal(meal)
           .then(function(){
              var id = meals.count+1; 
              var newestMealIndex = meals.list.length-1;
              var list = meals.list;
              list[newestMealIndex].id = id;
              list[newestMealIndex].tax = list[newestMealIndex].tax_rate/100 *meal.base_price;
              list[newestMealIndex].subTotal = list[newestMealIndex].tax + list[newestMealIndex].base_price;
              list[newestMealIndex].tip = list[newestMealIndex].base_price * list[newestMealIndex].tip_rate/100;
              list[newestMealIndex].total = list[newestMealIndex].subTotal + list[newestMealIndex].tip;
              meals.tipTotal+=list[newestMealIndex].tip;
              meals.total += list[newestMealIndex].total;
              meals.averageTipPerMeal = meals.tipTotal / meals.count;
              return list[newestMealIndex];
            })
           .catch(function(err){
            console.log(err);
           })
   },
      




    getCurrentMeal: function() {
      // The getCurrentMeal function is utilized by the Charge Controller
      
      // ab the most recent computed meal added to the meal list
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
    
  
  };
}