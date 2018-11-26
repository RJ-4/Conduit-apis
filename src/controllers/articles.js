const { Articles, Users } = require('../db')
var randomstring = require('randomstring');
const getArticleDto = require('../../src/dto/article');

async function createArticle(title, description, body, userId) {
    let slug = randomstring.generate(15);
    console.log(slug);
    if (!title) {
        throw new Error('E103: title cannot be empty')
    }
    article = await Articles.create({
        title, description, body, userId, slug
    })

    return article;
}
async function getArticle(slug) {

    article = await Articles.findOne({
        where: {
            slug
        }
    })

    return article;
}
async function editArticle(slug, title, body, description) {

    article = await Articles.findOne({
        where: {
            slug
        }
    })
    if (title) {
        article.title = title;
        article.slug = randomstring.generate(15);
    }
    if (body) {
        article.body = body;
    }
    if (description) {
        article.description = description;
    }
    article.save();

    return article;

}
async function deleteArticle(slug) {

    await Articles.destroy({
        where: {
            slug
        }
    })
    return "delete successful";

}
async function likeArticle(slug, user) {
    article = await Articles.findOne({
        where: {
            slug
        }
    })
    dada = await article.addLiker(user);

    return article;


}
async function unlikeArticle(slug, user) {
    article = await Articles.findOne({
        where: {
            slug
        }
    })
    dada = await article.removeLiker(user);
    return article;
}

async function getFeed(user) {
    followingPeeps = await user.getFollowee()
    ids = followingPeeps.map(item => item.id)

    articles = Articles.findAll({
        where: {
            userId: ids
        }
    })
    return formatArticleList(articles);
}
async function getArticles(author, favoritedBy, offset, limit, user) {
    let includeModels = [];
    if (author) {
        const authorModel = {
            model: Users,
            where: {
                username: author
            }
        }
        includeModels.push(authorModel);
    }
    if (favoritedBy) {
        const likeModel = {
            model: Users,
            as: 'Likers',
            where: {
                username: favoritedBy
            }
        }
        includeModels.push(likeModel);
    }
    const articles = await Articles.findAndCountAll({
        include: includeModels,
        distinct: true,
        offset: (offset) ? offset : 0,
        limit: (limit) ? limit : 10,
        order: [
            ['updatedAt', 'DESC']
        ]
    });

   

    return formatArticleList(articles);
}

async function formatArticleList(articles){
    let allArticles = articles.rows;
    let allArticlesId = allArticles.map(article=>article.id);
    let articleList = []
    for (id in allArticlesId) {
        console.log(allArticlesId[id])
        let article = await Articles.findById(allArticlesId[id])
        let author = await article.getUser();
        let noOfLikers = await article.countLikers();
        let isLikedbyUser = false;
        articleList.push({ article: getArticleDto(article, author, noOfLikers, isLikedbyUser) })
    }
    return {articles:articleList,articlesCount:articles.count };

}

module.exports = {

    createArticle,
    getArticle,
    editArticle,
    deleteArticle,
    likeArticle,
    unlikeArticle,
    getArticles,
    getFeed
}
