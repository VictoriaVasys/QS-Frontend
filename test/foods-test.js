const assert    = require('chai').assert;
const webdriver = require('selenium-webdriver');
const until     = webdriver.until;
const test      = require('selenium-webdriver/testing');
const rootPath  = "http://localhost:8080"

test.describe('visit foods.html', function () {
  let driver
  this.timeout(10000000)

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
  
    driver.wait(until.elementLocated({css: "tr[data-id='10']"}))
    driver.findElements({css: "#foods-table .food"})
    .then(function(foods){
      assert.lengthOf(foods, 10)
    })
  })
  
  test.it('should be able to delete a food from the foods list', function () {
    driver.get(`${rootPath}/foods.html`)

    driver.findElement({css: "#foods-table .food .delete-button img[id='1']"})
      .click()

    driver.findElements({css: "#foods-table .food"})
      .then(function(foods){
        assert.lengthOf(foods, 9)
      })
  })
})
