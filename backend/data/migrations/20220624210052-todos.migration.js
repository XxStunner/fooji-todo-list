const DATABASE_NAME = 'todos'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(DATABASE_NAME, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			todo_list_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'todo_lists',
					key: 'id',
				},
			},
			content: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	down: queryInterface => {
		return queryInterface.dropTable(DATABASE_NAME)
	},
}
