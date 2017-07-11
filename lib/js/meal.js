const $ = require('jquery');
const host = require('./config').host
const Food = require('./food')

// function Meal(entry) {
//   this.id = entry.id
//   this.caloricGoal = entry.caloricGoal
//   this.foods = entry.foods
// }

var Meal = {}

Meal.getMeal = function(mealName) {
  return $.getJSON(`${host}/api/v1/meals/${mealName}`)
}

Meal.newFromObject = function(meal) {
  return new Meal(meal)
}

Meal.allMealsToHTML = function (meal) {
  return this.fromAPIToHTML(this.getMeal(meal))
}

Meal.fromAPIToHTML = function (APIResponse){
  return APIResponse
    // .then(Meal.newFromObject)
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
//make call to database
//turn objects into html
// create new table for each meal
// each table should have name and totol calorie count
