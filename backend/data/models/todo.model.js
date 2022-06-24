const Sequelize = require('sequelize')

module.exports = sequelize => {
	const Todo = sequelize.define('todo', {
		todoListId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: 'todo_list_id',
		},
		content: {
			type: Sequelize.STRING,
			max: 255,
		},
	})

	return Todo
}
