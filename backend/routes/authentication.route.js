const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const validateFieldsMiddleware = require('../middlewares/validateFields.middleware')
const userMiddleware = require('../middlewares/user.middleware')
const userFieldsValidator = require('../data/validators/user.validator')
const messages = require('../config/messages.config.json')
const { sentryCaptureException } = require('../modules/sentry/sentry.module')
const { User } = require('../data/models')

router.post('/login', validateFieldsMiddleware(userFieldsValidator), async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				username: req.body.username,
			},
		})

		if (!user) {
			return res.status(400).send({ message: messages.auth.wrong_credentials })
		}

		const isPasswordValid = bcrypt.compare(req.body.password, user.password)

		if (!isPasswordValid) {
			return res.status(400).send({ message: messages.auth.wrong_credentials })
		}

		/**
		 * @todo delete the password property from user and generate the jwt.
		 */

		return user
	} catch (err) {
		sentryCaptureException(err)

		res.status(500).send({ message: messages.endpoint.server_error })
	}
})

router.post(
	'/register',
	validateFieldsMiddleware(userFieldsValidator),
	userMiddleware.checkDuplicatedUsername,
	async (req, res) => {
		try {
			const user = User.create({
				username: req.body.username,
				password: req.body.password,
			})

			/**
			 * @todo delete the password property from user and generate the jwt.
			 */

			return user
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)

module.exports = router
