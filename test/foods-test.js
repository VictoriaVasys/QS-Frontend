const assert    = require('chai').assert;
const webdriver = require('selenium-webdriver');
const until     = webdriver.until;
const test      = require('selenium-webdriver/testing');
const rootPath  = "http://localhost:8080"
const host      = require('../lib/config').host

test.describe('visit foods.html', function () {
  let driver
  this.timeout(10000000)

  test.beforeEach(function(){
    driver = new webdriver.Builder()
      .forBrowser("chrome")
      .build()

    console.log(host)
    driver.post(`${host}/api/v1/foods`,
      { name: 'pie', calories: 250 } )
    // const testFood = new Food({name: 'pie', calories: 150})
    // testFood.create()
    // .then(function(fullFood){
    //   $('#foods-table').append(fullFood.toHTML())
    // })
  })

  test.afterEach(function() {
    driver.quit()
  })

  test.it('should display table of all my foods', function () {
    driver.get(`${rootPath}/foods.html`)
    driver.wait(until.elementLocated({css: "#foods-table .food"}))
    driver.findElements({css: "#foods-table .food"})
    .then(function(foods){
      assert.lengthOf(foods, 9)
    })
  })

  test.it('should be able to fill in form with name and calories', function () {
    //   When I visit foods.html,
    driver.get(`${rootPath}/foods.html`)

    // I can enter a name and calorie amount,
    // and create a new food by clicking "Add Food"
    driver.findElement({css: "input[name='food-name']"})
      .sendKeys("Scramble")
    driver.findElement({css: "input[name='food-calories']"})
      .sendKeys("300")
    driver.findElement({css: "input[name='add-food-button']"})
      .click()

    driver.wait(until.elementLocated({css: "tr[data-id='10']"}))
    driver.findElements({css: "#foods-table .food"})
    .then(function(foods){
      assert.lengthOf(foods, 10)
    })
  })
})
