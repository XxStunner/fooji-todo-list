const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const validateFieldsMiddleware = require('../middlewares/validateFields.middleware')
const userMiddleware = require('../middlewares/user.middleware')
const userFieldsValidator = require('../data/validators/user.validator')
const messages = require('../config/messages.config.json')
const { sentryCaptureException } = require('../modules/sentry/sentry.module')
const { User } = require('../data/models')

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Handle all the authentication of the API.
 * components:
 *   schemas:
 *     AuthenticationBody:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The user's name.
 *           example: test
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: 12346
 *     AuthenticationResponse:
 *       type: object
 *       properties:
 *         authToken:
 *           type: string
 *           description: Token to authenticate the user
 *         refreshToken:
 *           type: string
 *           description: Token to refresh the authToken
 *         user:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login.
 *     description: Authenticate the user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationBody'
 *     responses:
 *       200:
 *         description: User logged successfully, returns the authenticated user and a JWT token to use in future requests.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
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

		res.send({ user })
	} catch (err) {
		sentryCaptureException(err)

		res.status(500).send({ message: messages.endpoint.server_error })
	}
})

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create an user.
 *     description: Authenticate the user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthenticationBody'
 *     responses:
 *       200:
 *         description: User logged successfully, returns the authenticated user and a JWT token to use in future requests.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
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

			 res.send({ user })
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)

module.exports = router
