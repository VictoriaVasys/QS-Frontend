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

// Each meal table has Total Calories below, which is the sum of calories for each food in that meal
  test.it('should show meal calories for breakfast', function () {
    driver.get(`${rootPath}/index.html`)

    driver.wait(until.elementsLocated({css: "#breakfast"}))

    driver.findElements({css: '#breakfast #meal-calories'})
    .getText()
    .then(function(total){
      assert.equal(total, 68)
    })
  })
})
