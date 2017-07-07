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

Food.allFoodsToHTML = function() {
  return this.getAllFoods()
    .then(function(foods) {
      return foods.map(function(food) {
        return new Food(food)
      })
    })
    .then(function(foods) {
      return foods.map(function(food) {
        return food.toHTML()
      })
    })
}

Food.prototype.toHTML = function() {
  return `<tr class="food" data-id=${this.id}>
            <td><h4>${this.name}</h4></td>
            <td><h4>${this.calories}</h4></td>
          </tr>`
}

module.exports = Food
