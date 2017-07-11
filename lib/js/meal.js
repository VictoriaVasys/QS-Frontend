const $ = require('jquery');
const host = require('./config').host

// create new meal class
class Meal () {
  constructor (entry) {
  this.id = entry.id
  this.name = entry.name
  this.caloricGoal = entry.caloricGoal
  this.foods = entry.foods
  }

  static getAllMeals() {
    return $.getJSON(`${host}/api/v1/foods`)
  }

  static createMeals(meals) {
    meals.map(function(meal) {
      return new Meal(meal)
    })
  }
  static allMealsToHTML() {
    createMeals(getAllMeals)
      .then(meals) {
        return meals.map(function(meal) {
          return meal.toHTML()
        })
      }
  }

  toHTML() {
    $('')
  }
}
