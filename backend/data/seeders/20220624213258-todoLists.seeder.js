const DATABASE_NAME = 'todo_lists'

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
				title: "todo's",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				user_id: 1,
				title: 'doing',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				user_id: 1,
				title: 'done',
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
