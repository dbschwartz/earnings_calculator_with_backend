//Declaration of Crud Service
angular.module('myApp')
  .service('crudService', crudService);


// ** crudService ** 

//Dependency Injection

crudService.$inject = ['$http'];


// Declaration of the Crud Service Function 

function crudService($http) {

  return {

    getMeals: function(){
      return $http.get('/meals')
        .then(function(res){
          return res;
        })
        .catch(function(err){
          return err;
        });
    },
    addMeal: function(meal){
      return $http.post('/addmeal', meal)
        .then(function(res){
           return res;
        })
        .catch(function(err){
          return err;
        });
    }
    
  };
}