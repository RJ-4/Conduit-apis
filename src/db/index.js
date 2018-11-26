const {
  db
} = require('./config')

const Users = require('./models/users')
const Articles = require('./models/articles')
const Tags = require('./models/tags')
const Comments = require('./models/comments')


const Likes = db.define('likes', {});
const userFollowing = db.define('userFollowing', {});

Users.belongsToMany(Users, {
  through: userFollowing,
  as: 'Followee',
  foreignKey: 'FollowedBy'
})

Articles.belongsTo(Users);

Users.hasMany(Articles);



Users.belongsToMany(Articles, {
  through: Likes,
  as: 'Likers'
});
Articles.belongsToMany(Users, {
  through: Likes,
  as: 'Likers'
});

Articles.hasMany(Comments);



module.exports = {
  db,
  Users,
  Articles,

  Likes,

  userFollowing
}
