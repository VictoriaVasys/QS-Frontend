const $ = require('jquery')
const Food = require('./food')
const Meal = require('./meal')

let total = 0
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
  Meal.totalCalories(meals.breakfast)
    .then(function(calories){
      $('td[id="breakfast-calories"]').append(calories)
      let total = 0
      $('#breakfast .calories').each(function(){
        total += parseInt(this.innerHTML)
      })
      $('td[id="remaining-breakfast-calories"]').append(calories - total)
    })


  Meal.totalCalories(meals.lunch)
    .then(function(calories){
      $('td[id="lunch-calories"]').append(calories)
      let total = 0
      $('#lunch .calories').each(function(){
        total += parseInt(this.innerHTML)
      })
      $('td[id="remaining-lunch-calories"]').append(calories - total)
    })

  Meal.totalCalories(meals.dinner)
    .then(function(calories){
      $('td[id="dinner-calories"]').append(calories)
      let total = 0
      $('#dinner .calories').each(function(){
        total += parseInt(this.innerHTML)
        $('td[id="remaining-dinner-calories"]').append(calories - total)
      })
    })

  Meal.totalCalories(meals.snack)
    .then(function(calories){
      $('td[id="snack-calories"]').append(calories)
      let total = 0
      $('#snack .calories').each(function(){
        total += parseInt(this.innerHTML)
      })
      $('td[id="remaining-snack-calories"]').append(calories - total)
    })
})
