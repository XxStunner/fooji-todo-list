const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = (sequelize) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.TodoList, {
				as: 'todoLists',
				foreignKey: 'user_id',
			})
		}
	}

	User.init(
		{
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
		},
		{
			sequelize,
			modelName: 'User',
		}
	)

	return User
}
