const http = require('./app')
const config = require('./config/application.config')
/**
 * Starts the server.
 */
http.listen(config.app.port, () => {
	console.log(`Listening on port: ${config.app.port}`)
})
