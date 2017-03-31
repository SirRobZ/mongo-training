const should = require('chai').should()
const expect = require('chai').expect
const User = require('../src/user')

describe('Deleting records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    joe.save()
      .then(() => { done() })
  })

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findById(joe._id))
      .then(user => {
        expect(user).to.be.null
        done()
      })
  })

  it('class method remove', (done) => {
    User.remove({ name: 'Joe' })
      .then(() => User.findById(joe._id))
      .then(user => {
        expect(user).to.be.null
        done()
      })
  })

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe'})
      .then(() => User.findById(joe._id))
      .then(user => {
        expect(user).to.be.null
        done()
      })
  })

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findById(joe._id))
      .then(user => {
        expect(user).to.be.null
        done()
      })
  })

})
