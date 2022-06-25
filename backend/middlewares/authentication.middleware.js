const passport = require('passport')
const messages = require('../config/messages.config.json')

module.exports = {
	authenticateUser: (req, res, next) => {
		passport.authenticate('local', (err, user) => {
			if (err || !user) {
				return res.status(403).send({
					message: messages.auth.wrong_credentials,
				})
			}

			req.user = user

			next()
		})(req, res, next)
	},
}
