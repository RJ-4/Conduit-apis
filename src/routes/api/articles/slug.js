const { Router } = require('express')
const { getArticle, editArticle, deleteArticle, likeArticle, unlikeArticle } = require('../../../controllers/articles')

const getArticleDto = require('../../../dto/article');
const { isAuthenticatedOptional, isAuthenticated } = require('../../../middlewares/acl')

const route = Router()

route.get('/:slug', isAuthenticatedOptional(), async (req, res) => {
  let article = await getArticle(req.params.slug);
  let author = await article.getUser();
  let noOfLikers = await article.countLikers();
  let isLikedbyUser = false;
  if (req.user)
    isLikedbyUser = await article.hasLiker(req.user);

  res.status(200).json({ article: getArticleDto(article, author, noOfLikers, isLikedbyUser) });

})

route.put('/:slug', isAuthenticated(), async (req, res) => {
  let article = await getArticle(req.params.slug);
  if (req.user.id !== article.userId)
    res.status(403).json({ message: "you can edit only those articles  written by you" });

  article = await editArticle(req.params.slug, req.body.article.title, req.body.article.description, req.body.article.body)
  let author = await article.getUser();
  let noOfLikers = await article.countLikers();

  res.status(200).json({ article: getArticleDto(article, author, noOfLikers, false) });

})

route.delete('/:slug', isAuthenticated(), async (req, res) => {
  let article = await getArticle(req.params.slug);
  if (req.user.id !== article.userId)
    res.status(403).json({ message: "you can delete only those articles  written by you" });

  let message = await deleteArticle(req.params.slug);
  res.status(200).json({ message: message });


})

route.get('/:slug/comments', (req, res) => {
  // TODO
})

route.post('/:slug/comments', isAuthenticated(),async (req, res) => {
  
})

route.delete('/:slug/comments/:id', isAuthenticated(),async  (req, res) => {
  // TODO
})


route.post('/:slug/favourite', isAuthenticated(), async (req, res) => {
  let article = await likeArticle(req.params.slug, req.user);
  let author = await article.getUser();
  let noOfLikers = await article.countLikers();
  let isLikedbyUser = true;
  res.status(200).json({ article: getArticleDto(article, author, noOfLikers, isLikedbyUser) });

})

route.delete('/:slug/favourite/', isAuthenticated(), async (req, res) => {
  let article = await unlikeArticle(req.params.slug, req.user);
  let author = await article.getUser();
  let noOfLikers = await article.countLikers();
  let isLikedbyUser = false;
  res.status(200).json({ article: getArticleDto(article, author, noOfLikers, isLikedbyUser) });
})

module.exports = route
