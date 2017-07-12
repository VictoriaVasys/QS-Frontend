const $ = require('jquery');
const host = require('./config').host

function destroy(id) {
  $.ajax({
    method: 'DELETE',
    contentType: 'application/json; charset=utf-8',
    url: `${host}/api/v1/mealFoods/${id}`,
    dataType: 'json'
  })
}

module.exports = {
  destroy
}