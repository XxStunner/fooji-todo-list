module.exports = {
	app: {
		isDev: process.env.NODE_ENV !== 'production',
		port: process.env.PORT || 5000,
		clientUrl: 'http://localhost:3000',
	},
}
