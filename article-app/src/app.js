import express from 'express';
import compression from 'compression';
import api from './api';

const app = express();
app.use(compression()).use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(api);
export default app;
