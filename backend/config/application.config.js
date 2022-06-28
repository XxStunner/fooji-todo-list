module.exports = {
	app: {
		isDev: process.env.NODE_ENV !== 'production',
		isTest: process.env.NODE_ENV === 'test',
		port: process.env.PORT || 5000,
		clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
	},
	bcrypt: {
		saltRounds: 6,
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
	session: {
		secret: 'vuvYaeiUh$CwlWuVDfqKNSvtwq60SCkPL3h!u#',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	},
}
