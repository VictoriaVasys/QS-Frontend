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

  test.it.skip('should display table of all my foods', function () {
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

    driver.wait(until.elementLocated({css: "tr[data-id='food-10']"}))
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

    driver.wait(until.elementLocated({css: "tr[data-id='food-11']"}))

    driver.findElement({css: "tr[data-id='11']"}).getText()
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

  test.it.skip('should validate food field is filled in', function (){
    driver.get(`${rootPath}/foods.html`)
    
    driver.findElement({css: "input[name='food-calories']"})
      .sendKeys(350)
    driver.findElement({css: "input[name='add-food-button']"})
      .click()

    driver.findElement({css: "div[class='name-validation-error']"})
    .getText()
    .then(function(error){
      assert.equal(error, "Please enter a food name")
    })
  })

  test.it.skip('should validate food field is filled in', function (){
    driver.get(`${rootPath}/foods.html`)
    
    driver.findElement({css: "input[name='food-name']"})
      .sendKeys("Pasta")
    driver.findElement({css: "input[name='add-food-button']"})
      .click()


    driver.findElement({css: "div[class='calories-validation-error']"})
      .getText()
      .then(function(error){
        assert.equal(error, "Please enter a calorie amount")
      })
  })
  
  test.it.skip('food name & calories should be editable', function (){
    driver.get(`${rootPath}/foods.html`)

    expect(driver.findElements({css: ".food h4[contenteditable]"}).to.have.value("true")) // not sure how to make this targeted at foods & calories within same h4 tag as c.e.
  })
  
  test.it('food name should change when clicked on & different value typed', function (){
    driver.get(`${rootPath}/foods.html`)
    
    driver.findElement({css: ".food[data-id='food-3'] .name"})
      .sendKeys("Quiche")
    driver.findElement({css: ".food[data-id='food-5']"})
      .click()
    
    driver.findElement({css: ".food[data-id='food-3'] .name"}).getText()
      .then(function(name){
        assert.equal(name, "QuicheOrange")
      })
  })


  test.it('should clear form fields and error messages when food is created', function () {

    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: "input[name='food-name']"})
    .sendKeys("Squash")
    driver.findElement({css: "input[name='food-calories']"})
    .sendKeys(350)
    driver.findElement({css: "input[name='add-food-button']"})
    .click()

    driver.wait(until.elementLocated({css: "tr[data-id='11']"}))
    driver.findElement({css: "input[name='food-name']"})
    .getText()
    .then(function(inputField){
      assert.equals(inputField, "")
    })
    driver.findElement({css: "input[name='food-calories']"})
    .getText()
    .then(function(inputField){
      assert.equals(inputField, "")
    })

    driver.findElement({css: "div[class='error']"})
    .getText()
    .then(function(inputField){
      assert.equals(inputField, "")
    })

    driver.findElement({css: "div[class='error']"})
    .getText()
    .then(function(inputField){
      assert.equals(inputField, "")
    })
  })

  test.it('should persist foods in the same order when the page is refreshed', function (){
    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: "tr[class='food']"})
    .getText()
    .then(function(firstFood){
      assert.include(firstFood, 'Pizza')
      assert.include(firstFood, 350)
    })

    driver.get(`${rootPath}/foods.html`)
    driver.findElement({css: "tr[class='food']"})
    .getText()
    .then(function(firstFood){
      assert.include(firstFood, 'Pizza')
      assert.include(firstFood, 350)
    })


  })

})






