const assert    = require('chai').assert;
const webdriver = require('selenium-webdriver');
const until     = webdriver.until;
const test      = require('selenium-webdriver/testing');
const rootPath  = "http://localhost:8080"

test.describe('visit index.html', function () {
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

  test.it('should display tables for meals', function () {
    driver.get(`${rootPath}/index.html`)

    driver.wait(until.elementsLocated({css: ".meal"}))

    driver.findElements({css: ".meal"})
    .then(function(meals){
      assert.lengthOf(meals, 4)
    })
  })

  test.it('should display foods for breakfast', function () {
    driver.get(`${rootPath}/index.html`)

    driver.wait(until.elementsLocated({css: "#breakfast"}))

    driver.findElements({css: "#breakfast .name"})
    .then(function(foods){
      assert.lengthOf(foods, 2)
    })
  })

  test.it('should display foods for lunch', function () {
    driver.get(`${rootPath}/index.html`)

    driver.wait(until.elementsLocated({css: "#lunch"}))

    driver.findElements({css: "#lunch .name"})
    .then(function(foods){
      assert.lengthOf(foods, 2)
    })
  })

  test.it('should display foods for dinner', function () {
    driver.get(`${rootPath}/index.html`)

    driver.wait(until.elementsLocated({css: "#dinner"}))

    driver.findElements({css: "#dinner .name"})
    .then(function(foods){
      assert.lengthOf(foods, 3)
    })
  })

  test.it('should display foods for snack', function () {
    driver.get(`${rootPath}/index.html`)

    driver.wait(until.elementsLocated({css: "#snack"}))

    driver.findElements({css: "#snack .name"})
    .then(function(foods){
      assert.lengthOf(foods, 2)
    })
  })

  // Deleted foods will not be removed from meal tables in the diary.
  test.it('deleted foods should persist in the meals table', function () {
    driver.get(`${rootPath}/index.html`)

    driver.wait(until.elementsLocated({css: "#snack"}))

    driver.findElements({css: "#snack .name"})
    .then(function(foods){
      assert.lengthOf(foods, 2)
    })

    driver.get(`${rootPath}/foods.html`)


    driver.findElement({css: ".food[id='food-7'] .delete-button input"})
    .click()

    driver.wait(until.elementsLocated({css: "#foods-table .food"}))

    .then(function(foods){
      assert.lengthOf(foods, 11)
    })

    driver.get(`${rootPath}/index.html`)

    driver.wait(until.elementsLocated({css: "#snack"}))

    driver.findElements({css: "#snack .name"})
    .then(function(foods){
      assert.lengthOf(foods, 2)
    })
  })
})
