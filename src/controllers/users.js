const { Users } = require('../db')
const uuidv1 = require('uuid/v1');

async function findUserById(userId) {
  const user = await Users.findByPk(userId)
  return user
}

async function findUserByUsername(username) {
  const user = await Users.findOne({
    where: {
      username
    }
  })
  return user
}
async function findUserByToken(token) {
  const user = await Users.findOne({
    where: {
      token
    }
  })
  return user
}

async function createUser(username, email, password) {

  if (!username) {
    throw new Error('E102: username cannot be empty')
  }
  const token = uuidv1();

  return await Users.create({
    username, email, password, token,
  })
}

/**
 * update details of an user
 *
 * @param {number} userId id of user to change data of
 * @param {string?} email new email id (can be null)
 * @param {string?} bio profile summary
 * @param {string?} image url to image
 *
 */
async function updateUser(user, email = null, bio = null, image = null) {


  console.log(user)
  if (email)
    user.email = email
  if (bio)
    user.bio = bio
  if (image)
    user.image = image
  user.save();
  return user;
}

async function followUser(user, followeeUsername) {
  let otherUser = await findUserByUsername(followeeUsername);
  await user.addFollowee(otherUser);
  return otherUser;
}

async function unFollowUser(user, followeeUsername) {
  let otherUser = await findUserByUsername(followeeUsername);
  await user.removeFollowee(otherUser);
  return otherUser;
}

async function isUserFollowing(user, otherUser){
  let isFollowing = await user.hasFollowee(otherUser);
  return isFollowing;
}

module.exports = {
  findUserById,
  findUserByUsername,
  createUser,
  updateUser,
  followUser,
  unFollowUser,
  findUserByToken,
  isUserFollowing
}
