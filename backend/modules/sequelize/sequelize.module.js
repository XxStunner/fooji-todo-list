const { Sequelize } = require('sequelize')
const config = require('../../config/application.config')

module.exports.Sequelize = new Sequelize({
	dialect: 'mariadb',
	...config.mariadb,
})
