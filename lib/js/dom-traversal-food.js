const $ = require('jquery')
const Food = require('./food')

function validateForm() {
  const newFood = getFoodFromForm()
  if ($('.name-validation-error') ||  $('.calories-validation-error')) {
    clearErrors()
    validateName(newFood)
    validateCalories(newFood)
  } else {
    validateName(newFood)
    validateCalories(newFood)
  }
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

function clearForm(){
  $('.add-food-form').trigger('reset')
  clearErrors()
}

function clearErrors() {
  if ($('.name-validation-error') && $('.calories-validation-error')) {
    $('.name-validation-error').empty()
    $('.calories-validation-error').empty()
  } else if ($('.name-validation-error')) {
    $('.name-validation-error').empty()
  } else {
    $('.calories-validation-error').empty()
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
      .then(function(){
        clearForm()
      })
  })

  $('#foods-table').on('click', function(event){
    event.preventDefault()
    if ($(event.target.parentElement).hasClass("delete-button")){
      const foodId = parseInt(event.target.id)
      $(event.target.parentElement.parentElement.parentElement).remove()
      Food.destroy(foodId)
    }
  })
  
  $('#foods-table').on('blur', '.attributes', function(event){
    const id = parseInt(event.target.parentElement.parentElement.id.split("-").pop())
    const attrName = event.target.className
    const attrValue = event.target.textContent
    const objToUpdate = {}
    if (attrName == "calories") {
      objToUpdate[attrName] = parseInt(attrValue)
      Food.updateAttr(id, objToUpdate)
    } else {
      objToUpdate[attrName] = attrValue
      Food.updateAttr(id, objToUpdate)
    }
})


$(function () {
})
