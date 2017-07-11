const $ = require('jquery');
const host = require('./config').host
const Food = require('./food')

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
      return meal.foods.map(function(food){
        return new Food(food)
      })
    })
  }

  static fetchMealFoods() {
    createMeals(getAllMeals)
      .then(meals) {
        return meals.map(function(meal) {
          var pry = require('pryjs'); eval(pry.it);
          return meal.toHTML()
        })
      }
  }

  toHTML() {
    $('')
  }
}
//make call to database
//turn objects into html
// create new table for each meal
// each table should have name and totol calorie count
