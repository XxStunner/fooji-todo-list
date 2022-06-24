const Sequelize = require('sequelize')

module.exports = sequelize => {
	const TodoList = sequelize.define('todo_list', {
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			field: 'user_id',
		},
		title: {
			type: Sequelize.STRING,
			max: 60,
		},
	})

	return TodoList
}
