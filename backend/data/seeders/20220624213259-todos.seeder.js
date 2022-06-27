const DATABASE_NAME = 'todos'

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		return queryInterface.bulkInsert(DATABASE_NAME, [
			{
				user_id: 1,
				todo_list_id: 1,
				title: 'Example of something that you need to do',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				user_id: 1,
				todo_list_id: 2,
				title: "Example of something you're doing",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				user_id: 1,
				todo_list_id: 3,
				title: 'Example of something you done',
				created_at: new Date(),
				updated_at: new Date(),
			},
		])
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete(DATABASE_NAME, null, {})
	},
}
