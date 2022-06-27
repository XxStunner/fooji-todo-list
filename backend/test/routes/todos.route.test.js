const request = require('supertest')
const app = require('../../app')
const agent = request.agent(app)
const unauthenticatedAgent = request.agent(app)

describe('Test the todos routes', () => {
	beforeAll(async () => {
		await agent.post('/auth/login').send({
			username: 'test',
			password: '123456',
		})
	})

	test('it should return more than one todo', async () => {
		const response = await agent.get('/todos')

		expect(response.statusCode).toBe(200)
		expect(response.body.rows.length).toBeGreaterThan(0)
	})

	test("it should fail to return the todo because user it's unauthenticated", async () => {
		const response = await unauthenticatedAgent.get('/todos')

		expect(response.statusCode).toBe(403)
	})

	test('it should add a todo', async () => {
		const todo = {
			todoListId: 1,
			title: 'Example of a todo',
		}

		const response = await agent.post('/todos').send(todo)

		expect(response.statusCode).toBe(200)
		expect(response.body.title).toBe(todo.title)
	})

	test("it should fail to add a todo because the title it's missing", async () => {
		const response = await agent.post('/todos').send({
			todoListId: 1,
		})

		expect(response.statusCode).toBe(400)
	})

	test("it should fail to add the todo because user it's unauthenticated", async () => {
		const response = await unauthenticatedAgent.get('/todos')

		expect(response.statusCode).toBe(403)
	})

	test("it should fail to add the todo because the todoList 1500 doesn't exist", async () => {
		const response = await agent.put('/todos/1').send({
			todoListId: 1500,
			title: 'Example of a todo',
		})

		expect(response.statusCode).toBe(400)
	})

	test('it should update a todo', async () => {
		const todo = {
			todoListId: 2,
			title: 'updated todo',
		}

		const response = await agent.put('/todos/1').send(todo)

		expect(response.statusCode).toBe(200)
		expect(response.body.title).toBe(todo.title)
	})

	test("it should fail to update a todo because the title it's missing", async () => {
		const response = await agent.put('/todos/1').send({})

		expect(response.statusCode).toBe(400)
	})

	test("it should fail to update the todo because user it's unauthenticated", async () => {
		const response = await unauthenticatedAgent.get('/todos')

		expect(response.statusCode).toBe(403)
	})

	test('it should find the todo id 1', async () => {
		const response = await agent.get('/todos/1')

		expect(response.statusCode).toBe(200)
	})

	test('it should fail to find the todo id 1500', async () => {
		const response = await agent.get('/todos/1500')

		expect(response.statusCode).toBe(204)
	})

	test("it should fail to find the todo because user it's unauthenticated", async () => {
		const response = await unauthenticatedAgent.get('/todos')

		expect(response.statusCode).toBe(403)
	})

	test('it should delete the todo id 4', async () => {
		const response = await agent.delete('/todos/4')

		expect(response.statusCode).toBe(200)
	})

	test('it should fail to delete the todo id 1500', async () => {
		const response = await agent.delete('/todos/1500')

		expect(response.statusCode).toBe(204)
	})

	test("it should fail to delete the todo because user it's unauthenticated", async () => {
		const response = await unauthenticatedAgent.delete('/todos/4')

		expect(response.statusCode).toBe(403)
	})
})
