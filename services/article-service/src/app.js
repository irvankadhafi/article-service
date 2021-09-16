const express = require('express');
const compression = require('compression');
const cors = require('cors');
const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
app.use(compression())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors())
  .use(api)
  .use(middlewares.notFound)
  .use(middlewares.errorHandler);

module.exports = app;
