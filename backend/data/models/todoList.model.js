const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = sequelize => {
	/**
	 * @swagger
	 * components:
	 *   schemas:
	 *     TodoList:
	 *       type: object
	 *       properties:
	 *         id:
	 *           type: integer
	 *           description: The user ID.
	 *           example: 1
	 *         userId:
	 *           type: integer
	 *           description: The owner of the TodoList.
	 *           example: 1
	 *         title:
	 *           type: string
	 *           description: The title of the list.
	 *           example: Doing
	 *         createdAt:
	 *           type: string
	 *           description: The date where the todoList was created.
	 *           example: 2022-06-25 00:54:25
	 *         updatedAt:
	 *           type: string
	 *           description: The last time where the todoList was modified.
	 *           example: 2022-06-25 00:54:25
	 */
	class TodoList extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			TodoList.belongsTo(models.User, {
				foreignKey: 'user_id',
			})

			TodoList.hasMany(models.Todo, {
				as: 'todos',
				foreignKey: 'todo_list_id',
			})
		}
	}

	TodoList.init(
		{
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: 'user_id',
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
				max: 60,
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

	return TodoList
}
