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
    driver.findElements({css: ".food"})
    .then(function(foods){
      assert.lengthOf(foods, 9)
    })
  })

  test.it('should be able to fill in form with name and calories', function () {
    driver.get(`${rootPath}/foods.html`)

    driver.findElement({css: "input[name='food-name']"})
      .sendKeys("Scramble")
    driver.findElement({css: "input[name='food-calories']"})
      .sendKeys(300)
    driver.findElement({css: "input[name='add-food-button']"})
      .click()

    driver.wait(until.elementLocated({css: "tr[id='food-10']"}))
    driver.findElements({css: ".food"})
    .then(function(foods){
      assert.lengthOf(foods, 10)
    })
  })

  test.it('should create a new food and prepend it to the table', function () {

    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: "input[name='food-name']"})
      .sendKeys("Pizza")
    driver.findElement({css: "input[name='food-calories']"})
      .sendKeys(350)
    driver.findElement({css: "input[name='add-food-button']"})
      .click()

    driver.wait(until.elementLocated({css: "tr[id='food-11']"}))

    driver.findElement({css: "tr[id='food-11']"}).getText()
    .then(function(food){
      assert.include(food, "Pizza")
      assert.include(food, 350)
    })

    driver.findElements({css: "#foods-table .food"})
    .then(function(foods){
      assert.lengthOf(foods, 11)
    })
  })

  test.it('should validate name field is filled in', function (){

    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: "input[name='food-calories']"})
      .sendKeys(350)
    driver.findElement({css: "input[name='add-food-button']"})
      .click()

    driver.findElement({css: "div.error.name-validation-error"})
    .getText()
    .then(function(error){
      assert.equal(error, "Please enter a food name")
    })
  })

  test.it('should validate calories field is filled in', function (){

    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: "input[name='food-name']"})
      .sendKeys("Pasta")
    driver.findElement({css: "input[name='add-food-button']"})
      .click()

    driver.findElement({css: "div.error.calories-validation-error"})
    .getText()
    .then(function(error){
      assert.equal(error, "Please enter a calorie amount")
    })
  })

  test.it('should clear form fields and error messages when food is created', function () {

    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: "input[name='food-name']"})
      .sendKeys("Pasta")
    driver.findElement({css: "input[name='add-food-button']"})
      .click()

    driver.findElement({css: "input[name='food-name']"})
      .clear()
    driver.findElement({css: "input[name='food-calories']"})
      .sendKeys(350)
    driver.findElement({css: "input[name='add-food-button']"})
      .click()

    driver.findElement({css: "input[name='food-name']"})
      .sendKeys("Squash")
    driver.findElement({css: "input[name='add-food-button']"})
      .click()

    driver.wait(until.elementLocated({css: "tr[id='food-12']"}))
    driver.findElement({css: "input[name='food-name']"})
    .getText()
    .then(function(inputField){
      assert.equal(inputField, "")
    })
    driver.findElement({css: "input[name='food-calories']"})
    .getText()
    .then(function(inputField){
      assert.equal(inputField, "")
    })

    driver.findElement({css: "div.error.calories-validation-error"})
    .getText()
    .then(function(inputField){
      assert.equal(inputField, "")
    })
    driver.findElement({css: "div.error.name-validation-error"})
    .getText()
    .then(function(inputField){
      assert.equal(inputField, "")
    })
  })

  test.it('should persist foods in the same order when the page is refreshed', function (){
    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: ".food"})
    .getText()
    .then(function(firstFood){
      assert.include(firstFood, 'Squash')
      assert.include(firstFood, 350)
    })

    driver.get(`${rootPath}/foods.html`)
    driver.wait(until.elementsLocated({css: "#foods-table .food"}))

    driver.findElement({css: "#foods-table .food"})
    .getText()
    .then(function(firstFood){
      assert.include(firstFood, 'Squash')
      assert.include(firstFood, 350)
    })
  })

  test.it('food name should change when clicked on & different value typed', function (){
    driver.get(`${rootPath}/foods.html`)

    driver.findElement({css: ".food[id='food-3'] .name"})
      .sendKeys("Quiche ")
    driver.findElement({css: ".food[id='food-5']"})
      .click()

    driver.wait(until.elementLocated({css: ".food[id=food-3]"}))
    driver.findElement({css: ".food[id='food-3'] .name"}).getText()
      .then(function(name){
        assert.equal(name, "Quiche Orange")
      })
  })

  test.it('should persist food changes when the page is refreshed', function (){
    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: ".food[id='food-10'] .name"})
      .sendKeys("Crunchy ")
    driver.findElement({css: ".food[id='food-4'] .name"})
      .click()


    driver.get(`${rootPath}/foods.html`)
    driver.wait(until.elementsLocated({css: "#foods-table .food"}))

    driver.findElement({css: ".food[id='food-10'] .name"}).getText()
      .then(function(name){
        assert.equal(name, "Crunchy Scramble")
      })
  })

  test.it('should be able to delete a food from the foods list', function () {
    driver.get(`${rootPath}/foods.html`)

    driver.findElement({css: ".food[id='food-12'] .delete-button input"})
    .click()

    driver.wait(until.elementsLocated({css: "#foods-table .food"}))

    driver.findElements({css: ".delete-button"})
    .then(function(foods){
      assert.lengthOf(foods, 11)
    })
  })
})
