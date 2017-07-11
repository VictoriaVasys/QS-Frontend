const $ = require('jquery');
const host = require('./config').host

function Food(entry) {
  this.id = entry.id
  this.name = entry.name
  this.calories = entry.calories
  this.createdat = entry.createdat
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

Food.prototype.toHTML = function(lastColumn) {
  if (lastColumn == "delete"){
    return `<tr class="food" id='food-${this.id}'>
              <td class = "attributes"><h4 class='name' contenteditable>${this.name}</h4></td>
              <td class = "attributes"><h4 class='calories' contenteditable>${this.calories}</h4></td>
              <td><h4 class='delete-button'><input type="image" src="lib/images/delete-button.png" id=${this.id} /></h4></td>
            </tr>`
  } else if (lastColumn == "checkBox") {
    return `<tr class="food" id='food-${this.id}'>
              <td class = "attributes"><h4 class='name'>${this.name}</h4></td>
              <td class = "attributes"><h4 class='calories'>${this.calories}</h4></td>
              <td><h4 class='check-box'><input type="checkbox" name="food-for-meal" id=${this.id} ></h4></td>
            </tr>`
  }
}

Food.prototype.create = function () {
  return $.post(`${host}/api/v1/foods`,
    { name: this.name, calories: this.calories } )
      .then(function(foodObject){
        return new Food(foodObject[foodObject.length-1])
      })
}

Food.updateAttr = function(id, objToUpdate){
  if (objToUpdate.name) {
    const data = { name: objToUpdate.name}
    return $.ajax({
      method: 'PUT',
      url: 'http://localhost:3000/api/v1/foods/' + id,
      data: data,
    })
  } else if (objToUpdate.calories) {
    const data = { calories: objToUpdate.calories}
    return $.ajax({
      method: 'PUT',
      url: 'http://localhost:3000/api/v1/foods/' + id,
      data: data,
    })
  }
  
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
