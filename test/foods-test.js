const assert    = require('chai').assert;
const webdriver = require('selenium-webdriver');
const until     = webdriver.until;
const test      = require('selenium-webdriver/testing');
const rootPath = "http://localhost:8080"

test.describe('visit foods.html', function () {
  let driver
  this.timeout(10000000)

  test.beforeEach(function(){
    driver = new webdriver.Builder()
      .forBrowser("chrome")
      .build()
  })

  test.afterEach(function() {
  driver.quit();
  })

  test.it('should display table of all my foods', function () {
    // If I visit foods.html,
    driver.get(`${rootPath}/foods.html`)
    driver.wait(until.elementLocated({css: "#foods-table .food"}))
    driver.findElements({css: "#foods-table .food"})
    .then(function(foods){
      assert.lengthOf(foods, 9)
    })
    // I should see a table of all my foods,
    // with Name, Calories and a delete icon for each food

  })
})
