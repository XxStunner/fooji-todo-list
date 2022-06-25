const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { User } = require('../../data/models')
const messages = require('../../config/messages.config.json')

module.exports = {
	setupPassport: passport => {
		passport.use(
			new LocalStrategy(async (username, password, done) => {
				try {
					const user = await User.findOne({
						where: {
							username: username,
						},
					})

					if (!user) {
						return done(messages.auth.wrong_credentials)
					}

					const isPasswordValid = await bcrypt.compare(password, user.password)

					if (!isPasswordValid) {
						return done(messages.auth.wrong_credentials)
					}

					done(null, user)
				} catch (err) {
					done(err)
				}
			})
		)
	},
}
