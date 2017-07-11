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
  
  test.it('should display foods-table', function () {
    driver.get(`${rootPath}/index.html`)
    
    driver.wait(until.elementsLocated({css: "#diary-foods-table"}))
    
    driver.findElements({css: "#diary-foods-table .food"})
    .then(function(foods){
      assert.lengthOf(foods, 11)
    })
  })
  
})
