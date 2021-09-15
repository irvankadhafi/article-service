const express = require('express');
const compression = require('compression');
const cors = require('cors');
const api = require('./api');

const app = express();
app.use(compression())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cors())
  .use(api);

module.exports = app;
