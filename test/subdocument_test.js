const should = require('chai').should()
const expect = require('chai').expect
const User = require('../src/user')

describe('Subdocuments', () => {
  it('should create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].title.should.equal('Post Title')
        done()
      })
  })

  it('should add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].title.should.equal('New Post')
        done()
      })
  })

  it('should remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title'}]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove() // not like a model, you still need to call .save()
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.length.should.equal(0)
        done()
      })
  })
})
