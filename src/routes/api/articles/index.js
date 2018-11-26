const { Router } = require('express')
const {
  isAuthenticated
} = require('../../../middlewares/acl')
const { createArticle, getArticles } = require('../../../controllers/articles')
const getArticle = require('../../../dto/article');

const route = Router()

route.use('/feed', require('./feed'))
route.use('/', require('./slug'))


route.get('/', async (req, res) => {
  let articles = await getArticles(req.query.author, req.query.likedBy);
  res.status(200).json(articles);
})

route.post('/', isAuthenticated(), async (req, res) => {
  try {
    const article = await createArticle(
      req.body.article.title,
      req.body.article.description,
      req.body.article.body,
      req.user.id
    )

    res.status(201).json({ article: getArticle(article, req.user) });
  } catch (e) {
    res.status(500).json({
      message: e
    })
  }
})


module.exports = route
