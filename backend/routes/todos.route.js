const express = require('express')
const { sentryCaptureException } = require('../modules/sentry/sentry.module')
const router = express.Router()
const messages = require('../config/messages.config.json')
const { Todo } = require('../data/models')
const todoMiddleware = require('../middlewares/todo.middleware')
const validateFieldsMiddleware = require('../middlewares/validateFields.middleware')
const todoFieldsValidator = require('../data/validators/todo.validator')
const authorizationMiddleware = require('../middlewares/authorization.middleware')
/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: CRUD for the todos.
 * components:
 *   schemas:
 *     TodoBody:
 *       type: object
 *       properties:
 *         todoListId:
 *           type: integer
 *           description: The id of the todoList.
 *           example: test
 *         title:
 *           type: string
 *           description: The title of the todo.
 *           example: Study solana
 */

/**
 * @swagger
 * /todos/:
 *   get:
 *     summary: Return all the todos created by the logged user.
 *     tags: [Todos]
 *     parameters:
 *       - in: currentPage
 *         name: currentPage
 *         type: integer
 *         description: The current page of the pagination.
 *       - in: limit
 *         name: limit
 *         type: integer
 *         description: Limit of items per result.
 *     responses:
 *       200:
 *         description: Array of todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', authorizationMiddleware.isAuthenticated, async (req, res) => {
	try {
		const todos = await Todo.findAndCountAll({
			where: {
				user_id: req.user.id,
			},
			offset: Number.isInteger(req.query.currentPage) ? Number(req.query.currentPage) : 0,
			limit: Number.isInteger(req.query.limit) ? Number(req.query.limit) : 10,
		})

		res.send(todos)
	} catch (err) {
		sentryCaptureException(err)

		res.status(500).send({ message: messages.endpoint.server_error })
	}
})
/**
 * @swagger
 * /todos/:
 *   post:
 *     summary: Create the todo and set the logged user as the owner of it.
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoBody'
 *     responses:
 *       200:
 *         description: The created todo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post(
	'/',
	validateFieldsMiddleware(todoFieldsValidator),
	authorizationMiddleware.isAuthenticated,
	todoMiddleware.checkOwnershipOfTodoList,
	async (req, res) => {
		try {
			const todo = await Todo.create({
				userId: req.user.id,
				todoListId: req.body.todoListId,
				title: req.body.title,
			})

			res.send(todo)
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)
/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by it's id.
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Todo object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.get(
	'/:id',
	authorizationMiddleware.isAuthenticated,
	todoMiddleware.getTodo,
	todoMiddleware.authorizeTodoEdit,
	async (req, res) => {
		try {
			res.send(req.todo)
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)
/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update the todo.
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoBody'
 *     responses:
 *       200:
 *         description: The updated todo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.put(
	'/:id',
	validateFieldsMiddleware(todoFieldsValidator),
	authorizationMiddleware.isAuthenticated,
	todoMiddleware.getTodo,
	todoMiddleware.authorizeTodoEdit,
	todoMiddleware.checkOwnershipOfTodoList,
	async (req, res) => {
		try {
			req.todo.todoListId = req.body.todoListId
			req.todo.title = req.body.title

			await req.todo.save()

			res.send(req.todo)
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete the todo.
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Success response indicating that the todo has been deleted.
 */
router.delete(
	'/:id',
	authorizationMiddleware.isAuthenticated,
	todoMiddleware.getTodo,
	todoMiddleware.authorizeTodoEdit,
	async (req, res) => {
		try {
			await req.todo.destroy()

			res.sendStatus(200)
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)

module.exports = router
