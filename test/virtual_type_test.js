const should = require('chai').should()
const expect = require('chai').expect
const User = require('../src/user')

describe('Virtual types', () => {
  it('postCount returns number of posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title'}]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        joe.postCount.should.equal(1)
        done()
      })
  })
})
