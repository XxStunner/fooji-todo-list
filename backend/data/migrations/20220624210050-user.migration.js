const DATABASE_NAME = 'users'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(DATABASE_NAME, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				allowNull: false,
				unique: true,
				type: Sequelize.STRING,
				max: 60,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
		})
	},
	down: async queryInterface => {
		await queryInterface.dropTable(DATABASE_NAME)
	},
}
