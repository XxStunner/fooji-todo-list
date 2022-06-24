const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = (sequelize) => {
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
		},
		{
			sequelize,
			modelName: 'User',
		}
	)

	return TodoList
}
