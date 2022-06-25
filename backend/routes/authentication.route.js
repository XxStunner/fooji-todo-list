const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const validateFieldsMiddleware = require('../middlewares/validateFields.middleware')
const userMiddleware = require('../middlewares/user.middleware')
const authenticationMiddleware = require('../middlewares/authentication.middleware')
const userFieldsValidator = require('../data/validators/user.validator')
const messages = require('../config/messages.config.json')
const { sentryCaptureException } = require('../modules/sentry/sentry.module')
const { User } = require('../data/models')
const config = require('../config/application.config')

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
 *           example: 123456
 *     AuthenticationResponse:
 *       type: object
 *       $ref: '#/components/schemas/User'
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
 *         description: User logged successfully, returns the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthenticationResponse'
 */
router.post(
	'/login',
	validateFieldsMiddleware(userFieldsValidator),
	authenticationMiddleware.authenticateUser,
	async (req, res) => {
		try {
			res.send(req.user)
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)

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
 *         description: User logged successfully, returns the authenticated user.
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
			const result = await User.create({
				username: req.body.username,
				password: await bcrypt.hash(req.body.password, config.bcrypt.saltRounds),
			})

			const user = result.get({ plain: true })

			passport.authenticate('local', () => res.send(user))({
				body: {
					username: user.username,
					password: user.passport,
				},
			})
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)

module.exports = router
