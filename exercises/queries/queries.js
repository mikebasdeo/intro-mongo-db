const Post = require('./post')

const postByTitle = async (title) => {
  const post = await Post.findOne({ title }).exec()
  return post
}

const postsForAuthor = (authorId) => {}

const fullPostById = (id) => {}

const allPostsSlim = (fieldsToSelect) => {}

const postByContentLength = (maxContentLength, minContentLength) => {}

const addSimilarPosts = (postId, similarPosts) => {}

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts,
}
