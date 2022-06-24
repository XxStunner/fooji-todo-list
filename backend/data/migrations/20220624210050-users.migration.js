const DATABASE_NAME = 'users'

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable(DATABASE_NAME, {
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
		return queryInterface.dropTable(DATABASE_NAME)
	},
}
