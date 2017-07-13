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
    Meal.toHTML(meals[meal])
    .then(function(foods) {
      $(`#${meal}`).append(foods)
    })
    Meal.totalCalories(meals[meal])
    .then(function(calories) {
      $(`td[id="${meal}-calories"]`).append(calories)
      let remainingCals = calories
      $(`#${meal} .calories`).each(function(){
        remainingCals -= parseInt(this.innerHTML)
      })
      .promise()
      .done(function(){
        if (remainingCals >= 0) {
          $(`td[id="remaining-${meal}-calories"]`)
            .append(remainingCals)
            .css('color', 'green')
        } else {
          $(`td[id="remaining-${meal}-calories"]`)
            .append(remainingCals)
            .css('color', 'red')
        }

      })
    })
  })
})
