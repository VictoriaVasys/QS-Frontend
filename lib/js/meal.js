const $ = require('jquery');
const host = require('./config').host
const Food = require('./food')

function Meal(ajaxMeal) {
  this.mealCalories = 0
  this.caloricGoal = ajaxMeal.caloricGoal
  this.foods = ajaxMeal.foods
}

Meal.getMeal = function(mealId) {
  return $.getJSON(`${host}/api/v1/meals/${mealId}`)
}

Meal.newFromObject = function(ajaxMeal) {
  return new Meal(ajaxMeal)
}

Meal.toHTML = function (meal) {
  return this.fromAPIToHTML(this.getMeal(meal))
}

Meal.fromAPIToHTML = function (APIResponse){
  return APIResponse
    .then(Meal.newFromObject)
      .then(function(meal) {
        return meal.foods.map(function(food) {
          return new Food(food)
        })
      })
      .then(function(foods) {
        return foods.map(function(food) {
          return food.toHTML('delete')
        })
      })
}

Meal.findCalories = function (APIResponse) {
  return APIResponse
    .then(Meal.newFromObject)
      .then(function(meal) {
        return meal.caloricGoal
      })
}

Meal.totalCalories = function(meal) {
  return this.findCalories(this.getMeal(meal))
}

Meal.mealCalories = function (meal) {
  let mealCalories = 0
   Meal.getMeal(meal)
    .then(function(meal){
      return meal.foods.forEach(function(food){
        return mealCalories = mealCalories + food.calories
      })
    })
}

module.exports = Meal
