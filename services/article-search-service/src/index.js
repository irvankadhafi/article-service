const app = require('./app');

const port = process.env.SERVER_PORT || 3002;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
