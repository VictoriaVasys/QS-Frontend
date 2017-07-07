const $ = require('jquery')
const Food = require('./food')

$(function() {
  Food.allFoodsToHTML()
    .then(function(foodsHTML) {
      $('#foods-table').append(foodsHTML)
    })
})
