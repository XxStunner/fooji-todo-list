const request = require('supertest')
const app = require('../../app')
const agent = request.agent(app)
const unauthenticatedAgent = request.agent(app)

describe('Test the todoLists routes', () => {
	beforeAll(async () => {
		await agent.post('/auth/login').send({
			username: 'test',
			password: '123456',
		})
	})

	test('it should return more than one todoList', async () => {
		const response = await agent.get('/todo-lists')

		expect(response.statusCode).toBe(200)
		expect(response.body.rows.length).toBeGreaterThan(0)
	})

	test("it should fail to return the todoList because user it's unauthenticated", async () => {
		const response = await unauthenticatedAgent.get('/todo-lists')

		expect(response.statusCode).toBe(403)
	})

	test('it should add a todoList', async () => {
		const todoList = {
			title: 'Example of a todoList',
		}

		const response = await agent.post('/todo-lists').send(todoList)

		expect(response.statusCode).toBe(200)
		expect(response.body.title).toBe(todoList.title)
	})

	test("it should fail to add a todoList because the title it's missing", async () => {
		const response = await agent.post('/todo-lists').send({})

		expect(response.statusCode).toBe(400)
	})

	test("it should fail to add the todoList because user it's unauthenticated", async () => {
		const response = await unauthenticatedAgent.get('/todo-lists')

		expect(response.statusCode).toBe(403)
	})

	test('it should update a todoList', async () => {
		const todoList = {
			title: 'updated todoList',
		}

		const response = await agent.put('/todo-lists/1').send(todoList)

		expect(response.statusCode).toBe(200)
		expect(response.body.title).toBe(todoList.title)
	})

	test("it should fail to update a todoList because the title it's missing", async () => {
		const response = await agent.put('/todo-lists/1').send({})

		expect(response.statusCode).toBe(400)
	})

	test("it should fail to update the todoList because user it's unauthenticated", async () => {
		const response = await unauthenticatedAgent.get('/todo-lists')

		expect(response.statusCode).toBe(403)
	})

	test('it should find the todoList id 1', async () => {
		const response = await agent.get('/todo-lists/1')

		expect(response.statusCode).toBe(200)
	})

	test('it should fail to find the todoList id 1500', async () => {
		const response = await agent.get('/todo-lists/1500')

		expect(response.statusCode).toBe(204)
	})

	test("it should fail to find the todoList because user it's unauthenticated", async () => {
		const response = await unauthenticatedAgent.get('/todo-lists')

		expect(response.statusCode).toBe(403)
	})

	test('it should delete the todoList id 4', async () => {
		const response = await agent.delete('/todo-lists/4')

		expect(response.statusCode).toBe(200)
	})

	test('it should fail to delete the todoList id 1500', async () => {
		const response = await agent.delete('/todo-lists/1500')

		expect(response.statusCode).toBe(204)
	})

	test("it should fail to delete the todoList because user it's unauthenticated", async () => {
		const response = await unauthenticatedAgent.delete('/todo-lists/4')

		expect(response.statusCode).toBe(403)
	})
})
