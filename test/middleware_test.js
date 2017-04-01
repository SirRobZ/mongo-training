const should = require('chai').should()
const expect = require('chai').expect
const User = require('../src/user')
const BlogPost = require('../src/blogPost')

describe('Associations', () => {
  let joe, blogPost

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'Title', content: 'Content in post' })

    joe.blogPosts.push(blogPost)

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done())
  })

  it('should remove all associated blogposts when removing a user', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        count.should.equal(0)
        done()
      })
  })
})
