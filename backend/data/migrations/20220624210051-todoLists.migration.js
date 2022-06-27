const DATABASE_NAME = 'todo_lists'

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
			title: {
				allowNull: false,
				type: Sequelize.STRING,
				max: 60,
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
