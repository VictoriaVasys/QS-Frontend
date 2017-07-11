const $ = require('jquery');
const host = require('./config').host
const Food = require('./food')

// create new meal class
function Meal(entry) {
  debugger
  this.id = entry.id
  this.foodName = data.name
  this.foodCalories = data.calories
  this.caloricGoal = entry.caloricGoal
  this.foods = entry.foods
  }

Meal.getMeals = function() {
  return $.getJSON(`${host}/api/v1/meals/${mealName}`)
}

Meal.allMealsToHTML = function () {
  return this.getMeals(meal) {
    .then(function(meals) {
      return meals.map(function(meal) {
        return new Meal(meal)
      })
    })
    .then(funciton(meals) {
      return meals.map(function(meal) {
        return meal.foodsToHTML(meal)
      })
    })
  })
}

Meal.prototype.foodsToHTMl = function(meal) {
  return `<tr class="meal-foods" data-id="${this.id}">
            <td><h4 class='name' contenteditable>${this.foodName}</h4></td>
            <td><h4 class='calories' contenteditable>${this.foodCalories}</h4></td>
            <td><h4 class='delete-button'><input type="image" src="lib/images/delete-button.png" id=${this.id} /></h4></td>
          </tr>`
}

//make call to database
//turn objects into html
// create new table for each meal
// each table should have name and totol calorie count
