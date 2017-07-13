const $ = require('jquery');
const host = require('./config').host
const Food = require('./food')

function Meal(ajaxMeal) {
  this.mealCalories = 0
  this.caloricGoal = ajaxMeal.caloricGoal
  this.foods = ajaxMeal.foods
}

Meal.getMeal = function(mealId) {
  return $.getJSON(`${host}/api/v1/meals/${mealId}`)
}

Meal.newFromObject = function(ajaxMeal) {
  return new Meal(ajaxMeal)
}

Meal.toHTML = function (meal) {
  return this.fromAPIToHTML(this.getMeal(meal))
}

Meal.fromAPIToHTML = function (APIResponse){
  return APIResponse
    .then(Meal.newFromObject)
      .then(function(meal) {
        return meal.foods.map(function(food) {
          return new Food(food)
        })
      })
      .then(function(foods) {
        return foods.map(function(food) {
          return food.toHTML('delete mealFood')
        })
      })
}

Meal.findCalories = function (APIResponse) {
  return APIResponse
    .then(Meal.newFromObject)
      .then(function(meal) {
        return meal.caloricGoal
      })
}

Meal.totalCalories = function(meal) {
  return this.findCalories(this.getMeal(meal))
}

Meal.updateTable= function(mealId, mealName) {
  $(`#${mealName}`).find("tr:gt(0)").remove()
  Meal.toHTML(mealId)
    .then(function(foods) {
      $(`#${mealName}`).append(foods)
    }).then(function () {
      $(`#${mealName}`).append(`
        <tfoot>
          <tr>
            <td id="${mealName}-calories">Total Calories:  </td><br>
            <td id="remaining-${mealName}-calories">Remaining Calories:  </td>
          </tr>
        </tfoot>
        `)
    }).then(function(){
    Meal.totalCalories(mealId)
    .then(function(calories) {
      $(`td[id="${mealName}-calories"]`).append(calories)
      let remainingCals = calories
      $(`#${mealName} .calories`).each(function(){
        remainingCals -= parseInt(this.innerHTML)
      })
      .promise()
      .done(function(){
        if (remainingCals >= 0) {
          $(`td[id="remaining-${mealName}-calories"]`)
            .append(remainingCals)
            .css('color', 'green')
        } else {
          $(`td[id="remaining-${mealName}-calories"]`)
            .append(remainingCals)
            .css('color', 'red')
        }

      })
    })
  })
}

module.exports = Meal
