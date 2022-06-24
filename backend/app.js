/**
 * Load environnement variables.
 */
require('dotenv').config()
/**
 * Load all the required modules.
 */
const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const messages = require('./config/messages.config.json')
const config = require('./config/application.config')
const { sequelize } = require('./data/models/index')
/**
 * Connect to the database and check queries.
 */
sequelize
	.authenticate()
	.then(() => {
		console.log('Connected to MySQl successfully')
	})
	.catch(err => {
		console.error('Unable to connect to the database', err)
	})
/**
 * Debug
 */
if (config.app.isDev) {
	app.use(morgan('dev'))
}
/**
 * API Security.
 * @see https://helmetjs.github.io
 */
app.use(helmet())
/**
 * CORS
 */
app.use(
	cors({
		credentials: true,
		origin: config.app.isDev ? true : config.app.clientUrl,
	})
)
/**
 * Handle 404 requests.
 */
app.use((req, res) => {
	res.status(404).send({ message: messages.endpoint.not_found })
})

module.exports = app
