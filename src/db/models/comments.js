const { db } = require('../config')
const Sequelize = require('sequelize')

module.exports = db.define('comments', {
    comment: {
		type: Sequelize.STRING(300),
		allowNull: false,
	},
})
