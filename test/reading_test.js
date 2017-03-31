const should = require('chai').should()
const User = require('../src/user')

describe('Reading records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    joe.save()
      .then(() => { done() })
  })

  it('finds all users by the name of `joe`', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        users[0]._id.toString().should.equal(joe._id.toString())
        done()
      })
  })

  it('find a user with a particular id', (done) => {
    User.findById(joe._id)
      .then((user) => {
        user.name.should.equal('Joe')
        done()
      })
  })
})
