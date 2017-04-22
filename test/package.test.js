/**
 * @licence MIT
 * @author Louis Audeon <louis.audeon@mail.be>
 */
'use strict'

const chai = require('chai')
const expect = chai.expect
const strategy = require('./..')

describe('express-form-handler-mongoose', function() {
    
  it('should export Strategy constructor directly from package', function() {
    expect(strategy).to.be.a('function')
  })
})