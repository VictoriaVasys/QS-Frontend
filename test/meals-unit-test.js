const assert = require("chai").assert
const app = require("../server")
const request = require("request")
const Food = require("../lib/models/food")
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const Meal = require('../lib/js/')
describe('Meal', function() {
  it('should', function(done) {
    ''
    done()
  })
})
