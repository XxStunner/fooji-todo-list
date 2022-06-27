const messages = require('../config/messages.config.json')
const { Todo } = require('../data/models')
const { sentryCaptureException } = require('../modules/sentry/sentry.module')

module.exports = {
	getTodo: async (req, res, next) => {
		try {
			req.todo = await Todo.findOne({
				where: {
					id: req.params.id,
				},
			})

			if (!req.todo) {
				return res.sendStatus(204)
			}

			next()
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	},
	authorizeTodoEdit: async (req, res, next) => {
		if (req.todo.user_id !== req.user.id) {
			return res.sendStatus(401)
		}

		next()
	},
}
