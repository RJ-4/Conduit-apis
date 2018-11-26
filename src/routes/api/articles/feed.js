const { Router } = require('express')
const { isAuthenticated } = require('../../../middlewares/acl')
const { getFeed } = require('../../../controllers/articles')

const route = Router()
route.get('/', isAuthenticated(), async (req, res) => {
    listArticles = await getFeed(req.user);
    res.status(200).json({articles:listArticles})

})

module.exports = route
