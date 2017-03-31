const should = require('chai').should()
const expect = require('chai').expect
const User = require('../src/user')

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 })
    joe.save()
      .then(() => { done() })
  })

  function assertName(operation, done) {
    operation
      .then(user => User.find({}))
      .then(users => {
        users.length.should.equal(1)
        users[0].name.should.equal('Alex')
        done()
      })
  }

  it('model instance set n save', (done) => {
    joe.set('name', 'Alex')
    assertName(joe.save(), done)
  })

  it('model instance update', (done) => {
    joe.update({ name: 'Alex' })
    assertName(joe.update({ name: 'Alex' }), done)
  })

  it('model class update', (done) => {
    assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done)
  })

  it('model class findAndUpdate', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done)
  })

  it('model class findByIdAndUpdate', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done)
  })

  it('A user can have their post count incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { postCount: 1 }})
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        user.postCount.should.equal(1)
        done()
      })
  })
})
