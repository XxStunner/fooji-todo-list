module.exports = {
	app: {
		isDev: process.env.NODE_ENV !== 'production',
		port: process.env.PORT || 5000,
		clientUrl: 'http://localhost:3000',
	},
	bcrypt: {
		saltRounds: 16,
	},
	sentry: {
		trackingLink: '',
	},
	swaggerJsDocs: {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Fooji Todo List',
				version: '1.0.0',
			},
		},
		apis: ['./routes/*.js', './data/models/*.model.js'],
	},
}
