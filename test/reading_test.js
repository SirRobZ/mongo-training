const should = require('chai').should()
const User = require('../src/user')

describe('Reading records', () => {
  let joe, maria, alex, zach;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    maria = new User({ name: 'Maria' })
    alex = new User({ name: 'Alex' })
    zach = new User({ name: 'Zach' })

    Promise.all([joe.save(), maria.save(), alex.save(), zach.save()])
      .then(() => done())
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

  it('should sort, skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 }) // -1 sort descending
      .skip(1)
      .limit(2)
      .then((users) => {
        users.length.should.equal(2)
        users[0].name.should.equal('Joe')
        users[1].name.should.equal('Maria')
        done()
      })
  })
})
