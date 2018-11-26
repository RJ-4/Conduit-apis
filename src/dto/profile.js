let getProfile = function(user, following) {
	let profile = null
	if (user) {
		profile= {
			username: user.username,
			bio: user.bio,
			image: user.image,
			following: following
		};
		
		
	} 
	return profile;
}

module.exports = getProfile;
