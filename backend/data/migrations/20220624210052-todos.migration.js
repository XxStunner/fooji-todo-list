const DATABASE_NAME = 'todos'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(DATABASE_NAME, {
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
		})
	},
	down: async queryInterface => {
		await queryInterface.dropTable(DATABASE_NAME)
	},
}
