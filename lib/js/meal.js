const $ = require('jquery');
const host = require('./config').host
const Food = require('./food')

function Meal(ajaxMeal) {
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
      // .then(this.makeFoods)
    .then(function(meal) {
      return meal.foods.map(function(food) {
        return new Food(food)
      })
    })
    .then(function(foods) {
      return foods.map(function(food) {
        return food.toHTML()
      })
    })
}


module.exports = Meal
