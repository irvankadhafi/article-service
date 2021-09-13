import express from 'express';

const app = express();
app.get('/', (req, res) => {
  res.json({
    name: 'Hello World! My name Irvan Kadhafi',
    message: 'Kumparan - Backend Technical Assessment',
  });
});

export default app;
