const User = require('./user')
// const connect = require('../connect')
// const url = 'mongodb://localhost:27017/myDatabase'

const getUserById = async (id) => {
  const foundUser = await User.findById(id).exec()
  return foundUser
}

const getAllUsers = async () => {
  const allUsers = await User.find({}).exec()
  return allUsers
}
const createUser = async (userDetails) => {
  const user = await User.create(userDetails)
  return user
}
const removeUserById = async (id) => {
  const removedUser = await User.findByIdAndDelete(id).exec()
}

const updateUserById = async (id, update) => {
  const updatedUser = await User.findByIdAndUpdate(id, update, {
    new: true,
  }).exec()
  return updatedUser
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  removeUserById,
  updateUserById,
}
