const Sequelize = require('sequelize')
const config = require('../../config/application.config')
const databaseConfig = require('../../config/database.config.json')

const sequelize = new Sequelize(config.app.isDev ? databaseConfig.development : databaseConfig.production)

const db = {
	sequelize,
	User: require('./user.model')(sequelize),
	TodoList: require('./todoList.model')(sequelize),
	Todo: require('./todo.model')(sequelize),
}

module.exports = db
