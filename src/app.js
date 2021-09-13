import express from 'express';

const app = express();
app.get('/', (req, res) => {
  res.json({
    name: 'Irvan Kadhafi',
    message: 'Kumparan - Backend Technical Assessment',
  });
});

export default app;
