const messages = require('../config/messages.config.json')

module.exports = {
	isAuthenticated: (req, res, next) => {
		if (!req.isAuthenticated()) {
			return res.status(403).send({ message: messages.auth.no_permission })
		}

		next()
	},
}
