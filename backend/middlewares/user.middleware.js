const { User } = require('../data/models')
const messages = require('../config/messages.config.json')
const { sentryCaptureException } = require('../modules/sentry/sentry.module')

module.exports = {
	checkDuplicatedUsername: async (req, res, next) => {
		try {
			const user = await User.findOne({
				where: {
					username: req.body.username,
				},
			})

			if (user) {
				return res.status(400).send({ duplicatedField: 'username', message: messages.auth.duplicated_username })
			}

			next()
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	},
}
