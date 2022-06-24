const Sequelize = require('sequelize')

module.exports = sequelize => {
	const User = sequelize.define('user', {
		username: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
			min: 3,
			max: 60,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	})

	return User
}
