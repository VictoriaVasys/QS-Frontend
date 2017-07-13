const $ = require('jquery');
const host = require('./config').host
const Meal = require('./meal')

function destroy(id, mealId, mealName) {
  $.ajax({
    method: 'DELETE',
    contentType: 'application/json; charset=utf-8',
    url: `${host}/api/v1/mealFoods/${id}`,
    dataType: 'json'
  })
    .then(function () {
      Meal.updateTable(mealId, mealName)
    })
}

function create(mealId, foodId) {
  return $.post(`${host}/api/v1/mealFoods`, { mealId: mealId, foodId: foodId})
}

module.exports = {
  destroy,
  create
}