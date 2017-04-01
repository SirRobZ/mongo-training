const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    type: ObjectId,
    ref: 'comment'
  }]
})

const BlogPost = mongoose.model('blogPost', BlogPostSchema)

module.exports = BlogPost
