const request = require('supertest')
const app = require('../../app')

describe('Test the authentication routes', () => {
	test('It should authenticate the user and receive his object', async () => {
		const user = {
			username: 'test',
			password: '123456',
		}

		const response = await request(app).post('/auth/login').send(user)

		expect(response.statusCode).toBe(200)
		expect(response.body.username).toBe(user.username)
	})

	test("it should fail to authenticate the user because the password / username it's wrong", async () => {
		const response = await request(app).post('/auth/login').send({
			username: 'test',
			password: 'wrong',
		})

		expect(response.statusCode).toBe(403)
	})

	test("it should fail to authenticate the user because it's missing a field from the request body", async () => {
		const response = await request(app).post('/auth/login').send({
			username: 'test',
		})

		expect(response.statusCode).toBe(400)
	})

	test('It should create an account and authenticate the user and receive his object', async () => {
		const user = {
			username: 'test2',
			password: '123456',
		}

		const response = await request(app).post('/auth/register').send(user)

		expect(response.statusCode).toBe(200)
		expect(response.body.username).toBe(user.username)
	})

	test("it should fail to authenticate the user because it's missing a field from the request body", async () => {
		const user = {
			username: 'test',
		}

		const response = await request(app).post('/auth/register').send(user)

		expect(response.statusCode).toBe(400)
	})
})
