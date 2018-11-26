const { Router } = require('express')
const { followUser, unFollowUser, findUserByUsername, isUserFollowing } = require('../../controllers/users')
const {
  isAuthenticated, isAuthenticatedOptional
} = require('../../middlewares/acl')
const getProfile = require('../../dto/profile');


const route = Router()

route.get('/:username', isAuthenticatedOptional(), async (req ,res) => {
  const othersProfile = await findUserByUsername(req.params.username);
  let isFollowing = false;
  if(req.user)
    isFollowing = await isUserFollowing(req.user,othersProfile);

 
  profile =  {profile: getProfile(othersProfile, isFollowing)};
  res.status(200).json(profile);

})

route.post('/:username/follow', isAuthenticated(), async (req ,res) => {
  othersProfile = await followUser(req.user, req.params.username);
  profile =  {profile: getProfile(othersProfile, true)};
  res.status(201).json(profile);

 
})

route.delete('/:username/follow', isAuthenticated(), async (req ,res) => {
  othersProfile =await unFollowUser(req.user, req.params.username);
  profile =  {profile: getProfile(othersProfile, false)};
  res.status(202).json(profile);
})

module.exports = route
