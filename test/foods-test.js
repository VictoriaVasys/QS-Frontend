const assert    = require('chai').assert;
const webdriver = require('selenium-webdriver');
const until     = webdriver.until;
const test      = require('selenium-webdriver/testing');
const rootPath  = "http://localhost:8080"

test.describe('visit foods.html', function () {
  let driver
  this.timeout(10000)

  test.beforeEach(function(){
    driver = new webdriver.Builder()
      .forBrowser("chrome")
      .build()
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
  
    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: "input[name='food-name']"})
      .sendKeys("Scramble")
    driver.findElement({css: "input[name='food-calories']"})
      .sendKeys("300")
    driver.findElement({css: "input[name='add-food-button']"})
      .click()
  
    driver.wait(until.elementLocated({css: "tr[data-id='food-10']"}))
    driver.findElements({css: "#foods-table .food"})
    .then(function(foods){
      assert.lengthOf(foods, 10)
    })
  })
  
  test.it('should create a new food and prepend it to the table', function () {
  
    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: "input[name='food-name']"})
      .sendKeys("Pizza")
    driver.findElement({css: "input[name='food-calories']"})
      .sendKeys("350")
    driver.findElement({css: "input[name='add-food-button']"})
      .click()
  
    driver.wait(until.elementLocated({css: "tr[data-id='food-11']"}))
    driver.findElement({css: "tr[data-id='food-11']"}).getText()
    .then(function(food){
      assert.include(food, "Pizza")
      assert.include(food, 350)
    })
    driver.findElements({css: "#foods-table .food"})
    .then(function(foods){
      assert.lengthOf(foods, 11)
    })
  })
  
  test.it('should be able to delete a food from the foods list', function () {
    driver.get(`${rootPath}/foods.html`)

    driver.findElement({css: ".food[data-id='food-6'] .delete-button"})
      .click()

    driver.findElements({css: ".delete-button"})
      .then(function(foods){
        assert.lengthOf(foods, 10)
      })
  })

  test.it('should validate food field is filled in', function (){

    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: "input[name='food-calories']"})
      .sendKeys("350")
    driver.findElement({css: "input[name='add-food-button']"})
      .click()

    driver.findElement({css: "div[class='name-validation-error']"}).getText()
    .then(function(error){
      assert.equal(error, "Please enter a food name")
    })
  })

  test.it('should validate food field is filled in', function (){

    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: "input[name='food-name']"})
      .sendKeys("Pasta")
    driver.findElement({css: "input[name='add-food-button']"})
      .click()

    driver.findElement({css: "div[class='calories-validation-error']"}).getText()
    .then(function(error){
      assert.equal(error, "Please enter a calorie amount")
    })
  })
})
