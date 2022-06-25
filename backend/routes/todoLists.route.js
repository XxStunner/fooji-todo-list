const express = require('express')
const passport = require('passport')
const { sentryCaptureException } = require('../modules/sentry/sentry.module')
const router = express.Router()
const messages = require('../config/messages.config.json')
const { TodoList } = require('../data/models')
const todoListMiddleware = require('../middlewares/todoList.middleware')
const validateFieldsMiddleware = require('../middlewares/validateFields.middleware')
const todoListFieldsValidator = require('../data/validators/todoList.validator')

/**
 * @swagger
 * tags:
 *   name: TodoLists
 *   description: CRUD for the todoLists.
 */

/**
 * @swagger
 * /todo-lists/:
 *   get:
 *     summary: Return all the todoLists created by the logged user.
 *     description: Return all the todoLists created by the logged user.
 *     tags: [TodoLists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
router.get('/', passport.authorize('local'), async (req, res) => {
	try {
		const todoLists = await TodoList.findAndCountAll({
			where: {
				user_id: req.user.id,
			},
			offset: 0,
			limit: 10,
		})

		res.send(todoLists)
	} catch (err) {
		sentryCaptureException(err)

		res.status(500).send({ message: messages.endpoint.server_error })
	}
})
/**
 * @swagger
 * /todo-lists/:
 *   post:
 *     summary: Return all the todoLists created by the logged user.
 *     description: Return all the todoLists created by the logged user.
 *     tags: [TodoLists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
router.post('/', validateFieldsMiddleware(todoListFieldsValidator), passport.authorize('local'), async (req, res) => {
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
})
/**
 * @swagger
 * /todo-lists/{id}/:
 *   get:
 *     summary: Return all the todoLists created by the logged user.
 *     description: Return all the todoLists created by the logged user.
 *     tags: [TodoLists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
router.get(
	'/:id',
	passport.authorize('local'),
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
 *     summary: Return all the todoLists created by the logged user.
 *     description: Return all the todoLists created by the logged user.
 *     tags: [TodoLists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
router.put(
	'/:id',
	validateFieldsMiddleware(todoListFieldsValidator),
	passport.authorize('local'),
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
 *     summary: Return all the todoLists created by the logged user.
 *     description: Return all the todoLists created by the logged user.
 *     tags: [TodoLists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
router.delete(
	'/:id',
	passport.authorize('local'),
	todoListMiddleware.getTodoList,
	todoListMiddleware.authorizeTodoListEdit,
	async (req, res) => {
		try {
			res.sendStatus(200)
		} catch (err) {
			sentryCaptureException(err)

			res.status(500).send({ message: messages.endpoint.server_error })
		}
	}
)

module.exports = router
