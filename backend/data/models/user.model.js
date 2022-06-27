const Sequelize = require('sequelize')
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
const config = require('../../config/application.config')

module.exports = sequelize => {
	/**
	 * @swagger
	 * components:
	 *   schemas:
	 *     User:
	 *       type: object
	 *       properties:
	 *         id:
	 *           type: integer
	 *           description: The user ID.
	 *           example: 0
	 *         username:
	 *           type: string
	 *           description: The user's username.
	 *           example: test
	 *         password:
	 *           type: string
	 *           description: The user's password.
	 *           example: 123456
	 *         createdAt:
	 *           type: string
	 *           description: The date where the user was created.
	 *           example: 2022-06-25 00:54:25
	 *         updatedAt:
	 *           type: string
	 *           description: The last time where the user was modified.
	 *           example: 2022-06-25 00:54:25
	 */
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

			User.hasMany(models.Todo, {
				as: 'todos',
				foreignKey: 'user_id',
			})
		}

		static encryptPassword(password) {
			return bcrypt.hash(password, config.bcrypt.saltRounds)
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
			createdAt: {
				field: 'created_at',
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				field: 'updated_at',
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	)

	return User
}
