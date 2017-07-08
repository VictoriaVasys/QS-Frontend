const $ = require('jquery')
const Food = require('./food')

function validateForm() {
  const newFood = getFoodFromForm()
  validateName(newFood)
  validateCalories(newFood)
}

function validateName(newFood) {
  if(!newFood.name) {
    $('.name-validation-error').html("Please enter a food name")
  }
}

function validateCalories(newFood) {
  if(!newFood.calories) {
    $('.calories-validation-error').html("Please enter a calorie amount")
  }
}

function getFoodFromForm(){
  const name = $('input[name="food-name"]').val()
  const calories = $('input[name="food-calories"]').val()

  return new Food ({
    name: name,
    calories: calories
  })
}

$(function() {
  Food.allFoodsToHTML()
    .then(function(foodsHTML) {
      $('#foods-table').append(foodsHTML)
    })

  $('input[name="add-food-button"]').on('click', function(event){
    event.preventDefault()
    validateForm()
    const newFood = getFoodFromForm()

    newFood.create()
      .then(function(fullFood){
        $('tr[class="column-headers"]').after(fullFood.toHTML())
      })
  })
  
  $('#foods-table').on('click', function(event){
    event.preventDefault()
    
    const foodId = parseInt(event.target.id)
    $(event.target.parentElement.parentElement.parentElement).remove()
    Food.destroy(foodId)
  })
  
})
