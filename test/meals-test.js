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

  test.it('should display table for Breakfast', function () {
    driver.get(`${rootPath}/index.html`)
    driver.wait(until.elementLocated({css: "#meals-table .meal"}))
    driver.findElements({css: ".meal"})
    .then(function(meals){
      assert.lengthOf(meals, 1)
    })
  })
