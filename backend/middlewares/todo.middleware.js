const messages = require('../config/messages.config.json')
const { Todo, TodoList } = require('../data/models')
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
	checkOwnershipOfTodoList: async (req, res, next) => {
		try {
			const todoList = await TodoList.findOne({
				where: {
					id: req.body.todoListId,
				},
			})

			if (!todoList) {
				return res.status(400).send({ message: messages.endpoint.input_error })
			}

			if (todoList.userId !== req.user.id) {
				return res.status(403).send({ message: messages.auth.no_permission })
			}

			next()
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	},
}
