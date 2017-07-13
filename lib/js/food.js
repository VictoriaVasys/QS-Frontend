const $ = require('jquery');
const host = require('./config').host

function Food(entry) {
  this.id = entry.id
  this.name = entry.name
  this.calories = entry.calories
  this.createdat = entry.createdat
  this.mealFoodId = entry.mealfoodid || 0
}

Food.getAllFoods = function() {
  return $.getJSON(`${host}/api/v1/foods`)
}

Food.allFoodsToHTML = function(lastColumn) {
  return this.getAllFoods()
    .then(function(foods) {
      return foods.map(function(food) {
        return new Food(food)
      })
    })
    .then(function(foods) {
      return foods.map(function(food) {
        return food.toHTML(lastColumn)
      }).reverse()
    })
}

Food.prototype.toHTML = function(finalColumnAction) {
  const food = this
  return `<tr class="food" id='food-${this.id}'>
            ${columns(food, finalColumnAction)}
          </tr>`
}

function columns(food, action) {
  const deleteFoodColumn = `<td><h4 class='delete-button'><input type="image" src="lib/images/delete-button.png" id=${food.id} /></h4></td>`
  const checkboxColumn = `<td><h4 class='check-box'><input type="checkbox" class="food-checks" name="food-for-meal" id=${food.id} /></h4></td>`
  const deleteMealFoodColumn = `<td><h4 class='delete-button'><input type="image" src="lib/images/delete-button.png" id=${food.id} name=${food.mealFoodId} /></h4></td>`

  let finalColumn = ""
  if (action == "delete") {
    finalColumn = deleteFoodColumn
  } else if (action == "checkBox") {
    finalColumn = checkboxColumn
  } else if (action == "delete mealFood") {
    finalColumn = deleteMealFoodColumn
  }
  const contenteditable = (action == "delete") ? ('contenteditable') : ""

  return `<td class = "attributes"><h4 class='name' ${contenteditable}>${food.name}</h4></td>
          <td class = "attributes"><h4 class='calories' ${contenteditable}>${food.calories}</h4></td>
          ${finalColumn}`
}

Food.prototype.create = function () {
  return $.post(`${host}/api/v1/foods`,
    { name: this.name, calories: this.calories } )
      .then(function(foodObject){
        return new Food(foodObject[foodObject.length-1])
      })
}

Food.updateAttr = function(id, objToUpdate){
  $.ajax({
    method: 'PUT',
    url: `${host}/api/v1/foods/` + id,
    data: objToUpdate
  })
}

Food.destroy = function (id) {
  $.ajax({
    method: 'DELETE',
    contentType: 'application/json; charset=utf-8',
    url: `${host}/api/v1/foods/${id}`,
    dataType: 'json'
  })
}

module.exports = Food
