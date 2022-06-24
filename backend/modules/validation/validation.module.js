const Validator = require('validatorjs')

module.exports = {
	validateFields: (body, rules, customMessages) => {
		return new Promise((resolve, reject) => {
			const validation = new Validator(body, rules, customMessages)
			validation.passes(resolve)
			validation.fails(() => reject(validation.errors))
		})
	},
}
