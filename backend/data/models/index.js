const Sequelize = require('sequelize')
const config = require('../../config/application.config')

const db = new Sequelize({
	dialect: 'mariadb',
	...config.mariadb,
})

module.exports = db
