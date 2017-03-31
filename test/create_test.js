const should = require('chai').should()
const User = require('../src/user')

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' })

    joe.save()
      .then(() => {
        joe.isNew.should.equal(false)
        done()
      })
  })
})
