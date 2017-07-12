const $ = require('jquery')
const Food = require('./food')

function validateForm() {
  const newFood = getFoodFromForm("delete")
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
  Food.allFoodsToHTML("delete")
    .then(function(foodsHTML) {
      $('#foods-table').append(foodsHTML)
    })

  $('input[name="add-food-button"]').on('click', function(event){
    event.preventDefault()
    validateForm()
    const newFood = getFoodFromForm()

    newFood.create()
      .then(function(fullFood){
        $('tr[class="column-headers"]').after(fullFood.toHTML("delete"))
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
    if (attrName == "calories") {
      Food.updateAttr(id, {calories: parseInt(attrValue)})
    } else if (attrName == "name"){
      Food.updateAttr(id, {name: attrValue})
    }
  })
  
  $('input[name="food-filter"]').keyup(function() {
    const filterParam = $('input[name="food-filter"]').val()
    const filtered = filterParam.toUpperCase()
    const foodRows = document.getElementsByClassName('name')
    // Food.filter(foodRows)
    
    for (var i = 0; i < foodRows.length; i++) {
      var foodName = foodRows[i].innerText
      if (foodName.toUpperCase().indexOf(filtered) < 0) {
        foodRows[i].parentElement.parentElement.style.display = "none"
      } else {
        foodRows[i].parentElement.parentElement.style.display = ""
      }
    }
    
    // Food.filterAll(filterParam, "delete")
    //   .then(function(foodsHTML) {
    //     const headers = $('#foods-table .column-headers')
    //     $('#foods-table tr').remove()
    //     debugger
    //     $('#foods-table').append(headers).append(foodsHTML)
    //   })
  })

})
		  
$(function () {
  Food.allFoodsToHTML("checkBox")
    .then(function(foodsHTML) {
      $('#diary-foods-table').append(foodsHTML)
    })
})
