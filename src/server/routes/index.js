var express = require('express');
var router = express.Router();
var queries = require("../../../queries");
var knex = require('../../../db/knex.js');

router.get('/', function(req, res, next) {
  res.sendFile('/index.html');
});


router.get('/meals', function(req, res, next) {
  queries.getMeals().then(function(meals){
    res.status(200).json({
      status: 'success',
      data: meals
    });
  })
  .catch(function(err){
    next(err);
  });
});

router.post('/addmeal', function(req, res,next){
  var meal = req.body;
  queries.addMeal(meal).then(function(){
    res.status(200).json({
      status: 'success',
      data: meal
    });
  })
  .catch(function(err){
    next(err);
  });
});


module.exports = router;