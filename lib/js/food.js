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

// Food.filterAll = function (filterParam, lastColumn) {
//   return Food.allFoodsToHTML(lastColumn)
//     .then(function(allFoods){
//       return allFoods.filter(function(food){
//         return food.includes(filterParam)
//       })
//     })
// }

Food.prototype.toHTML = function(finalColumnAction) {
  const row = this
  return `<tr class="food" id='food-${this.id}'>
            ${columns(row, finalColumnAction)}
          </tr>`
}

function columns(row, action) {
  const deleteButtonColumn = `<td><h4 class='delete-button'><input type="image" src="lib/images/delete-button.png" id=${row.id} /></h4></td>`
  const checkboxColumn = `<td><h4 class='check-box'><input type="checkbox" name="food-for-meal" id=${row.id} ></h4></td>`
  
  let contenteditable = (action == "delete") ? ('contenteditable') : ""
  let finalColumn = (action == "delete") ? (deleteButtonColumn) : (checkboxColumn)
  
  return `<td class = "attributes"><h4 class='name' ${contenteditable}>${row.name}</h4></td>
          <td class = "attributes"><h4 class='calories' ${contenteditable}>${row.calories}</h4></td>
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
  return $.ajax({
    method: 'PUT',
    url: 'http://localhost:3000/api/v1/foods/' + id,
    data: objToUpdate
  })
}

// Food.filter = function(rows) {
//   debugger
//   rows.forEach(function (food){
//     if(food.innerText.toUpperCase != filtered) {
//       food.parentElement.style.display = "none"
//     }
//   })
// }

Food.destroy = function (id) {
  $.ajax({
    method: 'DELETE',
    contentType: 'application/json; charset=utf-8',
    url: `${host}/api/v1/foods/${id}`,
    dataType: 'json'
  })
}

module.exports = Food
