const assert = require("chai").assert
const Meal = require("../lib/js/meal")
const pry = require('pryjs')
//webpack-dev-server/test.html

describe('Meal', function() {
  // this.timeout(1000000)
  it('can turn an API response into HTML', function(done) {
    var APIResponse = new Promise(function(resolve, reject) {
    resolve({
      name: "Breakfast",
      caloric_goal: 200,
      foods: [
        {
          name: "Banana",
          calories: 35
        }
      ]
    })
    if(false)
      reject("nope")
  })
    Meal.fromAPIToHTML(APIResponse)
      .then(function(mealHTML){
        assert(mealHTML.some(function(htmlRow){
          return htmlRow.includes("Banana")
        }))
        done()
      })

  })
})
