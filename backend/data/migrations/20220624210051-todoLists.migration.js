const DATABASE_NAME = 'todo_lists'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(DATABASE_NAME, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
		})
	},
	down: async queryInterface => {
		await queryInterface.dropTable(DATABASE_NAME)
	},
}
