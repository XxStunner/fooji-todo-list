# Fooji TodoList test case

This is a test case for https://fooji.com.

# How to install the project

This backend it's a standard express.js setup, in order to run it you need Node.JS 16.15.1 installed (https://nodejs.org/download/release/v16.15.1/) or if you have nvm, type the following command on the /backend directory:

```
nvm use
```

After installing the node, you need to run:

```
npm install
```

After installing the dependencies, you'll need to install mariadb in order to run the database for this project (https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.10.0). When the installation completes, run the following commands to create a development database and populate some example data:

```
npm run migrate && npm run seed
```

Now you can properly run the project using:

```
npm run dev
```

# Tests

All the tests are inside test/routes folder, as I didn't have enough time to write tests for database connections and unit tests for functions, to run the test:

```
npm test

```

# Documentation

The api documentation can be found in the endpoint: /docs/, locally you can find it by going in your browser: http://localhost:500/docs/
