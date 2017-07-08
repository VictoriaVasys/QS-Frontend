const $ = require('jquery')
const Food = require('./food')

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
    const newFood = getFoodFromForm()

    newFood.create()
      .then(function(fullFood){
        $('#foods-table').append(fullFood.toHTML())
      })
  })
})
