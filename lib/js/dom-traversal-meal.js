const $ = require('jquery')
const Food = require('./food')
const Meal = require('./meal')
const MealFood = require('./meal-food')

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

function uncheckCheckboxes() {
  $('#diary-foods-table input:checked').prop('checked', false)
}

function createMealTable() {
  Object.keys(mealCalories).forEach(function(meal){
    Meal.toHTML(meals[meal])
    .then(function(foods) {
      $(`#${meal}`).append(foods)
    }).then(function () {
      
    
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
}

$(function() {
  Food.allFoodsToHTML("checkBox")
    .then(function(foodsHTML) {
      $('#diary-foods-table').append(foodsHTML)
    })
    
    $('.meal-table').on('click', function(event){
      event.preventDefault()
      if ($(event.target.parentElement).hasClass("delete-button")){
        const foodId = parseInt(event.target.id)
        $(event.target.parentElement.parentElement.parentElement).remove()
        const mealFoodId = parseInt(event.target.name)
        MealFood.destroy(mealFoodId)
      }
    })
    
  createMealTable()
  
  $('button#add-food-to-meal-button').on('click', function(event){
    event.preventDefault()
    
    const mealName = $('#meal-dropdown option:selected')[0].value
    const mealId = meals[mealName]
    
    const foods = $('#diary-foods-table input:checked')
    foods.each(function(i){
      var foodId = this.id
      MealFood.create(mealId, parseInt(foodId)).then(function(){
        if (i == foods.length-1) {
          Meal.updateTable(mealId, mealName)
          uncheckCheckboxes()
        }
      })
    })
  })
})
