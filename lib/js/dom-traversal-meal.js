const $ = require('jquery')
const Food = require('./food')
const Meal = require('./meal')

const meals = {
  breakfast: 1,
  lunch: 2,
  dinner: 3,
  snack: 4
}

$(function() {
  Meal.toHTML(meals.breakfast)
    .then(function(foods) {
      $('#breakfast').append(foods)
    })
  Meal.toHTML(meals.lunch)
    .then(function(foods) {
      $('#lunch').append(foods)
    })
  Meal.toHTML(meals.dinner)
    .then(function(foods) {
      $('#dinner').append(foods)
    })
  Meal.toHTML(meals.snack)
    .then(function(foods) {
      $('#snack').append(foods)
    })

})
