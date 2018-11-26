const { db } = require('../config')
const Sequelize = require('sequelize')


module.exports = db.define('articles', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	slug: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	body: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});