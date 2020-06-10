const Post = require('./post')

const postByTitle = async (title) => {
  const post = await Post.findOne({ title }).exec()
  return post
}

const postsForAuthor = async (authorId) => {
  const allPostsFromAuthor = await Post.find({ author: authorId }).exec()
  return allPostsFromAuthor
}

const postByContentLength = async (maxContentLength, minContentLength) => {
  const posts = await Post.find({
    contentLength: { $gt: minContentLength, $lt: maxContentLength },
  }).exec()
  return posts
}

const fullPostById = async (_id) => {
  const post = await Post.findOne({ _id }).populate('author').exec()
  return post
}

const allPostsSlim = async (fieldsToSelect) => {
  const answer = await Post.find({}).select(fieldsToSelect).exec()
  return answer
}

const addSimilarPosts = async (postId, similarPosts) => {
  const updatedSimilarPosts = await Post.findByIdAndUpdate(
    postId,
    {
      // ⏰
      $push: { similarPosts: { $each: similarPosts } },
    },
    { new: true }
  ).exec()

  return updatedSimilarPosts
}

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts,
}
