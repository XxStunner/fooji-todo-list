const request = require('supertest')
const app = require('../../app')

describe('Test the documentation routes', () => {
	test('It should redirect to the documentation successfully', async () => {
		const response = await request(app).get('/docs')

		expect(response.statusCode).toBe(301)
	})
})
