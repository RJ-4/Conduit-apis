let getArticleDto = function(article, author, favoritesCount,favorited) {
	if (article && author) {
		let finalArticle = {
			slug: article.slug,
			title: article.title,
			description: article.description,
			body: article.body,
			createdAt: article.createdAt,
			updatedAt: article.updatedAt,

			author: {
				username: author.username,
				bio: author.bio,
				image: author.image
			},
			favorited: (favorited)? favorited:false,
			favoritesCount: (favoritesCount)? favoritesCount: 0
		};
		return finalArticle;
	} else return null;
}

module.exports = getArticleDto;
