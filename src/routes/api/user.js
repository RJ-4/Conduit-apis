const {
  Router
} = require('express')
const {
  isAuthenticated
} = require('../../middlewares/acl')

const { updateUser } = require('../../controllers/users')

const route = Router()

route.get('/', isAuthenticated(),(req, res) => {
    res.status(200).json(req.user);
  }
)

route.put('/', isAuthenticated(), async (req, res) => {
    const user = await updateUser(req.user, req.body.user.email, req.body.user.bio, req.body.user.image)
    res.status(200).json(user);

  }
)

module.exports = route
