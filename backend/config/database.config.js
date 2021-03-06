module.exports = {
	development: {
		username: 'root',
		password: null,
		database: 'todo_list_development',
		host: '127.0.0.1',
		dialect: 'mysql',
		define: {
			timestamps: true,
			underscored: true,
		},
	},
	test: {
		username: 'root',
		password: null,
		database: 'todo_list_test',
		host: '127.0.0.1',
		dialect: 'mysql',
		define: {
			timestamps: true,
			underscored: true,
		},
		logging: false,
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: 'mysql',
		define: {
			timestamps: true,
			underscored: true,
		},
		logging: false,
	},
}
