const express = require('express');
const compression = require('compression');
const api = require('./api');

const app = express();
app.use(compression()).use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(api);
module.exports = app;
