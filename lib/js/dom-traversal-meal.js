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
const mealCalories = {
  "breakfast" : 400,
  "lunch" : 600,
  "dinner" : 800,
  "snack" : 200
}

$(function() {
  Object.keys(mealCalories).forEach(function(meal){
    console.log(meals[meal])
    Meal.toHTML(meals[meal])
    .then(function(foods) {
      $(`#${meal}`).append(foods)
    })
    Meal.totalCalories(meals[meal])
    .then(function(calories){
      $(`td[id="${meal}-calories"]`).append(calories)
      let total = 0
      $(`#${meal} .calories`).each(function(){
        total += parseInt(this.innerHTML)
      })
      $(`td[id="remaining-${meal}-calories"]`).append(calories - total)
    })
  })
})
