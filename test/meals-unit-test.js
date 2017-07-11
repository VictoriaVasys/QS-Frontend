const assert = require("chai").assert
const request = require("request")
const environment = process.env.NODE_ENV || 'development'
const Meal = require('../lib/js/meal')

describe('Meal', function() {
  it('#getAllMeals', function(done) {
    Meal.getMeals(1)
    .then(function(meals) {
      var pry = require('pryjs'); eval(pry.it);
      meals.forEach(function(meal) {
        assert.lengthOf(meal, 3)
      })
    })
    done()
  })
})
