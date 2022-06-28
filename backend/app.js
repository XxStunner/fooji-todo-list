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
const passport = require('passport')
const session = require('express-session')
const messages = require('./config/messages.config.json')
const config = require('./config/application.config')
const AuthController = require('./routes/authentication.route')
const DocumentationController = require('./routes/documentation.route')
const TodoListsController = require('./routes/todoLists.route')
const TodosController = require('./routes/todos.route')
const passportLocalModule = require('./modules/authentication/passportLocal.module')
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
 * Load the json module
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
/**
 * Necessary to use heroku
 */
app.set('trust proxy', true)
/**
 * Init session
 */
app.use(session(config.session))
/**
 * Init passport.
 */
app.use(passport.initialize())
app.use(passport.session())
/**
 * Init passport local configuration.
 */
passportLocalModule.setupPassport(passport)
/**
 * Load all the controllers
 */
app.use('/auth', AuthController)
app.use('/docs', DocumentationController)
app.use('/todo-lists', TodoListsController)
app.use('/todos', TodosController)
/**
 * Handle 404 requests.
 */
app.use((req, res) => {
	res.status(404).send({ message: messages.endpoint.not_found })
})

module.exports = app
