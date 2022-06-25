const messages = require('../config/messages.config.json')
const { TodoList } = require('../data/models')
const { sentryCaptureException } = require('../modules/sentry/sentry.module')

module.exports = {
	getTodoList: async (req, res, next) => {
		try {
			req.todoList = await TodoList.findOne({
				where: {
					id: req.params.id,
				},
			})

			if (!req.todoList) {
				return res.sendStatus(204)
			}

			next()
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	},
	authorizeTodoListEdit: async (req, res, next) => {
		if (req.todoList.user_id !== req.user.id) {
			return res.sendStatus(401)
		}

		next()
	},
}
