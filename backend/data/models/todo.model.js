const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = sequelize => {
	/**
	 * @swagger
	 * components:
	 *   schemas:
	 *     Todo:
	 *       type: object
	 *       properties:
	 *         id:
	 *           type: integer
	 *           description: The user ID.
	 *           example: 1
	 *         todoListId:
	 *           type: integer
	 *           description: The TodoList ID.
	 *           example: 1
	 *         title:
	 *           type: string
	 *           description: The title of the todo.
	 *           example: Study solidity
	 *         createdAt:
	 *           type: string
	 *           description: The date where the todo was created.
	 *           example: 2022-06-25 00:54:25
	 *         updatedAt:
	 *           type: string
	 *           description: The last time where the todo was modified.
	 *           example: 2022-06-25 00:54:25
	 */
	class Todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Todo.belongsTo(models.TodoList, {
				foreignKey: 'todo_list_id',
			})
		}
	}

	Todo.init(
		{
			todoListId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				field: 'todo_list_id',
			},
			title: {
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

	return Todo
}
