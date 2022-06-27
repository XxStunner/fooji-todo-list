const Sequelize = require('sequelize')
const config = require('../../config/application.config')
const databaseConfig = require('../../config/database.config.json')

const sequelize = new Sequelize(
	config.app.isDev
		? config.app.isTest
			? databaseConfig.test
			: databaseConfig.development
		: databaseConfig.production
)

const db = {
	sequelize,
	User: require('./user.model')(sequelize),
	TodoList: require('./todoList.model')(sequelize),
	Todo: require('./todo.model')(sequelize),
}

/**
 * Add the associations.
 */
Object.values(db).forEach(model => {
	if (typeof model.associate === 'function') {
		model.associate(db)
	}
})

module.exports = db
