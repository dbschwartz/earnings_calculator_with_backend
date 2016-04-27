var knex = require('./db/knex.js');
var meals = function(){
  return knex('meals');
};

module.exports = {
  getMeals: function() {
    return meals().select();
  },
  addMeal: function(meal) {
    return meals().insert({base_price: meal.base_price,
                           tip_rate: meal.tip_rate,
                           tax_rate: meal.tax_rate});
  }
};
