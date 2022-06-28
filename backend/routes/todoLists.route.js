const express = require('express')
const { sentryCaptureException } = require('../modules/sentry/sentry.module')
const router = express.Router()
const messages = require('../config/messages.config.json')
const { TodoList, Todo } = require('../data/models')
const todoListMiddleware = require('../middlewares/todoList.middleware')
const validateFieldsMiddleware = require('../middlewares/validateFields.middleware')
const todoListFieldsValidator = require('../data/validators/todoList.validator')
const authorizationMiddleware = require('../middlewares/authorization.middleware')
/**
 * @swagger
 * tags:
 *   name: TodoLists
 *   description: CRUD for the todoLists.
 * components:
 *   schemas:
 *     TodoListBody:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the todoList.
 *           example: Doing
 */

/**
 * @swagger
 * /todo-lists:
 *   get:
 *     summary: Return all the todoLists created by the logged user.
 *     description: Return all the todoLists created by the logged user.
 *     tags: [TodoLists]
 *     parameters:
 *       - in: offset
 *         name: offset
 *         type: integer
 *         description: The id of the last item
 *       - in: limit
 *         name: limit
 *         type: integer
 *         description: Limit of items per result.
 *     responses:
 *       200:
 *         description: Array of todoLists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoList'
 */
router.get('/', authorizationMiddleware.isAuthenticated, async (req, res) => {
	try {
		const todoLists = await TodoList.findAndCountAll({
			where: {
				user_id: req.user.id,
			},
			offset: !isNaN(req.query.offset) ? Number(req.query.offset) : 0,
			limit: !isNaN(req.query.limit) ? Number(req.query.limit) : 10,
			include: [
				{
					model: Todo,
					as: 'todos',
				},
			],
		})

		res.send(todoLists)
	} catch (err) {
		sentryCaptureException(err)

		res.status(500).send({ message: messages.endpoint.server_error })
	}
})
/**
 * @swagger
 * /todo-lists:
 *   post:
 *     summary: Create a todoList and set the logged user as the owner of it.
 *     tags: [TodoLists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoListBody'
 *     responses:
 *       200:
 *         description: Array of todoLists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoList'
 */
router.post(
	'/',
	validateFieldsMiddleware(todoListFieldsValidator),
	authorizationMiddleware.isAuthenticated,
	async (req, res) => {
		try {
			const todoList = await TodoList.create({
				userId: req.user.id,
				title: req.body.title,
			})

			res.send(todoList)
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)
/**
 * @swagger
 * /todo-lists/{id}:
 *   get:
 *     summary: Get a todoList by it's id.
 *     tags: [TodoLists]
 *     responses:
 *       200:
 *         description: Array of todoLists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoList'
 */
router.get(
	'/:id',
	authorizationMiddleware.isAuthenticated,
	todoListMiddleware.getTodoList,
	todoListMiddleware.authorizeTodoListEdit,
	async (req, res) => {
		try {
			res.send(req.todoList)
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)
/**
 * @swagger
 * /todo-lists/{id}:
 *   put:
 *     summary: Update a todoList.
 *     tags: [TodoLists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoListBody'
 *     responses:
 *       200:
 *         description: Array of todoLists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoList'
 */
router.put(
	'/:id',
	validateFieldsMiddleware(todoListFieldsValidator),
	authorizationMiddleware.isAuthenticated,
	todoListMiddleware.getTodoList,
	todoListMiddleware.authorizeTodoListEdit,
	async (req, res) => {
		try {
			req.todoList.title = req.body.title

			await req.todoList.save()

			res.send(req.todoList)
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)
/**
 * @swagger
 * /todo-lists/{id}:
 *   delete:
 *     summary: Delete a todoList and all the todos that belongs to the list.
 *     tags: [TodoLists]
 *     responses:
 *       200:
 *         description: Success response indicating that the todoList has been deleted.
 */
router.delete(
	'/:id',
	authorizationMiddleware.isAuthenticated,
	todoListMiddleware.getTodoList,
	todoListMiddleware.authorizeTodoListEdit,
	async (req, res) => {
		try {
			await req.todoList.destroy()

			res.sendStatus(200)
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)

module.exports = router
