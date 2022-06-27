const { User } = require('../models')
const DATABASE_NAME = 'users'

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
				username: 'test',
				password: await User.encryptPassword('123456'),
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
