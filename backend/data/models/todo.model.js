const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = (sequelize) => {
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
			content: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	)

	return Todo
}
