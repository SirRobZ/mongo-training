const should = require('chai').should()
const expect = require('chai').expect
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Associations', () => {
  let joe, blogPost, comment

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'Title', content: 'Content in post' })
    comment = new Comment({ content: 'Comment for post' })

    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = joe

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done())
  })

  it('should save a relation between a user and a blogPost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        user.blogPosts[0].title.should.equal('Title')
        done()
      })
  })

  it('should save a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        user.blogPosts[0].title.should.equal('Title')
        user.blogPosts[0].comments[0].content.should.equal('Comment for post')
        user.blogPosts[0].comments[0].user.name.should.equal('Joe')
        done()
      })
  })
})
