const { db } = require('../config')
const Sequelize = require('sequelize')

module.exports = db.define('tags', {
    tagName: {
		type: Sequelize.STRING(32),
		allowNull: false,
	},
})
