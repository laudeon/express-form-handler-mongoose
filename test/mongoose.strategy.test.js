/**
 * @licence MIT
 * @author Louis Audeon <louis.audeon@mail.be>
 */
'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const sinonTest = require('sinon-test')
const MongooseStrategy = require('./../lib/mongoose.strategy')
const Strategy = require('express-form-handler-strategy')

sinon.test = sinonTest.configureTest(sinon)

describe('mongoose model strategy', function () {
  it('should herits Strategy', function () {
    let mongooseStrategy = new MongooseStrategy()

    expect(mongooseStrategy).to.be.an.instanceOf(Strategy)
  })

  it('should implement update, bind, findOne and validate method', function () {
    let mongooseStrategy = new MongooseStrategy()

    expect(mongooseStrategy).to.have.property('bind')
    expect(mongooseStrategy).to.have.property('findOne')
    expect(mongooseStrategy).to.have.property('update')
    expect(mongooseStrategy).to.have.property('validate')
  })

  describe(':update()', function () {
    it('With id param: should call Strategy:findOne, Strategy:bind and returns a promise', sinon.test(function (done) {
      let mongooseStrategy = new MongooseStrategy({})
      let findOneStube = sinon.stub(mongooseStrategy, 'findOne')
      let bindStub = sinon.stub(mongooseStrategy, 'bind')

      findOneStube.returns(new Promise((resolve, reject) => resolve()))
      mongooseStrategy.modelInstance = {}

      mongooseStrategy
      .update({ params: { id: 1 } })
      .then(function (model) {
        expect(findOneStube.calledBefore(bindStub)).to.be.true
        expect(bindStub.calledOnce).to.be.true

        done()
      })
      .catch(err => done(err))
    }))

    it('Without id param: should create a new model instance then call Strategy:bind and returns a promise', sinon.test(function (done) {
      let mongooseStrategy = new MongooseStrategy(function Test () {})
      let bindStub = sinon.stub(mongooseStrategy, 'bind')

      mongooseStrategy
      .update({ params: { } })
      .then(function (model) {
        expect(bindStub.calledOnce).to.be.true

        done()
      })
      .catch(err => done(err))
    }))
  })
})
