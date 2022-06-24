const { validateFields } = require('../utils/validation.utils')
const messages = require('../config/messages.config.json')

module.exports = (rules, customMessages) => {
	return async (req, res, next) => {
		try {
			await validateFields(req.body, rules, customMessages)

			next()
		} catch (err) {
			if (err.message) {
				sentryCaptureException(err)
			}

			res.status(400).send({ message: err.errors ? err.errors : messages.endpoint.input_error })
		}
	}
}
