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
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'users',
					key: 'id',
				},
			},
			todo_list_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'todo_lists',
					key: 'id',
				},
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			done: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
