const $ = require('jquery')
const Food = require('./food')
const Meal = require('./meal')

const breakfast = 1
const lunch = 2
const dinner = 3
const snack = 4

$(function() {
  Meal.allMealsToHTML(breakfast)
    .then(function(foods) {
      $('#breakfast').append(foods)
    })
  Meal.allMealsToHTML(lunch)
    .then(function(foods) {
      $('#lunch').append(foods)
    })
  Meal.allMealsToHTML(dinner)
    .then(function(foods) {
      $('#dinner').append(foods)
    })
  Meal.allMealsToHTML(snack)
    .then(function(foods) {
      $('#snack').append(foods)
    })
})
