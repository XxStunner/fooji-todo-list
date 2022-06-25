const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const config = require('../config/application.config')

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(config.swaggerJsDocs)))

module.exports = router
